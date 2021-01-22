package com.wmn.disastermanagement.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wmn.disastermanagement.model.RescueTeam;
import com.wmn.disastermanagement.model.Victim;
import com.wmn.disastermanagement.repository.IRescueTeamRepository;
import com.wmn.disastermanagement.repository.IVictimRepository;

@RestController
@RequestMapping("/api")
public class VictimWithRescueTeamController {
	
	@Autowired
	IVictimRepository victimRepository;
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@GetMapping("/victimWithRescueTeam/{id}")
	public Map<String,Object> getVictimWithRescueTeam(@PathVariable int id) {
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
