/* 
函数的柯里化  =》 高阶函数

    一个函数有多个参数，根据这个函数的参数个数，来转化成多个函数，（每个函数只有一个/多个参数）
*/

// function fn(a,b,c){}

// fn(1,2,3)// fn(1)  fn(2)  fn(3)

/* 
判断类型
typeOf  Array.isArray Object.prototype.toString.call(val)===`[object${val}]`
*/



function isType(type) {
    return function (val) {
        return Object.prototype.toString.call(val) === `[object${type}]`
    }

}
let isString = isType('String')
// let isString =curring(isType)('String')

let isNumber = isType('Number')


console.log(isString(222));
console.log(isNumber(2222));
console.log(curring(isType)('String'));



/* 
柯里化 ：公共方法
*/
function sum(a, b, c, d) {
    return a + b + c + d
}

// sum(1,2,3,4)
// 公共的
function curring(fn) {
    let args = []
    const inner = (arr = []) => {
        args.push(...arr)// 拿到所有的参数
        console.log(arr);
        console.log(args);

        return args.length >= fn.length
            ? fn(...args)// 执行sum
            : (...args) => inner(args)

    }
    return inner()
}

let fn = curring(sum)
let fn1 = fn(1)// 
console.log(fn1);
let fn2 = fn1(2, 3)
let fn3 = fn2(4)
console.log(fn3);

let fn4 = curring(sum)(3)(4,5,6)
console.log(fn4);// 18