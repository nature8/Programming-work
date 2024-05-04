/******************************************************************************

14. Write a program to implement Quick sort

*******************************************************************************/
#include <stdio.h>

void swap(int array[], int i, int j)
{
    int swap_temp = 0;

    swap_temp = array[j];
    array[j] = array[i];
    array[i] = swap_temp;
}


void quickSort(int array[], int start, int end)
{
    if(end - start <= 1)
    {
        return;
    }

    int pivot = start;

    int lower_bound = pivot+1;

    for(int upper_bound = pivot+1 ; upper_bound <= end ; upper_bound++)
    {
        if(array[upper_bound] <= array[pivot])
        {
            swap(array, lower_bound, upper_bound);
            lower_bound++;
        }
    }

    swap(array, pivot, lower_bound-1);

    pivot = lower_bound-1;

    quickSort(array, start, pivot-1);
    quickSort(array, pivot+1, end);
}

int main()
{
   printf("Enter the size of the array: ");
   int size = 0;
   scanf("%d", &size);

   int array[size];

   printf("\nEnter the array elements:-\n");
   for(int i=0 ; i<size ; i++)
   {
      scanf("%d", &array[i]);
   }

   quickSort(array, 0, size-1);

   printf("\nDisplaying sorted array..\n");
   for(int i=0 ; i<size ; i++)
   {
      printf("%d ", array[i]);
   }
}

