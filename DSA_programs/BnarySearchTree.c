/******************************************************************************

15. Write a program to Construct a Binary Search Tree and perform deletion, inorder
traversal on it

*******************************************************************************/
#include <stdio.h>
#include <stdlib.h>

struct Node
{
   struct Node* left_child;
   int data;
   struct Node* right_child;
};

struct Node* root = NULL;

void insert(int key)
{
   struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));

   new_node->data = key;
   new_node->left_child = NULL;
   new_node->right_child = NULL;

   if(root == NULL)
   {
      root = new_node;
      return;
   }

   struct Node* temp = root;
   struct Node* follow_temp;

   while(temp != NULL)
   {
      follow_temp = temp;

      if(key < temp->data)
         temp = temp->left_child;

      else if(key > temp->data)
         temp = temp->right_child;

      else return;
   }

   if(key < follow_temp->data)
   {
      follow_temp->left_child = new_node;
   }
   else
   {
      follow_temp->right_child = new_node;
   }
}

int height(struct Node* ptr)
{
   if(ptr == NULL)
   {
      return 0;
   }
   int left_height = height(ptr->left_child);
   int right_height = height(ptr->right_child);

   return left_height > right_height ? left_height + 1: right_height + 1;
}

struct Node* inorderPre(struct Node* ptr)
{
   while(ptr && ptr->right_child != NULL)
   {
      ptr = ptr->right_child;
   }

   return ptr;
}

struct Node* inorderSucc(struct Node* ptr)
{
   while(ptr && ptr->left_child != NULL)
   {
      ptr = ptr->left_child;
   }

   return ptr;
}

struct Node* delete(struct Node* ptr, int key)
{
   if(ptr == NULL)
   {
      return NULL;
   }

   if(ptr->left_child == NULL && ptr->right_child == NULL)
   {
      if(ptr == root)
      {
         root = NULL;
      }
      free(ptr);
      return NULL;
   }

   if(key < ptr->data)
   {
      ptr->left_child = delete(ptr->left_child, key);
   }
   else if(key > ptr->data)
   {
      ptr->right_child = delete(ptr->right_child, key);
   }
   else
   {
      if(height(ptr->left_child) > height(ptr->right_child))
      {
         struct Node* predecessor = inorderPre(ptr->left_child);
         ptr->data = predecessor->data;
         ptr->left_child = delete(ptr->left_child, predecessor->data);
      }
      else
      {
         struct Node* successor = inorderSucc(ptr->right_child);
         ptr->data = successor->data;
         ptr->right_child = delete(ptr->right_child, successor->data);
      }
   }

   return ptr;
}

void inOrder(struct Node* temp)
{
   if(temp)
   {
      inOrder(temp->left_child);
      printf("%d ", temp->data);
      inOrder(temp->right_child);
   }
}

int main()
{
   printf("Enter the number of nodes you want to insert: ");
   int nodes = 0;
   scanf("%d", &nodes);

   for(int i=0 ; i<nodes ; i++)
   {
      printf("Enter the data for node %d: ", i+1);
      int data = 0;
      scanf("%d", &data);

      insert(data);
   }

   printf("\n\nThe inorder traversal for the BST:-\n");
   inOrder(root);

   printf("\n\nEnter the key to delete: \n");
   int to_delete = 0;
   scanf("%d", &to_delete);

   delete(root, to_delete);

   printf("\nThe inorder traversal for the BST:-\n");
   inOrder(root);

   return 0;
}


