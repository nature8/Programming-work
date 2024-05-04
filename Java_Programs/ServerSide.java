//Server side
import java.net.Socket;
import java.net.ServerSocket;
import java.io.*;
public class ServerSide{
    private Socket socket = null;
    private ServerSocket server = null;
    private DataInputStream in = null;
    public ServerSide(int port){
        try{
            server = new ServerSocket(port);
            System.out.println("Server started!!");
            System.out.println("Waiting for a client..");
            socket = server.accept();
            System.out.println("Client accepted!!");
            in = DataInputStream(new BufferedInputStream(socket.getInputStream()));
            String line = "";
            while(!line.equals("Over")){
                try{
                    line = in.readUTF();
                    System.out.println(line);
                }
                catch(IOException i){
                    System.out.println(i);
                }
            }
            System.out.println("Cloasing connection");
            socket.close();
            in.close();
        }
        catch(IOException i){
            System.out.println(i);
        }
    }
    public static void main(String ar[]){
        ServerSide server = new ServerSide(5000);
    }
}












