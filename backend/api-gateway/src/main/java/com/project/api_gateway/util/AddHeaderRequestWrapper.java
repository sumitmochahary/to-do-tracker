package com.project.api_gateway.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.*;

public class AddHeaderRequestWrapper extends HttpServletRequestWrapper {
    private final Map<String, String> customHeaders;

    public AddHeaderRequestWrapper(HttpServletRequest request, String userId) {
        super(request);
        this.customHeaders = new HashMap<>();
        this.customHeaders.put("X-User-Id", userId);
    }

    @Override
    public String getHeader(String name){
        String headerValue = customHeaders.get(name);
        if(headerValue != null){
            return headerValue;
        }
        return super.getHeader(name);
    }

    @Override
    public Enumeration<String> getHeaderNames(){
        List<String> headerNames = Collections.list(super.getHeaderNames());
        headerNames.addAll(customHeaders.keySet());
        return Collections.enumeration(headerNames);
    }

    @Override
    public Enumeration<String> getHeaders(String name){
        if(customHeaders.containsKey(name)){
            return Collections.enumeration(List.of(customHeaders.get(name)));
        }
        return super.getHeaders(name);
    }
}