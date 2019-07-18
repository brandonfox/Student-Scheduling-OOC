package com.pineapple.pp.repositories;

        import com.pineapple.pp.entities.Event;
        import com.pineapple.pp.entities.Group;
        import com.pineapple.pp.entities.User;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;
        import org.springframework.web.bind.annotation.CrossOrigin;

        import java.util.List;


@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface GroupRepository extends JpaRepository<Group, Long> {

    boolean existsById(Long id);

    boolean existsByName(String name);

    Group findGroupById(long id);

    Group findGroupByName(String name);

    Group findGroupByEvents(Event event);

    List<Group> findGroupsByMembership(User user);

}
