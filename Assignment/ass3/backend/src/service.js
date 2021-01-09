import fs from 'fs';
import jwt from 'jsonwebtoken';
import AsyncLock from 'async-lock';
import { InputError, AccessError, } from './error';

import {
  quizQuestionPublicReturn,
  quizQuestionGetCorrectAnswers,
  quizQuestionGetDuration,
} from './custom';

const lock = new AsyncLock();

const JWT_SECRET = 'llamallamaduck';
const DATABASE_FILE = './database.json';

/***************************************************************
                       State Management
***************************************************************/

let admins = {};
let quizzes = {};
let sessions = {};

const sessionTimeouts = {};

const update = (admins, quizzes, sessions) =>
  new Promise((resolve, reject) => {
    lock.acquire('saveData', () => {
      try {
        fs.writeFileSync(DATABASE_FILE, JSON.stringify({
          admins,
          quizzes,
          sessions,
        }, null, 2));
        resolve();
      } catch {
        reject(new Error('Writing to database failed'));
      }
    });
  });

export const save = () => update(admins, quizzes, sessions);
export const reset = () => {
  update({}, {}, {});
  admins = {};
  quizzes = {};
  sessions = {};
};

try {
  const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
  admins = data.admins;
  quizzes = data.quizzes;
  sessions = data.sessions;
} catch {
  console.log('WARNING: No database found, create a new one');
  save();
}

/***************************************************************
                       Helper Functions
***************************************************************/

const newSessionId = _ => generateId(Object.keys(sessions), 999999);
const newQuizId = _ => generateId(Object.keys(quizzes));
const newPlayerId = _ => generateId(Object.keys(sessions).map(s => Object.keys(sessions[s].players)));

export const userLock = callback => new Promise((resolve, reject) => {
  lock.acquire('userAuthLock', callback(resolve, reject));
});

export const quizLock = callback => new Promise((resolve, reject) => {
  lock.acquire('quizMutateLock', callback(resolve, reject));
});

export const sessionLock = callback => new Promise((resolve, reject) => {
  lock.acquire('sessionMutateLock', callback(resolve, reject));
});

const copy = x => JSON.parse(JSON.stringify(x));
const randNum = max => Math.round(Math.random() * (max - Math.floor(max / 10)) + Math.floor(max / 10));
const generateId = (currentList, max = 999999999) => {
  let R = randNum(max);
  while (currentList.includes(R)) {
    R = randNum(max);
  }
  return R.toString();
};

/***************************************************************
                       Auth Functions
***************************************************************/

export const getEmailFromAuthorization = authorization => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { email, } = jwt.verify(token, JWT_SECRET);
    if (!(email in admins)) {
      throw new AccessError('Invalid Token');
    }
    return email;
  } catch {
    throw new AccessError('Invalid token');
  }
};

export const login = (email, password) => userLock((resolve, reject) => {
  if (email in admins) {
    if (admins[email].password === password) {
      admins[email].sessionActive = true;
      resolve(jwt.sign({ email, }, JWT_SECRET, { algorithm: 'HS256', }));
    }
  }
  reject(new InputError('Invalid username or password'));
});

export const logout = (email) => userLock((resolve, reject) => {
  admins[email].sessionActive = false;
  resolve();
});

export const register = (email, password, name) => userLock((resolve, reject) => {
  if (email in admins) {
    reject(new InputError('Email address already registered'));
  }
  admins[email] = {
    name,
    password,
    sessionActive: true,
  };
  const token = jwt.sign({ email, }, JWT_SECRET, { algorithm: 'HS256', });
  resolve(token);
});

/***************************************************************
                       Quiz Functions
***************************************************************/

const newQuizPayload = (name, owner) => ({
  name,
  owner,
  questions: [],
  thumbnail: null,
  active: null,
  createdAt: new Date().toISOString(),
});

export const assertOwnsQuiz = (email, quizId) => quizLock((resolve, reject) => {
  if (!(quizId in quizzes)) {
    reject(new InputError('Invalid quiz ID'));
  } else if (quizzes[quizId].owner !== email) {
    reject(new InputError('Admin does not own this Quiz'));
  } else {
    resolve();
  }
});

