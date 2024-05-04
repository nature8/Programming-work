import java.util.Scanner;
import static java.lang.System.out;
 class FindArea
 {
   static public void main(String...arguments)
  {
    Scanner sc = new Scanner(System.in);

     out.println("1. Area of circle");
     out.println("2. Area of triangle");
     out.println("3. Area of rectangle");


     out.println("Area of Circle");
     out.println("Enter the radius of circle:");
        float radius = sc.nextFloat();
        float areaOfCircle = (22*radius*radius)/7;
           out.println("Area of circle is:"+areaOfCircle);
     out.println("------------------------");

     out.println("Area of Triangle");
     out.println("Enter the height and base of triangle:");
        float height = sc.nextFloat();
        float base = sc.nextFloat();
        float areaOfTriangle = (height*base)/2;
           out.println("Area of triangle is:"+areaOfTriangle);
     out.println("--------------------------");

     out.println("Area of Rectangle");
     out.println("Enter the height and breadth of rectangle:");
        float Height = sc.nextFloat();
        float breadth = sc.nextFloat();
        float areaOfRectangle = (Height*breadth);
     out.println("Area of rectangle is:"+areaOfRectangle);

  }
 }