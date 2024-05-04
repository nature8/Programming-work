class StringLogic{
    public static void main(String...ar){
        String str1 = "apple";
        String str2 = "Apple";
        if(str1==str2) //checks addresses of str1 and str2
        {
            System.out.println("str1 and str2 are equal");
        }
        else{
            System.out.println("str1 and str2 are not equal");
        }
        if(str1.equals(str2)){
            System.out.println("str1 and str2 are equal");
        }
        else{
            System.out.println("str1 and str2 are not equal");
        }
        if(str1.compareTo(str2)==0){
            System.out.println("str1 and str2 are equal");
        }
        else{
            System.out.println("str1 and str2 are not equal");
        }
        char ch[] = new char[str1.length()];
        for(int i=0; i<str1.length(); i++){
            ch[i]=str.charAt(i);
        }
        System.out.println(str1.charAt(2));
        System.out.println(str1.indexOf('a'));
        System.out.println(str1.toUpperCase());
        System.out.println(str1.toLowerCase());
    }
}