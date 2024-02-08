<script lang="tsx">
import { watch } from 'vue'

interface ItemNode {
    form: {
        account: string
        password: string
    }
}

export default defineNuxtComponent({
    name: 'Document',
    setup(props) {
        const list = ref<Array<ItemNode>>([
            { form: { account: '', password: '' } },
            { form: { account: '111', password: '' } },
            { form: { account: '222', password: '' } }
        ])

        watch(
            () => list.value,
            () => {
                console.log(list.value)
            },
            { deep: true }
        )

        return () => (
            <n-element class="layout-provider">
                <n-h1>Document</n-h1>
                <pre>{JSON.stringify(list.value)}</pre>
                {list.value.map(item => {
                    return <common-form form={item.form}></common-form>
                })}
            </n-element>
        )
    }
})
</script>
