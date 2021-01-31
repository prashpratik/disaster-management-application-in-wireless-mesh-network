package com.wmn.disastermanagement.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
	
	@MessageMapping("/chat/dv/{id}")
	@SendTo("/topic/chat/dv/{id}")
	public String dvChat(String message) {
		return message;
	}
	
	@MessageMapping("/chat/dr/{id}")
	@SendTo("/topic/chat/dr/{id}")
	public String drChat(String message) {
		return message;
	}
	
	@MessageMapping("/chat/rv/{id}")
	@SendTo("/topic/chat/rv/{id}")
	public String rvChat(String message) {
		return message;
	}

}
