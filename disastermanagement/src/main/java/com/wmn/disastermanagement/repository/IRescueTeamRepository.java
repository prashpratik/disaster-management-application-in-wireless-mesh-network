package com.wmn.disastermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wmn.disastermanagement.model.RescueTeam;

@Repository
public interface IRescueTeamRepository extends JpaRepository<RescueTeam, Integer>{

}
