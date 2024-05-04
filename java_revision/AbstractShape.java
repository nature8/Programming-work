import java.util.Scanner;
abstract class Shape{
    abstract void volume();
    //abstarct void show();
}
class Cone extends Shape{ // V = (3.14 * r * r * h)/3
    void volume(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter radius of cone:");
        float radius = sc.nextFloat();
        System.out.println("Enter height of cone:");
        float height = sc.nextFloat();
        float volume = (float)((3.14*radius*radius*height)/3);
        System.out.println("Volume of cone is: "+volume);
    }
}
class AbstractShape{
    public static void main(String ar[]){
        Cone ref = new Cone();
        ref.volume();
    }
}
//class Sphere extends Shape{}
//class Cylinder extends Shape{}

//byte-> short -> int -> long -> float -> double