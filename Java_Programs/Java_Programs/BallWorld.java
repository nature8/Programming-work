import java.awt.*;
import java.awt.Graphics;
import java.awt.Color;
import java.awt.Frame;
import javax.swing.JFrame;
public class BallWorld extends Frame{
    public static void main(String ar[]){
        BallWorld bw1 = new BallWorld(Color.red);
        bw1.show();
    }
    public static final int framewidth = 600;
    public static final int frameheight = 400;
    private Ball aball;
    private int counter=0;
    private BallWorld(Color ballColor){
        setVisible(true);
        setSize(framewidth, frameheight);
        setTitle("BALL WORLD");
        aball = new Ball(10, 15, 5);
        aball.setColor(ballColor);
        aball.setMotion(3.0,6.0);
    }
    public void paint(Graphics g){
        aball.paint1(g);
        aball.move();
        if((aball.x()<0)||(aball.x()>framewidth)){
            aball.setMotion(-aball.xMotion(), aball.yMotion());
        }
        if((aball.yMotion()<0)||(aball.yMotion()>frameheight)){
            aball.setMotion(aball.xMotion(),-aball.yMotion());
        }
        counter += 1;
        if(counter<2000){
            repaint();
        }
        else{
            System.exit(0);
        }
    }
}