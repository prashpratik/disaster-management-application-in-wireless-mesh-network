package com.wmn.disastermanagement.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.wmn.disastermanagement.websocket.model.Chat;

@Controller
public class ChatWebSocketController {
	
	@MessageMapping("/chat/dv/{id}")
	@SendTo("/topic/chat/dv/{id}")
	public Chat dvChat(Chat chat) {
		return chat;
	}
	
	@MessageMapping("/chat/dr/{id}")
	@SendTo("/topic/chat/dr/{id}")
	public Chat drChat(Chat chat) {
		return chat;
	}
	
	@MessageMapping("/chat/rv/{id}")
	@SendTo("/topic/chat/rv/{id}")
	public Chat rvChat(Chat chat) {
		return chat;
	}

}
