//package com.shares.scheduling;
//
//import com.fasterxml.jackson.databind.JavaType;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.shares.entity.FontProperties;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import java.io.IOException;
//import java.io.Serializable;
//import java.util.ArrayList;
//import java.util.List;
//
//@Slf4j
//@AllArgsConstructor
//@Component
//public class FontScheduling {
//
//    private final FontProperties fontProperties;
//    private final ObjectMapper objectMapper;
//    private final RedisTemplate<String, Serializable> redisTemplate;
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    /**
//     * 版本三：远程模糊查询
//     */
////    @Scheduled(fixedDelay = 60000)
//    @Scheduled(cron = "0 0 0 * * ? ")
//    public void getFontsThenCacheRemotely() throws IOException {
//        log.info("定时获取字体md5并缓存到redis");
//        String[] fontNames = (fontProperties.getCnFontNames() + "," + fontProperties.getEnFontNames()).split(",");
//        for (String fontName : fontNames) {
//            ResponseEntity<String> response = restTemplate.exchange(
//                    String.format("http://%s:%d/%s?fontName=%s",
//                            fontProperties.getHost(), fontProperties.getPort(), fontProperties.getAllFontsByNamePath(), fontName),
//                    HttpMethod.GET, null, String.class);
//            if (response.getStatusCode() == HttpStatus.OK) {
//                JsonNode root = objectMapper.readTree(response.getBody());
//                if (root.path("is_success").booleanValue()) {
//                    JavaType javaType = objectMapper.getTypeFactory().constructParametricType(ArrayList.class, String.class);
//                    List<String> md5s = objectMapper.readValue(root.path("data").toString(), javaType);
//                    if (md5s != null && md5s.size() > 1) {
//                        redisTemplate.opsForValue().set("shares:fontName:" + fontName, String.join(",", md5s));
//                    }
//                }
//            }
//        }
//        log.info("缓存字体md5结束");
//    }
//
////    /**
////     * 版本一：数据库模糊查询
////     */
////    @Scheduled(cron = "0 0 0 * * ? ")
////    public void getFontsThenCache() {
////        log.info("定时获取Font数据并缓存到redis");
////        String[] cnFontNames = fontProperties.getCnFontNames().split(",");
////        for (String fontName : cnFontNames){
////            List<Font> fonts = fontMapper.selectByCnFontName(fontName);
////            List<String> fontIds = new ArrayList<>();
////            for (Font font : fonts){
////                fontIds.add(font.getFontId());
////            }
////            redisTemplate.opsForValue().set("shares:fontName:" + fontName, String.join(",", fontIds));
////        }
////        String[] enFontNames = fontProperties.getEnFontNames().split(",");
////        for (String fontName : enFontNames){
////            List<Font> fonts = fontMapper.selectByEnFontName(fontName);
////            List<String> fontIds = new ArrayList<>();
////            for (Font font : fonts){
////                fontIds.add(font.getFontId());
////            }
////            redisTemplate.opsForValue().set("shares:fontName:" + fontName, String.join(",", fontIds));
////        }
////    }
//
////    /**
////     * 版本二：手动模糊查询
////     */
////    @Scheduled(cron = "0 0 0 * * ? ")
////    public void getFontsThenCacheManually() {
////        log.info("定时获取Font数据并缓存到redis");
////        Map<String, List<String>> result = new HashMap<>();
////        String[] cnFontNames = fontProperties.getCnFontNames().split(",");
////        String[] enFontNames = fontProperties.getEnFontNames().split(",");
////        int current = 1;
////        List<Font> fonts;
////        do {
////            Page<Font> page = new Page<>(current++, 5000);
////            fonts = fontMapper.selectPage(page);
////            for (Font font : fonts){
////                for (String fontName : cnFontNames){
////                    if (font.getFontName().contains(fontName)){
////                        updateResult(result, font, fontName);
////                    }
////                }
////                for (String fontName : enFontNames){
////                    String pattern = String.format("^%s[\\s\\S]*", fontName);
////                    if (Pattern.matches(pattern, font.getFontName())){
////                        updateResult(result, font, fontName);
////                    }
////                }
////            }
////        }while (fonts.size() > 0);
////        Set<Map.Entry<String, List<String>>> entries = result.entrySet();
////        for (Map.Entry<String, List<String>> entry : entries) {
////            redisTemplate.opsForValue().set("shares:fontName:" + entry.getKey(), String.join(",", entry.getValue()));
////        }
////    }
////
////    private void updateResult(Map<String, List<String>> result, Font font, String fontName) {
////        if (!result.containsKey(fontName)) {
////            List<String> fontIds = new ArrayList<>();
////            fontIds.add(font.getFontId());
////            result.put(fontName, fontIds);
////        } else {
////            result.get(fontName).add(font.getFontId());
////        }
////    }
//
//}