const page = Object.fromEntries(['countdown', 'start', 'pause', 'reset'].map(id => [id, document.getElementById(id)]));
const timerLength = 5 * 60 * 1000;

// data State = Stopped
//            | Running { target : DateTime }
//            | Paused { time : Duration }

let state = { kind: 'stopped' };

function render() {
    let now = Date.now();
    let time, canStart, canPause, canReset;

    switch (state.kind) {
        case 'stopped':
            time = durationToString(timerLength);
            canStart = true;
            canPause = false;
            canReset = false;
            break;
        case 'running':
            if (state.target <= now) {
                time = 'Done!';
                canStart = false;
                canPause = false;
                canReset = true;
            } else {
                time = durationToString(state.target - now);
                canStart = false;
                canPause = true;
                canReset = true;
            }
            break;
        case 'paused':
            time = durationToString(state.time);
            canStart = true;
            canPause = false;
            canReset = true;
            break;
    }

    page.countdown.textContent = time;
    page.start.disabled = !canStart;
    page.pause.disabled = !canPause;
    page.reset.disabled = !canReset;

    requestAnimationFrame(render);
}

function start() {
    switch (state.kind) {
        case 'stopped':
            state = { kind: 'running', target: Date.now() + timerLength };
            break;
        case 'paused':
            state = { kind: 'running', target: Date.now() + state.time };
            break;
    }
}

function pause() {
    switch (state.kind) {
        case 'running':
            state = { kind: 'paused', time: Math.max(0, state.target - Date.now()) };
            break;
    }
}

function reset() {
    state = { kind: 'stopped' };
}

page.start.addEventListener('click', start);
page.pause.addEventListener('click', pause);
page.reset.addEventListener('click', reset);
render();

function durationToString(durn) {
    let ms = durn % 1000 | 0;
    durn /= 1000;

    let s = durn % 60 | 0;
    durn /= 60;

    let m = durn % 60 | 0;
    durn /= 60;

    let h = durn | 0;

    return (h != 0 ? [h, m, s] : [m, s])
        .map(x => x.toString().padStart(2, '0'))
        .join(':')
        + '.'
        + ms.toString().padEnd(3, '0');
}
