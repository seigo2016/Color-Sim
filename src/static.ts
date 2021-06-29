export namespace StaticValue {
    export const defaultPin: number[] = Array(12);
    defaultPin[0] = 48;
    defaultPin[1] = 64;
    defaultPin[2] = 77;
    defaultPin[3] = 88;
    defaultPin[4] = 108;
    defaultPin[11] = 48;
    export const defaultInterval: number[][] = Array(12);
    defaultInterval[0] = [23, 19, 17, 13, 11, 7];
    (defaultInterval[1] = [31, 29, 23, 19, 17, 13, 11, 7]), // 円 64
        (defaultInterval[2] = [37, 31, 29, 23, 19, 17]), // 円 77
        (defaultInterval[3] = [43, 41, 37, 31, 29, 23]), // 円 88
        (defaultInterval[4] = [53, 47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 11]), // 円 108
        (defaultInterval[5] = [31, 29, 23, 19, 17, 13]), // 正方形
        (defaultInterval[6] = [37, 31, 29, 23, 19, 17]), // 正五角形
        (defaultInterval[7] = [31, 29, 23, 19, 17, 13]), // 正六角形
        (defaultInterval[8] = [28, 28, 28]), // つぼみ
        (defaultInterval[9] = [16, 16, 16, 16]), // 麻の葉
        (defaultInterval[10] = [16, 16, 16]), // 六芒星
        (defaultInterval[11] = [31, 29, 23, 19, 17, 13]); // カスタム円
    export const colorNum: number[] = [6, 8, 6, 6, 12, 6, 6, 6, 3, 2, 3, 6];

    export namespace Shape {
        export const Circle = 4;
        export const Square = 5;
        export const Pentagon = 6;
        export const Hexagon = 7;
        export const Bud = 8;
        export const HempLeaf = 9;
        export const Hexagram = 10;
        export const Custom = 11;
    }
}
