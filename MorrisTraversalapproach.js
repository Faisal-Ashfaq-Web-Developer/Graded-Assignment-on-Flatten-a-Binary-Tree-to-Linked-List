// # The provided image seems to describe a Morris Traversal approach for flattening a binary tree.
// # Morris Traversal is an in-place binary tree traversal method that does not use recursion or a stack.
// # The algorithm works by temporarily modifying the tree's structure, linking each node's predecessor to itself.
// # After visiting a node, the algorithm restores the original tree structure.

// Corrected TreeNode class
class TreeNode {
    constructor(value = 0, left = null, right = null) {
      this.val = value;
      this.left = left;
      this.right = right;
    }
  }
  
  // Function to flatten a binary tree
  function flatten(root) {
    // Start with the current node as the root.
    let current = root;
    while (current) {
      if (current.left) {
        // Find the rightmost node in the left subtree.
        let predecessor = current.left;
        while (predecessor.right && predecessor.right !== current) {
          predecessor = predecessor.right;
        }
  
        // Make current as the right child of its predecessor.
        if (!predecessor.right) {
          predecessor.right = current;
          current = current.left;
        } else {
          // Revert the changes and move to the right subtree.
          predecessor.right = null;
          current = current.right;
        }
      } else {
        // If there is no left child, move to the right subtree.
        current = current.right;
      }
    }
  }
  
  // Helper function to create a binary tree from an array.
  function insertLevelOrder(arr, root, i, n) {
    if (i < n && arr[i] !== null) {
      const temp = new TreeNode(arr[i]);
      root = temp;
  
      // Insert left child.
      root.left = insertLevelOrder(arr, root.left, 2 * i + 1, n);
  
      // Insert right child.
      root.right = insertLevelOrder(arr, root.right, 2 * i + 2, n);
    }
    return root;
  }
  
  // Helper function to print the flattened tree.
  function printTree(node) {
    while (node) {
      process.stdout.write(node.val + (node.right ? ' -> ' : 'None\n'));
      node = node.right;
    }
  }
  
  // Create a binary tree for testing.
  const arr = [1, 2, 5, 3, 4, null, 6];
  const n = arr.length;
  let root = null;
  root = insertLevelOrder(arr, root, 0, n);
  
  // Flatten the binary tree.
  flatten(root);
  
  // Print the flattened tree.
  printTree(root);
  