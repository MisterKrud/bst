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







const buildTree = (arr)=>{
// console.log(arr.sort())

        const sortArray = arr.sort((a,b)=>a-b);
        // console.log(sortArray)
        const cleanArray = ()=> {  
            for(let n = 0 ; n< sortArray.length; n++){
                if(sortArray[n] === sortArray[n+1]){
                    sortArray.splice((n+1), 1)
                }
            }
         
           return sortArray
          
         
        
    }
  
       const finalArray = cleanArray()
    //    console.log(finalArray)

        let start = 0
        // console.log(start)
        
        let end = finalArray.length-1
        // console.log(end)

      

        if (start>end) return null;

        let mid = start + Math.floor((end -start)/2)
        // console.log(mid)

        let root = new Node(finalArray[mid]);
        // console.log(root)



       let leftSide = finalArray.slice(start, mid)
    //    console.log(`left`)
    //    console.log(leftSide)
       root.left = buildTree(leftSide)
        // console.log(root.left)
       let rightSide = finalArray.slice(mid+1)
    //    console.log(`right`)
    //    console.log(rightSide)
        root.right = buildTree(rightSide)
        // console.log(root.right)
        return root
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
const bst = new Tree(testArray)

// console.log(buildTree(testArray))

prettyPrint(bst.root)