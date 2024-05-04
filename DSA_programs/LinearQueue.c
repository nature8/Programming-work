/******************************************************************************

6. Write a menu driven program to implementing the various operations on a linear queue
with the help of static memory allocation.

*******************************************************************************/
#include <stdio.h>

int top = -1;

void push(int queue[], int size, int given_data)
{
	if(top == size-1)
	{
	    printf("Cannot push, the queue is full\n");
	}
	else
	{
	    top++;
	    queue[top] = given_data;
	    printf("%d is pushed to the queue\n", given_data);
	}
}

int pop(int queue[])
{
	if(top == -1)
	{
		printf("Cannot pop the queue is empty.\n");
		return -1;
	}
    
    int popped = queue[0];
    for(int i=1 ; i<=top ; i++)
    {
        queue[i-1] = queue[i];
    }
    top--;
    printf("%d is popped from the queue\n", popped);
    return popped;
}

void display(int queue[])
{
	if(top != -1)
	{
		printf("Displaying queue...\n");
		for(int i=0 ; i<=top ; i++)
		{
		    printf("%d ", queue[i]);
		}
		printf("\n");
	}
	else
		printf("The queue is empty nothing to display.\n");
}

void clear()
{
	printf("Queue memory cleared!\n");
	top = -1;
}

void displayMenu()
{
	printf("1. Push element to the queue.\n"
			"2. Pop element from the queue.\n"
			"3. Display the elements of the queue.\n"
			"4. Clear queue.\n"
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
				pop(queue);
				break;

			case 3:
				display(queue);
				break;

			case 5:
				printf("Exiting the program...Bye!\n");

			case 4:
				clear();
				break;

			default:
				printf("ENTER A VALID CHOICE!\n");
		}
		printf("\n");

	}while(choice != 5);

	return 0;
}



