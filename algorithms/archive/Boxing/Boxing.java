// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=2977

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class Boxing {

    private void buildCredits(List<Credit> res, int[] timestamps, int c) {
        for (int i = 0; i < timestamps.length; i += 1) {
            res.add(new Credit(c, timestamps[i]));
        }
    }

    public int maxCredit(int[] a, int[] b, int[] c, int[] d, int[] e) {
        List<Credit> credits = new ArrayList<Credit>(a.length + b.length + c.length + d.length + e.length);
        buildCredits(credits, a, 0);
        buildCredits(credits, b, 1);
        buildCredits(credits, c, 2);
        buildCredits(credits, d, 3);
        buildCredits(credits, e, 4);
        Collections.sort(credits);
        int start = 0;
        Credit current;
        int totalRefs = 0;
        List<Integer[]> intervals = new LinkedList<Integer[]>();
        boolean[] refs = new boolean[5];

        for (int i = 0; i < credits.size(); i += 1) {
            current = credits.get(i);
            int oldStart = start;
            while (current.getTimestamp() - credits.get(start).getTimestamp() > 1000 && start < i) {
                start += 1;
            }
            if (oldStart != start) {
                refs = new boolean[5];
                totalRefs = 0;
                for (int j = start; j < i; j += 1) {
                    Credit temp = credits.get(j);
                    if (!refs[temp.getReferee()]) {
                        refs[temp.getReferee()] = true;
                        totalRefs += 1;
                    }
                }
            }
            if (!refs[current.getReferee()]) {
                refs[current.getReferee()] = true;
                totalRefs += 1;
                if (totalRefs >= 3) {
                    intervals.add(new Integer[]{ credits.get(start).getTimestamp(), current.getTimestamp() });
                    while (i < credits.size() && current.getTimestamp() >= credits.get(i).getTimestamp()) {
                        i += 1;
                    }
                    start = i;
                    refs = new boolean[5];
                    totalRefs = 0;
                }
            }
        }
        for (Integer[] interval : intervals) {
            System.out.println(interval[0] + " - " + interval[1]);
        }
        return intervals.size();
    }

    public static void main(String[] args) {
        Boxing boxing = new Boxing();
        int[] a = new int[]{1,2,3,4,5,6};
        int[] b = new int[]{1,2,3,4,5,6,7};
        int[] c = new int[]{1,2,3,4,5,6};
        int[] d = new int[]{0,1,2};
        int[] e = new int[]{1,2,3,4,5,6,7,8};

//        int[] a = new int[]{100,200,300,1200,6000};
//        int[] b = new int[]{};
//        int[] c = new int[]{900,902,1200,4000,5000,6001};
//        int[] d = new int[]{0,2000,6002};
//        int[] e = new int[]{1,2,3,4,5,6,7,8};

//        int[] a = new int[]{5000,6500};
//        int[] b = new int[]{6000};
//        int[] c = new int[]{6500};
//        int[] d = new int[]{6000};
//        int[] e = new int[]{0,5800,6000};

        System.out.println(boxing.maxCredit(a, b, c, d, e));
    }
}