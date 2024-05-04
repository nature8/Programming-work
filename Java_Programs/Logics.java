class Logics{
    public static void main(String ar[]){
        //int n=141;
        //int ans=0, rem;
        /*while(n>0){
            rem = n%10;
            ans = ans*10+rem;
            n /= 10;
        }
        System.out.println("Reverse: "+ans);*/
        /*int temp = n;
        while(n>0){
            rem = n%10;
            ans = ans*10+rem;
            n /= 10;
        }
        if(temp==ans){
            System.out.println("Palindrome");
        }
        else{
            System.out.println("Not palindrome");
        }*/
        /*int i=1;
        do{
            if(i%2==0){
                System.out.println(i);
            }
            i++;
        }while(i<11);*/
        /*int i=1;
        do{
            if(i%2==1){
                System.out.println(i);
            }
            i++;
        }while(i<11);*/
        //Fibonacci series
        /*int n=5;
        int term1=0, term2=1, nextTerm=0;;
        System.out.print(" "+term1);
        System.out.print(" "+term2);
        int i=1;
        while(i<=n-2){
            nextTerm = term1+term2;
            System.out.print(" "+nextTerm);
            term1 = term2;
            term2 = nextTerm;
            i++;
        }*/
        //Factorial
        /*int n = 5, fact=1;
        for(int i=1; i<=n; i++){
            fact = fact*i;
        }
        System.out.println("Factorial is: "+fact);*/
        
        int n = 3;
        int flag=0 ;
        if(n==0||n==1){
        System.out.println("Not prime");
        }
        else{
        for(int i=2; i<n/2; i++){
            if(n%i==0){
                System.out.println("Not Prime");
                flag = 1;
                break;
            }
        }
        if(flag==0){
            System.out.println("Prime");
        }
        } 
    }
}