import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class BracketExpressions {

    private static Map<Character, Character> map;
    private static char[] brackets = { '(', ')', '{', '}', '[', ']' };

    private static boolean testString(String str, int start, int end) {
        if (start >= end || str.length() == 0) {
            return true;
        }
        Character opposite = map.get(str.charAt(start));
        Stack<Character> stack = new Stack<Character>();
        if (opposite == null) {
            return false;
        }
        stack.push(str.charAt(start));
        for (int i = start + 1; i < end; i += 1) {
            if (str.charAt(i) == str.charAt(start)) {
                stack.push(str.charAt(start));
            }
            if (opposite.equals(str.charAt(i))) {
                stack.pop();
                if (stack.size() == 0) {
                    return testString(str, start + 1, i) && testString(str, i + 1, end);
                }
            }
        }
        return false;
    }

    private static String buildString(char[] brackets, String str) {
        char[] charArr = str.toCharArray();
        int c = 0;
        for (int i = 0; i < charArr.length; i += 1) {
            if (charArr[i] == 'X') {
                charArr[i] = brackets[c++];
            }
        }
        return new String(charArr);
    }

    private static boolean isPossible(String str, char[] brackets, char[] current, int index, int size) {
        if (index == size) {
            String res = buildString(current, str);
            return testString(res, 0, res.length());
        }
        boolean res = false;
        for (int i = 0; i < brackets.length; i += 1) {
            if (index == 0) {
                current = new char[size];
            }
            current[index] = brackets[i];
            res = res || isPossible(str, brackets, current, index + 1, size);
        }
        return res;
    }

    private static int getXCount(String str) {
        int count = 0;
        for (int i = 0; i < str.length(); i += 1) {
            if (str.charAt(i) == 'X') {
                count += 1;
            }
        }
        return count;
    }

    public static String ifPossible(String str) {
        boolean res = isPossible(str, brackets, null, 0, getXCount(str));
        if (res) {
            return "possible";
        }
        return "impossible";
    }

    public static void main(String[] args) {
        map = new HashMap<Character, Character>();
        map.put('(', ')');
        map.put('[', ']');
        map.put('{', '}');
        System.out.println(ifPossible("([]X()[()]XX}[])X{{}}]"));
    }
}