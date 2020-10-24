
/* INIT */

const nandibus = document.querySelector('.nandibus');


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

const keys = document.querySelectorAll('.key');
const keyPressSound = document.getElementById('key-press-sound');

Array.from(keys).forEach(el => el.addEventListener('click', () => keyPressSound.play() ));
