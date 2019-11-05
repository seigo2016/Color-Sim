#!/usr/bin/env python
# -*- coding: utf-8 -*-
from math import sin, cos, radians
from PIL import Image, ImageDraw
import time
from flask import Flask, render_template, request, send_from_directory
import io
import base64
import os
from shape_init import *


app = Flask(__name__)

rgb_color_table = [(255, 255, 255)] * 12
pin = [48, 64, 77, 88, 108]
primary = [
    [23, 19, 17, 13, 11, 7],
    [31, 29, 23, 19, 17, 13, 11, 7],
    [37, 31, 29, 23, 19, 17],
    [43, 41, 37, 31, 29, 23],
    [53, 47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 11],  # 108?
    [31, 29, 23, 19, 17, 13],
    [37, 31, 29, 23, 19, 17],
    [31, 29, 23, 19, 17, 13],
    [31, 29, 23, 19, 17, 13, 32]]
colornumhex = ["#ffffff"] * 12
image = None
im = Image.new('RGB', (500, 500), (0, 0, 0))
draw = ImageDraw.Draw(im)

var = 0


def hex_to_rgb(hextmp):
    if hextmp is not None:
        hextmp = hextmp.replace("#", "")
        return (int(hextmp[:2], 16), int(hextmp[2:4], 16), int(hextmp[4:], 16))


def rgb_to_hex(rgbtmp):
    if rgbtmp is not None:
        return r"#%02X%02X%02X" % (rgbtmp[0], rgbtmp[1], rgbtmp[2])


circle = init_circle()
square = init_square()
pentagon = init_pentagon()
hexagon = init_hexagon()
tri = init_tri()
hemp, hempin, hempout = init_hemp()
sixstar = init_sixstar()

# 線


def drawline(num, color, shape, x):
    global draw
    # 円
    if 0 <= shape and shape < 5:
        for x in range(pin[shape]):
            draw.line((circle[shape][x],
                       circle[shape][int((x + num) % pin[shape])]),
                      fill=color, width=1)

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
                draw.line((tri[x][y], tri[x][y + 28]), fill=rgb_color_table[0])
            elif y < 56 and 28 < y:
                draw.line((tri[x][y], tri[x][y + 28]), fill=rgb_color_table[1])
            if y < 84 and 56 < y:
                draw.line((tri[x][y], tri[x][(y + 28) % 84]),
                          fill=rgb_color_table[2])

    # 麻の葉
    elif shape == 9:
        num = 18
        for i in range(6):
            draw.line((hempout[i], hempout[(i + 1) % 6]),
                      fill=rgb_color_table[3])
        for i in range(6):
            draw.line((hempout[i], (250, 250)),
                      fill=rgb_color_table[3], width=2)
        for x in range(2, 18, 3):
            for y in range(16):
                if x % 3 == 2:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y], hemp[(x + 1) % 18][y - 4]),
                                  fill=rgb_color_table[0])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y], hemp[x][y + 12]),
                                  fill=rgb_color_table[0])
        for x in range(1, 18, 3):
            for y in range(16):
                if x % 3 == 1:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y],
                                   hemp[(x + 3) % 18][16 - y]), fill=rgb_color_table[2])
                        draw.line((hemp[x][y],
                                   hemp[(x + 1) % 18][16 - y]), fill=rgb_color_table[1])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y],
                                   hemp[(x + 3) % 18][(y + 12) % 16]), fill=rgb_color_table[2])
                        draw.line(
                            (hemp[x][y], hemp[x + 1][(y + 12) % 16]), fill=rgb_color_table[1])
        for x in range(0, 18, 3):
            for y in range(16):
                if x % 3 == 0:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y],
                                   hemp[(x + 1) % 18][y - 2]), fill=rgb_color_table[1])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y],
                                   hemp[x][y + 12]), fill=rgb_color_table[1])

    # 六芒星
    elif shape == 10:
        for x in range(12):
            for y in range(3):
                for z in range(16):
                    draw.line((sixstar[x][y][z],
                               sixstar[x][(y + 1) % 3][(z + 16) % 16]), fill=rgb_color_table[y])


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'web.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/')
def index():
    title = "Top | 糸かけ曼荼羅 色シミュレーター"
    im = Image.open('default.png')
    in_mem_file = io.BytesIO()
    im.save(in_mem_file, format="PNG")
    in_mem_file.seek(0)
    image_bytes = in_mem_file.read()
    base64_encoded_result_bytes = base64.b64encode(image_bytes)
    imagebin = base64_encoded_result_bytes.decode('ascii')
    return render_template(
        'index.html',
        imagefile="default",
        colornum=colornumhex,
        custompin=primary[8],
        ac=[""] * 12,
        bgcolor=None,
        imagebin=imagebin,
        title=title)


@app.route('/Result', methods=['POST'])
def on_click_enter_button():
    global image
    global im
    global colornumhex
    global draw
    global rgb_color_table
    tmpflg = 0
    ac = [""] * 12
    for i in range(12):
        tmp = hex_to_rgb(request.form["color" + str(i + 1)])
        if tmp == (0, 0, 0):
            tmpflg += 1
    for i in range(12):
        if tmpflg == 6:
            rgb_color_table[i] = (255, 255, 255)
        else:
            rgb_color_table[i] = hex_to_rgb(request.form["color" + str(i + 1)])

    backcolor = hex_to_rgb(request.form["bgcolor"])
    im = Image.new("RGBA", (500, 500), backcolor)
    draw = ImageDraw.Draw(im)
    var = int(request.form["shape"])
    primary[8] = [int(request.form["prime1"]), int(request.form["prime2"]), int(request.form["prime3"]),
                  int(request.form["prime4"]), int(request.form["prime5"]), int(request.form["prime6"]), int(request.form["prime7"])]
    ac[var] = "active"

    # Draw line
    if var < 8:
        for i in range(len(primary[var])):
            drawline(primary[var][i], rgb_color_table[i], var, i)
    else:
        for i in range(6):
            if var == 11:
                for x in range(primary[8][6]):
                    circle[5][x] = ((250 + 250 * cos(radians(360 / primary[8][6]) * x),
                                     250 + 250 * sin(radians(360 / primary[8][6]) * x)))
                for x in range(primary[8][6]):
                    draw.line((circle[5][x], circle[5][int(
                        (x + primary[8][i]) % primary[8][6])]), fill=rgb_color_table[i])
            else:
                drawline(primary[0][i], rgb_color_table[i], var, i)

    im = im.resize((550, 550), Image.LANCZOS)
    nowtime = time.strftime("%Y%m%d%H%M%S", time.strptime(time.ctime()))

    # image to binary
    in_mem_file = io.BytesIO()
    im.save(in_mem_file, format="PNG")
    in_mem_file.seek(0)
    image_bytes = in_mem_file.read()
    base64_encoded_result_bytes = base64.b64encode(image_bytes)
    imagebin = base64_encoded_result_bytes.decode('ascii')

    for i in range(12):
        colornumhex[i] = rgb_to_hex(rgb_color_table[i])

    return render_template(
        'result.html',
        imagefile=nowtime,
        var=var,
        colornum=colornumhex,
        custompin=primary[8],
        ac=ac,
        bgcolor=rgb_to_hex(backcolor),
        imagebin=imagebin,
        title="Result | 糸かけ曼荼羅 色シミュレーター")


@app.route('/Help')
def help():
    title = "Help | 糸かけ曼荼羅 色シミュレーター"
    return render_template('help.html', title=title)


if __name__ == '__main__':
    app.debug = True
    app.run(port=5000, host='0.0.0.0')
