export type Handler<T = any> = (event: T) => void
export type Handlers<T> = Array<Handler<T>>
export type MapHandler<Event extends Record<string, Handlers<any>>> = Map<keyof Event, Handlers<Event[keyof Event]>>

export class Observer<Event extends Record<string, any>> {
    private listener: MapHandler<Event>
    constructor() {
        this.listener = new Map()
    }

    public emit<Key extends keyof Event>(type: Key, parameter?: Event[keyof Event]): void {
        const handlers = this.listener.get(type)
        if (handlers && handlers.length > 0) {
            handlers.map(handler => {
                handler(parameter as Event[keyof Event])
            })
        }
    }

    public once<Key extends keyof Event>(type: Key, handler: Handler<Required<Event[keyof Event]>>): void {
        const done = this.on(type, parameter => {
            handler(parameter as Required<Event[keyof Event]>)
            done()
        })
    }

    public on<Key extends keyof Event>(type: Key, handler: Handler<Required<Event[keyof Event]>>): Function {
        const handlers = this.listener.get(type)
        if (handlers) {
            handlers.push(handler)
        } else {
            this.listener.set(type, [handler])
        }
        return () => {
            this.off(type, handler)
        }
    }

    public off<Key extends keyof Event>(type: Key, handler?: Handler<Event[keyof Event]>): void {
        const handlers = this.listener.get(type)
        if (handlers) {
            if (handler) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1)
            } else {
                this.listener.set(type, [])
            }
        }
    }

    public allClear(): void {
        return this.listener.clear()
    }
}
