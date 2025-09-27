#!/usr/bin/node

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    
}




class Tree {
    constructor(arr){
        this.arr = arr;
        this.root = buildTree(arr);
    }

}







const buildTree = (arr, start = 0, end = arr.length-1)=>{


      
         
        
  

    
   

        if (start>end) return null;

        let mid = start + Math.floor((end -start)/2)
        // console.log(mid)

        let root = new Node(arr[mid]);
        // console.log(root)



       root.left = buildTree(arr, start, mid-1)
     
        root.right = buildTree(arr, mid+1, end)
      
        return root
    }


const arrayCleaner = (array) =>{ 
     array.sort((a,b)=>a-b);
      
        
            for(let n = 0 ; n< array.length; n++){
                if(array[n] === array[n+1]){
                    array.splice((n+1), 1)
                }
            }
            return array
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

// const createBstFromArray = (arr) => {
//     return arrayToBst(arr, 0, arr.length-1)
// }

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const bst = new Tree(arrayCleaner(testArray))

// console.log(buildTree(testArray))

prettyPrint(bst.root)