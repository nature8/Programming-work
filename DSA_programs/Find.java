import java.util.*;
class Find{
  public static ArrayList<Integer> findAllIndex(int arr[], int target, int index, ArrayList<Integer> list){
    if(index==arr.length){
      return list;
    }
    if(arr[index]==target){
      list.add(index);
    }
    return findAllIndex(arr, target, index+1, list);
  }

  public static ArrayList<Integer> findAllIndex2(int arr[], int target, int index){
    ArrayList list = new ArrayList<>();
    if(index==arr.length){
      return list;
    }
    //this will contain ans from that particular function call only
    if(arr[index]==target){
      list.add(index);
    }
    ArrayList<Integer> ansFromBelowCalls = findAllIndex2(arr, target, index+1);
    list.addAll(ansFromBelowCalls);
    return list;
  }
  public static void main(String...ar){
    int arr[] = {1,2,3,4,4,8};
    int target=4;
    ArrayList<Integer> list = new ArrayList<>();
    System.out.println(findAllIndex(arr, target, 0, list));
    System.out.println(findAllIndex2(arr, target, 0));
  }
}