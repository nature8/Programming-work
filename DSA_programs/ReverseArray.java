class ReverseArray{
  public static void main(String...ar){
    int n=5;
    int arr[] = {5,4,3,2,1};
    for(int i=arr.length-1; i>=0; i--){
      System.out.print(arr[i]+" ");
    }
  }
}