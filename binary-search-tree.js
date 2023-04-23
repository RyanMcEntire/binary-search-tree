class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array) {
        const arr = mergeSort([...new set(array)]);
        if (arr.length === 1) return arr;
        const mid = math.floor(arr.length / 2);
        const left = buildTree(arr.slice(0, mid));
        const right = buildTree(arr.slice(mid));
    }
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

console.log(mergeSort([...new Set(testArray)]));

function mergeSort(array) {
    if (array.length === 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid));
    const right = mergeSort(array.slice(mid));

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
