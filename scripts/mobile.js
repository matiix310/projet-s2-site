
//  Initialize Swiper
let swiper = new Swiper(".members-swiper", {
    effect: "cards",
    grabCursor: true,
});

// Listen to swiper click event
const cardClickHandler = (index) => {
    const cards = document.getElementsByClassName('swiper-slide');
}

const cardsPicto = document.getElementsByClassName('picto-container');
for (let i = 0; i < cardsPicto.length; i++)
    cardsPicto.item(i).addEventListener('click', cardClickHandler);


// INIT

const init = () => {
   
    // TITLE ANIMATION
    const title = document.getElementById('title');
    
    cursorAnim(title);
    titleAnim(0, title);

    // PRESENTATION SLIDER
    setSliderState(0, false);
}

init();