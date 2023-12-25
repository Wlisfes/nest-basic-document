/// <reference types="vite/client" />

import { LoadingBarInst } from 'naive-ui/lib/loading-bar'
import { NotificationApiInjection } from 'naive-ui/lib/notification'
import { DialogApiInjection } from 'naive-ui/lib/dialog'
import { MessageApiInjection } from 'naive-ui/lib/message'
import { CookieStorage } from '@/utils/utils-cookie'

declare global {
    interface Window {
        $message: MessageApiInjection
        $loading: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        $cookie: CookieStorage
        grecaptcha: {
            ready: (handler: Function) => void
            execute: (key: string, opt: { action: 'submit' }) => Promise<string>
        }
        AliyunUpload: {
            Vod: new (option) => any
        }
        LZString: {
            compress: (o: string) => string
            compressToBase64: (r: string) => string
            compressToEncodedURIComponent: (r: string) => string
            compressToUint8Array: (r: string) => Uint8Array
            decompress: (r: string) => string
            decompressFromBase64: (r: string) => string
            decompressFromEncodedURIComponent: (r: string) => string
            decompressFromUint8Array: (r: Uint8Array) => string
        }
    }
}
