package com.freelauncer.model.admin;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Daicq on 12/21/2019.
 */
@Entity
@Data
@Table(name = "ism_logs_notify")
public class LogNotify {
    private static final long serialVersionUID = 1451508189162183268L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private long id;

    @Column(name = "token")
    private String token;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "idObject")
    private Long idObject;

    @Column(name = "receiver")
    private long receiver;

    @Column(name = "dateSent")
    private Date dateSent;

    @Column(name = "type")
    private String type;

    @Column(name = "code")
    private String code;

    @Column(name = "status")
    private Integer status;

    @Column(name = "genDate")
    private Date genDate;

    @Column(name = "deleted")
    private int deleted;

    @Column(name = "dataJson")
    private String dataJson;

    @Column(name = "typeNotify")
    private String typeNotify;

    @Column(name = "taskId")
    private Long taskId;

    @Column(name = "detectNewId")
    private Long detectNewId;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getIdObject() {
        return idObject;
    }

    public void setIdObject(Long idObject) {
        this.idObject = idObject;
    }

    public long getReceiver() {
        return receiver;
    }

    public void setReceiver(long receiver) {
        this.receiver = receiver;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getDateSent() {
        return dateSent;
    }

    public void setDateSent(Date dateSent) {
        this.dateSent = dateSent;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getGenDate() {
        return genDate;
    }

    public void setGenDate(Date genDate) {
        this.genDate = genDate;
    }

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public String getDataJson() {
        return dataJson;
    }

    public void setDataJson(String dataJson) {
        this.dataJson = dataJson;
    }

    public String getTypeNotify() {
        return typeNotify;
    }

    public void setTypeNotify(String typeNotify) {
        this.typeNotify = typeNotify;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getDetectNewId() {
        return detectNewId;
    }

    public void setDetectNewId(Long detectNewId) {
        this.detectNewId = detectNewId;
    }
}
