
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

/**
 * Set the menu progress to the provided `progess` index
 * @param {number} progress the progress index of the menu
 */
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


// MEMBERS

/**
 * Get the maximum width of the images
 * @returns {number} the maximum width of the images
 */
const getMaxWidth = () => {
    let max = 0;
    const images = document.getElementById('members').getElementsByClassName('image');

    for (let i = 0; i < images.length; i++)
        if (max < images.item(i).getClientRects().item(0).width)
            max = images.item(i).getClientRects().item(0).width;

    return max;
}

/**
 * Set the members slider state by its `index`
 * @param {number} index 
 */
const setMemberState = () => {
    const selectedImage = document.getElementById('members').getElementsByClassName('selected').item(0);
    const leftOffset = selectedImage.getClientRects().item(0).left;
    // get the maximim width
    const maxWidth = getMaxWidth();

    // set the border proprties
    const borderElement = document.getElementById('imageBorder');
    borderElement.style.left = leftOffset + 'px';
    borderElement.children.item(1).style.width = maxWidth + 'px';

    // set the title properties
    const imageBorderTitle = document.getElementById('imageBorderTitle');
    imageBorderTitle.style.width = maxWidth + 'px';
    imageBorderTitle.textContent = selectedImage.getAttribute('name');

    // set the jsContainer properties
    const jsContainer = document.getElementById('jsContainer');
    jsContainer.style.width = maxWidth + 'px';

    // set the show more title properties
    const showMoreTitle = document.getElementById('showMoreTitle');
    showMoreTitle.textContent = `./show_more.sh "${selectedImage.getAttribute('name')}"`;

    // set the show more content properties
    const showMoreContent = document.getElementById('showMoreContent');
    showMoreContent.innerHTML = descriptions[selectedImage.getAttribute('name')];
};

const initMembersListener = () => {
    const members = document.getElementById('members').getElementsByClassName('image');
    
    for (let i = 0; i < members.length; i++)
        members.item(i).addEventListener('click', () => {
            // remove the selected class for every image element
            for (let j = 0; j < members.length; j++)
                members.item(j).classList.remove('selected');

            // add the selected class to the selected image element
            members.item(i).classList.add('selected');

            setTimeout(() => {
                setMemberState();
            }, 300);
        })
};


// PROJECT TIMELINE

/**
 * Set the new index of the timeline
 * @param {number} index the new index of the timeline
 */
const setTimelineState = (index) => {
    
    // set the button style
    const buttons = document.getElementsByClassName('presentation-indicator').item(0).children;
    for(let i = 0; i < buttons.length; i++)
        if (i == index)
            buttons.item(i).classList.add('selected');
        else
            buttons.item(i).classList.remove('selected');

    // set the graph style
    for (let i = 0; i < buttons.length; i++)
        if (i == index)
            document.getElementById('graph-container' + (i+1)).classList.remove('hidden');
        else
            document.getElementById('graph-container' + (i+1)).classList.add('hidden');
    
}

/**
 * Add the onclick event listener to each button of the timeline
 */
const addTimelineButtonListener = () => {
    const buttons = document.getElementsByClassName('presentation-indicator').item(0).children;

    for (let i = 0; i < buttons.length; i++) {
        buttons.item(i).addEventListener('click', () => {
            setTimelineState(i);
        })
    }
}

/**
 * compute the exact scale factor to display correctly the graph in the timeline
 */
const adjustTimelineSize = () => {
    document.getElementsByClassName('graph').item(0).style.scale = (0.0571*window.innerWidth - 10.0658) + '%'
    document.getElementsByClassName('graph').item(1).style.scale = (0.0571*window.innerWidth - 10.0658) + '%'
    document.getElementsByClassName('graph').item(2).style.scale = (0.0571*window.innerWidth - 10.0658) + '%'
}


// CONTACT

const addContactFormListener = () => {
    const questionElements = document.getElementsByClassName('contact-question-container');

    for (let i = 0; i < questionElements.length; i++) {
        questionElements.item(i).addEventListener('click', () => {
            questionElements.item(i).getElementsByClassName('input').item(0).focus();
        })
    }

    document.getElementById('contactButton').addEventListener('click', () => {
        alert('Contact form successfully sent!')
        location.reload();
    })
}

// REDIRECT TO THE MOBILE WEBSITE
// DEPENDING ON THE SCREEN WIDTH AND THE USER AGENT

const redirectMobileWebsite = () => {
    var is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    if (is_mobile)
        document.location.href = "m";
}

// MAIN LOOP TO RENDER THE ANIMATIONS

const renderAnimation = () => {
    setTimeout(() => {
        setMemberState();
    }, 300);

    adjustTimelineSize();

    // get the width size
    const width = window.innerWidth;
    redirectMobileWebsite();
};


// GLOBAL INIT

/**
 * Launch the mandatory functions of the home page
 */
const init = () => {

    // TITLE ANIMATION
    const title = document.getElementById('title');

    cursorAnim(title);
    titleAnim(0, title);
    setMenuProgress(0);
    setSliderState(0, true);
    initMembersListener();
    setTimelineState(0);
    addTimelineButtonListener();
    renderAnimation();
    addContactFormListener();
    window.requestAnimationFrame(setTerminalMenuStyle);
}

init();
window.onresize = renderAnimation;