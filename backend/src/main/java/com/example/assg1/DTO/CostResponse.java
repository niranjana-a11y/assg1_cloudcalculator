package com.example.assg1.DTO;

import com.example.assg1.entities.inputEntity;

import java.util.List;

public class CostResponse {

    double cost;

    public double getCost() {
        return cost;
    }

    public List<Breakdown> getBreakdownList() {
        return BreakdownList;
    }

    List<Breakdown> BreakdownList;

    public CostResponse(List<Breakdown> breakdownList, double cost) {
        BreakdownList = breakdownList;
        this.cost = cost;
    }

    public static class Breakdown {
        double price;
        inputEntity inputlist;
        double ppu;

        public Breakdown(double price, inputEntity inputlist, double ppu) {
            this.price = price;
            this.inputlist = inputlist;
            this.ppu = ppu;
        }

        public double getPrice() {
            return price;
        }

        public inputEntity getInputlist() {
            return inputlist;
        }

        public double getPpu() {
            return ppu;
        }
    }
}
