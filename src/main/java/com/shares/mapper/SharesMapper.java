package com.shares.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.shares.entity.Shares;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface SharesMapper extends BaseMapper<Shares> {

//    @Select("select md5 as font_id, font_name from font")
//    List<Font> selectPage(Page<Font> page);

    @Select("select * from shares " +
            "where inxnm like CONCAT('%',#{inxnm},'%') " +
            "and uptime = #{uptime}")
    List<Shares> findByInxnmAndUptime(@Param("inxnm") String inxnm, @Param("uptime") String uptime);

    @Select("select * from shares " +
            "where inxnm like CONCAT('%',#{inxnm},'%') order by uptime desc")
    List<Shares> findByInxnm(@Param("inxnm") String inxnm);

}
