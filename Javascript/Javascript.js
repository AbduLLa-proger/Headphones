"use strict";
var imageIndex = Math.floor(Math.random() * introImages.length);
//INTRO TOOLS
var intro = document.querySelector('.intro'); //intro
var IM = document.querySelector('.intro-headphone_img'); //intro image
var IA = document.querySelectorAll('.introArrows'); //intro arrows
var IP = document.querySelectorAll('.intro-inner-bottom_page'); //intro pages
var IPI = imageIndex; //intro page index
//FEATURE TOOLS
var FA = document.querySelectorAll('.featureArrows'); //feature arrows
var FI = document.querySelector('.features-inner-block-img_set'); //features image
var FIBS = document.querySelectorAll('.features-inner-block-headphonecolor_side'); //features inner block side
var FIB = document.querySelector('.features-img_bottom'); //features image bottom
var FPI = 0; //feature page index
var featureImages = featureImage(featuresImageIndex);
var FII = Math.floor(Math.random() * featureImages.length); //feature image index
//VIDEO SECTION TOOLS
var VB = document.querySelector('.video-section-inner_background'); //video background
var VBC = document.querySelectorAll('.video-section-inner-block_content'); //video block content
var VBCS = document.querySelectorAll('.video-section-inner-block_content')[0]; //video block content style
var VF = document.querySelector('#fullscreen'); //video fullscreen
var VC = document.querySelector('.volume_circle'); //volume circle
var VI = document.querySelector('.volume_indicator'); //volume indicator
var VIS = document.querySelector('.volume_indicator'); //volume indicator style
var VP = document.querySelector('.volume_progress'); //volume progress
var volume = document.querySelector('.fa-volume');
var video = document.querySelector('.main-video');
var play = document.querySelector('#play');
var VSP = document.querySelector('.video-section_progress'); //video section progress
var VSD = document.querySelector('.video-section_duration'); //video section duration
var volumeOffsetX = '1.0'; //volume offsetX
//PRODUCTS SECTION TOOLS
var PTO = document.querySelectorAll('#products-text_options'); //products text options
var PTC = document.querySelector('#products-text_colors'); //products text colors
var PPS = document.querySelector('.products-price_set'); //products price set
var PFC = document.querySelectorAll('.products-price_circle')[0]; //products first circle
var PSC = document.querySelectorAll('.products-price_circle')[1]; //products second circle 
var PFP = document.querySelectorAll('.products-price')[0]; //products first price
var PSP = document.querySelectorAll('.products-price')[1]; //products second price
var PST = document.querySelectorAll('.sort-type'); //products sort type
var PHSB = document.querySelector('.products-hidden-sort_block'); //products hidden sort block
var PVSB = document.querySelector('.products-hover-sort_block'); //products visible sort block
var PMS = document.querySelector('.main-sort'); //products main sort
var productsImg = document.querySelectorAll('.products-img'); //products image
var PMI = document.querySelector('.products-inner-mainblock_items'); //products main items
var PPB = document.querySelector('.products-inner-mainblock-pages_inner'); //products pages block
var PPD = document.querySelectorAll('.page-dots'); //products page dots
var PIT = document.querySelectorAll('#item-text'); //products item text
var PCT = document.querySelectorAll('#colors-text'); //products color text
var PCC = document.querySelectorAll('.colors-circle'); //products color circle
var PAC = document.querySelectorAll('#products-arrow-controller'); //products arrow controller
var CAPN = 1; // current arrow page number
var CRAPI = 1; // current right arrow page id
var CLAPI = 0; // current left arrow page id
var LAPN; // left arrow page number
var RAPN; // right arrow page number
var LAPI; // left arrow page id
var RAPI; // left arrow page id
var PRAI = false; // products right arrow id
var PLAI = false; // products left arrow id
var productsItemCheck;
var productsColorCheck = -1; //
var productsBlockId = -1;
var productsPage = 0;
var productsPageNumbers = 0;
var productsPageStart = 2;
var productsStylePage = 0;
var productsUpdatePage = -1;
var productsId = 0;
var start = 0;
var end = 0;
var productsPageCheck = false;
var productsLongPage = false;
var productsCurrentPage = 1;
var productsLoaded = false;
play === null || play === void 0 ? void 0 : play.addEventListener('click', function () { return videoController(); });
video === null || video === void 0 ? void 0 : video.addEventListener('click', function () { return videoController(); });
VIS === null || VIS === void 0 ? void 0 : VIS.addEventListener('mousedown', function (item) { return volumeMainController((item === null || item === void 0 ? void 0 : item.offsetX) + "px"); });
VP === null || VP === void 0 ? void 0 : VP.addEventListener('mousedown', function (item) { return volumeMainController((item === null || item === void 0 ? void 0 : item.offsetX) + "px"); });
VC === null || VC === void 0 ? void 0 : VC.addEventListener('mousedown', function () { return volumeMainController(VI.offsetX + "px"); });
VC === null || VC === void 0 ? void 0 : VC.addEventListener('mouseup', function () { return removeVolumeClasses(); });
VIS === null || VIS === void 0 ? void 0 : VIS.addEventListener('mouseup', function () { return removeVolumeClasses(); });
VP === null || VP === void 0 ? void 0 : VP.addEventListener('mouseup', function () { return removeVolumeClasses(); });
VSD === null || VSD === void 0 ? void 0 : VSD.addEventListener('click', function (videoWidth) { return getVideoWidth(videoWidth.offsetX + "px"); });
VSP === null || VSP === void 0 ? void 0 : VSP.addEventListener('click', function (videoWidth) { return getVideoWidth(videoWidth.offsetX + "px"); });
volume.addEventListener('click', function () {
    if (volume.classList.contains('quiet')) {
        volume.classList.remove('quiet');
        VC.style.left = '0px';
        VP.style.width = '0px';
        video.volume = 0;
    }
    else {
        volume.classList.add('quiet');
        VC.style.left = VIS.offsetWidth + "px";
        VP.style.width = VIS.offsetWidth + "px";
        video.volume = 1.0;
    }
});
VF === null || VF === void 0 ? void 0 : VF.addEventListener('click', function () {
    if (video.requestFullscreen)
        video.requestFullscreen();
    if (video.webkitRequestFullscreen) /* Safari */
        video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) /* IE11 */
        video.msRequestFullscreen();
});
var width = VIS.offsetWidth;
//FUNCTION TO REMOVE INDICATOR AND PROGRESS MOVE CLASSES AFTER REMOVING CLICK IN VIDEO SECTION
function removeVolumeClasses() {
    VIS.classList.remove('indicatorMove');
    VP.classList.remove('progressMove');
}
// FUNCTION OF CONTROLLING VOLUME IN VIDEO SECTION
function setVolume(volume, offsetX) {
    VC.style.left = offsetX;
    VP.style.width = offsetX;
    volume = (parseInt(offsetX) / width).toFixed(1);
    video.volume = parseFloat(volume);
}
//FUNCTION OF CONTROLLING VOLUME AFTER CLICKING IT IN VIDEO SECTION
function volumeMainController(offsetX) {
    if (offsetX.match('undefined'))
        offsetX = volumeOffsetX;
    else
        volumeOffsetX = offsetX;
    volumeController(offsetX);
    var volume = (parseInt(offsetX) / width).toFixed(1);
    video.volume = parseFloat(volume);
    var IM = document.querySelector('.indicatorMove'); //indicator move
    var PM = document.querySelector('.progressMove'); //progress move
    IM === null || IM === void 0 ? void 0 : IM.addEventListener('mousemove', function (e) {
        var _a;
        if ((_a = VIS.classList) === null || _a === void 0 ? void 0 : _a.contains('indicatorMove'))
            setVolume(volume, e.offsetX + "px");
    });
    PM === null || PM === void 0 ? void 0 : PM.addEventListener('mousemove', function (e) {
        var _a;
        if ((_a = VP.classList) === null || _a === void 0 ? void 0 : _a.contains('progressMove'))
            setVolume(volume, e.offsetX + "px");
    });
}
//FUNCTION TO CONTROL VOLUME MOVING EFFECT IN VIDEO SECTION
function volumeController(offsetX) {
    VC.style.left = offsetX;
    VP.style.width = offsetX;
    VIS.classList.add('indicatorMove');
    VP.classList.add('progressMove');
}
document.addEventListener('DOMContentLoaded', function () {
    setIntroImageandBackground(imageIndex);
    FI.src = featureImages[FII].src;
    setFeatureImagesColors();
    setFeatureImagesPages();
    setFeaturePagesBottomStyle();
    setFeaturePagesBottomClick();
    setFeatureArrows();
    setVideoContent();
    loadJSON('unloadedpages');
    setTimeout(function () { return document.querySelectorAll('.products-pages')[0].classList.add('opacity-text'); }, 350);
});
//SET INTRO PAGES IN INTRO SECTION
IP === null || IP === void 0 ? void 0 : IP.forEach(function (items) {
    items === null || items === void 0 ? void 0 : items.addEventListener('click', function (item) {
        var _a;
        var ICT = document.querySelectorAll('.intro-inner-bottom_page')[IPI];
        ICT.classList.remove('intro-inner-bottom-page_hover');
        var EPI = item.target;
        var index = (_a = EPI.textContent) === null || _a === void 0 ? void 0 : _a.toString();
        IPI = parseInt(index) - 1;
        EPI === null || EPI === void 0 ? void 0 : EPI.classList.add('intro-inner-bottom-page_hover');
        setIntroImageandBackground(IPI);
    });
});
//CONTROLLING INTRO ARROWS CLICK IN INTRO SECTION
IA === null || IA === void 0 ? void 0 : IA.forEach(function (items) {
    items === null || items === void 0 ? void 0 : items.addEventListener('click', function (item) {
        var _a, _b, _c, _d;
        var event = item.target;
        if ((_b = (_a = event.previousElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.match('next')) {
            var ICP = document.querySelectorAll('.intro-inner-bottom_page')[IPI];
            ICP.classList.remove('intro-inner-bottom-page_hover');
            IPI++;
            if (IPI > 4)
                IPI = 0;
        }
        else if ((_d = (_c = event.nextElementSibling) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.match('prev')) {
            var ICP = document.querySelectorAll('.intro-inner-bottom_page')[IPI]; //intro current pages
            ICP.classList.remove('intro-inner-bottom-page_hover');
            IPI--;
            if (IPI < 0)
                IPI = 4;
        }
        setIntroImageandBackground(IPI);
    });
});
//FUNCTION TO SET INTRO IMAGE AND BACKGROUND
function setIntroImageandBackground(index) {
    intro.style.backgroundColor = introImages[index].background;
    IM.src = introImages[index].src;
    var ICP = document.querySelectorAll('.intro-inner-bottom_page')[index]; // intro current pages
    ICP.classList.add('intro-inner-bottom-page_hover');
}
//FUNCTION TO SET DIFFERENT COLOR OF HEADPHONES IN FEATURE SECTION
function setFeatureImagesColors() {
    for (var i = 0; i < 4; i++) {
        var FS = document.createElement('div'); //features side
        FS.innerHTML =
            "<div class='colorsBorder_F'>\n      <span class='colorsBorder_S'></span>\n      <i class='circle_" + (i + 1) + " colorsCircle' data-id='" + (i + 1) + "'></i>\n    </div>\n    <div class='colorsBorder_F'>\n      <p>" + colorsName[i].name + "</p>\n    </div>";
        FIBS[0].appendChild(FS);
    }
    for (var i = 0; i < 4; i++) {
        var FS = document.createElement('div'); //features side
        FS.innerHTML =
            "<div class='colorsBorder_F'>\n      <span class='colorsBorder_S'></span>\n      <i class='circle_" + (i + 5) + " colorsCircle' data-id='" + (i + 5) + "'></i>\n    </div>\n    <div class='colorsBorder_F'>\n      <p>" + colorsName[i + 4].name + "</p>\n    </div>";
        FIBS[1].appendChild(FS);
    }
    setColorCircle();
}
//FUNCTION TO GIVE COLOR FOR CIRCLES IN FEATURE SECTION
function setColorCircle() {
    var CB = document.querySelectorAll('.colorsBorder_S'); //colors border
    var CC = document.querySelectorAll('.colorsCircle'); //colors circle
    for (var i = 0; i < CC.length; i++) {
        if (i == featureImages[0].id) {
            CB[i].style.borderColor = colorsName[i].color;
            if (i != 4) {
                CC[4].style.border = '1px solid black';
                CC[4].style.opacity = '0.2';
            }
        }
        CC[i].style.backgroundColor = colorsName[i].color;
    }
    //CONTROLLING CLICK OF COLOR CIRCLE IN FEATURE SECTION
    CC.forEach(function (items) {
        items.addEventListener('click', function (item) {
            var dataset = item.target;
            var dataId = dataset.dataset["id"];
            var id = parseInt(dataId) - 1;
            if (id != featureImages[0].id) {
                if (id == 4) {
                    CC[4].style.border = 'none';
                    CC[4].style.opacity = '1';
                }
                else {
                    CC[4].style.border = '1px solid black';
                    CC[4].style.opacity = '0.2';
                }
                var NFI = featureImage(id); //new feature image
                FI.src = NFI[0].src;
                CB[featureImages[0].id].style.borderColor = 'transparent';
                CB[id].style.borderColor = colorsName[id].color;
                featureImages = featureImage(id);
                var FIBP = document.querySelectorAll('.features-img-bottom_page'); //feature bottom page
                FIBP[FPI].style.borderBottom = '1px solid transparent';
                while (FIB.childNodes.length != 1)
                    FIB.removeChild(FIB.childNodes[1]);
                setFeatureImagesPages();
                setFeaturePagesBottomClick();
                var NFBP = document.querySelectorAll('.features-img-bottom_page'); //new feature bottom page
                FPI = 0;
                NFBP[FPI].style.borderBottom = '1px solid black';
            }
        });
    });
}
//FUNCTION TO SET HEADPHONE IMAGE PAGES IN FEATURE SECTION
function setFeatureImagesPages() {
    for (var i = 0; i < featureImages.length; i++) {
        var FIBP = document.createElement('span');
        FIBP.classList.add('intro-inner-bottom_page');
        FIBP.classList.add('features-img-bottom_page');
        FIBP.innerHTML = "" + (i + 1);
        FIB.appendChild(FIBP);
    }
}
function setFeaturePagesBottomStyle() {
    var FIBP = document.querySelectorAll('.features-img-bottom_page');
    FIBP[featureImages[FII].imageId].style.borderBottom = '1px solid black';
    FPI = featureImages[FII].imageId;
}
//FUNCTION TO CONTROL CLICK OF HEADPHONE PAGES IN FEATURE SECTION
function setFeaturePagesBottomClick() {
    var FIBP = document.querySelectorAll('.features-img-bottom_page');
    FIBP === null || FIBP === void 0 ? void 0 : FIBP.forEach(function (items) {
        items === null || items === void 0 ? void 0 : items.addEventListener('click', function (item) {
            var _a;
            var event = item.target;
            var text = (_a = event.textContent) === null || _a === void 0 ? void 0 : _a.toString();
            var img = parseInt(text) - 1;
            FI.src = featureImages[img].src;
            FIBP[FPI].style.borderBottom = '1px solid transparent';
            FIBP[img].style.borderBottom = '1px solid black';
            FPI = img;
        });
    });
}
//FUNCTION TO CONTROLL ARROWS IN FEATURE SECTION
function setFeatureArrows() {
    FA.forEach(function (items) {
        items.addEventListener('click', function (item) {
            var _a, _b, _c, _d;
            var FIBP = document.querySelectorAll('.features-img-bottom_page');
            var event = item.target;
            if ((_b = (_a = event === null || event === void 0 ? void 0 : event.previousElementSibling) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.match('next')) {
                FIBP[FPI].style.borderBottom = '1px solid transparent';
                FPI++;
                if (FIBP.length <= FPI)
                    FPI = 0;
                FIBP[FPI].style.borderBottom = '1px solid black';
                FI.src = featureImages[FPI].src;
            }
            else if ((_d = (_c = event === null || event === void 0 ? void 0 : event.nextElementSibling) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.match('prev')) {
                FIBP[FPI].style.borderBottom = '1px solid transparent';
                FPI--;
                if (0 > FPI)
                    FPI = FIBP.length - 1;
                FIBP[FPI].style.borderBottom = '1px solid black';
                FI.src = featureImages[FPI].src;
            }
        });
    });
}
//FUNCTION TO HIDE ELEMENT AFTER CLICKING VIDEO IN VIDEO SECTION
function videoController() {
    if (video.classList.contains('pause')) {
        video.play();
        video.classList.remove('pause');
        VB.style.backgroundColor = 'transparent';
        VBCS.style.visibility = 'hidden';
        play.style.visibility = 'hidden';
    }
    else {
        if (play.classList.contains('fa-undo')) {
            play.classList.remove('fa-undo');
            play.classList.add('fa-play-circle');
        }
        VB.style.backgroundColor = 'black';
        VBCS.style.visibility = 'visible';
        play.style.visibility = 'visible';
        video.pause();
        video.classList.add('pause');
    }
}
//EVENT TO CONTROL VIDEO DURATION TIME
video === null || video === void 0 ? void 0 : video.addEventListener('timeupdate', function () {
    var durationWidth = VSD.offsetWidth;
    var progress = video === null || video === void 0 ? void 0 : video.currentTime;
    var duration = video.duration;
    progress *= durationWidth;
    progress /= duration;
    VSP.style.width = progress + "px";
});
//EVENT TO CONTROL SITUATION AFTER VIDEO ENDED
video.onended = function () {
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-undo');
    play.style.visibility = 'visible';
    VB.style.backgroundColor = 'black';
    VBCS.style.visibility = 'visible';
    video.classList.add('pause');
};
function getVideoWidth(offsetX) {
    VSP.style.width = offsetX;
    video.currentTime = (parseFloat(offsetX) * video.duration) / VSD.offsetWidth;
}
function setVideoContent() {
    var indexCheck = 0;
    for (var i = 0; i < videos.length && indexCheck < 3; i++) {
        if (video.src != videos[i].src && indexCheck < 3) {
            var VB_1 = document.createElement('div'); // video block
            VB_1.innerHTML = "<video src=" + videos[i].src + " class=\"video-content\"></video>";
            VBC[0].appendChild(VB_1);
            indexCheck++;
        }
    }
    if (indexCheck > 2) {
        var VB_2 = document.createElement('div'); //video block
        VB_2.innerHTML = "<span class=\"black-box fas\">More</span>";
        VBC[0].appendChild(VB_2);
    }
    var videoContent = document.querySelectorAll('.video-content');
    videoContent === null || videoContent === void 0 ? void 0 : videoContent.forEach(function (items) {
        items === null || items === void 0 ? void 0 : items.addEventListener('click', function (item) {
            var event = item.target;
            if (play.classList.contains('fa-undo')) {
                play.classList.remove('fa-undo');
                play.classList.add('fa-play-circle');
            }
            var newVideo = video.src;
            video.src = event.src;
            event.src = newVideo;
            VSP.style.width = '0px';
        });
    });
}
//CONTROL PRODUCTS DESCRIPTION BLOCK HEIGHT
PTO.forEach(function (items) {
    items.addEventListener('click', function (item) {
        var _a, _b;
        var dataset = item.target;
        var id = dataset.dataset["id"];
        if (productsBlockId == parseInt(id)) {
            var PTB = document.querySelectorAll('.products-text_block')[productsBlockId];
            var PT = document.querySelectorAll('.products-text')[productsBlockId];
            PT.classList.remove('opacity-text');
            (_a = PTB === null || PTB === void 0 ? void 0 : PTB.classList) === null || _a === void 0 ? void 0 : _a.remove('products-text_show');
            productsBlockId = -1;
        }
        else {
            if (productsBlockId >= 0) {
                var PTB_1 = document.querySelectorAll('.products-text_block')[productsBlockId];
                var PT_1 = document.querySelectorAll('.products-text')[productsBlockId];
                PT_1.classList.remove('opacity-text');
                PTB_1.classList.remove('products-text_show');
            }
            var PTB = document.querySelectorAll('.products-text_block')[parseInt(id)];
            var PT = document.querySelectorAll('.products-text')[parseInt(id)];
            PT.classList.add('opacity-text');
            productsBlockId = parseInt(id);
            PTB.classList.add('products-text_show');
        }
        (_b = productsItemCheck === null || productsItemCheck === void 0 ? void 0 : productsItemCheck.classList) === null || _b === void 0 ? void 0 : _b.remove('opacity-text');
    });
});
PTC.addEventListener('click', function () {
    var _a, _b, _c, _d;
    var PTB = document.querySelectorAll('.products-text_block')[3];
    if (PTB.classList.contains('products-text_show')) {
        PTB.classList.remove('products-text_show');
        (_b = (_a = PCT[productsColorCheck]) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.remove('pl');
        (_d = (_c = PCC[productsColorCheck]) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.remove('colors');
    }
    else
        PTB.classList.add('products-text_show');
});
PFC.addEventListener('mousedown', function () { return productsPriceLineMove(); });
PSC.addEventListener('mousedown', function () { return productsPriceLineMove(); });
PPS.addEventListener('mousedown', function (e) {
    if (e.offsetX > (PPS.offsetWidth / 2))
        setProductsPriceMove(PSP, PSC, e.offsetX, 500);
    else
        setProductsPriceMove(PFP, PFC, e.offsetX, 50);
    productsPriceLineMove();
});
function productsPriceLineMove() {
    PPS.classList.add('productsMove');
    var productsMove = document.querySelector('.productsMove');
    productsMove === null || productsMove === void 0 ? void 0 : productsMove.addEventListener('mousemove', function (e) {
        if (PPS.classList.contains('productsMove')) {
            if ((PPS.offsetWidth / 2) > e.offsetX)
                setProductsPriceMove(PFP, PFC, e.offsetX, 50);
            else if (e.offsetX > (PPS.offsetWidth / 2))
                setProductsPriceMove(PSP, PSC, e.offsetX, 500);
        }
    });
}
function setProductsPriceMove(productPrice, productCircle, offsetX, n) {
    productCircle.style.left = offsetX + "px";
    productPrice.style.left = offsetX + "px";
    var offsetNumber = Math.round((100 * offsetX) / 10) + n;
    productPrice.textContent = "" + offsetNumber;
}
function loadJSON(message) {
    fetch('Javascript/headphone.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var content = '';
        productsPageNumbers = Math.ceil(data.length / 6);
        var percent = data.length - productsPage * 6;
        percent >= 6 ? percent = 6 : percent = percent;
        for (var i = productsPage * 6; i < (productsPage * 6) + percent; i++) {
            var products_1 = data[i];
            content += "<div class=\"products-inner-mainblock-items_block\">\n                    <div class=\"products-inner-mainblock-items_img\">\n                      <img src=\"" + products_1.imgSrc + "\" class=\"products-img\"></img>\n                    </div>\n                    <p class=\"products-inner-mainblock-items_name\">" + products_1.name + "</p>\n                    <p class=\"products-inner-mainblock-items_text\">Get the most out of your music with an experience</p>\n                    <span class=\"products-inner-mainblock-items_subblock\">\n                      <p>" + products_1.price + "</p>\n                      <span>\n                        <i class=\"fas fa-star\"></i>\n                        <i class=\"fas fa-star\"></i>\n                        <i class=\"fas fa-star\"></i>\n                        <i class=\"fas fa-star\"></i>\n                        <i class=\"fas fa-star\"></i>\n                      </span>\n                    </span>\n                  </div>";
        }
        PMI.innerHTML = content;
        setProductsPages(message);
        productsLoaded = true;
    })
        .catch(function (error) { return alert('User live server or local server'); });
}
function setProductsPages(message) {
    if (message.match('unloadedpages')) {
        productsId = 0;
        PPB.innerHTML = "<p class=\"products-pages\" data-id=\"" + productsId + "\">1</p>";
        if (productsPageNumbers > 6) {
            for (var i = productsPageStart; i < productsPageStart + 3; i++)
                PPB.innerHTML += "<p class=\"products-pages\" data-id=\"" + ++productsId + "\">" + i + "</p>";
            PPB.innerHTML += "<span class=\"page-dots\">...</span>\n      <p class=\"products-pages\" data-id=\"" + ++productsId + "\">" + productsPageNumbers + "</p>";
            productsLongPage = true;
        }
        else {
            var end_1 = productsPageNumbers;
            for (var i = productsPageStart; i < end_1 + 1; i++) {
                PPB.innerHTML += "<p class=\"products-pages\" data-id=\"" + ++productsId + "\">" + i + "</p>";
            }
            productsLongPage = false;
        }
        productsPageCheck = false;
        productsStylePage = -1;
        PPD = document.querySelectorAll('.page-dots');
        pageDots();
        getProductsPageItems();
    }
}
function getProductsPageItems() {
    var productsPages = document.querySelectorAll('.products-pages');
    productsPages.forEach(function (items) {
        items.addEventListener('click', function (item) {
            var pagesStyle = item.target;
            var prev = pagesStyle.previousElementSibling;
            var next = pagesStyle.nextElementSibling;
            var dataset = pagesStyle.dataset["id"];
            var number = pagesStyle.textContent;
            CAPN = parseInt(number);
            if (productsLongPage) {
                if (CAPN > 2 && CAPN < productsPageNumbers - 2)
                    CRAPI = parseInt(dataset) + 1, CLAPI = (parseInt(dataset) - 1);
                else if (CAPN == productsPageNumbers)
                    CRAPI = parseInt(dataset), CLAPI = (parseInt(dataset) - 1);
                else
                    CRAPI = (parseInt(dataset) + 1), CLAPI = parseInt(dataset);
            }
            else if (!productsLongPage) {
                if (CAPN == productsPageNumbers)
                    CRAPI = parseInt(dataset), CLAPI = parseInt(dataset) - 1;
                else if (CAPN > 1 && CAPN < productsPageNumbers)
                    CRAPI = parseInt(dataset) + 1, CLAPI = (parseInt(dataset) - 1);
                else
                    CRAPI = (parseInt(dataset) + 1), CLAPI = parseInt(dataset);
            }
            productsPage = parseInt(number) - 1;
            loadJSON('pagesloaded');
            pageNumberController(number, dataset, pagesStyle, productsPages, prev, next);
        });
    });
}
function updateProductPages(number, dataset) {
    var id = dataset;
    var setId = parseInt(id);
    productsId = 0;
    PPB.innerHTML =
        "<p class=\"products-pages\" data-id=\"" + productsId + "\">1</p>\n  <span class=\"page-dots\">...</span>";
    if (number + 2 == productsPageNumbers) {
        start = number - 1;
        end = number + 2;
    }
    else if (number + 1 == productsPageNumbers) {
        start = number - 2;
        end = number + 1;
    }
    else if (number == productsPageNumbers) {
        start = number - 3;
        end = number;
    }
    else {
        start = number - 1;
        end = number + 2;
    }
    for (var i = start; i < end; i++)
        PPB.innerHTML += "<p class=\"products-pages\" data-id=\"" + ++productsId + "\">" + i + "</p>";
    if (end - 2 == number && end != productsPageNumbers)
        PPB.innerHTML += "<span class=\"page-dots\">...</span>";
    PPB.innerHTML += "<p class=\"products-pages\" data-id=\"" + ++productsId + "\">" + productsPageNumbers + "</p>";
    var productsPages = document.querySelectorAll('.products-pages');
    PPD = document.querySelectorAll('.page-dots');
    if (number == productsPageNumbers)
        setId = parseInt(id);
    else if (productsCurrentPage > number)
        setId = parseInt(id) + 1;
    else if (productsCurrentPage < number)
        setId = parseInt(id) - 1;
    else if (productsCurrentPage == number && PRAI)
        setId = parseInt(id) - 1;
    else if (productsCurrentPage == number && PLAI)
        setId = parseInt(id) + 1;
    productsPages[setId].classList.add('opacity-text');
    productsUpdatePage = setId;
    productsStylePage = 0;
    productsPageCheck = true;
    pageDots();
    getProductsPageItems();
}
function pageDots() {
    PPD.forEach(function (items) {
        items.addEventListener('click', function (item) {
            var _a, _b;
            var text = item.target;
            var getFNumber = (_a = text.previousElementSibling) === null || _a === void 0 ? void 0 : _a.textContent;
            var getSNumber = (_b = text.nextElementSibling) === null || _b === void 0 ? void 0 : _b.textContent;
            var prevNumber = parseInt(getFNumber);
            var nextNumber = parseInt(getSNumber);
            if (prevNumber == 1) {
                if (nextNumber - 1 <= 3) {
                    productsPage = 2;
                    loadJSON('pagesloaded');
                    setProductsPages('unloadedpages');
                    var productsPages = document.querySelectorAll('.products-pages');
                    ;
                    productsPages[2].classList.add('opacity-text');
                    productsStylePage = 2;
                }
                else if (nextNumber - 3 > 0) {
                    var next = text.nextElementSibling;
                    var dataset = next.dataset["id"];
                    var pageSet = next.textContent;
                    productsCurrentPage = parseInt(pageSet);
                    CAPN = productsPage = nextNumber - 1;
                    PLAI = true;
                    CLAPI = parseInt(dataset);
                    loadJSON('pagesloaded');
                    updateProductPages(--nextNumber, dataset);
                }
            }
            else if (nextNumber == productsPageNumbers) {
                var prev = text.previousElementSibling;
                var dataset = prev.dataset["id"];
                var pageSet = prev.textContent;
                PRAI = true;
                CRAPI = parseInt(dataset);
                CLAPI = parseInt(dataset);
                productsCurrentPage = parseInt(pageSet);
                productsPage = prevNumber;
                loadJSON('pagesloaded');
                updateProductPages(++prevNumber, dataset);
                CAPN = prevNumber;
                productsStylePage = 2;
            }
        });
    });
}
function pageNumberController(number, dataset, pagesStyle, productsPages, prev, next) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (productsLoaded)
        (_b = (_a = productsPages[0]) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.remove('opacity-text'), productsLoaded = true;
    if (productsStylePage > -1)
        (_d = (_c = productsPages[productsStylePage]) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.remove('opacity-text');
    if (!pagesStyle.classList.contains('opacity-text')) {
        if (parseInt(number) - 3 > 0 && productsLongPage) {
            if (parseInt(number) == productsPageNumbers)
                updateProductPages(parseInt(number), dataset);
            else if ((_e = prev === null || prev === void 0 ? void 0 : prev.classList) === null || _e === void 0 ? void 0 : _e.contains('page-dots')) {
                if (parseInt(number) == 3) {
                    setProductsPages('unloadedpages');
                    var productsPages_1 = document.querySelectorAll('.products-pages');
                    ;
                    var setId = parseInt(number) - 1;
                    (_g = (_f = productsPages_1[setId]) === null || _f === void 0 ? void 0 : _f.classList) === null || _g === void 0 ? void 0 : _g.add('opacity-text');
                    productsUpdatePage = setId;
                }
                else
                    updateProductPages(parseInt(number), dataset);
            }
            else if ((_h = next === null || next === void 0 ? void 0 : next.classList) === null || _h === void 0 ? void 0 : _h.contains('page-dots'))
                updateProductPages(parseInt(number), dataset);
            else if (!((_j = prev === null || prev === void 0 ? void 0 : prev.classList) === null || _j === void 0 ? void 0 : _j.contains('page-dots')))
                pagesStyle.classList.add('opacity-text');
        }
        else if (parseInt(number) - 3 <= 0 && productsPageCheck && productsLongPage) {
            setProductsPages('unloadedpages');
            if (productsCurrentPage > parseInt(number)) {
                var productsPages_2 = document.querySelectorAll('.products-pages');
                ;
                var setId = parseInt(number) - 1;
                productsPages_2[setId].classList.add('opacity-text');
            }
        }
        else
            pagesStyle.classList.add('opacity-text');
    }
    productsCurrentPage = parseInt(number);
    if (productsStylePage != productsUpdatePage)
        productsStylePage = productsUpdatePage;
    else
        productsStylePage = parseInt(dataset), productsUpdatePage = productsStylePage;
}
PAC.forEach(function (items) {
    items.addEventListener('click', function (item) {
        var _a, _b;
        var productsPages = document.querySelectorAll('.products-pages');
        var style = item.target;
        if ((_a = style === null || style === void 0 ? void 0 : style.classList) === null || _a === void 0 ? void 0 : _a.contains('fa-arrow-right')) {
            if (productsLongPage) {
                if ((CAPN < (productsPageNumbers - 2) && CAPN > 3) ||
                    CAPN == (productsPageNumbers - 2))
                    RAPI = '3', CRAPI = 4;
                else
                    RAPI = CRAPI.toString(), CRAPI++;
                var right = document.querySelectorAll('.products-pages')[parseInt(RAPI)];
                var next = right.nextElementSibling;
                var prev = right.previousElementSibling;
                var rightContent = right.textContent;
                var rightNumber = parseInt(rightContent);
                productsPage = rightNumber - 1;
                if (PLAI)
                    PRAI = true, PLAI = false;
                loadJSON('pagesloaded');
                pageNumberController(rightNumber.toString(), RAPI, right, productsPages, prev, next);
                PRAI = false;
                CAPN++;
                if (CRAPI > 4)
                    CRAPI = 4;
                if (CAPN > productsPageNumbers)
                    CAPN = productsPageNumbers;
                if (CAPN == productsPageNumbers)
                    CLAPI = CRAPI - 1;
                else
                    CLAPI = CRAPI - 2;
            }
            else {
                CAPN = CRAPI + 1;
                RAPI = (CRAPI).toString();
                if (CAPN < productsPageNumbers)
                    CRAPI++;
                var right = document.querySelectorAll('.products-pages')[parseInt(RAPI)];
                var next = null;
                var prev = null;
                var rightContent = right.textContent;
                var rightNumber = parseInt(rightContent);
                productsPage = rightNumber - 1;
                loadJSON('pagesloaded');
                pageNumberController(rightNumber.toString(), RAPI, right, productsPages, prev, next);
                if (CAPN == productsPageNumbers)
                    CLAPI = CRAPI - 1;
                else
                    CLAPI = CRAPI - 2;
            }
        }
        else if ((_b = style === null || style === void 0 ? void 0 : style.classList) === null || _b === void 0 ? void 0 : _b.contains('fa-arrow-left')) {
            if (productsLongPage) {
                if ((CAPN <= (productsPageNumbers - 2) && CAPN > 3))
                    LAPI = '1', CLAPI = 1;
                else
                    LAPI = CLAPI.toString(), CLAPI--;
                var left = document.querySelectorAll('.products-pages')[parseInt(LAPI)];
                var next = left.nextElementSibling;
                var prev = left.previousElementSibling;
                var leftContent = left.textContent;
                var leftNumber = parseInt(leftContent);
                productsPage = leftNumber - 1;
                if (PRAI)
                    PLAI = true, PRAI = false;
                loadJSON('pagesloaded');
                pageNumberController(leftNumber.toString(), LAPI, left, productsPages, prev, next);
                PLAI = false;
                CAPN--;
                if (CLAPI < 0)
                    CLAPI = 0;
                if (CAPN < 1)
                    CAPN = 1;
                if (CAPN == 1)
                    CRAPI = CLAPI + 1;
                else
                    CRAPI = CLAPI + 2;
            }
            else {
                CAPN = CLAPI + 1;
                LAPI = (CLAPI).toString();
                if (CAPN > 1)
                    CLAPI--;
                var left = document.querySelectorAll('.products-pages')[parseInt(LAPI)];
                var next = null;
                var prev = null;
                var leftContent = left.textContent;
                var leftNumber = parseInt(leftContent);
                productsPage = leftNumber - 1;
                loadJSON('pagesloaded');
                pageNumberController(leftNumber.toString(), LAPI, left, productsPages, prev, next);
                if (CAPN == 1)
                    CRAPI = CLAPI + 1;
                else
                    CRAPI = CLAPI + 2;
            }
        }
    });
});
PFC.addEventListener('mouseup', function () { return PPS.classList.remove('productsMove'); });
PSC.addEventListener('mouseup', function () { return PPS.classList.remove('productsMove'); });
PPS.addEventListener('mouseup', function () { return PPS.classList.remove('productsMove'); });
PST === null || PST === void 0 ? void 0 : PST.forEach(function (items) {
    items === null || items === void 0 ? void 0 : items.addEventListener('click', function (item) {
        var sortTypeText = item.target;
        PMS.textContent = sortTypeText.textContent;
    });
});
PVSB.addEventListener('click', function () {
    var _a, _b, _c;
    if ((_a = PVSB.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains('rotate')) {
        (_b = PVSB.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.remove('rotate');
        PHSB.classList.remove('display');
    }
    else {
        (_c = PVSB.nextElementSibling) === null || _c === void 0 ? void 0 : _c.classList.add('rotate');
        PHSB.classList.add('display');
    }
});
PIT.forEach(function (items) {
    items.addEventListener('click', function (item) {
        var _a, _b, _c, _d, _e;
        var content = item.target;
        if ((_a = productsItemCheck === null || productsItemCheck === void 0 ? void 0 : productsItemCheck.classList) === null || _a === void 0 ? void 0 : _a.contains('opacity-text'))
            (_b = productsItemCheck === null || productsItemCheck === void 0 ? void 0 : productsItemCheck.classList) === null || _b === void 0 ? void 0 : _b.remove('opacity-text');
        else {
            if ((_c = productsItemCheck === null || productsItemCheck === void 0 ? void 0 : productsItemCheck.classList) === null || _c === void 0 ? void 0 : _c.contains('opacity-text'))
                (_d = productsItemCheck === null || productsItemCheck === void 0 ? void 0 : productsItemCheck.classList) === null || _d === void 0 ? void 0 : _d.remove('opacity-text');
            (_e = content === null || content === void 0 ? void 0 : content.classList) === null || _e === void 0 ? void 0 : _e.add('opacity-text');
            productsItemCheck = content;
        }
        console.log(productsItemCheck);
    });
});
PCT.forEach(function (items) {
    items.addEventListener('click', function (item) {
        var data = item.target;
        var dataset = data.dataset["id"];
        var id = parseInt(dataset);
        if (productsColorCheck == id) {
            PCT[id].classList.remove('pl');
            PCC[id].classList.remove('colors');
            productsColorCheck = -1;
        }
        else {
            if (productsColorCheck >= 0) {
                PCT[productsColorCheck].classList.remove('pl');
                PCC[productsColorCheck].classList.remove('colors');
            }
            PCT[id].classList.add('pl');
            PCC[id].classList.add('colors');
            productsColorCheck = id;
        }
    });
});
//# sourceMappingURL=Javascript.js.map