package com.freelauncer.model.admin;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

/**
 * Created by Admin on 12/27/2017.
 */
@Data
@Entity
@Table(name = "adm_group_user")
public class GroupUser implements Serializable {
    private static final long serialVersionUID = -6175963269564113777L;

    @Id
    @Column(name = "GROUP_ID", nullable = false)
    private Integer groupId;

    @Id
    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Column(name = "CREATE_BY",nullable = false)
    private String createBy;

    @Column(name = "GEN_DATE",nullable = false)
    private Date genDate;

    public GroupUser() {
    }

    public GroupUser(Integer groupId, Long userId, String createBy, Date genDate) {
        this.groupId = groupId;
        this.userId = userId;
        this.createBy = createBy;
        this.genDate = genDate;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Date getGenDate() {
        return genDate;
    }

    public void setGenDate(Date genDate) {
        this.genDate = genDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GroupUser)) return false;
        GroupUser groupUser = (GroupUser) o;
        return Objects.equals(getGroupId(), groupUser.getGroupId()) &&
                Objects.equals(getUserId(), groupUser.getUserId()) &&
                Objects.equals(getCreateBy(), groupUser.getCreateBy()) &&
                Objects.equals(getGenDate(), groupUser.getGenDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getGroupId(), getUserId(), getCreateBy(), getGenDate());
    }
}
