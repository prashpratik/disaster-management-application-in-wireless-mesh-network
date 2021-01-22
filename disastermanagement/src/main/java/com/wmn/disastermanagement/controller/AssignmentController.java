package com.wmn.disastermanagement.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
public class AssignmentController {
	
	@Autowired
	IVictimRepository victimRepository;
	
	@Autowired
	IRescueTeamRepository rescueTeamRepository;
	
	@GetMapping("/getAssignment")
	public Map<String,Object> getAssignment() {
		Map<String,Object> map = new HashMap<>();
		List<Victim> victimObj = victimRepository.findByStatus("Not Assigned");
		List<RescueTeam> rescueTeamObj = rescueTeamRepository.findByAvailability("Yes");
		map.put("victim", victimObj);
		map.put("rescueTeam", rescueTeamObj);
		return map;
	}
	
	@PutMapping("/setAssignment")
	public Map<String,Integer> assignRescueTeam(@RequestBody Map<String,Integer> mapObj) {
	    Victim newVictimObj = victimRepository.findById(mapObj.get("victim")).orElse(null);
	    newVictimObj.setRescueTeamId(mapObj.get("rescueTeam"));
	    newVictimObj.setStatus("Assigned");
	    victimRepository.save(newVictimObj);
	    RescueTeam newRescueTeamObj = rescueTeamRepository.findById(mapObj.get("rescueTeam")).orElse(null);
	    newRescueTeamObj.setVictimId(mapObj.get("victim"));
	    newRescueTeamObj.setAvailability("No");
	    rescueTeamRepository.save(newRescueTeamObj);
	    return mapObj;
	}

}
