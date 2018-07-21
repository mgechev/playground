// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13416
import java.util.LinkedList;
import java.util.List;

public class LonglongestPathTree {
    private boolean isTree(int[][] matrix) {
        // in case we have not connected graph
        for (int i = 0; i < matrix.length; i += 1) {
            boolean[] visited = new boolean[matrix.length];
            int[] parents = new int[matrix.length];
            for (int j = 0; j < parents.length; j += 1) {
                parents[j] = -1;
            }
            LinkedList<Integer> stack = new LinkedList<Integer>();
            int current;
            stack.push(i);
            while (stack.size() != 0) {
                current = stack.pop();
                visited[current] = true;
                for (int j = 0; j < matrix[current].length; j += 1) {
                    if (matrix[current][j] != 0 && !visited[j]) {
                        if (parents[j] != -1 && parents[j] != current) {
                            return false;
                        }
                        parents[j] = current;
                        stack.push(j);
                    }
                }
            }
        }
        return true;
    }

    public int dfs(int[][] matrix, int current, int sum, boolean[] visited) {
        boolean res = true;
        for (int i = 0; i < visited.length; i += 1) {
            res = res && visited[i];
        }
        if (res) {
            return sum;
        }
        List<Integer> results = new LinkedList<Integer>();
        visited[current] = true;
        for (int i = 0; i < matrix.length; i += 1) {
            if (matrix[current][i] != 0 && !visited[i]) {
                results.add(dfs(matrix, i, sum + matrix[current][i], visited.clone()));
            }
        }
        int max = 0;
        for (int c : results) {
            if (c > max) {
                max = c;
            }
        }
        return Math.max(sum, max);
    }

    public int getDiameter(int[][] matrix) {
        int max = 0, current;
        for (int i = 0; i < matrix.length; i += 1) {
            current = dfs(matrix, i, 0, new boolean[matrix.length]);
            if (current > max) {
                max = current;
            }
        }
        return max;
    }

    public int[][] buildMatrix(int[] A, int[] B, int[] L) {
        int[][] res = new int[A.length + 1][A.length + 1];
        for (int i = 0; i < A.length; i += 1) {
            res[A[i]][B[i]] = L[i];
            res[B[i]][A[i]] = L[i];
        }
        return res;
    }

    public int getLength(int[] A, int[] B, int[] L) {
        int max = 0;
        int nodesCount = A.length + 1;
        for (int i = 0; i < A.length; i += 1) {
            int a = A[i];
            int b = B[i];
            for (int j = 0; j < nodesCount; j += 1) {
                for (int k = 0; k < nodesCount; k += 1) {
                    if (j != k) {
                        A[i] = j;
                        B[i] = k;
                        int[][] matrix = buildMatrix(A, B, L);
                        if (isTree(matrix)) {
                           int d = getDiameter(matrix);
                           if (max < d) {
                               max = d;
                           }
                        }
                    }
                }
            }
            A[i] = a;
            B[i] = b;
        }
        return max;
    }

    public static void main(String[] args) {
//        int[] A = {0,0,0};
//        int[] B = {1,2,3};
//        int[] L = {2,4,8};
//        int[] A = {0,1,2,3};
//        int[] B = {1,2,3,4};
//        int[] L = {1,2,3,4};
//        int[] A = {0,1,0,3,0,6,7,7,8,9,11};
//        int[] B = {1,2,3,4,5,5,5,8,9,10,9};
//        int[] L = {100,1000,100,1000,1,10,10,10,10,100,100};
//        int[] A = {1,5,6,4,4,0,3,3};
//        int[] B = {6,6,4,8,0,3,2,7};
//        int[] L = {1,1,1,1,1,1,1,1};
//        int[] A = {0,1,2,3,0,1,2,3,4};
//        int[] B = {1,2,3,4,5,6,7,8,9};
//        int[] L = {10,1,1,10,10,1000,100,1000,10};
//        LonglongestPathTree tree = new LonglongestPathTree();
//        System.out.println(tree.getLength(A, B, L));
//        int[] A = {3,0,0};
//        int[] B = {1,2,3};
//        int[] L = {2,4,8};
//        LonglongestPathTree tree = new LonglongestPathTree();
//        System.out.println(tree.isTree(tree.buildMatrix(A, B, L)));
    }

}
