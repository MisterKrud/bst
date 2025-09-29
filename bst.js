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
    this.list = linkedList()
  }

#parent = null;

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
    let parentNode 

    //Delete node if leaf

    const nodeValue = this.find(value)
    currentNode = nodeValue.currentNode
    parentNode = nodeValue.parentNode
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

      return prettyPrintBorders(this.root);
    }
    prettyPrintBorders(this.root);
  }

  find(value) {
    let currentNode = this.root;
    let parentNode = this.#parent

     try {while (currentNode.data !== value) {

        if (value < currentNode.data) {
          parentNode = currentNode
          currentNode = currentNode.left;
        } else if (value > currentNode.data) {
          parentNode = currentNode
          currentNode = currentNode.right;
        }    
      }
    } catch { return (`${value} not found in tree`)}
    
    return {currentNode, parentNode}
  }
  
  levelOrderForEach(callback){
    prettyPrintBorders(this.root)
        let current = this.root;
    const queueArray = [current]

    if(callback === undefined){
        throw new Error ("Argument must contain a function")
    } else {
        
        while(queueArray.length>=1){
        // console.log(queueArray[0].data)
        // this.list.append(queueArray[0].data)

        console.log(callback(queueArray[0].data))
       if(queueArray[0].left !== null && queueArray[0].right !== null){
        queueArray.push(queueArray[0].left, queueArray[0].right);
        //  queueArray.shift(queueArray[0])
       } else
       if(queueArray[0].left !==null&&queueArray[0].right === null){
        queueArray.push(queueArray[0].left)
      
       } else
       if(queueArray[0].right !== null && queueArray[0].left === null){
        queueArray.push(queueArray[0].right)
         
       }
        
         queueArray.shift(queueArray[0])
        
        }
// console.log(queueArray)
//        console.log(this.list.toString())
//        console.log(this.list.size())
    
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




const linkedList = () => {
  let n = 0;

  let preNode = node();

  const append = (value) => {
    const newNode = node(value);
    newNode.index = n;
    const current = iterate();

    if (current.next === null) {
      current.next = newNode;
    }
    n++;
    return newNode;
  };

  const iterate = () => {
    let current = preNode;
    while (current.next) {
      current = current.next;
    }
    return current;
  };


  const prepend = (value) => {
    insertAt(value, 0);
  };


  const insertAt = (value, index) => {
    const newNode = node(value);
    newNode.index = index;
    const rightNode = at(index);
    let leftNode = at(index - 1);
    if (leftNode == null) {
      leftNode = preNode;
    }
    let current = newNode;

    leftNode.next = newNode;
    newNode.next = rightNode;

    while (current.next) {
      current = current.next;
      current.index++;
    }
    n++
  };


  const size = () => n;


  const head = () => {
    const headNode = preNode.next;
    return headNode.value;
  };


  const tail = () => {
    const current = iterate();
    if (current.next === null) {
      const tailNode = current;
      return tailNode;
    }
  };

  
  const at = (index) => {
    let current = preNode;
    while (current.next) {
      current = current.next;
      if (current.index === index) {
        // const atNode = current;
        return current;
      }
    }
  };


  const pop = () =>{
    remove(n)
  }


  const remove = (index) => {
    if(index<0 ||index >n) return null
    let leftNode = at(index - 1);
    let rightNode = at(index + 1);
    if (index != n && index !=0) {
      
      console.log(`index: ${index}`);
      leftNode.next = rightNode;
      
    } else if(index===0){
      preNode.next = rightNode
    }
    else if(index===n) {
      leftNode.next = null;
     
    }
    let current = rightNode;
      while (current) {
        current.index = current.index - 1;
        current = current.next;
      
    }
    n--
  };

  const contains = (value) => {
    let current = preNode;
    while (current.next) {
      current = current.next;
      if (current.value === value) {
        return true;
      }
    }
    return false;
  };

  const find = (value) => {
    let current = preNode;
    while (current.next) {
      current = current.next;
      if (current.value === value) {
        const matchingNode = current;
        return matchingNode.index;
      }
    }
    return null;
  };

  const toString = () => {
    let stringChain = "";
    let current = preNode.next;
    while (current) {
      let nodeValue = current.value;
      stringChain = stringChain.concat(
        `( ${nodeValue} ) -> `
      );
      if (current.next === null) {
        stringChain = stringChain.concat(null);
      }
      current = current.next;
    }
    // console.log(n)
    return stringChain;
  };

  return {
    prepend,
    append,
    toString,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    insertAt,
    remove,
  };
};

const node = (value = null, next = null) => {
  return { value, next };
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67,66, 325, 6345];
const biggerArray = [44, 3, 40, 4, 82, 38, 17, 91, 10, 33, 89, 11, 48, 39, 58, 88, 76, 31, 73, 46, 98,9,11, 12,16]
const bst = new Tree(biggerArray);
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
// prettyPrintBorders(bst.root);
// console.log(bst.levelOrderForEach())


// prettyPrintBorders(blankTree.root);
// bst.deleteItem(324)
// bst.deleteItem(4)
// bst.deleteItem(73)
// bst.deleteItem(3)
// bst.deleteItem(17)

// function removeLeaves(){
//     bst.deleteItem(4)
//     bst.deleteItem(89)
//     bst.deleteItem(58)
//     bst.deleteItem(17)
// }

// console.log(bst.levelOrderForEach())

// function removeOneChild(){
//     bst.deleteItem(3)
//     bst.deleteItem(40)
//     bst.deleteItem(33)
//     bst.deleteItem(10)
// }

// removeOneChild()

// removeLeaves()
console.log(bst.levelOrderForEach(item => {
    item++
    return item
}))

// bst.deleteItem(38)
// bst.deleteItem(31)

// console.log(bst.levelOrderForEach())

// // const removeSubRoot = (() => {
// //     bst.deleteItem(88)
// //     bst.deleteItem(12)
// // })()

// bst.deleteItem(73)
// // bst.deleteItem(39)

// console.log(bst.levelOrderForEach())

// console.log(bst.find(76))
// console.log(bst.find(0))

// bst.deleteItem(89)


//copying left does not get all nodes to the left - that's the issue!