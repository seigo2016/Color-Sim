import { Itokake } from './draw';
import { StaticValue } from './static';

const shapeElement = document.getElementById('shape')! as HTMLInputElement;
const pinCountElement = document.getElementById('pinCount')! as HTMLInputElement;
const intervalElements = document.querySelectorAll('.interval')!;
const colorElements = document.querySelectorAll('.color')!;
const bgColorElement = document.getElementById('bg-color')! as HTMLInputElement;

let pinCount = 48;
let draw: Itokake;
let shapeNumber = 0;
let bgColor = '#000000';
let interval: number[];
let canvas: HTMLCanvasElement;
const colorSet: string[] = Array(12).fill('#ffffff');

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = 500;
    draw = new Itokake();
    draw.init(canvas);
    interval = StaticValue.defaultInterval[0];
    drawAll();
});

function drawAll() {
    draw.drawPin(shapeNumber, pinCount);
    draw.drawLine(shapeNumber, interval, colorSet, bgColor);
    setColSize(shapeNumber);
}

// 形状変更
shapeElement.addEventListener('change', () => {
    shapeNumber = Number(shapeElement.value);
    pinCount = StaticValue.defaultPin[shapeNumber];
    if (shapeNumber == StaticValue.Shape.Custom) {
        pinCountElement.value = String(StaticValue.defaultPin[shapeNumber]);
        StaticValue.defaultInterval[shapeNumber].forEach((interval, i) => {
            const intervalElement = intervalElements[i] as HTMLInputElement;
            intervalElement.value = String(interval);
        });
    }
    interval = StaticValue.defaultInterval[shapeNumber];
    drawAll();
});

// ピン数変更(カスタム円のみ)
pinCountElement.addEventListener('change', () => {
    pinCount = Number(pinCountElement.value);
});

// 糸の間隔(カスタム円のみ)
intervalElements.forEach((intervalElement, i) => {
    intervalElement.addEventListener('change', () => {
        const intervalInput = intervalElement as HTMLInputElement;
        interval[i] = Number(intervalInput.value);
        drawAll();
    });
});

colorElements.forEach(function (colorElement: Element, i: number) {
    const colorInputElements = colorElement as HTMLInputElement;
    colorInputElements.addEventListener('change', () => {
        colorSet[i] = colorInputElements.value;
        drawAll();
    });
});

bgColorElement.addEventListener('change', () => {
    bgColor = bgColorElement.value;
    drawAll();
});

function setColSize(shape: number): void {
    const x = StaticValue.colorNum[shape];
    for (let i = 1; i <= 12; i++) {
        if (i > x) {
            const colorPicker: HTMLElement = document.getElementById('color' + String(i))!.parentNode! as HTMLElement;
            colorPicker.style.display = 'none';
        } else {
            const colorPicker: HTMLElement = document.getElementById('color' + String(i))!.parentNode! as HTMLElement;
            colorPicker.style.display = 'flex';
        }
    }
    if (shape == 11) {
        document.getElementById('custompin')!.style.display = 'block';
    } else {
        document.getElementById('custompin')!.style.display = 'none';
    }
}
