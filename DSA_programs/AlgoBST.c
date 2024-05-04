/******************************************************************************

18. Write a program to develop an algorithm for binary search and perform the same.

*******************************************************************************/
#include<stdio.h>

int binarySearchIterative(int array[], int length, int key)
{
	int begin_index = 0;
	int end_index = length;
	int middle_index = -1;

	while(begin_index <= end_index)
	{
		middle_index = (begin_index + end_index)/2;

		if(array[middle_index] == key)
			return middle_index;

		else if(key < array[middle_index])
			end_index = middle_index - 1;

		else
			begin_index = middle_index + 1;
	}
	return -1;
}

int binarySearchRecursive(int array[], int begin_index, int end_index, int key)
{
	int middle_index = (begin_index + end_index) / 2;

	if(begin_index > end_index)
		return -1;

	else if(key == array[middle_index])
		return middle_index;

	else if(key < array[middle_index])
		return binarySearchRecursive(array, begin_index, middle_index-1, key);

	else
		return binarySearchRecursive(array, middle_index+1, end_index, key);
}

void input(int array[], int length)
{
	printf("\nEnter a sorted array to be searched:-\n");
	for(int i=0 ; i<length ; i++)
	{
		scanf("%d", &array[i]);
	}
}

int main()
{
	printf("Enter the size of the array: ");
    int size = 0;
    scanf("%d", &size);

	int array[size];

	input(array, size);

	int key = 0;
	printf("\nEnter the element you wanna find: ");
	scanf("%d", &key);

	int result = -1;

	if((result = binarySearchIterative(array, size-1 , key)) != -1)
	{
		printf("\nThe element %d is found at index %d (Iteratively)", key, result);
	}
	else
	{
		printf("\nThe element %d was not found.", key);
	}

	if((result = binarySearchRecursive(array, 0, size-1 , key)) != -1)
	{
		printf("\nThe element %d is found at index %d (Recursively)", key, result);
	}
	else
	{
		printf("\nThe element %d was not found.", key);
	}
	return 0;
}




