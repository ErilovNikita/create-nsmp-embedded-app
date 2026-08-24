#!/usr/bin/env node

import { run } from './main.js'
import { printError } from './ui.js'

run().catch(error => {
    printError(error)
    process.exitCode = error.exitCode ?? 1
})
