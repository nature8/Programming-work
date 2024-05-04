import java.util.Arrays;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int H = scanner.nextInt(); // Initial health of the monster
        int N = scanner.nextInt(); // Number of attacks

        int[] damage = new int[N];
        for (int i = 0; i < N; i++) {
            damage[i] = scanner.nextInt(); // Damage of each attack
        }

        int result = minAttacksToDefeatMonster(H, N, damage);
        System.out.println(result);

        scanner.close();
    }

    public static int minAttacksToDefeatMonster(int H, int N, int[] damage) {
        Arrays.sort(damage); // Sort the damage array in ascending order
        int minAttacks = 0;

        for (int i = N - 1; i >= 0; i--) {
            int neededAttacks = (H + damage[i] - 1) / damage[i]; // Ceil division
            int usedAttacks = Math.min(neededAttacks, 2); // Use at most 2 attacks

            minAttacks += usedAttacks;
            H -= usedAttacks * damage[i];

            if (H <= 0) {
                return minAttacks;
            }
        }

        return -1; // It's not possible to defeat the monster
    }
}