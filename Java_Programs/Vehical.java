import java.util.Scanner;
class Vehical{
    public static void main(String ar[]){
        Scanner sc = new Scanner(System.in); 
        System.out.println("Enter amount of fuel in liter: ");
        double quantity = sc.nextDouble();
        double distanceInOneKm = 10;
        //System.out.println("Enter time up to which it can run the vehical:");
        //double time = sc.nextDouble();
        System.out.println("The distance travelled by vehical is: "+(quantity*distanceInOneKm)+" kms");
    }
}