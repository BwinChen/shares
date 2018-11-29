//package com.shares.mapper;
//
//import com.baomidou.mybatisplus.core.mapper.BaseMapper;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import com.shares.entity.Font;
//import org.apache.ibatis.annotations.Mapper;
//import org.apache.ibatis.annotations.Param;
//import org.apache.ibatis.annotations.Select;
//import java.util.List;
//
//@Mapper
//public interface FontMapper extends BaseMapper<Font> {
//
//    @Select("select md5 as font_id, font_name from font " +
//            "where font_name like CONCAT('%',#{fontName},'%') " +
//            "or family_name like CONCAT('%',#{fontName},'%') " +
//            "or postscript_name like CONCAT('%',#{fontName},'%') " +
//            "or font_name_list like CONCAT('%',#{fontName},'%')")
//    List<Font> selectByCnFontName(@Param("fontName") String fontName);
//
//    @Select("select md5 as font_id, font_name from font " +
//            "where font_name like CONCAT(#{fontName},'%') " +
//            "or family_name like CONCAT(#{fontName},'%') " +
//            "or postscript_name like CONCAT(#{fontName},'%')")
//    List<Font> selectByEnFontName(@Param("fontName") String fontName);
//
//    @Select("select md5 as font_id, font_name from font")
//    List<Font> selectPage(Page<Font> page);
//
//}
