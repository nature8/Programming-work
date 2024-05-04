import hibernate.beans.College;
import java.util.List;
import org.hibernate.Query;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
public class ShowAllRecords {
    static public void main(String...ar){
        SessionFactory sf = new Configuration().configure().buildSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransection();
        Query q = session.createQuery("from College");//Select * from tablename
        List<College> data = q.list();
        for(College records:data){
            System.out.println(getRegistrationNo()+" "+records.getCollegeName()+" "+records.getCity()
            +" "+records.getUniversity+" "+records.getRank+" "+records.getTotalCourses());
        }
    }
    
}
