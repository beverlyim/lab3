#!/usr/bin/env node

import { createReadStream, createWriteStream } from 'fs';
import { pipeline as _pipeline } from 'stream';
import { promisify } from 'util';
import { program } from 'commander';

import { removeDuplicateLetters } from './module/removeDuplicates.js';

const pipeline = promisify(_pipeline);

const actions = async () => {
  const { input, output } = program.opts();

  const readStream = input ? createReadStream(input) : process.stdin;
  const writeStream = output ? createWriteStream(output, { flags: 'a' }) : process.stdout;

  try {
    await pipeline(readStream, removeDuplicateLetters(), writeStream);
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exit(1);
  }
};

program
  .requiredOption('-t, --task <task>', 'An action to perform')
  .option('-i, --input <filename>', 'An input file')
  .option('-o, --output <filename>', 'An output file');

program.parse(process.argv);
console.log(program.task)
actions();
//тут затуп короче не знаю почему в program.task передается undefined поэтому выбор задачи тупа не работает 
