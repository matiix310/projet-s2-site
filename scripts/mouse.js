

// Mouse effect

const mouseHexa = document.getElementById("mouseHexa");
const mouseDom = document.getElementById("mouse");

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

hoverElements.forEach((el) => {
    el.addEventListener("mouseover", (e) => {
        mouseHexa.classList.add("focus");
        mouseDom.style.opacity = 0;
    })

    el.addEventListener("mouseleave", (e) => {
        mouseHexa.classList.remove("focus");
        mouseDom.style.opacity = 1;
    })
});

const setMouseEffect = () => {

    mouseHexa.style.left = lerp(mouseHexa.offsetLeft, mouse.x - mouseHexa.clientWidth / 2, 0.15) + "px";
    mouseHexa.style.top = lerp(mouseHexa.offsetTop, mouse.y - mouseHexa.clientHeight / 2, 0.15) + "px";
    mouseDom.style.left = (mouse.x - mouseDom.clientWidth) + "px";
    mouseDom.style.top = (mouse.y - mouseDom.clientHeight/2) + "px";

    requestAnimationFrame(setMouseEffect);
};

setMouseEffect();


// utils

function lerp(start, end, time) {
    return start * (1 - time) + end * time;
}
