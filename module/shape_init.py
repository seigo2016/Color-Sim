from math import cos, sin, radians


def init_circle():  # 円
    pin = [48, 64, 77, 88, 108]
    circle = [[], [], [], [], [], [(0, 0)] * 1000]
    for y in range(5):
        for x in range(pin[y]):
            circle[y].append((250 + 250 * cos(radians(360 / pin[y]) * x),
                              250 + 250 * sin(radians(360 / pin[y]) * x)))
    return circle


def init_square():  # 四角形
    square = []
    for y in range(16):
        square.append((10 + 30 * y, 10))
    for y in range(16):
        square.append((490, 10 + 30 * y))
    for y in range(16):
        square.append((490 - 30 * y, 490))
    for y in range(16):
        square.append((10, 490 - 30 * y))
    return square


def init_pentagon():  # 五角形
    pentagon = [(0, 0)] * 80
    for x in range(5):
        pentagon[x * 16] = (250 + 250 * cos(radians(72 * x - 18)),
                            270 + 250 * sin(radians(72 * x - 18)))
    for x in range(80):
        if pentagon[x][0] == 0 and pentagon[x][1] == 0:
            if x < 64:
                xp = ((16 - x % 16) * pentagon[x // 16 * 16][0] +
                      x % 16 * pentagon[(x // 16 + 1) * 16][0]) / 16
                yp = ((16 - x % 16) * pentagon[x // 16 * 16][1] +
                      x % 16 * pentagon[(x // 16 + 1) * 16][1]) / 16
                pentagon[x] = (xp, yp)
            else:
                xp = ((16 - x % 16) * pentagon[x // 16 * 16][0] +
                      x % 16 * pentagon[0][0]) / 16
                yp = ((16 - x % 16) * pentagon[x // 16 * 16][1] +
                      x % 16 * pentagon[0][1]) / 16
                pentagon[x] = (xp, yp)
    return pentagon


def init_hexagon():  # 六角形
    hexagon = [(0, 0)] * 72
    for x in range(6):
        hexagon[x * 12] = (250 + 250 * cos(radians(60 * x)),
                           250 + 250 * sin(radians(60 * x)))
    for x in range(72):
        if hexagon[x][0] == 0 and hexagon[x][1] == 0:
            if x < 60:
                xp = ((12 - x % 12) * hexagon[x // 12 * 12][0] +
                      x % 12 * hexagon[(x // 12 + 1) * 12][0]) / 12
                yp = ((12 - x % 12) * hexagon[x // 12 * 12][1] +
                      x % 12 * hexagon[(x // 12 + 1) * 12][1]) / 12
                hexagon[x] = (xp, yp)
            else:
                xp = ((12 - x % 12) * hexagon[x // 12 * 12]
                      [0] + x % 12 * hexagon[0][0]) / 12
                yp = ((12 - x % 12) * hexagon[x // 12 * 12]
                      [1] + x % 12 * hexagon[0][1]) / 12
                hexagon[x] = (xp, yp)
    return hexagon


def init_hemp():  # 麻の葉
    hempin = [(0, 0) for i in range(6)]
    hempout = [(0, 0) for i in range(6)]
    hemp = [[(0, 0) for i in range(16)]for i in range(18)]
    for x in range(6):
        hempout[x] = (250 + 250 * cos(radians(60 * x + 30)),
                      250 + 250 * sin(radians(60 * x + 30)))
    for x in range(6):
        hempin[x] = ((hempout[x][0] + hempout[(x + 1) % 6][0] + 250) / 3,
                     (hempout[x][1] + hempout[(x + 1) % 6][1] + 250) / 3)
    for x in range(18):
        for y in range(16):
            if x % 3 == 0:
                xp = ((16 - y) * hempin[x // 3][0] +
                      y * hempout[x // 3][0]) / 16
                yp = ((16 - y) * hempin[x // 3][1] +
                      y * hempout[x // 3][1]) / 16
                hemp[x][y] = (xp, yp)
                xp = (y * hempin[x // 3][0] + (16 - y)
                      * hempout[x // 3][0]) / 16
                yp = (y * hempin[x // 3][1] + (16 - y)
                      * hempout[x // 3][1]) / 16
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
    return hemp, hempin, hempout


def init_sixstar():  # 六芒星
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

    sixstar = [[[(0, 0) for i in range(16)]for i in range(3)]
               for i in range(12)]
    for x in range(12):
        for y in range(3):
            for z in range(16):
                xp = ((16 - z) * sixtri[x][y][0] + z *
                      sixtri[x][(y + 1) % 3][0]) / 16
                yp = ((16 - z) * sixtri[x][y][1] + z *
                      sixtri[x][(y + 1) % 3][1]) / 16
                sixstar[x][y][z] = (xp, yp)
    return sixstar


def init_tri():  # 蕾
    tri = [[(0, 0) for i in range(84)]for i in range(6)]
    for x in range(6):
        tri[x][0] = (250 + 250 * cos(radians(60 * x)),
                     250 + 250 * sin(radians(60 * x)))
        tri[x][28] = (250 + 250 * cos(radians(60 * x + 60)),
                      250 + 250 * sin(radians(60 * x + 60)))
        tri[x][56] = (250, 250)
        tri[x][83] = (250 + 250 * cos(radians(60 * x)),
                      250 + 250 * sin(radians(60 * x)))
    for x in range(6):
        for y in range(28):
            if tri[x][y] == (0, 0):
                xp = ((28 - y) * tri[x][0][0] + y * tri[x][28][0]) / 28
                yp = ((28 - y) * tri[x][0][1] + y * tri[x][28][1]) / 28
                tri[x][y] = (xp, yp)
        for y in range(28, 56):
            if tri[x][y] == (0, 0):
                xp = ((28 - y) % 28 * tri[x][28][0] + y %
                      28 * tri[x][56][0]) / 28
                yp = ((28 - y) % 28 * tri[x][28][1] + y %
                      28 * tri[x][56][1]) / 28
                tri[x][y] = (xp, yp)
        for y in range(56, 84):
            if tri[x][y] == (0, 0):
                xp = ((28 - y) % 28 * tri[x][56][0] + y %
                      28 * tri[(x)][0][0]) / 28
                yp = ((28 - y) % 28 * tri[x][56][1] + y %
                      28 * tri[(x)][0][1]) / 28
                tri[x][y] = (xp, yp)
    return tri
