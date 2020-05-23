package com.freelauncer.model.admin;

import javax.persistence.*;

@Entity
@Table(name = "RetrieveErrorCodes")
public class RetrieveErrorCodes {
    private static final long serialVersionUID = -166399391710801760L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer ID;
    @Column(name = "CODE")
    private String code;
    @Column(name = "logic")
    private String logic;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLogic() {
        return logic;
    }

    public void setLogic(String logic) {
        this.logic = logic;
    }
}
