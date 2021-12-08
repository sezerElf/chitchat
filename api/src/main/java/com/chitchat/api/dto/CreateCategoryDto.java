package com.chitchat.api.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CreateCategoryDto {
    @NotNull
    private String title;
    @NotNull
    private String topic;

    private String image;

}
