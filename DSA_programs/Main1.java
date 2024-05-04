import java.util.Scanner;

public class Main1 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int Xcount = scanner.nextInt(); // Number of elements in X
        int[] X = new int[Xcount];
        for (int i = 0; i < Xcount; i++) {
            X[i] = scanner.nextInt(); // Elements of X
        }

        int Ycount = scanner.nextInt(); // Number of elements in Y
        int[] Y = new int[Ycount];
        for (int i = 0; i < Ycount; i++) {
            Y[i] = scanner.nextInt(); // Elements of Y
        }

        int Zcount = scanner.nextInt(); // Number of elements in Z
        int[] Z = new int[Zcount];
        for (int i = 0; i < Zcount; i++) {
            Z[i] = scanner.nextInt(); // Elements of Z
        }

        int modulo = 1000000007; // Modulo value
        long score = calculateScore(X, Y, Z, modulo);
        System.out.println(score);

        scanner.close();
    }

    public static long calculateScore(int[] X, int[] Y, int[] Z, int modulo) {
        long score = 0;

        for (int y : Y) {
            for (int x : X) {
                for (int z : Z) {
                    long term1 = (y - x) % modulo;
                    long term2 = (y - z) % modulo;
                    score = (score + (term1 * term2) % modulo + modulo) % modulo;
                }
            }
        }

        return score;
    }
}