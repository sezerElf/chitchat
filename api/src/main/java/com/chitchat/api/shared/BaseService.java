package com.chitchat.api.shared;

import java.util.List;
import java.util.UUID;

public interface BaseService<EntityType, CreateDto, UpdateDto> {
    void save(CreateDto createDto);
    List<EntityType> findAll();
    EntityType findById(UUID id);
    void update(UUID id, UpdateDto updateDto);
    void delete(UUID id);
}
