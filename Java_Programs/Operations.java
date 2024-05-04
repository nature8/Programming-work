import java.util.Scanner;
class Operations{
    public static void main(String ar[]){
        int num1 = 10;
        float b = 20.0f;
        double num2 = 20.0;
        short num3 = (short)1.1;
        byte num4 = 2;
        //Addition
        System.out.println("Sum of int and float is: "+(num1+b));
        System.out.println("Sum of int and double is: "+(num1+num2));
        System.out.println("Sum of int and short is: "+(num1+num3));
        System.out.println("Sum of int and byte is: "+(num1+num4));
        System.out.println("Sum of float and double is: "+(b+num2));
        System.out.println("Sum of float and short is: "+(b+num3));
        System.out.println("Sum of float and byte is: "+(b+num4));
        System.out.println("Sum of double and short is: "+(num2+num3));
        System.out.println("Sum of double and byte is: "+(num2+num4));
        System.out.println("Sum of short and byte is: "+(num3+num4));
        //Difference
        System.out.println("Difference of int and float is: "+(num1-b));
        System.out.println("Difference of int and double is: "+(num1-num2));
        System.out.println("Difference of int and short is: "+(num1-num3));
        System.out.println("Difference of int and byte is: "+(num1-num4));
        System.out.println("Difference of float and double is: "+(b-num2));
        System.out.println("Difference of float and short is: "+(b-num3));
        System.out.println("Difference of float and byte is: "+(b-num4));
        System.out.println("Difference of double and short is: "+(num2-num3));
        System.out.println("Difference of double and byte is: "+(num2-num4));
        System.out.println("Difference of short and byte is: "+(num3-num4));
        //Product
        System.out.println("Product of int and float is: "+(num1*b));
        System.out.println("Product of int and double is: "+(num1*num2));
        System.out.println("Product of int and short is: "+(num1*num3));
        System.out.println("Product of int and byte is: "+(num1*num4));
        System.out.println("Product of float and double is: "+(b*num2));
        System.out.println("Product of float and short is: "+(b*num3));
        System.out.println("Product of float and byte is: "+(b*num4));
        System.out.println("Product of double and short is: "+(num2*num3));
        System.out.println("Product of double and byte is: "+(num2*num4));
        System.out.println("Product of short and byte is: "+(num3*num4));
        //Division
        System.out.println("Division of int and float is: "+(b/num1));
        System.out.println("Division of int and double is: "+(num2/num1));
        System.out.println("Division of int and short is: "+(num3/num1));
        System.out.println("Division of int and byte is: "+(num4/num1));
        System.out.println("Division of float and double is: "+(num2/b));
        System.out.println("Division of float and short is: "+(num3/b));
        System.out.println("Division of float and byte is: "+(num4/b));
        System.out.println("Division of double and short is: "+(num3/num2));
        System.out.println("Division of double and byte is: "+(num4/num2));
        System.out.println("Division of short and byte is: "+(num4/num3));
    }
}