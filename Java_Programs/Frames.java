import java.awt.*;
import java.awt.event.*;
class Frames {
    public static void main(String ar[]){
        Frame fr = new Frame("Window of AWT!!!");
        Button bt = new Button("Press");
        bt.setBounds(500,500,80,80);
        fr.setSize(400,400);
        fr.setLayout(null);
        fr.setVisible(true);
        fr.add(bt);
        bt.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                fr.setBackground(Color.red);
            }
        });
        
    }
}