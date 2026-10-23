import { AlgorithmMetadata } from '../types';
import { stackDemoGen } from './stack';
import { queueDemoGen } from './queue';
import { 
  buildDefaultBST, 
  bstInsert, 
  bstInorderGen, 
  bstSearchGen 
} from './binarySearchTree';
import {
  linkedListTraverseGen,
  linkedListInsertHeadGen,
  linkedListInsertTailGen,
  linkedListDeleteGen
} from './linkedList';
import {
  buildDefaultGraph,
  buildStarGraph,
  graphBFSGen,
  graphDFSGen
} from './graph';
import {
  buildDefaultHashTable,
  hashInsertGen,
  hashSearchGen,
  hashDeleteGen,
  hashDemoCycleGen,
  HASH_TABLE_SIZE
} from './hashTable';

export * from './types';
export * from './stack';
export * from './queue';
export * from './binarySearchTree';
export * from './linkedList';
export * from './graph';
export * from './hashTable';

export const DATASTRUCTURE_METADATA: Record<string, AlgorithmMetadata> = {
  hashtable: {
    id: 'hashtable',
    name: 'Hash Table (Collision Resolution)',
    category: 'datastructures',
    complexity: 'Insert/Search: O(1) avg',
    bestTime: 'O(1)',
    worstTime: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'A Hash Table maps keys to values using a hash function h(key) = key % M. When two different keys produce the exact same hash slot (a collision), it resolves them using Separate Chaining (linked lists in each bucket) or Open Addressing (Linear Probing).',
    algorithmSteps: [
      '1. Compute Hash Index: index = hash(key) % table_size.',
      '2. Insert Operation:',
      '   - If slot is empty: place key and value directly in slot.',
      '   - Collision detected: If slot is occupied by a different key, resolve via:',
      '     * Separate Chaining: Append new (key, value) node to the bucket\'s linked list chain.',
      '     * Linear Probing: Inspect slot (index + 1) % M, continuing until finding a free slot or tombstone.',
      '3. Search / Lookup Operation:',
      '   - Jump directly to slot h(key). In Chaining, traverse bucket chain. In Probing, follow probe sequence until matching key or reaching empty slot.',
      '4. Delete Operation:',
      '   - Unlink node from chain (Chaining) or mark slot as DELETED / Tombstone (Probing) to preserve cluster search chains.'
    ],
    javaCode: `import java.util.LinkedList;

// Hash Table with Separate Chaining Collision Resolution
public class HashTable<K, V> {
    static class HashNode<K, V> {
        K key;
        V value;
        HashNode(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    private LinkedList<HashNode<K, V>>[] buckets;
    private int capacity;
    private int size;

    @SuppressWarnings("unchecked")
    public HashTable(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        buckets = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) {
            buckets[i] = new LinkedList<>();
        }
    }

    private int hash(K key) {
        return Math.abs(key.hashCode()) % capacity;
    }

    // Insert key-value pair: O(1) average
    public void insert(K key, V value) {
        int bucketIndex = hash(key);
        LinkedList<HashNode<K, V>> chain = buckets[bucketIndex];

        // Check if key already exists (update value)
        for (HashNode<K, V> node : chain) {
            if (node.key.equals(key)) {
                node.value = value;
                return;
            }
        }

        // Collision handling: append to chain
        chain.add(new HashNode<>(key, value));
        size++;
    }

    // Lookup value by key: O(1) average
    public V get(K key) {
        int bucketIndex = hash(key);
        LinkedList<HashNode<K, V>> chain = buckets[bucketIndex];

        for (HashNode<K, V> node : chain) {
            if (node.key.equals(key)) {
                return node.value;
            }
        }
        return null; // Key not found
    }

    // Delete key from table: O(1) average
    public boolean delete(K key) {
        int bucketIndex = hash(key);
        LinkedList<HashNode<K, V>> chain = buckets[bucketIndex];

        for (int i = 0; i < chain.size(); i++) {
            if (chain.get(i).key.equals(key)) {
                chain.remove(i);
                size--;
                return true;
            }
        }
        return false;
    }
}`,
    pythonCode: `class HashTable:
    def __init__(self, capacity=7):
        self.capacity = capacity
        # Separate chaining: array of bucket lists
        self.table = [[] for _ in range(capacity)]

    def _hash(self, key):
        return hash(key) % self.capacity

    def insert(self, key, value):
        """Insert or update (key, value): O(1) avg"""
        idx = self._hash(key)
        bucket = self.table[idx]

        # Update if key already in bucket
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return

        # Collision resolved: append to chain
        bucket.append((key, value))

    def get(self, key):
        """Lookup key: O(1) avg"""
        idx = self._hash(key)
        for k, v in self.table[idx]:
            if k == key:
                return v
        return None

    def delete(self, key):
        """Delete key: O(1) avg"""
        idx = self._hash(key)
        bucket = self.table[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return True
        return False`,
    pseudocode: [
      'hash(key) = key % table_size',
      'insert(key, val):',
      '  slot = hash(key)',
      '  if slot occupied: collision! append to bucket[slot] chain',
      '  else: bucket[slot] = [(key, val)]',
      'lookup(key):',
      '  slot = hash(key)',
      '  search bucket[slot] chain for key',
      'delete(key):',
      '  slot = hash(key)',
      '  remove key node from bucket[slot]'
    ]
  },
  graph_bfs: {
    id: 'graph_bfs',
    name: 'Graph (Breadth-First Search)',
    category: 'datastructures',
    complexity: 'O(V + E)',
    bestTime: 'O(V + E)',
    worstTime: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Breadth-First Search (BFS) explores a graph level by level from a source vertex. It uses a FIFO Queue to visit all immediate neighbors before diving deeper, finding the shortest path on unweighted graphs.',
    algorithmSteps: [
      '1. Create a boolean visited array and initialize an empty FIFO Queue.',
      '2. Mark the starting node as visited and push it into the queue.',
      '3. While the queue is not empty:',
      '   a. Dequeue the front vertex u.',
      '   b. For every adjacent unvisited neighbor v in adj[u]:',
      '      i. Mark v as visited.',
      '      ii. Enqueue v.',
      '4. Repeat until all reachable vertices have been explored.'
    ],
    javaCode: `import java.util.*;

public class GraphBFS {
    private int V;
    private LinkedList<Integer>[] adj;

    public GraphBFS(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adj[i] = new LinkedList<>();
    }

    public void addEdge(int v, int w) {
        adj[v].add(w);
        adj[w].add(v);
    }

    public void bfs(int s) {
        boolean[] visited = new boolean[V];
        LinkedList<Integer> queue = new LinkedList<>();

        visited[s] = true;
        queue.add(s);

        while (!queue.isEmpty()) {
            int u = queue.poll();
            System.out.print(u + " ");

            for (int n : adj[u]) {
                if (!visited[n]) {
                    visited[n] = true;
                    queue.add(n);
                }
            }
        }
    }
}`,
    pythonCode: `from collections import deque

def bfs(graph, start_node):
    visited = set()
    queue = deque([start_node])
    visited.add(start_node)
    traversal_order = []

    while queue:
        curr = queue.popleft()
        traversal_order.append(curr)

        for neighbor in graph.get(curr, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                
    return traversal_order`,
    pseudocode: [
      'BFS(graph, start):',
      '  queue.enqueue(start)',
      '  mark start as visited',
      '  while queue is not empty:',
      '    u = queue.dequeue()',
      '    visit(u)',
      '    for each v in adj[u]:',
      '      if v is not visited: mark visited, queue.enqueue(v)'
    ]
  },
  graph_dfs: {
    id: 'graph_dfs',
    name: 'Graph (Depth-First Search)',
    category: 'datastructures',
    complexity: 'O(V + E)',
    bestTime: 'O(V + E)',
    worstTime: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Depth-First Search (DFS) starts at a root vertex and explores as far along each branch as possible before backtracking. It uses recursion or an explicit LIFO Stack and is essential for cycle detection and topological sorting.',
    algorithmSteps: [
      '1. Initialize a visited set to keep track of processed vertices.',
      '2. Push the starting vertex onto a LIFO Call Stack.',
      '3. While the stack is not empty:',
      '   a. Pop vertex u from top of stack.',
      '   b. If u is not visited, mark u as visited and record traversal.',
      '   c. For each neighbor v of u, if v is unvisited, push v onto stack.',
      '4. Backtrack when reaching dead ends until the entire graph is traversed.'
    ],
    javaCode: `import java.util.*;

public class GraphDFS {
    private int V;
    private LinkedList<Integer>[] adj;

    public GraphDFS(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adj[i] = new LinkedList<>();
    }

    public void addEdge(int v, int w) {
        adj[v].add(w);
        adj[w].add(v);
    }

    public void dfs(int start) {
        boolean[] visited = new boolean[V];
        dfsUtil(start, visited);
    }

    private void dfsUtil(int v, boolean[] visited) {
        visited[v] = true;
        System.out.print(v + " ");

        for (int n : adj[v]) {
            if (!visited[n]) {
                dfsUtil(n, visited);
            }
        }
    }
}`,
    pythonCode: `def dfs(graph, start_node):
    visited = set()
    traversal_order = []

    def dfs_util(vertex):
        visited.add(vertex)
        traversal_order.append(vertex)

        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                dfs_util(neighbor)

    dfs_util(start_node)
    return traversal_order`,
    pseudocode: [
      'DFS(graph, v, visited):',
      '  mark v as visited',
      '  visit(v)',
      '  for each neighbor u in adj[v]:',
      '    if u is not visited: DFS(graph, u, visited)'
    ]
  },
  stack: {
    id: 'stack',
    name: 'Stack (LIFO)',
    category: 'datastructures',
    complexity: 'Push/Pop: O(1)',
    bestTime: 'O(1)',
    worstTime: 'O(1)',
    spaceComplexity: 'O(n)',
    description: 'A linear data structure following the Last-In, First-Out (LIFO) principle. All operations (push, pop, peek) occur at the single top position of the stack.',
    algorithmSteps: [
      '1. Push(x): Increment top pointer and insert element x at array[top]. O(1) time.',
      '2. Pop(): If stack is not empty, return array[top] and decrement top pointer. O(1) time.',
      '3. Peek(): Return array[top] without removing it. O(1) time.',
      '4. IsEmpty(): Check if top == -1.',
      '5. Underflow: Attempting to pop from an empty stack.',
      '6. Overflow: Attempting to push to a fixed-size full stack.'
    ],
    javaCode: `public class Stack<T> {
    private static final int MAX_SIZE = 1000;
    private int top;
    private int[] a = new int[MAX_SIZE];

    public Stack() {
        top = -1;
    }

    public boolean push(int x) {
        if (top >= (MAX_SIZE - 1)) {
            System.out.println("Stack Overflow");
            return false;
        }
        a[++top] = x;
        return true;
    }

    public int pop() {
        if (top < 0) {
            System.out.println("Stack Underflow");
            return 0;
        }
        return a[top--];
    }

    public int peek() {
        if (top < 0) {
            System.out.println("Stack is Empty");
            return 0;
        }
        return a[top];
    }

    public boolean isEmpty() {
        return (top < 0);
    }
}`,
    pythonCode: `class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self.items.pop()

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0`,
    pseudocode: [
      'push(element): stack[top + 1] = element, top++',
      'pop(): element = stack[top], top--'
    ]
  },
  queue: {
    id: 'queue',
    name: 'Queue (FIFO)',
    category: 'datastructures',
    complexity: 'Enq/Deq: O(1)',
    bestTime: 'O(1)',
    worstTime: 'O(1)',
    spaceComplexity: 'O(n)',
    description: 'A linear data structure that follows the First-In, First-Out (FIFO) principle. Elements are added at the back (rear) and removed from the front.',
    algorithmSteps: [
      '1. Enqueue(x): Insert element at the rear pointer and advance rear. O(1) time.',
      '2. Dequeue(): Retrieve and remove element at front pointer and advance front. O(1) time.',
      '3. Peek(): Inspect the element currently at the front. O(1) time.',
      '4. IsEmpty(): Check if front == rear.'
    ],
    javaCode: `public class Queue {
    private int front, rear, size, capacity;
    private int[] array;

    public Queue(int capacity) {
        this.capacity = capacity;
        front = this.size = 0;
        rear = capacity - 1;
        array = new int[this.capacity];
    }

    public void enqueue(int item) {
        if (size == capacity) return;
        rear = (rear + 1) % capacity;
        array[rear] = item;
        size++;
    }

    public int dequeue() {
        if (size == 0) return Integer.MIN_VALUE;
        int item = array[front];
        front = (front + 1) % capacity;
        size--;
        return item;
    }
}`,
    pythonCode: `from collections import deque

class Queue:
    def __init__(self):
        self.elements = deque()

    def enqueue(self, item):
        self.elements.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return self.elements.popleft()

    def is_empty(self):
        return len(self.elements) == 0`,
    pseudocode: [
      'enqueue(val): queue[rear] = val, rear++',
      'dequeue(): val = queue[front], front++'
    ]
  },
  bst: {
    id: 'bst',
    name: 'Binary Search Tree',
    category: 'datastructures',
    complexity: 'Search: O(log n)',
    bestTime: 'O(log n)',
    worstTime: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'A rooted binary tree data structure where each node satisfies the BST invariant: every key in the left subtree is strictly less than the node’s key, and every key in the right subtree is strictly greater.',
    algorithmSteps: [
      '1. Insert(val): Compare val with current node. If smaller, recurse left; if larger, recurse right. When reaching a null spot, insert new node.',
      '2. Inorder Traversal: Recursively visit left subtree -> visit current node -> visit right subtree. Yields nodes in strictly sorted ascending order!',
      '3. Search(val): If current is null, return not found. If current == val, found. Else branch left or right based on comparison.'
    ],
    javaCode: `public class BinarySearchTree {
    static class Node {
        int key;
        Node left, right;
        public Node(int item) { key = item; }
    }
    Node root;

    public void insert(int key) {
        root = insertRec(root, key);
    }

    private Node insertRec(Node root, int key) {
        if (root == null) return new Node(key);
        if (key < root.key) root.left = insertRec(root.left, key);
        else if (key > root.key) root.right = insertRec(root.right, key);
        return root;
    }
}`,
    pythonCode: `class BSTNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, key):
        self.root = self._insert(self.root, key)

    def _insert(self, node, key):
        if not node: return BSTNode(key)
        if key < node.key: node.left = self._insert(node.left, key)
        elif key > node.key: node.right = self._insert(node.right, key)
        return node`,
    pseudocode: [
      'inorder(node): inorder(node.left), visit(node.val), inorder(node.right)'
    ]
  },
  linkedlist: {
    id: 'linkedlist',
    name: 'Linked List (Singly)',
    category: 'datastructures',
    complexity: 'Insert Head: O(1)',
    bestTime: 'O(1)',
    worstTime: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'A linear collection of data elements called nodes, whose order is not given by their physical placement in memory. Instead, each node contains a value and a reference pointer pointing to the next node in the sequence.',
    algorithmSteps: [
      '1. Insert Head: Create new node, set newNode.next = HEAD, update HEAD = newNode. O(1) time.',
      '2. Insert Tail: Traverse list to find node where next == null, set tail.next = newNode. O(n) or O(1) with tail pointer.',
      '3. Delete Node: Find target node and its predecessor, link predecessor.next = target.next, then delete target. O(n) time.',
      '4. Traversal: Start at HEAD, process current node, move to current.next until reaching null.'
    ],
    javaCode: `public class SinglyLinkedList {
    static class Node {
        int data;
        Node next;
        Node(int d) { data = d; next = null; }
    }
    Node head;

    public void pushFront(int newData) {
        Node newNode = new Node(newData);
        newNode.next = head;
        head = newNode;
    }

    public void append(int newData) {
        Node newNode = new Node(newData);
        if (head == null) { head = newNode; return; }
        Node last = head;
        while (last.next != null) last = last.next;
        last.next = newNode;
    }
}`,
    pythonCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_head(self, val):
        self.head = ListNode(val, self.head)

    def append(self, val):
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node`,
    pseudocode: [
      'insertHead(val): newNode = Node(val), newNode.next = HEAD, HEAD = newNode'
    ]
  }
};
