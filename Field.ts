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
    let es: Map<number, Emitter> = new Map()
    let i = 0
    while (i < this.arr.length) {
      if (this.arr[i].content instanceof Emitter) {
        let e = this.arr[i].content as Emitter
        es.set(i, e)
        i += e.l
      } else {
        i++
      }
    }

    return es
  }

  calc() {
    let emitters = this.getEmitters()
    let charges: number[] = []
    let i = 0
    while (i < this.arr.length) {
      if (emitters.has(i)) {
        i += emitters.get(i)!.l
        continue
      }
      if (this.arr[i].isEmpty()) {
        i++
        continue
      }
      let sum = 0
      let e = emitters.entries()
      let next = e.next()
      while (!next.done) {
        sum += (this.arr[i].content as Receptor).getChargeDecay(
          next.value[1],
          Field.calcMinDistance(next.value, [
            i,
            this.arr[i].content as Receptor,
          ])
        )
        next = e.next()
      }
      charges.push(sum)
      i += (this.arr[i].content as ObjectElement).l
    }
    return charges.reduce((prev, curr) => prev + curr, 0)
  }

  static calcMinDistance(
    [aPos, a]: [number, ObjectElement],
    [bPos, b]: [number, ObjectElement]
  ): number {
    return Math.min(
      Math.abs(aPos - bPos),
      Math.abs(aPos + a.l - bPos),
      Math.abs(aPos - (bPos + b.l)),
      Math.abs(aPos + a.l - (bPos + b.l))
    )
  }
}
