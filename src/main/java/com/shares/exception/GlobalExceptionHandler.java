package com.shares.exception;

import com.shares.entity.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Response runtimeExceptionHandler(HttpServletRequest request, Exception ex, HttpServletResponse response) {
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        return new Response(HttpStatus.BAD_REQUEST.toString(), ex.getMessage());
    }

    /**
     * 通用的接口映射异常处理方
     */
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        if (ex instanceof BindException) {
            StringBuilder builder = new StringBuilder();
            BindException exception = (BindException) ex;
            BindingResult result = exception.getBindingResult();
            if(result.hasErrors()){
                List<ObjectError> errors =result.getAllErrors();
                for (ObjectError error : errors) {
                    builder.append(error.getDefaultMessage()).append("; ");
                }
            }
            return new ResponseEntity<>(new Response(status.toString(), builder.toString()), status);
        }
        if (ex instanceof MethodArgumentTypeMismatchException) {
            MethodArgumentTypeMismatchException exception = (MethodArgumentTypeMismatchException) ex;
            logger.error("参数转换失败，方法：" + Objects.requireNonNull(exception.getParameter().getMethod()).getName() + "，参数：" + exception.getName()
                    + ",信息：" + exception.getLocalizedMessage());
            return new ResponseEntity<>(new Response(status.toString(), "参数转换失败"), status);
        }
        return new ResponseEntity<>(new Response(status.toString(), "参数转换失败"), status);
    }

}
