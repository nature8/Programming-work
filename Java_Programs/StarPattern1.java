import java.util.Scanner;
class StarPattern1{
    public static void main(String...ar){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a integer:");
        int n = sc.nextInt();
       
        for(int i=0; i<=n; i++){
            for(int j=0; j<n-i; j++){
                System.out.print("*");
            }
            for(int j=0; j<i; j++){
                System.out.print(" ");
            }
            System.out.println();
        }
    } 
}