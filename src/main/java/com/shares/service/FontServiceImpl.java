//package com.fonts.service;
//
//import com.fasterxml.jackson.databind.JavaType;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.PropertyNamingStrategy;
//import com.fonts.entity.Font;
//import com.fonts.entity.FontDTO;
//import com.fonts.entity.FontProperties;
//import com.fonts.util.FileUtil;
//import com.fonts.util.ListUtil;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.util.StringUtils;
//import org.springframework.web.client.RestTemplate;
//import java.io.IOException;
//import java.io.Serializable;
//import java.util.*;
//
//@Slf4j
//@AllArgsConstructor
//@Service
//public class FontServiceImpl implements FontService {
//
//    private final ObjectMapper objectMapper;
//    private final FontProperties fontProperties;
//    private final RestTemplate restTemplate = new RestTemplate();
//    private final RedisTemplate<String, Serializable> redisTemplate;
//
//    @Override
//    public Map<String,Object> searchByName(FontDTO search) throws IOException {
//        String[] fontNames = (fontProperties.getCnFontNames() + "," + fontProperties.getEnFontNames()).split(",");
//        for (String fontName : fontNames){
//            if (search.getFontName().contains(fontName)){
//                String fontIds = (String)redisTemplate.opsForValue().get("fonts:fontName:" + fontName);
//                if (StringUtils.isEmpty(fontIds)){
//                    break;
//                }
//                log.info("根据md5获得字体信息和预览图");
//                List<String> fontIdList = Arrays.asList(fontIds.split(","));
//                List<String> fontIdSubList = ListUtil.subList(fontIdList, search.getOffset() + 1, search.getFetchSize());
//                ResponseEntity<String> response = restTemplate.exchange(
//                        String.format("http://%s:%d/%s?fontId=%s&fontSize=%d&height=%d&text=%s",
//                                fontProperties.getHost(), fontProperties.getPort(), fontProperties.getPreviewAndFontsByFontIdPath(), String.join(",", fontIdSubList), search.getFontSize(), search.getHeight(), search.getText() == null ? "" : search.getText()),
//                        HttpMethod.GET, null, String.class);
//                return parseResponse(response, fontIdList.size());
//            }
//        }
//        log.info("根据字体名获得字体信息和预览图");
//        ResponseEntity<String> response = restTemplate.exchange(
//                String.format("http://%s:%d/%s?offest=%d&fetch_size=%d&fontName=%s&fontSize=%d&height=%d&text=%s&userId=%d",
//                        fontProperties.getHost(), fontProperties.getPort(), fontProperties.getPreviewAndFontsByNamePath(), search.getOffset(), search.getFetchSize(), search.getFontName(), search.getFontSize(),search.getHeight(), search.getText() == null ? "" : search.getText(), search.getUserId()),
//                HttpMethod.GET, null, String.class);
//        return parseResponse(response, null);
//    }
//
//    private Map<String, Object> parseResponse(ResponseEntity<String> response, Integer total) throws IOException {
//        Map<String,Object> result = new HashMap<>();
//        if (response.getStatusCode() != HttpStatus.OK){
//            return result;
//        }
//        JsonNode root = objectMapper.readTree(response.getBody());
//        if (root.path("is_success").booleanValue()) {
//            JsonNode data = root.path("data");
//            objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
//            JavaType javaType = objectMapper.getTypeFactory().constructParametricType(ArrayList.class, Font.class);
//            List<Font> fonts = objectMapper.readValue(data.path("list").toString(), javaType);
//            for (Font font : fonts){
//                font.setFileSize(FileUtil.formatSize(Integer.parseInt(font.getFileSize())));
//            }
//            if (total != null){
//                result.put("total", total);
//            }else {
//                result.put("total", data.path("total").intValue());
//            }
//            result.put("fonts", fonts);
//        }
//        return result;
//    }
//
//}
