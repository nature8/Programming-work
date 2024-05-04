/******************************************************************************

5. Write a menu driven program to implement the push, pop and display option of the stack
with the help of dynamic memory allocation.

*******************************************************************************/
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node* next;
};

struct Node* top = NULL;

void push(int given_data)
{
	struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));

	new_node->data = given_data;
	new_node->next = top;

	top = new_node;

	printf("%d is pushed to the stack\n", given_data);
}

void pop()
{
	if(top == NULL)
	{
		printf("Cannot pop the stack is empty.\n");
	}
	else
	{
		struct Node* to_delete = top;
		printf("Top element %d in the stack deleted\n", to_delete->data);
		top = top->next;
		free(to_delete);
	}
}

void display()
{
	if(top != NULL)
	{
		printf("Displaying stack...\n\nTop->");
		struct Node* temp = top;
		while(temp != NULL)
		{
			printf("\t%d\n\t^\n\t|\n", temp->data);
			temp = temp->next;
		}
	}
	else
		printf("The stack is empty nothing to display.\n");
}

void clear()
{
	printf("Stack memory cleared!\n");
	struct Node* to_delete = NULL;

	while(top != NULL)
	{
		to_delete = top;
		top = top->next;
		free(to_delete);
	}
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

				push(data);
				break;
			}

			case 2:
				pop();
				break;

			case 3:
				display();
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


