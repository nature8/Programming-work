/******************************************************************************

12. Write a program for Merge Sort

*******************************************************************************/
#include<stdio.h>

void merge(int array[], int first, int middle, int last)
{
   int n1 = middle - first + 1;
   int n2 = last - middle;

   int temp1[n1];
   int temp2[n2]; 


   for(int i=0 ; i < n1 ; i++)
   {
      temp1[i] = array[first + i];
   }
   for(int i=0 ; i < n2 ; i++)
   {
      temp2[i] = array[middle+1 + i];
   }

   int i=0, j=0, k=first;

   while(i < n1 && j < n2)
   {
      if(temp1[i] < temp2[j])
      {
         array[k++] = temp1[i++];
      }
      else
      {
         array[k++] = temp2[j++];
      }
   }

   while(i < n1)
   {
      array[k++] = temp1[i++];
   }

   while(j < n2)
   {
      array[k++] = temp2[j++];
   }
}

void sort(int array[], int first, int last)
{
   if(first < last)
   {
      int middle = (first + last) / 2;

      sort(array, first, middle);
      sort(array, middle+1, last);

      merge(array, first, middle, last);
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

   sort(array, 0, size-1);

   printf("\nDisplaying sorted array..\n");
   for(int i=0 ; i<size ; i++)
   {
      printf("%d ", array[i]);
   }
}




