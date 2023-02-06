// 解决异步问题
// 1/回调函数 2/高阶函数


// 发布订阅者模式：发布 订阅
let eventTest = {
    data: {},
    _arr: [],
    on(fn) {// 订阅收集,存放函数
        this._arr.push(fn)
    },
    emit(key, value) {
        /* 
        1.收集数据
        */
        this.data[key] = value
        // 2.触发订阅
        this._arr.forEach(fn => {
            fn(this.data)
        })
    }
}
eventTest.on(()=> {// 订阅第一次
    console.log('订阅第一次');
})
eventTest.on((data)=> {// 订阅第一次
    console.log('订阅第二次');
    console.log(data);
})

setTimeout(() => {
    eventTest.emit('res',"是一步数据时")
}, 2000)




