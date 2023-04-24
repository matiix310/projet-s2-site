
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


// UTILS

const sleep = async (time) => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}