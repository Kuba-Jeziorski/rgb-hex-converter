"use strict";

(function(){
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
  const rgbMain = document.getElementById("rgb-main");
  const hexMain = document.getElementById("hex-main");
  const reset = document.getElementById("reset");
  
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
  
      // RGB -> HEX
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
  
      // HEX -> RGB
      const converterHexRgb = function (string) {
        string = string.includes("#") ? string.replaceAll("#", "") : string;
  
        string = string.toUpperCase();
        let array = string.split("");
  
        for (let i = 0; i < array.length; i++) {
          array[i] =
            array[i] < 10 ? array[i] : valueMap2.get(array[i]);
            array[i] = Number(array[i]);
        }
  
        console.log(array);
  
        let hexR = (array[0] + array[1] / 16) * 16;
        let hexG = (array[2] + array[3] / 16) * 16;
        let hexB = (array[4] + array[5] / 16) * 16;
  
        let hexRGB = `${hexR}, ${hexG}, ${hexB}`;
        return hexRGB;
      };
  
      // displaying value in proper format
      hexRCopy.addEventListener("click", function () {
        contentCopy(hexR.textContent);
      });
      rgbHCopy.addEventListener("click", function () {
        contentCopy(rgbH.textContent);
      });
  
      // if one of RGB inputs (r || g || b) or hex input is empty while converting, dont show its converted details
      red.value === "" || green.value === "" || blue.value === ""
        ? (rgbMain.style.display = "none")
        : (rgbMain.style.display = "block");
  
      hex.value === ""
        ? (hexMain.style.display = "none")
        : (hexMain.style.display = "block");
  
      // if both convertions are on
      if (rgbMain && hexMain) {
        hexMain.style.margin = "-2px 0 0 0";
      }
  
      // converting alpha value to hex
      const alphaChange = function (value) {
        const colorPercent = Math.round((value / 100) * 255);
        const firstValue = colorPercent / 16;
        const secondValue = (firstValue - Math.floor(firstValue)) * 16;
        let firstFin =
          Math.floor(firstValue) < 10
            ? Math.floor(firstValue).toString()
            : valueMap.get(Math.floor(firstValue));
        let secondFin =
          secondValue < 10 ? secondValue.toString() : valueMap.get(secondValue);
        const fin = `${firstFin}${secondFin}`;
        return fin;
      };
  
      // displaying alpha if defined
      rgbH.innerHTML =
        alpha.value === "" ? `#${whole}` : `#${whole}${alphaChange(alpha.value)}`;
  
      hexR.innerHTML =
        alpha.value === ""
          ? `rgb(${converterHexRgb(hex.value)})`
          : `rgba(${converterHexRgb(hex.value)}, ${alpha.value / 100})`;
  
      rgbHC.style.backgroundColor = rgbH.innerHTML;
      hexRC.style.backgroundColor = hexR.innerHTML;
    });
  
  reset.addEventListener("click", function () {
    red.value = "";
    green.value = "";
    blue.value = "";
    hex.value = "";
    alpha.value = "";
    rgbMain.style.display = "none";
    hexMain.style.display = "none";
  });
  
})();
