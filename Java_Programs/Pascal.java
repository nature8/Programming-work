/*import java.util.Scanner;
import java.io.*;
class Pascal{
  public int fact(int n){
    if(n==0)
      return 1;
    return n * fact(n-1);
  }
  public static void main(String...ar){
    Pascal ref = new Pascal();
    //Scanner sc = new Scanner(System.in);
    //int n = sc.nextInt();
    int n=4;
    for(int i = 0; i <= n; i++){
      for(int j = 0; j <= n - i; j++){
        System.out.print(" ");
      }
      for(int j=0; j <= i; j++){
        System.out.print(" " + ref.fact(i) / (ref.fact(i-j)*ref.fact(j)));
      }
      System.out.println();
    } 
  }
}
*/

import java.util.Scanner;
import java.io.*;
class Pascal{
  public int fact(int n){
    if(n==0)
      return 1;
    return n * fact(n-1);
  }
  public static void main(String...ar){
    Pascal ref = new Pascal();
    //Scanner sc = new Scanner(System.in);
    //int n = sc.nextInt();
    int n=4;
    for(int i = n; i >= 0; i--){
      for(int j = n - i; j >= 0; j--){
        System.out.print(" ");
      }
      for(int j=i; j >= 0; j--){
        System.out.print(" " + ref.fact(i) / (ref.fact(i-j)*ref.fact(j)));
      }
      System.out.println();
    } 
  }
}


