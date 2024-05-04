class Reverse{
    public static void main(String...ar){
        int num = 256;
        int ans=0;
        while(num>0){
            int rem = num%10; // 6: last digit
            ans = ans*10 + rem;
            num /= 10; //25
        }
        System.out.println("Reverse: "+ans);
    }
}