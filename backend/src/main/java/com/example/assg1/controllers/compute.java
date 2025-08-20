package com.example.assg1.controllers;

import com.example.assg1.DTO.CostResponse;
import com.example.assg1.entities.inputEntity;
import com.example.assg1.services.computeservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("")
public class compute {

    @Autowired
    private computeservice service;


    @PostMapping("/cost")
    public double getByRegion(@RequestBody List<inputEntity> inputList) {
        return service.calculate(inputList);
    }

    @PostMapping("/cost/breakdown")
    public CostResponse breakdown (@RequestBody List<inputEntity> inputList) {
        return service.breakdown(inputList);
    }

    @GetMapping("/cost")
    public HashMap<String, Double> getResourcePrice(@RequestParam String resources){
        return service.getPrice(resources);
    }

//    @GetMapping("")
//    public List<resourcePrices> getByResourcesController(@RequestParam String resources){
//        return service.getByResources(resources);
//    }

    @GetMapping("/cost/region")
    public List<String> getResourcebyRegionController(@RequestParam String region){
        return service.getByResourceAndRegion(region);
    }

    @GetMapping("")
    public List<String> getRegion(){
        return service.getRegion();
    }

    @GetMapping("/api/resources")
    public List<String> getResources(){
        return service.findDistinctTypes();
    }

}
