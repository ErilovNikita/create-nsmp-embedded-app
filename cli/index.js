#!/usr/bin/env node

import { run } from './main.js'

run().catch(error => {
    console.error(error.message)
    process.exitCode = error.exitCode ?? 1
})
