# -*- coding: utf-8 -*-
#! /usr/bin/env python

from PIL import Image, ImageDraw
import time
from flask import Flask, render_template, request, send_from_directory, jsonify
import io
import base64
import os
from module import draw_line



# template_folder = os.path.join('templates')
# static_folder = os.path.join('static')
app = Flask(__name__)
rgb_color_table = [(255, 255, 255)] * 12
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
    var = int(request.form["Shape"])
    if var == 11:
        primary[8] = [int(request.form["prime1"]), int(request.form["prime2"]), int(request.form["prime3"]),
                      int(request.form["prime4"]), int(request.form["prime5"]), int(request.form["prime6"]), int(request.form["prime7"])]
    ac[var] = "active"
    nowtime = time.strftime("%Y%m%d%H%M%S", time.strptime(time.ctime()))
    for i in range(12):
        colornumhex[i] = rgb_to_hex(rgb_color_table[i])

    imagebin = draw_line.draw_image(primary, var, im, draw, rgb_color_table)

    return render_template(
        'index.html',
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


@app.route('/Status')
def Status():
    return jsonify({'status': 'OK'}), 200


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'web.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.debug = False
    app.run(port=5000, host='0.0.0.0')
