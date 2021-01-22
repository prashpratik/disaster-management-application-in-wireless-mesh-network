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
public class VictimWebSocketController {
	
	@Autowired
	IVictimRepository victimRepository;
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@MessageMapping("/victim")
	@SendTo("/topic/victim")
	public List<Victim> getAll() {
		return victimRepository.findAll();
	}
	
	@MessageMapping("/victimWithRescueTeam/{id}")
	@SendTo("/topic/victimWithRescueTeam/{id}")
	public Map<String,Object> getWithRescueTeam(@DestinationVariable int id) {
		Map<String,Object> map = new HashMap<>();
		Victim victimObj = victimRepository.findById(id).orElse(null);
		RescueTeam rescueTeamObj = null;
		if(victimObj.getRescueTeamId() != null) {
			rescueTeamObj = rescueTeamRepository.findById(victimObj.getRescueTeamId()).orElse(null);
		}
		map.put("victim",victimObj);
		map.put("rescueTeam",rescueTeamObj);
		return map;
	}

}
