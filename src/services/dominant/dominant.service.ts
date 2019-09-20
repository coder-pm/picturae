import * as colorConvert from "color-convert";
import * as sharp from "sharp";

/**
 * DominantService - service used to compute dominant color of image.
 */
export default class DominantService {
    /**
     * Compute dominant color of image.
     *
     * @param image - image body
     * @return Promise<string> - color as hex
     */
    public async color(image: Buffer): Promise<string> {
        const pixels: { [p: string]: number } = await this.extractPixelOccurrence(image);
        const ordered = await this.orderByOccurrence(pixels);
        const topPixel: number[] = ordered[0][0].split("|").map((c) => +c);
        return `#${colorConvert.rgb.hex([topPixel[0], topPixel[1], topPixel[2]])}`;
    }

    /**
     * Extract pixels from image body and count occurrence of each one.
     *
     * @param image - image body
     * @return Promise<{ [p: string]: number }> - pixels with occurrence count
     */
    protected async extractPixelOccurrence(image: Buffer): Promise<{ [p: string]: number }> {
        const pixels: { [p: string]: number } = {};
        const data: Buffer = await sharp(image).raw().toBuffer();
        for (let i = 0; i < data.length; i += 3) {
            const rgbKey = `${data.readUInt8(i)}|${data.readUInt8(i + 1)}|${data.readUInt8(i + 2)}`;
            pixels[rgbKey] = ++pixels[rgbKey] || 1;
        }
        return pixels;
    }

    /**
     * Order pixels by occurrence count (from most to the least popular)
     *
     * @param pixels - extracted pixels
     * @return Promise<Array<[string, number]>> - pixels sorted by occurrence count
     */
    protected async orderByOccurrence(pixels: { [p: string]: number }): Promise<Array<[string, number]>> {
        const ordered = Object.entries(pixels);
        ordered.sort((a: [string, number], b: [string, number]) => {
            return b[1] - a[1];
        });
        return ordered;
    }
}
