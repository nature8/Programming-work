package hibcrud;
//import hib.dto.College;
import hibernate.beans.College;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
public class Hibcrud {
    public static void main(String...ar){
        SessionFactory sf = new Configuration().configure().buildSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();
        College coll = new College(1211,"sgsits","Indore",1,100,"auto");
        session.save();
        tx.commit();
        session.close();
        System.out.println("Insertd!!!");
    }
}
