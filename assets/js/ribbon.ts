export async function createRibboner(element: Element, config: { zIndex: number; alpha: number; size: number }) {
    const canvas = document.createElement('canvas')
    const g2d = canvas.getContext('2d') as CanvasRenderingContext2D
    let pr = window.devicePixelRatio || 1
    let width = element.clientWidth
    let height = element.clientHeight
    let f = config.size
    let q: any
    let t: any
    let m = Math
    let r = 0
    let pi = m.PI * 2
    let cos = m.cos
    let random = m.random
    canvas.width = width * pr
    canvas.height = height * pr
    g2d.scale(pr, pr)
    g2d.globalAlpha = config.alpha
    canvas.style.cssText = `opacity: ${config.alpha}; z-index: ${config.zIndex}; pointer-events:none;`
    element.appendChild(canvas)

    function redraw() {
        g2d.clearRect(0, 0, width, height)
        q = [
            { x: 0, y: height * 0.7 + f },
            { x: 0, y: height * 0.7 - f }
        ]
        while (q[1].x < width + f) draw(q[0], q[1])
    }
    function draw(i: any, j: any) {
        g2d.beginPath()
        g2d.moveTo(i.x, i.y)
        g2d.lineTo(j.x, j.y)
        var k = j.x + (random() * 2 - 0.25) * f,
            n = line(j.y)
        g2d.lineTo(k, n)
        g2d.closePath()
        r -= pi / -50
        g2d.fillStyle =
            '#' + (((cos(r) * 127 + 128) << 16) | ((cos(r + pi / 3) * 127 + 128) << 8) | (cos(r + (pi / 3) * 2) * 127 + 128)).toString(16)
        g2d.fill()
        q[0] = q[1]
        q[1] = { x: k, y: n }
    }

    function line(p: any): any {
        t = p + (random() * 2 - 1.1) * f
        return t > height || t < 0 ? line(p) : t
    }

    document.onclick = redraw
    document.ontouchstart = redraw
    return redraw()
}
