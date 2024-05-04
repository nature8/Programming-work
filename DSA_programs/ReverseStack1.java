import java.util.Stack;
public class ReverseStack1 {
    public static void insertAtBottom(Stack<Integer> s, int data){
        if(s.isEmpty()){
            s.push(data);
            return;
        }
        int top = s.pop();
        insertAtBottom(s,data);
        s.push(top);
    }
 
    public static void printStack(Stack<Integer> s){
        while(!s.isEmpty()){
            System.out.println(s.pop());
        }
    }

    public static void reverseStack(Stack<Integer> s){
        if(s.isEmpty()){
            return;
        }   
        int top = s.pop();
        reverseStack(s);
        insertAtBottom(s, top);
    }
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(1);
        s.push(2);
        s.push(3);
        //3,2,1
        //printStack(s);
        ReverseStack1.reverseStack(s);
        ReverseStack1.printStack(s);
        //1,2,3
    }
}
