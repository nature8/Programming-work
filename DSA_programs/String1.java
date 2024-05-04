class String1{
  public static void skip(String p, String up){
    if(up.isEmpty()){
      System.out.print(p);
      return;
    }
    char ch = up.charAt(0);
    if(ch=='a'){
      skip(p, up.substring(1));
    }
    else{
      skip(p+ch, up.substring(1));
    }
  }

  public static String skip2(String up){
    if(up.isEmpty()){
      return "";
    }
    char ch = up.charAt(0);
    if(ch=='a'){
      return skip2(up.substring(1));
    }
    else{
      return ch+skip2(up.substring(1));
    }
  }

  public static String skipString(String up){
    if(up.isEmpty()){
      return "";
    }
    if(up.startsWith("apple")){
      return skipString(up.substring(5));
    }
    else{
      return up.charAt(0)+skipString(up.substring(1));
    }
  }

  public static String skipStringApp(String up){
    if(up.isEmpty()){
      return "";
    }
    if(up.startsWith("app") && !up.startsWith("apple")){
      return skipStringApp(up.substring(3));
    }
    else{
      return up.charAt(0)+skipStringApp(up.substring(1));
    }
  }

  public static void main(String...ar){
    skip("","baccad");
    System.out.println();
    System.out.println(skipString("apple is good for health"));
    System.out.println(skipStringApp("bacapplcdah"));
  }
}