const imageIndex = Math.floor(Math.random() * introImages.length);
//INTRO TOOLS
const intro = (document.querySelector('.intro') as HTMLStyleElement); //intro
const IM = (document.querySelector('.intro-headphone_img') as HTMLImageElement); //intro image
const IA = (document.querySelectorAll('.introArrows') as NodeList); //intro arrows
const IP = (document.querySelectorAll('.intro-inner-bottom_page') as NodeList); //intro pages

let IPI: number = imageIndex; //intro page index
//FEATURE TOOLS
const FA = (document.querySelectorAll('.featureArrows') as NodeList); //feature arrows
const FI = (document.querySelector('.features-inner-block-img_set') as HTMLImageElement); //features image
const FIBS = (document.querySelectorAll('.features-inner-block-headphonecolor_side') as NodeList); //features inner block side
const FIB = (document.querySelector('.features-img_bottom') as HTMLStyleElement); //features image bottom

let FPI: number = 0; //feature page index
let featureImages: any = featureImage(featuresImageIndex);
const FII: number = Math.floor(Math.random() * featureImages.length); //feature image index

//VIDEO SECTION TOOLS
const VB = (document.querySelector('.video-section-inner_background') as HTMLStyleElement); //video background
const VBC = (document.querySelectorAll('.video-section-inner-block_content') as NodeList); //video block content
const VBCS = (document.querySelectorAll('.video-section-inner-block_content')[0] as HTMLStyleElement); //video block content style
const VF = (document.querySelector('#fullscreen') as HTMLVideoElement); //video fullscreen
const VC = (document.querySelector('.volume_circle') as HTMLStyleElement); //volume circle
const VI = (document.querySelector('.volume_indicator') as unknown as MouseEvent); //volume indicator
const VIS = (document.querySelector('.volume_indicator') as HTMLStyleElement); //volume indicator style
const VP = (document.querySelector('.volume_progress') as HTMLStyleElement); //volume progress
const volume = (document.querySelector('.fa-volume') as HTMLStyleElement); 
const video = (document.querySelector('.main-video') as any); 
const play = (document.querySelector('#play') as HTMLStyleElement);
const VSP = (document.querySelector('.video-section_progress') as HTMLStyleElement); //video section progress
const VSD = (document.querySelector('.video-section_duration') as HTMLStyleElement); //video section duration

let volumeOffsetX: string = '1.0'; //volume offsetX

//PRODUCTS SECTION TOOLS
const PTO = (document.querySelectorAll('#products-text_options') as NodeList); //products text options
const PTC = (document.querySelector('#products-text_colors') as HTMLStyleElement); //products text colors
const PPS = (document.querySelector('.products-price_set') as HTMLStyleElement); //products price set
const PFC = (document.querySelectorAll('.products-price_circle')[0] as HTMLStyleElement); //products first circle
const PSC = (document.querySelectorAll('.products-price_circle')[1] as HTMLStyleElement); //products second circle 
const PFP = (document.querySelectorAll('.products-price')[0] as HTMLStyleElement); //products first price
const PSP = (document.querySelectorAll('.products-price')[1] as HTMLStyleElement); //products second price
const PST = (document.querySelectorAll('.sort-type') as NodeListOf<HTMLStyleElement>); //products sort type
const PHSB = (document.querySelector('.products-hidden-sort_block') as HTMLStyleElement); //products hidden sort block
const PVSB = (document.querySelector('.products-hover-sort_block') as HTMLStyleElement); //products visible sort block
const PMS = (document.querySelector('.main-sort') as HTMLStyleElement); //products main sort
const productsImg = (document.querySelectorAll('.products-img') as NodeListOf<HTMLImageElement>); //products image
const PMI = (document.querySelector('.products-inner-mainblock_items') as HTMLDivElement); //products main items
const PPB = (document.querySelector('.products-inner-mainblock-pages_inner') as HTMLDivElement); //products pages block
let PPD = (document.querySelectorAll('.page-dots') as NodeListOf<HTMLElement>); //products page dots
const PIT = (document.querySelectorAll('#item-text') as NodeListOf<HTMLElement>); //products item text
const PCT = (document.querySelectorAll('#colors-text') as NodeListOf<HTMLElement>); //products color text
const PCC = (document.querySelectorAll('.colors-circle') as NodeListOf<HTMLStyleElement>); //products color circle
const PAC = (document.querySelectorAll('#products-arrow-controller') as NodeListOf<HTMLElement>); //products arrow controller

