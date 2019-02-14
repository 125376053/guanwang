(function flexible(window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    function setRemUnit() {
        var rem = docEl.clientWidth / 37.5
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })
    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))

var a = []
var b = []
/*
b.forEach(el = > {
    const index = b.indexOf(a)
    index !== -1 ? a.splice(index, 1) : null
})*/
b.forEach(function(el){
    const index = b.indexOf(a)
    index !== -1 ? a.splice(index, 1) : null
})