package com.shares.controller;

import com.shares.service.ShareService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@AllArgsConstructor
@Controller
public class SharesController {

    private final ShareService shareService;

    @GetMapping("/shares.html")
    public ModelAndView shares(@RequestParam(defaultValue="上证指数") String inxnm) throws Exception {
        ModelAndView view = new ModelAndView();
        //不能加/
        view.setViewName("shares");
        view.addObject("shares", shareService.getShares(inxnm));
        return view;
    }

}
