let toggle = document.querySelector(".toggle");

toggle.onclick = function () {
    let setting = document.querySelector(".setting-box");
    let gear = document.querySelector(".toggle i");
    gear.classList.toggle("fa-spin");
    setting.classList.toggle("open")
}
// colors
let allLis = document.querySelectorAll(".option-sett .colors-list li");
allLis.forEach (function (ele) {
    ele.onclick = function (e) {
        active(e);
    }
});
allLis.forEach (li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
    })
});
let mainColor = localStorage.getItem("color-option");
allLis.forEach(element => {
    if (element.dataset.color === mainColor) {
        element.classList.add("active");
    }
})
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
}
// random backgrond yes || no
let backgrondClear = true;
let backgrondClearIn;
let backgrondLocal = localStorage.getItem("background-option");

if (backgrondLocal !== null) {
    if (backgrondLocal === 'true') {
        document.querySelector(".yes").classList.add("active");
    }else {
        document.querySelector(".no").classList.add("active");
    }
    document.querySelectorAll(".random-bg span").forEach (el => {
        el.classList.remove("active");
    });
    if (backgrondLocal === 'true') {
        document.querySelector(".yes").classList.add("active");
    }else {
        document.querySelector(".no").classList.add("active");
    }
};

let span = document.querySelectorAll(".random-bg span");
span.forEach (function (el) {
    el.onclick = function (e) {
        active(e);
        if (el.dataset.background === 'yes') {
            backgrondClear = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);
        }else {
            backgrondClear = false;
            clearInterval(backgrondClearIn);
            localStorage.setItem("background-option", false);
        }
    }
});
// show bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");
if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else {
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletsSpan.forEach (span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'block') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');
        }else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        };
        active(e)
    });
});
// reset setting
document.querySelector(".reset-options").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullets-option");
    window.location.reload();
};
// end reset setting
// end Setting
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// End Navigation Bullets
let allLinks = document.querySelectorAll(".list a");
// function scrollTo 
function scrollTo (element) {
    element.forEach (ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView ({
                behavior: "smooth"
            })
        })
    })
}
scrollTo (allLinks);
scrollTo (allBullets);
// Select All Links
let toggleBtn = document.querySelector(".toggle-menu");
let toggleSpan = document.querySelector(".list")
toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active")
    toggleSpan.classList.toggle("open")
}
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== toggleSpan) {
        if (toggleSpan.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active")
            toggleSpan.classList.toggle("open")
        }
    }
});
toggleSpan.onclick = function (e) {
    e.stopPropagation();
}
// end header toggle 
let landing = document.querySelector(".landing-page");

let imgsArray = ["landing-1.png", "landing-2.png", "landing-3.png", "landing-4.png", "landing-5.png"];

function randomizeImgs () {
    if (backgrondClear === true) {
        backgrondClearIn = setInterval(function () {
            let random = Math.floor(Math.random() * imgsArray.length);
            landing.style.backgroundImage = 'url("./images/'+imgsArray[random]+'")';
        },10000);
    }
}
randomizeImgs();

let headerList = document.querySelectorAll(".list li a");
headerList.forEach (function (ele) {
    ele.onclick = function () {
        headerList.forEach(function (ele) {
            ele.classList.remove("active");
        })
        this.classList.add("active");
    }
});
// end landing Images 
let skills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsTop = skills.offsetTop;
    let skillsHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let scrollTop = this.pageYOffset;
    // console.log(scrollTop); // 1068 (change)
    // console.log(skillsTop); // 1002
    // console.log(skillsHeight); // 635
    // console.log(windowHeight); // 625
    if (scrollTop > (skillsTop + skillsHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .progress span");
        allSkills.forEach (skill => {
            skill.style.width = skill.dataset.progress;
        });
    };
};
// End our skills
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach (img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.classList.add("popup-overlay");
        document.body.append(overlay);
        let popupBox = document.createElement("div");
        popupBox.classList.add("popup-box");
        if (img.alt !== null) {
            let imageHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imageHeading.appendChild(imgText);
            popupBox.appendChild(imageHeading);
        };
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span");
        let x = document.createTextNode("x");
        closeButton.appendChild(x);
        closeButton.classList.add("close-button");
        popupBox.appendChild(closeButton);
    });
});
// End close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    };
});
// End Gallery Popup
let year = document.querySelectorAll(".year");
let date = new Date();
year.forEach(e => {
    e.innerHTML = date.getFullYear();
})
// End Timeline
// Handle Active
function active(e) {
    e.target.parentElement.querySelectorAll(".active").forEach (ele => {
        ele.classList.remove("active");
    });
    e.target.classList.add("active");
};
// End Handle Active