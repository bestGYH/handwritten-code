//观察者模式
// vue2 ：观察者
//响应式：视图依赖数据，数据改变了会通知视图


/* 
观察者模式：两个类

        1.被观察者
        2.观察者

*/
// 被观察
class Subject {
    constructor(name) {
        this.name = name
        this.observer = []
        this.state = ''
    }

    attch(o) {
        this.observer.push(o)
    }
    setState(value) {
        this.state = value
        this.observer.forEach(o=>o.updata(value))

    }
}
// 观察
class Observer {
    constructor(name) {
        this.name = name
    }
    updata(state) {
        console.log(`${this.name}女朋友的状态${state}`);
    }
}

let v = new Subject('女朋友')

let o = new Observer("男朋友")
//通知
v.attch(o)

// 状态不开心
v.setState('不开心')