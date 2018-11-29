//package com.shares.controller;
//
//import com.shares.entity.FontDTO;
//import com.shares.service.ShareService;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.servlet.ModelAndView;
//import java.io.IOException;
//import java.util.Map;
//
//@Slf4j
//@AllArgsConstructor
//@Controller
//public class FontController {
//
//    private final ShareService fontService;
//
//    @GetMapping("/fonts.html")
//    public ModelAndView fonts(FontDTO search) throws IOException {
//        ModelAndView view = new ModelAndView();
//        //不能加/
//        view.setViewName("fonts");
//        updateModelAndView(search, view);
//        return view;
//    }
//
//    @GetMapping("/more.html")
//    public ModelAndView more(FontDTO search) throws IOException {
//        ModelAndView view = new ModelAndView();
//        //不能加/
//        view.setViewName("more");
//        updateModelAndView(search, view);
//        return view;
//    }
//
//    private void updateModelAndView(FontDTO search, ModelAndView view) throws IOException {
//        Map<String, Object> result = fontService.searchByName(search);
//        int total = Integer.parseInt(result.get("total").toString());
//        int fetchSize = search.getFetchSize();
//        int totalPage = (int) Math.ceil(total * 1.0 / fetchSize);
//        result.put("currentPage", search.getOffset() + 1);
//        result.put("totalPage", totalPage);
//        result.put("search", search);
//        view.addObject("result", result);
//    }
//
//}
