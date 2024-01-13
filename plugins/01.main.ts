import 'virtual:svg-icons-register'
import { useStore } from '@/utils/utils-cookie'
import { useConfiger } from '@/store/configer'
import { useUser } from '@/store/user'
import { useManager } from '@/store/manager'

export default defineNuxtPlugin(nuxtApp => {
    const store = useStore()
    const configer = useConfiger(store)
    const user = useUser(store)
    const manager = useManager(store)
    return {
        provide: { store, configer, user, manager }
    }
})
