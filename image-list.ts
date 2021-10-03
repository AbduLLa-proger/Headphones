const introImages = [
  {
    src: 'images/intro1.png',
    background: '#511712',
  },
  {
    src: 'images/intro2.png',
    background: '#cb1a12',
  },
  {
    src: 'images/intro3.png',
    background: '#fd6003',
  },
  {
    src: 'images/intro4.png',
    background: '#997b3d',
  },
  {
    src: 'images/intro5.png',
    background: '#ed5679',
  },
];

const featuresImageIndex = Math.floor(Math.random() * 8);

/////////////////////////////////GLOSSBLACK
const glossBlack = [
  {
    src: 'images/features_glossblack1.png',
    id: 0,
    imageId: 0,
  },
  {
    src: 'images/features_glossblack2.png',
    id: 0,
    imageId: 1,
  },
  {
    src: 'images/features_glossblack3.png',
    id: 0,
    imageId: 2,
  },
  {
    src: 'images/features_glossblack4.png',
    id: 0,
    imageId: 3,
  },
];

/////////////////////////////////ROSEGOLD
const roseGold = [
  {
    src: 'images/features_rosegold1.png',
    id: 1,
    imageId: 0,
  },
  {
    src: 'images/features_rosegold2.png',
    id: 1,
    imageId: 1,
  },
];

///////////////////////////////////////GOLD
const gold = [
  {
    src: 'images/features_gold1.png',
    id: 2,
    imageId: 0,
  },
  {
    src: 'images/features_gold2.png',
    id: 2,
    imageId: 1,
  },
  {
    src: 'images/features_gold3.png',
    id: 2,
    imageId: 2,
  },
  {
    src: 'images/features_gold4.png',
    id: 2,
    imageId: 3,
  },
];

/////////////////////////////////VIOLET
const ultraViolet = [
  {
    src: 'images/features_violet1.png',
    id: 3,
    imageId: 0,
  },
  {
    src: 'images/features_violet2.png',
    id: 3,
    imageId: 1,
  },
  {
    src: 'images/features_violet3.png',
    id: 3,
    imageId: 2,
  },
];

/////////////////////////////////GLOSSWHITE
const glossWhite = [
  {
    src: 'images/features_glosswhite1.png',
    id: 4,
    imageId: 0,
  },
  {
    src: 'images/features_glosswhite2.png',
    id: 4,
    imageId: 1,
  },
  {
    src: 'images/features_glosswhite3.png',
    id: 4,
    imageId: 2,
  },
  {
    src: 'images/features_glosswhite4.png',
    id: 4,
    imageId: 3,
  },
];

//////////////////////////////////BLACK
const black = [
  {
    src: 'images/features_black1.png',
    id: 5,
    imageId: 0,
  },
  {
    src: 'images/features_black2.png',
    id: 5,
    imageId: 1,
  },
  {
    src: 'images/features_black3.png',
    id: 5,
    imageId: 2,
  },
  {
    src: 'images/features_black4.png',
    id: 5,
    imageId: 3,
  },
  {
    src: 'images/features_black5.png',
    id: 5,
    imageId: 4,
  },
  {
    src: 'images/features_black6.png',
    id: 5,
    imageId: 5,
  },
];

///////////////////////////////////SILVER
const silver = [
  {
    src: 'images/features_silver1.png',
    id: 6,
    imageId: 0,
  },
  {
    src: 'images/features_silver2.png',
    id: 6,
    imageId: 1,
  },
  {
    src: 'images/features_silver3.png',
    id: 6,
    imageId: 2,
  },
];

/////////////////////////////////////RED
const red = [
  {
    src: 'images/features_red1.png',
    id: 7,
    imageId: 0,
  },
  {
    src: 'images/features_red2.png',
    id: 7,
    imageId: 1,
  },
  {
    src: 'images/features_red3.png',
    id: 7,
    imageId: 2,
  },
];

const colorsName = [
  {
    name: 'gloss black',
    color: 'black',
  },
  {
    name: 'rose gold',
    color: '#e6c2bd'
  },
  {
    name: 'gold',
    color: '#e4bf9c',
  },
  {
    name: 'ultra violet',
    color: '#9878cf',
  },
  {
    name: 'gloss white',
    color: '#f0f0f0',
  },
  {
    name: 'black',
    color: 'black',
  },
  {
    name: 'silver',
    color: '#ababac',
  },
  {
    name: 'red',
    color: '#e63333',
  },
];

function featureImage(imageIndex: number) {
  if(imageIndex == 0)  return glossBlack;

  else if(imageIndex == 1) return roseGold;

  else if(imageIndex == 2) return gold;

  else if(imageIndex == 3) return ultraViolet;

  else if(imageIndex == 4) return glossWhite;

  else if(imageIndex == 5) return black;

  else if(imageIndex == 6) return silver;

  else if(imageIndex == 7) return red;

  return 0
}

const videos = [
  {
    src: 'video/video1.mp4',
  },
  {
    src: 'video/video2.mp4',
  },
  {
    src: 'video/video3.mp4',
  },
  {
    src: 'video/video4.mp4',
  },
];

let products = {
  image: document.querySelector('.products-img') as HTMLImageElement,
  name: document.querySelector('.products-inner-mainblock-items_name') as HTMLAnchorElement,
  price: document.querySelector('.product-price') as HTMLAnchorElement
}