export const getQuizzesFromAdmin = email => quizLock((resolve, reject) => {
  resolve(Object.keys(quizzes).filter(key => quizzes[key].owner === email).map(key => ({
    id: parseInt(key, 10),
    createdAt: quizzes[key].createdAt,
    name: quizzes[key].name,
    thumbnail: quizzes[key].thumbnail,
    owner: quizzes[key].owner,
    active: getActiveSessionIdFromQuizId(key),
    oldSessions: getInactiveSessionsIdFromQuizId(key),
  })));
});

export const addQuiz = (name, email) => quizLock((resolve, reject) => {
  if (name === undefined) {
    reject(new InputError('Must provide a name for new quiz'));
  } else {
    const newId = newQuizId();
    quizzes[newId] = newQuizPayload(name, email);
    resolve(newId);
  }
});

export const getQuiz = quizId => quizLock((resolve, reject) => {
  resolve({
    ...quizzes[quizId],
    active: getActiveSessionIdFromQuizId(quizId),
    oldSessions: getInactiveSessionsIdFromQuizId(quizId),
  });
});

export const updateQuiz = (quizId, questions, name, thumbnail) => quizLock((resolve, reject) => {
  if (questions) { quizzes[quizId].questions = questions; }
  if (name) { quizzes[quizId].name = name; }
  if (thumbnail) { quizzes[quizId].thumbnail = thumbnail; }
  resolve();
});

export const removeQuiz = quizId => quizLock((resolve, reject) => {
  delete quizzes[quizId];
  resolve();
});

export const startQuiz = quizId => quizLock((resolve, reject) => {
  if (quizHasActiveSession(quizId)) {
    reject(new InputError('Quiz already has active session'));
  } else {
    const id = newSessionId();
    sessions[id] = newSessionPayload(quizId);
    resolve(id);
  }
});

export const advanceQuiz = quizId => quizLock((resolve, reject) => {
  const session = getActiveSessionFromQuizIdThrow(quizId);
  if (!session.active) {
    reject(new InputError('Cannot advance a quiz that is not active'));
  } else {
    const totalQuestions = session.questions.length;
    session.position += 1;
    session.answerAvailable = false;
    session.isoTimeLastQuestionStarted = new Date().toISOString();
    if (session.position >= totalQuestions) {
      endQuiz(quizId);
    } else {
      const questionDuration = quizQuestionGetDuration(session.questions[session.position]);
      if (sessionTimeouts[session.id]) {
        clearTimeout(sessionTimeouts[session.id]);
      }
      sessionTimeouts[session.id] = setTimeout(() => {
        session.answerAvailable = true;
      }, questionDuration * 1000);
    }
    resolve(session.position);
  }
});

export const endQuiz = quizId => quizLock((resolve, reject) => {
  const session = getActiveSessionFromQuizIdThrow(quizId);
  session.active = false;
  resolve();
});

/***************************************************************
                       Session Functions
***************************************************************/

const quizHasActiveSession = quizId => Object.keys(sessions).filter(s => sessions[s].quizId === quizId && sessions[s].active).length > 0;

const getActiveSessionFromQuizIdThrow = quizId => {
  if (!quizHasActiveSession(quizId)) {
    throw new InputError('Quiz has no active session');
  }
  const sessionId = getActiveSessionIdFromQuizId(quizId);
  if (sessionId !== null) {
    return sessions[sessionId];
  }
  return null;
};

const getActiveSessionIdFromQuizId = quizId => {
  const activeSessions = Object.keys(sessions).filter(s => sessions[s].quizId === quizId && sessions[s].active);
  if (activeSessions.length === 1) {
    return parseInt(activeSessions[0], 10);
  }
  return null;
};

const getInactiveSessionsIdFromQuizId = quizId =>
  Object.keys(sessions).filter(sid => sessions[sid].quizId === quizId && !sessions[sid].active).map(s => parseInt(s, 10));

const getActiveSessionFromSessionId = sessionId => {
  if (sessionId in sessions) {
    if (sessions[sessionId].active) {
      return sessions[sessionId];
    }
  }
  throw new InputError('Session ID is not an active session');
};

const sessionIdFromPlayerId = playerId => {
  for (const sessionId of Object.keys(sessions)) {
    if (Object.keys(sessions[sessionId].players).filter(p => p === playerId).length > 0) {
      return sessionId;
    }
  }
  throw new InputError('Player ID does not refer to valid player id');
};

