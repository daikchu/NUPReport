package com.freelauncer.model.admin.view;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class PatientTransactionReportView {
    @Id
    @Column(name="date")
    private Date date;
    @Column(name="polyclinic")
    private String polyclinic;
    @Column(name="kioskId")
    private String kioskId;
    @Column(name="spkRefNo")
    private String spkRefNo;
    @Column(name="patientMRN")
    private String patientMRN;
    @Column(name="patientName")
    private String patientName;
    @Column(name="paymentMode")
    private String paymentMode;
    @Column(name="terminalId")
    private String terminalId;
    @Column(name="transactionRefNo")
    private String transactionRefNo;
    @Column(name="transactionTime")
    private String transactionTime;
    @Column(name="transactionAmount")
    private BigDecimal transactionAmount;
    @Column(name="cardInfo")
    private String cardInfo;
    @Column(name="timeOfNRICScan")
    private String timeOfNRICScan;
    @Column(name="timeOfReceptPrint")
    private String timeOfReceptPrint;
    @Column(name="duration")
    private String duration;
    //Trường này k có mô tả
    /*@Column(name="status")
    private String status;*/
    @Column(name="newBillsPaids")
    private Integer newBillsPaids;
    @Column(name="outStandingBillsPaid")
    private Integer outStandingBillsPaid;
    @Column(name="totalBuildsPaids")
    private Integer totalBuildsPaids;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

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

    public String getSpkRefNo() {
        return spkRefNo;
    }

    public void setSpkRefNo(String spkRefNo) {
        this.spkRefNo = spkRefNo;
    }

    public String getPatientMRN() {
        return patientMRN;
    }

    public void setPatientMRN(String patientMRN) {
        this.patientMRN = patientMRN;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getTerminalId() {
        return terminalId;
    }

    public void setTerminalId(String terminalId) {
        this.terminalId = terminalId;
    }

    public String getTransactionRefNo() {
        return transactionRefNo;
    }

    public void setTransactionRefNo(String transactionRefNo) {
        this.transactionRefNo = transactionRefNo;
    }

    public String getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(String transactionTime) {
        this.transactionTime = transactionTime;
    }

    public BigDecimal getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(BigDecimal transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public String getCardInfo() {
        return cardInfo;
    }

    public void setCardInfo(String cardInfo) {
        this.cardInfo = cardInfo;
    }

    public String getTimeOfNRICScan() {
        return timeOfNRICScan;
    }

    public void setTimeOfNRICScan(String timeOfNRICScan) {
        this.timeOfNRICScan = timeOfNRICScan;
    }

    public String getTimeOfReceptPrint() {
        return timeOfReceptPrint;
    }

    public void setTimeOfReceptPrint(String timeOfReceptPrint) {
        this.timeOfReceptPrint = timeOfReceptPrint;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

  /*  public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
*/
    public Integer getNewBillsPaids() {
        return newBillsPaids;
    }

    public void setNewBillsPaids(Integer newBillsPaids) {
        this.newBillsPaids = newBillsPaids;
    }

    public Integer getOutStandingBillsPaid() {
        return outStandingBillsPaid;
    }

    public void setOutStandingBillsPaid(Integer outStandingBillsPaid) {
        this.outStandingBillsPaid = outStandingBillsPaid;
    }

    public Integer getTotalBuildsPaids() {
        return totalBuildsPaids;
    }

    public void setTotalBuildsPaids(Integer totalBuildsPaids) {
        this.totalBuildsPaids = totalBuildsPaids;
    }
}
