import Talki from './talki'

function createInstance() {
    let talki = Talki.createInstance()

    return { talki }
}

let defaultInstance = createInstance()

export default defaultInstance