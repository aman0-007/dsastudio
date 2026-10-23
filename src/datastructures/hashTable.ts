import { HashTableState, HashItem, CollisionMode, DSStep } from './types';

export const HASH_TABLE_SIZE = 7;

export function buildDefaultHashTable(mode: CollisionMode = 'chaining'): HashTableState {
  const chains: HashItem[][] = Array.from({ length: HASH_TABLE_SIZE }, () => []);
  const probingSlots: (HashItem | null | 'DELETED')[] = Array.from(
    { length: HASH_TABLE_SIZE },
    () => null
  );

  // Initial seed items with intentional collisions to illustrate resolution
  // 10 % 7 = 3
  // 24 % 7 = 3 (collision at slot 3)
  // 15 % 7 = 1
  // 22 % 7 = 1 (collision at slot 1)
  // 5  % 7 = 5
  const sampleItems: HashItem[] = [
    { key: 10, value: 'Alpha' },
    { key: 24, value: 'Beta' },
    { key: 15, value: 'Gamma' },
    { key: 22, value: 'Delta' },
    { key: 5, value: 'Epsilon' },
  ];

  if (mode === 'chaining') {
    for (const item of sampleItems) {
      const idx = item.key % HASH_TABLE_SIZE;
      chains[idx].push(item);
    }
  } else {
    for (const item of sampleItems) {
      let idx = item.key % HASH_TABLE_SIZE;
      while (probingSlots[idx] !== null) {
        idx = (idx + 1) % HASH_TABLE_SIZE;
      }
      probingSlots[idx] = item;
    }
  }

  return {
    size: HASH_TABLE_SIZE,
    mode,
    chains,
    probingSlots,
  };
}

/**
 * Hash Insert Generator with Collision Handling
 */
export function* hashInsertGen(
  initialTable: HashTableState,
  key: number,
  valStr?: string
): Generator<DSStep> {
  const table: HashTableState = {
    ...initialTable,
    chains: initialTable.chains.map((chain) => [...chain]),
    probingSlots: [...initialTable.probingSlots],
  };

  const M = table.size;
  const hashIdx = ((key % M) + M) % M;
  const value = valStr || `Val_${key}`;

  yield {
    hashTable: table,
    hashComputedIndex: hashIdx,
    hashActiveKey: key,
    hashActiveSlot: hashIdx,
    action: 'hash-compute',
    msg: `Hash Function: h(${key}) = ${key} mod ${M} = slot ${hashIdx}. Evaluating slot index.`,
    codeLine: 1,
  };

  if (table.mode === 'chaining') {
    const bucket = table.chains[hashIdx];

    // Check if key already exists in bucket
    const existingIdx = bucket.findIndex((item) => item.key === key);
    if (existingIdx !== -1) {
      bucket[existingIdx] = { key, value };
      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        hashActiveKey: key,
        hashActiveSlot: hashIdx,
        hashActiveChainIndex: existingIdx,
        action: 'hash-insert',
        msg: `Key ${key} already exists in bucket [${hashIdx}]. Updated value to "${value}".`,
        codeLine: 3,
      };
      return;
    }

    if (bucket.length > 0) {
      // Collision occurred!
      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        hashCollision: true,
        hashActiveKey: key,
        hashActiveSlot: hashIdx,
        action: 'hash-collision',
        msg: `COLLISION DETECTED at slot [${hashIdx}]! Slot already contains ${bucket.length} item(s). Resolving via Separate Chaining linked list.`,
        codeLine: 2,
      };
    }

    bucket.push({ key, value });

    yield {
      hashTable: table,
      hashComputedIndex: hashIdx,
      hashCollision: false,
      hashActiveKey: key,
      hashActiveSlot: hashIdx,
      hashActiveChainIndex: bucket.length - 1,
      action: 'hash-insert',
      msg: `Inserted { key: ${key}, value: "${value}" } into bucket [${hashIdx}] at chain node ${bucket.length - 1}.`,
      codeLine: 3,
    };
  } else {
    // Linear Probing
    let currSlot = hashIdx;
    let probes = 0;

    while (
      table.probingSlots[currSlot] !== null &&
      table.probingSlots[currSlot] !== 'DELETED' &&
      probes < M
    ) {
      const occupiedItem = table.probingSlots[currSlot] as HashItem;
      if (occupiedItem.key === key) {
        table.probingSlots[currSlot] = { key, value };
        yield {
          hashTable: table,
          hashComputedIndex: hashIdx,
          hashActiveKey: key,
          hashActiveSlot: currSlot,
          action: 'hash-insert',
          msg: `Key ${key} already exists at slot [${currSlot}]. Overwrote value with "${value}".`,
          codeLine: 3,
        };
        return;
      }

      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        hashCollision: true,
        hashActiveKey: key,
        hashActiveSlot: currSlot,
        hashProbeCount: probes + 1,
        action: 'hash-collision',
        msg: `COLLISION at slot [${currSlot}] (occupied by key ${occupiedItem.key}). Linear Probing: inspecting next slot (${currSlot} + 1) mod ${M} = ${(currSlot + 1) % M}.`,
        codeLine: 2,
      };

      currSlot = (currSlot + 1) % M;
      probes++;
    }

    if (probes >= M) {
      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        action: 'hash-not-found',
        msg: `Hash Table is completely full! Cannot insert key ${key}.`,
        codeLine: 4,
      };
      return;
    }

    table.probingSlots[currSlot] = { key, value };

    yield {
      hashTable: table,
      hashComputedIndex: hashIdx,
      hashCollision: false,
      hashActiveKey: key,
      hashActiveSlot: currSlot,
      action: 'hash-insert',
      msg: `Slot [${currSlot}] is free! Placed { key: ${key}, value: "${value}" } after ${probes} collision probe(s).`,
      codeLine: 3,
    };
  }
}

