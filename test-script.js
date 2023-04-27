const Tree = require('./binary-search-tree');

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

function createUnsortedArray() {
  const testArray = [];
  const numberOfNodes = Math.floor(Math.random() * 25) + 25;
  for (let i = 0; i < numberOfNodes; i++) {
    testArray.push(Math.floor(Math.random() * 9999) + 1);
  }
  return testArray;
}

function unbalanceTheTree() {
  const unbalancedArray = [];
  const numberOfNodes = Math.floor(Math.random() * 15) + 20;
  for (let i = 0; i < numberOfNodes; i++) {
    unbalancedArray.push(Math.floor(Math.random() * 4999) + 5001);
  }
  return unbalancedArray;
}

function testScript() {
  const unsortedArray = createUnsortedArray();
  console.log('unsorted array -->', unsortedArray);
  const theTree = new Tree(unsortedArray);
  console.log('assembling balanced binary search tree...\n');
  prettyPrint(theTree.root);
  console.log('isBalanced -->', theTree.isBalanced(), '\n');

  console.log('level order -->', theTree.levelOrder());
  console.log('in order -->', theTree.inOrder());
  console.log('pre order -->', theTree.preOrder());
  console.log('post order -->', theTree.postOrder());
  console.log('unbalanced the tree...\n');
  unbalanceTheTree().forEach((number) => {
    theTree.insert(number);
  });
  prettyPrint(theTree.root);
  console.log('isBalanced -->', theTree.isBalanced(), '\n');
  console.log('rebalancing the tree...\n');
  theTree.rebalance();
  prettyPrint(theTree.root);
  console.log('isBalanced -->', theTree.isBalanced(), '\n');
  console.log('level order -->', theTree.levelOrder());
  console.log('in order -->', theTree.inOrder());
  console.log('pre order -->', theTree.preOrder());
  console.log('post order -->', theTree.postOrder());
}

testScript();
