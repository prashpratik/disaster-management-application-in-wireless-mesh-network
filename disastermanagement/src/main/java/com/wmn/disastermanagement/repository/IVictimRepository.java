package com.wmn.disastermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wmn.disastermanagement.model.Victim;

@Repository
public interface IVictimRepository extends JpaRepository<Victim, Integer>{

}
