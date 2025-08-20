package com.example.assg1.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class resourcePrices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    private String types;
    private double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id") // FK in this table
    //@JsonBackReference
    private regionPrices region;

    public resourcePrices() {
    }


    public resourcePrices(String types, double price){
        this.types = types;
        this.price = price;
    }

    // getters and setters
    public String getType(){
        return types;
    }

    public String setType(String types){
        return this.types = types;
    }

    public double getPrice(){
        return price;
    }

    public double setPrice(double price){
        return this.price = price;
    }

    public regionPrices getRegion() { return region; }

    public void setRegion(regionPrices region) { this.region = region;}

}
