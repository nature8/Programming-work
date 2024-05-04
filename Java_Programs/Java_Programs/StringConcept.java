//Strings are immutable
import java.util.Scanner;
public class StringConcept{
    public static void main(String ar[]){

        //Concatination
        Scanner sc = new Scanner(System.in);
        //System.out.println("Enter any string: ");
        //String str = sc.nextLine();
        //System.out.println("String: "+str);
        /*String firstName = "Prakruti";
        String lastName = "Tailor";
        String fullName = firstName +" "+lastName;
        //String fullName = 
        System.out.println(fullName);
        //str.length();
        //System.out.println(fullName.length());
        //charAt();
        
        /*for(int i=0; i<fullName.length(); i++){
            System.out.println(fullName.charAt(i));
        }*/ 
        //String str1 = "marks";
        //String str2 = "marks";
        //str1 > str2 : +ve value
        //str1 == str2 : 0
        //str1 < str2 : -ve value
        /*if(str1.compareTo(str2)==0){
            System.out.println("Strings are same");
        }
        else{
            System.out.println("Strings are not same");
        }*/
        /*if(str1 == str2){
            System.out.println("Strings are same");
        }
        else{
            System.out.println("Strings are not same");
        }*/
        /*  if(new String ("marks") == new String("marks")){
            System.out.println("Strings are same");
        }
        else{
            System.out.println("Strings are not same");
        }*/
        //.substring(beg index, end index)
        String sentence = "This is a car";
        String name = sentence.substring(1, sentence.length());
        System.out.println(name);

    }
}