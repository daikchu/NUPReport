package com.freelauncer.model.admin.view;

import com.google.api.client.util.DateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class DailyCollectionByKioskReportView {
    @Id
    @Column(name="polyclinic")
    private String polyclinic;
    @Column(name="kioskId")
    private String kioskId;
    @Column(name="netTerminalId")
    private String netTerminalId;
    /*@Column(name="exLinkTerminalId")
    private String exLinkTerminalId;*/
    @Column(name="netsDebit")
    private BigDecimal netsDebit;
    @Column(name="netsCC")
    private BigDecimal netsCC;
    @Column(name="netsCDA")
    private BigDecimal netsCDA;
    //Trường này k có mô tả cách lấy dữ liệu trong bản doc
    /*@Column(name="ezLink")
    private BigDecimal ezLink;*/
    @Column(name="creditCard")
    private BigDecimal creditCard;
    @Column(name="cash")
    private BigDecimal cash;
    @Column(name="totalCollection")
    private BigDecimal totalCollection;

    @Column(name="netsDebitCount")
    private Integer netsDebitCount;
    @Column(name="netsCCCount")
    private Integer netsCCCount;
    /*@Column(name="ezLinkCount")
    private Integer ezLinkCount;*/
    @Column(name="creditCardCount")
    private Integer creditCardCount;
    @Column(name="cashCount")
    private Integer cashCount;
    @Column(name="totalCount")
    private Integer totalCount;

    public String getPolyclinic() {
        return polyclinic;
    }

    public void setPolyclinic(String polyclinic) {
        this.polyclinic = polyclinic;
    }

    public String getKioskId() {
        return kioskId;
    }

    public void setKioskId(String kioskId) {
        this.kioskId = kioskId;
    }

    public String getNetTerminalId() {
        return netTerminalId;
    }

    public void setNetTerminalId(String netTerminalId) {
        this.netTerminalId = netTerminalId;
    }

   /* public String getExLinkTerminalId() {
        return exLinkTerminalId;
    }

    public void setExLinkTerminalId(String exLinkTerminalId) {
        this.exLinkTerminalId = exLinkTerminalId;
    }*/

    public BigDecimal getNetsDebit() {
        return netsDebit;
    }

    public void setNetsDebit(BigDecimal netsDebit) {
        this.netsDebit = netsDebit;
    }

    public BigDecimal getNetsCC() {
        return netsCC;
    }

    public void setNetsCC(BigDecimal netsCC) {
        this.netsCC = netsCC;
    }

    public BigDecimal getNetsCDA() {
        return netsCDA;
    }

    public void setNetsCDA(BigDecimal netsCDA) {
        this.netsCDA = netsCDA;
    }

    /*public BigDecimal getEzLink() {
        return ezLink;
    }

    public void setEzLink(BigDecimal ezLink) {
        this.ezLink = ezLink;
    }*/

    public BigDecimal getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(BigDecimal creditCard) {
        this.creditCard = creditCard;
    }

    public BigDecimal getCash() {
        return cash;
    }

    public void setCash(BigDecimal cash) {
        this.cash = cash;
    }

    public BigDecimal getTotalCollection() {
        return totalCollection;
    }

    public void setTotalCollection(BigDecimal totalCollection) {
        this.totalCollection = totalCollection;
    }

    public Integer getNetsDebitCount() {
        return netsDebitCount;
    }

    public void setNetsDebitCount(Integer netsDebitCount) {
        this.netsDebitCount = netsDebitCount;
    }

    public Integer getNetsCCCount() {
        return netsCCCount;
    }

    public void setNetsCCCount(Integer netsCCCount) {
        this.netsCCCount = netsCCCount;
    }

   /* public Integer getEzLinkCount() {
        return ezLinkCount;
    }

    public void setEzLinkCount(Integer ezLinkCount) {
        this.ezLinkCount = ezLinkCount;
    }*/

    public Integer getCreditCardCount() {
        return creditCardCount;
    }

    public void setCreditCardCount(Integer creditCardCount) {
        this.creditCardCount = creditCardCount;
    }

    public Integer getCashCount() {
        return cashCount;
    }

    public void setCashCount(Integer cashCount) {
        this.cashCount = cashCount;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }
}
