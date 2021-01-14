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
	
	@GetMapping("/victimById/{id}")
	public Victim getById(@PathVariable int id) {
		return victimRepository.findById(id).orElse(null);
	}
	
	@GetMapping("/unassignedVictim")
	public List<Victim> getUnassignedVictim() {
		return victimRepository.findByRescueTeamId(null);
	}
	
	@PostMapping("/victim")
	public Victim add(@RequestBody Victim victimObj) {
		return victimRepository.save(victimObj);
	}
	
	@PutMapping("/assignRescueTeam")
	public Victim assignRescueTeam(@RequestBody Victim victimObj) {
	    Victim newVictimObj = victimRepository.findById(victimObj.getId()).orElse(null);
	    newVictimObj.setRescueTeamId(victimObj.getRescueTeamId());
		return victimRepository.save(newVictimObj);
	}
	
	@PutMapping("/updateComplete")
	public Victim updateComplete(@RequestBody Victim victimObj) {
	    Victim newVictimObj = victimRepository.findById(victimObj.getId()).orElse(null);
	    newVictimObj.setComplete(victimObj.getComplete());
		return victimRepository.save(newVictimObj);
	}

}
