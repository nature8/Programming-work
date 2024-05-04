import java.awt.*;
import java.awt.event.*;
class ReverseText{
  public static void main(String...ar){
    Frame fr = new Frame("REVERSE");
    fr.setSize(500,500);
    fr.setLayout(null);
    fr.setVisible(true);
    Label lb = new Label("Number");
    lb.setBounds(100, 100, 50, 30);
    fr.add(lb);
    TextField tx = new TextField();
    tx.setBounds(150, 100, 50, 30);
    fr.add(tx);
    TextField tx1 = new TextField();
    tx1.setBounds(150, 150, 50, 30);
    fr.add(tx1);
    Button bt = new Button("Reverse");
    bt.setBounds(200, 200, 50, 30);
    fr.add(bt);
    
    bt.addActionListener(new ActionListener(){
      public void actionPerformed(ActionEvent e){
        int num = Integer.parseInt(tx.getText());
        int ans=0;
        while(num>0){
            int rem = num%10; 
            ans = ans*10 + rem;
            num /= 10; 
        }
        tx1.setText(" "+ans);
      }
    });
  }
}