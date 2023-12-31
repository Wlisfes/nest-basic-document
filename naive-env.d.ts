/// <reference types="vite/client" />

import { LoadingBarInst } from 'naive-ui/lib/loading-bar'
import { NotificationApiInjection } from 'naive-ui/lib/notification'
import { DialogApiInjection } from 'naive-ui/lib/dialog'
import { MessageApiInjection } from 'naive-ui/lib/message'

declare global {
    interface Window {
        $message: MessageApiInjection
        $loadingBar: LoadingBarInst
        $notification: NotificationApiInjection
        $dialog: DialogApiInjection
        grecaptcha: {
            ready: (handler: Function) => void
            execute: (key: string, opt: { action: string }) => Promise<string>
        }
        AliyunUpload: {
            Vod: new (option) => any
        }
        JSEncrypt: {
            new (): {
                setPublicKey: (key: string) => void
                encrypt: (data: string) => string
            }
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

declare module 'nodemailer' {
    const nodemailer: any
    export default nodemailer
}
