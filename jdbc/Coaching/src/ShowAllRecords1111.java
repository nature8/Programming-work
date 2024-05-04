import hibernet.beans.College;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
public class ShowAllRecords1111 {
    static public void main(String...ar){
        SessionFactory sf = new Configuration().configure().buildSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransaction();
        Criteria q = session.createCriteria(College.class);
        ProjectionList pl = Projections.projectionList();
        //aggragation function
        pl.add(Projections.max("rank"));
        pl.add(Projections.min("rank"));
        pl.add(Projections.count("city"));
        pl.add(Projections.countDistinct("city"));
        List<Object> data = q.list();
        for(Object records[]: data){
            System.out.println(records[0]+" "+records[1]+" "+records[2]+" "+records[3]);
        }
    }
    
}
