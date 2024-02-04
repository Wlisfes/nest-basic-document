/// <reference types="vite/client" />

declare global {
    interface Window {
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

declare module 'nodemailer' {
    const nodemailer: any
    export default nodemailer
}
