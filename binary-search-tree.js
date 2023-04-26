class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = this.mergeSortUnique([...new Set(array)]);
    // i am aware that for performance reasons, i'd want to
    // split up these functions and only use the one which was
    // better suited for the specific solution.
    // The inclusion of both is for learning purposes and simplicity.
    this.rootIterative = this.buildTreeIterative(sortedArray);
    this.root = this.buildTreeRecursive(sortedArray);
  }

  buildTreeIterative(array) {
    console.log('sorted array -->', array);

    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const nodeRoot = new Node(array[mid]);

    const q = [
      [nodeRoot, [0, mid - 1]],
      [nodeRoot, [mid + 1, array.length - 1]],
    ];

    while (q.length > 0) {
      const [parent, [left, right]] = q.shift();

      if (left <= right && parent != null) {
        const mid = Math.floor((left + right) / 2);
        const child = new Node(array[mid]);

        if (array[mid] < parent.data) {
          parent.left = child;
        } else {
          parent.right = child;
        }

        q.push([child, [left, mid - 1]]);
        q.push([child, [mid + 1, right]]);
      }
    }

    return nodeRoot;
  }

  buildTreeRecursive(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTreeRecursive(array.slice(0, mid));

    node.right = this.buildTreeRecursive(array.slice(mid + 1));

    return node;
  }

  setRoot(node) {
    this.root = node;
  }

  mergeSortUnique(arr) {
    const array = Array.from(new Set(arr));
    if (array.length === 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = this.mergeSortUnique(array.slice(0, mid));
    const right = this.mergeSortUnique(array.slice(mid));

    const newArray = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        newArray.push(left[i++]);
      } else {
        newArray.push(right[j++]);
      }
    }
    while (i < left.length) {
      newArray.push(left[i++]);
    }
    while (j < right.length) {
      newArray.push(right[j++]);
    }
    return newArray;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) {
      currentNode = new Node(value);
      return currentNode;
    }

    if (currentNode.data === value) return;

    if (value < currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left);
    } else currentNode.right = this.insert(value, currentNode.right);

    return currentNode;
  }

  delete(value, currentNode = this.root) {
    if (currentNode === null) return currentNode;
    if (value < currentNode.data) {
      currentNode.left = this.delete(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.delete(value, currentNode.right);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (this.root.right === null) {
        return this.root.left;
      }

      currentNode.data = this.minValue(currentNode.right);
      currentNode.data = this.delete(value, currentNode.right);
    }
    return currentNode;
  }

  minValue(root) {
    let minV = root.data;
    while (root.left != null) {
      minV = root.left.data;
    }
  }

  find(value, currentNode = this.root) {
    if (currentNode === null || currentNode.data === value) return currentNode
    if (currentNode.data > value) {
      return this.find(value, currentNode.left);
    } else {
      return this.find(value, currentNode.right);
    }
  }

  levelOrder(function(value), ) {
    let currentNode = this.root
    let q = null
    if (currentNode === null) return currentNode

  }
}
const testArray = [
  1, 7, 4, 6, 23, 11, 8, 10, 9, 4, 43, 3, 5, 7, 9, 67, 6345, 324,
];

// [ 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 23, 43, 67, 324, 6345]

const myTree = new Tree(testArray);
myTree.insert(35);
myTree.insert(500);
myTree.delete(8);
console.log('find 23 -->', myTree.find(23))

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(myTree.rootIterative);
prettyPrint(myTree.root);
