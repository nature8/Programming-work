/******************************************************************************

16. Write a program to develop an algorithm for binary tree operations and implement the
same.

*******************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

struct Node
{
   struct Node* left_child;
   int data;
   struct Node* right_child;
};

struct Node* createBinaryTree(struct Node* root)
{
   int data;
   printf("Enter the data: ");
   scanf("%d", &data);

   if(data == -1)
   {
      return NULL;
   }

   root = (struct Node*)malloc(sizeof(struct Node));
   root->data = data;
   root->left_child = root->right_child = NULL;

   printf("Enter the left data for %d\n", data);
   root->left_child = createBinaryTree(root->left_child);

   printf("\n");   

   printf("Enter the right data for %d\n", data);
   root->right_child = createBinaryTree(root->right_child);

   printf("\n");   

   return root;
}

void inOrder(struct Node* root)
{
   if(root != NULL)
   {
      inOrder(root->left_child);
      printf("%d ", root->data);
      inOrder(root->right_child);
   }
}

void preOrder(struct Node* root)
{
   if(root != NULL)
   {
      printf("%d ", root->data);
      preOrder(root->left_child);
      preOrder(root->right_child);
   }
}

void postOrder(struct Node* root)
{
   if(root != NULL)
   {
      postOrder(root->left_child);
      postOrder(root->right_child);
      printf("%d ", root->data);
   }
}

int height(struct Node* root)
{
   if(root == NULL)
   {
      return 0;
   }

   int left_height = height(root->left_child) + 1;
   int right_height = height(root->right_child) + 1;

   return (left_height > right_height)? left_height : right_height;
}

int maximumNode(struct Node* root)
{
   if(root == NULL)
   {
      return INT_MIN;
   }

   int left_max = maximumNode(root->left_child);
   int right_max = maximumNode(root->right_child);


   int max = (left_max > right_max)?left_max : right_max;
   return max = (max > root->data)?max : root->data;
}

int minimumNode(struct Node* root)
{
   if(root == NULL)
   {
      return INT_MAX;
   }

   int left_min = minimumNode(root->left_child);
   int right_min = minimumNode(root->right_child);

   int min = (left_min < right_min)?left_min : right_min;
   return min = (min < root->data)?min : root->data;
}

int numberOfNodes(struct Node* root)
{
   if(root == NULL)
   {
      return 0;
   }

   int left_tree_nodes = 0;
   int right_tree_nodes = 0;

   if(root->left_child != NULL)
   {
      left_tree_nodes = numberOfNodes(root->left_child);
   }
   if(root->right_child != NULL)
   {
      right_tree_nodes = numberOfNodes(root->right_child);
   }

   return left_tree_nodes + right_tree_nodes + 1; // 1 for the root node
}

int numberOfLeafNodes(struct Node* root)
{
   if(root->left_child == NULL && root->right_child == NULL)
   {
      return 1;
   }

   int leaves = 0;

   if(root->left_child != NULL)
   {
      leaves += numberOfLeafNodes(root->left_child);
   }

   if(root->right_child != NULL)
   {
      leaves += numberOfLeafNodes(root->right_child);
   }

   return leaves;
}

int main()
{
   struct Node* root = NULL;

   printf("Enter -1 for left data and right data to terminate the node.\n\n");

   root = createBinaryTree(root);
   // Sample Tree data -> 2 7 2 -1 -1 6 5 -1 -1 11 -1 -1 5 -1 9 4 -1 -1 -1 -1

   printf("InOrder Traversal ->\n");
   inOrder(root);

   printf("\nPreOrder Traversal ->\n");
   preOrder(root);

   printf("\nPostOrder Traversal ->\n");
   postOrder(root);

   printf("\nHeight of the tree is: %d\n", height(root));

   printf("Minimum Node in the tree is: %d\n", minimumNode(root));
   printf("Maximum Node in the tree is: %d\n", maximumNode(root));

   printf("Number of Leaf Nodes in the tree is: %d\n", numberOfLeafNodes(root));
   return 0;
}



