// PRESENTATION SLIDER

/**
 * Set the presentation slider bottom button state
 * @param {number} index the index of the slider to activate
 */
const setSliderButtonState = (index, mouseEffect) => {
    const buttonContainer = document.getElementById('sliderButtonContainer');

    // fill with the missing button
    if (buttonContainer.childElementCount != presentations.length) {
        buttonContainer.innerHTML = '';
        for (let i = 0; i < presentations.length; i++) {
            spanElement = document.createElement('span');
            if (mouseEffect)
                addMouseEffectToElement(spanElement);
            spanElement.addEventListener('click', (e) => setSliderState(i, mouseEffect))
            buttonContainer.appendChild(spanElement);
        }
    }

    // set the active button
    for (let i = 0; i < buttonContainer.childElementCount; i++)
        if (i == index)
            buttonContainer.children.item(i).classList.add('selected');
        else
            buttonContainer.children.item(i).classList.remove('selected');
}

/**
 * Set the presentation slider text by its `index`
 * @param {number} index the index of the text to display
 */
const setSliderState = (index, mouseEffect) => {
    if (index >= presentations.length || index < 0)
        index = 0;

    if (mouseEffect)
        // remove the mouse hover effect to the links
        removeMouseEffectToElements(document.getElementById('sliderPresentation').getElementsByTagName('a'));

    document.getElementById('sliderPresentation').innerHTML = presentations[index];

    if (mouseEffect)
        // add the mouse hover effect to the links
        addMouseEffectToElements(document.getElementById('sliderPresentation').getElementsByTagName('a'));

    setSliderButtonState(index, mouseEffect);
}