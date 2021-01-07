package com.wmn.disastermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wmn.disastermanagement.model.RescueTeam;
import com.wmn.disastermanagement.repository.IRescueTeamRepository;

@RestController
@RequestMapping("/api")
public class RescueTeamController {
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@GetMapping("/rescueteam")
	public List<RescueTeam> getAll() {
		return rescueTeamRepository.findAll();
	}
	
	@PostMapping("/rescueteam")
	public RescueTeam add(@RequestBody RescueTeam rescueTeamObj) {
		return rescueTeamRepository.save(rescueTeamObj);
	}
	
	@PutMapping("/updateavailability")
	public RescueTeam updateAvailability(@RequestBody RescueTeam rescueTeamObj) {
		RescueTeam newRescueTeamObj = rescueTeamRepository.findById(rescueTeamObj.getId()).orElse(null);
		newRescueTeamObj.setAvailability(rescueTeamObj.getAvailability());
		return rescueTeamRepository.save(newRescueTeamObj);
	}

}
