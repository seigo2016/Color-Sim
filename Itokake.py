#!/usr/bin/env python
# -*- coding: utf-8 -*-
from math import sin, cos
from PIL import Image, ImageDraw
import time
from flask import Flask, render_template, request, send_from_directory
import io
import base64
import os
app = Flask(__name__)
sixtri = [
    [(250, 0), (180, 125), (320, 125)],
    [(40, 125), (180, 125), (110, 250)],
    [(180, 125), (250, 250), (110, 250)],
    [(320, 125), (250, 250), (180, 125)],
    [(320, 125), (250, 250), (390, 250)],
    [(460, 125), (320, 125), (390, 250)],
    [(40, 375), (110, 250), (180, 375)],
    [(110, 250), (250, 250), (180, 375)],
    [(180, 375), (250, 250), (320, 375)],
    [(390, 250), (250, 250), (320, 375)],
    [(460, 375), (390, 250), (320, 375)],
    [(250, 500), (320, 375), (180, 375)]]
colornum = [(255, 255, 255), (255, 255, 255), (255, 255, 255),
            (255, 255, 255), (255, 255, 255), (255, 255, 255)]
pin = [48, 64, 77, 88, 108]
primary = [
    [
        23, 19, 17, 13, 11, 7], [
            31, 29, 23, 19, 17, 13], [
                37, 31, 29, 23, 19, 17], [
                    43, 41, 37, 31, 29, 23], [
                        53, 47, 43, 41, 37, 31], [
                            31, 29, 23, 19, 17, 13], [
                                37, 31, 29, 23, 19, 17], [
                                    31, 29, 23, 19, 17, 13]]
