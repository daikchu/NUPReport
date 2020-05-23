package com.freelauncer.model.admin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "QsoftInstitution")
public class QsoftInstitution implements Serializable {
	private static final long serialVersionUID = -166399391710801760L;
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "InstitutionId")
private Integer institutionId;
@Column(name = "InstitutionName")
private String InstitutionName;
@Column(name = "InstitutionDesc")
private String InstitutionDesc;
@Column(name = "InstitutionCode")
private String InstitutionCode;
@Column(name = "LocationId")
private Integer LocationId;
@Column(name = "InstitutionCodeName")
private String InstitutionCodeName;
@Column(name = "DomainType")
private String DomainType;
@Column(name = "DomainTypeDesc")
private String DomainTypeDesc;
public Integer getInstitutionId() {
	return institutionId;
}
public void setInstitutionId(Integer institutionId) {
	this.institutionId = institutionId;
}
public String getInstitutionName() {
	return InstitutionName;
}
public void setInstitutionName(String institutionName) {
	InstitutionName = institutionName;
}
public String getInstitutionDesc() {
	return InstitutionDesc;
}
public void setInstitutionDesc(String institutionDesc) {
	InstitutionDesc = institutionDesc;
}
public String getInstitutionCode() {
	return InstitutionCode;
}
public void setInstitutionCode(String institutionCode) {
	InstitutionCode = institutionCode;
}
public Integer getLocationId() {
	return LocationId;
}
public void setLocationId(Integer locationId) {
	LocationId = locationId;
}
public String getInstitutionCodeName() {
	return InstitutionCodeName;
}
public void setInstitutionCodeName(String institutionCodeName) {
	InstitutionCodeName = institutionCodeName;
}
public String getDomainType() {
	return DomainType;
}
public void setDomainType(String domainType) {
	DomainType = domainType;
}
public String getDomainTypeDesc() {
	return DomainTypeDesc;
}
public void setDomainTypeDesc(String domainTypeDesc) {
	DomainTypeDesc = domainTypeDesc;
}




}
