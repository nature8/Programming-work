import java.util.ArrayList;
public class SubSeq {
    static void subSeqnc(String p, String up){
        if(up.isEmpty()){
            System.out.print(p+" ");
            return;
        }
        char ch = up.charAt(0);
        subSeqnc(p+ch, up.substring(1)); // add the character to the proceesed string
        subSeqnc(p, up.substring(1)); // skip/ not add that character to the processed string
    }

    static public ArrayList<String> subSeqncList(String p, String up){
        ArrayList<String> list = new ArrayList<>();
        if(up.isEmpty()){
            //ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }
        char ch = up.charAt(0);
        ArrayList<String> left = subSeqncList(p+ch, up.substring(1)); // add the character to the proceesed string
        ArrayList<String> right = subSeqncList(p, up.substring(1)); // skip/ not add that character to the processed string
        left.addAll(right);
        return left;
        //return right;
    }

    static void subSeqncAscii(String p, String up){
        if(up.isEmpty()){
            System.out.println(p);
            return;
        }
        char ch = up.charAt(0);
        subSeqncAscii(p+ch, up.substring(1)); // add the character to the proceesed string
        subSeqncAscii(p, up.substring(1)); // skip/ not add that character to the processed string
        subSeqncAscii(p+(ch+0), up.substring(1));
    }

    public static void main(String[] args) {
        subSeqnc("", "abc");
        System.out.println();
        System.out.println(subSeqncList("", "abc"));
        subSeqncAscii("", "abc");
    }
}
