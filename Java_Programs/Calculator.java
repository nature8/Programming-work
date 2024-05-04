import java.util.Scanner;
class Calculator
{
    public static void main(String...ar)
    {
         Scanner sc = new Scanner(System.in);
         System.out.print("Enter the value of first number:");
         double num1 = sc.nextDouble();
         System.out.print("Enter the value of second number:");
         double num2 = sc.nextDouble();
         System.out.println("Choose any operation of your choice:");
         System.out.println("1.Sum of two numbers");
         System.out.println("2.Difference of two numbers");
         System.out.println("3.Product of two numbers");
         System.out.println("4.Quotient from two numbers");
         System.out.println("5.Remainder from two numbers");
         System.out.println("6.Exit");
         byte ch = sc.nextByte();
             switch(ch)
             {
                 case 1:
                     System.out.println("Sum: "+(num1+num2));
                     break;
                 case 2:
                     System.out.println("Difference: "+(num1-num2));
                     break;
                 case 3:
                     System.out.println("Product: "+(num1*num2));
                     break;
                 case 4:
                     System.out.println("Quotient: "+(num1/num2));
                     break;
                 case 5:
                     System.out.println("Remainder: "+(num1%num2));
                     break;
                 case 6:
                     System.exit(0);
             }
         
    }
}