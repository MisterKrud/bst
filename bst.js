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

  #parent = null;
  #n = 0

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
    //Delete node if leaf
    const nodeValue = this.find(value)
    let currentNode = nodeValue.currentNode
    let parentNode = nodeValue.parentNode

    if (currentNode.left === null && currentNode.right === null) {
      if (parentNode.left === currentNode) {
        parentNode.left = null;
      }

      if (parentNode.right === currentNode) {
        parentNode.right = null;
      }

      currentNode = null;

      return prettyPrintBorders(this.root);
    }

    //delete node with one child
    if (!currentNode.left || !currentNode.right) {
      this.find(value);

      if (currentNode.left) {
        if (parentNode.left === currentNode) {
          parentNode.left = currentNode.left;
        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.left;
        }

      } else if (currentNode.right) {
        if (parentNode.left === currentNode) {
          parentNode.left = currentNode.right;

        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.right;
        }
      }

      return prettyPrintBorders(this.root);
    }

    //delete node with children

    if (currentNode.right && currentNode.left) {
      this.find(value);

      let successorParent;
      let subRoot = currentNode;
      let successor;
      currentNode = currentNode.right;

      if (value === this.root) {
      }

      if (!currentNode.left) {
        subRoot.right = currentNode.right;
        subRoot.data = currentNode.data;

      } else {

        while (currentNode.left) {
          successorParent = currentNode;
          currentNode = currentNode.left;
          successor = currentNode;
        }

        subRoot.data = successor.data;
        successorParent.left = successor.right;
      }
    }
  }

  find(value, currentNode = this.root) {
    this.#n = 0
    let parentNode

    try {
      while (currentNode.data !== value) {

        if (value < currentNode.data) {
          parentNode = currentNode
          currentNode = currentNode.left;
          this.#n++

        } else if (value > currentNode.data) {
          parentNode = currentNode
          currentNode = currentNode.right;
          this.#n++

        }
      }

    } catch { 
      return (`${value} not found in tree`) 
    }

    return { currentNode, parentNode }

  }



  levelOrderForEach(callback, node = this.root) {
    const queueArray = [node]

    if (callback === undefined) {
      throw new Error("Argument must contain a function")

    } else {

      while (queueArray.length >= 1) {

        callback(queueArray[0])

        if (queueArray[0].left !== null && queueArray[0].right !== null) {
          queueArray.push(queueArray[0].left, queueArray[0].right);

        } else if (queueArray[0].left !== null && queueArray[0].right === null) {
            queueArray.push(queueArray[0].left)

          } else if (queueArray[0].right !== null && queueArray[0].left === null) {
              queueArray.push(queueArray[0].right)
            }

        queueArray.shift(queueArray[0])

      }
    }
  }
  preOrderForEach(callback, node = this.root) {

    if (callback === undefined) {
      throw new Error("Argument must contain a function")

    } else {
      if (node === null) {

        return
      }
      callback(node)
      this.preOrderForEach(callback, node.left);
      this.preOrderForEach(callback, node.right)
    }
  }


  postOrderForEach(callback, node = this.root) {
    if (callback === undefined) {
      throw new Error("Argument must contain a function")

    } else {
      if (node === null) {
        return
      }
      this.postOrderForEach(callback, node.left)
      this.postOrderForEach(callback, node.right)
      callback(node)
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (callback === undefined) {
      throw new Error("Argument must contain a function")

    } else {
      if (node === null) {
        return
      }

      this.inOrderForEach(callback, node.left)
      callback(node)
      this.inOrderForEach(callback, node.right);
    }
  }


  height(value, node = this.find(value).currentNode) {
    let h = 0
    this.levelOrderForEach(item => {
      let d = this.depth(item.data, node)
      if (h < d) {
        h = d
      }
    }, node)
    return h
  }

  depth(value, node = this.root) {
    this.find(value, node)
    return this.#n
  }

  isBalanced() {
    let b = 0
    let h
    this.levelOrderForEach(node => {
      if (node.left && node.right) {
        h = (this.height(node.left.data) - this.height(node.right.data))
      } if(!node.right && node.left || !node.left && node.right) 
        {
        h = this.height(node.data)
      }
      b < h ? b = h : b
    })
    return b <= -2 || b >= 2 ? false : true
  }

  rebalance() {
    const newArray = []
    this.inOrderForEach(node => newArray.push(node.data));
    this.root = buildTree(newArray)
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

  prettyPrint(node, prefix, isLeft)

  console.log(`___________________________`)
  console.log()
}

const randomArray = (size = 21) => {
  let arr = []
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100))
  }
  return arr
}


//Driver script
const bst = new Tree(randomArray());
prettyPrintBorders(bst.root);
console.log(`Balanced: ${bst.isBalanced()}`);
console.log(`-----------Level Order------------`)
bst.levelOrderForEach((node) => console.log(node.data))
console.log(`-----------Pre-Order------------`)
bst.preOrderForEach((node) => console.log(node.data))
console.log(`-----------Post-Order------------`)
bst.postOrderForEach((node) => console.log(node.data))
console.log(`-----------In-Order------------`)
bst.inOrderForEach((node) => console.log(node.data))
bst.insert(150)
bst.insert(299)
bst.insert(134)
bst.insert(109)
console.log(`----------Unbalanced------------`)
prettyPrintBorders(bst.root);
console.log(`Balanced: ${bst.isBalanced()}`);
bst.rebalance()
prettyPrintBorders(bst.root);
console.log(`Balanced: ${bst.isBalanced()}`);
console.log(`-----------Level Order------------`)
bst.levelOrderForEach((node) => console.log(node.data))
console.log(`-----------Pre-Order------------`)
bst.preOrderForEach((node) => console.log(node.data))
console.log(`-----------Post-Order------------`)
bst.postOrderForEach((node) => console.log(node.data))
console.log(`-----------In-Order------------`)
bst.inOrderForEach((node) => console.log(node.data))
