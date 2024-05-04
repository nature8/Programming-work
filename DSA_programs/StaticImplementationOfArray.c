/******************************************************************************

4. Write a menu driven program to implement the push, pop and display option of the stack
using static memory allocation.

*******************************************************************************/
#include <stdio.h>

int top = -1;

void push(int stack[], int size, int given_data)
{
	if(top == size-1)
	{
	    printf("Cannot push, the stack is full\n");
	}
	else
	{
	    top++;
	    stack[top] = given_data;
	    printf("%d is pushed to the stack\n", given_data);
	}
}

void pop(int stack[])
{
	if(top == -1)
	{
		printf("Cannot pop the stack is empty.\n");
	}
	else
	{
	    printf("%d is popped from the stack\n", stack[top]);
		top--;
	}
}

void display(int stack[])
{
	if(top != -1)
	{
		printf("Displaying stack...\n\nTop->");
		int temp = top;
		while(temp != -1)
		{
			printf("\t%d\n\t^\n\t|\n", stack[temp]);
			temp--;
		}
	}
	else
		printf("The stack is empty nothing to display.\n");
}

void clear()
{
	printf("Stack memory cleared!\n");
	top = -1;
}

void displayMenu()
{
	printf("1. Push element to the stack.\n"
			"2. Pop element from the stack.\n"
			"3. Display the elements of the stack.\n"
			"4. Clear stack.\n"
			"5. Exit out of the program.\n\n");
}

int main()
{
    printf("Enter the size of the stack: ");
    int size = 0;
    scanf("%d", &size);
    
    int stack[size];
    
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

				push(stack, size, data);
				break;
			}

			case 2:
				pop(stack);
				break;

			case 3:
				display(stack);
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

