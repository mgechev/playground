// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=1889&rd=4709
public class AvoidRoads {
    private long[][] map;

    private boolean blocked(int wS, int wE, int hS, int hE, String[] bad) {
        String str = wS + " " + wE + " " + hS + " " + hE;
        for (String s : bad) {
            if (s.equals(str)) {
                return true;
            }
        }
        return false;
    }

    private long calculatePaths(int width, int height, String[] bad, long[][] map) {
        if ((width == 1 && height == 0 && !blocked(width - 1, height, width, height, bad)) ||
            (height == 1 && width == 0 && !blocked(width, height - 1, width, height, bad))) {
            return 1;
        }
        int lowWidth = width - 1;
        int lowHeight = height - 1;
        long result = 0;
        if (lowWidth >= 0 && !blocked(lowWidth, height, width, height, bad)
                && !blocked(width, height, lowWidth, height, bad)) {
           result += map[height][lowWidth];
        }
        if (lowHeight >= 0 && !blocked(width, lowHeight, width, height, bad)
                && !blocked(width, height, width, lowHeight, bad)) {
           result += map[lowHeight][width];
        }
        return result;
    }

    public long numWays(int width, int height, String[] bad) {
        map = new long[width + 1][height + 1];
        map[0][0] = 0;
        int levelWidth = 0;
        int levelHeight = 0;
        while (levelWidth <= width && levelHeight <= height) {
            for (int i = 0; i <= height && levelWidth <= width; i += 1) {
               map[i][levelWidth] = calculatePaths(levelWidth, i, bad, map);
            }
            levelWidth += 1;
            for (int i = 0; i <= width && levelHeight <= height; i += 1) {
               map[levelHeight][i] = calculatePaths(i, levelHeight, bad, map);
            }
            levelHeight += 1;
        }
        return map[height][width];
    }

    public long[][] getMap() {
        return this.map;
    }

    public static void main(String[] args) {
        AvoidRoads instance = new AvoidRoads();
        String[] bad = {"0 0 0 1", "6 6 5 6"};
        System.out.println(instance.numWays(6, 6, bad));
//        long[][] map = instance.getMap();
//        for (int i = 0; i < map.length; i += 1) {
//            for (int j = 0; j < map[i].length; j += 1) {
//                System.out.print(map[i][j] + "\t");
//            }
//            System.out.println();
//        }
    }
}