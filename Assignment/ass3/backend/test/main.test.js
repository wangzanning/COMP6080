import request from 'supertest';
import server from '../src/server';
import { reset } from '../src/service';

const THUMBNAIL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
const QUESTIONS = [
  {

  },
  {

  },
  {

  },
];
const PLAYERS = ['HAYDEN1','HAYDEN2','HAYDEN3','HAYDEN4','HAYDEN5'];
const PLAYER_IDS = [];

const postTry = async (path, status, payload, token) => sendTry('post', path, status, payload, token);
const getTry = async (path, status, payload, token) => sendTry('get', path, status, payload, token);
const deleteTry = async (path, status, payload, token) => sendTry('delete', path, status, payload, token);
const putTry = async (path, status, payload, token) => sendTry('put', path, status, payload, token);

const sendTry = async (typeFn, path, status = 200, payload = {}, token = null) => {
  let req = request(server);
  if (typeFn === 'post') {
    req = req.post(path);
  } else if (typeFn === 'get') {
    req = req.get(path);
  } else if (typeFn === 'delete') {
    req = req.delete(path);
  } else if (typeFn === 'put') {
    req = req.put(path);
  }
  if (token !== null) {
    req = req.set('Authorization', `Bearer ${token}`);
  }
  const response = await req.send(payload);
  expect(response.statusCode).toBe(status);
  return response.body;
};

const validToken = async () => {
  const { token } = await postTry('/admin/auth/login', 200, {
    email: 'hayden.smith@unsw.edu.au',
    password: 'bananapie',
  });
  return token;
}

const singleQuizId = async () => {
  const { quizzes } = await getTry('/admin/quiz', 200, {}, await validToken());
  const quizid = quizzes[0].id;
  return quizid;
};

const singleSessionStatus = async () => {
  const { quizzes } = await getTry('/admin/quiz', 200, {}, await validToken());
  const sessionid = quizzes[0].active;
  const body = await getTry(`/admin/session/${sessionid}/status`, 200, {}, await validToken());
  return body.results;
};

const singleSessionId = async () => {
  const { quizzes } = await getTry('/admin/quiz', 200, {}, await validToken());
  return quizzes[0].active;
};

