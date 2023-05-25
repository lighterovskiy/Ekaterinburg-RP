document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.header__menu').classList.toggle('open');
    document.querySelector('body').classList.toggle('lock')
});

const popupLinks = document.querySelectorAll('.popup-open');
let unlock = true; 
const timeout = 800;
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

const links = document.querySelectorAll(".menu__link,.btn")
if  (links.length > 0) {
    links.forEach((item) => {
        item.addEventListener("click", () => {
            let el = document.getElementById(item.getAttribute("data-link"))
            el.scrollIntoView({behavior:"smooth", block:"center"})
        })
    
    })
}
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function(e) {
            const PopupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(PopupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        }
        else {
            if (window.matchMedia("(max-width: 777px)").matches) {
               document.querySelector('.burger').classList.add('noneclass');
            }
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open')
        if (window.matchMedia("(max-width: 777px)").matches) {
            document.querySelector('.burger').classList.remove('noneclass');
         }
        if (doUnlock) {
            bodyUnlock();
        }
    }
}




function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
function bodyUnlock() {
    setTimeout(function () {
     if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}
