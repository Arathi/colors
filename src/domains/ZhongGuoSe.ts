import Color from "./Color";

interface IZhongGuoSe {
  CMYK: number[];
  RGB: number[];
  hex: string;
  name: string;
  pinyin: string;
}

export default class ZhongGuoSe {
  CMYK: number[];
  RGB: number[];
  hex: string;
  name: string;
  pinyin: string;

  constructor(options: IZhongGuoSe) {
    this.CMYK = options.CMYK;
    this.RGB = options.RGB;
    this.hex = options.hex;
    this.name = options.name;
    this.pinyin = options.pinyin;
  }

  toColor(): Color {
    return new Color(
      this.RGB[0], 
      this.RGB[1], 
      this.RGB[2], 
      this.name
    );
  }
}