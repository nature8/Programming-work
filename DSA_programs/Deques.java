import java.util.Deque;
import java.util.ArrayDeque;
import java.util.Scanner;
class Deques{
  public static void main(String...ar){
    Deque<Integer> deque = new ArrayDeque<>();
    deque.add(89);
    deque.addLast(100);
    deque.addFirst(20);
    System.out.println(deque+" ");
    System.out.println(deque.peek()+" is head element!!");
    System.out.println(deque.removeFirst()+" removed");
    System.out.println(deque.removeLast()+" removed");
    System.out.println(deque+" ");
  }
}