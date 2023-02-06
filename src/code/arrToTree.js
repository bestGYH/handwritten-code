import { triggerRef } from "vue"

const arrOld = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
]
function arrToTree(arrList, pid) {
    let treeList = []
    arrList.forEach(item => {
        if (item.pid === pid) {
            const children = arrToTree(arrList, item.id)
            if (children.length > 0) {
                item.children = children
            }
            treeList.push(item)

        }
    })
    return treeList
}


// map写法

// 主要用 has判断有没有。有：get获取。然后设置children .无：set 设置
function arrToTeeMap(list) {
    let result = []
    let map = {}
    if (!Array.isArray(list)) {
        return []
    }
    list.forEach(item=>map[item.id] = item)
    list.forEach((item) => {
        let parent = map[item.pid]
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        }
        result.push(item)
    })
    return result

}



