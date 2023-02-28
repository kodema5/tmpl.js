import { assert } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { tmpl } from '../mod.js'

Deno.test('template caches output', () => {
    var n = 0
    let t = tmpl`hello ${(a) => a + (++n)}`

    assert(t.build({a:"there"}) === 'hello there1')

    // without context, returns cached output
    //
    assert(t.build() === 'hello there1')

    // when same params, no param changed, returns cached output also
    //
    assert(t.build({a:"there"}) === 'hello there1')

    // when context changed, function will be triggered
    //
    assert(t.build({a:"world"}) === 'hello world2')
})



Deno.test('chaining templates', () => {
    var n = 0
    let t1 = tmpl`hello ${(a) => a + (++n)}`
    let t2 = tmpl`hi ${t1}`

    assert(t2.build({a:"world"}) === 'hi hello world1')
    assert(t2.build() === 'hi hello world1')
})
