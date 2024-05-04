//Abstract class in java

abstract class A{
    abstract void show();
}
class B extends A{
    void show(){
        System.out.println("Show B");
    }
}
class C extends A{
    void show(){
    	System.out.println("Show C");
    }
}
class AbstractClass{
    public static void main(String...ar){
         B ref1 = new B();
         ref1.show();
	 C ref2 = new C();
         ref2.show();
    }
}