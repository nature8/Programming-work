class Node{
    int data;
    Node next;
    Node(int data) {
           this.data = data;
           this.next = null;
       }
}
public class LL1 {
    /*public class Node {
        String data;
        Node next;
 
 
        Node(String data) {
            this.data = data;
            this.next = null;
        }
    }*/
 
    Node head;
    public void addFirst(int data){
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    public void addLast(int data){
        Node newNode = new Node(data);
        if(head==null){
            head=newNode;
            return;
        }
        Node lastNode = head;
        while(lastNode.next != null){
            lastNode = lastNode.next;
        }
        lastNode.next=newNode;
    }
    public static void main(String[] args) {
        LL1 list = new LL1();
        list.addFirst(1);
        list.addLast(5);
        list.addLast(7);
        list.addLast(3);
        list.addLast(8);
        list.addLast(2);
        list.addLast(3);
        System.out.print(list+" -> ");
        System.out.println("null");
    }
}
