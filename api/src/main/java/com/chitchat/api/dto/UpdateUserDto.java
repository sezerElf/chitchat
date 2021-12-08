package com.chitchat.api.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.Email;
@Data
public class UpdateUserDto {
    private String firstName;
    private String lastName;

    @Email
    private String email;

    @Length(min = 6, max = 24)
    private String password;
}
