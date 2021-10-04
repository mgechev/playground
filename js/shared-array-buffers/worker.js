addEventListener('message', event => {
  const buffer = event.data;
  console.log('First element:', buffer[0]);
  while (Atomics.load(buffer, 0) !== 3);
  console.log('First element:', buffer[0]);
});
