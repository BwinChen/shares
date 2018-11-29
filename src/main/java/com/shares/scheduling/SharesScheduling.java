package com.shares.scheduling;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.shares.entity.Shares;
import com.shares.mapper.SharesMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@AllArgsConstructor
@Component
public class SharesScheduling {

    private final ObjectMapper objectMapper;
    private final SharesMapper sharesMapper;
    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(fixedDelay = 3600000)
//    @Scheduled(cron = "0 0 0 * * ? ")
    public void getShares() throws IOException {
        Document doc = Jsoup.connect("https://www.nowapi.com/api/finance.globalindex").get();
        Elements a = doc.select("#doc div.item:first-child a");
        String href = a.attr("href").replace("inxids=1010&", "");
        log.info("定时任务：爬取到的href为{}", href);
        ResponseEntity<String> response = restTemplate.exchange(href, HttpMethod.GET, null, String.class);
        JsonNode root = objectMapper.readTree(response.getBody());
        if ("1".equals(root.path("success").textValue())) {
            log.info("定时任务：获取到股票数据");
            List<Shares> shares = new ArrayList<>();
            JsonNode result = root.path("result");
            objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
            for (int i = 1; i < 100; i ++) {
                String share = result.path(String.valueOf(i)).toString();
                if ("".equals(share)) {
                    continue;
                }
                shares.add(objectMapper.readValue(share, Shares.class));
            }
            for (Shares share : shares) {
                if (sharesMapper.findByInxnmAndUptime(share.getInxnm(), share.getUptime()).size() > 0) {
                    continue;
                }
                sharesMapper.insert(share);
            }
        }
        log.info("定时任务：获取股票数据结束");
    }

}