package com.wmn.disastermanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wmn.disastermanagement.model.RescueTeam;
import com.wmn.disastermanagement.model.Victim;
import com.wmn.disastermanagement.repository.IRescueTeamRepository;
import com.wmn.disastermanagement.repository.IVictimRepository;

@RestController
@RequestMapping("/api")
public class CompletingController {
	
	@Autowired
	IVictimRepository victimRepository;
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@PutMapping("/setComplete")
	public int setComplete(@RequestBody RescueTeam rescueTeamObj) {	    
		RescueTeam newRescueTeamObj = rescueTeamRepository.findById(rescueTeamObj.getId()).orElse(null);
		int victimId = newRescueTeamObj.getVictimId();
		Victim newVictimObj = victimRepository.findById(victimId).orElse(null);
	    newVictimObj.setStatus("Completed");
		victimRepository.save(newVictimObj);
		newRescueTeamObj.setAvailability("Yes");
		newRescueTeamObj.setVictimId(null);		
		rescueTeamRepository.save(newRescueTeamObj);
		return victimId;
	}

}
