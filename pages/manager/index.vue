<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Manager',
    layout: false,
    head: {
        titleTemplate: (title: string) => `${title} - 常见问题 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        definePageMeta({ layout: false })
        return () => <nuxt-layout name="manager"></nuxt-layout>
    }
})
</script>
