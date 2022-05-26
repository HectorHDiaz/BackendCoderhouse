const log4js = require('log4js')

log4js.configure({
    appenders:{
        console:{type:'console'},
        infoFile:{type:'file', filename:'info.log'},       
        warningFile:{type:'file', filename:'warn.log'},       
        errorsFile:{type:'file', filename:'error.log'},       
    },
    categories:{
        default:{ appenders:['console'], level: 'trace' },
        console:{appenders:['console'], level:'debug'},
        infoFile:{appenders:['infoFile'], level:'info'},
        warningFile:{appenders:['warningFile'], level:'warn'},
        error:{appenders:['console', 'errorsFile'],  level:'error'}
    }
})

const logger = log4js.getLogger()
const consoleLogger = log4js.getLogger('console')
const infoLogger = log4js.getLogger('infoFile')
const warnLogger = log4js.getLogger('warningFile')
const errorLogger = log4js.getLogger('error')

module.exports = {
    logger,
    consoleLogger,
    infoLogger,
    warnLogger,
    errorLogger
}