colornumhex = [
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff"]
img = None
im = Image.new('RGB', (500, 500), (0, 0, 0))
draw = ImageDraw.Draw(im)
square = []
pentagon = [(0, 0)] * 80
hexagon = [(0, 0)] * 72
circle = [[], [], [], [], []]
tri = [[(0, 0) for i in range(84)]for i in range(6)]
radio = [None, None, None, None, None, None, None, None, None, None, None]
hempin = [(0, 0) for i in range(6)]
hempout = [(0, 0) for i in range(6)]
hemp = [[(0, 0) for i in range(16)]for i in range(18)]
sixstar = [[[(0, 0) for i in range(16)]for i in range(3)]for i in range(12)]
var = None


# 16進数からRGB変換
def hex_to_rgb(hextmp):
    if hextmp is not None:
        hextmp = hextmp.replace("#", "")
        return (int(hextmp[:2], 16), int(hextmp[2:4], 16), int(hextmp[4:], 16))


def rgb_to_hex(rgbtmp):
    if rgbtmp is not None:
        return r"#%02X%02X%02X" % (rgbtmp[0], rgbtmp[1], rgbtmp[2])


# 度数法toラジアン
def deg_to_rad(degree):
    rad = degree * (3.14159265 / 180)
    return rad


# 点初期化
# 蕾
for x in range(6):
    tri[x][0] = (250 + 250 * cos(deg_to_rad(60 * x)),
                 250 + 250 * sin(deg_to_rad(60 * x)))
    tri[x][28] = (250 + 250 * cos(deg_to_rad(60 * x + 60)),
                  250 + 250 * sin(deg_to_rad(60 * x + 60)))
    tri[x][56] = (250, 250)
    tri[x][83] = (250 + 250 * cos(deg_to_rad(60 * x)),
                  250 + 250 * sin(deg_to_rad(60 * x)))
for x in range(6):
    for y in range(28):
        if tri[x][y] == (0, 0):
            xp = ((28 - y) * tri[x][0][0] + y * tri[x][28][0]) / 28
            yp = ((28 - y) * tri[x][0][1] + y * tri[x][28][1]) / 28
            tri[x][y] = (xp, yp)
    for y in range(28, 56):
        if tri[x][y] == (0, 0):
            xp = ((28 - y) % 28 * tri[x][28][0] + y % 28 * tri[x][56][0]) / 28
            yp = ((28 - y) % 28 * tri[x][28][1] + y % 28 * tri[x][56][1]) / 28
            tri[x][y] = (xp, yp)
    for y in range(56, 84):
        if tri[x][y] == (0, 0):
            xp = ((28 - y) % 28 * tri[x][56][0] + y % 28 * tri[(x)][0][0]) / 28
            yp = ((28 - y) % 28 * tri[x][56][1] + y % 28 * tri[(x)][0][1]) / 28
            tri[x][y] = (xp, yp)
# 四角形
for y in range(16):
    square.append((10 + 30 * y, 10))
for y in range(16):
    square.append((490, 10 + 30 * y))
for y in range(16):
    square.append((490 - 30 * y, 490))
for y in range(16):
    square.append((10, 490 - 30 * y))
# 円
for y in range(5):
    for x in range(pin[y]):
        circle[y].append((250 + 250 * cos(deg_to_rad(360 / pin[y]) * x),
                          250 + 250 * sin(deg_to_rad(360 / pin[y]) * x)))
# 六角形
for x in range(6):
    hexagon[x * 12] = (250 + 250 * cos(deg_to_rad(60 * x)),
                       250 + 250 * sin(deg_to_rad(60 * x)))
for x in range(72):
    if hexagon[x][0] == 0 and hexagon[x][1] == 0:
        if x < 60:
            xp = ((12 - x % 12) * hexagon[x // 12 * 12][0] + x %
                  12 * hexagon[(x // 12 + 1) * 12][0]) / 12
            yp = ((12 - x % 12) * hexagon[x // 12 * 12][1] + x %
                  12 * hexagon[(x // 12 + 1) * 12][1]) / 12
            hexagon[x] = (xp, yp)
        else:
            xp = ((12 - x % 12) * hexagon[x // 12 * 12]
                  [0] + x % 12 * hexagon[0][0]) / 12
            yp = ((12 - x % 12) * hexagon[x // 12 * 12]
                  [1] + x % 12 * hexagon[0][1]) / 12
            hexagon[x] = (xp, yp)
# 五角形
for x in range(5):
    pentagon[x * 16] = (250 + 250 * cos(deg_to_rad(72 * x - 18)),
                        270 + 250 * sin(deg_to_rad(72 * x - 18)))
for x in range(80):
    if pentagon[x][0] == 0 and pentagon[x][1] == 0:
        if x < 64:
            xp = ((16 - x % 16) * pentagon[x // 16 * 16][0] + x %
                  16 * pentagon[(x // 16 + 1) * 16][0]) / 16
            yp = ((16 - x % 16) * pentagon[x // 16 * 16][1] + x %
                  16 * pentagon[(x // 16 + 1) * 16][1]) / 16
            pentagon[x] = (xp, yp)
        else:
            xp = ((16 - x % 16) * pentagon[x // 16 * 16]
                  [0] + x % 16 * pentagon[0][0]) / 16
            yp = ((16 - x % 16) * pentagon[x // 16 * 16]
                  [1] + x % 16 * pentagon[0][1]) / 16
            pentagon[x] = (xp, yp)
# 麻の葉
for x in range(6):
    hempout[x] = (250 + 250 * cos(deg_to_rad(60 * x + 30)),
                  250 + 250 * sin(deg_to_rad(60 * x + 30)))
for x in range(6):
    hempin[x] = ((hempout[x][0] + hempout[(x + 1) % 6][0] + 250) / 3,
                 (hempout[x][1] + hempout[(x + 1) % 6][1] + 250) / 3)
for x in range(18):
    for y in range(16):
        if x % 3 == 0:
            xp = ((16 - y) * hempin[x // 3][0] + y * hempout[x // 3][0]) / 16
            yp = ((16 - y) * hempin[x // 3][1] + y * hempout[x // 3][1]) / 16
            hemp[x][y] = (xp, yp)
            xp = (y * hempin[x // 3][0] + (16 - y) * hempout[x // 3][0]) / 16
            yp = (y * hempin[x // 3][1] + (16 - y) * hempout[x // 3][1]) / 16
            hemp[x][y] = (xp, yp)
        elif x % 3 == 1:
            xp = ((16 - y) * hempin[x // 3][0] + y * 255) / 16
            yp = ((16 - y) * hempin[x // 3][1] + y * 255) / 16
            hemp[x][y] = (xp, yp)
        elif x % 3 == 2:
            xp = ((16 - y) * hempin[x // 3][0] + y *
                  hempout[(x // 3 + 1) % 6][0]) / 16
            yp = ((16 - y) * hempin[x // 3][1] + y *
                  hempout[(x // 3 + 1) % 6][1]) / 16
            hemp[x][y] = (xp, yp)
# 六芒星
for x in range(12):
    for y in range(3):
        for z in range(16):
            xp = ((16 - z) * sixtri[x][y][0] + z *
                  sixtri[x][(y + 1) % 3][0]) / 16
            yp = ((16 - z) * sixtri[x][y][1] + z *
                  sixtri[x][(y + 1) % 3][1]) / 16
            sixstar[x][y][z] = (xp, yp)
# 点初期化ここまで


# 線
def writeline(num, color, shape, x):
    global draw
    # 円
    if 0 <= shape and shape < 5:
        for x in range(pin[shape]):
            draw.line((circle[shape][x], circle[shape][int(
                (x + num) % pin[shape])]), fill=color, width=1)
    # 正方形
    elif shape == 5:
        for x in range(64):
            draw.line((square[x], square[int((x + num) % 64)]),
                      fill=color, width=1)
    # 五角形
    elif shape == 6:
        for x in range(80):
            draw.line(
                (pentagon[x], pentagon[int((x + num) % 80)]), fill=color, width=1)
    # 六角形
    elif shape == 7:
        for x in range(72):
            draw.line(
                (hexagon[x], hexagon[int((x + num) % 72)]), fill=color, width=1)
    # つぼみ
    elif shape == 8:
        for y in range(84):
            if y < 28:
                draw.line((tri[x][y], tri[x][y + 28]), fill=colornum[0])
            elif y < 56 and 28 < y:
                draw.line((tri[x][y], tri[x][y + 28]), fill=colornum[1])
            if y < 84 and 56 < y:
                draw.line((tri[x][y], tri[x][(y + 28) % 84]), fill=colornum[2])
    # 麻の葉
    elif shape == 9:
        num = 18
        for x in range(2, 18, 3):
            for y in range(16):
                if x % 3 == 2:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y], hemp[(x + 1) %
                                                    18][y - 4]), fill=colornum[0])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y], hemp[x][y + 12]),
                                  fill=colornum[0])
        for x in range(1, 18, 3):
            for y in range(16):
                if x % 3 == 1:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y], hemp[(x + 1) %
                                                    18][16 - y]), fill=colornum[1])
                        draw.line((hemp[x][y], hemp[(x + 3) %
                                                    18][16 - y]), fill=colornum[0])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y], hemp[x + 1][(y + 12) % 16]),
                                  fill=colornum[1])
                        draw.line((hemp[x][y], hemp[(x + 3) %
                                                    18][(y + 12) % 16]), fill=colornum[0])
        for x in range(0, 18, 3):
            for y in range(16):
                if x % 3 == 0:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y], hemp[(x + 1) %
                                                    18][y - 2]), fill=colornum[1])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y], hemp[x][y + 12]),
                                  fill=colornum[1])
    # 六芒星
    elif shape == 10:
        for x in range(12):
            for y in range(3):
                for z in range(16):
                    draw.line((sixstar[x][y][z], sixstar[x][(
                        y + 1) % 3][(z + 16) % 16]), fill=colornum[y])


@app.route('/Result', methods=['POST'])
def enterb1():
    global img
    global im
    global colornumhex
    global draw
    global colornum
    tmpflg = 0
    for i in range(6):
        tmp = hex_to_rgb(request.form["color" + str(i + 1)])
        if tmp == (0, 0, 0):
            tmpflg += 1
    for i in range(6):
        if tmpflg == 6:
            colornum[i] = (255, 255, 255)
        else:
            colornum[i] = hex_to_rgb(request.form["color" + str(i + 1)])
    backcolor = hex_to_rgb(request.form["bgcolor"])
    im = Image.new("RGBA", (500, 500), backcolor)
    draw = ImageDraw.Draw(im)
    var = int(request.form["shape"])
    for i in range(6):
        if var < 8:
            x = var
        else:
            x = 0
        writeline(primary[x][i], colornum[i], var, i)
    im = im.resize((550, 550), Image.LANCZOS)
    nowtime = time.strftime("%Y%m%d%H%M%S", time.strptime(time.ctime()))
    in_mem_file = io.BytesIO()
    im.save(in_mem_file, format="PNG")
    in_mem_file.seek(0)
    img_bytes = in_mem_file.read()
    base64_encoded_result_bytes = base64.b64encode(img_bytes)
    imgbin = base64_encoded_result_bytes.decode('ascii')
    for i in range(6):
        colornumhex[i] = rgb_to_hex(colornum[i])
    return render_template(
        'result.html',
        imgfile=nowtime,
        var=var,
        colornum1=colornumhex[0],
        colornum2=colornumhex[1],
        colornum3=colornumhex[2],
        colornum4=colornumhex[3],
        colornum5=colornumhex[4],
        colornum6=colornumhex[5],
        bgcolor=rgb_to_hex(backcolor),
        imgbin=imgbin,
        title="Result | 糸かけ曼荼羅 色シミュレーター")


@app.route('/Help')
def help():
    title = "Help | 糸かけ曼荼羅 色シミュレーター"
    return render_template('help.html', title=title)


@app.route('/')
def index():
    title = "Top | 糸かけ曼荼羅 色シミュレーター"
    return render_template('index.html',
                           colorlist=colornum, title=title)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'web.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.debug = True
    app.run(port=5000, host='0.0.0.0')
