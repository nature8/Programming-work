/******************************************************************************

2. To implement a program that can insert, delete and edit an element in array.

*******************************************************************************/
#include <stdio.h>

int current_size = 0;

void insertAtIndex(int array[], int size, int data, int index)
{
	if(current_size == size || index >= size)
	{
		printf("Cannot insert, array memory is full.\n\n");
	}
	else
	{
		int next_element = 0;

		for(int i=index ; i<size-1 ; i++)
		{
			next_element = array[i+1];
			array[i+1] = array[i];
		}

		array[index] = data;
		printf("%d inserted at index %d\n\n", data, index);

		current_size++;
	}
}

void deleteAtIndex(int array[], int size, int index)
{
	if(current_size == 0)
	{
		printf("There are no elements in the array to delete.\n\n");
	}
	else
	{
		printf("%d deleted at index %d.\n\n", array[index], index);

		for(int i=index+1 ; i<size ; i++)
		{
			array[i-1] = array[i];
		}
		current_size--;
	}
}

void editAtIndex(int array[], int data,  int index)
{
	printf("%d at index %d is updated to %d.\n\n", array[index], index, data);
	array[index] = data;
}

void displayArray(int array[], int size)
{
	for(int i=0 ; i<size ; i++)
	{
		printf("%d ", array[i]);
	}
	printf("\n\n");
}

void displayMenu()
{
	printf("1. Insert at INDEX.\n"
			"2. Delete at INDEX.\n"
			"3. Edit at INDEX\n"
			"4. Display Array\n"
			"5. Exit out of the program.\n\n\n");
}

int main()
{
	int size = 0;
	printf("Enter the size of the array: ");
	scanf("%d", &size);

	int array[size];

	int choice = -1;

	while(choice != 5)
	{
		displayMenu();
		printf("Enter your choice: ");
		scanf("%d", &choice);

		switch(choice)
		{
			case 1:
			{
				int data = 0;
				printf("Enter the new data: ");
				scanf("%d", &data);

				int index = -1;
				printf("Enter the index (current size = %d): ", current_size);
				scanf("%d", &index);

				insertAtIndex(array, size, data, index);
				break;
			}

			case 2:
			{
				int index = -1;
				printf("Enter the index (current size = %d): ", current_size-1);
				scanf("%d", &index);

				deleteAtIndex(array, size, index);
				break;
			}

			case 3:
			{
				int data = 0;
				printf("Enter the new data: ");
				scanf("%d", &data);

				int index = -1;
				printf("Enter the index (current size = %d): ", current_size-1);
				scanf("%d", &index);

				editAtIndex(array, data, index);
				break;
			}

			case 4:
			{
				displayArray(array, size);
				break;
			}

			case 5:printf("Exiting the program...Bye!\n");break;

			default:printf("PLEASE ENTER A VALID CHOICE\n");
		}

	}
	return 0;
}


