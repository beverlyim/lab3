import { Transform } from 'stream';

function removeDuplicateLetters() {
  let prevChar = '';
  return new Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString().replace(/\r?\n|\r/g, '');
      let result = '';
      for (let i = 0; i < data.length; i++) {
        if (data[i] !== prevChar) {
          result += data[i];
          prevChar = data[i];
        }
      }
      this.push(result + '\n');
      callback();
    },
  });
}

export { removeDuplicateLetters };
