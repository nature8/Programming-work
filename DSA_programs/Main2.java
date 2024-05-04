import java.util.Scanner;

public class Main2 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int T = scanner.nextInt(); // Number of games

        int[] results = new int[T];
        for (int i = 0; i < T; i++) {
            int N = scanner.nextInt(); // Number of elements in array A
            int[] A = new int[N];
            for (int j = 0; j < N; j++) {
                A[j] = scanner.nextInt(); // Elements of array A
            }
            results[i] = determineWinner(A);
        }

        for (int result : results) {
            System.out.print(result);
        }

        scanner.close();
    }

    public static int determineWinner(int[] A) {
        int xorResult = 0;

        for (int value : A) {
            int minDivisor = minimumDivisorOf(value);
            int maxDivisor = maximumDivisorOf(value);

            // Check if a valid move is possible for this value
            if (minDivisor <= maxDivisor) {
                xorResult ^= 1; // Toggle the result for each valid move
            }
        }

        return xorResult;
    }

    public static int minimumDivisorOf(int X) {
        for (int i = 2; i * i <= X; i++) {
            if (X % i == 0) {
                return i;
            }
        }
        return X;
    }

    public static int maximumDivisorOf(int X) {
        for (int i = X - 1; i >= 2; i--) {
            if (X % i == 0) {
                return i;
            }
        }
        return 1;
    }
}