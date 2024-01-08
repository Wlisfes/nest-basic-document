<script lang="tsx">
import { ref, computed, onMounted, onUnmounted, Fragment } from 'vue'
import { divineDelay, stop } from '@/utils/utils-common'
import { divineMaticChecker } from '@/utils/utils-plugin'

export default defineNuxtComponent({
    name: 'CommonCaptchar',
    props: {
        canvasWidth: { type: Number, default: 310 }, // 主canvas的宽
        canvasHeight: { type: Number, default: 160 }, // 主canvas的高
        puzzleScale: { type: Number, default: 1 }, // 拼图块的大小缩放比例
        sliderSize: { type: Number, default: 40 }, // 滑块的大小
        range: { type: Number, default: 10 }, // 允许的偏差值
        cover: { type: Array, default: () => [] as Array<string> },
        action: { type: String, default: 'login' },
        successText: { type: String, default: '验证通过！' },
        failText: { type: String, default: '验证失败，请重试' },
        sliderText: { type: String, default: '拖动滑块完成拼图' }
    },
    emits: ['close', 'success', 'fail'],
    setup(props, { emit }) {
        const canvas1 = ref<HTMLCanvasElement>()
        const canvas2 = ref<HTMLCanvasElement>()
        const canvas3 = ref<HTMLCanvasElement>()
        const slider = ref<HTMLDivElement>()
        const state = reactive({
            mouseDown: false, // 鼠标是否在按钮上按下
            startWidth: 50, // 鼠标点下去时父级的width
            startX: 0, // 鼠标按下时的X
            newX: 0, // 鼠标当前的偏移X
            pinX: 0, // 拼图的起始X
            pinY: 0, // 拼图的起始Y
            loading: false, // 是否正在加在中，主要是等图片onload
            spiner: false,
            isCanSlide: false, // 是否可以拉动滑动条
            error: false, // 图片加在失败会出现这个，提示用户手动刷新
            infoBoxShow: false, // 提示信息是否出现
            infoText: '', // 提示等信息
            infoBoxFail: false, // 是否验证失败
            timer1: null, // setTimout1
            closeDown: false, // 为了解决Mac上的click BUG
            isSuccess: false, // 验证成功
            imgIndex: -1, // 用于自定义图片时不会随机到重复的图片
            isSubmting: false, // 是否正在判定，主要用于判定中不能点击重置按钮
            reducer: false,
            session: undefined,
            token: undefined
        })

        async function setState(newState: Partial<typeof state> = {}) {
            return Object.assign(state, newState)
        }

        //处理一下sliderSize，弄成整数，以免计算有偏差
        const sliderBaseSize = computed(() => {
            return Math.max(Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)), 10)
        })
        //styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
        const styleWidth = computed(() => {
            const w = state.startWidth + state.newX - state.startX
            return w < sliderBaseSize.value ? sliderBaseSize.value : w > props.canvasWidth ? props.canvasWidth : w
        })
        //图中拼图块的60 * 用户设定的缩放比例计算之后的值 0.2~2
        const puzzleBaseSize = computed(() => {
            return Math.round(Math.max(Math.min(props.puzzleScale, 2), 0.2) * 52.5 + 6)
        })
        const translateX = computed(() => {
            const v1 = styleWidth.value - sliderBaseSize.value
            const v2 = puzzleBaseSize.value - sliderBaseSize.value
            const v3 = styleWidth.value - sliderBaseSize.value
            const v4 = props.canvasWidth - sliderBaseSize.value
            return `translateX(${v1 - v2 * (v3 / v4)}px)`
        })
        const flashTranslateX = computed(() => {
            const v3 = state.isSuccess ? `${props.canvasWidth + props.canvasHeight * 0.578}px` : `-${props.canvasHeight * 0.578}px`
            return `translateX(${v3}) skew(-30deg, 0)`
        })

        onMounted(() => {
            document.addEventListener('mousemove', onRangeMouseMove, false)
            document.addEventListener('mouseup', onRangeMouseUp, false)
            document.addEventListener('touchmove', onRangeMouseMove, { passive: false })
            document.addEventListener('touchend', onRangeMouseUp, false)
            reset()
        })

        onUnmounted(() => {
            document.removeEventListener('mousemove', onRangeMouseMove, false)
            document.removeEventListener('mouseup', onRangeMouseUp, false)
            document.removeEventListener('touchmove', onRangeMouseMove)
            document.removeEventListener('touchend', onRangeMouseUp, false)
        })

        /**鼠标按下准备拖动**/
        function onRangeMouseDown(e: MouseEvent | TouchEvent) {
            if (state.isCanSlide && !state.loading && !state.spiner) {
                setState({
                    mouseDown: true,
                    startWidth: (slider.value as HTMLDivElement).clientWidth,
                    newX: e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX,
                    startX: e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX
                })
            }
        }

        /**鼠标移动**/
        function onRangeMouseMove(e: MouseEvent | TouchEvent) {
            if (state.mouseDown && !state.loading && !state.spiner) {
                e.preventDefault()
                setState({ newX: e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX })
            }
        }

        /**鼠标抬起**/
        function onRangeMouseUp() {
            if (state.mouseDown) {
                setState({ mouseDown: false }).finally(() => {
                    submit()
                })
            }
        }

        /**重置-重新设置初始状态**/
        async function resetState() {
            return await setState({
                infoBoxFail: false,
                infoBoxShow: false,
                isCanSlide: false,
                isSuccess: false,
                startWidth: sliderBaseSize.value, // 鼠标点下去时父级的width
                startX: 0, // 鼠标按下时的X
                newX: 0 // 鼠标当前的偏移X
            })
        }

        /**重置**/
        function reset() {
            if (state.isSubmting) {
                return false
            }
            return resetState().then(() => {
                return initCaptchar()
            })
        }

        /**工具 - 范围随机数**/
        function getRandom(min: number, max: number) {
            return Math.ceil(Math.random() * (max - min) + min)
        }

        /**工具 - 设置图片尺寸cover方式贴合canvas尺寸 w/h**/
        function makeImgSize(image: HTMLImageElement) {
            const imgScale = image.width / image.height
            const canvasScale = props.canvasWidth / props.canvasHeight
            let x = 0,
                y = 0,
                w = 0,
                h = 0
            if (imgScale > canvasScale) {
                h = props.canvasHeight
                w = imgScale * h
                y = 0
                x = (props.canvasWidth - w) / 2
            } else {
                w = props.canvasWidth
                h = w / imgScale
                x = 0
                y = (props.canvasHeight - h) / 2
            }
            return [x, y, w, h]
        }

        /**绘制拼图块的路径**/
        function paintBrick(ctx: CanvasRenderingContext2D) {
            const moveL = Math.ceil(15 * props.puzzleScale) // 直线移动的基础距离
            ctx.beginPath()
            ctx.moveTo(state.pinX, state.pinY)
            ctx.lineTo(state.pinX + moveL, state.pinY)
            ctx.arcTo(state.pinX + moveL, state.pinY - moveL / 2, state.pinX + moveL + moveL / 2, state.pinY - moveL / 2, moveL / 2)
            ctx.arcTo(state.pinX + moveL + moveL, state.pinY - moveL / 2, state.pinX + moveL + moveL, state.pinY, moveL / 2)
            ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY)
            ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL)
            ctx.arcTo(
                state.pinX + moveL + moveL + moveL + moveL / 2,
                state.pinY + moveL,
                state.pinX + moveL + moveL + moveL + moveL / 2,
                state.pinY + moveL + moveL / 2,
                moveL / 2
            )
            ctx.arcTo(
                state.pinX + moveL + moveL + moveL + moveL / 2,
                state.pinY + moveL + moveL,
                state.pinX + moveL + moveL + moveL,
                state.pinY + moveL + moveL,
                moveL / 2
            )
            ctx.lineTo(state.pinX + moveL + moveL + moveL, state.pinY + moveL + moveL + moveL)
            ctx.lineTo(state.pinX, state.pinY + moveL + moveL + moveL)
            ctx.lineTo(state.pinX, state.pinY + moveL + moveL)

            ctx.arcTo(state.pinX + moveL / 2, state.pinY + moveL + moveL, state.pinX + moveL / 2, state.pinY + moveL + moveL / 2, moveL / 2)
            ctx.arcTo(state.pinX + moveL / 2, state.pinY + moveL, state.pinX, state.pinY + moveL, moveL / 2)
            ctx.lineTo(state.pinX, state.pinY)
        }

        /**用canvas随机生成图片**/
        function makeImgWithCanvas() {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            canvas.width = props.canvasWidth
            canvas.height = props.canvasHeight
            ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`
            ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight)
            // 随机画10个图形
            for (let i = 0; i < 12; i++) {
                ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`
                ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(100, 255)},${getRandom(100, 255)})`

                if (getRandom(0, 2) > 1) {
                    // 矩形
                    ctx.save()
                    ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
                    ctx.fillRect(
                        getRandom(-20, canvas.width - 20),
                        getRandom(-20, canvas.height - 20),
                        getRandom(10, canvas.width / 2 + 10),
                        getRandom(10, canvas.height / 2 + 10)
                    )
                    ctx.restore()
                } else {
                    // 圆
                    ctx.beginPath()
                    const ran = getRandom(-Math.PI, Math.PI)
                    ctx.arc(
                        getRandom(0, canvas.width),
                        getRandom(0, canvas.height),
                        getRandom(10, canvas.height / 2 + 10),
                        ran,
                        ran + Math.PI * 1.5
                    )
                    ctx.closePath()
                    ctx.fill()
                }
            }
            return canvas.toDataURL('image/png')
        }

        /**初始化**/
        function initCaptchar(withCanvas: boolean = false) {
            //防止重复加载导致的渲染错误
            if (state.loading && !withCanvas) {
                return false
            }
            //prettier-ignore
            setState({ loading: true, isCanSlide: false }).then(async () => {
                const ctx = canvas1.value?.getContext('2d') as CanvasRenderingContext2D
                const ctx2 = canvas2.value?.getContext('2d') as CanvasRenderingContext2D
                const ctx3 = canvas3.value?.getContext('2d') as CanvasRenderingContext2D
                const isFirefox = false//navigator.userAgent.indexOf('Firefox') >= 0 && navigator.userAgent.indexOf('Windows') >= 0 // 是windows版火狐
                const image = new Image()
                ctx.fillStyle = 'rgba(255,255,255,1)'
                ctx3.fillStyle = 'rgba(255,255,255,1)'
                ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
                ctx2.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
                /**匿名，想要获取跨域的图片**/
                image.crossOrigin = 'anonymous'
                /**取一个随机坐标，作为拼图块的位置**/
                await setState({
                    pinX: getRandom(puzzleBaseSize.value, props.canvasWidth - puzzleBaseSize.value - 20), //留20的边距
                    pinY: getRandom(20, props.canvasHeight - puzzleBaseSize.value - 20), //主图高度 - 拼图块自身高度 - 20边距
                })
                image.onload = async () => {
                    const [x, y, w, h] = makeImgSize(image)
                    ctx.save()
                    //先画小图
                    paintBrick(ctx)
                    ctx.closePath()
                    if (!isFirefox) {
                        ctx.shadowOffsetX = 0
                        ctx.shadowOffsetY = 0
                        ctx.shadowColor = '#000'
                        ctx.shadowBlur = 3
                        ctx.fill()
                        ctx.clip()
                    } else {
                        ctx.clip()
                        ctx.save()
                        ctx.shadowOffsetX = 0
                        ctx.shadowOffsetY = 0
                        ctx.shadowColor = '#000'
                        ctx.shadowBlur = 3
                        ctx.fill()
                        ctx.restore()
                    }
                    ctx.drawImage(image, x, y, w, h)
                    ctx3.fillRect(0, 0, props.canvasWidth, props.canvasHeight)
                    ctx3.drawImage(image, x, y, w, h)

                    // 设置小图的内阴影
                    ctx.globalCompositeOperation = 'source-atop'
                    paintBrick(ctx)
                    ctx.arc(
                        state.pinX + Math.ceil(puzzleBaseSize.value / 2),
                        state.pinY + Math.ceil(puzzleBaseSize.value / 2),
                        puzzleBaseSize.value * 1.2,
                        0,
                        Math.PI * 2,
                        true
                    )
                    ctx.closePath()
                    ctx.shadowColor = 'rgba(255, 255, 255, .8)'
                    ctx.shadowOffsetX = -1
                    ctx.shadowOffsetY = -1
                    ctx.shadowBlur = Math.min(Math.ceil(8 * props.puzzleScale), 12)
                    ctx.fillStyle = '#ffffaa'
                    ctx.fill()
                    // 将小图赋值给ctx2
                    const imgData = ctx.getImageData(
                        state.pinX - 3, //为了阴影 是从-3px开始截取，判定的时候要+3px
                        state.pinY - 20,
                        state.pinX + puzzleBaseSize.value + 5,
                        state.pinY + puzzleBaseSize.value + 5
                    )
                    ctx2.putImageData(imgData, 0, state.pinY - 20)
                    //清理
                    ctx.restore()
                    ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight)
                    // 画缺口
                    ctx.save()
                    paintBrick(ctx)
                    ctx.globalAlpha = 0.8
                    ctx.fillStyle = '#ffffff'
                    ctx.fill()
                    ctx.restore()
                    // 画缺口的内阴影
                    ctx.save()
                    ctx.globalCompositeOperation = 'source-atop'
                    paintBrick(ctx)
                    ctx.arc(
                        state.pinX + Math.ceil(puzzleBaseSize.value / 2),
                        state.pinY + Math.ceil(puzzleBaseSize.value / 2),
                        puzzleBaseSize.value * 1.2,
                        0,
                        Math.PI * 2,
                        true
                    )
                    ctx.shadowColor = '#000'
                    ctx.shadowOffsetX = 2
                    ctx.shadowOffsetY = 2
                    ctx.shadowBlur = 16
                    ctx.fill()
                    ctx.restore()
                    // 画整体背景图
                    ctx.save()
                    ctx.globalCompositeOperation = 'destination-over'
                    ctx.drawImage(image, x, y, w, h)
                    ctx.restore()
                    await setState({ loading: false, isCanSlide: true })
                }

                /**如果图片加载错误就重新来，并强制用canvas随机作图**/
                image.onerror = () => {
                    initCaptchar(true)
                }

                if (!withCanvas && props.cover && props.cover.length) {
                    let randomNum = getRandom(0, props.cover.length - 1)
                    if (randomNum === state.imgIndex) {
                        if (randomNum === props.cover.length - 1) {
                            randomNum = 0
                        } else {
                            randomNum++
                        }
                    }
                    setState({ imgIndex: randomNum }).finally(() => {
                        image.src = props.cover[randomNum] as string
                    })
                } else {
                    image.src = makeImgWithCanvas()
                }
            }).catch(text => {
                setState({
                    loading: false,
                    reducer: true,
                    infoText: text,
                    infoBoxFail: true,
                    infoBoxShow: true,
                    isCanSlide: false
                })
            })
        }

        /**开始判定**/ //prettier-ignore
        function submit() {
            setState({ isSubmting: true, spiner: true }).then(async () => {
                // 偏差 x = puzzle的起始X - (用户真滑动的距离) + (puzzle的宽度 - 滑块的宽度) * （用户真滑动的距离/canvas总宽度）
                // 最后+ 的是补上slider和滑块宽度不一致造成的缝隙
                const x1 = styleWidth.value - sliderBaseSize.value
                const x2 = puzzleBaseSize.value - sliderBaseSize.value
                const x3 = (styleWidth.value - sliderBaseSize.value) / (props.canvasWidth - sliderBaseSize.value)
                const distance = Math.abs(state.pinX - x1 + x2 * x3 - 3)

                if (distance < props.range) {
                    //成功
                    const token = await divineMaticChecker({ action: props.action })
                    await setState({
                        token,
                        infoText: props.successText,
                        infoBoxFail: false,
                        infoBoxShow: true,
                        isCanSlide: false,
                        isSuccess: true
                    })
                    setState({ isSubmting: false, spiner: false }).finally(() => {
                        emit('success', { distance, token: token, reset: reset })
                    })
                } else {
                    //失败
                    await setState({
                        infoText: props.failText,
                        spiner: false,
                        infoBoxFail: true,
                        infoBoxShow: true,
                        isCanSlide: false
                    }).finally(() => {
                        divineDelay(800, () => emit('fail')).then(async () => {
                            await setState({ isSubmting: false })
                            reset()
                        })
                    })
                }
            }).catch(text => {
                setState({
                    infoText: text,
                    spiner: false,
                    infoBoxFail: true,
                    infoBoxShow: true,
                    isCanSlide: false
                }).finally(() => {
                    divineDelay(1500, () => emit('fail')).then(async () => {
                        await setState({ isSubmting: false })
                        reset()
                    })
                })
            })
        }

        return () => (
            <n-element tag="div" class="common-captchar" style={{ width: props.canvasWidth + 32 + 'px' }}>
                <div class="common-captchar__container" onMousedown={stop} onTouchstart={stop}>
                    <div class="common-captchar__context" style={{ height: props.canvasHeight + 'px' }}>
                        <canvas
                            ref={canvas1}
                            width={props.canvasWidth}
                            height={props.canvasHeight}
                            style={{ width: props.canvasWidth + 'px', height: props.canvasHeight + 'px' }}
                        />
                        <canvas
                            ref={canvas3}
                            class={{ 'auth-canvas3': true, 'is-show': state.isSuccess }}
                            width={props.canvasWidth}
                            height={props.canvasHeight}
                            style={{ width: props.canvasWidth + 'px', height: props.canvasHeight + 'px' }}
                        />
                        <canvas
                            ref={canvas2}
                            class="auth-canvas2"
                            width={puzzleBaseSize.value}
                            height={props.canvasHeight}
                            style={{ width: puzzleBaseSize.value + 'px', height: props.canvasHeight + 'px', transform: translateX.value }}
                        />
                        <div class={{ 'auth-loading': true, 'is-hide': !state.loading, 'is-reducer': state.reducer }}>
                            {state.reducer ? (
                                <div class="auth-loading__reducer">
                                    <n-skeleton animated={false} height="100%" width="100%" />
                                    <common-wrapper size={48} name="Debugger"></common-wrapper>
                                </div>
                            ) : (
                                <div class="auth-loading__spin">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            )}
                        </div>
                        <div
                            class={{
                                'auth-info': true,
                                'is-show': state.infoBoxShow,
                                'is-fail': state.infoBoxFail,
                                'is-reducer': state.reducer
                            }}
                        >
                            {state.infoText}
                        </div>
                        <div class={{ 'auth-flash': true, 'is-show': state.isSuccess }} style={{ transform: flashTranslateX.value }}></div>
                    </div>
                    <div class="common-captchar__control">
                        <div class="range-control" style={{ height: sliderBaseSize.value + 'px' }}>
                            <div
                                class="range-control__placeholder"
                                style={{ opacity: state.mouseDown || state.infoBoxFail || state.isSuccess ? 0 : 1 }}
                            >
                                {state.loading || state.spiner ? '' : props.sliderText}
                            </div>
                            <div
                                ref={slider}
                                class={{
                                    'range-control__slider': true,
                                    'is-fail': state.infoBoxFail && !state.reducer,
                                    'is-success': state.isSuccess && !state.reducer
                                }}
                                style={{ width: styleWidth.value + 'px' }}
                            >
                                <div
                                    class={{ 'range-control__button': true, 'is-down': state.mouseDown }}
                                    style={{ width: props.sliderSize + 'px' }}
                                    onMousedown={onRangeMouseDown}
                                    onTouchstart={onRangeMouseDown}
                                >
                                    {state.isSuccess ? (
                                        <div class="n-chunk n-center n-middle" style={{ width: '100%', height: '100%' }}>
                                            <common-wrapper color="#ffffff" size={16} name="InduceBold"></common-wrapper>
                                        </div>
                                    ) : state.infoBoxFail && !state.reducer ? (
                                        <div class="n-chunk n-center n-middle" style={{ width: '100%', height: '100%' }}>
                                            <common-wrapper color="#ffffff" size={16} name="CloseBold"></common-wrapper>
                                        </div>
                                    ) : (
                                        <div class={{ 'button-spin': true, 'is-spiner': state.spiner }}>
                                            {state.spiner ? (
                                                <common-wrapper size={20} name="Debugger"></common-wrapper>
                                            ) : (
                                                <Fragment>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </Fragment>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-captchar {
    position: relative;
    &__container {
        padding: 16px;
        user-select: none;
        border-radius: 3px;
        background-color: var(--card-color);
        border: 1px solid var(--divider-color);
        .auth-loading {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 20;
            opacity: 1;
            transition: opacity 200ms;
            display: flex;
            align-items: center;
            justify-content: center;
            &.is-hide {
                opacity: 0;
                pointer-events: none;
                .auth-loading__spin {
                    span {
                        animation-play-state: paused;
                    }
                }
            }
            &.is-reducer {
                opacity: 1;
            }
            &__reducer {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-bottom: 28px;
                box-sizing: border-box;
                .n-skeleton {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
            &__spin {
                flex: none;
                height: 8px;
                line-height: 0;
                @keyframes load {
                    0% {
                        opacity: 1;
                        transform: scale(1.3);
                    }
                    100% {
                        opacity: 0.2;
                        transform: scale(0.3);
                    }
                }
                span {
                    display: inline-block;
                    width: 8px;
                    height: 100%;
                    margin-left: 2px;
                    border-radius: 50%;
                    background-color: #888;
                    animation: load 1.04s ease infinite;
                    &:nth-child(1) {
                        margin-left: 0;
                    }
                    &:nth-child(2) {
                        animation-delay: 0.13s;
                    }
                    &:nth-child(3) {
                        animation-delay: 0.26s;
                    }
                    &:nth-child(4) {
                        animation-delay: 0.39s;
                    }
                    &:nth-child(5) {
                        animation-delay: 0.52s;
                    }
                }
            }
        }
        .auth-info {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 28px;
            line-height: 28px;
            text-align: center;
            overflow: hidden;
            font-size: 13px;
            background-color: var(--primary-color);
            opacity: 0;
            transform: translateY(28px);
            transition: all 200ms;
            color: #ffffff;
            z-index: 10;
            &.is-show {
                opacity: 0.95;
                transform: translateY(0);
            }
            &.is-fail {
                background-color: var(--error-color);
            }
            &.is-reducer {
                z-index: 20;
            }
        }
        .auth-flash {
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.1);
            z-index: 3;
            &.is-show {
                transition: transform 600ms;
            }
        }
    }

    &__context {
        position: relative;
        overflow: hidden;
        border-radius: 3px;
        .auth-canvas2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 100%;
            z-index: 2;
        }
        .auth-canvas3 {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 600ms;
            z-index: 3;
            &.is-show {
                opacity: 1;
            }
        }
    }

    &__control {
        position: relative;
        .range-control {
            position: relative;
            width: 100%;
            background-color: var(--body-color);
            border-radius: 3px;
            border: 1px solid var(--divider-color);
            margin-top: 16px;
            box-sizing: border-box;
            &__placeholder {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 14px;
                line-height: 24px;
                color: var(--text-color-3);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: center;
                width: 100%;
                transition: opacity 200ms;
            }
            &__slider {
                position: absolute;
                height: 100%;
                width: 40px;
                background-color: rgba(32, 128, 240, 0.16);
                border-radius: 3px;
                transition: background-color 200ms, border 200ms;
                border: 1px solid transparent;
                border-right: none;
                &.is-success {
                    background-color: rgba(24, 160, 88, 0.16);
                    border-color: var(--primary-color);
                    .range-control__button {
                        background-color: var(--primary-color);
                    }
                }
                &.is-fail {
                    background-color: rgba(208, 48, 80, 0.16);
                    border-color: var(--error-color);
                    .range-control__button {
                        background-color: var(--error-color);
                    }
                }
            }
            &__button {
                position: absolute;
                right: 0;
                width: 40px;
                height: 100%;
                border-radius: 3px;
                background-color: var(--card-color);
                box-shadow: 0 0 4px var(--icon-color);
                cursor: pointer;
                transition: background-color 200ms;
                .button-spin {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &.is-spiner {
                        cursor: not-allowed;
                    }
                    & > div {
                        width: 0;
                        height: 40%;
                        transition: all 200ms;
                        &:nth-child(2) {
                            margin: 0 4px;
                        }
                        border: solid 1px var(--info-color);
                    }
                    &:hover,
                    &.is-down {
                        & > div:first-child {
                            border: solid 4px transparent;
                            height: 0;
                            border-right-color: var(--info-color);
                        }
                        & > div:nth-child(2) {
                            border-width: 3px;
                            height: 0;
                            border-radius: 3px;
                            margin: 0 6px;
                            border-right-color: var(--info-color);
                        }
                        & > div:nth-child(3) {
                            border: solid 4px transparent;
                            height: 0;
                            border-left-color: var(--info-color);
                        }
                    }
                }
            }
        }
    }
}
</style>
