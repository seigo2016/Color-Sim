import {StaticValue} from "./static";



export class Itokake {
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private canvas: HTMLCanvasElement;
    private pin: number[][];
    private deg2rad(degree:number):number{
        let radian: number = degree * (Math.PI / 180)
        return radian
    }

    public initPin(shape:number, pinCount:number):number[][] {
        const Shape = StaticValue.Shape;
        const defaultPin: number[][] = [];
        if (shape <= Shape.Circle || shape == Shape.Custom){
            const pin: number[][] = [];
            for (let i=0; i<pinCount; i++){
                let degree = 360 / pinCount
                let x: number = 250 + 250 * Math.cos(this.deg2rad(degree) * i)
                let y: number =250 + 250 * Math.sin(this.deg2rad(degree) * i)
                pin.push([x, y])
            }
            return pin
        }else if(shape == Shape.Square){
            const pin: number[][] = [];
            for(let i=0; i<16; i++){
                pin.push([10 + 30 * i, 10]);
            }
            for(let i=0; i<16; i++){
                pin.push([490, 10 + 30 * i]);
            }
            for(let i=0; i<16; i++){
                pin.push([490 - 30 * i, 490]);
            }
            for(let i=0; i<16; i++){
                pin.push([10, 490 - 30 * i]);
            }
            return pin
        }else if(shape == Shape.Pentagon){
            let pin:number[][] = new Array(80);
            for(let i=0; i<5; i++){
                let degree = 72 * i - 18;
                pin[i * 16] = [250 + 250 * Math.cos(this.deg2rad(degree)), 270 + 250 * Math.sin(this.deg2rad(degree))]
            }
            for(let i=0; i<80; i++){
                if(!pin[i]){
                    if(i<64){
                        let x: number = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][0] + i % 16 * pin[(Math.floor(i / 16) + 1) * 16][0]) / 16;
                        let y: number = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][1] + i % 16 * pin[(Math.floor(i / 16) + 1) * 16][1]) / 16;
                        pin[i] = [x, y];
                    }
                    else{
                        let x: number = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][0] + i % 16 * pin[0][0]) / 16;
                        let y: number = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][1] + i % 16 * pin[0][1]) / 16;
                        pin[i] = [x, y]
                    }
                }
            }
            return pin
        }else if(shape == Shape.Hexagon){
            let pin:number[][] = new Array(72);
            for(let i=0; i<6; i++){
                let degree = 60 * i;
                pin[i * 12] = [250 + 250 * Math.cos(this.deg2rad(degree)), 270 + 250 * Math.sin(this.deg2rad(degree))]
            }
            for(let i=0; i<72; i++){
                if(!pin[i]){
                    if(i<60){
                        let x: number = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][0] + i % 12 * pin[(Math.floor(i / 12) + 1) * 12][0]) / 12;
                        let y: number = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][1] + i % 12 * pin[(Math.floor(i / 12) + 1) * 12][1]) / 12;
                        pin[i] = [x, y];
                    }
                    else{
                        let x: number = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][0] + i % 12 * pin[0][0]) / 12;
                        let y: number = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][1] + i % 12 * pin[0][1]) / 12;
                        pin[i] = [x, y]
                    }
                }
            }
            return pin  
        }
        else if(shape == Shape.Bud){
            let pin:number[][] = new Array(81*6);
            for (let i=0; i<6*81; i++){
                pin[i] = [0, 0]
            }
            for(let i=0; i<6; i++){
                pin[i*81] = [250 + 250 * Math.cos(this.deg2rad(60 * i)), 250 + 250 * Math.sin(this.deg2rad(60 * i))]
                pin[i*81+27] = [250 + 250 * Math.cos(this.deg2rad(60 * i + 60)), 250 + 250 * Math.sin(this.deg2rad(60 * i + 60))]
                pin[i*81+54] = [250, 250]
                for(let j=0;j<81;j++){
                    if (j==27 || j==54 || j==0){
                        continue
                    }
                    let x=0, y=0;
                    if(j<27){
                        x = ((27-j)*pin[i*81][0] + j*pin[i*81+27][0])/27
                        y = ((27-j)*pin[i*81][1] + j*pin[i*81+27][1])/27
                    }else if(j<54){
                        x = ((54-j)*pin[i*81+27][0] + (j-27)*pin[i*81+54][0])/27
                        y = ((54-j)*pin[i*81+27][1] + (j-27)*pin[i*81+54][1])/27
                    }else if(j<81){
                        x = ((81-j)*pin[i*81+54][0] + (j-54)*pin[i*81][0])/27
                        y = ((81-j)*pin[i*81+54][1] + (j-54)*pin[i*81][1])/27
                    }
                    pin[i*81 + j] = [x, y]
                }
            }
            return pin;
        }else if(shape == Shape.Hexagram){
            let pin:number[][] = new Array(16*3*12);
            const vertex:number[][][] = [
                [[250, 0], [180, 125], [320, 125]],
                [[40, 125], [180, 125], [110, 250]],
                [[180, 125], [250, 250], [110, 250]],
                [[320, 125], [250, 250], [180, 125]],
                [[320, 125], [250, 250], [390, 250]],
                [[460, 125], [320, 125], [390, 250]],
                [[40, 375], [110, 250], [180, 375]],
                [[110, 250], [250, 250], [180, 375]],
                [[180, 375], [250, 250], [320, 375]],
                [[390, 250], [250, 250], [320, 375]],
                [[460, 375], [390, 250], [320, 375]],
                [[250, 500], [320, 375], [180, 375]]
            ];
            for(let i=0; i<12; i++){
                for(let j=0; j<3; j++){
                    for(let k=0; k<16; k++){
                        let x=0, y=0;
                        x = ((k)*vertex[i][j][0] + (16-k)*vertex[i][(j+1)%3][0])/16
                        y = ((k)*vertex[i][j][1] + (16-k)*vertex[i][(j+1)%3][1])/16
                        pin[48*i+j*16+k] = [x, y]
                    }
                }
            }
            return pin
        }else if(shape == Shape.HempLeaf){
            let pin:number[][] = new Array(16*4*6);
            const vertex:number[][][] = new Array(6);
            for(let i=0; i<6; i++){
                vertex[i] = new Array(4)
                vertex[i][0] = [250 + 250 * Math.cos(this.deg2rad(60*i+30)), 250 + 250 * Math.sin(this.deg2rad(60*i+30))]
                vertex[i][1] = [250 + 144 * Math.cos(this.deg2rad(60*i)), 250 + 144 * Math.sin(this.deg2rad(60*i))]
                vertex[i][2] = [250, 250]
                vertex[i][3] = [250 + 144 * Math.cos(this.deg2rad(60*i+60)), 250 + 144 * Math.sin(this.deg2rad(60*i+60))]
            }

            for(let i=0; i<6; i++){
                for(let j=0; j<4; j++){
                    for(let k=0; k<16; k++){
                        let x=0, y=0;
                        x = ((k)*vertex[i][j][0] + (16-k)*vertex[i][(j+1)%4][0])/16
                        y = ((k)*vertex[i][j][1] + (16-k)*vertex[i][(j+1)%4][1])/16
                        pin[64*i+j*16+k] = [x, y]
                    }
                }
            }

            return pin
        }
        return defaultPin
    }

    public init(canvas:HTMLCanvasElement, width:number){
        if(!canvas.getContext){
            console.log("error");
            return
        }
        this.width = width;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
    }

    public drawPin(shape: number, pinCount:number){
        this.pin = this.initPin(shape, pinCount);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        for(let i of this.pin){
            this.ctx.rect(i[0], i[1], 2, 2);
            this.ctx.fill();
        }
       this.ctx.closePath();
    }

    public drawLine(shape:number, pinCount:number, interval: number[], colorSet:string[], bgColor:string){
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if(shape==StaticValue.Shape.Bud){
            for (let i=0; i<6; i++){
                for(let j=0; j<3; j++){
                    for(let k=0; k<27; k++){
                        this.ctx.strokeStyle = colorSet[j];
                        let d = interval[j]
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.pin[81*i+27*j+k][0], this.pin[81*i+27*j+k][1]);
                        let nextPin = (27*j+k+d)%81
                        this.ctx.lineTo(this.pin[81*i+nextPin][0], this.pin[81*i+nextPin][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }  
        }
        else if(shape==StaticValue.Shape.Hexagram){
            for(let i=0; i<12; i++){
                for(let j=0; j<3; j++){
                    for(let k=0; k<16; k++){
                        this.ctx.strokeStyle = colorSet[j];
                        let d = interval[j]
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.pin[48*i+j*16+k][0], this.pin[48*i+j*16+k][1]);
                        let nextPin = (j*16+k+d)%48
                        this.ctx.lineTo(this.pin[48*i+nextPin][0], this.pin[48*i+nextPin][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }
        }
        else if(shape==StaticValue.Shape.HempLeaf){
            const drawOrder:number[] = [1, 3, 0, 2] 
            for(let i=0; i<6; i++){
                for(let j of drawOrder){
                    for(let k=0; k<16; k++){
                        this.ctx.strokeStyle = colorSet[j%2];
                        let d = interval[j]
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.pin[64*i+j*16+k][0], this.pin[64*i+j*16+k][1]);
                        let nextPin = (j*16+k+d)%64
                        this.ctx.lineTo(this.pin[64*i+nextPin][0], this.pin[64*i+nextPin][1]);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }
        }
        else{
            for (let i=0; i<interval.length; i++){
                this.ctx.strokeStyle = colorSet[i];
                for(let j=0; j<this.pin.length; j++){
                    let d = interval[i]
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.pin[j][0], this.pin[j][1]);
                    this.ctx.lineTo(this.pin[(j+d)%this.pin.length][0], this.pin[(j+d)%this.pin.length][1]);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        }
    }
}

