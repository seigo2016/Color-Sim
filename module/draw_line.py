from module import shape_init as si
import io
from PIL import Image, ImageDraw
import base64
from math import cos, sin, radians
# 線


class init_draw_line():   # draw, num, color, shape, x, rgb_color_table):

    # 円
    def circle(self, draw: ImageDraw.ImageDraw, shape: int, color: tuple, num: int):
        circle = si.init_circle()
        pin = [48, 64, 77, 88, 108]
        for x in range(pin[shape]):
            draw.line((circle[shape][x],
                       circle[shape][int((x + num) % pin[shape])]),
                      fill=color, width=1)

    # 正方形
    def square(self, draw: ImageDraw.ImageDraw, shape: int, color: tuple, num: int):
        square = si.init_square()
        for x in range(64):
            draw.line((square[x], square[int((x + num) % 64)]),
                      fill=color, width=1)

    # 五角形
    def pentagon(self, draw: ImageDraw.ImageDraw, shape: int, color: tuple, num: int):
        pentagon = si.init_pentagon()
        for x in range(80):
            draw.line(
                (pentagon[x], pentagon[int((x + num) % 80)]), fill=color, width=1)

    # 六角形
    def hexagon(self, draw: ImageDraw.ImageDraw, shape: int, color: tuple, num: int):
        hexagon = si.init_hexagon()
        for x in range(72):
            draw.line(
                (hexagon[x], hexagon[int((x + num) % 72)]), fill=color, width=1)

    # つぼみ
    def tri(self, draw: ImageDraw.ImageDraw, shape: int, color, x: int):
        tri = si.init_tri()
        for y in range(84):
            if y < 28:
                draw.line((tri[x][y], tri[x][y + 28]), fill=color[0])
            elif y < 56 and 28 < y:
                draw.line((tri[x][y], tri[x][y + 28]), fill=color[1])
            if y < 84 and 56 < y:
                draw.line((tri[x][y], tri[x][(y + 28) % 84]),
                          fill=color[2])

    # 麻の葉
    def hemp(self, draw, shape, color, x: int):
        hemp, hempin, hempout = si.init_hemp()
        for i in range(6):
            draw.line((hempout[i], hempout[(i + 1) % 6]),
                      fill=color[3])
        for i in range(6):
            draw.line((hempout[i], (250, 250)),
                      fill=color[3], width=2)
        for x in range(2, 18, 3):
            for y in range(16):
                if x % 3 == 2:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y], hemp[(x + 1) % 18][y - 4]),
                                  fill=color[0])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y], hemp[x][y + 12]),
                                  fill=color[0])
        for x in range(1, 18, 3):
            for y in range(16):
                if x % 3 == 1:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y],
                                   hemp[(x + 3) % 18][16 - y]), fill=color[2])
                        draw.line((hemp[x][y],
                                   hemp[(x + 1) % 18][16 - y]), fill=color[1])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y],
                                   hemp[(x + 3) % 18][(y + 12) % 16]), fill=color[2])
                        draw.line(
                            (hemp[x][y], hemp[x + 1][(y + 12) % 16]), fill=color[1])
        for x in range(0, 18, 3):
            for y in range(16):
                if x % 3 == 0:
                    if y + 12 >= 16:
                        draw.line((hemp[x][y],
                                   hemp[(x + 1) % 18][y - 2]), fill=color[1])
                    elif y + 12 < 16:
                        draw.line((hemp[x][y],
                                   hemp[x][y + 12]), fill=color[1])
    # 六芒星

    def sixstar(self, draw: ImageDraw.ImageDraw, shape: int, color: tuple, x: int):
        sixstar = si.init_sixstar()
        type_sixstar = [2, 3, 4, 7, 8, 9]
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][0][z],
                           sixstar[x][1][(z + 16) % 16]), fill=color[0])
        # --------------------------------------------------------------------------------- #
        type_sixstar = [0, 1, 2, 5, 6, 10, 11]
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][0][z],
                           sixstar[x][2][(z + 16) % 16]), fill=color[1])
        # ---------------------------------------------------------------------------------#
        type_sixstar = [0, 1]
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][0][z],
                           sixstar[x][1][(z + 16) % 16]), fill=color[2])
        for z in range(16):
            draw.line((sixstar[3][1][z],
                       sixstar[3][2][(z + 16) % 16]), fill=color[2])
        for z in range(16):
            draw.line((sixstar[2][0][z],
                       sixstar[2][2][(z + 16) % 16]), fill=color[2])
        # ---------------------------------------------------------------------------------#
        for z in range(16):
            draw.line((sixstar[0][2][z],
                       sixstar[0][1][(z + 16) % 16]), fill=color[3])
        for z in range(16):
            draw.line((sixstar[5][0][z],
                       sixstar[5][1][(z + 16) % 16]), fill=color[3])
        type_sixstar = [3, 4]
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][0][z],
                           sixstar[x][2][(z + 16) % 16]), fill=color[3])
        # ---------------------------------------------------------------------------------#
        type_sixstar = [1, 2]
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][2][z],
                           sixstar[x][1][(z + 16) % 16]), fill=color[4])
        for z in range(16):
            draw.line((sixstar[6][0][z],
                       sixstar[6][1][(z + 16) % 16]), fill=color[4])
        for z in range(16):
            draw.line((sixstar[7][2][z],
                       sixstar[7][0][(z + 16) % 16]), fill=color[4])
        # ---------------------------------------------------------------------------------#
        type_sixstar = [5, 4]
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][2][z],
                           sixstar[x][1][(z + 16) % 16]), fill=color[5])
        for z in range(16):
            draw.line((sixstar[10][0][z],
                       sixstar[10][1][(z + 16) % 16]), fill=color[5])
        for z in range(16):
            draw.line((sixstar[9][0][z],
                       sixstar[9][2][(z + 16) % 16]), fill=color[5])
        # ---------------------------------------------------------------------------------#
        type_sixstar = [8, 9]
        for z in range(16):
            draw.line((sixstar[11][1][z],
                       sixstar[11][0][(z + 16) % 16]), fill=color[6])
        for z in range(16):
            draw.line((sixstar[10][1][z],
                       sixstar[10][2][(z + 16) % 16]), fill=color[6])
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][2][z],
                           sixstar[x][1][(z + 16) % 16]), fill=color[6])
        # --------------------------------------------------------------------------------- #
        type_sixstar = [6, 11]
        for z in range(16):
            draw.line((sixstar[8][0][z],
                       sixstar[8][2][(z + 16) % 16]), fill=color[7])
        for z in range(16):
            draw.line((sixstar[7][1][z],
                       sixstar[7][2][(z + 16) % 16]), fill=color[7])
        for x in type_sixstar:
            for z in range(16):
                draw.line((sixstar[x][2][z],
                           sixstar[x][1][(z + 16) % 16]), fill=color[7])

