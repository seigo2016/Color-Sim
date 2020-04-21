# -*- coding: utf-8 -*-
#! /usr/bin/env python

from PIL import Image, ImageDraw
import time
from flask import Flask, render_template, request, send_from_directory, jsonify
import io
import base64
import os
from module import draw_line


def hex_to_rgb(hextmp):
    if hextmp is not None:
        hextmp = hextmp.replace("#", "")
        return (int(hextmp[:2], 16), int(hextmp[2:4], 16), int(hextmp[4:], 16))


def rgb_to_hex(rgbtmp):
    if rgbtmp is not None:
        return r"#%02X%02X%02X" % (rgbtmp[0], rgbtmp[1], rgbtmp[2])


@app.route('/')
def index():
    title = "Top | 糸かけ曼荼羅 色シミュレーター"
    im = Image.open('default.png')
    in_mem_file = io.BytesIO()
    im.save(in_mem_file, format="PNG")
    in_mem_file.seek(0)
    image_bytes = in_mem_file.read()
    base64_encoded_result_bytes = base64.b64encode(image_bytes)
    image_binary = base64_encoded_result_bytes.decode('ascii')
    return render_template(
        'index.html',
        image_file_name="default",
        color_number=color_number_hex,
        custompin=primary[8],
        background_color=None,
        image_binary=image_binary,
        title=title)


@app.route('/Result', methods=['POST'])
def on_click_enter_button():
    global im
    global color_number_hex
    global draw
    tmpflg = 0
    for i in range(12):
        tmp = hex_to_rgb(request.form["color" + str(i + 1)])
        if tmp == (0, 0, 0):
            tmpflg += 1
    for i in range(12):
        if tmpflg == 6:
            rgb_color_table[i] = (255, 255, 255)
        else:
            rgb_color_table[i] = hex_to_rgb(request.form["color" + str(i + 1)])
    backcolor = hex_to_rgb(request.form["background_color"])
    im = Image.new("RGBA", (500, 500), backcolor)
    draw = ImageDraw.Draw(im)
    shape_number = int(request.form["Shape"])
    if shape_number == 11:
        primary[8] = [int(request.form["prime1"]), int(request.form["prime2"]), int(request.form["prime3"]),
                      int(request.form["prime4"]), int(request.form["prime5"]), int(request.form["prime6"]), int(request.form["prime7"])]
    nowtime = time.strftime("%Y%m%d%H%M%S", time.strptime(time.ctime()))
    for i in range(12):
        color_number_hex[i] = rgb_to_hex(rgb_color_table[i])

    image_binary = draw_line.draw_image(primary, shape_number, im, draw, rgb_color_table)

    return render_template(
        'index.html',
        image_file_name=nowtime,
        shape_number=shape_number,
        color_number=color_number_hex,
        custompin=primary[8],
        # ac=ac,
        background_color=rgb_to_hex(backcolor),
        image_binary=image_binary,
        title="Result | 糸かけ曼荼羅 色シミュレーター")


@app.route('/Help')
def help():
    title = "Help | 糸かけ曼荼羅 色シミュレーター"
    return render_template('help.html', title=title)


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'web.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    rgb_color_table = [(255, 255, 255)] * 12
    # 間隔の初期化
    primary = [
        [23, 19, 17, 13, 11, 7],  # 円 48
        [31, 29, 23, 19, 17, 13, 11, 7],  # 円 64
        [37, 31, 29, 23, 19, 17],  # 円 77
        [43, 41, 37, 31, 29, 23],  # 円 88
        [53, 47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 11],  # 円 108
        [31, 29, 23, 19, 17, 13],  # 正方形
        [37, 31, 29, 23, 19, 17],  # 正五角形
        [31, 29, 23, 19, 17, 13],  # 正六角形
        [31, 29, 23, 19, 17, 13, 48]]  # カスタム円
    # 糸の色の初期化
    color_number_hex = ["#ffffff"] * 12
    # キャンバスの初期化
    im = Image.new('RGB', (500, 500), (0, 0, 0))
    draw = ImageDraw.Draw(im)
    # 形状の初期化
    shape_number = 0

    # Flaskの設定
    app = Flask(__name__)
    app.debug = False
    app.run(port=5000, host='0.0.0.0')