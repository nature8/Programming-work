import java.util.LinkedList;
public class LL{
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        list.addFirst("a");
        list.addFirst("is");
        System.out.print(list);
        
        System.out.println();
        
        list.addFirst("this");
        list.addLast("list");
        System.out.print(list);
        System.out.println();
       
        System.out.println(list.size());
        for(int i=0; i<list.size(); i++){
            System.out.print(list.get(i)+"->");
        }
        System.out.println("null");
        
        list.removeFirst();
        System.out.println(list);

        list.removeLast();
        System.out.println(list);

        list.remove(1);
        System.out.println(list);
    }
}