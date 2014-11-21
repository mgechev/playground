// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13251

import java.util.LinkedList;
import java.util.Queue;

public class CliqueGraph {
    private static int getSum(int[] arr, int idx) {
        int result = 0;
        for (int i = 0; i < idx; i += 1) {
            result += arr[i];
        }
        return result;
    }

    private static boolean hasEdge(int start, int end, int[] sizes) {
        for (int i = 0; i < sizes.length; i += 1) {
            if (getSum(sizes, i) <= start && end < getSum(sizes, i + 1)) {
                return true;
            }
        }
        return false;
    }

    private static int[][] buildGraph(int count, int[] vertices, int[] sizes) {
        int[][] matrix = new int[count][count];
        int start, end;
        for (int i = 0; i < vertices.length - 1; i += 1) {
            for (int j = i + 1; j < vertices.length; j += 1) {
                start = i;
                end = j;
                if (hasEdge(start, end, sizes) && vertices[start] != vertices[end]) {
                    matrix[vertices[start]][vertices[end]] = 1;
                    matrix[vertices[end]][vertices[start]] = 1;
                }
            }
        }
        return matrix;
    }

    private static int getPathSize(int start, int target, int[][] matrix) {
        int result = 0;
        Queue<Integer> queue = new LinkedList<Integer>();
        queue.add(start);
        int parents[] = new int[matrix.length];
        int current;
        boolean[] visited = new boolean[matrix.length];
        do {
            current = queue.poll();
            for (int i = 0; i < matrix.length; i += 1) {
                if (matrix[current][i] == 1 && !visited[i]) {
                    visited[i] = true;
                    queue.add(i);
                    parents[i] = current;
                }
            }
        } while (!queue.isEmpty() && current != target);
        if (current != target) {
            return result;
        }
        while (current != start) {
            current = parents[current];
            result += 1;
        }
        return result;
    }

    private static int calcSum(int N, int[] V, int[] sizes) {
        int[][] matrix = buildGraph(N, V, sizes);
        int result = 0;
        boolean[][] visited = new boolean[N][N];
        for (int i = 0; i < N; i += 1) {
            for (int j = 0; j < N; j += 1) {
                if (i != j && !visited[i][j] && !visited[j][i]) {
                    visited[i][j] = true;
                    result += getPathSize(i, j, matrix);
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
//        int[] V = {0, 1, 2, 0, 3};
//        int[] sizes = {3, 2};
//        int N = 4;
//        int[] V = {0,1,2,3,1,2,4};
//        int[] sizes = {4,3};
//        int N = 5;
        int[] V = {1,3,5,7,9,11,13,0
                ,2,3,6,7,10,11,14,0
                ,4,5,6,7,12,13,14,0
                ,8,9,10,11,12,13,14,0};
        int[] sizes = {8,8,8,8};
        int N = 130;
        int result = calcSum(N, V, sizes);
        System.out.println(result);
    }

}