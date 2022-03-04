import ObjectElement from './ObjectElement'

export default class Cell {
  content: ObjectElement | null

  constructor(obj: ObjectElement | null = null) {
    this.content = obj
  }

  isEmpty() {
    return this.content === null
  }

  pop() {
    let o = this.content
    this.content = null
    return o
  }

  assign(obj: ObjectElement) {
    this.content = obj
  }

  draw() {
    if (this.content instanceof ObjectElement) return this.content.draw()
    else return '_'
  }
}
