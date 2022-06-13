const os = require('os')
const args = require('../indexRoutes')
const express = require('express');

const infoRouter = express.Router();

infoRouter.get('/', (req,res)=>{
    const info = {
        inputArguments: JSON.stringify(args),
        cpuNumber:      os.cpus().length,
        platformName:   process.platform,
        versionNode:    process.version,
        rss:            process.memoryUsage().rss,
        path:           process.argv[0],
        processId:      process.pid,
        projectFolder:  `${process.cwd()}`
    }
    res.render('index', {info})
});

module.exports = infoRouter