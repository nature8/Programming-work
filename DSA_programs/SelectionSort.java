import java.util.*;
class SelectionSort{   
  public static void recursive(int arr[], int r, int c, int max){
    if(r==0){
      return;
    }
    if(c<r){
      if(arr[c] > arr[max]){
        recursive(arr, r,c+1, c);  // max = col
      }
      else{
        recursive(arr, r,c+1, max);
      }
    }
    else{
      int temp = arr[max];
      arr[max] = arr[r-1];
      arr[r-1] = temp;
      recursive(arr, r-1, 0, 0);
    }  
  }

  public static void iterative(int arr[]){
    for(int i=0; i<arr.length; i++){
      for(int j=i+1; j<arr.length-1; j++){
        if(arr[i]>arr[i+1]){
          int temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
        }
      }
    }
  }  

  public static void main(String...ar){
    int arr[] = {4,3,2,1};
    //System.out.println(bubble(arr, arr.length-1, 0));
    recursive(arr, arr.length, 0, 0);
    System.out.println(Arrays.toString(arr));
    iterative(arr);
    System.out.println(Arrays.toString(arr));
  }
}