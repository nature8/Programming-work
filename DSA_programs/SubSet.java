import java.util.*;
public class SubSet {
    public static List<List<Integer>> subSets(int[] arr){
        List<List<Integer>> outer = new ArrayList<>();
        outer.add(new ArrayList<>());
        for(int num:arr){
            int n = outer.size();
            for(int i=0; i<n; i++){
                List<Integer> internal = new ArrayList<>(outer.get(i));
                internal.add(num);
                outer.add(internal);
            }
        }
        return outer;
    }
 
    static List<List<Integer>> subSetsDup(int[] arr){
        List<List<Integer>> outer = new ArrayList<>();
        outer.add(new ArrayList<>());
        int start=0;
        int end=0;
        for(int i=0; i<arr.length; i++){
            if(i>0 && arr[i]==arr[i-1]){
                start=end+1;
            }
            int n = outer.size();
            for(int i=0; i<n; i++){
                List<Integer> internal = new ArrayList<>(outer.get(i));
                internal.add(num);
                outer.add(internal);
            }
        }
        return outer;
    }

    public static void main(String[] args) {
        int arr[] = {1,2,3};
        List<List<Integer>> ans = new ArrayList<>();
        //System.out.println(subSets(arr));
        for(List<Integer> list:ans){
            System.out.println(ans);
        }
    }
}
