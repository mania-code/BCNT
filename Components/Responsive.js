import { Dimensions, PixelRatio } from 'react-native';


const { width, height } = Dimensions.get('window');
const actualWidth = PixelRatio.getPixelSizeForLayoutSize(width);

const ResWidth = (number) => {
  let passedWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * passedWidth) / 100);
}

const ResHeight = (number) => {
  let passedHeight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * passedHeight) / 100);
}

function xsfontSizer(actualWidth) {
  if (actualWidth > 800) {
    return 12;
  } else if (actualWidth > 360) {
    return 10;
  } else {
    return 8;
  }
}

function sfontSizer(actualWidth) {
  if (actualWidth > 800) {
    return 14;
  } else if (actualWidth > 360) {
    return 12;
  } else {
    return 10;
  }
}

function smfontSizer(actualWidth) {
  if (actualWidth > 800) {
    return 16;
  } else if (actualWidth > 360) {
    return 14;
  } else {
    return 12;
  }
}

function mfontSizer(actualWidth) {
  if (actualWidth > 800) {
    return 19;
  } else if (actualWidth > 360) {
    return 17;
  } else {
    return 14;
  }
}

function mlfontSizer(actualWidth) {
  if (actualWidth > 800) {
    return 22;
  } else if (actualWidth > 360) {
    return 19;
  } else {
    return 16;
  }
}

function lfontSizer(actualWidth) {
  if (actualWidth > 800) {
    return 25;
  } else if (actualWidth > 360) {
    return 22;
  } else {
    return 18;
  }
}

function xlfontSizer(actualWidth) {
  if (actualWidth > 800) {
    return 30;
  } else if (actualWidth > 360) {
    return 26;
  } else {
    return 22;
  }
}

const smallText = sfontSizer(actualWidth)
const midText = mfontSizer(actualWidth)
const largeText = lfontSizer(actualWidth)
const xsmallText = xsfontSizer(actualWidth)
const smText = smfontSizer(actualWidth)
const mlText = mlfontSizer(actualWidth)
const xlargeText = xlfontSizer(actualWidth)


export { ResHeight, ResWidth, sfontSizer, mfontSizer, lfontSizer, smallText, midText, largeText, xsmallText, smText, mlText, xlargeText };



/* Size Chart is as follows -

category      Small Device      LargeDevice

x-small         10                 12

small           12                 14

smbetween       14                 16

midum           17                 19

mlbetween       19                 22

large           22                 25

x-large         25                 28


*/
