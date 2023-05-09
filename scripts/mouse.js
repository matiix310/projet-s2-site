
// Mouse effect

const mouseHexa = document.getElementById("mouseHexa");
const mouseDom = document.getElementById("mouse");

/**
 * the coordinates of the custom mouse
 */
const mouse = {
    x: 0,
    y: 0
};
let clicked = false;
let hoverElements = document.querySelectorAll(".hoverElement");

document.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

document.addEventListener("mousedown", (e) => {
    if (clicked) return;
    clicked = true;
    mouseHexa.classList.add("clicked")
    setTimeout(() => {
        mouseHexa.classList.remove("clicked")
        clicked = false;
    }, 300);
});

const mouseOverHandler = (e) => {
    mouseHexa.classList.add("focus");
    mouseDom.style.opacity = 0;
}

const mouseLeaveHandler = (e) => {
    mouseHexa.classList.remove("focus");
    mouseDom.style.opacity = 1;
}

/**
 * Add the mouse hover effect to a custom `element`
 * @param {Element} element the html element you want to add the hover effect
 */
const addMouseEffectToElement = (element) => {
    element.addEventListener("mouseover", mouseOverHandler, true)
    element.addEventListener("mouseleave", mouseLeaveHandler, true)
}

/**
 * Remove the mouse hover effect to a custom `element`
 * @param {Element} element the html element you want to remove the hover effect
 */
const removeMouseEffectToElement = (element) => {
    element.removeEventListener("mouseover", mouseOverHandler, true);
    element.removeEventListener("mouseleave", mouseLeaveHandler, true);
}

hoverElements.forEach(addMouseEffectToElement);

/**
 * Add the class hoverElement to the `elements` provided
 * @param {HTMLCollection} elements The elements you want to animate with the cursor hover effect
 */
const addMouseEffectToElements = (elements) => {
    for (let i = 0; i < elements.length; i++)
        addMouseEffectToElement(elements.item(i))
}

/**
 * Remove the class hoverElement to the `elements` provided
 * @param {HTMLCollection} elements The elements you want to remove the custom hover effect
 */
const removeMouseEffectToElements = (elements) => {
    for (let i = 0; i < elements.length; i++)
        removeMouseEffectToElement(elements.item(i))
}

addMouseEffectToElements(document.getElementsByTagName('a'))


/**
 * Set the position of the custom mouse
 */
const setMouseEffect = () => {

    mouseHexa.style.left = lerp(mouseHexa.offsetLeft, mouse.x - mouseHexa.clientWidth / 2, 0.15) + "px";
    mouseHexa.style.top = lerp(mouseHexa.offsetTop, mouse.y - mouseHexa.clientHeight / 2, 0.15) + "px";
    mouseDom.style.left = (mouse.x - mouseDom.clientWidth) + "px";
    mouseDom.style.top = (mouse.y - mouseDom.clientHeight/2) + "px";

    requestAnimationFrame(setMouseEffect);
};

setMouseEffect();


// Utils

/**
 * Get the intermediate value between `start` and `end` at a specific `time`
 * @param {number} start the starting value
 * @param {number} end the ending value
 * @param {number} time 
 * @returns 
 */
function lerp(start, end, time) {
    return start * (1 - time) + end * time;
}
