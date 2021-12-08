package com.chitchat.api.controllers;

import com.chitchat.api.dto.CreateInfoCardDto;
import com.chitchat.api.dto.UpdateInfoCardDto;
import com.chitchat.api.dto.UpdateUserDto;
import com.chitchat.api.entities.InfoCard;
import com.chitchat.api.services.InfoCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("info_card")
public class InfoCardController {
    private final InfoCardService infoCardService;

    @PostMapping
    public void save(@RequestBody @Valid CreateInfoCardDto createInfoCardDto){
        infoCardService.save(createInfoCardDto);
    }

    @GetMapping
    public List<InfoCard> findAll(){
        return infoCardService.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id){
        infoCardService.delete(id);
    }

    @GetMapping("/{id}")
    public InfoCard findById(@PathVariable UUID id){
        return infoCardService.findById(id);
    }

    @PutMapping("{id}")
    public void update(@RequestBody UpdateInfoCardDto updateInfoCardDto , @PathVariable UUID id){
        infoCardService.update(id,updateInfoCardDto);
    }

}