let CAPN: number = 1; // current arrow page number
let CRAPI: number = 1; // current right arrow page id
let CLAPI: number = 0; // current left arrow page id
let LAPN: string; // left arrow page number
let RAPN: string; // right arrow page number
let LAPI: string; // left arrow page id
let RAPI: string; // left arrow page id
let PRAI: boolean = false; // products right arrow id
let PLAI: boolean = false; // products left arrow id

let productsItemCheck: HTMLStyleElement;

let productsColorCheck: number = -1; //
let productsBlockId: number = -1;
let productsPage: number = 0;
let productsPageNumbers: number = 0;
let productsPageStart: number = 2;
let productsStylePage: number = 0;
let productsUpdatePage: number = -1;
let productsId: number = 0;
let start: number = 0;
let end: number = 0;
let productsPageCheck: boolean = false;
let productsLongPage: boolean = false;
let productsCurrentPage: number = 1;
let productsLoaded: boolean = false;

play?.addEventListener('click', () => videoController());
video?.addEventListener('click', () => videoController());
VIS?.addEventListener('mousedown', (item: MouseEvent) => volumeMainController(`${item?.offsetX}px`));
VP?.addEventListener('mousedown', (item: MouseEvent) => volumeMainController(`${item?.offsetX}px`));
VC?.addEventListener('mousedown', () => volumeMainController(`${VI.offsetX}px`));
VC?.addEventListener('mouseup', () => removeVolumeClasses());
VIS?.addEventListener('mouseup', () => removeVolumeClasses());
VP?.addEventListener('mouseup', () => removeVolumeClasses());
VSD?.addEventListener('click', (videoWidth: MouseEvent) => getVideoWidth(`${videoWidth.offsetX}px`));
VSP?.addEventListener('click', (videoWidth: MouseEvent) => getVideoWidth(`${videoWidth.offsetX}px`));
volume.addEventListener('click', () => {
  if (volume.classList.contains('quiet')) {
    volume.classList.remove('quiet');
    VC.style.left = '0px';
    VP.style.width = '0px';
    video.volume = 0;
  }
  else {
    volume.classList.add('quiet');
    VC.style.left = `${VIS.offsetWidth}px`;
    VP.style.width = `${VIS.offsetWidth}px`;
    video.volume = 1.0;
  }
})
VF?.addEventListener('click', () => {
  if (video.requestFullscreen)
    video.requestFullscreen();
  if (video.webkitRequestFullscreen)  /* Safari */
    video.webkitRequestFullscreen();
  else if (video.msRequestFullscreen) /* IE11 */
    video.msRequestFullscreen();
});

const width: number = VIS.offsetWidth;

//FUNCTION TO REMOVE INDICATOR AND PROGRESS MOVE CLASSES AFTER REMOVING CLICK IN VIDEO SECTION
function removeVolumeClasses() {
  VIS.classList.remove('indicatorMove');
  VP.classList.remove('progressMove');
}

// FUNCTION OF CONTROLLING VOLUME IN VIDEO SECTION
function setVolume(volume: string, offsetX: string) {
  VC.style.left = offsetX;
  VP.style.width = offsetX;
  volume = (parseInt(offsetX) / width).toFixed(1);
  video.volume = parseFloat(volume);
}

//FUNCTION OF CONTROLLING VOLUME AFTER CLICKING IT IN VIDEO SECTION
function volumeMainController(offsetX: string) {
  if (offsetX.match('undefined')) offsetX = volumeOffsetX;
  else volumeOffsetX = offsetX;
  volumeController(offsetX);
  let volume = (parseInt(offsetX) / width).toFixed(1);
  video.volume = parseFloat(volume);
  const IM = (document.querySelector('.indicatorMove') as HTMLStyleElement); //indicator move
  const PM = (document.querySelector('.progressMove') as HTMLStyleElement); //progress move

  IM?.addEventListener('mousemove', (e: MouseEvent) => {
    if (VIS.classList?.contains('indicatorMove'))
      setVolume(volume, `${e.offsetX}px`);
  });

  PM?.addEventListener('mousemove', (e: MouseEvent) => {
    if (VP.classList?.contains('progressMove'))
      setVolume(volume, `${e.offsetX}px`);
  });
}

//FUNCTION TO CONTROL VOLUME MOVING EFFECT IN VIDEO SECTION
function volumeController(offsetX: string) {
  VC.style.left = offsetX;
  VP.style.width = offsetX;
  VIS.classList.add('indicatorMove');
  VP.classList.add('progressMove');
}

document.addEventListener('DOMContentLoaded', () => {
  setIntroImageandBackground(imageIndex);
  FI.src = featureImages[FII].src;
  setFeatureImagesColors();
  setFeatureImagesPages();
  setFeaturePagesBottomStyle();
  setFeaturePagesBottomClick();
  setFeatureArrows();
  setVideoContent();
  loadJSON('unloadedpages');
  setTimeout(() => document.querySelectorAll('.products-pages')[0].classList.add('opacity-text'), 350);
});

