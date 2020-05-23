package com.freelauncer.model.admin.view;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class UserView {

      private static final long serialVersionUID = -8299255898396933698L;
      @Id
      @Column(name = "ID")
    private Long id;

    /* @Column(name = "USER_NAME",nullable = false,unique = true)*/
    private String username;

    /*@Column(name = "code")*/
    private String code;

    /*@Column(name = "FULL_NAME", nullable = false,length = 100)*/
    private String fullName;

    /*@Column(name = "DESCRIPTION", length = 200)*/
    private String description;

    /*@Column(name = "LAST_ACCESS_TIME")*/
    private Date lastAccessTime;

    /*@Column(name = "STATUS")*/
    private Integer status;

    /*@Column(name = "email")*/
    private String email;

    /*@Column(name = "salkey")*/
    private String salkey;

    /*  @Column(name = "birthday")*/
    private String birthday;

    /* @Column(name = "sex")*/
    private Integer sex;

    /*@Column(name = "phone")*/
    private String phone;

    /*@Column(name = "hotLine")*/
    private String hotLine;

    /*@Column(name = "address")*/
    private String address;

    /*@Column(name = "soCMND")*/
    private String passport;

    /*@Column(name = "diaChiLamViec")*/
    private String workAddress;

    /*  @Column(name = "rank_id")*/
    private Long rankId;

    private Float point;

    /* @Column(name = "tk_mxh")*/
    private String socialAccount;

    /*@Column(name = "unit_id")*/
    private Long unitId;

    private String unitName;

    /*  @Column(name = "subUnit_id")*/
    private Long subUnitId;

    private String subUnitName;

    /*  @Column(name = "chucVu_id")*/
    private Long positionId;

    /* @Column(name = "capChucVu")*/
    private String codePosition;

    private String namePosition;

    private String deviceToken;

    private Integer receiveNotify;

    private String fileName;

    private String filePath;

    private String linkFile;

    private transient List<GrantedAuthority> grantedAuths;


    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuths;
    }


    public boolean isAccountNonExpired() {
        return true;
    }


    public boolean isAccountNonLocked() {
        return true;
    }


    public boolean isCredentialsNonExpired() {
        return true;
    }


    public boolean isEnabled() {
        return true;
//        return this.status==1? false:true;
    }


    public List<GrantedAuthority> getGrantedAuths() {
        return grantedAuths;
    }

    public void setGrantedAuths(List<GrantedAuthority> grantedAuths) {
        this.grantedAuths = grantedAuths;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getLastAccessTime() {
        return lastAccessTime;
    }

    public void setLastAccessTime(Date lastAccessTime) {
        this.lastAccessTime = lastAccessTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSalkey() {
        return salkey;
    }

    public void setSalkey(String salkey) {
        this.salkey = salkey;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getHotLine() {
        return hotLine;
    }

    public void setHotLine(String hotLine) {
        this.hotLine = hotLine;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public String getWorkAddress() {
        return workAddress;
    }

    public void setWorkAddress(String workAddress) {
        this.workAddress = workAddress;
    }

    public String getSocialAccount() {
        return socialAccount;
    }

    public void setSocialAccount(String socialAccount) {
        this.socialAccount = socialAccount;
    }


    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    public Long getSubUnitId() {
        return subUnitId;
    }

    public void setSubUnitId(Long subUnitId) {
        this.subUnitId = subUnitId;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getSubUnitName() {
        return subUnitName;
    }

    public void setSubUnitName(String subUnitName) {
        this.subUnitName = subUnitName;
    }

    public Long getPositionId() {
        return positionId;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public String getCodePosition() {
        return codePosition;
    }

    public void setCodePosition(String codePosition) {
        this.codePosition = codePosition;
    }

    public String getNamePosition() {
        return namePosition;
    }

    public void setNamePosition(String namePosition) {
        this.namePosition = namePosition;
    }

    public String getDeviceToken() {
        return deviceToken;
    }

    public void setDeviceToken(String deviceToken) {
        this.deviceToken = deviceToken;
    }

    public Integer getReceiveNotify() {
        return receiveNotify;
    }

    public void setReceiveNotify(Integer receiveNotify) {
        this.receiveNotify = receiveNotify;
    }

    public Long getRankId() {
        return rankId;
    }

    public void setRankId(Long rankId) {
        this.rankId = rankId;
    }

    public Float getPoint() {
        return point;
    }

    public void setPoint(Float point) {
        this.point = point;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getLinkFile() {
        return linkFile;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setLinkFile(String linkFile) {
        this.linkFile = linkFile;
    }
}
