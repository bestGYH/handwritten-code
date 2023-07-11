// 1.订阅器模型

let Dep = {
    clientlist:{},
    // 添加订阅
    listen:function(key,fn){
        // if(!this.clientlist[key]){
        //     this.clientlist=[]
        // }
        // this.clientlist[key].push(fn)


        // 以上代码的简写
        (this.clientlist[key]||(this.clientlist[key]=[])).push(fn)
    },
    // 推送
    trigger:function(){
        console.log('trigger----arguments111',arguments);
        let key = Array.prototype.shift.call(arguments), // 处理方法参数
        fns = this.clientlist[key]
        if(!fns || fns.length===0){
            // 一个都没有订阅
            return false;
        }
        console.log('trigger----arguments222',arguments);
        for(let i =0,fn; fn = fns[i++];){
            fn.apply(this,arguments)
        }

    }
}
let dataHi = function({data,tag,datakey,selector}){
    console.log('dataHi',data,tag,datakey,selector);
    let value = '',
    el = document.querySelector(selector)
    Object.defineProperty(data,datakey,{
            get:function(){
               return value
            },
            set:function(val){
                value = val
                // 数据变化了！！！发布消息
                Dep.trigger(tag,value)
            }
    })
    // 订阅
    Dep.listen(tag,function(text){
        // 订阅回调
        el.innerText = text
    })
}