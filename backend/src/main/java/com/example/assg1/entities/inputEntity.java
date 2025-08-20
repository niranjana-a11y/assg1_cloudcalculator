package com.example.assg1.entities;

import java.util.List;

public class inputEntity {

    private  String region;
    private  String resourceType;
    private int count;

    public inputEntity(String region, String resourceType, int count) {
        this.region = region;
        this.resourceType = resourceType;
        this.count = count;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
