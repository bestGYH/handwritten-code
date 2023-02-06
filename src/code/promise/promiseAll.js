// all
// Promise.all

import { reject, resolve } from "core-js/fn/promise";

//都成功，成功。有一个失败，失败。
export const all = (promiseArr) => {
    let result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        promiseArr.forEach((item,index)=>{
            item.then(v => {
                //如果成功就调用这个回调函数
                //得知对象状态是成功
                //每个promise对象都成功，才可以调用
                count++;
                //将当前promise成功对象存入数组中
                result[index] = v;
                //判断
                if (count === promiseArr.length) {
                    //都成功就可以调用成功函数
                    resolve(result);
                }
                // var allResolve = promiseArr.every((_item) => {
                //     // .every 每个判断。每个都满足条件返回true
                //     return _item.promiseState == "fulfilled";
                // });
                // // 判断传过来的数组中所有promise对象状态都已完成
                // if (allResolve) {
                //     resolve(result);
                // }

              
            }, r => {
                reject(r);
            })
        })
    });
  };
  
  // Promise.race
  //谁快就结束
  export const race = (promiseArr) => {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(item=>{
        item.then(v => {
            // 只要有任何一个promise状态变更就resolve
            resolve(v)
        }, r => {
            reject(r)
        })
      })
    });
  };
  
