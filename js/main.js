//Check if there's color in localstorage or not
let mainColor = localStorage.getItem("colorOption");

//Switch Colors Buttons
const colorsLi = document.querySelectorAll(".colors-list li");

//bg random option buttons
const random_bg_btns = document.querySelectorAll(".random-bg span");

//Background Option
let backgroundOption = true;

//background Interval
let backgroundInterval;

//get background option in localStorage
let backgroundLocalItem = localStorage.getItem("backgroundOption");

//check if there's background option in localstorage
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem == "true") {
    backgroundOption = true;
  } else backgroundOption = false;

  //remove all active class from all spans
  document.querySelectorAll(".random-bg span").forEach((element) => {
    element.classList.remove("active");
  });
  //add active class on element its dataset === backgroundLocalItem in localStorage
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-bg span.yes").classList.add("active");
  } else {
    document.querySelector(".random-bg span.no").classList.add("active");
  }
}
// ========================================================================================================

//* Get mainColor from Localstorage
if (mainColor !== null) {
  //get color from localstorage and set it as mainColor for the site
  document.documentElement.style.setProperty("--mainColor", mainColor);

  // Remove active class from all color list elements
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //Add active class on element it's data-color = mainColor in loacal storage
    if (element.dataset.color == mainColor) element.classList.add("active");
  });
}

//*======Close and open Sidebar Code============
//Toggle on .settings-box-icon
document.querySelector(".settings-box-icon .fa-cog").onclick = function () {
  //set fa-spin class to make icon spin
  this.classList.toggle("fa-spin");

  //set open On main Setting box to open side men
  document.querySelector(".settings-box").classList.toggle("open");
};
// ========================================================================================================

//*======ColorList Code============
//loop in each li
colorsLi.forEach((li) => {
  //add Click event on each li

  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--mainColor",
      e.target.dataset.color
    );
    localStorage.setItem("colorOption", e.target.dataset.color);

    handleActive(e);
  });
});
// ========================================================================================================

//*===-======Random Background Code============

//Loop on all spans
random_bg_btns.forEach((btn) => {
  //add click event on each span
  btn.addEventListener("click", (e) => {
    handleActive(e);

    //Yes/no
    if (e.target.dataset.background == "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("backgroundOption", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("backgroundOption", false);
    }
  });
});
// =====================================================================================================
//* Bullets section
//all bullets buttons
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSomewhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(`.${e.target.dataset.section}`)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
scrollToSomewhere(allBullets);

//* Show hide Bullets
let showHideBulletButtons = document.querySelectorAll(
  ".show-hide-bullets span"
);

//main bullets container
let bulletsContainer = document.querySelector(".nav-bullets");

//get hide-show button item from localstorage
let bulletsLocalItem = localStorage.getItem("bulletsOption");

if (bulletsLocalItem !== null) {
  showHideBulletButtons.forEach((button) => {
    button.classList.remove("active");
    if (bulletsLocalItem === "block") {
      document
        .querySelector(".show-hide-bullets .show")
        .classList.add("active");
    } else {
      document
        .querySelector(".show-hide-bullets .hide")
        .classList.add("active");
    }
  });
}

showHideBulletButtons.forEach((Button) => {
  Button.addEventListener("click", function (e) {
    if (e.target.dataset.display == "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bulletsOption", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bulletsOption", "none");
    }
    handleActive(e);
  });
});

//*Reset Options settings

let resetOptionButton = document.querySelector(
  ".settings-box .reset-options-button "
);
resetOptionButton.addEventListener("click", function () {
  localStorage.clear();
  // localStorage.removeItem('colorOption');
  // localStorage.removeItem('bullets'); ..............
  window.location.reload();
});
// ========================================================================================================
//* Handle active state

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    // Remove active class from all buttons
    element.classList.remove("active");
  });

  //Add Active class
  ev.target.classList.add("active");
}

// ========================================================================================================
//*===============Home Section Code============

//select home-section element
let homeSection = document.querySelector(".home-section");

//array of images
let imgsArr = ["header-1.jpg", "header-2.jpg", "header-3.jpg", "header-4.jpg"];

//Function to randomize Images
function randomizeImgs() {
  if (backgroundOption == true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArr.length);

      //change background image url
      homeSection.style.backgroundImage = `url('../images/${imgsArr[randomNumber]}')`;
    }, 5000);
  }
}
randomizeImgs();
// ========================================================================================================
//*=====================Our skills section=====================================

//Select our skills section
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function () {
  //Skills section offsetTop
  let ourSkillsOffset = ourSkills.offsetTop;

  //OuterHieght
  let ourSkillsOuterHeight = ourSkills.offsetHeight;

  //Window height
  let windowHeight = this.outerHeight;

  //window scrollTop
  let windowScrollTop = this.pageYOffset;

  let progressBars = document.querySelectorAll(
    ".our-skills-content .skill-box .skill-progress span"
  );

  if (windowScrollTop > ourSkillsOffset + ourSkillsOuterHeight - windowHeight) {
    progressBars.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// ========================================================================================================
//*=====================Our Gallery section=====================================

//Create popup window with img
let ourGallery = document.querySelectorAll(".gallery .gallery-content img");

ourGallery.forEach((img) => {
  img.addEventListener("click", function (e) {
    //create overlay element
    let overlayDiv = document.createElement("div");

    //add className for overlayDiv
    overlayDiv.className = "popup-overlay";

    //Append overlayDiv in body
    document.body.appendChild(overlayDiv);

    //Create popup-box element
    let popupBox = document.createElement("div");

    //add className for popup-box
    popupBox.className = "popup-box";

    //Set title for each img from imgAlt
    // if (img.alt !== null) {
    //   //create h3 element to set alt in there
    //   let imgHeading = document.createElement("h3");

    //   //create textnode for heading
    //   let imgText = document.createTextNode(img.alt);

    //   imgHeading.appendChild(imgText);
    //   popupBox.appendChild(imgHeading);
    // }

    //create image element that in popup-box
    let popupImg = document.createElement("img");

    //set img in src
    popupImg.src = img.src;

    //append popupImg in popupBox
    popupBox.appendChild(popupImg);

    //append popupBox in body
    document.body.appendChild(popupBox);

    //Create Close button

    //create closebutton text
    let closeButtonText = document.createElement("i");

    //add className for closebutton
    closeButtonText.className = "close-button fa fa-times-circle";

    //append closebutton in popupBox
    popupBox.appendChild(closeButtonText);
  });
});

//Close button
document.addEventListener("click", function (e) {
  //if clicked button className contain close-button .....
  if (e.target.className == "close-button fa fa-times-circle") {
    //remove parentNode(popupBox)
    e.target.parentNode.remove();
    //remove popup overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// ========================================================================================================
//*=====================Timeline section=====================================
