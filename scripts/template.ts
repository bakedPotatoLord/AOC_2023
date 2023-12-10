import fs from 'node:fs/promises'
import {getInput, numberSum} from './helpers'

const raw = (await getInput(5))
.split("\n")

