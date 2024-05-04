import java.util.Scanner;
class Lower{
    public static void main(String ar[]){
        Scanner sc = new Scanner(System.in);
        char ch1, ch2, ch3, ch4, ch5;
        /*ch1 = 'M';
        ch2 ='P';
        ch5 = 'a';
        ch3 = Character.toLowerCase(ch1);
        String str1 = "The lowercase of character is :"+ch3;
        String str2 = "The lowercase of character :"+Character.toLowerCase(ch2);
        System.out.println(str1);
        System.out.println(str2);
        String str = "The"+Character.toUpperCase(ch5);
        System.out.println(str);*/
        ch1 = sc.next();
        String str = "The new: "+Character.toUpperCase(ch1);
        System.out.println(str);
    }
}