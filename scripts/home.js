
// TITLE ANIMATION

const title = document.getElementById('title');

const cursorAnim = () => {
    const interval = 500;
    setInterval(() => {
        title.children[2].style.opacity = "0"
        setTimeout(() => {
            title.children[2].style.opacity = "1"
        }, interval);
    }, interval*2);
}

const titleAnim_remove = async (interval, length) => {
    return new Promise((resolve, reject) => {
        let counter = 0;
        var looper = setInterval(() => {
            title.children[1].textContent = title.children[1].textContent.substring(0, title.children[1].textContent.length-1);
            counter ++;
    
            if (counter == length+1) {
                clearInterval(looper);
                resolve();
            }
        }, interval);
    })
}

const titleAnim_write = async (interval, word) => {
    return new Promise((resolve, reject) => {
        let counter = 0;
        var looper = setInterval(() => {
            title.children[1].textContent = word.substring(0, counter+1);
            counter ++;
    
            if (counter == word.length+1) {
                clearInterval(looper);
                resolve();
            }
        }, interval);
    })
}

const titleAnim = async (currentIndex) => {
    const interval = 200;
    const words = ['Termin@l', 'by !001', 'dotnet run'];

    // write the word
    await titleAnim_write(interval, words[currentIndex]);

    await sleep(1500)

    // remove word
    await titleAnim_remove(interval, words[currentIndex].length);

    titleAnim((currentIndex+1)%words.length);
}

cursorAnim();
titleAnim(0);



// SIDE MENU BEHAVIOUR

const sideMenu = document.getElementsByClassName('sideMenu')[0];

for (let i = 1; i < sideMenu.children.length; i++) {
    const menuButton = sideMenu.children.item(i);
    const target = menuButton.getAttribute('target');
    menuButton.addEventListener('click', (_) => {
        const yCoord = document.getElementById(target).offsetTop;
        // update the menu progress
        setMenuProgress(i);
        // scroll to the selected wrapper
        window.scrollTo(0, yCoord)
    })
}


const setMenuProgress = (progress) => {
    const menuButtons = document.getElementsByClassName('sideMenu')[0].children;

    if (progress >= menuButtons.length) return;

    // update the bar size
    document.getElementById('menuProgressBar').style.height = (progress-1)*21 + 'vh'

    // remove selected to the next buttons
    for (let j = progress+1; j < menuButtons.length; j++) {
        menuButtons.item(j).classList.remove('selected');
    }

    // add selected to the current and previous buttons
    for (let j = 1; j <= progress; j++) {
        menuButtons.item(j).classList.add('selected')
    }
}


// OBSERVER

const wrappers = document.getElementsByClassName('wrapper');
const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            setMenuProgress(parseInt(entry.target.getAttribute('index')))
        }
    }
}, {
    threshold: .7
});

for (let i = 0; i < wrappers.length; i++) {
    observer.observe(wrappers.item(i));
}


// SCROLL ANIMATIONS

const setTerminalMenuStyle = () => {
    const top = window.pageYOffset;

    // translation
    if (top >= 0 && top <= window.innerHeight) {

        const startingSize = {
            width: window.innerWidth * .09,
            height: window.innerWidth * .32,
        }

        const endingSize = {
            width: window.innerWidth * .15,
            height: window.innerWidth * .24,
        }

        const startingPosition = {
            x: window.innerWidth * .530,  // 57.5% of the screen width
            y: window.innerHeight * .20 + window.innerWidth * .03,  // 21.0% of the screen height
        };

        const endingPosition = {
            x: window.innerWidth - endingSize.width - window.innerWidth * .10,
            y: window.innerHeight + (window.innerHeight / 2) - (endingSize.height / 2),
        }

        // get the scroll percentage (between 0 and 1)
        let scrollPercentage = (top / window.innerHeight)*1.1;
        if (scrollPercentage > 1) scrollPercentage = 1;
        // compute the current position
        const topOffset = ((endingPosition.y - startingPosition.y) * scrollPercentage) + startingPosition.y;
        const leftOffset = ((endingPosition.x - startingPosition.x) * scrollPercentage) + startingPosition.x;
        // compute the height
        const height = ((endingSize.height - startingSize.height) * scrollPercentage) + startingSize.height;
        const width = ((endingSize.width - startingSize.width) * scrollPercentage) + startingSize.width;

        document.getElementById('terminalMenuContainer').style.top = topOffset + 'px';
        document.getElementById('terminalMenuContainer').style.left = leftOffset + 'px';
        document.getElementById('terminalMenuContainer').style.background = `rgba(0, 0, 0, ${scrollPercentage*0.95})`;
        document.getElementById('terminalMenuContainer').style.height = height + 'px';
        document.getElementById('terminalMenuContainer').style.width = width + 'px';
    }

    // reload the animation
    window.requestAnimationFrame(setTerminalMenuStyle);
}


// UTILS

/**
 * Sleep the current thread for `time`ms
 * @param {number} time in ms 
 * @returns {Promise<void>}
 */
const sleep = async (time) => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}


// PRESENTATION SLIDER

/**
 * Set the presentation slider bottom button state
 * @param {number} index the index of the slider to activate
 */
const setSliderButtonState = (index) => {
    const buttonContainer = document.getElementById('sliderButtonContainer');

    // fill with the missing button
    if (buttonContainer.childElementCount != presentations.length) {
        buttonContainer.innerHTML = '';
        for (let i = 0; i < presentations.length; i++) {
            spanElement = document.createElement('span');
            addMouseEffectToElement(spanElement);
            spanElement.addEventListener('click', (e) => setSliderState(i))
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
 * Set the presentation slider text by its index
 * @param {number} index the index of the text to display
 */
const setSliderState = (index) => {
    if (index >= presentations.length || index < 0)
        index = 0;

    // remove the mouse hover effect to the links
    removeMouseEffectToElements(document.getElementById('sliderPresentation').getElementsByTagName('a'));

    document.getElementById('sliderPresentation').innerHTML = presentations[index];

    // add the mouse hover effect to the links
    addMouseEffectToElements(document.getElementById('sliderPresentation').getElementsByTagName('a'));

    setSliderButtonState(index);
}


// GLOBAL INIT

/**
 * Launch the mandatory functions of the home page
 */
const init = () => {
    setMenuProgress(0);
    setSliderState(0);
    window.requestAnimationFrame(setTerminalMenuStyle);
}

init();