package com.shares.service;

import com.shares.entity.Shares;
import com.shares.entity.SharesDTO;
import com.shares.mapper.SharesMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@AllArgsConstructor
@Service
public class ShareServiceImpl implements ShareService {

    private final SharesMapper sharesMapper;

    @Override
    public Set<SharesDTO> getShares(String inxnm) throws ParseException {
        List<Shares> shares = sharesMapper.findByInxnm(inxnm);
        Set<SharesDTO> dtos = new HashSet<>();
        for (Shares share : shares) {
            SharesDTO sharesDTO = new SharesDTO();
            BeanUtils.copyProperties(share, sharesDTO);
            sharesDTO.setUptime(LocalDate.parse(share.getUptime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            dtos.add(sharesDTO);
        }
        return dtos;
    }

}
