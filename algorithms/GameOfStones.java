// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13480
public class GameOfStones {
    private static int maxIterations(int[] stones) {
        return stones[getMaxIndex(stones)] / 2 * stones.length;
    }

    private static boolean stonesOrdered(int[] stones) {
        for (int i = 0; i < stones.length - 1; i += 1) {
            if (stones[i] != stones[i + 1]) {
                return false;
            }
        }
        return true;
    }

    private static int getMinIndex(int[] stones) {
        int res = 0;
        for (int i = 1; i < stones.length; i += 1) {
            if (stones[i] < stones[res]) {
                res = i;
            }
        }
        return res;
    }

    private static int getMaxIndex(int[] stones) {
        int res = 0;
        for (int i = 1; i < stones.length; i += 1) {
            if (stones[i] > stones[res]) {
                res = i;
            }
        }
        return res;
    }

    public static int count(int[] stones) {
        int maxIterations = maxIterations(stones);
        int totalMoves = 0;
        while (totalMoves < maxIterations && !stonesOrdered(stones)) {
            totalMoves += 1;
            int minIdx = getMinIndex(stones);
            int maxIdx = getMaxIndex(stones);
            stones[minIdx] += 2;
            stones[maxIdx] -= 2;
            for (int c : stones) {
                System.out.print(c + " ");
            }
            System.out.println();
        }
        return (totalMoves >= maxIterations) ? -1 : totalMoves;
    }

    public static void main(String[] args) {
        int[] arr = {7, 15, 9, 5};
        int[] arr2 = {10, 15, 20, 12, 1, 20};
        int[] arr3 = {17};
        int[] arr4 = {10, 16};
        int[] arr5 = {64, 0, 0, 0};
        System.out.println(count(arr5));
    }

}