package com.freelauncer.model.admin;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "SPKCardInfo")
public class SPKCardInfo implements Serializable {
    private static final long serialVersionUID = -166399391710801760L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CardInfoID")
    private Integer CardInfoID;
    @Column(name = "PaymentModeCode")
    private String PaymentModeCode;
    @Column(name = "PaymentInfoID")
    private Integer PaymentInfoID;
    @Column(name = "PaymentModeID")
    private Integer PaymentModeID;
    @Column(name = "Last4Digits")
    private String Last4Digits;
    @Column(name = "ApprovalCode")
    private String ApprovalCode;
    @Column(name = "ExpiryDate")
    private String ExpiryDate;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getCardInfoID() {
        return CardInfoID;
    }

    public void setCardInfoID(Integer cardInfoID) {
        CardInfoID = cardInfoID;
    }

    public String getPaymentModeCode() {
        return PaymentModeCode;
    }

    public void setPaymentModeCode(String paymentModeCode) {
        PaymentModeCode = paymentModeCode;
    }

    public Integer getPaymentInfoID() {
        return PaymentInfoID;
    }

    public void setPaymentInfoID(Integer paymentInfoID) {
        PaymentInfoID = paymentInfoID;
    }

    public Integer getPaymentModeID() {
        return PaymentModeID;
    }

    public void setPaymentModeID(Integer paymentModeID) {
        PaymentModeID = paymentModeID;
    }

    public String getLast4Digits() {
        return Last4Digits;
    }

    public void setLast4Digits(String last4Digits) {
        Last4Digits = last4Digits;
    }

    public String getApprovalCode() {
        return ApprovalCode;
    }

    public void setApprovalCode(String approvalCode) {
        ApprovalCode = approvalCode;
    }

    public String getExpiryDate() {
        return ExpiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        ExpiryDate = expiryDate;
    }
}
