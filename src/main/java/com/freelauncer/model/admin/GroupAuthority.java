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
@Entity
@Data
@Table(name = "adm_group_authorities")
public class GroupAuthority implements Serializable {
    private static final long serialVersionUID = -166399391710801760L;

    @Id
    @Column(name = "GROUP_ID", nullable = false)
    private Integer groupId;

    @Id
    @Column(name = "AUTHORITY", nullable = false)
    private Integer authority;

    @Column(name = "CREATE_BY",nullable = false)
    private String createBy;

    @Column(name = "GEN_DATE",nullable = false)
    private Date genDate;

    public GroupAuthority() {
    }

    public GroupAuthority(Integer groupId, Integer authority, String createBy, Date genDate) {
        this.groupId = groupId;
        this.authority = authority;
        this.createBy = createBy;
        this.genDate = genDate;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getAuthority() {
        return authority;
    }

    public void setAuthority(Integer authority) {
        this.authority = authority;
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
        if (!(o instanceof GroupAuthority)) return false;
        GroupAuthority that = (GroupAuthority) o;
        return Objects.equals(getGroupId(), that.getGroupId()) &&
                Objects.equals(getAuthority(), that.getAuthority()) &&
                Objects.equals(getCreateBy(), that.getCreateBy()) &&
                Objects.equals(getGenDate(), that.getGenDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getGroupId(), getAuthority(), getCreateBy(), getGenDate());
    }
}
