import { StaticValue } from './static';
import { InitPin } from './init';

export class Itokake {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private pin: number[][];

    public init(canvas: HTMLCanvasElement): void {
        if (!canvas.getContext) {
            console.log('error');
            return;
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
    }

    public drawPin(shape: number, pinCount: number): void {
        this.pin = InitPin(shape, pinCount);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        for (const i of this.pin) {
            this.ctx.rect(i[0], i[1], 2, 2);
            this.ctx.fill();
        }
        this.ctx.closePath();
    }

    public drawLine(shape: number, interval: number[], colorSet: string[], bgColor: string): void {
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (shape == StaticValue.Shape.Bud) {
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 3; j++) {
                    for (let k = 0; k < 27; k++) {
                        this.ctx.strokeStyle = colorSet[j];
                        const d = interval[j];
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.pin[81 * i + 27 * j + k][0], this.pin[81 * i + 27 * j + k][1]);
                        const nextPin = (27 * j + k + d) % 81;
                        this.ctx.lineTo(this.pin[81 * i + nextPin][0], this.pin[81 * i + nextPin][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }
        } else if (shape == StaticValue.Shape.Hexagram) {
            for (let i = 0; i < 12; i++) {
                for (let j = 0; j < 3; j++) {
                    for (let k = 0; k < 16; k++) {
                        this.ctx.strokeStyle = colorSet[j];
                        const d = interval[j];
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.pin[48 * i + j * 16 + k][0], this.pin[48 * i + j * 16 + k][1]);
                        const nextPin = (j * 16 + k + d) % 48;
                        this.ctx.lineTo(this.pin[48 * i + nextPin][0], this.pin[48 * i + nextPin][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }
        } else if (shape == StaticValue.Shape.HempLeaf) {
            const drawOrder: number[] = [1, 3, 0, 2];
            for (let i = 0; i < 6; i++) {
                for (const j of drawOrder) {
                    for (let k = 0; k < 16; k++) {
                        this.ctx.strokeStyle = colorSet[j % 2];
                        const d = interval[j];
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.pin[64 * i + j * 16 + k][0], this.pin[64 * i + j * 16 + k][1]);
                        const nextPin = (j * 16 + k + d) % 64;
                        this.ctx.lineTo(this.pin[64 * i + nextPin][0], this.pin[64 * i + nextPin][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }
        } else if (shape == StaticValue.Shape.Custom) {
            for (let i = 0; i < interval.length; i++) {
                this.ctx.strokeStyle = colorSet.reverse()[i];
                let n = 0;
                for (let j = 0; j < this.pin.length; j++) {
                    const d = interval[i];
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.pin[n][0], this.pin[n][1]);
                    this.ctx.lineTo(this.pin[(n + d) % this.pin.length][0], this.pin[(n + d) % this.pin.length][1]);
                    this.ctx.stroke();
                    this.ctx.closePath();
                    n = (n + d) % this.pin.length;
                }
            }
        } else {
            for (const i in interval) {
                this.ctx.strokeStyle = colorSet[i];
                let n = 0;
                for (let j = 0; j < this.pin.length; j++) {
                    const d = interval[i];
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.pin[n][0], this.pin[n][1]);
                    this.ctx.lineTo(this.pin[(n + d) % this.pin.length][0], this.pin[(n + d) % this.pin.length][1]);
                    this.ctx.stroke();
                    this.ctx.closePath();
                    n = (n + d) % this.pin.length;
                }
            }
        }
    }
}
