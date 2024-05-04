class PalindromeNumber{
    public static void main(String...ar){
        int r, sum=0, temp;
        int n = 343;
        temp = n;
        while(n>0){
            r = n%10; // 3
            sum = (sum*10) + r;
            n = n/10;
        }
        if(temp==sum){
            System.out.println("Number is palindrome");
        }
        else{
            System.out.println("Number is not palindrome");
        }
    }
}