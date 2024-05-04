/******************************************************************************

9. Write a menu driven program to implement various operations on a circular linked list

*******************************************************************************/
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node* next;
};

struct Node* head = NULL;
int size = 0;

void displayMenu()
{
	printf("1. Insert at HEAD.\t"
			"4. Delete at HEAD.\n"
			"2. Insert at TAIL.\t"
			"5. Delete at TAIL.\n"
			"3. Insert at INDEX.\t"
			"6. Delete at INDEX.\n"
			"7. Display list.\n"
			"8. Clear list.\n"
			"9. Exit out of the program.\n\n");
}

void insertAtHead(int given_data)
{
	struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));

	new_node->data = given_data;

	if(head == NULL)
	{
		new_node->next = new_node;
	}
	else
	{
		new_node->next = head;

		struct Node* temp = head;

		while(temp->next != head)
			temp = temp->next;

		temp->next = new_node;
	}

	head = new_node;

	printf("%d inserted at HEAD.\n", given_data);
	size++;
}

void insertAtTail(int given_data)
{
	if(head == NULL)
	{
		insertAtHead(given_data);
		return;
	}

	struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));

	new_node->data = given_data;
	new_node->next = head;

	struct Node* temp = head;

	while(temp->next != head)
		temp = temp->next;

	temp->next = new_node;

	printf("%d inserted at TAIL.\n", given_data);
	size++;
}

void insertAtIndex(int given_data, int index)
{
	if(index == 0)
	{
		insertAtHead(given_data);
		return;
	}
	struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));

	new_node->data = given_data;

	struct Node* temp = head;
	int count = 0;

	while(count < index-1)
	{
		temp = temp->next;
		count++;
	}

	new_node->next = temp->next;
	temp->next = new_node;

	printf("%d inserted at index %d.\n", given_data, index);
	size++;
}

void deleteAtHead()
{
	if(head != NULL)
	{
		struct Node* to_delete = head;

		if(head->next == head)
		{
			head = NULL;
		}
		else
		{
			head = head->next;

			struct Node* temp = head;

			while(temp->next != to_delete)
				temp = temp->next;

			temp->next = head;
		}

		printf("%d deleted at HEAD.\n", to_delete->data);
		free(to_delete);
		size--;
	}
	else
		printf("Cannot delete, list is empty.\n");
}

void deleteAtTail()
{
	if(head != NULL)
	{
		if(head->next == head)
		{
			deleteAtHead();
			return;
		}

		struct Node* temp = head;

		while(temp->next->next != head)
			temp = temp->next;

		struct Node* to_delete = temp->next;

		temp->next = head;

		printf("%d deleted at TAIL.\n", to_delete->data);
		free(to_delete);
		size--;
	}
	else
		printf("Cannot delete, list is empty.\n");
}

void deleteAtIndex(int index)
{
	if(head != NULL)
	{
		if(index == 0 || head->next == head)
		{
			deleteAtHead();
			return;
		}

		int count = 0;
		struct Node* temp = head;

		while(count < index-1)
		{
			temp = temp->next;
			count++;
		}

		struct Node* to_delete = temp->next;
		temp->next = to_delete->next;

		printf("%d deleted at index %d.\n", to_delete->data, index);
		free(to_delete);
		size--;
	}
	else
		printf("Cannot delete, list is empty.\n");
}

void display()
{
	if(head != NULL)
	{
		printf("Displaying list...\n\n\thead\n\t|\n\t?\n\t");

		struct Node* temp = head;
		do
		{										
			printf("%d-->", temp->data);
			temp = temp->next;

		}while(temp != head);

		printf("...continues forever.\n\n\t");
	}
	else
		printf("List is empty, nothing to display.\n");
}


int main()
{

	int choice = -1;
	printf("Circular -> Linked -> List -> Interactive -> Program -> Circular -> ...\n\n");

	while(choice != 9)
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

				insertAtHead(data);
				break;
			}

			case 2:
			{
				printf("Enter the new element: ");
				int data;
				scanf("%d", &data);

				insertAtTail(data);
				break;
			}

			case 3:
			{
				int data, index;

				printf("Enter the new element: ");
				scanf("%d", &data);

				do
				{
					printf("Enter index to insert the element(max value: %d): ", size);
					scanf("%d", &index);
					if(index < 0 || index > size)
					{
						printf("\nIndex out of bounds, please enter a valid index!\n");
					}
				}while(index < 0 || index > size);

				insertAtIndex(data, index);
				break;
			}

			case 4:
			{
				deleteAtHead();
				break;
			}

			case 5:
			{
				deleteAtTail();
				break;
			}

			case 6:
			{
				int index;
				do
				{
					printf("Enter index number of the element to delete(max value: %d): ", size-1);
					scanf("%d", &index);
					if(index < 0 || index >= size)
					{
						printf("\nIndex out of bounds, please enter a valid index!\n");
					}

				}while(index < 0 || index >= size);

				deleteAtIndex(index);
				break;
			}

			case 7:
			{
				display();
				break;
			}

			case 9:
				printf("Exiting the program...Bye\n");

			case 8:
			{
				printf("Linked List memory cleared!\n");

				if(head != NULL)
				{
					struct Node* to_delete = NULL;

					if(head->next == head) // if there is only one element to delete that is head.
					{
						to_delete = head;
						head = NULL;
						free(to_delete);
					}
					else
					{
						struct Node* temp = head->next; // cannot start from head itself because
												 // if the heads get deleted then we cannot check
												 // for the while condition.
						do
						{
							to_delete = temp;
							temp = temp->next;
							free(to_delete);

						} while(temp != head);

						//now deleting the head.
						to_delete = head;
						head = NULL;
						free(to_delete);
					}
				}
				size = 0;
				break;
			}

			default:
				printf("ENTER A VALID CHOICE!\n");
		}
		printf("\n");

	}
	return 0;
}


