export function charToCodeArray(string, len = string.length, paddingValue = 0) {
    const arr = []
    for (let c = 0; c < len; c++) {
        arr[c] = string[c] ? string.charCodeAt(c) : paddingValue
    }
    return arr
}

export function codeArrayToChar(arr){
    return arr.map((each,i)=>String.fromCharCode(each)).join('')
}


export function addState(value){
    return {
        value,
        last : value,
        cbs : [],
        set(){
            let val = arguments[0]
            if(val !== undefined){
                val = typeof val === "function" ? val(this.value) : val
                if(val !== undefined){this.last = this.value;this.value = val}
            }
            for(let each of this.cbs){each(val||this.value)}
        },
        bind(){let [cb , initialLoad] = arguments;this.cbs.push(cb);if(initialLoad === undefined || initialLoad === true){cb(this.value)}}
    }
}

export function debounce(fn, delay) {
    let timerId
    return function (...args) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

export function scrollElementVisible(root , target){
    let frameCords = root.getClientRects()[0],
        itemCords = target.getClientRects()[0],
        diff = {
            T : itemCords.top - frameCords.top,
            B : frameCords.bottom - itemCords.bottom,
            L : itemCords.left - frameCords.left,
            R : frameCords.right - itemCords.right,
        },
        visible = {
            x : diff.L >= 0 && diff.R >= 0,
            y : diff.T >= 0 && diff.B >= 0
        },
        offBy = {
            x : diff.R < 0 ? Math.abs(diff.R) : diff.L < 0 ? diff.L : 0,
            y : diff.B < 0 ? Math.abs(diff.B) : diff.T < 0 ? diff.T : 0   
        }
    return {visible , offBy , diff}
}
