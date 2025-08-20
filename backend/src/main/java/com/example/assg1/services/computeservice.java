package com.example.assg1.services;
import com.example.assg1.DTO.CostResponse;
import com.example.assg1.entities.inputEntity;
import com.example.assg1.entities.resourcePrices;
import com.example.assg1.repositories.regionPriceRepo;
import com.example.assg1.repositories.resourcePriceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@Component
public class computeservice {

    @Autowired
    private regionPriceRepo repo1;
    @Autowired
    private resourcePriceRepo repo2;

    public double findByTypesAndRegion(String types, String region){
        resourcePrices temp =  repo2.findByTypesAndRegion_Region(types,region);
        return temp.getPrice();
    }

    public double calculate (List<inputEntity> inputList){
        String region;
        String resources;
        int count;
        double result = 0.0;
        double total = 0.0;
        double temp;

        for (inputEntity ip : inputList){
            region = ip.getRegion();
            resources = ip.getResourceType();
            count = ip.getCount();
            temp = findByTypesAndRegion(resources, region);
            result = count*temp;
            total += result;
        }

        return total;
    }

    public List<String> getByResourceAndRegion(String region){
        List<resourcePrices> list = repo2.findByRegion_Region(region);
        List<String> list2 = new ArrayList<>();
        for( resourcePrices rp : list){
            list2.add(rp.getType());
        }
        return list2;
    }

    HashMap<String, Double> map = new HashMap<String, Double>();
    public HashMap<String,Double> getPrice(@RequestParam String resources){
        List<resourcePrices> rpList = repo2.findByTypes(resources);
        for(resourcePrices rp: rpList){
            String region = rp.getRegion().getRegion();
            double price = rp.getPrice();
            map.put(region,price);
        }
        return map;
    }

//    public List<resourcePrices> getByResources(String resources){
//        return repo2.findByTypes(resources);
//    }

    public List<String> getRegion(){
        return repo1.findAllRegionNames();
    }

    public List<String> findDistinctTypes(){
        return repo2.findDistinctTypes();
    }

    public CostResponse breakdown(List<inputEntity> inputList){

        double cost = calculate(inputList);
        List<CostResponse.Breakdown> breakdownList = new ArrayList<>();
        for(inputEntity ip: inputList){
            resourcePrices temp =  repo2.findByTypesAndRegion_Region(ip.getResourceType(), ip.getRegion());
            double ppu = temp.getPrice();
            int count = ip.getCount();
            double price = ppu*count;
            CostResponse.Breakdown breakdown = new CostResponse.Breakdown(price, ip, ppu);
            breakdownList.add(breakdown);
        }
        CostResponse costList = new CostResponse(breakdownList, cost);
        return costList;
    }
}
