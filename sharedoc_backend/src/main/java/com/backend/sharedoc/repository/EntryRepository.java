package com.backend.sharedoc.repository;

import java.util.Optional;

import com.backend.sharedoc.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
  Entry findByTitle(String title);
  
  public Optional<Entry> findById(Integer id);
}
