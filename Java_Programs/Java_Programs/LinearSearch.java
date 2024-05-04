/*import java.util.Scanner;
class LinearSearch{
    public static void main(String ar[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter size of the array:");
        int size = sc.nextInt();
        int arr[]= new int[size];
        System.out.println("Enter array elements:");
        for(int i=0; i<size; i++){
            arr[i]=sc.nextInt();
        }
        System.out.println("Enter the element to be search:");
        int key = sc.nextInt();
        boolean result = false;
        for(int i=0; i<size; i++){
            if(arr[i]==key){
                result=true;
            }
            else{
                result=false;
            }
        }
        System.out.println(key+" is present: "+result);
    }
}*/
import java.util.Scanner;
class LinearSearch{
    public static void main(String ar[]){
        //int arr[] = {10,20,30,40,50};
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter size of the array:");
        int size = sc.nextInt();
        int[] arr = new int[size];
        System.out.println("Enter array elements:");
        for(int i=0; i<size; i++){
            arr[i]=sc.nextInt();
        }
        System.out.println("Enter element to be search:");
        int key = sc.nextInt();
        for(int i=0; i<arr.length; i++){
            if(arr[i]==key){
                System.out.println("Element found at index: "+i);
            }
        }
    }
}