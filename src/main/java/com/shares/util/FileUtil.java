package com.shares.util;

import java.text.DecimalFormat;

public class FileUtil {

    public static String formatSize(int fileSize){
        if (fileSize == 0) return "0";
        int k = 1024;
        String[] units = {"B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"};
        int i = (int)Math.floor(Math.log(fileSize)/Math.log(k));
        DecimalFormat df = new DecimalFormat( "0.00");
        return df.format(fileSize*1.0 / Math.pow(k, i)) + units[i];
    }

}
