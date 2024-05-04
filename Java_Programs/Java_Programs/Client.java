//Client side
import java.net.Socket;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.util.Scanner;
import java.io.PrintStream;
class Client{
    static public void main(String ar[]) throws Exception
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter ip to chat: ");
        String ip = sc.next();
        Socket socket = new Socket(ip,2001);
        InputStreamReader isr = new InputStreamReader(System.in);
        BufferedReader br = new BufferedReader(isr);
        PrintStream ps = new PrintStream(socket.getOutputStream());
        while(true){
            String data = br.readLine();
            if(data==null){
                break; 
            }
            ps.println(data);           
        }
        //ps.println(data);
    }
}