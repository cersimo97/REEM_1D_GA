import Cell from './Cell'
import Emitter from './Emitter'
import ObjectElement from './ObjectElement'
import Receptor from './Receptor'

export default class Field {
  l: number
  arr: Cell[]

  constructor(l: number) {
    this.l = l
    let arr = new Array(l)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Cell()
    }
    this.arr = arr
  }

  countEmptyCells() {
    return this.arr.reduce(
      (prev: number, curr: Cell) => prev + (curr.isEmpty() ? 1 : 0),
      0
    )
  }

  assign(obj: ObjectElement, pos: number) {
    if (pos < 0 || pos >= this.arr.length || pos + obj.l - 1 >= this.arr.length)
      throw new Error('RANGE_EXCEEDED')
    for (let i = 0; i < obj.l; i++) {
      this.arr[pos + i].assign(obj)
    }
  }

  draw() {
    return `[${this.arr.map(c => c.draw()).join('')}]`
  }

  getEmitters() {
    let es: [Emitter, number][] = []
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].content instanceof Emitter) {
        es.push([this.arr[i].content as Emitter, i])
      }
    }

    return es
  }

  calc() {
    let emitters = this.getEmitters()
    let charges: number[] = []
    let i = 0
    while (i < this.arr.length) {
      if (emitters.map(m => m[1]).includes(i)) {
        charges[i] = 0
        i += (this.arr[i].content as ObjectElement).l
        continue
      }
      if (this.arr[i].isEmpty()) {
        charges[i] = 0
        i++
        continue
      }
      charges[i] = emitters.reduce(
        (prev, curr) =>
          prev +
          (this.arr[i].content as Receptor).getChargeDecay(
            curr[0],
            Math.abs(curr[1] - i)
          ),
        0
      )
      i += (this.arr[i].content as ObjectElement).l
    }
    return charges.reduce((prev, curr) => prev + curr, 0)
  }
}
