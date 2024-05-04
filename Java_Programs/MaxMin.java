import java.util.Scanner;
public class MaxMin{
    public static int maxm(int arr[], int size){
        int max = arr[0];
        for(int i=0; i<size; i++){
            if(arr[i]>max){
                max=arr[i];
                //return max;
            }
        }
        return max;
    } 
    public static int mini(int arr[], int size){
        int min = arr[0];
        for(int i=0; i<size; i++){
            if(arr[i]<min){
                min = arr[i];
                //return min;
            }
        }
        return min;
    }
    public static void main(String ar[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter size of the array:");
        int size = sc.nextInt();
        int[] arr = new int[size];
        System.out.println("Enter array elements:");
        for(int i=0; i<size; i++){
            arr[i] = sc.nextInt();
        }
        System.out.println("Max in array: "+maxm(arr, size));
        System.out.println("Min in array: "+mini(arr, size));
    }
}

