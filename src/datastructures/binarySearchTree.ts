import { BSTNode, DSStep } from './types';

export function bstInsert(root: BSTNode | null, val: number): BSTNode {
  if (!root) return new BSTNode(val);
  if (val < root.val) {
    root.left = bstInsert(root.left, val);
  } else if (val > root.val) {
    root.right = bstInsert(root.right, val);
  }
  return root;
}

export function buildDefaultBST(): BSTNode {
  let root: BSTNode | null = null;
  const initialValues = [45, 25, 65, 15, 35, 55, 75];
  for (const v of initialValues) {
    root = bstInsert(root, v);
  }
  return root!;
}

export function* bstInorderGen(root: BSTNode | null): Generator<DSStep> {
  if (!root) {
    yield { bst: root, activeNode: null, visited: [], msg: "BST is empty.", codeLine: 1 };
    return;
  }

  const visited: number[] = [];

  function* traverse(node: BSTNode | null): Generator<DSStep, void, unknown> {
    if (!node) return;

    yield {
      bst: root,
      activeNode: node.val,
      visited: [...visited],
      msg: `Visiting node ${node.val}. Traversing left subtree.`,
      codeLine: 2
    };
    yield* traverse(node.left);

    visited.push(node.val);
    yield {
      bst: root,
      activeNode: node.val,
      visited: [...visited],
      isProcessed: true,
      msg: `Processed node ${node.val} in sorted ascending order.`,
      codeLine: 3
    };

    yield {
      bst: root,
      activeNode: node.val,
      visited: [...visited],
      msg: `Traversing right subtree of node ${node.val}.`,
      codeLine: 4
    };
    yield* traverse(node.right);
  }

  yield* traverse(root);

  yield {
    bst: root,
    activeNode: null,
    visited: [...visited],
    msg: `Inorder traversal complete: [${visited.join(', ')}].`,
    codeLine: 5
  };
}

export function* bstSearchGen(root: BSTNode | null, target: number): Generator<DSStep> {
  if (!root) {
    yield { bst: root, activeNode: null, visited: [], msg: "Tree is empty, cannot search.", codeLine: 1 };
    return;
  }

  let curr: BSTNode | null = root;
  const visited: number[] = [];

  while (curr) {
    visited.push(curr.val);
    yield {
      bst: root,
      activeNode: curr.val,
      visited: [...visited],
      msg: `Inspecting node ${curr.val}. Comparing with target ${target}.`,
      codeLine: 2
    };

    if (curr.val === target) {
      yield {
        bst: root,
        activeNode: curr.val,
        visited: [...visited],
        isProcessed: true,
        msg: `Match found! Node ${target} exists in the Binary Search Tree!`,
        codeLine: 3
      };
      return;
    } else if (target < curr.val) {
      yield {
        bst: root,
        activeNode: curr.val,
        visited: [...visited],
        msg: `${target} < ${curr.val}. Moving to left child.`,
        codeLine: 4
      };
      curr = curr.left;
    } else {
      yield {
        bst: root,
        activeNode: curr.val,
        visited: [...visited],
        msg: `${target} > ${curr.val}. Moving to right child.`,
        codeLine: 5
      };
      curr = curr.right;
    }
  }

  yield {
    bst: root,
    activeNode: null,
    visited: [...visited],
    msg: `Target ${target} was not found in the BST.`,
    codeLine: 6
  };
}
