<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonFooter',
    setup(props) {
        return () => (
            <n-layout-footer class="common-footer n-chunk n-center n-middle">
                <n-p style={{ textAlign: 'center' }}>
                    <n-text style={{ margin: '0 8px' }}>
                        <n-text>Copyright © 2021-2024 Lisfes - </n-text>
                        <n-a type="default" target="_blank" href="https://github.com/Wlisfes/nest-basic-document/blob/master/LICENSE">
                            MIT License
                        </n-a>
                    </n-text>
                    <n-a
                        style={{ whiteSpace: 'nowrap', margin: '0 8px' }}
                        type="default"
                        target="_blank"
                        href="https://beian.miit.gov.cn/#/Integrated/index"
                    >
                        粤ICP备18016996号-1
                    </n-a>
                </n-p>
            </n-layout-footer>
        )
    }
})
</script>

<style scoped lang="scss">
.common-footer {
    height: 60px;
    padding: 0 16px;
    .n-a {
        text-decoration: none;
        color: var(--text-color-2);
        text-decoration-color: var(--text-color-2);
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>
