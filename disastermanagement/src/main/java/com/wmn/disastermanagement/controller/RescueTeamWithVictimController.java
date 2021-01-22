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
public class RescueTeamWithVictimController {
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@Autowired
	IVictimRepository victimRepository;
	
	@GetMapping("/rescueTeamWithVictim/{id}")
	public Map<String,Object> getRescueTeamWithVictim(@PathVariable int id) {
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
