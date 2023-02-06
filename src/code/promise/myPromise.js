
function MyPromise(fn) {
    // promise 的状态
    this.promiseState = "pendding";
    // promise 的值
    this.promiseResult = undefined;
    // 定义一个函数对象，用来注册then中的callback
    this.thenCallback = undefined;
    this.catchCallback = undefined;
    var resolve = (value) => {
        // 更改promise的状态和值
        if (this.promiseState == "pendding") {
            this.promiseState = "fulfilled";
            this.promiseResult = value;
            // 判断value是否是一个MyPromise对象,如果是就使用自己定义的then
            if (value instanceof MyPromise) {
                value.then((res) => {
                    if (this.thenCallback) {
                        this.thenCallback(res);
                    }
                });
            } else {
                setTimeout(() => {
                    if (this.thenCallback) {
                        this.thenCallback(value);
                    }
                });
            }
        }
    };
    var reject = (errValue) => {
        if (this.promiseState == "pendding") {
            this.promiseState = "rejected";
            this.promiseResult = errValue;
            // 判断写没写catch()
            setTimeout(() => {
                console.log(this.catchCallback);
                if (this.catchCallback) {
                    this.catchCallback(errValue);
                } else if (this.thenCallback) {
                    this.thenCallback(errValue);
                } else {
                    throw "catch is not defined!!!!";
                }
            });
        }
    };
    if (fn) {
        fn(resolve, reject);
    }
}
MyPromise.prototype.then = function (callback) {
    return new MyPromise((resolve, reject) => {
        this.thenCallback = (value) => {
            // 在使用链式调用的时候，可能第一个调用的不是catch
            // 使用我们在做检测时会借助then来将catch的信息向下传递
            // 所以我们检测到触发thenCallback的对象是rejected时
            // 我们就继续调用下一个reject
            if (this.promiseState == "rejected") {
                reject(value);
            } else {
                var res = callback(value);
                // 这里防止中间返回是一个promise对象它会继续找then，直接让他调用reject
                if (res instanceof MyPromise && res.promiseState == "rejected") {
                    res.catch((errValue) => {
                        reject(errValue);
                    });
                } else {
                    // 这里定义给变量res在调用resolve是为解决.then()的链式调用
                    resolve(res);
                }
            }
        };
    });
};
MyPromise.prototype.catch = function (callback) {
    return new MyPromise((resolve, reject) => {
        this.catchCallback = (errValue) => {
            var res = callback(errValue);
            reject(errValue);
        };
    });
};
// 封装一个MyPromise.resolve的快捷调用
MyPromise.resolve = (value) => {
    return new MyPromise((resolve, reject) => {
        resolve(value);
    });
};
MyPromise.reject = (errValue) => {
    return new MyPromise((resolve, reject) => {
        reject(errValue);
    });
};
MyPromise.all = (promiseArr) => {
    let resArr = [];
    return new MyPromise((resolve, reject) => {
        promiseArr.forEach((item, index) => {
            item
                .then((res) => {
                    resArr[index] = res;
                    var allResolve = promiseArr.every((_item) => {
                        return _item.promiseState == "fulfilled";
                    });
                    // 判断传过来的数组中所有promise对象状态都已完成
                    if (allResolve) {
                        resolve(resArr);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};
MyPromise.race = (promiseArr) => {
    let resArr = [];
    return new MyPromise((resolve, reject) => {
        promiseArr.forEach((item, index) => {
            item
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};

// ----------测试then的功能
// var p1 = new MyPromise((resolve, reject) => {
// 	resolve(MyPromise.resolve("resolve1"));
// });
// console.log(p1);
// p1.then((res) => {
// 	console.log(res);
// 	console.log("then执行1");
// 	return "第二个resolve";
// })
// 	.then((res) => {
// 		console.log(res);
// 		console.log("then执行2");
// 	})
// 	.then((res) => {
// 		console.log(res);
// 		console.log("then执行3");
// 		return MyPromise.resolve("第三个resolve");
// 	})
// 	.then((res) => {
// 		console.log(res);
// 		console.log("then执行4");
// 	});

// ----------测试catch的功能
var p2 = new MyPromise((resolve, reject) => {
    reject("错误的值");
});
console.log(p2);
p2.then((res) => {
    console.log("then");
}).catch((err) => {
    console.log(err);
    console.log("catch执行");
});

// ----------测试all和race的功能
// let p1 = new MyPromise((reslove, reject) => {
// 	setTimeout(() => {
// 		reslove("第一个promise执行完毕");
// 	}, 1000);
// });
// let p2 = new MyPromise((reslove, reject) => {
// 	setTimeout(() => {
// 		reslove("第二个promise执行完毕");
// 	}, 2000);
// });
// let p3 = new MyPromise((reslove, reject) => {
// 	setTimeout(() => {
// 		reslove("第三个promise执行完毕");
// 	}, 3000);
// });
// MyPromise.all([p1, p3, p2])
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});
// MyPromise.race([p1, p3, p2])
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});







