import { DSStep } from './types';

export function* linkedListTraverseGen(initialList: number[]): Generator<DSStep> {
  const list = [...initialList];
  yield {
    list: [...list],
    action: null,
    index: -1,
    msg: `Singly Linked List ready with ${list.length} nodes. HEAD points to node 0 (${list[0]}).`,
    codeLine: 1
  };

  for (let i = 0; i < list.length; i++) {
    yield {
      list: [...list],
      action: 'traverse',
      index: i,
      val: list[i],
      activePointer: i === 0 ? 'HEAD' : 'CURR',
      msg: `Traversing node ${i} (value: ${list[i]}). Following next pointer ->.`,
      codeLine: 2
    };
  }

  yield {
    list: [...list],
    action: null,
    index: list.length - 1,
    msg: `Reached tail of Linked List. Next pointer is null. Traversal complete!`,
    codeLine: 3
  };
}

export function* linkedListInsertHeadGen(initialList: number[], val: number): Generator<DSStep> {
  const list = [...initialList];
  yield {
    list: [...list],
    action: 'insert-head',
    val,
    index: -1,
    activePointer: 'NEW',
    msg: `Allocating new node with value ${val}. Setting new node's next -> current HEAD (${list[0]}).`,
    codeLine: 1
  };

  list.unshift(val);

  yield {
    list: [...list],
    action: 'insert-head',
    val,
    index: 0,
    activePointer: 'HEAD',
    msg: `Updated HEAD pointer to point to the newly inserted node (${val}).`,
    codeLine: 2
  };
}

export function* linkedListInsertTailGen(initialList: number[], val: number): Generator<DSStep> {
  const list = [...initialList];
  yield {
    list: [...list],
    action: 'insert-tail',
    val,
    index: list.length - 1,
    activePointer: 'TAIL',
    msg: `Traversed to current TAIL node (${list[list.length - 1]}).`,
    codeLine: 1
  };

  list.push(val);

  yield {
    list: [...list],
    action: 'insert-tail',
    val,
    index: list.length - 1,
    activePointer: 'TAIL',
    msg: `Attached new node (${val}) at TAIL and set its next -> null.`,
    codeLine: 2
  };
}

export function* linkedListDeleteGen(initialList: number[], targetVal: number): Generator<DSStep> {
  const list = [...initialList];
  const targetIdx = list.indexOf(targetVal);

  if (targetIdx === -1) {
    yield {
      list: [...list],
      action: null,
      msg: `Target value ${targetVal} was not found in the Linked List.`,
      codeLine: 1
    };
    return;
  }

  // Traversal to target
  for (let i = 0; i <= targetIdx; i++) {
    yield {
      list: [...list],
      action: 'traverse',
      index: i,
      val: list[i],
      msg: `Searching for node to delete: visiting node ${i} (${list[i]}).`,
      codeLine: 2
    };
  }

  yield {
    list: [...list],
    action: 'delete-node',
    index: targetIdx,
    val: targetVal,
    msg: `Found target node (${targetVal}) at index ${targetIdx}. Unlinking node by adjusting predecessor's next pointer.`,
    codeLine: 3
  };

  list.splice(targetIdx, 1);

  yield {
    list: [...list],
    action: null,
    msg: `Node (${targetVal}) unlinked and deallocated successfully.`,
    codeLine: 4
  };
}
