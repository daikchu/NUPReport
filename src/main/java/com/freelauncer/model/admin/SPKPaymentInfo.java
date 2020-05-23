package com.freelauncer.model.admin;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "SPKPaymentInfo")
public class SPKPaymentInfo implements Serializable {
    private static final long serialVersionUID = -166399391710801760L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentInfoID")
    private Integer PaymentInfoID;
    @Column(name = "PaymentCategoryID")
    private Integer PaymentCategoryID;
    @Column(name = "BillNumber")
    private Character BillNumber;
    @Column(name = "BillVersion")
    private Integer BillVersion;
    @Column(name = "AmountPaid")
    private BigDecimal AmountPaid;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Integer getPaymentInfoID() {
        return PaymentInfoID;
    }

    public void setPaymentInfoID(Integer paymentInfoID) {
        PaymentInfoID = paymentInfoID;
    }

    public Integer getPaymentCategoryID() {
        return PaymentCategoryID;
    }

    public void setPaymentCategoryID(Integer paymentCategoryID) {
        PaymentCategoryID = paymentCategoryID;
    }

    public Character getBillNumber() {
        return BillNumber;
    }

    public void setBillNumber(Character billNumber) {
        BillNumber = billNumber;
    }

    public Integer getBillVersion() {
        return BillVersion;
    }

    public void setBillVersion(Integer billVersion) {
        BillVersion = billVersion;
    }

    public BigDecimal getAmountPaid() {
        return AmountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        AmountPaid = amountPaid;
    }
}
