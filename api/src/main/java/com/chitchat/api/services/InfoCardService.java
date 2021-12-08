package com.chitchat.api.services;

import com.chitchat.api.dto.*;
import com.chitchat.api.entities.Category;
import com.chitchat.api.entities.InfoCard;
import com.chitchat.api.repositories.InfoCardRepository;
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
public class InfoCardService implements BaseService<InfoCard, CreateInfoCardDto, UpdateInfoCardDto> {
    private final InfoCardRepository infoCardRepository;
    private final ModelMapper modelMapper;

    @Override
    public void save(CreateInfoCardDto createInfoCardDto) {
        long numberOfInfos = infoCardRepository.count();

        if(numberOfInfos >= 3){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "3 ten fazla info ekleyemezsiniz.");
        }

        var newInfoCard = modelMapper.map(createInfoCardDto, InfoCard.class);
        newInfoCard.setDateCreated(new Date());

        infoCardRepository.save(newInfoCard);
    }


    @Override
    public List<InfoCard> findAll() {
        return infoCardRepository.findAll();
    }

    @Override
    public InfoCard findById(UUID id) {
        return infoCardRepository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void update(UUID id, UpdateInfoCardDto updateInfoCardDto) {
        var infoCard = findById(id);
        if(updateInfoCardDto.getDescription()!=null){
            infoCard.setDescription(updateInfoCardDto.getDescription());
        }
        infoCardRepository.save(infoCard);

    }


    @Override
    public void delete(UUID id) {
       InfoCard infoCard = infoCardRepository.getById(id);
        infoCardRepository.delete(infoCard);
    }
}
