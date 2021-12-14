package com.chitchat.api.controllers;

import com.chitchat.api.webSocket.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public Message send(@Payload Message message){
        return message;
    }
}
