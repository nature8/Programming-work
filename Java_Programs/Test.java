public class Test{
    public static void main(String ar[]){
        /*String b = "false";
        switch(b){
        case "False":
            System.out.println("a");
        }*/
        /*int a = 5;
        a += 6;
        switch(a-1){
            case 5:
                System.out.println("10");
                break;
            case 10:
               System.out.print("15");
               System.out.print(((a%2==0) ? "-even-":"-odd-"));
               break;
            default:
               System.out.print(a%2);
        }*/
        //char nptel[] = {'1','2','3','4','5','6'};
        //System.out.print(nptel[0]+nptel[nptel.length-2]);
        int marks = 5;
        int grace = 2;
        int total = marks + (marks>6 ? ++grace: --grace);
        System.out.println(total);
    }
}