

const nandibus = document.querySelector('.nandibus');
const nandibusWitdh = nandibus.clientWidth;

const resizeNandibus = () => {
    const basesize = visualViewport.width < 1200 ? visualViewport.width - 100 : 1200;
    const scale = basesize / nandibusWitdh - 0.001;
    nandibus.style.transform = `scale(${scale})`;
}

resizeNandibus();

window.addEventListener('resize', resizeNandibus);