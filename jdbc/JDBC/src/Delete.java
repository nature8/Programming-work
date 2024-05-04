
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author 91744
 */
public class Delete {
    public static void main(String[] args) throws SQLException, ClassNotFoundException
    {
        try{
        //System.out.println("Hello world!!");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter full name:");
        String fNm = sc.nextLine();
        System.out.println();
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/test","root","1029");
        PreparedStatement st = con.prepareStatement("delete from complain where fNm=?");
        st.setString(1, fNm);
        System.out.println();
        st.executeUpdate();
        System.out.println();
        System.out.println("Records Updated");
        }
        catch(SQLException | ClassNotFoundException ex){
            ex.printStackTrace();
        }
    }
}
