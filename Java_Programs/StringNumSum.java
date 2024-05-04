import java.util.Scanner;
class StringNumSum{
  public static void main(String...ar){
    String str = "This 12 is of 1 now";
    char ch[] = str.toCharArray();
    int COUNT=0, SUM=0;
    int n[] = new int[10];
    String str1;
    for(int i=0; i<ch.length; i++){
      for(int j=0; j<10; j++){
        if(ch[i]==j && ch[i]==' '){
          COUNT++;
          str1 = Character.toString(ch[i]);
          n[i] = Integer.parseInt(ch[i]);
          SUM += n[i];
        }
      }
    }
    System.out.println("Sum: "+SUM);
  }
}