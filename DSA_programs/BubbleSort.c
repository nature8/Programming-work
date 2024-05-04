/******************************************************************************

10. Write a program for implementation of Bubble sort

*******************************************************************************/
#include<stdio.h>

void swap(int* a, int* b)
{
   int temp = *a;
   *a = *b;
   *b = temp;
}

void bubbleSort(int array[], int size)
{
   for(int i=0 ; i<size-1 ; i++)
   {
      for(int j=0 ; j<size-1-i ; j++)
      {
         if(array[j]>array[j+1])
            swap(&array[j], &array[j+1]);
      }
   }
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

   bubbleSort(array, size);

   printf("\nDisplaying sorted array..\n");
   for(int i=0 ; i<size ; i++)
   {
      printf("%d ", array[i]);
   }
}




