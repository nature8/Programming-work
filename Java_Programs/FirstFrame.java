/*import java.util.*;
import java.awt.*;
import javax.swing.*;
import java.awt.event;
public class FirstFrame extends JFrame implements ActionListener{
    JTextField txt1, txt2, txt3;
    JButton btn1, btn2, btn3, btn4;
    JLabel lbl1, lbl2, lbl3, lbl4;
    void init(){
        setVisible(true);
        setBounds(10, 10, 400, 400);
        setLayout(new FlowLayout());
        setTitle("My Frame");
        lbl1 = new JLabel("First no.");
        txt1 = new JTextField(10);
        lbl2 = new JLabel("Second no.");
        txt2 = new JTextField(10);
        lbl3 = new JLabel("Result");
        txt3 = new JTextField(10);
        btn1 = new JButton("add");
        btn2 = new JButton("sub");
        btn3 = new JButton("mul");
        btn4 = new JButton("div");
        add(lbl1);
        add(lbl2);
        add(lbl3);
        add(txt1);
        add(txt2);
        add(txt3);
        add(btn1);
        add(btn2);
        add(btn3);
        add(btn4);
        btn1.addActionListener(this);
        btn2.addActionListener(this);
        btn3.addActionListener(this);
        btn4.addActionListener(this);
        pack();
    }
    public void actionPerformed(ActionEvent ae){
        int a = Integer.parseInt(txt1.getText());
        int b = Integer.parseInt(txt2.getText());
        if(ae.getSource()==btn1){
            Integer c = a+b;
            txt3.setText(c.toString());
        }
        else if(ae.getSource()==btn2){
            Integer c = a-b;
            txt3.setText(c.toString());
        }
        else if(ae.getSource()==btn3){
            Integer c = a*b;
            txt3.setText(c.toString());
        }
        else if(ae.getSource()==btn3){
            Integer c = a/b;
            txt3.setText(c.toString());
        }
    }
    public static void main(String ar[]){
        FirstFrame f1 = new FirstFrame();
        f1.init();
    }
}*/


import java.util.*;
import java.awt.*;
import javax.swing.*;
import java.awt.event.*;
public class FirstFrame extends JFrame implements ActionListener
{
	JTextField txt1,txt2,txt3;
	JButton btn1,btn2,btn3,btn4;
	JLabel lbl1,lbl2,lbl3;
	void init()
	{	
		setVisible(true);
		setBounds(10,10,400,400);
		setLayout(new FlowLayout());
		setTitle("My Frame");
		lbl1= new JLabel("First no.");
		txt1= new JTextField(10);
		lbl2= new JLabel("Second no.");
		txt2= new JTextField(10);
		lbl3= new JLabel("Result");
		txt3= new JTextField(10);	
		btn1= new JButton("add");
		btn2= new JButton("sub");
		btn3= new JButton("mul");
		btn4= new JButton("div");
		add(lbl1);
		add(lbl2);
		add(txt1);
		add(txt2);
		add(lbl3);
		add(txt3);
		add(btn1);
		add(btn2);
		add(btn3);
		add(btn4);
		btn1.addActionListener(this);
		btn2.addActionListener(this);
		btn3.addActionListener(this);
		btn4.addActionListener(this);
		pack();
	}
	public void actionPerformed(ActionEvent ae)
	{
	  	int a = Integer.parseInt(txt1.getText());
    		int b = Integer.parseInt(txt2.getText());
		if(ae.getSource()==btn1)
		{
		Integer c = a+b;
		txt3.setText(c.toString());
		}
		else if(ae.getSource()==btn2)
		{
		Integer c = a-b;
		txt3.setText(c.toString());
		}
		else if(ae.getSource()==btn3)
		{
		Integer c = a*b;
		txt3.setText(c.toString());
		}
		else if(ae.getSource()==btn4)
		{
		Integer c = a/b;
		txt3.setText(c.toString());
		}
	}
	public static void main(String args[])
	{
		FirstFrame f1= new FirstFrame();
		f1.init();
	}
	
}










