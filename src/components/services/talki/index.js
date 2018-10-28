import Calls from './Calls'
import Member from './Member'

function createInstance(){
    let calls = Calls.createInstance()
    let member = Member.createInstance()

    return {calls, member}
}

export default {
    createInstance
}