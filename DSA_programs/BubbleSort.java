import java.util.*;
class BubbleSort{   
  public static void bubble(int arr[], int r, int c){
    if(r==0)
      return;
    if(c<r){
      if(arr[c]>arr[c+1]){
        int temp = arr[c];
        arr[c] = arr[c+1];
        arr[c+1] = temp;
      }
      bubble(arr, r,c+1);
    }
    else{
      bubble(arr, r-1,0);
    }
  }

  public static void iterativeBubble(int arr[]){
    for(int i=0; i<arr.length; i++){
      for(int j=0; j<arr.length-i-1; j++){
        if(arr[i]>arr[i+1]){
          int temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
        }
      }
    }
    /*for(int i=0; i<arr.length; i++){
      System.out.print(arr[i]+" "); 
    }*/
  }  

  public static void main(String...ar){
    int arr[] = {4,3,2,1};
    //System.out.println(bubble(arr, arr.length-1, 0));
    bubble(arr, arr.length-1, 0);
    System.out.println(Arrays.toString(arr));
    iterativeBubble(arr);
    System.out.println(Arrays.toString(arr));
  }
}