public class NQueensProblem{

    public static boolean isSafe(char[][] board, int row, int col){
        //vertically up (i-1, j)
        for(int i=row-1; i>=0; i--){
            if(board[i][col] == 'Q'){
                return false;
            }
        }

        //Diagonally left up (i-1, j-1)
        for(int i=row-1, j=col-1; i>=0 && j>=0; i--, j--){
            if(board[i][j] == 'Q'){
                return false;
            }
        }

        //Diagonally right upward (i-1, j+1)
        for(int i=row-1, j=col+1; i>=0 && j<board.length; i--, j++){
            if(board[i][j] == 'Q'){
                return false;
            }
        }
        return true;
    }

    public static void nQueens(char[][] board, int row){
        //base
        if(row == board.length){
            count++;
            printBoard(board);
            return;
        }
        for(int j=0; j<board.length; j++){
            if(isSafe(board, row, j)){
                board[row][j]='Q';
                nQueens(board, row+1);
                board[row][j]='X';
            }
        }
    }

    public static void printBoard(char[][] board){
        System.out.println("-------------CHESS BOARD-----------");
        for(int i=0; i<board.length; i++){
            for(int j=0; j<board.length; j++){
                System.out.print(board[i][j]+" ");
            }
            System.out.println();
        }
    }
    static int count=0;
    public static void main(String...ar){
        int n=4;
        char board[][] = new char[n][n];
        for(int i=0; i<board.length; i++){
            for(int j=0; j<board.length; j++){
                board[i][j] = 'X';
            }
        }
        nQueens(board, 0);
        System.out.println("Total number of ways in which queens are place: "+count);
    }
}