//SET INTRO PAGES IN INTRO SECTION
IP?.forEach((items: Node) => {
  items?.addEventListener('click', (item: Event) => {
    const ICT = (document.querySelectorAll('.intro-inner-bottom_page')[IPI] as HTMLStyleElement);
    ICT.classList.remove('intro-inner-bottom-page_hover');
    const EPI = (item.target as HTMLStyleElement);
    const index = (EPI.textContent?.toString() as string);
    IPI = parseInt(index) - 1
    EPI?.classList.add('intro-inner-bottom-page_hover');
    setIntroImageandBackground(IPI);
  });
});

//CONTROLLING INTRO ARROWS CLICK IN INTRO SECTION
IA?.forEach((items: Node) => {
  items?.addEventListener('click', (item: Event) => {
    const event = (item.target as HTMLStyleElement);
    if (event.previousElementSibling?.textContent?.match('next')) {
      const ICP = (document.querySelectorAll('.intro-inner-bottom_page')[IPI] as HTMLStyleElement);
      ICP.classList.remove('intro-inner-bottom-page_hover');
      IPI++;
      if (IPI > 4) IPI = 0;
    }
    else if (event.nextElementSibling?.textContent?.match('prev')) {
      const ICP = (document.querySelectorAll('.intro-inner-bottom_page')[IPI] as HTMLStyleElement); //intro current pages
      ICP.classList.remove('intro-inner-bottom-page_hover');
      IPI--;
      if (IPI < 0) IPI = 4;
    }
    setIntroImageandBackground(IPI);
  });
});

//FUNCTION TO SET INTRO IMAGE AND BACKGROUND
function setIntroImageandBackground(index: number) {
  intro.style.backgroundColor = introImages[index].background;
  IM.src = introImages[index].src;
  const ICP = (document.querySelectorAll('.intro-inner-bottom_page')[index] as HTMLStyleElement); // intro current pages
  ICP.classList.add('intro-inner-bottom-page_hover');
}

//FUNCTION TO SET DIFFERENT COLOR OF HEADPHONES IN FEATURE SECTION
function setFeatureImagesColors() {
  for (let i = 0; i < 4; i++) {
    const FS = document.createElement('div'); //features side
    FS.innerHTML =
      `<div class='colorsBorder_F'>
      <span class='colorsBorder_S'></span>
      <i class='circle_${i + 1} colorsCircle' data-id='${i + 1}'></i>
    </div>
    <div class='colorsBorder_F'>
      <p>${colorsName[i].name}</p>
    </div>`;
    FIBS[0].appendChild(FS);
  }

  for (let i = 0; i < 4; i++) {
    const FS = document.createElement('div'); //features side
    FS.innerHTML =
      `<div class='colorsBorder_F'>
      <span class='colorsBorder_S'></span>
      <i class='circle_${i + 5} colorsCircle' data-id='${i + 5}'></i>
    </div>
    <div class='colorsBorder_F'>
      <p>${colorsName[i + 4].name}</p>
    </div>`;
    FIBS[1].appendChild(FS);
  }
  setColorCircle();
}

