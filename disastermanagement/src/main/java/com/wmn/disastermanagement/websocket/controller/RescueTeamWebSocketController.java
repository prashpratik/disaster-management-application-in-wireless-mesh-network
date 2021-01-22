package com.wmn.disastermanagement.websocket.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.wmn.disastermanagement.model.RescueTeam;
import com.wmn.disastermanagement.model.Victim;
import com.wmn.disastermanagement.repository.IRescueTeamRepository;
import com.wmn.disastermanagement.repository.IVictimRepository;

@Controller
public class RescueTeamWebSocketController {
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@Autowired
	IVictimRepository victimRepository;
	
	@MessageMapping("/rescueTeam")
	@SendTo("/topic/rescueTeam")
	public List<RescueTeam> getAll() {
		return rescueTeamRepository.findAll();
	}
	
	@MessageMapping("/rescueTeamWithVictim/{id}")
	@SendTo("/topic/rescueTeamWithVictim/{id}")
	public Map<String,Object> rescueTeamWithVictim(@DestinationVariable int id) {
		Map<String,Object> map = new HashMap<>();
		RescueTeam rescueTeamObj = rescueTeamRepository.findById(id).orElse(null);
		Victim victimObj = null;
		if(rescueTeamObj.getVictimId() != null) {
			victimObj = victimRepository.findById(rescueTeamObj.getVictimId()).orElse(null);
		}		
		map.put("rescueTeam",rescueTeamObj);
		map.put("victim",victimObj);
		return map;
	}

}
