import java.util.Stack;
import java.util.Scanner;
class StackConcept{
  public static void main(String...ar){
    Stack<Integer> stack = new Stack<>();
    stack.push(16);
    stack.push(14);
    stack.push(90);
    stack.push(100);
    System.out.println(stack+" ");
    
    System.out.println(stack.pop()+" deleted");
    System.out.println(stack.pop()+" deleted");
    System.out.println(stack.pop()+" deleted");
    System.out.println(stack.pop()+" deleted");
  }
}
