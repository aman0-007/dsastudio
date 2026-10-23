import { DSStep } from './types';

export function* queueDemoGen(initialList: number[]): Generator<DSStep> {
  const queue = [...initialList];
  yield {
    list: [...queue],
    action: null,
    index: -1,
    msg: "Queue initialized (FIFO: First In, First Out).",
    codeLine: 1
  };

  const enqVal = Math.floor(Math.random() * 80) + 10;
  yield {
    list: [...queue],
    action: 'enqueue-start',
    val: enqVal,
    index: queue.length,
    msg: `Enqueue: adding ${enqVal} at REAR position.`,
    codeLine: 2
  };

  queue.push(enqVal);
  yield {
    list: [...queue],
    action: 'enqueued',
    index: queue.length - 1,
    msg: `Element ${enqVal} enqueued successfully at position [${queue.length - 1}].`,
    codeLine: 3
  };

  yield {
    list: [...queue],
    action: 'inspect',
    index: 0,
    msg: `Inspecting FRONT element (${queue[0]}).`,
    codeLine: 4
  };

  const deq = queue.shift();
  yield {
    list: [...queue],
    action: 'dequeued',
    val: deq,
    index: 0,
    msg: `Dequeue: removed front element (${deq}). Remaining items shift left.`,
    codeLine: 5
  };

  yield {
    list: [...queue],
    action: null,
    index: -1,
    msg: "Queue operation cycle complete.",
    codeLine: 6
  };
}
