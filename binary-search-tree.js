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
        // The inclusion of both is for learning purposes.
        this.rootIterative = this.buildTreeIterative(sortedArray);
        this.rootRecursive = this.buildTreeRecursive(sortedArray);
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

    insert() {}

    delete() {}
}
const testArray = [
    1, 7, 4, 6, 23, 11, 8, 10, 9, 4, 43, 3, 5, 7, 9, 67, 6345, 324,
];
const myTree = new Tree(testArray);

console.log('rootIterative -->', myTree.rootIterative);
console.log('rootRecursive -->', myTree.rootRecursive);

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
prettyPrint(myTree.rootRecursive);
