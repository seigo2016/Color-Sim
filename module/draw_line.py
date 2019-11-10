from module.shape_init import *
import os
import io
from PIL import Image
import base64
from math import cos, sin, radians
# 線


def init_line(draw, num, color, shape, x, rgb_color_table):
    pin = [48, 64, 77, 88, 108]
    circle = init_circle()
    square = init_square()
    pentagon = init_pentagon()
    hexagon = init_hexagon()
    tri = init_tri()
    hemp, hempin, hempout = init_hemp()
    sixstar = init_sixstar()
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


def draw_line(primary, var, im, draw, rgb_color_table):
    circle = init_circle()
    # Draw line
    if var < 8:
        for i in range(len(primary[var])):
            init_line(draw, primary[var][i],
                      rgb_color_table[i], var, i, rgb_color_table)
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
                init_line(
                    draw, primary[0][i], rgb_color_table[i], var, i, rgb_color_table)

    im = im.resize((550, 550), Image.LANCZOS)

    # image to binary
    in_mem_file = io.BytesIO()
    im.save(in_mem_file, format="PNG")
    in_mem_file.seek(0)
    image_bytes = in_mem_file.read()
    base64_encoded_result_bytes = base64.b64encode(image_bytes)
    imagebin = base64_encoded_result_bytes.decode('ascii')
    return imagebin
