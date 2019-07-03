package com.pineapple.pp.entities;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
public class groupMembership {

    @Id
    @GeneratedValue(strategy=IDENTITY)
    private Long user_id;
    private Long group_id;
    private int privilege;

    @ManyToMany
    @JoinTable(name = "group_membership",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )

    public Long getUserId() {
        return user_id;
    }

    public void setUserId(Long user_id) {
        this.user_id = user_id;
    }

    public Long getGroupId() {
        return group_id;
    }

    public void setGroupId(Long group_id) {
        this.group_id = group_id;
    }

    public int getPrivilege() {
        return privilege;
    }

    public void setPrivilege(int privilege) {
        this.privilege = privilege;
    }

}
