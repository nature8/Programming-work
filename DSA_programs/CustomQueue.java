class CustomQueue{
  int end=-1;
  protected int data[];
  private static final int DEFAULT_SIZE = 10;
  public CustomQueue(){
    this(DEFAULT_SIZE);
  }
  public CustomQueue(int size){
    this.data = new int[size];
  }
  public boolean insert(int item){
    if(isFull()){
      return false;
    }
    data[end++]=item;
    return true;
  }
  public boolean isFull(){
    return ptr == data.length-1; // ptr is at last index
  }
  public boolean isEmpty(){
    return ptr == -1;
  }
  public static void main(String...ar) throws Exception
  {
    CustomQueue queue = new CustomQueue();
    queue.insert(10);
    queue.insert(20);
    queue.insert(60);
    queue.insert(70);
    System.out.println(queue+" ");
  }
}