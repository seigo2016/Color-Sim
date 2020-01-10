function change(i) {
    if (localStorage.getItem('ColorSet' + String(i)) != null) {
        let getValue = (JSON.parse(localStorage.getItem('ColorSet' + String(i))))
        for (let i = 0; i < 5; i++) {
            document.getElementById('color' + String(i + 1)).value = getValue[i]
        }
    }
}
function remove() {
    localStorage.clear()
}
function remember() {
    let getValue = []
    let len = 0
    for (let i = 0; i < 6; i++) {
        if (localStorage.getItem('ColorSet' + String(i)) != null) {
            getValue.push(JSON.parse(localStorage.getItem('ColorSet' + String(i))))
            len++;
        }
    }
    if (len == 5) {
        localStorage.removeItem('ColorSet1');
        for (let i = 0; i < 5; i++) {
            localStorage.setItem('ColorSet' + String(i + 1), localStorage.getItem('ColorSet' + String(i + 2)))
        }
    }
    let colorlist = []
    for (let i = 1; i < 6; i++) {
        colorlist.push(document.getElementById('color' + String(i)).value)
    }
    colorlist.push(document.getElementById('bgcolor').value)
    localStorage.setItem('ColorSet' + String(len + 1), JSON.stringify(colorlist))
}
function getStorage() {
    let len = 0
    let getValue = []
    for (let i = 0; i < 6; i++) {
        if (localStorage.getItem('ColorSet' + String(i)) != null) {
            getValue.push(JSON.parse(localStorage.getItem('ColorSet' + String(i))))
            len++;
        }
    }
    let getjson = localStorage.getItem('ColorSet' + String(len + 1))
    getValue = JSON.parse(getjson)
}
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function setcolsize(x) {
    for (let i = 1; i <= 12; i++) {
        if (i > x)
            document.getElementById("color" + String(i)).classList.add("uk-hidden");
        else
            document.getElementById("color" + String(i)).classList.remove("uk-hidden");
    }
}
window.onload = function () {
    let collist = [6, 8, 6, 6, 12, 6, 6, 6, 3, 4, 8]
    for (let i = 1; i <= 11; i++) {
        if (getElementByXpath("/html/body/div/div[2]/div/form/div[1]/label[" + String(i) + "]").classList.contains("active")) {
            setcolsize(collist[i - 1])
        }
    }
}