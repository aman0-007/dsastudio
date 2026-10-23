import { GraphNode, GraphEdge, GraphState, DSStep } from './types';

export function buildDefaultGraph(): GraphState {
  const nodes: GraphNode[] = [
    { id: 0, label: '0 (A)', x: 120, y: 160 },
    { id: 1, label: '1 (B)', x: 260, y: 80 },
    { id: 2, label: '2 (C)', x: 260, y: 240 },
    { id: 3, label: '3 (D)', x: 440, y: 70 },
    { id: 4, label: '4 (E)', x: 440, y: 230 },
    { id: 5, label: '5 (F)', x: 580, y: 150 },
  ];

  const edges: GraphEdge[] = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  const adjacencyList: Record<number, number[]> = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 4],
    3: [1, 5],
    4: [1, 2, 5],
    5: [3, 4],
  };

  return { nodes, edges, adjacencyList };
}

export function buildStarGraph(): GraphState {
  const nodes: GraphNode[] = [
    { id: 0, label: 'Hub (0)', x: 350, y: 150 },
    { id: 1, label: 'Node 1', x: 200, y: 70 },
    { id: 2, label: 'Node 2', x: 500, y: 70 },
    { id: 3, label: 'Node 3', x: 500, y: 230 },
    { id: 4, label: 'Node 4', x: 200, y: 230 },
    { id: 5, label: 'Node 5', x: 350, y: 260 },
  ];

  const edges: GraphEdge[] = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 0, to: 5 },
    { from: 1, to: 2 },
    { from: 3, to: 4 },
  ];

  const adjacencyList: Record<number, number[]> = {
    0: [1, 2, 3, 4, 5],
    1: [0, 2],
    2: [0, 1],
    3: [0, 4],
    4: [0, 3],
    5: [0],
  };

  return { nodes, edges, adjacencyList };
}

/**
 * Breadth-First Search (BFS) generator
 */
export function* graphBFSGen(graph: GraphState, startNodeId: number = 0): Generator<DSStep> {
  const visited = new Set<number>();
  const queue: number[] = [startNodeId];
  const traversalOrder: number[] = [];
  visited.add(startNodeId);

  yield {
    graph,
    activeNode: startNodeId,
    activeEdge: null,
    visited: Array.from(visited),
    frontier: [...queue],
    frontierType: 'queue',
    traversalOrder: [...traversalOrder],
    action: 'graph-visit',
    msg: `BFS Initialized: Started at Node ${startNodeId}. Added to FIFO Queue and marked as visited.`,
    codeLine: 1
  };

  while (queue.length > 0) {
    const curr = queue.shift()!;
    traversalOrder.push(curr);

    yield {
      graph,
      activeNode: curr,
      activeEdge: null,
      visited: Array.from(visited),
      frontier: [...queue],
      frontierType: 'queue',
      traversalOrder: [...traversalOrder],
      action: 'graph-visit',
      msg: `Dequeued Node ${curr} from front. Visiting node and checking adjacent neighbors.`,
      codeLine: 2
    };

    const neighbors = graph.adjacencyList[curr] || [];

    for (const neighbor of neighbors) {
      yield {
        graph,
        activeNode: curr,
        activeEdge: { from: curr, to: neighbor },
        visited: Array.from(visited),
        frontier: [...queue],
        frontierType: 'queue',
        traversalOrder: [...traversalOrder],
        action: 'graph-edge',
        msg: `Inspecting edge (${curr} -> ${neighbor}). Neighbor visited? ${visited.has(neighbor) ? 'YES (Skip)' : 'NO (Enqueue)'}.`,
        codeLine: 3
      };

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        yield {
          graph,
          activeNode: neighbor,
          activeEdge: { from: curr, to: neighbor },
          visited: Array.from(visited),
          frontier: [...queue],
          frontierType: 'queue',
          traversalOrder: [...traversalOrder],
          action: 'graph-visit',
          msg: `Discovered unvisited Node ${neighbor}. Marked visited and enqueued at rear.`,
          codeLine: 4
        };
      }
    }
  }

  yield {
    graph,
    activeNode: null,
    activeEdge: null,
    visited: Array.from(visited),
    frontier: [],
    frontierType: 'queue',
    traversalOrder: [...traversalOrder],
    action: null,
    msg: `BFS Traversal Complete! Order visited: [${traversalOrder.join(' -> ')}].`,
    codeLine: 5
  };
}

/**
 * Depth-First Search (DFS) generator
 */
export function* graphDFSGen(graph: GraphState, startNodeId: number = 0): Generator<DSStep> {
  const visited = new Set<number>();
  const stack: number[] = [startNodeId];
  const traversalOrder: number[] = [];

  yield {
    graph,
    activeNode: startNodeId,
    activeEdge: null,
    visited: Array.from(visited),
    frontier: [...stack],
    frontierType: 'stack',
    traversalOrder: [...traversalOrder],
    action: 'graph-visit',
    msg: `DFS Initialized: Starting at Node ${startNodeId}. Pushed to LIFO Call Stack.`,
    codeLine: 1
  };

  while (stack.length > 0) {
    const curr = stack.pop()!;

    if (!visited.has(curr)) {
      visited.add(curr);
      traversalOrder.push(curr);

      yield {
        graph,
        activeNode: curr,
        activeEdge: null,
        visited: Array.from(visited),
        frontier: [...stack],
        frontierType: 'stack',
        traversalOrder: [...traversalOrder],
        action: 'graph-visit',
        msg: `Popped Node ${curr} from stack top. Marked as visited and exploring branch.`,
        codeLine: 2
      };

      const neighbors = graph.adjacencyList[curr] || [];
      // Push neighbors in reverse to visit in ascending order
      const reversedNeighbors = [...neighbors].reverse();

      for (const neighbor of reversedNeighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);

          yield {
            graph,
            activeNode: curr,
            activeEdge: { from: curr, to: neighbor },
            visited: Array.from(visited),
            frontier: [...stack],
            frontierType: 'stack',
            traversalOrder: [...traversalOrder],
            action: 'graph-edge',
            msg: `Found unvisited neighbor ${neighbor} from node ${curr}. Pushed to Call Stack.`,
            codeLine: 3
          };
        } else {
          yield {
            graph,
            activeNode: curr,
            activeEdge: { from: curr, to: neighbor },
            visited: Array.from(visited),
            frontier: [...stack],
            frontierType: 'stack',
            traversalOrder: [...traversalOrder],
            action: 'graph-edge',
            msg: `Neighbor ${neighbor} is already visited. Skipping back-edge.`,
            codeLine: 4
          };
        }
      }
    }
  }

  yield {
    graph,
    activeNode: null,
    activeEdge: null,
    visited: Array.from(visited),
    frontier: [],
    frontierType: 'stack',
    traversalOrder: [...traversalOrder],
    action: null,
    msg: `DFS Traversal Complete! Order visited: [${traversalOrder.join(' -> ')}].`,
    codeLine: 5
  };
}
