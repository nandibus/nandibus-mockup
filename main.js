

const nandibus = document.querySelector('.nandibus');
const keysArray = document.querySelectorAll('.key');
const nandibusWitdh = nandibus.clientWidth;

const resizeNandibus = () => {
    const basesize = visualViewport.width < 1200 ? visualViewport.width - 100 : 1200;
    const scale = basesize / nandibusWitdh - 0.001;
    nandibus.style.transform = `scale(${scale})`;
}

const addEventListenersToKeys = ()=>{
    Array.from(keysArray).forEach(function(element) {
        element.addEventListener('click', playclip);
      });
}

resizeNandibus();
addEventListenersToKeys();

window.addEventListener('resize', resizeNandibus);

function playclip (){
    if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8")!=-1)) {
    if (document.getElementById('nandibus'))
     {
      document.getElementById('nandibus').sound.src = "sounds/click.mp3";
     }
    }
    
    else {
    {
    var audio = document.getElementsByTagName("audio")[0];
    audio.play();
    }
    }
    }
    