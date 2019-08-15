function change(i) {
    if (localStorage.getItem('ColorSet' + String(i)) != null) {
        var getValue = (JSON.parse(localStorage.getItem('ColorSet' + String(i))))
        for (var i = 0; i < 5; i++) {
            document.getElementById('color' + String(i + 1)).value = getValue[i]
        }
    }
}

function remove() {
    localStorage.clear()
}
function remember() {
    var getValue = []
    var len = 0
    for (var i = 0; i < 6; i++) {
        if (localStorage.getItem('ColorSet' + String(i)) != null) {
            getValue.push(JSON.parse(localStorage.getItem('ColorSet' + String(i))))
            len++;
        }
    }
    if (len == 5) {
        localStorage.removeItem('ColorSet1');
        for (var i = 0; i < 5; i++) {
            localStorage.setItem('ColorSet' + String(i + 1), localStorage.getItem('ColorSet' + String(i + 2)))
        }
    }
    var colorlist = []
    for (var i = 1; i < 6; i++) {
        colorlist.push(document.getElementById('color' + String(i)).value)
    }
    colorlist.push(document.getElementById('bgcolor').value)
    localStorage.setItem('ColorSet' + String(len + 1), JSON.stringify(colorlist))
}
function getStorage() {
    var len = 0
    var getValue = []
    for (var i = 0; i < 6; i++) {
        if (localStorage.getItem('ColorSet' + String(i)) != null) {
            getValue.push(JSON.parse(localStorage.getItem('ColorSet' + String(i))))
            len++;
        }
    }
    var getjson = localStorage.getItem('ColorSet' + String(len + 1))
    var getValue = JSON.parse(getjson)
}
window.onload = function () {
    $('.arrow, [class^=arrow-]').bootstrapArrows();
}