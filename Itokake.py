import numpy as np
from PIL import Image,ImageDraw,ImageTk
from tkinter import Tk,ttk,PhotoImage,colorchooser
import tkinter as tk
import math

colornum=[(255,255,255),(255,255,255),(255,255,255),(255,255,255),(255,255,255),(255,255,255)]
pin=[48,64,77,88,108]
primary=[[23,19,17,13,11,7],[31,29,23,19,17,13],[37,31,29,23,19,17],[43,41,37,31,29,23],[53,47,43,41,37,31],[31,29,23,19,17,13],[37,31,29,23,19,17],[31,29,23,19,17,13]]
img=None
im = Image.new('RGB', (500, 500), (0, 0, 0))
draw = ImageDraw.Draw(im)
square = []
pentagon = [(0,0)]*80
hexagon = [(0,0)]*72
circle = [[],[],[],[],[]]
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

def writeline(num,color,shape):
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

def enterb1():
    global img
    global im
    global draw
    im = Image.new('RGB', (500, 500), (0, 0, 0))
    draw = ImageDraw.Draw(im)
    for i in range(6):
        writeline(primary[var.get()][i],colornum[i],var.get())
    img = ImageTk.PhotoImage(im)
    canvas = tk.Canvas(root,bg="black",width=500, height=500)
    canvas.place(x=110, y=180)
    canvas.create_image(0, 0, image=img, anchor=tk.NW)

def colorpick(i):
    def x():
        colornum[i]=hex_to_rgb(colorchooser.askcolor(title="select color")[1])
    return x

button=[]
root = Tk()
root.geometry("720x720")
root.configure(bg='black')
root.resizable(0,0)
for i in range(6):
    button.append(tk.Button(root,height=3,width=13,text=str(i)+'番の色を選択',command=colorpick(i)))
    button[i].pack(side='left',anchor='n')
var=tk.IntVar()
var.set(0)
radio1=tk.Radiobutton(root,value=0,variable=var,text="円(48pin)")
radio2=tk.Radiobutton(root,value=1,variable=var,text="円(64pin)")
radio3=tk.Radiobutton(root,value=2,variable=var,text="円(77pin)")
radio4=tk.Radiobutton(root,value=3,variable=var,text="円(88pin)")
radio5=tk.Radiobutton(root,value=4,variable=var,text="円(108pin)")
radio6=tk.Radiobutton(root,value=5,variable=var,text="正方形(64pin)")
radio7=tk.Radiobutton(root,value=6,variable=var,text="五角形(80pin)")
radio8=tk.Radiobutton(root,value=7,variable=var,text="六角形(72pin)")    
radio1.place(x=140,y=60)
radio2.place(x=140,y=80)
radio3.place(x=140,y=100)
radio4.place(x=140,y=120)
radio5.place(x=140,y=140)
radio6.place(x=240,y=60)
radio7.place(x=240,y=80)
radio8.place(x=240,y=100)
benter = ttk.Button(root,text='実行',command=enterb1)
benter.place(x=420,y=60,anchor='n',height=60,width=120)
root.mainloop()