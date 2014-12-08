public class Credit implements Comparable<Credit> {
    private int referee;
    private int timestamp;
    public Credit(int r, int t) {
        this.referee = r;
        this.timestamp = t;
    }

    public int getReferee() {
        return this.referee;
    }
    public int getTimestamp() {
        return this.timestamp;
    }

    @Override
    public int compareTo(Credit o) {
        Credit other = o;
        return this.timestamp - other.timestamp;
    }
}