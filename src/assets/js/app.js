let navMenu = document.querySelector('.header__nav');
let btnMenu = document.querySelector('.header__menuBtn');

let menuIsSwitch = false;

function switchMenu(e) {
    let translate = menuIsSwitch === false ? 'translateY(0)' : 'translateY(-200%)';  

    navMenu.style.transform = translate;

    if (translate === 'translateY(-200%)') {
        btnMenu.blur();
    }

    menuIsSwitch = !menuIsSwitch;
}

btnMenu.addEventListener('click', switchMenu)

btnMenu.addEventListener('blur', (e) => {
    setTimeout(function() {
        menuIsSwitch = true;

        switchMenu(e);
    }, 500);
})


let btnArrow = document.querySelector('.arrowSlideDown');

function scrollDocument(e, duration) {
    if (e.target.tagName !== "BUTTON") return; 

    let sectionId = e.target.dataset.section;
    let section = document.querySelector(`${sectionId}`);

    let sectionCoords = section.getBoundingClientRect();

    $(document.documentElement).animate({
        scrollTop: (sectionCoords.y + pageYOffset) - 90
    }, duration)
}

navMenu.addEventListener('click', (e) => scrollDocument.call(this, e, 500));
btnArrow.addEventListener('click', (e) => scrollDocument.call(this, e, 1000));