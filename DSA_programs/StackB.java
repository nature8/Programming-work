import java.util.ArrayList;
public class StackB {
    static class Stack{
        ArrayList<Integer> list = new ArrayList<>();
        public static boolean isEmpty(){
            return list.size() == 0;
        }
        public static void puch(int data){
            list.add(data);
        }
        public static int pop(){
            if(isEmpty()){
                return -1;
            }
            int top = list.get(list.size()-1);
            list.remove(list.size()-1);
            return top;
        }
        public static int peek(){
            if(isEmpty()){
                return -1;
            }
            return list.get(list.size()-1);
        }
    }
    public static void main(String...ar){
        Stack s = new Stack();
        Stack.push(1);
        Stack.push(2);
        Stack.push(3);
        while(!Stack.isEmpty()){
            System.out.println(Stack.peek());
            Stack.pop();
        }
    }
}
