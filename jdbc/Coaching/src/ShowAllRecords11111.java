import hibernet.beans.College;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
public class ShowAllRecords11111 {
    static public void main(String...ar){
        SessionFactory sf = new Configuration().configure().buildSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();
        Criteria q = session.createCriteria(College.class);
        //Restrictions class used to remove where clause
        q.add(Restrictions.eq("city","indore"));
        q.add(Restrictions.and(Restrictiions.eq("city","indore"),Restrictions.le("rank",5)))
        List<Object> data = q.list();
        for(Object records[]: data){
            System.out.println(records[0]+" "+records[1]+" "+records[2]+" "+records[3]);
        }
    }
    
}
