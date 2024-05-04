/******************************************************************************

13. Write a program for Heap Sort

*******************************************************************************/
#include <stdio.h>
#include <stdlib.h>

struct heap
{
    int size;
    int* array;
};

void swap(int* a, int* b)
{
   int temp = *a;
   *a = *b;
   *b = temp; 
}

void heapify(struct heap* max_heap, int index)
{
    int largest = index;  
    int left = index*2 + 1;
    int right = (index + 1) * 2;

    if (left < max_heap->size && max_heap->array[left] > max_heap->array[largest])
        largest = left;

    if (right < max_heap->size && max_heap->array[right] > max_heap->array[largest])
        largest = right;

    if (largest != index)
    {
        swap(&max_heap->array[largest], &max_heap->array[index]);
        heapify(max_heap, largest);
    }
}

struct heap* createHeap(int array[], int size)
{
    struct heap* max_heap = (struct heap*) malloc(sizeof(struct heap));
    max_heap->size = size;   
    max_heap->array = array; 

    for(int i = (max_heap->size - 2) / 2; i > -1; --i)
    {
        heapify(max_heap, i);
    }

    return max_heap;
}

void heapSort(int array[], int size)
{
    struct heap* max_heap = createHeap(array, size);

    while(max_heap->size > 1)
    {
        swap(&max_heap->array[0], &max_heap->array[max_heap->size - 1]);
        --max_heap->size; 

        heapify(max_heap, 0);
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

    heapSort(array, size);

    printf("\nDisplaying sorted array:-\n");
    for(int i=0 ; i<size ; i++)
    {
       printf("%d ", array[i]);
    }
    return 0;
}



