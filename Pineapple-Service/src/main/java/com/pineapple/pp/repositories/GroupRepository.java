package com.pineapple.pp.repositories;

        import com.pineapple.pp.entities.UserGroup;
        import com.pineapple.pp.entities.User;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;

        import java.util.List;


@RepositoryRestResource
public interface GroupRepository extends JpaRepository<UserGroup, Long> {

    boolean existsById(Long id);

    boolean existsByName(String name);

    UserGroup findGroupById(long id);

    UserGroup findGroupByName(String name);

    List<UserGroup> findGroupsByMembership(User user);

}
