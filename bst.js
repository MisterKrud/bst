#!/usr/bin/node

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = this.arrayCleaner(arr);
    this.root = buildTree(this.arr);
  }

  arrayCleaner(array) {
    if (array === null || array === undefined) array = [];
    array.sort((a, b) => a - b);
    let resultArray = [];

    for (let n = 0; n < array.length; n++) {
      if (array[n] !== array[n + 1]) {
        resultArray.push(array[n]);
      }
    }
    return resultArray;
  }

  insert(key) {
    const nodeToAppend = new Node(key);
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode != null) {
      parentNode = currentNode;
      if (key < currentNode.data) {
        currentNode = currentNode.left;
      } else if (key > currentNode.data) {
        currentNode = currentNode.right;
      } else if (key === currentNode.data) {
        return;
      }
    }
    if (!parentNode) {
      this.root = nodeToAppend;
    } else if (parentNode.data > key) {
      parentNode.left = nodeToAppend;
    } else if (parentNode.data < key) {
      parentNode.right = nodeToAppend;
    } else {
      console.log("Duplicates not allowed?");
    }
  }
}

const buildTree = (arr, start = 0, end = arr.length - 1) => {
  if (arr === null || arr === undefined) end = 0;
  if (start > end) return null;
  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree(testArray);
const blankTree = new Tree();

prettyPrint(bst.root);

bst.insert(10000);

prettyPrint(bst.root);

blankTree.insert(9);
prettyPrint(blankTree.root);

blankTree.insert(9);
blankTree.insert(12);
blankTree.insert(345);
blankTree.insert(76);
blankTree.insert(99);
blankTree.insert(1);
blankTree.insert(0);
blankTree.insert(3);
blankTree.insert(6);
prettyPrint(blankTree.root);