const newSessionPayload = quizId => ({
  quizId,
  position: -1,
  isoTimeLastQuestionStarted: null,
  players: {},
  questions: copy(quizzes[quizId].questions),
  active: true,
  answerAvailable: false,
});

const newPlayerPayload = (name, numQuestions) => ({
  name: name,
  answers: Array(numQuestions).fill({
    questionStartedAt: null,
    answeredAt: null,
    answerIds: [],
    correct: false,
  }),
});

export const sessionStatus = sessionId => {
  const session = sessions[sessionId];
  return {
    active: session.active,
    answerAvailable: session.answerAvailable,
    isoTimeLastQuestionStarted: session.isoTimeLastQuestionStarted,
    position: session.position,
    questions: session.questions,
    players: Object.keys(session.players).map(player => session.players[player].name),
  };
};

export const assertOwnsSession = async (email, sessionId) => {
  await assertOwnsQuiz(email, sessions[sessionId].quizId);
};

export const sessionResults = sessionId => sessionLock((resolve, reject) => {
  const session = sessions[sessionId];
  if (session.active) {
    reject(new InputError('Cannot get results for active session'));
  } else {
    resolve(Object.keys(session.players).map(pid => session.players[pid]));
  }
});

export const playerJoin = (name, sessionId) => sessionLock((resolve, reject) => {
  if (name === undefined) {
    reject(new InputError('Name must be supplied'));
  } else {
    const session = getActiveSessionFromSessionId(sessionId);
    if (session.position > 0) {
      reject(new InputError('Session has already begun'));
    } else {
      const id = newPlayerId();
      session.players[id] = newPlayerPayload(name, session.questions.length);
      resolve(parseInt(id, 10));
    }
  }
});

export const hasStarted = playerId => sessionLock((resolve, reject) => {
  const session = getActiveSessionFromSessionId(sessionIdFromPlayerId(playerId));
  if (session.isoTimeLastQuestionStarted !== null) {
    resolve(true);
  } else {
    resolve(false);
  }
});

export const getQuestion = playerId => sessionLock((resolve, reject) => {
  const session = getActiveSessionFromSessionId(sessionIdFromPlayerId(playerId));
  if (session.position === -1) {
    reject(new InputError('Session has not started yet'));
  } else {
    resolve({
      ...quizQuestionPublicReturn(session.questions[session.position]),
      isoTimeLastQuestionStarted: session.isoTimeLastQuestionStarted,
    });
  }
});

export const getAnswers = playerId => sessionLock((resolve, reject) => {
  const session = getActiveSessionFromSessionId(sessionIdFromPlayerId(playerId));
  if (session.position === -1) {
    reject(new InputError('Session has not started yet'));
  } else if (!session.answerAvailable) {
    reject(new InputError('Question time has not been completed'));
  } else {
    resolve(quizQuestionGetCorrectAnswers(session.questions[session.position]));
  }
});

export const submitAnswers = (playerId, answerList) => sessionLock((resolve, reject) => {
  if (answerList === undefined || answerList.length === 0) {
    reject(new InputError('Answers must be provided'));
  } else {
    const session = getActiveSessionFromSessionId(sessionIdFromPlayerId(playerId));
    if (session.position === -1) {
      reject(new InputError('Session has not started yet'));
    } else if (session.answerAvailable) {
      reject(new InputError('Can\'t answer question once answer is available'));
    } else {
      session.players[playerId].answers[session.position] = {
        questionStartedAt: session.isoTimeLastQuestionStarted,
        answeredAt: new Date().toISOString(),
        answerIds: answerList,
        correct: JSON.stringify(quizQuestionGetCorrectAnswers(session.questions[session.position]).sort()) === JSON.stringify(answerList.sort()),
      };
      resolve();
    }
  }
});

export const getResults = playerId => sessionLock((resolve, reject) => {
  const session = sessions[sessionIdFromPlayerId(playerId)];
  if (session.active) {
    reject(new InputError('Session is ongoing, cannot get results yet'));
  } else if (session.position === -1) {
    reject(new InputError('Session has not started yet'));
  } else {
    resolve(session.players[playerId].answers);
  }
});
