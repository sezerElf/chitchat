package com.chitchat.api.controllers;

import com.chitchat.api.dto.CreateCategoryDto;
import com.chitchat.api.dto.UpdateCategoryDto;
import com.chitchat.api.dto.UpdateUserDto;
import com.chitchat.api.entities.Category;
import com.chitchat.api.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("category")
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping
    public void save(@RequestBody @Valid CreateCategoryDto createCategoryDto){
        categoryService.save(createCategoryDto);
    }

    @GetMapping
    public List<Category> findAll(){
        return categoryService.findAll();
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id){
        categoryService.delete(id);
    }

    @GetMapping("/{id}")
    public Category findById(@PathVariable UUID id){
        return categoryService.findById(id);
    }

    @PutMapping("{id}")
    public void update(@RequestBody UpdateCategoryDto updateCategoryDto , @PathVariable UUID id){
        categoryService.update(id,updateCategoryDto);
    }
}
