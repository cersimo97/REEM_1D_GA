import Emitter from './Emitter'
import Field from './Field'
import Receptor from './Receptor'

describe('assign', () => {
  it('Should populate field', () => {
    let f = new Field(10)
    let e = new Emitter(1, 20, 3)
    expect(f.draw()).toEqual('[__________]')
    f.assign(e, 3)
    expect(f.draw()).toEqual('[___*______]')
    f.assign(new Receptor(1), 2)
    expect(f.draw()).toEqual('[__0*______]')
  })

  it('Should throw an error due to range exceeded', () => {
    let f = new Field(10)
    let e = new Emitter(3, 10, 5)
    expect(() => f.assign(e, 9)).toThrow('RANGE_EXCEEDED')
    expect(() => f.assign(e, 11)).toThrow('RANGE_EXCEEDED')
  })
})

describe('getEmitters', () => {
  it('Shuold return emitters', () => {
    let f = new Field(10)
    let e = new Emitter(1, 20, 3)
    f.assign(e, 3)
    let m = new Map([[3, e]])
    expect(f.getEmitters()).toEqual(m)
  })

  it('Should return one emitter with length gt 1', () => {
    let f = new Field(10)
    let e = new Emitter(2, 30, 2)
    f.assign(e, 5)
    expect(f.getEmitters()).toEqual(new Map([[5, e]]))
  })
})

describe('Calc charge decays', () => {
  it('1 emitter', () => {
    let f = new Field(10)
    let e = new Emitter(1, 20, 3)
    f.assign(e, 3)
    f.assign(new Receptor(1), 2)
    f.assign(new Receptor(1), 9)
    expect(f.calc()).toBe(20)
    f.assign(new Receptor(3), 5)
    expect(f.calc()).toBe(40)
  })

  it('2 emitters ', () => {
    let f = new Field(10)
    let e1 = new Emitter(1, 20, 3)
    let e2 = new Emitter(1, 30, 2)
    let r = new Receptor(2)
    // [__*__00_*_]
    f.assign(e1, 2)
    f.assign(e2, 8)
    f.assign(r, 5)

    expect(f.calc()).toBe(50)
  })

  it('2 emitter with different length', () => {
    const field = new Field(20)
    // [___*_000____**______]
    field.assign(new Emitter(1, 20, 3), 3)
    field.assign(new Emitter(2, 10, 5), 12)
    field.assign(new Receptor(3), 5)
    expect(field.calc()).toBe(30)
  })
})
