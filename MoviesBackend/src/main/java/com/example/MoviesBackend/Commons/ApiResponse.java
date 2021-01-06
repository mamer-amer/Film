package com.example.MoviesBackend.Commons;

import java.util.List;

public class ApiResponse<T> {
    private int status;
    private String message;
    private Object result;
    private List<T> objectList;

    public ApiResponse(int status, String message, Object result, List<T> objectList) {

        this.status = status;
        this.message = message;
        this.result = result;
        this.objectList=objectList;

    }

    public ApiResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public List<T> getObjectList() {
        return objectList;
    }

    public void setObjectList(List<T> objectList) {
        this.objectList = objectList;
    }

    public ApiResponse(int status, String message, Object result) {
        this.status = status;
        this.message = message;
        this.result = result;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }
}
