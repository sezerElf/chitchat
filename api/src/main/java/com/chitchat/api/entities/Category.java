package com.chitchat.api.entities;

import com.chitchat.api.shared.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class Category extends BaseEntity {
    private String title;
    private String topic;
    private String image;

}
