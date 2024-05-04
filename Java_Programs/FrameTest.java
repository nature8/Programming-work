import java.awt.*;
import java.awt.event.*;
class FrameTest extends Frame implements ActionListener{
    FrameTest(){
            setVisible(true);
            setSize(500,500);
            Label lb = new Label("PRAKRUTI");
            lb.setBounds(50,50,60,30);
            add(lb);
            Button bt = new Button("Press");
            bt.setBounds(500,500,80,80);
            add(bt);
            bt.addActionListener(this);
        }
    public void actionPerformed(ActionEvent e){
         //System.exit(0);
         setBackground(Color.blue);
    }
    public static void main(String ar[])
        {
        new FrameTest();
        }
    }
