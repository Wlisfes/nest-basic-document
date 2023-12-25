<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonFooter',
    setup(props) {
        return () => (
            <n-layout-footer class="common-footer" style={{ height: '50px' }}>
                <n-element class="layout-pager n-chunk n-center n-middle">
                    <n-p style={{ textAlign: 'center', fontSize: '12px' }}>
                        <n-text style={{ margin: '0 8px' }}>
                            <n-text>Copyright © 2021-2024 Lisfes - </n-text>
                            <nuxt-link
                                style={{ textDecoration: 'none' }}
                                target="_blank"
                                href="https://github.com/Wlisfes/nest-basic-document/blob/master/LICENSE"
                            >
                                <n-button text focusable={false} style={{ fontSize: '12px' }}>
                                    MIT License
                                </n-button>
                            </nuxt-link>
                        </n-text>
                        <nuxt-link
                            style={{ whiteSpace: 'nowrap', margin: '0 8px', textDecoration: 'none' }}
                            target="_blank"
                            href="https://beian.miit.gov.cn"
                        >
                            <n-button text focusable={false} style={{ fontSize: '12px' }}>
                                粤ICP备18016996号-1
                            </n-button>
                        </nuxt-link>
                    </n-p>
                </n-element>
            </n-layout-footer>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-footer {
    position: relative;
    a {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0%;
            height: 1px;
            background-color: var(--primary-color-hover);
            transition: width 0.3s var(--n-bezier);
        }
        &:hover::after {
            width: 100%;
        }
    }
}
</style>
