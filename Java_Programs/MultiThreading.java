class NewThread extends Thread{
    String name;
    NewThread(String name){
        this.name=name;
        start();
    }
    public void run(){
	Call.call(name);
    }
}
class Call{
    synchronized static void call(String nm){
        try{
	    System.out.println(nm+" Started");
            Thread.sleep(2000);
            System.out.println(nm+" ended");
        }
        catch(InterruptedException ex){
            System.out.println("Wrong!!");
        }
    }
}
class MultiThreading{
    public static void main(String...ar){
        NewThread t1 = new NewThread("First thread");
        NewThread t2 = new NewThread("Second thread");
        NewThread t3 = new NewThread("Third thread");
    }
}