
export function deepClone(obj, hash = new WeakMap()) {
    if (obj) {
        // 处理日期类型
        if (obj instanceof Date) return new Date(obj);
        // 处理正则类型
        if (obj instanceof RegExp) return new RegExp(obj);
        // 普通值或函数不需要深拷贝
        if (typeof obj !== "object") return obj;
        // // 对象进行深拷贝
        if (hash.get(obj)) return hash.get(obj);
        // let cloneObj = new obj.constructor();
        // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
        // hash.set(obj, cloneObj);
        // for (let key in obj) {
        //   if (obj.hasOwnProperty(key)) {
        //     // 实现一个递归拷贝
        //     cloneObj[key] = deepClone(obj[key], hash);
        //   }
        // }
        let cloneObj = obj instanceof Array ?[]:{}
        if (typeof obj === "object") {
            for (let key in obj) {
                
                // eslint-disable-next-line no-prototype-builtins
                if (obj.hasOwnProperty(key)) {// 忽略从原型后面继承的对象
                    if (obj[key] && typeof obj[key] === "object") {
                        cloneObj[key] = deepClone(obj[key]);
                    } else {
                        cloneObj[key] = obj[key];
                    }
                }
            }
        }
        return cloneObj;
    }
    // 处理null或者undefined
    return obj

}



// 深拷贝完整版(解决循环引用)
function deepClonePlus(obj, hash = new WeakMap()) {
    if (obj == null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Error) return new Error(obj.message)
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝，hash判断是否已存在当前对象
    if (hash.has(obj)) return hash.get(obj);

    let cloneObj = new obj.constructor(); //新建空数组或空对象
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身(构造函数)
    hash.set(obj, cloneObj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现一个递归拷贝
            cloneObj[key] = deepClonePlus(obj[key], hash);
        }
    }
    return cloneObj;
}
