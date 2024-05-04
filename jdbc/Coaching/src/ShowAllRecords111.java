import hibernet.beans.College;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
public class ShowAllRecords111 {
    static public void main(String...ar){
        SessionFactory sf = new Configuration().configure().buildSessionFactory();
        Session session = sf.openSession();
        Transaction tx = session.beginTransection();
        //Projection: Used to access required number of columns
        Query q = session.createQuery("from College");//Select * from tablename
        ProjectionList pl = Projections.projectionList();
        pl.add(Projections.property("collegename"));
        pl.add(Projections.property("city"));
        pl.add(Projections.property("rank"));
        q.setProjection(pl);
        List<Object[]> data = q.list();
        for(Object records[]:data){
            System.out.println(records[0]+" "+records[1]+" "+records[2]);
        }
    }
    
}