//FUNCTION TO GIVE COLOR FOR CIRCLES IN FEATURE SECTION
function setColorCircle() {
  const CB = (document.querySelectorAll('.colorsBorder_S') as NodeListOf<HTMLStyleElement>); //colors border
  const CC = (document.querySelectorAll('.colorsCircle') as NodeListOf<HTMLStyleElement>); //colors circle

  for (let i = 0; i < CC.length; i++) {
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
  CC.forEach((items: Node) => {
    items.addEventListener('click', (item: Event) => {
      const dataset = (item.target as HTMLStyleElement);
      const dataId = (dataset.dataset["id"] as string);
      const id: number = parseInt(dataId) - 1;
      if (id != featureImages[0].id) {
        if (id == 4) {
          CC[4].style.border = 'none';
          CC[4].style.opacity = '1';
        }
        else {
          CC[4].style.border = '1px solid black';
          CC[4].style.opacity = '0.2';
        }
        const NFI: any = featureImage(id); //new feature image
        FI.src = NFI[0].src;
        CB[featureImages[0].id].style.borderColor = 'transparent';
        CB[id].style.borderColor = colorsName[id].color;
        featureImages = featureImage(id);
        const FIBP = (document.querySelectorAll('.features-img-bottom_page') as NodeListOf<HTMLStyleElement>); //feature bottom page
        FIBP[FPI].style.borderBottom = '1px solid transparent';
        while (FIB.childNodes.length != 1) FIB.removeChild(FIB.childNodes[1]);
        setFeatureImagesPages();
        setFeaturePagesBottomClick();
        const NFBP = (document.querySelectorAll('.features-img-bottom_page') as NodeListOf<HTMLStyleElement>); //new feature bottom page
        FPI = 0;
        NFBP[FPI].style.borderBottom = '1px solid black';
      }
    });
  });
}

//FUNCTION TO SET HEADPHONE IMAGE PAGES IN FEATURE SECTION
function setFeatureImagesPages() {
  for (let i = 0; i < featureImages.length; i++) {
    const FIBP = document.createElement('span');
    FIBP.classList.add('intro-inner-bottom_page');
    FIBP.classList.add('features-img-bottom_page');
    FIBP.innerHTML = `${i + 1}`;
    FIB.appendChild(FIBP);
  }
}


function setFeaturePagesBottomStyle() {
  const FIBP = (document.querySelectorAll('.features-img-bottom_page') as NodeListOf<HTMLStyleElement>);
  FIBP[featureImages[FII].imageId].style.borderBottom = '1px solid black';
  FPI = featureImages[FII].imageId;
}

//FUNCTION TO CONTROL CLICK OF HEADPHONE PAGES IN FEATURE SECTION
function setFeaturePagesBottomClick() {
  const FIBP = (document.querySelectorAll('.features-img-bottom_page') as NodeListOf<HTMLStyleElement>);
  FIBP?.forEach((items: Node) => {
    items?.addEventListener('click', (item: Event) => {
      const event = (item.target as HTMLStyleElement);
      const text = (event.textContent?.toString() as string);
      const img: number = parseInt(text) - 1;
      FI.src = featureImages[img].src;
      FIBP[FPI].style.borderBottom = '1px solid transparent';
      FIBP[img].style.borderBottom = '1px solid black';
      FPI = img;
    });
  });
}

//FUNCTION TO CONTROLL ARROWS IN FEATURE SECTION
function setFeatureArrows() {
  FA.forEach((items: Node) => {
    items.addEventListener('click', (item: Event) => {
      const FIBP = (document.querySelectorAll('.features-img-bottom_page') as NodeListOf<HTMLStyleElement>);
      const event = (item.target as HTMLStyleElement);
      if (event?.previousElementSibling?.textContent?.match('next')) {
        FIBP[FPI].style.borderBottom = '1px solid transparent';
        FPI++;
        if (FIBP.length <= FPI) FPI = 0;
        FIBP[FPI].style.borderBottom = '1px solid black';
        FI.src = featureImages[FPI].src;
      }
      else if (event?.nextElementSibling?.textContent?.match('prev')) {
        FIBP[FPI].style.borderBottom = '1px solid transparent';
        FPI--;
        if (0 > FPI) FPI = FIBP.length - 1;
        FIBP[FPI].style.borderBottom = '1px solid black';
        FI.src = featureImages[FPI].src;
      }
    });
  });
}

//FUNCTION TO HIDE ELEMENT AFTER CLICKING VIDEO IN VIDEO SECTION
function videoController() {
  if (video.classList.contains('pause')) {
    video.play(); video.classList.remove('pause');
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
    video.pause(); video.classList.add('pause');
  }
}

//EVENT TO CONTROL VIDEO DURATION TIME
video?.addEventListener('timeupdate', () => {
  let durationWidth: number = VSD.offsetWidth;
  let progress: number = video?.currentTime;
  let duration: number = video.duration;
  progress *= durationWidth; progress /= duration;
  VSP.style.width = `${progress}px`;
});

//EVENT TO CONTROL SITUATION AFTER VIDEO ENDED
video.onended = () => {
  play.classList.remove('fa-play-circle');
  play.classList.add('fa-undo');
  play.style.visibility = 'visible';
  VB.style.backgroundColor = 'black';
  VBCS.style.visibility = 'visible';
  video.classList.add('pause');
}

function getVideoWidth(offsetX: string) {
  VSP.style.width = offsetX;
  video.currentTime = (parseFloat(offsetX) * video.duration) / VSD.offsetWidth;
}

function setVideoContent() {
  let indexCheck: number = 0;
  for (let i = 0; i < videos.length && indexCheck < 3; i++) {
    if (video.src != videos[i].src && indexCheck < 3) {
      const VB = document.createElement('div'); // video block
      VB.innerHTML = `<video src=${videos[i].src} class="video-content"></video>`;
      VBC[0].appendChild(VB);
      indexCheck++;
    }
  }
  if (indexCheck > 2) {
    const VB = document.createElement('div'); //video block
    VB.innerHTML = `<span class="black-box fas">More</span>`;
    VBC[0].appendChild(VB);
  }
  const videoContent = (document.querySelectorAll('.video-content') as NodeList);
  videoContent?.forEach((items: Node) => {
    items?.addEventListener('click', (item: Event) => {
      const event = (item.target as HTMLVideoElement);
      if (play.classList.contains('fa-undo')) {
        play.classList.remove('fa-undo');
        play.classList.add('fa-play-circle');
      }
      const newVideo = video.src;
      video.src = event.src;
      event.src = newVideo;
      VSP.style.width = '0px';
    });
  });
}

//CONTROL PRODUCTS DESCRIPTION BLOCK HEIGHT
PTO.forEach((items: Node) => {
  items.addEventListener('click', (item: Event) => {
    const dataset = (item.target as HTMLStyleElement);
    const id = (dataset.dataset["id"] as string);
    if (productsBlockId == parseInt(id)) {
      const PTB = (document.querySelectorAll('.products-text_block')[productsBlockId] as HTMLStyleElement);
      const PT = (document.querySelectorAll('.products-text')[productsBlockId] as HTMLStyleElement);
      PT.classList.remove('opacity-text');
      PTB?.classList?.remove('products-text_show');
      productsBlockId = -1;
    }
    else {
      if (productsBlockId >= 0) {
        const PTB = (document.querySelectorAll('.products-text_block')[productsBlockId] as HTMLStyleElement);
        const PT = (document.querySelectorAll('.products-text')[productsBlockId] as HTMLStyleElement);
        PT.classList.remove('opacity-text');
        PTB.classList.remove('products-text_show');
      }
      const PTB = (document.querySelectorAll('.products-text_block')[parseInt(id)] as HTMLStyleElement);
      const PT = (document.querySelectorAll('.products-text')[parseInt(id)] as HTMLStyleElement);
      PT.classList.add('opacity-text');
      productsBlockId = parseInt(id);
      PTB.classList.add('products-text_show');
    }
    productsItemCheck?.classList?.remove('opacity-text');
  });
});

PTC.addEventListener('click', () => {
  const PTB = (document.querySelectorAll('.products-text_block')[3] as HTMLStyleElement);
  if (PTB.classList.contains('products-text_show')) {
    PTB.classList.remove('products-text_show');
    PCT[productsColorCheck]?.classList?.remove('pl');
    PCC[productsColorCheck]?.classList?.remove('colors');
  }

  else PTB.classList.add('products-text_show');
});

PFC.addEventListener('mousedown', () => productsPriceLineMove());
PSC.addEventListener('mousedown', () => productsPriceLineMove());
PPS.addEventListener('mousedown', (e: MouseEvent) => {
  if (e.offsetX > (PPS.offsetWidth / 2))
    setProductsPriceMove(PSP, PSC, e.offsetX, 500);

  else setProductsPriceMove(PFP, PFC, e.offsetX, 50);

  productsPriceLineMove();
});

function productsPriceLineMove() {
  PPS.classList.add('productsMove');
  const productsMove = (document.querySelector('.productsMove') as HTMLStyleElement);
  productsMove?.addEventListener('mousemove', (e: MouseEvent) => {
    if (PPS.classList.contains('productsMove')) {
      if ((PPS.offsetWidth / 2) > e.offsetX)
        setProductsPriceMove(PFP, PFC, e.offsetX, 50);

      else if (e.offsetX > (PPS.offsetWidth / 2))
        setProductsPriceMove(PSP, PSC, e.offsetX, 500);
    }
  });
}

function setProductsPriceMove(productPrice: HTMLStyleElement, productCircle: HTMLStyleElement, offsetX: number, n: number) {
  productCircle.style.left = `${offsetX}px`;
  productPrice.style.left = `${offsetX}px`;
  const offsetNumber: number = Math.round((100 * offsetX) / 10) + n;
  productPrice.textContent = `${offsetNumber}`;
}

function loadJSON(message: string) {
  fetch('Javascript/headphone.json')
    .then(response => response.json())
    .then(data => {
      let content: string = '';
      productsPageNumbers = Math.ceil(data.length / 6);
      let percent = data.length - productsPage * 6;
      percent >= 6 ? percent = 6 : percent = percent;

      for (let i = productsPage * 6; i < (productsPage * 6) + percent; i++) {
        const products: any = data[i];
        content += `<div class="products-inner-mainblock-items_block">
                    <div class="products-inner-mainblock-items_img">
                      <img src="${products.imgSrc}" class="products-img"></img>
                    </div>
                    <p class="products-inner-mainblock-items_name">${products.name}</p>
                    <p class="products-inner-mainblock-items_text">Get the most out of your music with an experience</p>
                    <span class="products-inner-mainblock-items_subblock">
                      <p>${products.price}</p>
                      <span>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </span>
                    </span>
                  </div>`;
      }
      PMI.innerHTML = content;
      setProductsPages(message);
      productsLoaded = true;
    })
    .catch(error => alert('User live server or local server'));
}

function setProductsPages(message: string) {
  if (message.match('unloadedpages')) {
    productsId = 0;
    PPB.innerHTML = `<p class="products-pages" data-id="${productsId}">1</p>`;
    if (productsPageNumbers > 6) {
      for (let i = productsPageStart; i < productsPageStart + 3; i++)
        PPB.innerHTML += `<p class="products-pages" data-id="${++productsId}">${i}</p>`;

      PPB.innerHTML += `<span class="page-dots">...</span>
      <p class="products-pages" data-id="${++productsId}">${productsPageNumbers}</p>`;
      productsLongPage = true;
    }

    else {
      const end = productsPageNumbers;
      for (let i = productsPageStart; i < end + 1; i++) {
        PPB.innerHTML += `<p class="products-pages" data-id="${++productsId}">${i}</p>`;
      }
      productsLongPage = false;
    }

    productsPageCheck = false; productsStylePage = -1;
    PPD = (document.querySelectorAll('.page-dots') as NodeListOf<HTMLElement>);
    pageDots();
    getProductsPageItems();
  }
}

function getProductsPageItems() {
  const productsPages = (document.querySelectorAll('.products-pages') as NodeListOf<HTMLStyleElement>);
  productsPages.forEach((items: Node) => {
    items.addEventListener('click', (item: Event) => {
      const pagesStyle = (item.target as HTMLStyleElement);
      const prev = (pagesStyle.previousElementSibling as HTMLStyleElement);
      const next = (pagesStyle.nextElementSibling as HTMLStyleElement);
      const dataset = (pagesStyle.dataset["id"] as string);
      const number = (pagesStyle.textContent as string);
      CAPN = parseInt(number);
      if(productsLongPage) {
        if(CAPN > 2 && CAPN < productsPageNumbers - 2) CRAPI = parseInt(dataset) + 1, CLAPI = (parseInt(dataset) - 1);
        else if(CAPN == productsPageNumbers) CRAPI = parseInt(dataset), CLAPI = (parseInt(dataset) - 1);
        else CRAPI = (parseInt(dataset) + 1), CLAPI = parseInt(dataset);
      }
      else if(!productsLongPage) {
        if(CAPN == productsPageNumbers) CRAPI = parseInt(dataset), CLAPI = parseInt(dataset) - 1;
        else if(CAPN > 1 && CAPN < productsPageNumbers) CRAPI = parseInt(dataset) + 1, CLAPI = (parseInt(dataset) - 1);
        else CRAPI = (parseInt(dataset) + 1), CLAPI = parseInt(dataset);
      }
      productsPage = parseInt(number) - 1;
      loadJSON('pagesloaded');
      pageNumberController(number, dataset, pagesStyle, productsPages, prev, next);
    });
  });
}

function updateProductPages(number: number, dataset: string | undefined) {

  const id = (dataset as string);
  let setId = parseInt(id);
  productsId = 0;
  PPB.innerHTML =
    `<p class="products-pages" data-id="${productsId}">1</p>
  <span class="page-dots">...</span>`;

  if (number + 2 == productsPageNumbers) { start = number - 1; end = number + 2; }
  else if (number + 1 == productsPageNumbers) { start = number - 2; end = number + 1; }
  else if (number == productsPageNumbers) { start = number - 3; end = number; }
  else { start = number - 1; end = number + 2;}

  for (let i = start; i < end; i++)
    PPB.innerHTML += `<p class="products-pages" data-id="${++productsId}">${i}</p>`;
  if (end - 2 == number && end != productsPageNumbers)
    PPB.innerHTML += `<span class="page-dots">...</span>`;
  PPB.innerHTML += `<p class="products-pages" data-id="${++productsId}">${productsPageNumbers}</p>`;

  const productsPages = (document.querySelectorAll('.products-pages') as NodeListOf<HTMLStyleElement>);
  PPD = (document.querySelectorAll('.page-dots') as NodeListOf<HTMLElement>);

  if (number == productsPageNumbers) setId = parseInt(id);
  else if (productsCurrentPage > number) setId = parseInt(id) + 1;
  else if (productsCurrentPage < number) setId = parseInt(id) - 1;
  else if (productsCurrentPage == number && PRAI) setId = parseInt(id) - 1;
  else if (productsCurrentPage == number && PLAI) setId = parseInt(id) + 1;
  productsPages[setId].classList.add('opacity-text');
  productsUpdatePage = setId; productsStylePage = 0; 
  productsPageCheck = true;
  pageDots();
  getProductsPageItems();
}

function pageDots() {
  PPD.forEach((items: Node) => {
    items.addEventListener('click', (item: Event) => {
      const text = (item.target as HTMLStyleElement);
      const getFNumber = (text.previousElementSibling?.textContent as string);
      const getSNumber = (text.nextElementSibling?.textContent as string);
      let prevNumber: number = parseInt(getFNumber);
      let nextNumber: number = parseInt(getSNumber);
      if (prevNumber == 1) {
        if (nextNumber - 1 <= 3) {
          productsPage = 2;
          loadJSON('pagesloaded');
          setProductsPages('unloadedpages');
          const productsPages = (document.querySelectorAll('.products-pages') as NodeListOf<HTMLStyleElement>);;
          productsPages[2].classList.add('opacity-text');
          productsStylePage = 2;
        }
        else if (nextNumber - 3 > 0) {
          const next = (text.nextElementSibling as HTMLStyleElement);
          const dataset = (next.dataset["id"] as string);
          const pageSet = (next.textContent as string);
          productsCurrentPage = parseInt(pageSet);
          CAPN = productsPage = nextNumber - 1;
          PLAI = true;
          CLAPI = parseInt(dataset);

          loadJSON('pagesloaded');
          updateProductPages(--nextNumber, dataset);
        }
      }

      else if (nextNumber == productsPageNumbers) {
        const prev = (text.previousElementSibling as HTMLStyleElement);
        const dataset = (prev.dataset["id"] as string);
        const pageSet = (prev.textContent as string);
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

function pageNumberController(number: string, dataset: string,
  pagesStyle: HTMLStyleElement, productsPages: NodeListOf<HTMLStyleElement>,
  prev: HTMLStyleElement | null, next: HTMLStyleElement | null) {

  if (productsLoaded) productsPages[0]?.classList?.remove('opacity-text'), productsLoaded = true;

  if (productsStylePage > -1)
    productsPages[productsStylePage]?.classList?.remove('opacity-text');

  if (!pagesStyle.classList.contains('opacity-text')) {
    if (parseInt(number) - 3 > 0 && productsLongPage) {
      if (parseInt(number) == productsPageNumbers) updateProductPages(parseInt(number), dataset);


      else if (prev?.classList?.contains('page-dots')) {
        if (parseInt(number) == 3) {
          setProductsPages('unloadedpages');
          const productsPages = (document.querySelectorAll('.products-pages') as NodeListOf<HTMLStyleElement>);;
          const setId = parseInt(number) - 1;
          productsPages[setId]?.classList?.add('opacity-text');
          productsUpdatePage = setId;
        }
        else updateProductPages(parseInt(number), dataset);
      }

      else if (next?.classList?.contains('page-dots')) updateProductPages(parseInt(number), dataset);
      
      else if (!prev?.classList?.contains('page-dots')) pagesStyle.classList.add('opacity-text');

    }

    else if (parseInt(number) - 3 <= 0 && productsPageCheck && productsLongPage) {

      setProductsPages('unloadedpages');
      if (productsCurrentPage > parseInt(number)) {
        const productsPages = (document.querySelectorAll('.products-pages') as NodeListOf<HTMLStyleElement>);;
        const setId = parseInt(number) - 1;
        productsPages[setId].classList.add('opacity-text');
      }
    }
    else pagesStyle.classList.add('opacity-text'); 
    
  }
  productsCurrentPage = parseInt(number);
  if (productsStylePage != productsUpdatePage) productsStylePage = productsUpdatePage;
  else productsStylePage = parseInt(dataset), productsUpdatePage = productsStylePage;
}

PAC.forEach((items: Node) => {
  items.addEventListener('click', (item: Event) => {
    const productsPages = (document.querySelectorAll('.products-pages') as NodeListOf<HTMLStyleElement>);
    const style = (item.target as HTMLStyleElement);
    if(style?.classList?.contains('fa-arrow-right')) {
      if(productsLongPage) {
        if((CAPN < (productsPageNumbers - 2) && CAPN > 3) || 
        CAPN == (productsPageNumbers - 2)) RAPI = '3', CRAPI = 4;
        else RAPI = CRAPI.toString(), CRAPI++;
        const right = (document.querySelectorAll('.products-pages')[parseInt(RAPI)] as HTMLStyleElement);
        const next = (right.nextElementSibling as HTMLStyleElement);
        const prev = (right.previousElementSibling as HTMLStyleElement);
        const rightContent = right.textContent as string;
        const rightNumber = parseInt(rightContent);
        productsPage = rightNumber - 1;
        if(PLAI) PRAI = true, PLAI = false;
        loadJSON('pagesloaded');
        pageNumberController(rightNumber.toString(), RAPI, right, productsPages, prev, next);
        PRAI = false;
        CAPN++;
        if(CRAPI > 4) CRAPI = 4;
        if(CAPN > productsPageNumbers) CAPN = productsPageNumbers;
        if(CAPN == productsPageNumbers) CLAPI = CRAPI - 1;
        else CLAPI = CRAPI - 2;   
      }
      else {
        CAPN = CRAPI + 1;
        RAPI = (CRAPI).toString();
        if(CAPN < productsPageNumbers) CRAPI++;
        const right = (document.querySelectorAll('.products-pages')[parseInt(RAPI)] as HTMLStyleElement);
        const next = null; const prev = null;
        const rightContent = right.textContent as string;
        const rightNumber = parseInt(rightContent);
        productsPage = rightNumber - 1;
        loadJSON('pagesloaded');
        pageNumberController(rightNumber.toString(), RAPI, right, productsPages, prev, next);
        if(CAPN == productsPageNumbers) CLAPI = CRAPI - 1;
        else CLAPI = CRAPI - 2;
      }
    }
    else if(style?.classList?.contains('fa-arrow-left')) {
      if(productsLongPage) {
        if((CAPN <= (productsPageNumbers - 2) && CAPN > 3)) LAPI = '1', CLAPI = 1;
        else LAPI = CLAPI.toString(), CLAPI--;
        const left = (document.querySelectorAll('.products-pages')[parseInt(LAPI)] as HTMLStyleElement);
        const next = (left.nextElementSibling as HTMLStyleElement);
        const prev = (left.previousElementSibling as HTMLStyleElement);
        const leftContent = left.textContent as string;
        const leftNumber = parseInt(leftContent);
        productsPage = leftNumber - 1;
        if(PRAI) PLAI = true, PRAI = false;      
        loadJSON('pagesloaded');
        pageNumberController(leftNumber.toString(), LAPI, left, productsPages, prev, next);
        PLAI = false;
        CAPN--;
        if(CLAPI < 0) CLAPI = 0;
        if(CAPN < 1) CAPN = 1;
        if(CAPN == 1) CRAPI = CLAPI + 1;
        else CRAPI = CLAPI + 2;
      }
      else {
        CAPN = CLAPI + 1;
        LAPI = (CLAPI).toString();
        if(CAPN > 1) CLAPI--; 
        const left = (document.querySelectorAll('.products-pages')[parseInt(LAPI)] as HTMLStyleElement);
        const next = null; const prev = null;
        const leftContent = left.textContent as string;
        const leftNumber = parseInt(leftContent);
        productsPage = leftNumber - 1;
        loadJSON('pagesloaded');
        pageNumberController(leftNumber.toString(), LAPI, left, productsPages, prev, next);
        if(CAPN == 1) CRAPI = CLAPI + 1;
        else CRAPI = CLAPI + 2;
      }
    }
  })
})

PFC.addEventListener('mouseup', () => PPS.classList.remove('productsMove'));
PSC.addEventListener('mouseup', () => PPS.classList.remove('productsMove'));
PPS.addEventListener('mouseup', () => PPS.classList.remove('productsMove'));

PST?.forEach((items: Node) => {
  items?.addEventListener('click', (item: Event) => {
    const sortTypeText = (item.target as HTMLStyleElement)
    PMS.textContent = sortTypeText.textContent;
  });
});

PVSB.addEventListener('click', () => {
  if (PVSB.nextElementSibling?.classList.contains('rotate')) {
    PVSB.nextElementSibling?.classList.remove('rotate');
    PHSB.classList.remove('display');
  }
  else {
    PVSB.nextElementSibling?.classList.add('rotate');
    PHSB.classList.add('display');
  }
});

PIT.forEach((items: Node) => {
  items.addEventListener('click', (item: Event) => {
    const content = (item.target as HTMLStyleElement);
    if (productsItemCheck?.classList?.contains('opacity-text')) productsItemCheck?.classList?.remove('opacity-text');

    else {
      if (productsItemCheck?.classList?.contains('opacity-text')) productsItemCheck?.classList?.remove('opacity-text');
      content?.classList?.add('opacity-text');
      productsItemCheck = content;
    }
    console.log(productsItemCheck);
  });
});

PCT.forEach((items: Node) => {
  items.addEventListener('click', (item: Event) => {
    const data = (item.target as HTMLStyleElement);
    const dataset = (data.dataset["id"] as string);
    const id = parseInt(dataset);
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

