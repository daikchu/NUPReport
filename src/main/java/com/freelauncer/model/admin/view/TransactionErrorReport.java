package com.freelauncer.model.admin.view;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class TransactionErrorReport {
    @Id
    @Column(name="PolyCode")
    private String PolyCode;
    @Column(name="polyclinic")
    private String polyclinic;
    @Column(name="kioskid")
    private String kioskid;
    @Column(name="spkrefno")
    private String spkrefno;
    @Column(name="PatientMRN")
    private String PatientMRN;
    @Column(name="PatientName")
    private String PatientName;
    @Column(name="PaymentMode")
    private String PaymentMode;
    @Column(name="TerminalID")
    private String TerminalID;
    @Column(name="NetTransactionRefNo")
    private String NetTransactionRefNo;
    @Column(name="billnumberamount")
    private String billnumberamount;
    @Column(name="ErrorCode")
    private String ErrorCode;
    @Column(name="ErrorReason")
    private String ErrorReason;
    @Column(name="datetime")
    private Date datetime;

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public String getPolyCode() {
        return PolyCode;
    }

    public void setPolyCode(String polyCode) {
        PolyCode = polyCode;
    }

    public String getPolyclinic() {
        return polyclinic;
    }

    public void setPolyclinic(String polyclinic) {
        this.polyclinic = polyclinic;
    }

    public String getKioskid() {
        return kioskid;
    }

    public void setKioskid(String kioskid) {
        this.kioskid = kioskid;
    }

    public String getSpkrefno() {
        return spkrefno;
    }

    public void setSpkrefno(String spkrefno) {
        this.spkrefno = spkrefno;
    }

    public String getPatientMRN() {
        return PatientMRN;
    }

    public void setPatientMRN(String patientMRN) {
        PatientMRN = patientMRN;
    }

    public String getPatientName() {
        return PatientName;
    }

    public void setPatientName(String patientName) {
        PatientName = patientName;
    }

    public String getPaymentMode() {
        return PaymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        PaymentMode = paymentMode;
    }

    public String getTerminalID() {
        return TerminalID;
    }

    public void setTerminalID(String terminalID) {
        TerminalID = terminalID;
    }

    public String getNetTransactionRefNo() {
        return NetTransactionRefNo;
    }

    public void setNetTransactionRefNo(String netTransactionRefNo) {
        NetTransactionRefNo = netTransactionRefNo;
    }

    public String getBillnumberamount() {
        return billnumberamount;
    }

    public void setBillnumberamount(String billnumberamount) {
        this.billnumberamount = billnumberamount;
    }

    public String getErrorCode() {
        return ErrorCode;
    }

    public void setErrorCode(String errorCode) {
        ErrorCode = errorCode;
    }

    public String getErrorReason() {
        return ErrorReason;
    }

    public void setErrorReason(String errorReason) {
        ErrorReason = errorReason;
    }
}