# (draw, num, color, shape, x, rgb_color_table):

# (draw, shape, color, num)


def draw_line(primary, var, im, draw, rgb_color_table):
    circle = si.init_circle()
    init_line = init_draw_line()
    # Draw line
    if var < 5:  # 円形
        for i in range(len(primary[var])):
            init_line.circle(draw, var,
                             rgb_color_table[i], primary[var][i])
    elif var == 5:  # 正方形
        for i in range(len(primary[var])):
            init_line.square(draw, var, rgb_color_table[i], primary[var][i])
    elif var == 6:  # 五角形
        for i in range(len(primary[var])):
            init_line.pentagon(draw, var, rgb_color_table[i], primary[var][i])
    elif var == 7:  # 六角形
        for i in range(len(primary[var])):
            init_line.hexagon(draw, var, rgb_color_table[i], primary[var][i])
    elif var == 8:  # つぼみ
        for i in range(6):
            init_line.tri(draw, var, rgb_color_table, i)
    elif var == 9:  # 麻の葉
        for i in range(6):
            init_line.hemp(draw, var, rgb_color_table, i)
    elif var == 10:  # 六芒星
        for i in range(6):
            init_line.sixstar(draw, var, rgb_color_table, i)
    elif var == 11:  # カスタム円
        for i in range(6):
            for x in range(primary[8][6]):
                circle[5][x] = ((250 + 250 * cos(radians(360 / primary[8][6]) * x),
                                 250 + 250 * sin(radians(360 / primary[8][6]) * x)))
            for x in range(primary[8][6]):
                draw.line((circle[5][x], circle[5][int(
                    (x + primary[8][i]) % primary[8][6])]), fill=rgb_color_table[i])
    im = im.resize((550, 550), Image.LANCZOS)

    in_mem_file = io.BytesIO()
    im.save(in_mem_file, format="PNG")
    in_mem_file.seek(0)
    image_bytes = in_mem_file.read()
    base64_encoded_result_bytes = base64.b64encode(image_bytes)
    imagebin = base64_encoded_result_bytes.decode('ascii')
    return imagebin
