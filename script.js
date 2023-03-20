"use strict";

(function () {
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

  // change valueMap and valueMap2 to valueObject
  const valueObject = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };

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

  const contentClear = function () {
    red.value = "";
    green.value = "";
    blue.value = "";
    hex.value = "";
    alpha.value = "";
    rgbMain.style.display = "none";
    hexMain.style.display = "none";
  };

  document
    .getElementById("conversion-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let arrHexSingle = [];
      let arrRed = [];
      let arrGreen = [];
      let arrBlue = [];
      let whole = [];
      let properAlpha = alpha.value <= 1 && alpha.value >= 0.01;

      alpha.value = properAlpha ? alpha.value * 100 : alpha.value;

      // RGB -> HEX
      const converterRgbHex = function (color) {
        const value1 = Math.floor(color / 16);

        const value2 = (color / 16 - value1) * 16;

        let value1C = value1 < 10 ? value1.toString() : valueMap.get(value1);
        let value2C = value2 < 10 ? value2.toString() : valueMap.get(value2);

        arrHexSingle = [value1C, value2C];
        return arrHexSingle;
      };

      arrRed = converterRgbHex(red.value);
      arrGreen = converterRgbHex(green.value);
      arrBlue = converterRgbHex(blue.value);
      whole = [...arrRed, ...arrGreen, ...arrBlue].join().replaceAll(",", "");

      // HEX -> RGB
      const converterHexRgb = function (hexInput) {
        hexInput = hexInput.includes("#")
          ? hexInput.replaceAll("#", "")
          : hexInput;

        hexInput = hexInput.toUpperCase();
        let splitedValue = hexInput.split("");

        // 3-characters (or # + 3 characters) hexcode input
        if (hexInput.length === 3) {
          let splitedValueShort;
          splitedValueShort = splitedValue.flatMap((i) => [i, i]);
          splitedValue = splitedValueShort;
        }

        for (let i = 0; i < splitedValue.length; i++) {
          splitedValue[i] =
            splitedValue[i] < 10
              ? splitedValue[i]
              : valueMap2.get(splitedValue[i]);
          splitedValue[i] = Number(splitedValue[i]);
        }

        let hexR = (splitedValue[0] + splitedValue[1] / 16) * 16;
        let hexG = (splitedValue[2] + splitedValue[3] / 16) * 16;
        let hexB = (splitedValue[4] + splitedValue[5] / 16) * 16;

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
        alpha.value === ""
          ? `#${whole}`
          : `#${whole}${alphaChange(alpha.value)}`;

      hexR.innerHTML =
        alpha.value === ""
          ? `rgb(${converterHexRgb(hex.value)})`
          : `rgba(${converterHexRgb(hex.value)}, ${alpha.value / 100})`;

      rgbHC.style.backgroundColor = rgbH.innerHTML;
      hexRC.style.backgroundColor = hexR.innerHTML;
    });

  reset.addEventListener("click", contentClear);
})();
