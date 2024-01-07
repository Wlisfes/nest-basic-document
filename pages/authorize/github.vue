<script lang="tsx">
export default defineNuxtComponent({
    name: 'GitHub',
    setup(props, { slots }) {
        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">
                <common-wrapper size={128} name="Github"></common-wrapper>
            </n-element>
        )
    }
})
</script>
