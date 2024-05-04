import java.util.Date;
import java.util.Scanner;

class IBus
{
static{
System.out.println("Welcome");
Date date = new Date();
System.out.println(date);
}
static public void main(String...arg)throws Exception
{
Scanner sc = new Scanner(System.in);
System.out.println("Enter password");
String password = sc.next();
if(password.equals("ABC123"))
{
System.out.println("Enter bus no.");
short busNo = sc.nextShort();

System.out.println("Enter city name");
String cityName = sc.next();

System.out.println("Enter starting point");
String sPoint = sc.next();

System.out.println("Enter contact no.");
long contactNo = sc.nextLong();

System.out.println("Enter driver name");
String driverName = sc.next();

System.out.println("Enter turn over");
float turnOver = sc.nextFloat();

System.out.println("Is there AC facility");
boolean acFacility = sc.nextBoolean();

System.out.println("Specify total no of routes");
byte totalRoutes = sc.nextByte();

System.out.println("Enter website name");
//String websiteName = sc.nextLine();
String websiteName = sc.next();

System.out.println("Enter mail id");
String mailId = sc.next();

System.out.println("...........BUS INFO...........");
System.out.println("Bus no."+busNo);
System.out.println("City name: "+cityName);
System.out.println("Starting point: "+sPoint);
System.out.println("Contact no: "+contactNo);
System.out.println("Driver name: "+driverName);
System.out.println("Turn over: "+turnOver);
System.out.println("AC Facility: "+acFacility);
System.out.println("Total routes: "+totalRoutes);
System.out.println("website: "+websiteName);
System.out.println("Mail id: "+mailId);
}else{
	System.out.println("Invalid password");
	Runtime run = Runtime.getRuntime();
	//run.exec("c:/Windows/system32/rundll32.exe  user32.dll,LockWorkStation");
}
}
}