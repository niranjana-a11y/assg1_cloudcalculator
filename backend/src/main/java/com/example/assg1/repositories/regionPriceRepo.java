package com.example.assg1.repositories;

import com.example.assg1.entities.regionPrices;
import com.example.assg1.entities.resourcePrices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface regionPriceRepo extends JpaRepository<regionPrices, Integer>{
    @Query("SELECT r.region FROM regionPrices r")
    List<String> findAllRegionNames();
}
