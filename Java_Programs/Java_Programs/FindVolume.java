import java.lang.Math.*;
import java.util.Scanner;
import static java.lang.System.out;

  class FindVolume
   {
      
     static public void main(String...arguments)
      {
        double pie = 3.14285714286;
        Scanner sc = new Scanner(System.in);
        
         out.println("1. Volume of sphere");
         out.println("2. Volume of cone");
         out.println("3. Volume of cylinder");
         
         out.println("Enter the choice:");
         int choice = sc.nextInt();
         switch(choice)
         {
         case 1:
         {
         out.println("Volume of Sphere");
           out.println("Enter the radius of sphere:");
            double radius = sc.nextDouble();
            double volumeOfSphere =(4.0/3.0)*pie*(radius*radius*radius);
            //double volumeOfSphere = ((4 * 3.14 *radius*radius*radius)/3);
            //double volumeOfSphere = ((4 * Math.PI *radius*radius*radius)/3);
          out.println("Volume of sphere is:"+volumeOfSphere);
        
          out.println("-------------------");
           break;
          }
          case 2:
          {
        out.println("Volume of Cone");
          out.println("Enter the radius and height of cone:");
                double radius = sc.nextDouble();
                double height = sc.nextDouble();
                double volumeOfCone = (1.0/3.0)*pie*(radius*radius)*height;
                //double volumeOfCone = ((3.14*radius*radius*height)/3);
                //double volumeOfCone = ((Math.PI*radius*radius*height)/3);
          out.println("Volume of cone is:"+volumeOfCone);

         out.println("-------------------");
            break;
           }
           case 3:
           {
       out.println("Volume of Cylinder");
         out.println("Enter the radius and height of cylinder:");
              double radius = sc.nextDouble();
              double height = sc.nextDouble();
              double volumeOfCylinder = pie*(radius*radius)*height;
              //double volumeOfCylinder = 3.14*radius*radius*height;
              //double volumeOfCylinder = Math.PI*radius*radius*height;
         out.println("Volume of cylinder is:"+volumeOfCylinder);
           break;
           }
        }
      }
   }