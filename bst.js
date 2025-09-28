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

  insert(value) {
    const nodeToAppend = new Node(value);
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode != null) {
      parentNode = currentNode;
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else if (value === currentNode.data) {
        return;
      }
    }
    if (!parentNode) {
      this.root = nodeToAppend;
    } else if (parentNode.data > value) {
      parentNode.left = nodeToAppend;
    } else if (parentNode.data < value) {
      parentNode.right = nodeToAppend;
    } else {
      console.log("Duplicates not allowed");
    }
  }

  deleteItem(value) {
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode.data !== value) {
      parentNode = currentNode;

      if (value < currentNode.data) {
        //    parentNode = currentNode
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        // parentNode = currentNode
        currentNode = currentNode.right;
        // if (currentNode.right === value) {
        //   parentNode = currentNode;
        // }
      } else {
        return "Node not found in leafNode";
      }
    }
    //Delete node if leaf
    if (currentNode.left === null && currentNode.right === null) {
      console.log(currentNode.data);
      console.log(parentNode);
      if (parentNode.left === currentNode) {
        parentNode.left = null;
      }
      if (parentNode.right === currentNode) {
        parentNode.right = null;
      }
      currentNode = null;
      return this.root;
    }

    //delete node with one child
    if (currentNode.left) {
      //   console.log(currentNode);
      let childNodeLeft = currentNode.left;
      if (childNodeLeft.left === null && childNodeLeft.right === null) {
        currentNode.data = childNodeLeft.data;
        currentNode.left = null;
        childNodeLeft = null;
      }
    } else if (currentNode.right) {
      let childNodeRight = currentNode.right;
      if (childNodeRight.left === null && childNodeRight.left === null) {
        currentNode.data = childNodeRight.data;
        currentNode.right = null;
        childNodeRight = null;
      }
    }

    //delete node with children
    if (currentNode.right && currentNode.left) {
      let subRoot = currentNode;
      // console.log(currentNode)
      currentNode = currentNode.right;

     try { while (currentNode.left.left !== null) {
        currentNode = currentNode.left;
      }
      const successorParent = currentNode
    
      console.log(`parent: ${parentNode.data}`)
      console.log(`subRoot: ${subRoot.data}`)
      console.log(`s-parent: ${successorParent.data}`)
      console.log(`successor: ${currentNode.left.data}`)
      
       subRoot.data = currentNode.left.data;
    // successor.data = deletionNodeData
    successorParent.left = currentNode.left.right
       }
    

    

   
    catch {while(currentNode.left){
        currentNode = currentNode.left
    }
        subRoot.data = currentNode.data
        subRoot.right = currentNode.right
    }
    // subRoot.data = successorData
    // currentNode.data = deletionNodeData
    //   if(currentNode.right){
    //     subRoot.right = currentNode.right
    //   }
    //   if(currentNode.left){
    //     subRoot.left = currentNode.left
    //   }
    //  let thisNode = this.root
    //   while(thisNode != currentNode){
    //     if(thisNode.left === currentNode){
    //         thisNode.left = currentNode.left
    //     } else if(thisNode.right === currentNode){
    //         thisNode.right = currentNode.right
    //     }
        
    // }
    //     thisNode = null
    //  this.deleteItem(deletionNodeData)
    //   parentNode.right === subRoot ? parentNode.right = successor : parentNode.left = successor;
      
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

const prettyPrintBorders = (node, prefix = "", isLeft = true) => {
  
    prettyPrint(node, prefix, isLeft )
    
    console.log(`___________________________`)
    console.log()
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67,66, 325, 6345];
const biggerArray = [44, 3, 40, 82, 38, 17, 91, 10, 33, 89, 11, 48, 39, 58, 88, 76, 31, 73, 46, 98]
const bst = new Tree(testArray);
const binTree = new Tree(biggerArray)
// const blankTree = new Tree();

// prettyPrintBorders(bst.root);

// bst.insert(10000);

// prettyPrintBorders(bst.root);

// blankTree.insert(9);
// prettyPrintBorders(blankTree.root);

// blankTree.insert(9);
// blankTree.insert(12);
// blankTree.insert(345);
// blankTree.insert(76);
// blankTree.insert(99);
// blankTree.insert(1);
// blankTree.insert(0);
// blankTree.insert(3);
// blankTree.insert(6);
// prettyPrintBorders(blankTree.root);

// bst.deleteItem(7)
// // blankTree.deleteItem(6)
prettyPrintBorders(bst.root);
// prettyPrintBorders(blankTree.root);
// bst.deleteItem(324)
bst.deleteItem(4)

prettyPrintBorders(bst.root);
prettyPrintBorders(binTree.root);
