var arr = ['8:01', '9:30', '11:50']
let res = 0
arr.forEach(el => {
    res += new Date('2000/01/01 ' + el).getTime()
})
const a = new Date(res / arr.length)
console.log(`${a.getHours()}:${a.getMinutes()}`)
