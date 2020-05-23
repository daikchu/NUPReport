package com.freelauncer.model.admin;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
@Entity
@Table(name = "SPKPaymentMode")
public class SPKPaymentMode implements Serializable {
    private static final long serialVersionUID = -166399391710801760L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentModeID")
    private Integer PaymentModeID;
    @Column(name = "PaymentModeCode")
    private String PaymentModeCode;
    @Column(name = "PaymentCategoryID")
    private Integer PaymentCategoryID;
    @Column(name = "QuantityLimit")
    private Integer QuantityLimit;
    @Column(name = "SignatureRequired")
    private Integer SignatureRequired;
    @Column(name = "Active")
    private Integer Active;
    @Column(name = "CreatedDate")
    private Date CreatedDate;
    @Column(name = "CreatedBy")
    private Integer CreatedBy;
    @Column(name = "UpdatedDate")
    private Date UpdatedDate;
    @Column(name = "UpdatedBy")
    private Integer UpdatedBy;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getPaymentModeID() {
        return PaymentModeID;
    }

    public void setPaymentModeID(Integer paymentModeID) {
        PaymentModeID = paymentModeID;
    }

    public String getPaymentModeCode() {
        return PaymentModeCode;
    }

    public void setPaymentModeCode(String paymentModeCode) {
        PaymentModeCode = paymentModeCode;
    }

    public Integer getPaymentCategoryID() {
        return PaymentCategoryID;
    }

    public void setPaymentCategoryID(Integer paymentCategoryID) {
        PaymentCategoryID = paymentCategoryID;
    }

    public Integer getQuantityLimit() {
        return QuantityLimit;
    }

    public void setQuantityLimit(Integer quantityLimit) {
        QuantityLimit = quantityLimit;
    }

    public Integer getSignatureRequired() {
        return SignatureRequired;
    }

    public void setSignatureRequired(Integer signatureRequired) {
        SignatureRequired = signatureRequired;
    }

    public Integer getActive() {
        return Active;
    }

    public void setActive(Integer active) {
        Active = active;
    }

    public Date getCreatedDate() {
        return CreatedDate;
    }

    public void setCreatedDate(Date createdDate) {
        CreatedDate = createdDate;
    }

    public Integer getCreatedBy() {
        return CreatedBy;
    }

    public void setCreatedBy(Integer createdBy) {
        CreatedBy = createdBy;
    }

    public Date getUpdatedDate() {
        return UpdatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        UpdatedDate = updatedDate;
    }

    public Integer getUpdatedBy() {
        return UpdatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        UpdatedBy = updatedBy;
    }
}
