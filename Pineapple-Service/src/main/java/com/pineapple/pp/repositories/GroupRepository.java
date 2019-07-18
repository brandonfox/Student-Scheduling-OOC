package com.pineapple.pp.repositories;

        import com.pineapple.pp.entities.Event;
        import com.pineapple.pp.entities.User;
        import com.pineapple.pp.entities.UserGroup;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.repository.CrudRepository;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;
        import org.springframework.stereotype.Repository;
        import org.springframework.web.bind.annotation.CrossOrigin;

        import java.util.List;


@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface GroupRepository extends JpaRepository<UserGroup, Long> {
    boolean existsById(Long id);
    boolean existsByName(String name);
    UserGroup findUserGroupById(long id);
    UserGroup findUserGroupByName(String name);
    UserGroup findUserGroupByEvents(Event event);
    List<UserGroup> findUserGroupsByMembership(User user);

}
