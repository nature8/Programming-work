class Patterns{
    public static void main(String ar[]){
        int n=5;

/* *****
   *****
   *****
   *****
   *****  */
        /*for(int i=1; i<=n; i++){
            for(int j=1; j<=n; j++){
                System.out.print("*");
            }
            System.out.println();
        }*/
/* *****
   *   *
   *   *
   *   *
   *****  */
        /*for(int i=1; i<=n; i++){
            for(int j=1; j<=n; j++){
                if(i==1 || i==n || j==1 || j==n){
                    System.out.print("*");
                }
                else{
                    System.out.print(" ");
                }
            }
            System.out.println();
        }*/
/*  *
    **
    ***
    ****
    *****  */
        /*for(int i=1; i<=n; i++){
            for(int j=1; j<=i; j++){
                System.out.print("*");
            }
            System.out.println();
        }*/
/*  *****
    ****
    ***
    **
    *  */
        /*for(int i=n; i>=1; i--){
            for(int j=1; j<=i; j++){
                System.out.print("*");
            }
            System.out.println();
        }*/
/*      *
       **
      ***
     ****
    ***** */
        /*for(int i=1; i<=n; i++){
            for(int j=1; j<=n-i; j++){
                System.out.print(" ");
            }
            for(int j=1; j<=i; j++){
                System.out.print("*");
            }
            System.out.println();
        }*/
/* *****
   ****
   ***
   **
   *  */
        /*for(int i=1; i<=n; i++){
            for(int j=0; j<=n-i; j++){
                System.out.print("*");
            }
            for(int j=1; j<=i; j++){
                System.out.print(" ");
            }
            System.out.println();
        }*/
/* *****
    ****
     ***
      **
       *  */
        /*for(int i=n; i>=1; i--){
            
            for(int j=1; j<=n-i; j++){
                System.out.print(" ");
            }
            for(int j=1; j<=i; j++){
                System.out.print("*");
            }
            System.out.println();
        }*/
    }
}