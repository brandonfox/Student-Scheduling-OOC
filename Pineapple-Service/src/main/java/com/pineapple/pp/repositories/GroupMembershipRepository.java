package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface GroupMembershipRepository extends JpaRepository<GroupMembership, Long> {
}
