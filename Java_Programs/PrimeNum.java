class PrimeNum{
    public static void main(String ar[]){
        /*int i, m=0, flag=0;
        int n=3;
        m=n/2;
        if(n==0||n==1){
            System.out.println("Prime");
        }
        else{
            for(i=2; i<=m; i++){
                if(n%i==0){
                    System.out.println("Not prime");
                }
                flag=1;
                break;
            }
        }
        if(flag==0){
            System.out.println("Prime");
        }*/
        int flag=0;
        int n=3;
        if(n==0||n==1){
            System.out.println("Prime");
        }
        else{
            for(int i=2; i<=n/2; i++){
                if(n%i==0){
                    System.out.println("Not Prime");
                    flag=1;
                    break;
                }
                
            }
        }
        if(flag==0){
            System.out.println("Prime");
        }
    }
}