package com.shares.entity;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Data
@PropertySource("classpath:my.properties")
@ConfigurationProperties(prefix = "shares")
@Component
public class SharesProperties {

    private String host;
    private String path;
    private String appCode;

}
