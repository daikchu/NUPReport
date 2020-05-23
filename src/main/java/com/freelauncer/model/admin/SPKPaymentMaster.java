package com.freelauncer.model.admin;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;
@Entity
@Table(name = "SPKPaymentMaster")
public class SPKPaymentMaster  implements Serializable {
    private static final long serialVersionUID = -166399391710801760L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentMasterID")
    private Integer PaymentMasterID;
    @Column(name = "PatientMRN")
    private String PatientMRN;
    @Column(name = "TerminalID")
    private Integer TerminalID;
    @Column(name = "PolyCode")
    private String PolyCode;
    @Column(name = "PatientName")
    private String PatientName;
    @Column(name = "ConsultationIndicator")
    private Integer ConsultationIndicator;
    @Column(name = "MedisaveClaimableIndicator")
    private Integer MedisaveClaimableIndicator;
    @Column(name = "WavierFlag")
    private Integer WavierFlag;
    @Column(name = "CollectedAmount")
    private BigDecimal CollectedAmount;
    @Column(name = "AmountPaid")
    private BigDecimal AmountPaid;
    @Column(name = "RefundAmount")
    private BigDecimal RefundAmount;
    @Column(name = "PaymentInfoID")
    private Integer PaymentInfoID;
    @Column(name = "RequestTime")
    private Date RequestTime;
    @Column(name = "ReceiveTime")
    private Date ReceiveTime;
    @Column(name = "PaymentStartTime")
    private Date PaymentStartTime;
    @Column(name = "PaymentEndTime")
    private Date PaymentEndTime;
    @Column(name = "EPOSResponseStatus")
    private String EPOSResponseStatus;
    @Column(name = "EPOSUpdateStatus")
    private String EPOSUpdateStatus;
    @Column(name = "ReceiptPrintOutEndTime")
    private Date ReceiptPrintOutEndTime;
    @Column(name = "ReceiptPrintOutStartTime")
    private Date ReceiptPrintOutStartTime;
    @Column(name = "ReceiptPrintOutStatus")
    private Date ReceiptPrintOutStatus;
    @Column(name = "NetTerminalId")
    private String NetTerminalId;
    @Column(name = "NetTransactionRefNo")
    private String NetTransactionRefNo;
    @Column(name = "GatewayStatus")
    private String GatewayStatus;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getPaymentMasterID() {
        return PaymentMasterID;
    }

    public void setPaymentMasterID(Integer paymentMasterID) {
        PaymentMasterID = paymentMasterID;
    }

    public String getPatientMRN() {
        return PatientMRN;
    }

    public void setPatientMRN(String patientMRN) {
        PatientMRN = patientMRN;
    }

    public Integer getTerminalID() {
        return TerminalID;
    }

    public void setTerminalID(Integer terminalID) {
        TerminalID = terminalID;
    }

    public String getPolyCode() {
        return PolyCode;
    }

    public void setPolyCode(String polyCode) {
        PolyCode = polyCode;
    }

    public String getPatientName() {
        return PatientName;
    }

    public void setPatientName(String patientName) {
        PatientName = patientName;
    }

    public Integer getConsultationIndicator() {
        return ConsultationIndicator;
    }

    public void setConsultationIndicator(Integer consultationIndicator) {
        ConsultationIndicator = consultationIndicator;
    }

    public Integer getMedisaveClaimableIndicator() {
        return MedisaveClaimableIndicator;
    }

    public void setMedisaveClaimableIndicator(Integer medisaveClaimableIndicator) {
        MedisaveClaimableIndicator = medisaveClaimableIndicator;
    }

    public Integer getWavierFlag() {
        return WavierFlag;
    }

    public void setWavierFlag(Integer wavierFlag) {
        WavierFlag = wavierFlag;
    }

    public BigDecimal getCollectedAmount() {
        return CollectedAmount;
    }

    public void setCollectedAmount(BigDecimal collectedAmount) {
        CollectedAmount = collectedAmount;
    }

    public BigDecimal getAmountPaid() {
        return AmountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        AmountPaid = amountPaid;
    }

    public BigDecimal getRefundAmount() {
        return RefundAmount;
    }

    public void setRefundAmount(BigDecimal refundAmount) {
        RefundAmount = refundAmount;
    }

    public Integer getPaymentInfoID() {
        return PaymentInfoID;
    }

    public void setPaymentInfoID(Integer paymentInfoID) {
        PaymentInfoID = paymentInfoID;
    }

    public Date getRequestTime() {
        return RequestTime;
    }

    public void setRequestTime(Date requestTime) {
        RequestTime = requestTime;
    }

    public Date getReceiveTime() {
        return ReceiveTime;
    }

    public void setReceiveTime(Date receiveTime) {
        ReceiveTime = receiveTime;
    }

    public Date getPaymentStartTime() {
        return PaymentStartTime;
    }

    public void setPaymentStartTime(Date paymentStartTime) {
        PaymentStartTime = paymentStartTime;
    }

    public Date getPaymentEndTime() {
        return PaymentEndTime;
    }

    public void setPaymentEndTime(Date paymentEndTime) {
        PaymentEndTime = paymentEndTime;
    }

    public String getEPOSResponseStatus() {
        return EPOSResponseStatus;
    }

    public void setEPOSResponseStatus(String EPOSResponseStatus) {
        this.EPOSResponseStatus = EPOSResponseStatus;
    }

    public String getEPOSUpdateStatus() {
        return EPOSUpdateStatus;
    }

    public void setEPOSUpdateStatus(String EPOSUpdateStatus) {
        this.EPOSUpdateStatus = EPOSUpdateStatus;
    }

    public Date getReceiptPrintOutEndTime() {
        return ReceiptPrintOutEndTime;
    }

    public void setReceiptPrintOutEndTime(Date receiptPrintOutEndTime) {
        ReceiptPrintOutEndTime = receiptPrintOutEndTime;
    }

    public Date getReceiptPrintOutStartTime() {
        return ReceiptPrintOutStartTime;
    }

    public void setReceiptPrintOutStartTime(Date receiptPrintOutStartTime) {
        ReceiptPrintOutStartTime = receiptPrintOutStartTime;
    }

    public Date getReceiptPrintOutStatus() {
        return ReceiptPrintOutStatus;
    }

    public void setReceiptPrintOutStatus(Date receiptPrintOutStatus) {
        ReceiptPrintOutStatus = receiptPrintOutStatus;
    }

    public String getNetTerminalId() {
        return NetTerminalId;
    }

    public void setNetTerminalId(String netTerminalId) {
        NetTerminalId = netTerminalId;
    }

    public String getNetTransactionRefNo() {
        return NetTransactionRefNo;
    }

    public void setNetTransactionRefNo(String netTransactionRefNo) {
        NetTransactionRefNo = netTransactionRefNo;
    }

    public String getGatewayStatus() {
        return GatewayStatus;
    }

    public void setGatewayStatus(String gatewayStatus) {
        GatewayStatus = gatewayStatus;
    }
}
