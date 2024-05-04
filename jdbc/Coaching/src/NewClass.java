import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;
public class NewClass {
   public static void main(String[] args)//throws SQLException, ClassNotFoundException
    {
        try{
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter full name:");
        String fNm = sc.nextLine();
        System.out.println("Enter contact:");
        String contact = sc.next();
        System.out.println("Enter complain:");
        String description = sc.nextLine();
        System.out.println();
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/mysql","root","1029");
        PreparedStatement st = con.prepareStatement("insert into complain values(?, ?, ?)");
        st.setString(1, fNm);
        st.setString(2, contact);
        st.setString(3, description);
        st.executeUpdate();
        System.out.println("Record Inserted");
        }
        catch(SQLException | ClassNotFoundException ex){
            ex.printStackTrace();
        }
    } 
}
