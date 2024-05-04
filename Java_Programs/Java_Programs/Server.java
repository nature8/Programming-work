//Server side
import java.net.Socket;
import java.net.ServerSocket;
import java.io.InputStreamReader;
import java.io.BufferedReader;
class Server{
    static public void main(String ar[]) throws Exception
    {
        ServerSocket ss = new ServerSocket(2001);
        System.out.println("Server is ready!!!");
        Socket socket = ss.accept();
        InputStreamReader isr = new InputStreamReader(socket.getInputStream());
        BufferedReader br = new BufferedReader(isr);
        while(true){
            String data = br.readLine();
            if(data.length()==0){
                break;     
            }
            System.out.println(data);
        }
        //System.out.println(data);
    }
}