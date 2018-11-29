package com.shares.service;

import com.shares.entity.SharesDTO;
import java.text.ParseException;
import java.util.Set;

public interface ShareService {

    Set<SharesDTO> getShares(String inxnm) throws ParseException;

}
