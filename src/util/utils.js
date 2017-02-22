
function toast(msg = '', time = 1500) {
    var toast = document.createElement('div')
    toast.className = 'common-toast common-toast-show'
    toast.innerHTML = msg
    document.body.appendChild(toast)
    toast.style.display = 'block'
    toast.style.margin = '0 auto;'
    var timer = setTimeout(() => {
        toast.className = 'common-toast common-toast-hide'
        clearTimeout(timer)
        var timer2 = setTimeout(() => {
            document.body.removeChild(toast)
            clearTimeout(timer2)
        }, 200)
    }, time)
}

module.exports = {
    toast
}