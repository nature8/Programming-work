/******************************************************************************

17. Write a program to design an algorithm for sequential search, implement and test it.

*******************************************************************************/
#include <stdio.h>

int linearSearch(int array[], int size, int key)
{
	for(int i=0 ; i<size ; i++)
	{
		if(array[i] == key)
		{
			return i;
		}
	}

	return -1;
}

void printArray(const int array[], int size)
{
	printf("[ ");
	for(int i=0 ; i<size ; i++)
	{
		printf("%d, ", array[i]);
	}
	printf("]");
}

int main()
{
	int array[] = {12, 34, 63, 23, 64, 13, 90};

	printf("Array elements:-\n");
	printArray(array , 7);

	printf("\n\nEnter key to find: ");
	int key = 0;
	scanf("%d", &key);

	int index = linearSearch(array, 7, key);

	if(index != -1)
	{
		printf("Element found at index: %d", index);
	}
	else
	{
		printf("Element not found!\n");
	}
	return 0;
}


