/******************************************************************************

11. Write a program for Insertion sort

*******************************************************************************/
#include<stdio.h>

void insertionSort(int array[], int size)
{
   int key = 0;
   int temp = 0;

   for(int i=1 ; i<size ; i++)
   {
      key = array[i];
      temp = i-1;

      while(temp > -1 && key < array[temp])
      {
         array[temp + 1] = array[temp];
         temp--;
      }

      array[temp + 1] = key;
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

   insertionSort(array, size);

   printf("\nDisplaying sorted array..\n");
   for(int i=0 ; i<size ; i++)
   {
      printf("%d ", array[i]);
   }
}




