import ObjectElement from './ObjectElement'

export default class Emitter extends ObjectElement {
  charge: number
  r: number

  constructor(l: number, charge: number, r: number) {
    super(l)
    this.charge = charge
    this.r = r
  }

  draw() {
    return '*'
  }
}
