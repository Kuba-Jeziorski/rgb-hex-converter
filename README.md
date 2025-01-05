# rgb-hex-converter

## Simple Converter: HEX to RGB and the Other Way Around

### Stack:
- HTML
- CSS
- JS

### How to Open?
1. Double-click on the `index.html` file.
2. Open Live Server via Visual Studio Code (VSC).

## How Does It Work?
- **RGB to HEX Conversion:**
  - All three color inputs must be filled with numeric values ranging from 0 to 255.
- **HEX to RGB Conversion:**
  - The HEX input must be filled with a valid hex-type value. Both 3-character (e.g., `123`, `abc`, `ABC`) and 6-character (e.g., `112233`, `aabbcc`, `AABBCC`) values are accepted. These values may optionally be preceded by a `#` symbol.
- **Alpha Input:**
  - The alpha input accepts values from `0.01` to `1`.
  - If the provided value is below `1`, it is multiplied by 100.
  - If the provided value is between `1` and `100`, it remains unchanged.
- Both the RGB and HEX fields can be filled simultaneously.
- **Conversion Button:**
  - Displays the converted values (RGB → HEX or HEX → RGB).
- **Copy Button:**
  - Copies the RGB or HEX value to the clipboard.
- **Reset Button:**
  - Clears all input fields.
