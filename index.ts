import Emitter from './Emitter'
import Field from './Field'
import Receptor from './Receptor'

const field = new Field(10)

field.assign(new Emitter(1, 20, 3), 3)
field.assign(new Receptor(3), 5)

console.log(field.draw())
console.log(field.calc())
