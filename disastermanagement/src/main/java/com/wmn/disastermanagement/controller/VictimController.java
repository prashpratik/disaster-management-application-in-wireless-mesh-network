package com.wmn.disastermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wmn.disastermanagement.model.Victim;
import com.wmn.disastermanagement.repository.IVictimRepository;

@RestController
@RequestMapping("/api")
public class VictimController {
	
	@Autowired
	IVictimRepository victimRepository;
	
	@GetMapping("/victim")
	public List<Victim> getAll() {
		return victimRepository.findAll();
	}
	
	@PostMapping("/victim")
	public Victim add(@RequestBody Victim victimObj) {
		return victimRepository.save(victimObj);
	}
	
	@PutMapping("/addrescueteam")
	public Victim addRescueTeam(@RequestBody Victim victimObj) {
	    Victim newVictimObj = victimRepository.findById(victimObj.getId()).orElse(null);
	    newVictimObj.setRescueTeamId(victimObj.getRescueTeamId());
		return victimRepository.save(newVictimObj);
	}
	
	@PutMapping("/updatecomplete")
	public Victim updateComplete(@RequestBody Victim victimObj) {
	    Victim newVictimObj = victimRepository.findById(victimObj.getId()).orElse(null);
	    newVictimObj.setComplete(victimObj.getComplete());
		return victimRepository.save(newVictimObj);
	}

}
