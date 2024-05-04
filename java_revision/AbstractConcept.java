abstract class A{
    abstract void show();
}
class B extends A{
    void show(){
        System.out.println("Show of B");
    }
}
class C extends A{
    void show(){
        System.out.println("Show of C");
    }
}
 
class AbstractConcept{
    public static void main(String ar[]){
	A ref1 = new B();  //B ref1 = new B();
        ref1.show();
        A ref2 = new C();  //C ref2 = new C();
        ref2.show();
    }
}N