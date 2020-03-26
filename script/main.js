import events from './portfolioData.js';

// Images base path
const imagesPath = '../images/';

// Page elements
// Header
let logo = document.getElementsByClassName('logo')[0];
let header = document.getElementsByClassName('header')[0];
let socialIcons = document.getElementsByClassName('social-buttons')[0];
let linkIcon = document.getElementById('social-linkedin');
let instaIcon = document.getElementById('social-instagram');
let gitIcon = document.getElementById('social-github');

// Dimension variables
let headerHeight = document.getElementsByTagName('header')[0].clientHeight; // FULL HEADER HEIGHT
let headerEffHeight = document.getElementsByClassName('header')[0].clientHeight; // ONLY LOGO HEIGHT

// Color Variables
const black = '#000';
const white = '#fff';
const primaryColor = '#1b4353';
const primaryColorTrasparent = 'rgb(27, 67, 83)';
const randomColors = ['(133, 181, 192)', '(63, 111, 121)', '(54, 95, 104)', '(31, 50, 54)'];

// Boolean to check logo position
let sideLogo = false;

// Responsive variables
const windowWidth = 992;


events.forEach((step, i) => {
    let div = document.createElement('div');
    let month = step.date.month.slice(0,3);
    let year = "'" + step.date.year.slice(2,4);

    div.className = 'timeline-step';

    div.innerHTML = `
        <div class="event-date">
            <div class="timeline-circle">
                <div class="event-icon"></div>
                <div class="event-day">${step.date.day}</div>
            </div>
        </div>
        <div class="label-content">         
            <div class="event-label">${step.label}
                <span class="date">
                    <span>${month}</span>
                    <span>${year}</span>
                </span>
                <div class="image-container"></div>
                <div class="bottom-frame"></div>
            </div>  
            <div class="link-line"></div> 
        </div>   
    `;    

    document.getElementById('content').appendChild(div);

    document.getElementsByClassName('event-icon')[i].style['backgroundImage'] = `url('${imagesPath}${step.icon}')`;
    document.getElementsByClassName('image-container')[i].style['backgroundImage'] = `url('${imagesPath}${step.mainImage}')`;
});


// SET ARROW ELEMENT AT THE END OF THE TIMELINE STEPS
let goUpArrow = document.createElement('div');
goUpArrow.id = 'go-up-arrow';
goUpArrow.innerHTML = `
                    <a id="up">⮝</a>
`;

let lastItem = document.getElementsByClassName('label-content');
document.getElementsByClassName('label-content')[lastItem.length - 1].appendChild(goUpArrow);

// GO TO THE TOP OF THE PAGE WHEN USER CLICK ON ARROW UP BUTTON
document.getElementById('up').addEventListener('click', function(item) {
    let scrollToTop = window.setInterval(function () {
        var pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 100);
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 10);
});


// ON MOUSE ENTER IN TIMELINE CIRCLE START ANIMATION & SET BACKGROUND-IMAGE
let circlesDate = [...document.getElementsByClassName('timeline-circle')];

circlesDate.forEach((circle, i) => {
    let currentCircle = document.getElementsByClassName('timeline-circle')[i];

    circle.onmouseenter = function(e) {
        //currentCircle.style.transform = "rotateY(180deg)";
        currentCircle.style.backgroundImage = `linear-gradient(rgba(27, 67, 83,0.1),rgba(27, 67, 83,0.4)), url('${imagesPath}${events[i].backImage}')`
    }

    circle.onmouseleave = function(e) {
        //currentCircle.style.transform = "rotateY(0)";
        currentCircle.style.backgroundImage = ""
        
    }
})

// SET SIDED LOGO
function sidedLogo (pos) {
    if(!pos){
        sideLogo = true;

        // Easy-In opacity for sided logo
        let opacity = 0;
        let sideHeader = setInterval(easyin, 5);
        function easyin() {
            if(opacity === 100) {
                clearInterval(sideHeader);
            } else {
                opacity++;
                document.getElementsByClassName("header")[0].style.opacity = opacity + '%'
            }
        }

        logo.innerHTML = "AS";
        logo.classList.remove("logo-extended");
        logo.classList.add("logo-minify");

        header.classList.add("header-sided");

        socialIcons.classList.remove("social-buttons");
        socialIcons.classList.add("social-buttons-sided");

        linkIcon.classList.add("social-linkedin-sided");
        instaIcon.classList.add("social-instagram-sided");
        gitIcon.classList.add("social-github-sided");

        
    }
    
    
}

