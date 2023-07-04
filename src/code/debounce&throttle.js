const debounce = (fn, initial) => {
    // 每次触发，重新计算

    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, initial);
    };
};

// debounce(function (event) {
//     const value = searchElement.value;
//     if (value) console.log(value, '请求值');
//   }, 1000);


function throttle(fn, interval) {
    // 固定时间，只能一次
    let init = false; // 引入一个参数记录状态
    let timer;
    return (event) => {
        if (init) return;
        init = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
            init = false;
        }, interval);
        fn(event);
    }
}

var btnClick = document.getElementById('buttonElement');
btnClick.addEventListener('click', throttle(function (event) {
    console.log(event, '点击了')
}, 2000));

