package com.freelauncer.model.admin;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "ism_file")
public class FileObject {
    private static final long serialVersionUID = -8299255898396933698L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", unique = true, nullable = false)
    private Long id;

    @Column(name = "fileName")
    private String fileName;

    @Column(name = "fileNameEncode")
    private String fileNameEncode;

    @Column(name = "fileSize")
    private Long fileSize;

    @Column(name = "fileUrl")
    private String fileUrl;

    @Column(name = "fileLink")
    private String fileLink;

    @Column(name = "fileType")
    private String fileType;

    @Column(name = "objectType")
    private String objectType;

    @Column(name = "objectId")
    private Long objectId;

    @Column(name = "nguoiTao_id")
    private Long userCreated;

    @Column(name = "nguoiSua_id")
    private Long userUpdated;

    @Column(name = "ngayTao")
    private Date dateCreated;

    @Column(name = "ngaySua")
    private Date dateUpdated;

    @Column(name = "daXoa")
    private int deleted;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public String getFileLink() {
        return fileLink;
    }

    public void setFileLink(String fileLink) {
        this.fileLink = fileLink;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    public Long getObjectId() {
        return objectId;
    }

    public void setObjectId(Long objectId) {
        this.objectId = objectId;
    }

    public Long getUserCreated() {
        return userCreated;
    }

    public void setUserCreated(Long userCreated) {
        this.userCreated = userCreated;
    }

    public Long getUserUpdated() {
        return userUpdated;
    }

    public void setUserUpdated(Long userUpdated) {
        this.userUpdated = userUpdated;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileNameEncode() {
        return fileNameEncode;
    }

    public void setFileNameEncode(String fileNameEncode) {
        this.fileNameEncode = fileNameEncode;
    }
}