describe('Test the root path', () => {

  beforeAll(() => {
    reset();
  });

  beforeAll(() => {
    server.close();
  });

  /***************************************************************
                       Auth Tests
  ***************************************************************/

  test('Registration of initial user', async () => {
    const body = await postTry('/admin/auth/register', 200, {
      email: 'hayden.smith@unsw.edu.au',
      password: 'bananapie',
      name: 'Hayden',
    });
    expect(body.token instanceof String);
  });

  test('Inability to re-register a user', async () => {
    const body = await postTry('/admin/auth/register', 400, {
      email: 'hayden.smith@unsw.edu.au',
      password: 'bananapie',
      name: 'Hayden',
    });
  });

  test('Login to an existing user', async () => {
    const body = await postTry('/admin/auth/login', 200, {
      email: 'hayden.smith@unsw.edu.au',
      password: 'bananapie',
    });
    expect(body.token instanceof String);
  });

  test('Login attempt with invalid credentials 1', async () => {
    const body = await postTry('/admin/auth/login', 400, {
      email: 'hayden.smith@unsw.edu.a',
      password: 'bananapie',
    });
  });

  test('Login attempt with invalid credentials 2', async () => {
    const body = await postTry('/admin/auth/login', 400, {
      email: 'hayden.smith@unsw.edu.au',
      password: 'bananapi',
    });
  });

  test('Logout a valid session', async () => {
    const bodyLogout = await postTry('/admin/auth/logout', 200, {}, await validToken());
    expect(bodyLogout).toMatchObject({});
  });

  test('Logout a session without auth token', async () => {
    const body = await postTry('/admin/auth/logout', 403, {});
    expect(body).toMatchObject({});
  });

  /***************************************************************
                       Quiz Tests
  ***************************************************************/
  test('Initially there are no quizzes', async () => {
    const body = await getTry('/admin/quiz', 200, {}, await validToken());
    expect(body.quizzes).toHaveLength(0);
  });

  test('Creating a single quiz, value missing', async () => {
    const body = await postTry('/admin/quiz/new', 400, {}, await validToken());
  });

  test('Creating a single quiz, token missing', async () => {
    const body = await postTry('/admin/quiz/new', 403, {
      name: 'QUIZ',
    });
  });

  test('Creating a single quiz', async () => {
    const body = await postTry('/admin/quiz/new', 200, {
      name: 'QUIZ',
    }, await validToken());
  });

  test('That there is now one quiz', async () => {
    const body = await getTry('/admin/quiz', 200, {}, await validToken());
    expect(body.quizzes).toHaveLength(1);
    expect(typeof body.quizzes[0].id).toBe('number');
    expect(typeof body.quizzes[0].createdAt).toBe('string');
    expect(body.quizzes[0].name).toBe('QUIZ');
    expect(body.quizzes[0].owner).toBe('hayden.smith@unsw.edu.au');
    expect(body.quizzes[0].active).toBe(null);
    expect(body.quizzes[0].thumbnail).toBe(null);
    expect(body.quizzes[0].oldSessions).toMatchObject([]);
  });

  test('Create a second quiz', async () => {
    const body = await postTry('/admin/quiz/new', 200, {
      name: 'QUIZ2',
    }, await validToken());
  });

  test('That there is now two quizzes', async () => {
    const body = await getTry('/admin/quiz', 200, {}, await validToken());
    expect(body.quizzes).toHaveLength(2);
  });

  test('Try and delete a quiz with invalid token', async () => {
    const { quizzes } = await getTry('/admin/quiz', 200, {}, await validToken());
    const quizid = quizzes[1].id;
    const body = await deleteTry(`/admin/quiz/${quizid}`, 403, {});
  });

  test('Try and delete a quiz with invalid quizid', async () => {
    const body = await deleteTry(`/admin/quiz/${99999999999999}`, 400, {}, await validToken());
  });

  test('Try and delete a quiz', async () => {
    const { quizzes } = await getTry('/admin/quiz', 200, {}, await validToken());
    const quizid = quizzes[1].id;
    const body = await deleteTry(`/admin/quiz/${quizid}`, 200, {}, await validToken());
  });

  test('That there is now one quiz again', async () => {
    const body = await getTry('/admin/quiz', 200, {}, await validToken());
    expect(body.quizzes).toHaveLength(1);
  });

  test('Update quiz thumbnail and name', async () => {
    const quizid = await singleQuizId();
    const body = await putTry(`/admin/quiz/${quizid}`, 200, {
      name: 'QUIZDIFF',
      thumbnail: THUMBNAIL,
      questions: QUESTIONS,
    }, await validToken());
  });

  test('Check that thumbnail and name updated', async () => {
    const quizid = await singleQuizId();
    const quiz = await getTry(`/admin/quiz/${quizid}`, 200, {}, await validToken());
    expect(quiz.name).toBe('QUIZDIFF');
    expect(quiz.thumbnail).toBe(THUMBNAIL);
    expect(quiz.questions).toMatchObject(QUESTIONS);
  });

  /***************************************************************
                       Admin Running a Session
  ***************************************************************/

  test('Can\'t start a session with invalid token', async () => {
    const body = await postTry('/admin/quiz/123/start', 403, {});
  });

  test('Can\'t advance a session with invalid token', async () => {
    const body = await postTry('/admin/quiz/123/advance', 403, {});
  });

  test('Can\'t end a session with invalid token', async () => {
    const body = await postTry('/admin/quiz/123/end', 403, {});
  });

  test('Can\'t get session status with invalid token', async () => {
    const body = await getTry('/admin/session/123/status', 403, {});
  });

  test('Can\'t get session results with invalid token', async () => {
    const body = await getTry('/admin/session/123/results', 403, {});
  });

  test('Ensure a session cant be ended when hasn\'t started', async () => {
    const quizid = await singleQuizId();
    await postTry(`/admin/quiz/${quizid}/end`, 400, {}, await validToken());
  });

  test('Ensure a session cant be advanced when hasn\'t started', async () => {
    const quizid = await singleQuizId();
    await postTry(`/admin/quiz/${quizid}/advance`, 400, {}, await validToken());
  });

  test('Can\'t start a quiz with invalid quizid', async () => {
    const body = await postTry('/admin/quiz/99999999999/start', 403, await validToken());
  });

  test('Ensure a quiz can be started', async () => {
    const quizid = await singleQuizId();
    await postTry(`/admin/quiz/${quizid}/start`, 200, {}, await validToken());
  });

  test('A session now exists for the quiz', async () => {
    const quizid = await singleQuizId();
    const body = await getTry(`/admin/quiz/${quizid}`, 200, {}, await validToken());
    expect(typeof body.active).toBe('number');
  });

  test('A has right initial props', async () => {
    const status = await singleSessionStatus();
    expect(status.active).toBe(true);
    expect(status.answerAvailable).toBe(false);
    expect(status.isoTimeLastQuestionStarted).toBe(null);
    expect(status.position).toBe(-1);
    expect(status.questions).toMatchObject(QUESTIONS);
    expect(status.players).toMatchObject([]);
  });

  /***************************************************************
                       Try Playing
  ***************************************************************/

  test('Test player can\'t join without a name', async () => {
    const sessionId = await singleSessionId();
    await postTry(`/play/join/${sessionId}`, 400, {});
  });

  test('Test player can\'t join without a valid session ID', async () => {
    await postTry(`/play/join/${9999999999999}`, 400, {
      name: 'HAYDEN',
    });
  });

  for (const player of PLAYERS) {
    test(`Player ${player} Joins`, async () => {
      const sessionId = await singleSessionId();
      const payload = {
        name: player,
      };
      const body = await postTry(`/play/join/${sessionId}`, 200, payload);
      expect(typeof body.playerId).toBe('number');
      PLAYER_IDS.push(body.playerId);
    });
  }

  test('All players are in the session status', async () => {
    const status = await singleSessionStatus();
    expect(status.players.sort()).toMatchObject(PLAYERS.sort());
  });

  test('Players cant get questions when session hasnt started', async () => {
    for (const playerId of PLAYER_IDS) {
      await getTry(`/play/${playerId}/question`, 400, {});
    }
  });

  test('Players cant get questions answers when session hasnt started', async () => {
    for (const playerId of PLAYER_IDS) {
      await getTry(`/play/${playerId}/answer`, 400, {});
    }
  });

  test('Players cant answer questions when session hasnt started', async () => {
    for (const playerId of PLAYER_IDS) {
      await putTry(`/play/${playerId}/answer`, 400, {});
    }
  });

  test('Players cant get results when session hasnt started', async () => {
    for (const playerId of PLAYER_IDS) {
      await getTry(`/play/${playerId}/results`, 400, {});
    }
  });

  for (const questionPosition in QUESTIONS) {
    test('Try to advance the quiz', async () => {
      const quizid = await singleQuizId();
      await postTry(`/admin/quiz/${quizid}/advance`, 200, {}, await validToken());
    });

    test('Session position has increased', async () => {
      const status = await singleSessionStatus();
      expect(status.position).toBe(parseInt(questionPosition, 10));
      expect(status.active).toBe(true);
      expect(status.answerAvailable).toBe(false);
      expect(typeof status.isoTimeLastQuestionStarted).toBe('string');
    });

    test(`Players fail to submit no answers`, async () => {
      for (const playerId of PLAYER_IDS) {
        await putTry(`/play/${playerId}/answer`, 400, { answerIds: [], });
        await putTry(`/play/${playerId}/answer`, 400, {});
      }
    });

    test(`Players attempt to submit answer`, async () => {
      for (const playerId of PLAYER_IDS) {
        const payload = {
          answerIds: [ 0, 1, 2 ],
        };
        const body = await putTry(`/play/${playerId}/answer`, 200, payload);
        expect(body).toMatchObject({});
      }
    });

    test('Should be unable to start the quiz', async () => {
      const quizid = await singleQuizId();
      await postTry(`/admin/quiz/${quizid}/start`, 400, {}, await validToken());
    });

    test(`Players should not be able to get their results`, async () => {
      for (const playerId of PLAYER_IDS) {
        const body = await getTry(`/play/${playerId}/results`, 400);
      }
    });
  }

  test('Try to advance the quiz. ensure session has ended', async () => {
    const sessionId = await singleSessionId();
    const quizid = await singleQuizId();
    await postTry(`/admin/quiz/${quizid}/advance`, 200, {}, await validToken());
    const { results } = await getTry(`/admin/session/${sessionId}/status`, 200, {}, await validToken());
    expect(results.position).toBe(QUESTIONS.length);
    expect(results.active).toBe(false);
    expect(results.answerAvailable).toBe(false);
    expect(typeof results.isoTimeLastQuestionStarted).toBe('string');
  });

  test('Ensure that the session appears in old sessions', async () => {
    const quizid = await singleQuizId();
    const { oldSessions } = await getTry(`/admin/quiz/${quizid}`, 200, {}, await validToken());
    expect(oldSessions).toHaveLength(1);
  });

  test('Should be unable to advance the quiz', async () => {
    const quizid = await singleQuizId();
    await postTry(`/admin/quiz/${quizid}/advance`, 400, {}, await validToken());
  });

  test('Should be unable to end the quiz', async () => {
    const quizid = await singleQuizId();
    await postTry(`/admin/quiz/${quizid}/end`, 400, {}, await validToken());
  });

  test(`Players should be able to get their results`, async () => {
    for (const playerId of PLAYER_IDS) {
      const body = await getTry(`/play/${playerId}/results`, 200);
      expect(body).toMatchObject(QUESTIONS.map(q => ({ answerIds: [ 0, 1, 2 ], correct: false })));
    }
  });

  test('Admins can get the session results', async () => {
    const quizid = await singleQuizId();
    const { oldSessions } = await getTry(`/admin/quiz/${quizid}`, 200, {}, await validToken());
    const body = await getTry(`/admin/session/${oldSessions[0]}/results`, 200, {}, await validToken());
  });

});