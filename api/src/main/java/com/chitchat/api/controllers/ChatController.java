package com.chitchat.api.controllers;

import com.chitchat.api.webSocket.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{topicId}")
    @SendTo("/topic/{topicId}")
    public void send(@Payload Message message, @DestinationVariable("topicId") UUID topicId){
        messagingTemplate.convertAndSend(String.format("/topic/%s", topicId.toString()), message);
    }
}
