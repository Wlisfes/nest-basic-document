/**生成时间戳组合数字**/
export async function divineIntNumber(pad: number = 16) {
    const date = Math.floor(Date.now() / 1000)
    const suffix = [Math.random(), Math.random()].map(x => x.toString().slice(2))
    return [date, ...suffix].join('').slice(0, pad)
}
