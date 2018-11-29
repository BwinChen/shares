package com.shares.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Data
public class SharesDTO {

    private String inxnm;
    private BigDecimal yesyPrice;
    private BigDecimal openPrice;
    private BigDecimal lastPrice;
    private BigDecimal highPrice;
    private BigDecimal lowPrice;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDate uptime;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SharesDTO sharesDTO = (SharesDTO) o;
        return Objects.equals(uptime, sharesDTO.uptime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uptime);
    }

}