// SET DEFAULT LOGO POSITION
function defaultLogo () {
    sideLogo = false;
    logo.innerHTML = "Alberto Secci"
    logo.classList.remove("logo-minify")
    logo.classList.add("logo-extended")

    header.classList.remove("header-sided");

    socialIcons.classList.add("social-buttons");
    socialIcons.classList.remove("social-buttons-sided");

    linkIcon.classList.remove("social-linkedin-sided");
    instaIcon.classList.remove("social-instagram-sided");
    gitIcon.classList.remove("social-github-sided");
}


// CHECK PAGE VERTICAL OFFSET TO CHANGE LOGO POSITION
window.addEventListener('scroll', function() {
    console.log(window.innerWidth);
    // Compare Y offset with difference between full height & logo height => start logo animation
    if(window.pageYOffset > (headerHeight - headerEffHeight) && window.innerWidth > windowWidth) {
        sidedLogo(sideLogo);
    } else {
        defaultLogo();
    }
});


// Hover effect on social icons
[...document.getElementsByClassName("social-icon")].forEach((icon) => {
    icon.addEventListener('mouseenter', function() {
        let id = icon.getAttribute("id");
        let path = imagesPath + id + '-main.png';

        icon.getElementsByTagName("img")[0].setAttribute("src", path);
        icon.style.backgroundColor = white;
        icon.style.border = `1px solid ${primaryColorTrasparent}`
    })

    icon.addEventListener('mouseleave', function() {
        let id = icon.getAttribute("id");
        let path = imagesPath + id + '.png';

        icon.getElementsByTagName("img")[0].setAttribute("src", path);
        icon.style.backgroundColor = primaryColorTrasparent;
        icon.style.border = 'none'
    })
});


// Random color background on logo div e footer credits with no repetition
[...document.getElementsByClassName('randomBack')].forEach((elem) => {
    elem.addEventListener('mouseenter', function() {
        let randColor = 'rgb' + randomColors[Math.floor(Math.random()*randomColors.length)];
        while (elem.style.backgroundColor === randColor) {
            randColor = 'rgb' + randomColors[Math.floor(Math.random()*randomColors.length)];
        }
        elem.style.backgroundColor = randColor;
        
    })
});


// Show/hide image when user mouseenter on event label
[...document.getElementsByClassName('event-label')].forEach((elem, i) => {
    // Triggered when mouse-enter
    let down = false;
    // Triggered when mouse-leave
    let up = false;
    // Animation lifetime
    const animTime = 4;
    
    elem.addEventListener('mouseenter', function() {
        up = false;
        down = true;
        let heightFrame = elem.getElementsByClassName('bottom-frame')[0].clientHeight;  // Bottom frame height
        let heightImg = elem.getElementsByClassName('image-container')[0].clientHeight; // Image container height
        
        // Start frame animation first
        let frameCompare = setInterval(fCompare, animTime);
        let imgCompare;

        function fCompare() {
            if(heightFrame === 10 || up) { // Triggered only if MAX height or mouseleave event
                clearInterval(frameCompare);
                imgCompare = setInterval(iCompare, animTime); // Sync animation (First frame then image)
            } else {
                heightFrame+=2; // 2 pixels at time to increase animation velocity
                elem.getElementsByClassName('bottom-frame')[0].style.height = heightFrame + 'px'
            }
        }
        function iCompare() {
            if(heightImg === 300 || up) {
                clearInterval(imgCompare);
            } else {
                heightImg+=2;
                elem.getElementsByClassName('image-container')[0].style.height = heightImg + 'px'
            }
        }
    });

    elem.addEventListener('mouseleave', function() {
        up = true;
        down = false;
        let heightFrame = elem.getElementsByClassName('bottom-frame')[0].clientHeight; 
        let heightImg = elem.getElementsByClassName('image-container')[0].clientHeight; 
        let imgCompare = setInterval(iCompare, animTime);   
        let frameCompare;     

        function fCompare() {
            if(heightFrame === 0 || down) {
                clearInterval(frameCompare);
            } else {
                heightFrame-=2;
                elem.getElementsByClassName('bottom-frame')[0].style.height = heightFrame + 'px'
            }
        }

        function iCompare() {
            if(heightImg === 0 || down) {
                clearInterval(imgCompare);
                frameCompare = setInterval(fCompare, animTime);
            } else {
                heightImg-=2;
                elem.getElementsByClassName('image-container')[0].style.height = heightImg + 'px'
            }
        }
    });
});


