import java.util.Scanner;
class SearchInTwoD{
    public static void main(String ar[]){
        Scanner sc = new Scanner(System.in);
    	System.out.println("Enter number of rows in 2D array: ");
    	int rows = sc.nextInt();
    	System.out.println("Enter number of columns in 2D array: ");
    	int cols = sc.nextInt();
    	int arr[][] = new int[rows][cols];
    	System.out.println("Enter array of 1D array elements: ");
        for(int i=0; i<rows; i++){
            for(int j=0; j<cols; j++){
            arr[i][j] = sc.nextInt();
            }
        }
        System.out.println("Enter key to be search: ");
        int key = sc.nextInt();
        for(int i=0; i<rows; i++){
            for(int j=0; j<cols; j++){
                if(arr[i][j]==key){
                    System.out.println("Numeber is found at: "+i+j);
                }
            }
        }
    }
}