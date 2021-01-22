package com.wmn.disastermanagement.websocket.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.wmn.disastermanagement.model.RescueTeam;
import com.wmn.disastermanagement.model.Victim;
import com.wmn.disastermanagement.repository.IRescueTeamRepository;
import com.wmn.disastermanagement.repository.IVictimRepository;

@Controller
public class AssignmentWebSocketController {
	
	@Autowired
	IVictimRepository victimRepository;
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@MessageMapping("/getAssignment")
	@SendTo("/topic/getAssignment")
	public Map<String,Object> getAssignment() {
		Map<String,Object> map = new HashMap<>();
		List<Victim> victimObj = victimRepository.findByStatus("Not Assigned");
		List<RescueTeam> rescueTeamObj = rescueTeamRepository.findByAvailability("Yes");
		map.put("victim", victimObj);
		map.put("rescueTeam", rescueTeamObj);
		return map;
	}

}
