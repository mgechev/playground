const worker = new Worker('worker.js');

const buffer = new SharedArrayBuffer(4);
const intArray = new Int32Array(buffer);

worker.postMessage(intArray);

setTimeout(() => {
  Atomics.store(intArray, 0, 3);
}, 100);
