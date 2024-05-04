import hibernet.beans.College;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
public class ShowAllRecords11 {
    static public void main(String...ar){
        SessionFactory sf = new Configuration().configure().buildSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransection();
        //Hibernate pagination
        Query q = session.createQuery("from College");//Select * from tablename
        q.setFirstResult(2);
        q.setMaxResults(5);
        List<College> data = q.list();
        for(College records:data){
            System.out.println(getRegistrationNo()+" "+records.getCollegeName()+" "+reocrds.getCity()
            +" "+records.getUniversity+" "+records.getRank+" "+records.getTotalCourses());
        }
    }
    
}
