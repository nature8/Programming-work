class ArraySum{
    public static void main(String...ar){
        int arr[] = {10, 20, 30, 40, 50};
        int sum=0;
        for(int i=0; i<arr.length; i++){
            sum += arr[i];
        }
        System.out.println("Sum of array elements is: "+sum);
        System.out.println("Array elements:");
        int largest = arr[0];
        for(int i=0; i<arr.length; i++){
            System.out.print(arr[i]+" ");
            if(largest<arr[i]){
                largest = arr[i];
            }
        //    System.out.println();
        }
        System.out.println();
        System.out.println("Largest: "+largest);
    }
}