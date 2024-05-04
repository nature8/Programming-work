/******************************************************************************

1. To develop a program to find an average of an array using AVG function.

*******************************************************************************/
#include <stdio.h>

float AVG(int array[], int size)
{
	float sum = 0;

	for(int i=0 ; i<size ; i++)
	{
		sum += array[i];
	}

	return sum / size;
}

int main()
{
	int size = 0;
	printf("Enter the size of the array: ");
	scanf("%d", &size);

	int array[size];

	printf("Enter %d array elements:-\n", size);

	for(int i=0 ; i<size ; i++)
	{
		scanf("%d", &array[i]);
	}

	float average = AVG(array, size);

	printf("The average of the entire array is: %.2f\n", average);
	return 0;
}

