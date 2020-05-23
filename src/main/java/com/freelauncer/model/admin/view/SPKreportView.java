package com.freelauncer.model.admin.view;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.math.BigDecimal;

@Entity
public class SPKreportView {
    @Id
    @Column(name="codename")
    private String codename;
    @Column(name="Polyclinic")
    private String Polyclinic;
    @Column(name="netdebit")
    private BigDecimal netdebit;
    @Column(name="netcc")

    private BigDecimal netcc;
    @Column(name="netcda")

    private BigDecimal netcda;
    @Column(name="creditcard")

    private BigDecimal creditcard;
    @Column(name="cash")

    private BigDecimal cash;
    @Column(name="totalcollection")

    private BigDecimal totalcollection;
    @Column(name="countdebit")

    private Integer countdebit;
    @Column(name="countcc")

    private Integer countcc;
    @Column(name="countcda")

    private Integer countcda;
    @Column(name="countcrcard")

    private Integer countcrcard;
    @Column(name="countcash")

    private Integer countcash;

    @Column(name="totalcount")
    private Integer totalcount;

    public String getCodename() {
        return codename;
    }

    public void setCodename(String codename) {
        this.codename = codename;
    }

    public Integer getTotalcount() {
        return totalcount;
    }

    public void setTotalcount(Integer totalcount) {
        this.totalcount = totalcount;
    }

    public String getPolyclinic() {
        return Polyclinic;
    }

    public void setPolyclinic(String polyclinic) {
        Polyclinic = polyclinic;
    }

    public BigDecimal getNetdebit() {
        return netdebit;
    }

    public void setNetdebit(BigDecimal netdebit) {
        this.netdebit = netdebit;
    }

    public BigDecimal getNetcc() {
        return netcc;
    }

    public void setNetcc(BigDecimal netcc) {
        this.netcc = netcc;
    }

    public BigDecimal getNetcda() {
        return netcda;
    }

    public void setNetcda(BigDecimal netcda) {
        this.netcda = netcda;
    }

    public BigDecimal getCreditcard() {
        return creditcard;
    }

    public void setCreditcard(BigDecimal creditcard) {
        this.creditcard = creditcard;
    }

    public BigDecimal getCash() {
        return cash;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    public BigDecimal getTotalcollection() {
        return totalcollection;
    }

    public void setTotalcollection(BigDecimal totalcollection) {
        this.totalcollection = totalcollection;
    }

    public Integer getCountdebit() {
        return countdebit;
    }

    public void setCountdebit(Integer countdebit) {
        this.countdebit = countdebit;
    }

    public Integer getCountcc() {
        return countcc;
    }

    public void setCountcc(Integer countcc) {
        this.countcc = countcc;
    }

    public Integer getCountcda() {
        return countcda;
    }

    public void setCountcda(Integer countcda) {
        this.countcda = countcda;
    }

    public Integer getCountcrcard() {
        return countcrcard;
    }

    public void setCountcrcard(Integer countcrcard) {
        this.countcrcard = countcrcard;
    }

    public Integer getCountcash() {
        return countcash;
    }

    public void setCountcash(Integer countcash) {
        this.countcash = countcash;
    }
}
