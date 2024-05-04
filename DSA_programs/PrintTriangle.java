import java.util.*;
class PrintTriangle{
    
  public static void triangle(int r, int c){
    if(r==0)
      return;
    if(c<r){
      System.out.print("*");
      triangle(r,c+1);
    }
    else{
      System.out.println();
      triangle(r-1,0);
    }
  }
  
  public static void triangle2(int r, int c){
    if(r==0)
      return;
    if(c<r){
      triangle2(r,c+1);
      System.out.print("*");
    }
    else{
      triangle2(r-1,0);
      System.out.println();
    }
  }
  
  public static void main(String...ar){
    triangle2(5,0);
    System.out.println();
    triangle(5,0);
  }
}