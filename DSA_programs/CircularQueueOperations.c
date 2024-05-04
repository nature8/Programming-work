/******************************************************************************

3. To implement an algorithm for insert and delete operations of circular queue and
implement the same using array.

*******************************************************************************/
#include <stdio.h>

int front = -1, rear = -1;

void push(int queue[], int size, int given_data)
{
    if(front == 0 && rear == size-1)
    {
      printf("Cannot push, the queue is full\n");
      return;
    }    
    else if(front == -1 && rear == -1)
    {
        front=rear=0;
        queue[rear]=given_data;
    }
    else if(rear == size-1 && front != 0)
    {
        rear=0;
        queue[rear]=given_data;
    }
    else
    {
      rear++;
      queue[rear]=given_data;
    }
    printf("%d is pushed to the queue\n", given_data);
}

int pop(int queue[], int size)
{
    if(front == -1 && rear == -1)
    {
      printf("Cannot delete, the queue is empty.\n");
      return -1;
    }
    
    int popped = queue[front];
    
    if(front == rear)
      front = rear = -1;
    else
    {
      if(front == size-1)
         front=0;
      else
         front++;
    }
    return popped;
}

int peek(int queue[])
{
   if(front == -1 && rear == -1)
   {
      printf("Queue is empty.\n");
      return -1;
   }
   else
      return queue[front];
}

void display(int queue[], int size)
{
    if(front == -1 && rear == -1)
      printf ("Nothing to display the queue is empty\n");
    else
    {
      if(front<rear)
      {
         for(int i=front ; i<=rear ; i++)
            printf("\t %d", queue[i]);
      }
      else
      {
            for(int i=front ; i<size ; i++)
                printf("\t %d", queue[i]);
                     
            for(int i=0 ; i<=rear ; i++)
               printf("\t %d", queue[i]);
      }
    }
}

void displayMenu()
{
   printf("1. Insert an element\n"
         "2. Delete an element\n"
         "3. Peek\n"
         "4. Display the queue.\n"
         "5. Exit out of the program.\n\n");
}

int main()
{
    printf("Enter the size of the queue: ");
    int size = 0;
    scanf("%d", &size);
    
    int queue[size];
    
   int choice = 0;

   do
   {
      displayMenu();
      printf("Enter your choice: ");
      scanf("%d", &choice);

      switch(choice)
      {
         case 1:
         {
            printf("Enter the new element: ");
            int data;
            scanf("%d", &data);

            push(queue, size, data);
            break;
         }

         case 2:
            pop(queue, size);
            break;

         case 3:
            display(queue, size);
            break;

            case 4:
             printf("Frist element in the queue: %d", peek(queue));
            break;
            
         case 5:
            printf("Exiting the program...Bye!\n");

         default:
            printf("ENTER A VALID CHOICE!\n");
      }
      printf("\n");

   }while(choice != 5);

   return 0;
}



