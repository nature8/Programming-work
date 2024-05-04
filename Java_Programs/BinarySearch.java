import java.util.Scanner;
public class BinarySearch{
    public static int binSearch(int arr[], int size, int key){
        //int s=0, e=size-1;
        int s=0, e=size;
        
        while(s<=e){
            int midIdx = (s+e)/2;
            if(arr[midIdx]==key){
                return key;
            }
            else if(arr[midIdx]>key){
                e = midIdx-1;
            }
            else{
                s = midIdx+1;
            }
        }
        return -1;
    }
    public static void main(String ar[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter size of the array: ");
        int size = sc.nextInt();
        System.out.println("Enter array elements:");
        int arr[] = new int[size];
        for(int i=0; i<size; i++){
            arr[i] = sc.nextInt();
        }
        System.out.println("Enter key to be search: ");
        int key = sc.nextInt();
        int result = binSearch(arr, size, key);
        if(result==-1){
            System.out.println("Element not found!!");
        }
        else{
            System.out.println("Element found");
        }
        //System.out.println(binSearch(arr, size, key));
    }
}