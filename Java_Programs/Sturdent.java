import java.util.Scanner;
 class Student
  {
   static public void main(String...arguments)
    {
     Scanner sc = new Scanner(System.in);
     
     System.out.println("Enter the rollno:");
       int rollNo = sc.nextInt();
     System.out.println("Enter the student name:");
       String studentName = sc.next();
     System.out.println("Enter the college name:");
       String collegeName = sc.next();
     System.out.println("Enter the year:");
       int year = sc.nextInt();
     System.out.println("Enter the branch:");
       String branch = sc.next();
     System.out.println("Enter the semester:");
       byte semester = sc.nextByte();
     System.out.println("Enter the number of subjects:");
       int number = sc.nextInt();
     System.out.println("Enter the subjects name:");
       for(int i=0;i<=number;i++)
       {
         String subjectName = sc.nextLine();
       }
        int subjectMarks[] = new int[number];
     System.out.println("Enter the subjects marks:");
        for(int i=0;i<number;i++)
        {
           subjectMarks[i] = sc.nextInt();
        }
     //System.out.println("Enter the maximum mark:");
       // int maxMark = sc.nextInt();
    // System.out.println("Enter the minimum mark:");
      //  int minMark = sc.nextInt();
        int total = 0;
     System.out.println("Enter the obtanied marks:");
         for(int i=0;i<number;i++)
         { 
            total = total+subjectMarks[i];
          }
         System.out.println(total);
          

       System.out.println("percentage:");
       float percentage = (total/(float)number);
     System.out.println("Percentage is:"+percentage);
      
      if((percentage>=70)&&(percentage<100))
     {
      System.out.println("\n A Grade");
     }
     else
     {
     if((percentage>=60)&&(percentage<70))
      {
       System.out.println("\n B Grade");
       }
     else
       {
        System.out.println("\n Fail");
        }
      }
    //System.out.println("---------MENU----------");
     System.out.println("Enter the grade shown above:");
     String grade = sc.next();
     switch(grade){
     case 'A':
         System.out.println("*********MICROSOFT********");
         System.out.println("Microsoft headquarter: Hydrabad");
     }
    
     }
  }