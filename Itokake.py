import numpy as np
from PIL import Image,ImageDraw,ImageTk
from tkinter import Tk,ttk,PhotoImage,colorchooser
import tkinter as tk
import math
import time
colornum = [(255,255,255),(255,255,255),(255,255,255),(255,255,255),(255,255,255),(255,255,255)]
pin = [48,64,77,88,108]
primary = [[23,19,17,13,11,7],[31,29,23,19,17,13],[37,31,29,23,19,17],[43,41,37,31,29,23],[53,47,43,41,37,31],[31,29,23,19,17,13],[37,31,29,23,19,17],[31,29,23,19,17,13]]
img = None
im = Image.new('RGB', (500, 500), (0, 0, 0))
draw = ImageDraw.Draw(im)
square = []
pentagon = [(0,0)]*80
hexagon = [(0,0)]*72
circle = [[],[],[],[],[]]
tri=[[(0,0) for i in range(84)]for i in range(6)]
savenum=0

for x in range(6):
    tri[x][0] = (250+250*np.cos(np.deg2rad(60*x)),250+250*np.sin(np.deg2rad(60*x)))
    tri[x][28] = (250+250*np.cos(np.deg2rad(60*x+60)),250+250*np.sin(np.deg2rad(60*x+60)))
    tri[x][56] = (250,250)
    tri[x][83] = (250+250*np.cos(np.deg2rad(60*x)),250+250*np.sin(np.deg2rad(60*x)))
for x in range(6):
    for y in range(28):
        if tri[x][y] == (0,0):
            tri[x][y]=(((28-y)*tri[x][0][0]+y*tri[x][28][0])/28,((28-y)*tri[x][0][1]+y*tri[x][28][1])/28)
    for y in range(28,56):
       if tri[x][y] == (0,0):
            tri[x][y]=(((28-y)%28*tri[x][28][0]+y%28*tri[x][56][0])/28,((28-y)%28*tri[x][28][1]+y%28*tri[x][56][1])/28)
    for y in range(56,84):
        if tri[x][y] == (0, 0):
            tri[x][y]=(((28-y)%28*tri[x][56][0]+y%28*tri[(x)][0][0])/28,((28-y)%28*tri[x][56][1]+y%28*tri[(x)][0][1])/28)
for y in range(16):
    square.append((10+30*y,10))
for y in range(16):
    square.append((490,10+30*y))
for y in range(16):
    square.append((490-30*y,490))
for y in range(16):
    square.append((10,490-30*y))
for y in range(5):
    for x in range(pin[y]):
        rad = np.deg2rad(360/pin[y])
        circle[y].append((250+250*np.cos(rad*x),250+250*np.sin(rad*x)))
for x in range(6):
    hexagon[x*12]=(250+250*np.cos(np.deg2rad(60*x)),250+250*np.sin(np.deg2rad(60*x)))
