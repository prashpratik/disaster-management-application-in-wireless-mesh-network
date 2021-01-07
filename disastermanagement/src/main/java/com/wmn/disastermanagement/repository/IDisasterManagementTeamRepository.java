package com.wmn.disastermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wmn.disastermanagement.model.DisasterManagementTeam;

@Repository
public interface IDisasterManagementTeamRepository extends JpaRepository<DisasterManagementTeam, Integer>{

}
