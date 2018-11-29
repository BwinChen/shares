//package com.shares.scheduling;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import java.time.LocalDateTime;
//
///**
// * 演示定时任务
// */
//@Slf4j
//@Component
//public class SpringTaskDemo {
//
//    //@Async
//    @Scheduled(cron = "0/1 * * * * *")
//    public void scheduled1() throws InterruptedException {
//        Thread.sleep(3000);
//        log.info("scheduled1 每1秒执行一次：{}", LocalDateTime.now());
//    }
//
//    @Scheduled(fixedRate = 4000)
//    public void scheduled2() throws InterruptedException {
//        Thread.sleep(3000);
//        log.info("scheduled2 每4秒执行一次：{}", LocalDateTime.now());
//    }
//
//    //@Async
//    @Scheduled(fixedDelay = 3000)
//    public void scheduled3() throws InterruptedException {
//        Thread.sleep(5000);
//        log.info("scheduled3 上次执行完毕后隔3秒继续执行：{}", LocalDateTime.now());
//    }
//
//}