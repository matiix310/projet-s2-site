
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



// UTILS

const sleep = async (time) => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}