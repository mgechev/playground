// TopCoder http://community.topcoder.com/stat?c=problem_statement&pm=13233

public class SpecialStrings {
    private static String getNext(String current) {
        String str = Integer.toBinaryString(Integer.parseInt(current, 2) + 1);
        while (str.length() < current.length()) {
            str = '0' + str;
        }
        return str;
    }

    private static boolean isSpecial(String str) {
        for (int i = 0; i < str.length(); i += 1) {
            if (str.charAt(i) != '0' && str.charAt(i) != '1') {
                return false;
            }
        }
        String prefix, suffix;
        for (int i = 1; i < str.length(); i += 1) {
            prefix = str.substring(0, i);
            suffix = str.substring(i, str.length());
            if (prefix.compareTo(suffix) >= 0) {
                return false;
            }
        }
        return true;
    }

    public static String findNext(String current) {
        String next = getNext(current);
        while (next.length() <= 50) {
            if (next.equals("00111")) {
                isSpecial(next);
            }
            if (isSpecial(next)) {
                return next;
            }
            next = getNext(next);
        }
        return "";
    }

    public static void main(String[] args) {
        String current = "01101111011110111";
        System.out.println(findNext(current));
    }

}