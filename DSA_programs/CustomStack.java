import java.util.*;
import java.lang.*;
class CustomStack{
  int ptr=-1;
  protected int data[];
  private static final int DEFAULT_SIZE = 10;
  public CustomStack(){
    this(DEFAULT_SIZE);
  }
  public CustomStack(int size){
    this.data = new int[size];
  }
  // to insert elements in stack
  public boolean push(int item){
    if(isFull()){ 
      System.out.println("Stack is full!!");
      return false;
    }
    ptr++;
    data[ptr]=item;
    System.out.println("Item inserted!!");
    return true;
  }
  // to remove elements
  public int pop() throws Exception
  {
    if(isEmpty()){
      throw new Exception("Cannot pop from an empty stack!!");
    }
    else{
      //int removed = data[ptr];
      //ptr--;
      //return removed;
      return data[ptr--];
    }
  }
  public int peek() throws Exception
  {
    if(isEmpty()){
      throw new Exception("Cannot peek from an empty stack!!");
    }
    else{
      return data[ptr];
    }
  }
  public boolean isFull(){
    return ptr == data.length-1; // ptr is at last index
  }
  public boolean isEmpty(){
    return ptr == -1;
  }
  public void display() throws Exception
  {
     if(isEmpty()){
      throw new Exception("Cannot display from an empty stack!!");
    }
    else{
      for(int i=0; i<data.length; i++){
        System.out.println(data[i]+" ");
      }
    }
  }
  public static void main(String...ar) throws Exception
  {
    CustomStack stack = new CustomStack(5);
    Scanner sc = new Scanner(System.in);
    System.out.println("******************STACK IMPLEMENTATION*****************");
    System.out.println("1. Push element into the stack.");
    System.out.println("2. Pop element from the stack.");
    System.out.println("3. Peek the first element from the stack.");
    System.out.println("4. Print the complete stack.");
    int ch = sc.nextInt();
    do{
      switch(ch){
        case 1:
          stack.push(16);
          break;
        case 2:
          System.out.println(stack.pop()+" deleted.");
          break;
        case 3:
          System.out.println(stack.peek());
          break;
        case 4:
          stack.display();
          break;
      }
      System.out.println("Press -1 to end!!");
    }while(ch!=-1);
  }
}