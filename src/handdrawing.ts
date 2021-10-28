import { InitPin } from './init';

const pinCountElement = document.getElementById('pinCount')! as HTMLInputElement;
const penColorElement = document.getElementById('pen-color')! as HTMLInputElement;
const bgColorElement = document.getElementById('bg-color')! as HTMLInputElement;
interface pinPosition {
    x: number;
    y: number;
    distance: number;
}

interface linePosition {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
// const linePosNow: linePosition = { startX: 0, startY: 0, endX: 0, endY: 0 };

document.addEventListener('DOMContentLoaded', () => {
    const point = { startX: 0, startY: 0, endX: 0, endY: 0 };
    let pinCount = 10;
    let penColor = '#000000';
    let bgColor = '#ffffff';
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const drawCanvas = new DrawCanvas();
    canvas.width = 500;
    drawCanvas.init(canvas);

    pinCountElement.addEventListener('change', () => {
        pinCount = Number(pinCountElement.value);
        if (isNaN(pinCount) || pinCount > 100 || pinCount < 1) {
            pinCount = 10;
            const pinMessage = document.getElementById('input-pin-message')! as HTMLInputElement;
            pinMessage.textContent = 'エラー:ピン数には1-100までの数字を入力してください';
        } else {
            const pinMessage = document.getElementById('input-pin-message')! as HTMLInputElement;
            pinMessage.textContent = '';
            drawCanvas.drawPin(pinCount);
        }
    });

    penColorElement.addEventListener('change', () => {
        penColor = penColorElement.value;
    });

    bgColorElement.addEventListener('change', () => {
        bgColor = bgColorElement.value;
    });

    canvas.addEventListener('pointerdown', (event) => {
        const rect = canvas.getBoundingClientRect();
        point.startX = event.clientX - rect.left;
        point.startY = event.clientY - rect.top;
    });
    canvas.addEventListener('pointerup', (event) => {
        const rect = canvas.getBoundingClientRect();
        point.endX = event.clientX - rect.left;
        point.endY = event.clientY - rect.top;
        const linePos = drawCanvas.pointCalibration(point);
        drawCanvas.drawLine(linePos, penColor);
    });
});

export class DrawCanvas {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private pin: number[][];

    public init(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPin(10);
    }

    public drawPin(pinCount: number): void {
        this.pin = InitPin(11, pinCount);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        for (const i of this.pin) {
            this.ctx.rect(i[0], i[1], 2, 2);
            this.ctx.fill();
        }
        this.ctx.closePath();
    }

    public getNearestPoint(posX: number, posY: number): pinPosition {
        const nearestPinPos: pinPosition = { x: 0, y: 0, distance: 10000000 };
        for (const pin of this.pin) {
            const dX = Math.abs(pin[0] - posX);
            const dY = Math.abs(pin[1] - posY);
            const distance = Math.pow(dX, 2) + Math.pow(dY, 2);
            if (nearestPinPos.distance > distance) {
                nearestPinPos.x = pin[0];
                nearestPinPos.y = pin[1];
                nearestPinPos.distance = distance;
            }
        }
        return nearestPinPos;
    }

    public pointCalibration(linePos: linePosition): linePosition {
        const resultPin: linePosition = { startX: 0, startY: 0, endX: 0, endY: 0 };
        const resultStartPin: pinPosition = this.getNearestPoint(linePos.startX, linePos.startY);
        resultPin.startX = resultStartPin.x;
        resultPin.startY = resultStartPin.y;

        const resultEndPin: pinPosition = this.getNearestPoint(linePos.endX, linePos.endY);
        resultPin.endX = resultEndPin.x;
        resultPin.endY = resultEndPin.y;
        return resultPin;
    }

    public drawLine(position: linePosition, penColor: string): void {
        this.ctx.beginPath();
        this.ctx.moveTo(position.startX, position.startY);
        this.ctx.lineTo(position.endX, position.endY);
        this.ctx.strokeStyle = penColor;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}
