import type { DialogOptions, DialogReactive, NotificationOptions, NotificationReactive, ButtonProps } from 'naive-ui'

/**对话弹窗二次封装**/
export function createDiscover(
    option: Omit<DialogOptions, 'onAfterEnter' | 'onAfterLeave' | 'onClose' | 'onEsc' | 'onNegativeClick' | 'onPositiveClick'> & {
        onAfterEnter?: (e: HTMLElement, x: DialogReactive) => void | any | undefined
        onAfterLeave?: (x: DialogReactive) => void | any | undefined
        onClose?: (x: DialogReactive) => boolean | Promise<boolean>
        onEsc?: (x: DialogReactive) => void | any | undefined
        onNegativeClick?: (e: MouseEvent, x: DialogReactive) => boolean | Promise<boolean>
        onPositiveClick?: (e: MouseEvent, x: DialogReactive, done: (loading: boolean) => Promise<boolean>) => boolean | Promise<boolean>
    }
): Promise<DialogReactive> {
    return new Promise(async resolve => {
        const { $dialog } = useNuxtApp()
        const vm = $dialog.create({
            ...option,
            negativeButtonProps: { size: 'medium', ...(option.negativeButtonProps as ButtonProps) },
            positiveButtonProps: { size: 'medium', ...(option.positiveButtonProps as ButtonProps) },
            maskClosable: option.maskClosable ?? false,
            autoFocus: option.autoFocus ?? false,
            onAfterEnter: (e: HTMLElement) => {
                option.onAfterEnter ? option.onAfterEnter(e, vm) : undefined
            },
            onAfterLeave: () => {
                return option.onAfterLeave ? option.onAfterLeave(vm) : undefined
            },
            onClose: () => {
                return option.onClose ? option.onClose(vm) : true
            },
            onEsc: () => {
                return option.onEsc ? option.onEsc(vm) : undefined
            },
            onNegativeClick: (e: MouseEvent) => {
                return option.onNegativeClick ? option.onNegativeClick(e, vm) : true
            },
            onPositiveClick: (e: MouseEvent) => {
                return option.onPositiveClick ? option.onPositiveClick(e, vm, async loading => (vm.loading = loading)) : true
            }
        } as DialogOptions)
        resolve(vm)
    })
}

/**通知弹窗二次封装**/
export function createNotice(
    option: Omit<NotificationOptions, 'onLeave' | 'onClose' | 'onAfterLeave' | 'onAfterEnter'> & {
        duration?: number
        type?: NotificationOptions['type']
        onAfterEnter?: (x: NotificationReactive) => void | any | undefined
        onAfterLeave?: (x: NotificationReactive) => void | any | undefined
        onClose?: (x: NotificationReactive) => boolean | Promise<boolean>
        onLeave?: (x: NotificationReactive) => void | any | undefined
    }
): Promise<NotificationReactive> {
    return new Promise(async resolve => {
        const { $notification } = useNuxtApp()
        const vm = $notification.create({
            ...option,
            type: option.type ?? 'success',
            duration: option.duration ?? 2500,
            onAfterEnter: () => {
                return option.onAfterEnter ? option.onAfterEnter(vm) : undefined
            },
            onAfterLeave: () => {
                return option.onAfterLeave ? option.onAfterLeave(vm) : undefined
            },
            onClose: () => {
                return option.onClose ? option.onClose(vm) : true
            },
            onLeave: () => {
                return option.onLeave ? option.onLeave(vm) : undefined
            }
        } as NotificationOptions)
        resolve(vm)
    })
}
