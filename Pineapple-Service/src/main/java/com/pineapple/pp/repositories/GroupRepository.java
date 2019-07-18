package com.pineapple.pp.repositories;

        import com.pineapple.pp.entities.userGroup;
        import com.pineapple.pp.entities.User;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.rest.core.annotation.RepositoryRestResource;

        import java.util.List;


@RepositoryRestResource
public interface GroupRepository extends JpaRepository<userGroup, Long> {

    boolean existsById(Long id);

    boolean existsByName(String name);

    userGroup findGroupById(long id);

    userGroup findGroupByName(String name);

    List<userGroup> findGroupsByMembership(User user);

}
