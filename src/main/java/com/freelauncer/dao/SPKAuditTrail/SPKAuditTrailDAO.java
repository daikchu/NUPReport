package com.freelauncer.dao.SPKAuditTrail;

public interface SPKAuditTrailDAO {

    /*Cau lenh query*/

    String sql = "select b.TerminalName+'-'+CAST(a.PaymentMasterID as varchar(50)) as ReferenceNo,a.PatientMRN,a.RequestTime as datetimeofscan,d.Description,a.EPOSResponseStatus+'-'+e.Logic as ePosBill,a.GatewayStatus+''+a.AmountPaid as selectPay,a.EPOSUpdateStatus,a.ReceiptPrintOutStatus\n" +
            "from SPKPaymentMaster a  \n" +
            "left join QsoftTerminal b on a.TerminalID=b.TerminalId\n" +
            "left join\n" +
            "(select a.*,b.Description from SPKPaymentInfo a,SPKPaymentMode b,SPKCardInfo c where a.PaymentInfoID=c.PaymentInfoID and c.PaymentModeID=b.PaymentModeID) d on d.PaymentInfoID=a.PaymentInfoID\n" +
            "left join RetrieveErrorCodes e on e.Code=a.EPOSResponseStatus\n" +
            ";";
}
