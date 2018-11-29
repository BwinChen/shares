package com.shares.util;

import lombok.extern.slf4j.Slf4j;
import java.util.ArrayList;
import java.util.List;

@Slf4j
public class ListUtil {

    public static void main(String[] args){
        List<String> input= new ArrayList<>();
        for (int i = 0; i<21; i++){
            input.add("item"+i);
        }
        System.out.println(input);
        List<List<String>> output = splitList(input, 7);
        for (List<String> anOutput : output) {
            System.out.println(anOutput);
        }
    }

    /**
     * 将一个数组拆分成若干个子数组
     * @param size 子数组大小
     * @return 子数组构成的数组
     */
    public static List<List<String>> splitList(List<String> list, int size) {
        List<List<String>> output = new ArrayList<>();
        if( list.size()%size!=0) {
            for (int j = 0; j < list.size() / size + 1; j++) {
                if ((j * size + size) < list.size()) {
                    output.add(list.subList(j * size, j * size + size));//0-3,4-7,8-11    j=0,j+3=3   j=j*3+1
                } else if ((j * size + size) > list.size()) {
                    output.add(list.subList(j * size, list.size()));
                } else if (list.size() < size) {
                    output.add(list.subList(0, list.size()));
                }
            }
        }else if(list.size()%size==0){
            for (int j = 0; j < list.size() / size; j++) {
                if ((j * size + size) <= list.size()) {
                    output.add(list.subList(j * size, j * size + size));//0-3,4-7,8-11    j=0,j+3=3   j=j*3+1
                } else if ((j * size+ size) > list.size()) {
                    output.add(list.subList(j * size, list.size()));
                } else if (list.size() < size) {
                    output.add(list.subList(0, list.size()));
                }
            }
        }
        return output;
    }

    /**
     * 模拟对list进行分页
     * @param input 需要分页的list
     * @param pageNumber 页码，从1开始
     * @param pageSize 页数据量
     * @return list的一部分或空数组
     */
    public static List<String> subList(List<String> input, int pageNumber, int pageSize ) {
        log.info("模拟对list进行分页");
        if (input == null || input.size() <1){
            return new ArrayList<>();
        }
        int size = input.size();
        if (pageSize < 1){
            return new ArrayList<>();
        }
        int totalPages = (size + pageSize - 1) / pageSize;
        if (pageNumber < 1 || pageNumber > totalPages){
            return new ArrayList<>();
        }
        int fromIndex = (pageNumber-1)*pageSize;
        if (fromIndex + pageSize > size){
            return input.subList(fromIndex, size);
        }
        return input.subList(fromIndex, fromIndex + pageSize);
    }

}