for x in range(72):
    if hexagon[x][0]  is 0 and hexagon[x][1]  is 0:
        if x < 60:
            hexagon[x]=(((12-x%12)*hexagon[x//12*12][0]+x%12*hexagon[(x//12+1)*12][0])/12,((12-x%12)*hexagon[x//12*12][1]+x%12*hexagon[(x//12+1)*12][1])/12)
        else:
            hexagon[x]=(((12-x%12)*hexagon[x//12*12][0]+x%12*hexagon[0][0])/12,((12-x%12)*hexagon[x//12*12][1]+x%12*hexagon[0][1])/12)
for x in range(5):
    pentagon[x*16]=(250+250*np.cos(np.deg2rad(72*x-18)),270+250*np.sin(np.deg2rad(72*x-18)))
for x in range(80):
    if pentagon[x][0]  is 0 and pentagon[x][1]  is 0:
        if x < 64:
            pentagon[x]=(((16-x%16)*pentagon[x//16*16][0]+x%16*pentagon[(x//16+1)*16][0])/16,((16-x%16)*pentagon[x//16*16][1]+x%16*pentagon[(x//16+1)*16][1])/16)
        else:
            pentagon[x]=(((16-x%16)*pentagon[x//16*16][0]+x%16*pentagon[0][0])/16,((16-x%16)*pentagon[x//16*16][1]+x%16*pentagon[0][1])/16)
               
def hex_to_rgb(hextmp):
    if hextmp is not None:
        hextmp=hextmp.replace("#","")
        return (int(hextmp[:2],16),int(hextmp[2:4],16),int(hextmp[4:],16))

def writeline(num,color,shape,x):
    global draw
    if shape < 5:
        for x in range(pin[shape]):
            draw.line((circle[shape][x],circle[shape][int((x+num)%pin[shape])]),fill=color, width=1)
    elif shape is 5:
        for x in range(64):
            draw.line((square[x],square[int((x+num)%64)]),fill=color, width=1)
    elif shape is 6:
        for x in range(80):
            draw.line((pentagon[x],pentagon[int((x+num)%80)]),fill=color, width=1)
    elif shape is 7:
        for x in range(72):
            draw.line((hexagon[x],hexagon[int((x+num)%72)]),fill=color, width=1)
    elif shape is 8:
        for y in range(84):
            if y < 28:
                draw.line((tri[x][y],tri[x][y+28]),fill=colornum[0])
            elif y < 56 and 28 < y:
                draw.line((tri[x][y],tri[x][y+28]),fill=colornum[1])
            if y < 84 and 56 < y:
                draw.line((tri[x][y],tri[x][(y+28)%84]),fill=colornum[2])
def enterb1():
    global img
    global im
    global draw
    im = Image.new('RGB', (500, 500), (0, 0, 0))
    draw = ImageDraw.Draw(im)
    for i in range(6):
        if var.get() < 8:
            x = var.get()
        else:
            x = 0
        writeline(primary[x][i],colornum[i],var.get(),i)
    im = im.resize((550, 550), Image.LANCZOS)
    img = ImageTk.PhotoImage(im)
    canvas = tk.Canvas(root,bg="black",width=550, height=550)
    canvas.place(x=85, y=135)
    canvas.create_image(0, 0, image=img, anchor=tk.NW)

def colorpick(i):
    def x():
        colornum[i]=hex_to_rgb(colorchooser.askcolor(title="select color")[1])
    return x

def bsave():
    global im
    global savenum
    savenum+=1
    nowtime = time.strftime("%Y%m%d%H%M", time.strptime(time.ctime()))
    savetxt=nowtime+str(savenum)+".png"
    im.save(savetxt)
    vartxt.set(savetxt+"に保存しました")

button=[]
root = Tk()
root.geometry("720x720+230+0")
root.configure(bg='black')
root.grid()
root.resizable(0,0)

frame1 = tk.Toplevel()
frame1.title("形状選択ウィンドウ")
frame1.geometry("230x120+0+0")
frame1.grid()

for i in range(6):
    button.append(tk.Button(root,height=3,width=13,text=str(i+1)+'番の色を選択',command=colorpick(i)))
    button[i].pack(side='left',anchor='n')
var=tk.IntVar()
var.set(0)
radio1=tk.Radiobutton(frame1,value=0,variable=var,text="円(48pin)")
radio2=tk.Radiobutton(frame1,value=1,variable=var,text="円(64pin)")
radio3=tk.Radiobutton(frame1,value=2,variable=var,text="円(77pin)")
radio4=tk.Radiobutton(frame1,value=3,variable=var,text="円(88pin)")
radio5=tk.Radiobutton(frame1,value=4,variable=var,text="円(108pin)")
radio6=tk.Radiobutton(frame1,value=5,variable=var,text="正方形(64pin)")
radio7=tk.Radiobutton(frame1,value=6,variable=var,text="五角形(80pin)")
radio8=tk.Radiobutton(frame1,value=7,variable=var,text="六角形(72pin)")
radio9=tk.Radiobutton(frame1,value=8,variable=var,text="蕾")    
radio1.place(x=10,y=10)
radio2.place(x=10,y=30)
radio3.place(x=10,y=50)
radio4.place(x=10,y=70)
radio5.place(x=10,y=90)
radio6.place(x=100,y=10)
radio7.place(x=100,y=30)
radio8.place(x=100,y=50)
radio9.place(x=100,y=70)
benter = tk.Button(root,text='実行',command=enterb1)
bsave = tk.Button(root,text='保存',command=bsave)
vartxt = tk.StringVar()
savetxt = tk.Label(root,textvariable=vartxt,text=u'test')

bsave.place(x=425,y=53,anchor='n',height=60,width=120)
benter.place(x=305,y=53,anchor='n',height=60,width=120)
savetxt.place(x=365,y=115,anchor='n')
root.mainloop()