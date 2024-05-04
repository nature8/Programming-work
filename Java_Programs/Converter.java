class Converter{
   public static void main(String...ar){
       float fah, cel=29f;
       fah=((cel*1.8f)+32);
       System.out.println(cel+" celcius= "+fah+" fahrenhiet");
       float fahr = 100f;
       float cels=(fahr-32)*(5/9f);
       System.out.println(fahr+" fahrenhiet= "+cels+" celcius");
   }
}