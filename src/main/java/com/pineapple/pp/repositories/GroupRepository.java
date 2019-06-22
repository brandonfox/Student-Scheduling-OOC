package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.UserGroup;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends CrudRepository<UserGroup, Long> {
}
