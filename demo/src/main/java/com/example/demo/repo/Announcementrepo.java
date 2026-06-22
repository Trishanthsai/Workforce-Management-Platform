package com.example.demo.repo;

import com.example.demo.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Announcementrepo extends JpaRepository<Announcement,Long> {
}
