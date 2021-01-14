package com.wmn.disastermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/rescueTeam")
	public List<RescueTeam> getAll() {
		return rescueTeamRepository.findAll();
	}
	
	@GetMapping("/rescueTeamById/{id}")
	public RescueTeam getById(@PathVariable int id) {
		return rescueTeamRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/availableRescueTeam")
	public List<RescueTeam> getAvailableRescueTeam() {
		return rescueTeamRepository.findByAvailability(true);
	}
	
	@PostMapping("/rescueTeam")
	public RescueTeam add(@RequestBody RescueTeam rescueTeamObj) {
		return rescueTeamRepository.save(rescueTeamObj);
	}
	
	@PutMapping("/assignVictim")
	public RescueTeam assignVictim(@RequestBody RescueTeam rescueTeamObj) {
	    RescueTeam newRescueTeamObj = rescueTeamRepository.findById(rescueTeamObj.getId()).orElse(null);
	    newRescueTeamObj.setVictimId(rescueTeamObj.getVictimId());
	    newRescueTeamObj.setAvailability(rescueTeamObj.getAvailability());
		return rescueTeamRepository.save(newRescueTeamObj);
	}
	
	@PutMapping("/updateAvailability")
	public RescueTeam updateAvailability(@RequestBody RescueTeam rescueTeamObj) {
		RescueTeam newRescueTeamObj = rescueTeamRepository.findById(rescueTeamObj.getId()).orElse(null);
		newRescueTeamObj.setAvailability(rescueTeamObj.getAvailability());
		newRescueTeamObj.setVictimId(rescueTeamObj.getVictimId());
		return rescueTeamRepository.save(newRescueTeamObj);
	}

}
