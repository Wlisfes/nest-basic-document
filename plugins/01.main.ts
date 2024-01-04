import 'virtual:svg-icons-register'
import { useStore } from '@/utils/utils-cookie'
import { useConfiger } from '@/store/configer'
import { useUser } from '@/store/user'

export default defineNuxtPlugin(nuxtApp => {
    const store = useStore()
    const configer = useConfiger(store)
    const user = useUser(store)
    return {
        provide: { store, configer, user }
    }
})
