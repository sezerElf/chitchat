package com.chitchat.api.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
@Data
public class UpdateCategoryDto {
    private String title;
    private String topic;
    private String image;
}