/**
 * Hash Search / Lookup Generator
 */
export function* hashSearchGen(
  table: HashTableState,
  key: number
): Generator<DSStep> {
  const M = table.size;
  const hashIdx = ((key % M) + M) % M;

  yield {
    hashTable: table,
    hashComputedIndex: hashIdx,
    hashActiveKey: key,
    hashActiveSlot: hashIdx,
    action: 'hash-compute',
    msg: `Lookup Key ${key}: Computing hash index h(${key}) = ${key} mod ${M} = slot ${hashIdx}.`,
    codeLine: 1,
  };

  if (table.mode === 'chaining') {
    const bucket = table.chains[hashIdx];

    if (bucket.length === 0) {
      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        hashActiveKey: key,
        hashActiveSlot: hashIdx,
        action: 'hash-not-found',
        msg: `Bucket [${hashIdx}] is empty. Key ${key} does not exist in the Hash Table.`,
        codeLine: 4,
      };
      return;
    }

    for (let i = 0; i < bucket.length; i++) {
      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        hashActiveKey: key,
        hashActiveSlot: hashIdx,
        hashActiveChainIndex: i,
        action: 'hash-search',
        msg: `Inspecting chain node ${i} in bucket [${hashIdx}]: comparing key ${bucket[i].key} against target ${key}.`,
        codeLine: 2,
      };

      if (bucket[i].key === key) {
        yield {
          hashTable: table,
          hashComputedIndex: hashIdx,
          hashActiveKey: key,
          hashActiveSlot: hashIdx,
          hashActiveChainIndex: i,
          action: 'hash-found',
          msg: `Match Found! Key ${key} has value "${bucket[i].value}" at bucket [${hashIdx}], chain node ${i}.`,
          codeLine: 3,
        };
        return;
      }
    }

    yield {
      hashTable: table,
      hashComputedIndex: hashIdx,
      hashActiveKey: key,
      hashActiveSlot: hashIdx,
      action: 'hash-not-found',
      msg: `Searched entire chain in bucket [${hashIdx}]. Key ${key} not found.`,
      codeLine: 4,
    };
  } else {
    // Linear Probing Search
    let currSlot = hashIdx;
    let probes = 0;

    while (table.probingSlots[currSlot] !== null && probes < M) {
      const slot = table.probingSlots[currSlot];

      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        hashActiveKey: key,
        hashActiveSlot: currSlot,
        action: 'hash-search',
        msg: `Inspecting slot [${currSlot}]: ${
          slot === 'DELETED'
            ? 'Contains tombstone (DELETED) - continuing probe sequence.'
            : `key is ${slot?.key}.`
        }`,
        codeLine: 2,
      };

      if (slot !== 'DELETED' && slot?.key === key) {
        yield {
          hashTable: table,
          hashComputedIndex: hashIdx,
          hashActiveKey: key,
          hashActiveSlot: currSlot,
          action: 'hash-found',
          msg: `Match Found! Located key ${key} at slot [${currSlot}] with value "${slot.value}".`,
          codeLine: 3,
        };
        return;
      }

      currSlot = (currSlot + 1) % M;
      probes++;
    }

    yield {
      hashTable: table,
      hashComputedIndex: hashIdx,
      hashActiveKey: key,
      hashActiveSlot: currSlot,
      action: 'hash-not-found',
      msg: `Encountered empty slot [${currSlot}]. Key ${key} is not present in Hash Table.`,
      codeLine: 4,
    };
  }
}

