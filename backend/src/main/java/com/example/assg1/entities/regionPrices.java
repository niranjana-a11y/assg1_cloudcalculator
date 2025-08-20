package com.example.assg1.entities;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class regionPrices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private String region;

    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<resourcePrices> resources;

    public regionPrices() {
    }

    public regionPrices(String region, List <resourcePrices> resources) {
        this.region = region;
        this.resources = resources;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public List<resourcePrices> getResourcePrices() {
        return resources;
    }

    public void setResourcePrices(List<resourcePrices> resources) {
        this.resources = resources;
    }
}


