const PatternColorHex = /#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/;

export default class Color {
  r: number;
  g: number;
  b: number;
  name?: string;

  constructor(r: number, g: number, b: number, name?: string) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }

  get hex(): string {
    let r = this.r.toString(16);
    if (r.length < 2) r = "0" + r;
    
    let g = this.g.toString(16);
    if (g.length < 2) g = "0" + g;
    
    let b = this.b.toString(16);
    if (b.length < 2) b = "0" + b;

    return `#${r}${g}${b}`;
  }

  get reverse(): Color {
    return new Color(
      255-this.r,
      255-this.g,
      255-this.b,
    );
  }

  delta(other: Color): number {
    return this.deltaValue(other.r, other.g, other.b);
  }

  deltaValue(r: number, g: number, b: number): number {
    const dr = this.r - r;
    const dg = this.g - g;
    const db = this.b - b;
    return Math.sqrt(dr*dr + dg*dg + db*db);
  }

  // similarityRate(other: Color): number {
  //   const total = 195075;
  //   const similarity = total - this.deltaValue(other.r, other.g, other.b); 
  //   return similarity * 1.0 / total;
  // }

  // similarityRateValue(r: number, g: number, b: number): number {
  //   const total = 195075;
  //   const similarity = total - this.deltaValue(r, g, b);
  //   return similarity * 1.0 / total;
  // }

  static fromHex(hex: string, name?: string): Color | null {
    let r = 0;
    let g = 0;
    let b = 0;

    const matcher = PatternColorHex.exec(hex);
    if (matcher == null) return null;
    
    r = parseInt(matcher[1], 16);
    g = parseInt(matcher[2], 16);
    b = parseInt(matcher[3], 16);

    return new Color(r, g, b, name);
  }
}