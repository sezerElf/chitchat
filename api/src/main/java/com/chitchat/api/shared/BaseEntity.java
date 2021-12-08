package com.chitchat.api.shared;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Data
@MappedSuperclass
public class BaseEntity {
    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column
    private Date dateCreated;

    @Column
    private Date dateUpdated;
}
