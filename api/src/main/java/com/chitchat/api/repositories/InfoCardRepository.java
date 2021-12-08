package com.chitchat.api.repositories;

import com.chitchat.api.entities.InfoCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InfoCardRepository extends JpaRepository<InfoCard, UUID> {
}
