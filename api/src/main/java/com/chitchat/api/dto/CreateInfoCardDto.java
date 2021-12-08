package com.chitchat.api.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CreateInfoCardDto {
    @NotNull
    private String description;
}
