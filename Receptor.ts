import Emitter from './Emitter'
import ObjectElement from './ObjectElement'

export default class Receptor extends ObjectElement {
  constructor(l: number) {
    super(l)
  }

  getChargeDecay(e: Emitter, dist: number) {
    if (dist > e.r) return 0
    else return e.charge
  }

  draw() {
    return '0'
  }
}
