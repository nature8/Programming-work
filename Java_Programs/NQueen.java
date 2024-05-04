class NQueen{
    public boolean isSafe(int row, int col, car[][] board){
        //horizontal[row]
        for(int j=0; j<board.length; j++){
            if(board[row][j] == 'Q'){
                return false;
            }
        }
        //Vertical for columns, that more then one queen will not enter in the same column
        for(int i=0; i<board.length; i++){
            if(board[i][col] == 'Q'){
                return false;
            }
        }
        //upper left diagonal
        int r=row;
        for(int c=col; c>=0 && r>=0; c--, r--){
            if(board[r][c] == 'Q'){
                return false;
            }
        }
        //upper right diagonal
        int r=row;
        for(int c=col; col<board.length && r>=0; r--, c++){
            if(board[r][c] == 'Q'){
                return false;
            }
        }
        //lower right diagonal
        r=row;
        for(int c=col; c>=0 && r<board.length; r++, c--){
            if(board[r][c] == 'Q'){
                return false;
            }
        }
        //lower right diagonal
        for(int c=col; col<board.length && r<board.length; c++, r++){
            if(board[r][c] == 'Q'){
                return false;
            }
        }
    }
    public void saveBoard(char[][] board, list<List<String>> allBoards){
        String row = "";
        List<String> newBoard = new ArrayList<>();
        for(int i=0; i<board.length; i++){
            row = "";
            for(int j=0; j<board[0].length; j++){
                if(board[i][j] == 'Q'){
                    row += 'Q';
                }
                else{
                    row += '.';
                }
                newBoard.add(row);
            }
            allBoards.add(newBoard);
        }
    }
    public void helper(char[][] board, list<List<String>> allBoards, int col){
        if(col == board.length){
            saveBoard(board, allBoards);
            return;
        }
        for(int row=0; row<board.length; row++){
            if(isSafe(row,cl,board)){
                board[row][col]='Q';
                helper(board, allBoards, col+1);
                board[row][col] = '.';
            }
        }
    }
    public list<List<String>> allBoards = new ArrayList<>();
    char[][] board = new board[n][n];
    helper(board, allboards, 0);
    return allBoards;
}

//time complexity=O(n^2)