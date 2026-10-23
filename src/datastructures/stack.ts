import { DSStep } from './types';

export function* stackDemoGen(initialList: number[]): Generator<DSStep> {
  const stack = [...initialList];
  yield {
    list: [...stack],
    action: null,
    index: -1,
    msg: "Stack initialized (LIFO: Last In, First Out).",
    codeLine: 1
  };

  const pushVal = Math.floor(Math.random() * 80) + 10;
  yield {
    list: [...stack],
    action: 'push-start',
    val: pushVal,
    index: stack.length,
    msg: `Pushing value ${pushVal} onto the top of the stack.`,
    codeLine: 2
  };

  stack.push(pushVal);
  yield {
    list: [...stack],
    action: 'pushed',
    index: stack.length - 1,
    msg: `Pushed ${pushVal} onto stack. Top index is now ${stack.length - 1}.`,
    codeLine: 3
  };

  yield {
    list: [...stack],
    action: 'inspect',
    index: stack.length - 1,
    msg: `Peeking top element: arr[${stack.length - 1}] = ${stack[stack.length - 1]}.`,
    codeLine: 4
  };

  const popped = stack.pop();
  yield {
    list: [...stack],
    action: 'popped',
    val: popped,
    index: stack.length,
    msg: `Popped top element (${popped}) from the stack.`,
    codeLine: 5
  };

  yield {
    list: [...stack],
    action: null,
    index: -1,
    msg: "Stack operation cycle complete.",
    codeLine: 6
  };
}
