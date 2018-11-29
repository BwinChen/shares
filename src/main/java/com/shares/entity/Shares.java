package com.shares.entity;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class Shares {

    private Integer id;
    private String inxid;
    private String typeid;
    private String inxno;
    private String inxnm;
    private BigDecimal yesyPrice;
    private BigDecimal openPrice;
    private BigDecimal lastPrice;
    private BigDecimal changePrice;
    private String changePricePer;
    private BigDecimal highPrice;
    private BigDecimal lowPrice;
    private String amplitudePricePer;
    private String uptime;
    
}