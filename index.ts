import Emitter from './Emitter'
import Field from './Field'
import Receptor from './Receptor'

const field = new Field(20)

field.assign(new Emitter(1, 20, 3), 3)
field.assign(new Receptor(3), 5)
field.assign(new Emitter(2, 10, 5), 12)

console.log(field.draw())
console.log('Total charge: ', field.calc())
