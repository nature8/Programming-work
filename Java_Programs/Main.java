import java.awt.*;
import java.awt.event.*;
class Main{
  public static void main(String ar[]){
    Frame f = new Frame("ACTION LISTENER");
    Button b = new Button("change color");
    b.setBounds(50,100,90,90);
    f.setSize(400,400);
    f.setVisible(true);
    f.setLayout(null);
    f.add(b);
    b.addActionListener(new ActionListener(){
      public void actionPerformed(ActionEvent e){
        f.setBackground(Color.red);
      }
    });
  }
}