import java.util.Scanner;
class ArrayOperations{
    public static void printArray(int n, int arr[]){
        System.out.println("Array elements are:");
        for(int i=0; i<n; i++){
            System.out.print(arr[i]+" ");
        }
        System.out.println();
    }
    public static void smallestNumber(int n, int arr[]){
       int smallest = arr[0];
        for(int i=0; i<n; i++){
            if(smallest>arr[i]){
                smallest=arr[i];
            }
        } 
        System.out.println("Smallest element: "+smallest);
    }
    public static void greatestNumber(int n, int arr[]){
        int largest = arr[0];
        for(int i=0; i<n; i++){
            if(largest<arr[i]){
                largest = arr[i];
            }
        }
        System.out.println("Largest number:"+largest);
    }
    public static void arraySum(int n, int arr[]){
        int sum=0;
        for(int i=0; i<n; i++){
            sum += arr[i];
        }
        System.out.println("Sum of array elements:"+sum);
    }
    public static void secondLargest(int n, int arr[]){
        int temp;
        for(int i=0; i<n; i++){
            for(int j=i+1; j<n; j++){
                if(arr[i]>arr[j]){
                    temp=arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                }
            }
        }
        System.out.println("Second largest:"+arr[n-2]);
    }
    public static void main(String ar[]){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of array elements:");
        int n = sc.nextInt();
        int arr[] = new int[n];
        System.out.println("Enter array elements:");
        for(int i=0; i<n; i++){
            arr[i]=sc.nextInt();
        }      
        printArray(n,arr);
        arraySum(n, arr);
        greatestNumber(n,arr);
        smallestNumber(n,arr);
        secondLargest(n,arr);
    }
}