public class LongestCommonSubstringDP {
    public static String longestCommonSubstringDP(String a, String b) {
        int[][] memo = new int[a.length()][b.length()];
        int max = 0;
        int endA = 0;
        for (int i = 0; i < a.length(); i += 1) {
            for (int j = 0; j < b.length(); j += 1) {
                if (a.charAt(i) == b.charAt(j)) {
                    if (i == 0 || j == 0) {
                        memo[i][j] = 1;
                    } else {
                        memo[i][j] = memo[i - 1][j - 1] + 1;
                        if (max < memo[i][j]) {
                            max = memo[i][j];
                            endA = i;
                        }
                    }
                }
            }
        }
        endA += 1;
        return a.substring(endA - max, endA);
    }

    public static void main(String[] args) {
    }
}