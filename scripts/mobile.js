const init = () => {
   
    // TITLE ANIMATION
    const title = document.getElementById('title');
    
    cursorAnim(title);
    titleAnim(0, title);

    // PRESENTATION SLIDER
    setSliderState(0, false);
}

init();