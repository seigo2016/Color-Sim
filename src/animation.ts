import { InitPin } from './init';
import { StaticValue } from './static';

const animationStartElement = document.getElementById('animation-start')! as HTMLInputElement;
const animationResetElement = document.getElementById('animation-reset')! as HTMLInputElement;

const pinCountElement = document.getElementById('pinCount')! as HTMLInputElement;
const intervalElements = document.querySelectorAll('.interval')!;
const colorElements = document.querySelectorAll('.color')!;
const bgColorElement = document.getElementById('bg-color')! as HTMLInputElement;

document.addEventListener('DOMContentLoaded', () => {
    let pinCount = 48;
    let bgColor = '#000000';
    const interval: number[] = StaticValue.defaultInterval[11];
    const colorSet: string[] = Array(6).fill('#ffffff');
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = 500;
    const animation = new Animation();
    let isStopped = true;
    let isPause = false;

    pinCountElement.addEventListener('change', () => {
        pinCount = Number(pinCountElement.value);
        if (isNaN(pinCount) || pinCount > 300 || pinCount < 1) {
            pinCount = 10;
            const pinMessage = document.getElementById('input-pin-message')! as HTMLInputElement;
            pinMessage.textContent = 'エラー:ピン数には1-300までの数字を入力してください';
        } else {
            const pinMessage = document.getElementById('input-pin-message')! as HTMLInputElement;
            pinMessage.textContent = '';
        }
    });

    intervalElements.forEach((intervalElement, i) => {
        intervalElement.addEventListener('change', () => {
            const intervalInput = intervalElement as HTMLInputElement;
            interval[i] = Number(intervalInput.value);
            if (isNaN(interval[i]) || interval[i] > 300 || interval[i] < 0) {
                interval[i] = 1;
                const pinMessage = document.getElementById('input-interval-message')! as HTMLInputElement;
                pinMessage.textContent = 'エラー: 糸の間隔には0-300までの数字を入力してください';
            } else {
                const pinMessage = document.getElementById('input-interval-message')! as HTMLInputElement;
                pinMessage.textContent = '';
            }
        });
    });

    colorElements.forEach(function (colorElement: Element, i: number) {
        const colorInputElements = colorElement as HTMLInputElement;
        colorInputElements.addEventListener('change', () => {
            colorSet[i] = colorInputElements.value;
        });
    });

    bgColorElement.addEventListener('change', () => {
        bgColor = bgColorElement.value;
    });

    animation.init(canvas);
    animationStartElement.addEventListener('click', () => {
        if (isStopped) {
            animation.drawPin(11, pinCount);
            animation.start();
            animation.render(interval, colorSet, bgColor);
            isStopped = false;
            isPause = false;
            animationStartElement.value = 'Pause';
        } else if (!isPause) {
            animation.pause();
            isPause = true;
            animationStartElement.value = 'Start';
        } else if (isPause) {
            animation.start();
            isPause = false;
            animationStartElement.value = 'Pause';
        }
    });
    animationResetElement.addEventListener('click', () => {
        if (!isStopped) {
            isPause = true;
            isStopped = true;
            animationStartElement.value = 'Start';
            animation.reset();
        }
    });
});

export class Animation {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private pin: number[][];
    private isPause = false;
    private isReseted = false;

    public init(canvas: HTMLCanvasElement): void {
        if (!canvas.getContext) {
            console.log('error');
            return;
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

    public async render(interval: number[], colorSet: string[], bgColor: string): Promise<void> {
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        colorSet = colorSet.slice(0, 6).reverse();
        renderAnimation: for (let i = 0; i < interval.length; i++) {
            this.ctx.strokeStyle = colorSet[i];
            let n = 0;
            for (let j = 0; j < this.pin.length; j++) {
                while (this.isPause && !this.isReseted) {
                    await this.sleep(500);
                    console.log('fdsa');
                }
                if (this.isReseted) {
                    break renderAnimation;
                }
                const d = interval[i];
                this.ctx.beginPath();
                this.ctx.moveTo(this.pin[n][0], this.pin[n][1]);
                this.ctx.lineTo(this.pin[(n + d) % this.pin.length][0], this.pin[(n + d) % this.pin.length][1]);
                this.ctx.stroke();
                this.ctx.closePath();
                n = (n + d) % this.pin.length;
                await this.sleep(100);
            }
        }
    }
    public pause(): void {
        this.isPause = true;
    }
    public start(): void {
        this.isPause = false;
        this.isReseted = false;
    }
    public reset(): void {
        this.isReseted = true;
        this.isPause = true;
        this.init(this.canvas);
    }

    private sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
}