/**
 * Hash Delete Generator
 */
export function* hashDeleteGen(
  initialTable: HashTableState,
  key: number
): Generator<DSStep> {
  const table: HashTableState = {
    ...initialTable,
    chains: initialTable.chains.map((chain) => [...chain]),
    probingSlots: [...initialTable.probingSlots],
  };

  const M = table.size;
  const hashIdx = ((key % M) + M) % M;

  yield {
    hashTable: table,
    hashComputedIndex: hashIdx,
    hashActiveKey: key,
    hashActiveSlot: hashIdx,
    action: 'hash-compute',
    msg: `Delete Key ${key}: Computing slot h(${key}) = ${key} mod ${M} = slot ${hashIdx}.`,
    codeLine: 1,
  };

  if (table.mode === 'chaining') {
    const bucket = table.chains[hashIdx];
    const itemIdx = bucket.findIndex((item) => item.key === key);

    if (itemIdx === -1) {
      yield {
        hashTable: table,
        hashComputedIndex: hashIdx,
        hashActiveKey: key,
        hashActiveSlot: hashIdx,
        action: 'hash-not-found',
        msg: `Cannot delete: Key ${key} not found in bucket [${hashIdx}].`,
        codeLine: 4,
      };
      return;
    }

    yield {
      hashTable: table,
      hashComputedIndex: hashIdx,
      hashActiveKey: key,
      hashActiveSlot: hashIdx,
      hashActiveChainIndex: itemIdx,
      action: 'hash-delete',
      msg: `Found key ${key} in bucket [${hashIdx}]. Unlinking node from chain.`,
      codeLine: 3,
    };

    bucket.splice(itemIdx, 1);

    yield {
      hashTable: table,
      hashComputedIndex: hashIdx,
      hashActiveKey: null,
      hashActiveSlot: hashIdx,
      action: 'hash-delete',
      msg: `Successfully deleted key ${key} from Hash Table bucket [${hashIdx}].`,
      codeLine: 4,
    };
  } else {
    // Linear Probing Delete
    let currSlot = hashIdx;
    let probes = 0;

    while (table.probingSlots[currSlot] !== null && probes < M) {
      const slot = table.probingSlots[currSlot];
      if (slot !== 'DELETED' && slot?.key === key) {
        yield {
          hashTable: table,
          hashComputedIndex: hashIdx,
          hashActiveKey: key,
          hashActiveSlot: currSlot,
          action: 'hash-delete',
          msg: `Found key ${key} at slot [${currSlot}]. Marking as tombstone (DELETED) to preserve probe cluster.`,
          codeLine: 3,
        };

        table.probingSlots[currSlot] = 'DELETED';

        yield {
          hashTable: table,
          hashComputedIndex: hashIdx,
          hashActiveKey: null,
          hashActiveSlot: currSlot,
          action: 'hash-delete',
          msg: `Key ${key} deleted. Slot [${currSlot}] is now a tombstone.`,
          codeLine: 4,
        };
        return;
      }
      currSlot = (currSlot + 1) % M;
      probes++;
    }

    yield {
      hashTable: table,
      hashComputedIndex: hashIdx,
      hashActiveKey: key,
      hashActiveSlot: currSlot,
      action: 'hash-not-found',
      msg: `Cannot delete: Key ${key} was not found in the Hash Table.`,
      codeLine: 4,
    };
  }
}

/**
 * Hash Demo Cycle Generator: Demonstrates an insertion that causes a collision and how it's handled!
 */
export function* hashDemoCycleGen(table: HashTableState): Generator<DSStep> {
  // Key 31 % 7 = 3 (will collide with slot 3!)
  yield* hashInsertGen(table, 31, 'Omega');
}
