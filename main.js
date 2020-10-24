
/* INIT */

const nandibus = document.querySelector('.nandibus');
const keys = Array.from(document.querySelectorAll('.key'));
let turnon = false;


/* RESIZE NANDIBUS */

const nandibusWitdh = nandibus.clientWidth;

const resizeNandibus = () => {
    const basesize = visualViewport.width < 1200 ? visualViewport.width - 100 : 1200;
    const scale = basesize / nandibusWitdh - 0.001;
    nandibus.style.transform = `scale(${scale})`;
}

resizeNandibus();
window.addEventListener('resize', resizeNandibus);


/* ADD SOUND TO KEY PRESS */

const keyPressSound = document.getElementById('key-press-sound');
const playSound = () => keyPressSound.paused ? keyPressSound.play() : keyPressSound.currentTime = 0;

const manageKeyPressEvent = ()=>{
    playSound();
    lightsAnimation(keyPressedAnimation, 100);
}

keys.forEach(key => key.addEventListener('click', manageKeyPressEvent ));


/* CLICK NANDIBUS KEY ON KEYPRESS */

window.addEventListener('keydown', e => {
    const key = keys.filter(key => key.dataset.keycode === e.code)[0];

    if (!key) { return; }

    key.classList.add('hover');
    key.classList.add('active');
    key.click();

    setTimeout(() => {
        key.classList.remove('active');
    }, 100);
});

/* LIGHT ANIMATION */

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const lights = {
    blue: document.querySelector('.nandibus-lights .blue'),
    red: document.querySelector('.nandibus-lights .red'),
    yellow: document.querySelector('.nandibus-lights .yellow')
};

const turnOffLights = () => {
    lights.blue.classList.remove('--on');
    lights.red.classList.remove('--on');
    lights.yellow.classList.remove('--on');
};

const lightsAnimation = (states, defaultDuration) => {
    if (!turnon) { return; }


    const stateTransformed = states.map(state => {
        return { 
            action: () => {
                turnOffLights();
                state.active.forEach(el => el.classList.add('--on'));
            },
            delay: state.duration | defaultDuration
        }
    });

    const executeStep = (pos, states) => {
        const state = states[pos];
        if (!state || !turnon) { return; }
        state.action();
        sleep(state.delay).then(() => { executeStep(pos + 1, states); });
    }
    
    executeStep(0, stateTransformed);
};

const turnOnAnimation = [
    { active: [ lights.blue ] },
    { active: [ lights.red ] },
    { active: [ lights.yellow ] },
    { active: [ lights.red ] },
    { active: [ lights.blue ] },
    { active: [ ] },
    { active: [ lights.blue, lights.red, lights.yellow ] },
    { active: [ ] },
    { active: [ lights.blue, lights.red, lights.yellow ] },
];

const keyPressedAnimation = [
    { active: [ ] },
    { active: [ lights.blue,lights.red  ] },
    { active: [ lights.red ] },
    { active: [ lights.yellow ] },
    { active: [ lights.red, lights.blue ] },
    { active: [ lights.red, lights.blue, lights.yellow ] },
];


/* TURN ON AND OFF */

const powerButton = document.querySelector('.power');

powerButton.addEventListener('click', () => {
    turnon = !turnon;

    turnon ?
        lightsAnimation(turnOnAnimation, 300) :
        turnOffLights();
});
