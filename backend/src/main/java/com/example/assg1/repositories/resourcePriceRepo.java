package com.example.assg1.repositories;

import com.example.assg1.entities.resourcePrices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface resourcePriceRepo extends JpaRepository<resourcePrices, Integer> {

    List<resourcePrices> findByRegion_Region(String region);
    resourcePrices findByTypesAndRegion_Region(String types, String region);
    List<resourcePrices> findByTypes(String types);

    @Query("SELECT DISTINCT r.types FROM resourcePrices r")
    List<String> findDistinctTypes();
}
