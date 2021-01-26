function getStyle(style, filter = []) {
    const noNeedUnit = ['color', 'backgroundColor', 'textAlign', 'opacity', 'lineHeight', 'fontWeight', 'borderColor']
    let result = { }
    for (let styleItem in style) {
        if (!filter.includes(styleItem)) {
            if (styleItem != 'rotate') {
                result[styleItem] = style[styleItem];
                if (!noNeedUnit.includes(styleItem)) {
                    result[styleItem] += 'px';
                }
            }else{
                result.transform = styleItem + '(' + style[styleItem] + 'deg)'
            }
        }
    }
    return result
}

 function swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    console.log(arr);
}

export {
    getStyle,
    swap
}

