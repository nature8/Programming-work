import java.awt.Frame;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.awt.FlowLayout;
import java.awt.Label;
import java.awt.TextField;
import java.awt.Button;
public class FrmDemo extends Frame implements WindowListener
{
    FrmDemo()
    {
        setVisible(true);
        setSize(500,500);
        setTitle("WINDOW");
        setBackground(Color.pink);
        setForeground(Color.black);
        setFont(new Font("arial", Font.PLAIN, 20));
        Label lb = new Label("Name");
        add(lb);
        TextField tx = new TextField(20);
        add(tx);
        Button btn = new Button("awt Button");
        add(btn);
        setLayout(new FlowLayout());
        addWindowListener(this);
    }
    public static void main(String...ar)
    {
        new FrmDemo();
    }
    public void windowClosing(WindowEvent ev){
    System.exit(0);
    }
    public void windowActivated(WindowEvent ev){}
    public void windowDeactivated(WindowEvent ev){}
    public void windowIconified(WindowEvent ev){}
    public void windowDeiconified(WindowEvent ev){}
    public void windowOpened(WindowEvent ev){}
    public void windowClosed(WindowEvent ev){}
}




















