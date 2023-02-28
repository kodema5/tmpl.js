import { MemoFunction } from './deps.js'

// refreshable string template with memoized functions
//
let Tmpl = class {
    constructor(strings, funcs) {
        this.strings = strings
        this.functions = funcs
            .map(f => {
                return typeof(f) === 'function'
                    ? new MemoFunction(f)
                    : (() => f)
            })
    }


    build(context) {
        let n = arguments.length
        return this.strings
            .map((str, indx) => {
                let f = this.functions[indx]
                let t = f ? (n===0 ? f.call(): f.call(context)) : ''
                if (t && t instanceof Tmpl) {
                    t = context ? t.build(context) : t.build()
                }
                return [
                    str,
                    t,
                ]
            })
            .flat()
            .filter(Boolean)
            .join('')
    }
}

export let tmpl = (strings, ...funcs) => {
    return new Tmpl(strings, funcs)
}
