/* 
    高阶函数：
        1、一个函数的参数，参数是一个函数 ，叫高阶函数（回调函数）
        2、一个函数的返回值，是一个函数
        运用：

 */



function coreFn(a,) {
    console.log('before fn')
    console.log(a);//1
    // 处理核心逻辑前，要先进行其他处理
    console.log('核心逻辑');
}
// 这是其他处理方法
Function.prototype.before = function (beforeFn) {
    // console.log(beforeFn);
    /* console.log结果-----
    ()=>{
        console.log('before fn');
    } 
    */
    return (...args) => {
        beforeFn()
        this(...args)// 谁调用this是谁，执行coreFn（）
        console.log(...args);// [1,2,3]
    }
}
let newFns = coreFn.before(() => {
    console.log('before fn');
});// newFns ===  coreFn.before 的执行结果。 也就是上面的return

newFns(1, 2, 3)




