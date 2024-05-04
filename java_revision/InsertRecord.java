import java.sql.Connection; //interface
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Driver;
import java.util.Scanner;
public class InsertRecord{
    public static void main(String ar[]) throws SQLException
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter full name:");
        String fNm = sc.nextLine();
        System.out.println("Enter contact:");
        String contact = sc.next();
        System.out.println("Enter complain:");
        String complain = sc.nextLine();
        Class.forName("com.mysq.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/test","root","1029");
        PreparedStatement st = con.prepareStatement("insert into complain values(?,?,?)");
        st.setString(1, fNm);
        st.setString(2, contact);
        st.setString(3, complain);
        st.executeUpdate();
        System.out.println("Record inserted!!");
    }
}