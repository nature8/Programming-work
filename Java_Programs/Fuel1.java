import javax.swing.*;
class Fuel1{
    static public void main(String...ar){
        int fuel = Integer.parseInt(JOptionPane.showInputDialog("Enter the amount of fuel in liter:"));
        int distance = Integer.parseInt(JOptionPane.showInputDialog("Enter the distance trvelling per day:"));
        float milage = Float.parseFloat(JOptionPane.showInputDialog("Enter the milage(liter/km) of your vehical:"));
        //JOptionPane.showMessageDialog(null,"Distance that can be covered:");
        float coveredDistance = fuel/milage;
        float days = coveredDistance/distance;
        JOptionPane.showMessageDialog(null,"Fuel:"+fuel+"\nDistance:"+distance+"\nMilage:"+milage+"\nCovered distance:"+coveredDistance+"\nDays:"+days);
    }
}