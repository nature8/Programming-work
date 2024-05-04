import java.util.Scanner;
class MaxMarkAvg{
    public static void main(String...ar){
        Scanner sc = new Scanner(System.in);
        int s=sc.nextInt(); 
        double avg=0.0;
        int arr[]=new int[s];
        int sum=0;
        int i=0;
        int max=arr[0];
        while(i<s){
            arr[i]=sc.nextInt();
            sum += arr[i];
            if(arr[i]>max){
		max=arr[i];
            }
            i++;
        }
        avg = sum/s;
        System.out.println(max);
        System.out.println(avg);
    }
}