import hibernet.beans.College;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
public class ShowAllRecords {
    static public void main(String...ar){
        SessionFactory sf = new Configuration().configure().buildSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransection();
        Criteria q = session.createSession(College.class)//Select * from tablename
        List<College> data = q.list();
        for(College records:data){
            System.out.println(getRegistrationNo()+" "+records.getCollegeName()+" "+reocrds.getCity()
            +" "+records.getUniversity+" "+records.getRank+" "+records.getTotalCourses());
        }
    }
    
}
