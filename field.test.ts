import Emitter from './Emitter'
import Field from './Field'
import Receptor from './Receptor'

it('Should populate field', () => {
  let f = new Field(10)
  let e = new Emitter(1, 20, 3)
  expect(f.draw()).toEqual('[__________]')
  f.assign(e, 3)
  expect(f.draw()).toEqual('[___*______]')
  f.assign(new Receptor(1), 2)
  expect(f.draw()).toEqual('[__0*______]')
})

it('Shuold return emitters', () => {
  let f = new Field(10)
  let e = new Emitter(1, 20, 3)
  f.assign(e, 3)
  let m = new Map([[3, e]])
  expect(f.getEmitters()).toEqual(m)
})

it('Should calc charge decays', () => {
  let f = new Field(10)
  let e = new Emitter(1, 20, 3)
  f.assign(e, 3)
  f.assign(new Receptor(1), 2)
  f.assign(new Receptor(1), 9)
  expect(f.calc()).toBe(20)
  f.assign(new Receptor(3), 5)
  expect(f.calc()).toBe(40)
})
