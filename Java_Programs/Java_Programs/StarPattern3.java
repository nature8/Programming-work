import java.util.Scanner;
class StarPattern3{
    public static void main(String...ar){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a integer:");
        int n = sc.nextInt();
       
        for(int i=0; i<=n; i++){
            for(int j=i; j>0; j--){
                System.out.print(" ");
            }
            for(int j=n-i; j>0; j--){
                System.out.print("*");
            }
            
            System.out.println();
        }
    } 
}