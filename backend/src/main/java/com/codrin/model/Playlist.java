package com.codrin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.io.Serializable;
@Entity
public class Playlist implements Serializable {
    @Id
    @GeneratedValue
    private int id;

    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Playlist(){

    }

    public Playlist(String name){
        this.name = name;
    }

    public Playlist(String name, int id){
        this.name = name;
        this.id = id;
    }
}
