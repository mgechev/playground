public class ChessMetric {
    private static int getIndex(int top, int left, int size) {
        return top * size + left;
    }

    private static void setNeighbors(int i, int j, int[][] result, int size) {
        int idx = getIndex(i, j, size);
        if (j - 1 >= 0) {
            result[idx][getIndex(i, j - 1, size)] = 1;
        }
        if (i - 1 >= 0) {
            result[idx][getIndex(i - 1, j, size)] = 1;
        }
        if (i + 1 < size) {
            result[idx][getIndex(i + 1, j, size)] = 1;
        }
        if (j + 1 < size) {
            result[idx][getIndex(i, j + 1, size)] = 1;
        }
        if (i + 1 < size && j + 1 < size) {
            result[idx][getIndex(i + 1, j + 1, size)] = 1;
        }
        if (i - 1 >= 0 && j + 1 < size) {
            result[idx][getIndex(i - 1, j + 1, size)] = 1;
        }
        if (i + 1 < size && j - 1 >= 0) {
            result[idx][getIndex(i + 1, j - 1, size)] = 1;
        }
        if (i - 1 >= 0 && j - 1 >= 0) {
            result[idx][getIndex(i - 1, j - 1, size)] = 1;
        }
        if (i + 2 < size && j + 1 < size) {
            result[idx][getIndex(i + 2, j + 1, size)] = 1;
        }
        if (i - 2 >= 0 && j - 1 >= 0) {
            result[idx][getIndex(i - 2, j - 1, size)] = 1;
        }
        if (i - 2 >= 0 && j + 1 < size) {
            result[idx][getIndex(i - 2, j + 1, size)] = 1;
        }
        if (i + 2 < size && j - 1 >= 0) {
            result[idx][getIndex(i + 2, j - 1, size)] = 1;
        }
        if (i + 1 < size && j + 2 < size) {
            result[idx][getIndex(i + 1, j + 2, size)] = 1;
        }
        if (i - 1 >= 0 && j + 2 < size) {
            result[idx][getIndex(i - 1, j + 2, size)] = 1;
        }
        if (i + 1 < size && j - 2 >= 0) {
            result[idx][getIndex(i + 1, j - 2, size)] = 1;
        }
        if (i - 1 >= 0 && j - 2 >= 0) {
            result[idx][getIndex(i - 1, j - 2, size)] = 1;
        }
    }

    private static int[][] buildMatrix(int size) {
        int[][] result = new int[size * size][size * size];
        for (int i = 0; i < size; i += 1) {
            for (int j = 0; j < size; j += 1) {
                setNeighbors(i, j, result, size);
            }
        }
        return result;
    }

    private static long countPaths(int start, int end, int[][] matrix, int num) {
        if (start == end && num == 0) {
            return 1;
        }
        if (matrix[start][end] == 1 && num == 1) {
            return 1;
        }
        if (num == 0) return 0;
        long count = 0;
        for (int i = start; i < matrix.length; i += 1) {
            if (matrix[start][i] == 1) {
                count += countPaths(i, end, matrix, num - 1);
            }
        }
        return count;
    }

    public static long howMany(int size, int[] start, int[] end, int numMoves) {
        int[][] matrix = buildMatrix(size);
        return countPaths(getIndex(start[0], start[1], size), getIndex(end[0], end[1], size), matrix, numMoves);
    }

    public static void main(String[] args) {
        System.out.println(howMany(100, new int[]{0, 0}, new int[]{0, 99}, 50));
    }
}