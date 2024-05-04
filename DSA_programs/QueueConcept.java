import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
class QueueConcept{
  public static void main(String...ar){
    Queue<Integer> queue = new LinkedList<>();
    queue.add(50);
    queue.add(40);
    queue.add(10);
    queue.add(20);
    System.out.println(queue+" ");
    System.out.println(queue.peek()); // returns head element
    if(queue.isEmpty()){
      System.out.println("Queue is empty , Nothing to delete!!");
    }
    else{
      System.out.println(queue.remove()+" deleted");
      System.out.println(queue.remove()+" deleted");
      System.out.println(queue.remove()+" deleted");	
      System.out.println(queue.remove()+" deleted");
    }
  }
}
