class ArmstrongNumber{
    public static void main(String...ar){
        int r, sum=0, temp;
        int n = 153;
        //temp = n;
        while(n>0){
            r = n%10; // 3
            sum += (r)*r*r;
            n = n/10;
        }
        if(n==sum){
            System.out.println("Number is armstrong");
        }
        else{
            System.out.println("Number is not armstrong");
        }
    }
}