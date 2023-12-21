<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { createUtilityClock } from '@/assets/js/clock.min'

export default defineComponent({
    name: 'CommonClock',
    props: {
        max: { type: Number, default: 680 }
    },
    setup(props) {
        const element = useCurrentElement<HTMLDivElement>()
        const clock = ref<HTMLDivElement>()

        onMounted(() => {
            createUtilityClock(clock.value, element.value.parentElement, {
                max: props.max,
                animate: (evt: { date: string }) => false
            }).then(done => {
                window.addEventListener('resize', done)
            })
        })

        return () => (
            <n-element class="common-clock">
                <div class="fill">
                    <div class="reference"></div>
                    <div ref={clock} class="clock" id="utility-clock" style="transform: scale(3.911);">
                        <div class="centre">
                            <div class="dynamic">
                                <div class="anchor" style="transform: rotate(6deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(12deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(18deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(24deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: -116.9px; left: 67.5px;">
                                    05
                                </div>
                                <div class="anchor" style="transform: rotate(36deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(42deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(48deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(54deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: -67.5px; left: 116.9px;">
                                    10
                                </div>
                                <div class="anchor" style="transform: rotate(66deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(72deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(78deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(84deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: 0px; left: 135px;">
                                    15
                                </div>
                                <div class="anchor" style="transform: rotate(96deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(102deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(108deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(114deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: 67.5px; left: 116.9px;">
                                    20
                                </div>
                                <div class="anchor" style="transform: rotate(126deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(132deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(138deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(144deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: 116.9px; left: 67.5px;">
                                    25
                                </div>
                                <div class="anchor" style="transform: rotate(156deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(162deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(168deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(174deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: 135px; left: 0px;">
                                    30
                                </div>
                                <div class="anchor" style="transform: rotate(186deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(192deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(198deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(204deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: 116.9px; left: -67.5px;">
                                    35
                                </div>
                                <div class="anchor" style="transform: rotate(216deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(222deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(228deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(234deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: 67.5px; left: -116.9px;">
                                    40
                                </div>
                                <div class="anchor" style="transform: rotate(246deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(252deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(258deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(264deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: 0px; left: -135px;">
                                    45
                                </div>
                                <div class="anchor" style="transform: rotate(276deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(282deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(288deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(294deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: -67.5px; left: -116.9px;">
                                    50
                                </div>
                                <div class="anchor" style="transform: rotate(306deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(312deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(318deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(324deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: -116.9px; left: -67.5px;">
                                    55
                                </div>
                                <div class="anchor" style="transform: rotate(336deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(342deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(348deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="anchor" style="transform: rotate(354deg);">
                                    <div class="element minute-line"></div>
                                </div>
                                <div class="minute-text" style="top: -135px; left: 0px;">
                                    60
                                </div>
                                <div class="hour-text hour-1" style="top: -90.9px; left: 52.5px;">
                                    1
                                </div>
                                <div class="hour-text hour-2" style="top: -52.5px; left: 90.9px;">
                                    2
                                </div>
                                <div class="hour-text hour-3" style="top: 0px; left: 105px;">
                                    3
                                </div>
                                <div class="hour-text hour-4" style="top: 52.5px; left: 90.9px;">
                                    4
                                </div>
                                <div class="hour-text hour-5" style="top: 90.9px; left: 52.5px;">
                                    5
                                </div>
                                <div class="hour-text hour-6" style="top: 105px; left: 0px;">
                                    6
                                </div>
                                <div class="hour-text hour-7" style="top: 90.9px; left: -52.5px;">
                                    7
                                </div>
                                <div class="hour-text hour-8" style="top: 52.5px; left: -90.9px;">
                                    8
                                </div>
                                <div class="hour-text hour-9" style="top: 0px; left: -105px;">
                                    9
                                </div>
                                <div class="hour-text hour-10" style="top: -52.5px; left: -90.9px;">
                                    10
                                </div>
                                <div class="hour-text hour-11" style="top: -90.9px; left: -52.5px;">
                                    11
                                </div>
                                <div class="hour-text hour-12" style="top: -105px; left: 0px;">
                                    12
                                </div>
                            </div>
                            <div class="expand round circle-1"></div>
                            <div class="anchor hour" style="transform: rotate(641.244deg);">
                                <div class="element thin-hand"></div>
                                <div class="element fat-hand"></div>
                            </div>
                            <div class="anchor minute" style="transform: rotate(7694.93deg);">
                                <div class="element thin-hand"></div>
                                <div class="element fat-hand minute-hand"></div>
                            </div>
                            <div class="anchor second" style="transform: rotate(461696deg);">
                                <div class="element second-hand"></div>
                            </div>
                            <div class="expand round circle-2"></div>
                            <div class="expand round circle-3"></div>
                        </div>
                    </div>
                </div>
            </n-element>
        )
    }
})
</script>

<style scoped lang="scss">
.common-clock {
    z-index: 3;
    .clock {
        position: absolute;
        opacity: 1;
    }
    .fill .clock {
        left: 50%;
        top: 50%;
    }
    .centre,
    :deep(.centre) {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
    }
    .expand,
    :deep(.expand) {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }
    .anchor,
    :deep(.anchor) {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
    }
    .element,
    :deep(.element) {
        position: absolute;
        top: 0;
        left: 0;
    }
    .round,
    :deep(.round) {
        border-radius: 296px;
    }
    .circle-1,
    :deep(.circle-1) {
        background: var(--text-color-base);
        width: 12px;
        height: 12px;
    }
    .circle-2,
    :deep(.circle-2) {
        background: var(--primary-color);
        width: 8px;
        height: 8px;
    }
    .circle-3,
    :deep(.circle-3) {
        background: var(--base-color);
        width: 4px;
        height: 4px;
    }
    .second,
    :deep(.second) {
        transform: rotate(180deg);
    }
    .minute,
    :deep(.minute) {
        transform: rotate(54deg);
    }
    .second-hand,
    :deep(.second-hand) {
        width: 4px;
        height: 164px;
        background: var(--primary-color);
        transform: translate(-50%, -100%) translateY(24px);
        border-radius: 99999px;
    }
    .hour,
    :deep(.hour) {
        transform: rotate(304.5deg);
    }
    .thin-hand,
    :deep(.thin-hand) {
        width: 4px;
        height: 50px;
        background: var(--text-color-base);
        transform: translate(-50%, -100%);
    }
    .fat-hand,
    :deep(.fat-hand) {
        width: 8px;
        height: 50px;
        border-radius: 10px;
        background: var(--text-color-base);
        transform: translate(-50%, -100%) translateY(-18px);
    }
    .minute-hand,
    :deep(.minute-hand) {
        height: 112px;
    }
    .hour-text,
    :deep(.hour-text) {
        position: absolute;
        font: 40px Hei, Helvetica, Arial, sans-serif;
        color: var(--text-color-base);
        transform: translate(-50%, -50%);
    }
    .hour-10,
    :deep(.hour-10) {
        padding-left: 0.4ex;
    }
    .hour-11,
    :deep(.hour-11) {
        padding-left: 0.25ex;
    }
    .minute-text,
    :deep(.minute-text) {
        position: absolute;
        font: 12px Avenir Next, Helvetica, Arial, sans-serif;
        color: var(--text-color-base);
        transform: translate(-50%, -50%);
    }
    .minute-line,
    :deep(.minute-line) {
        background: var(--text-color-base);
        width: 1px;
        height: 9px;
        transform: translate(-50%, -100%) translateY(-131px);
        opacity: 0.34;
    }
}
</style>
