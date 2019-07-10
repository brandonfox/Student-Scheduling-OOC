package com.pineapple.pp.repositories;

        import com.pineapple.pp.entities.Event;
        import com.pineapple.pp.entities.User;
        import com.pineapple.pp.entities.UserGroup;
        import org.springframework.data.repository.CrudRepository;
        import org.springframework.stereotype.Repository;

        import java.util.List;

@Repository
public interface GroupRepository extends CrudRepository<UserGroup, Long> {
    boolean existsById(Long id);
    boolean existsByName(String name);
    UserGroup findUserGroupById(long id);
    UserGroup findUserGroupByName(String name);
    UserGroup findUserGroupByEvents(Event event);
    List<UserGroup> findUserGroupsByMembership(User user);

}
