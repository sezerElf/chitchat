package com.chitchat.api.services;

import com.chitchat.api.dto.CreateCategoryDto;
import com.chitchat.api.dto.UpdateCategoryDto;
import com.chitchat.api.entities.Category;
import com.chitchat.api.repositories.CategoryRepository;
import com.chitchat.api.shared.BaseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class CategoryService  implements BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Override
    public void save(CreateCategoryDto createCategoryDto) {
        var newCategory = modelMapper.map(createCategoryDto, Category.class);
        newCategory.setDateCreated(new Date());

        categoryRepository.save(newCategory);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(UUID id) {
        return categoryRepository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void update(UUID id, UpdateCategoryDto updateCategoryDto) {
        var category = findById(id);
        if(updateCategoryDto.getImage()!=null){
            category.setImage(updateCategoryDto.getImage());
        }if(updateCategoryDto.getTitle()!=null){
            category.setTitle(updateCategoryDto.getTitle());
        }if(updateCategoryDto.getTopic()!=null){
            category.setTopic(updateCategoryDto.getTopic());
        }
        categoryRepository.save(category);

    }

    @Override
    public void delete(UUID id) {
        Category category = categoryRepository.getById(id);
        categoryRepository.delete(category);
    }
}
