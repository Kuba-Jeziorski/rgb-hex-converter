"use strict";

const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const hex = document.getElementById("hex");
const rgbH = document.getElementById("rgb-to-hex");
const hexR = document.getElementById("hex-to-rgb");
const rgbHC = document.getElementById("rgb-to-hex-color");
const hexRC = document.getElementById("hex-to-rgb-color");
const alpha = document.getElementById("alpha");
const hexRCopy = document.getElementById("hex-to-rgb-copy");
const rgbHCopy = document.getElementById("rgb-to-hex-copy");

const valueMap = new Map([
  [10, "A"],
  [11, "B"],
  [12, "C"],
  [13, "D"],
  [14, "E"],
  [15, "F"],
]);
const valueMap2 = new Map([
  ["A", 10],
  ["B", 11],
  ["C", 12],
  ["D", 13],
  ["E", 14],
  ["F", 15],
]);

const contentCopy = function (content) {
  navigator.clipboard.writeText(content);
};

document
  .getElementById("conversion-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let arrF = [];
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let whole = [];

    alpha.value =
      alpha.value < 1 && alpha.value >= 0.01 ? alpha.value * 100 : alpha.value;

    //// RGB -> HEX
    const converterRgbHex = function (color) {
      const value1 = Math.floor(color / 16);
      const value2 = (color / 16 - value1) * 16;

      let value1C = value1 < 10 ? value1.toString() : valueMap.get(value1);
      let value2C = value2 < 10 ? value2.toString() : valueMap.get(value2);

      arrF = [value1C, value2C];
      return arrF;
    };

    arr1 = converterRgbHex(red.value);
    arr2 = converterRgbHex(green.value);
    arr3 = converterRgbHex(blue.value);
    whole = [...arr1, ...arr2, ...arr3].join().replaceAll(",", "");
    rgbH.innerHTML =
      alpha.value === "" ? `#${whole}` : `#${whole}${alpha.value}`;

    //// HEX -> RGB
    const converterHexRgb = function (string) {
      string = string.includes("#") ? string.replaceAll("#", "") : string;

      string = string.toUpperCase();
      let array = string.split("");

      for (let i = 0; i < array.length; i++) {
        array[i] =
          array[i] < 10 ? array[i].toString() : valueMap2.get(array[i]);
        array[i] = Number(array[i]);
      }

      let hexR =
        (array[0] + array[1] / 16) * 16 > 255
          ? "too much"
          : (array[0] + array[1] / 16) * 16;
      let hexG =
        (array[2] + array[3] / 16) * 16 > 255
          ? "too much"
          : (array[2] + array[3] / 16) * 16;
      let hexB =
        (array[4] + array[5] / 16) * 16 > 255
          ? "too much"
          : (array[4] + array[5] / 16) * 16;

      let hexRGB = `${hexR}, ${hexG}, ${hexB}`;
      return hexRGB;
    };

    hexRCopy.addEventListener("click", function () {
      contentCopy(hexR.textContent);
    });
    rgbHCopy.addEventListener("click", function () {
      contentCopy(rgbH.textContent);
    });

    red.value === "" || green.value === "" || blue.value === ""
      ? (rgbH.style.display = "none")
      : (rgbH.style.display = "block");

    red.value === "" || green.value === "" || blue.value === ""
      ? (rgbHCopy.style.display = "none")
      : (rgbHCopy.style.display = "block");

    red.value === "" || green.value === "" || blue.value === ""
      ? (rgbHC.style.display = "none")
      : (rgbHC.style.display = "block");
    //
    hex.value === ""
      ? (hexR.style.display = "none")
      : (hexR.style.display = "block");

    hex.value === ""
      ? (hexRCopy.style.display = "none")
      : (hexRCopy.style.display = "block");

    hex.value === ""
      ? (hexRC.style.display = "none")
      : (hexRC.style.display = "block");

    hexR.innerHTML =
      alpha.value === ""
        ? `rgb(${converterHexRgb(hex.value)})`
        : `rgb(${converterHexRgb(hex.value)}, ${alpha.value})`;

    rgbHC.style.backgroundColor = `#${whole}`;
    hexRC.style.backgroundColor = hexR.innerHTML;
  });
