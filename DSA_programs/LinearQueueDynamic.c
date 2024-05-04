/******************************************************************************

7. Write a menu driven program to implementing the various operations on a linear queue
with the help of dynamic memory allocation.

*******************************************************************************/
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node* next;
};

struct Node* head = NULL;

void displayMenu()
{
	printf("1. Push to the queue.\n"
			"2. Pop at from the queue.\n"
			"3. Disply queue.\n"
			"4. Clear the queue.\n"
			"5. Exit the program.\n\n");
}

void push(int given_data)
{
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = given_data;
	new_node->next = NULL;
    
	if(head == NULL)
	{
		head = new_node;
	}
	else
	{
	    struct Node* temp = head;

    	while(temp->next != NULL)
    		temp = temp->next;
    
    	temp->next = new_node;
	}

	printf("%d is pushed to the queue.\n", given_data);
}

void pop()
{
	if(head != NULL)
	{
		struct Node* to_delete = head;
		head = head->next;

		printf("%d is popped from the queue.\n", to_delete->data);

		free(to_delete);
	}
	else
		printf("Cannot delete, queue is empty.\n");
}

void display()
{
	printf("Displaying list...\n\n\tfront\n\t|\n\t?\n\t");
	struct Node* temp = head;
	while(temp != NULL)
	{
		printf("%d-->", temp->data);
		temp = temp->next;
	}
	printf("NULL\n\n\t");
	printf("\n");
}

void clear()
{
    printf("Queue memory cleared!\n");
    struct Node* to_delete = NULL;
	while(head != NULL)
	{
		to_delete = head;
		head = head->next;
		free(to_delete);
	}
}

int main()
{
	int choice = -1;
	printf("Queue --> Interactive --> Program\n\n");

	while(choice != 5)
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
			{
				pop();
				break;
			}

			case 3:
			{
                display();
				break;
			}
			
			case 5:
			{
				printf("Exiting the Program ... Bye!\n");
			}

			case 4:
			{
				clear();
				break;
			}

			default:
				printf("ENTER A VALID CHOICE!\n");
		}
		printf("\n");

	}
	return 0;
}


