package com.wmn.disastermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wmn.disastermanagement.model.DisasterManagementTeam;
import com.wmn.disastermanagement.repository.IDisasterManagementTeamRepository;

@RestController
@RequestMapping("/api")
public class DisasterManagementTeamController {
	
	@Autowired
	IDisasterManagementTeamRepository dmtRepository;
	
	@GetMapping("/dmt")
	public List<DisasterManagementTeam> getAll() {
		return dmtRepository.findAll();
	}
	
	@PostMapping("/dmt")
	public DisasterManagementTeam add(@RequestBody DisasterManagementTeam dmtObj) {
		return dmtRepository.save(dmtObj);
	}

}
