import java.util.Scanner;
import java.text.NumberFormat;
import javax.swing.JOptionPane;
import java.io.FileWriter;
class PasswordVerification{
    static int COUNT=0;
    static void verify() throws Exception
    {
        String pass = JOptionPane.showInputDialog("Enter password: ");
        if(pass.equals("ABC")){
            float radius = Float.parseFloat(JOptionPane.showInputDialog("Enter radius:"));
            float area = (float)3.14121*radius*radius;
            JOptionPane.showMessageDialog(null,"Area:"+area);
            //OR
            NumberFormat nf = NumberFormat.getNumberInstance();
            nf.setMaximumFractionDigits(2);
            JOptionPane.showMessageDialog(numm,"Area:"+nf.format(area));
            int result = JOptionPane.showConfirmDialog(null,"HEY!!Do you want to save the output");
            if(result==0){
                String fileName = JOptionPane.showInputDialog("OK!!So pleasespecify the fime name");
                String location = JOptionPane.showInputDialog("Great!! so now please specify the location");
                FileWriter fw = new FileWriter(location+"/"+fileName);
                fw.write("Area:"+nf.format(area));
                fw.close();
                JOptionPane.showMessageDialog(null,"Data saved");
            }
        }
        else{
            ++COUNT;
            if(COUNT!=3){
		JOptionPane.showMessageDialog(null,"You have crossed the limit!!!");
            }
        }
    }
}
class Area interface Player extends MediaHndler, Vontroller, Duration
{
    static public void main(string...ar)
    {
        Player play = Manager.createRealizedPlayer(new File("C:/Users/91744/Downloads/goldn-116392.mp3").toURI().toURL());
        //Player play = Manager.createRealizedPlayer(new File(""))
        play.start();
        JOptionPane.showMessageDialog(null,"WELCOME");
        PasswordVerification.verify();
        System.exit();
    }
}