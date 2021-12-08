package com.chitchat.api.entities;

import com.chitchat.api.shared.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class InfoCard extends BaseEntity {
    private String description;
}
