/**
 * Clock Class File.
 * https://www.jq22.com/jquery-info1257
 */
//@ts-nocheck
import { moment } from '@/utils/utils-common'

export async function createUtilityClock(container, app, option: { max: number; callback?: Function; animate?: Function }) {
    var dynamic = container.querySelector('.dynamic')
    var hourElement = container.querySelector('.hour')
    var minuteElement = container.querySelector('.minute')
    var secondElement = container.querySelector('.second')
    var minute = function (n) {
        return n % 5 == 0 ? minuteText(n) : minuteLine(n)
    }
    var minuteText = function (n) {
        var element = document.createElement('div')
        element.className = 'minute-text'
        element.innerHTML = (n < 10 ? '0' : '') + n
        position(element, n / 60, 135)
        dynamic.appendChild(element)
    }
    var minuteLine = function (n) {
        var anchor = document.createElement('div')
        anchor.className = 'anchor'
        var element = document.createElement('div')
        element.className = 'element minute-line'
        rotate(anchor, n)
        anchor.appendChild(element)
        dynamic.appendChild(anchor)
    }
    var hour = function (n) {
        var element = document.createElement('div')
        element.className = 'hour-text hour-' + n
        element.innerHTML = n
        position(element, n / 12, 105)
        dynamic.appendChild(element)
    }
    var position = function (element, phase, r) {
        var theta = phase * 2 * Math.PI
        element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px'
        element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px'
    }
    var rotate = function (element, second) {
        element.style.transform = element.style.webkitTransform = 'rotate(' + second * 6 + 'deg)'
    }
    var animate = function () {
        var now = new Date()
        var time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000
        rotate(secondElement, time)
        rotate(minuteElement, time / 60)
        rotate(hourElement, time / 60 / 12)
        option.animate?.({
            date: moment(now).format('HH:mm:ss')
        })
        requestAnimationFrame(animate)
    }
    for (var i = 1; i <= 60; i++) minute(i)
    for (var i = 1; i <= 12; i++) hour(i)
    animate()

    function update() {
        const client = Math.min(app.clientWidth, app.clientHeight)
        const min = client > option.max ? option.max : client
        const scale = min / 350
        container.style.transform = container.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')'
        option.callback?.({
            min,
            client,
            date: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    }
    update()

    return update
}
