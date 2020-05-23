package com.freelauncer.dao.PatientTransactionReport;

import com.freelauncer.common.PagingResult;
import com.freelauncer.common.Utils;
import com.freelauncer.model.admin.view.DailyCollectionByKioskReportView;
import com.freelauncer.model.admin.view.PatientTransactionReportView;
import com.freelauncer.model.admin.view.TransactionErrorReport;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.util.List;

@Repository
@Transactional(value = "transactionManager")
public class PatientTransactionReportDAOimpl implements PatientTransactionReportDAO{
    @PersistenceContext(unitName = "appAdmin")
    @Qualifier(value = "transactionManager")
    private EntityManager entityManager;
    @Override
    public PagingResult ltsPatientTransactionReport(PagingResult page, int numberPerPage, String startdate, String enddate, String TerminalID, String KioskID, String PolyCode) {
        int offset = 0;
        if (page.getPageNumber() > 0) {
            offset = (page.getPageNumber() - 1) * page.getNumberPerPage();
        }
        int max = numberPerPage*page.getPageNumber()+1;
  String condition = "";
        if (!StringUtils.isBlank(startdate)) {

            condition = condition + " AND a.RequestTime >= '" +startdate+"'";
        }
        if (!StringUtils.isBlank(enddate)) {
            condition = condition + " AND a.RequestTime <= '" +enddate+"'";
        }
        if(!StringUtils.isBlank(PolyCode)){
            condition=condition+" AND b.InstitutionCodeName = '"+PolyCode+"'";
        }
        if(!StringUtils.isBlank(TerminalID)){
            condition=condition+" AND a.NetTerminalId ="+TerminalID;
        }
        if(!StringUtils.isBlank(KioskID)){
            condition=condition+" AND c.TerminalName = '"+KioskID+"'";
        }

        String sql = "select ROW_NUMBER() OVER (ORDER BY a.RequestTime) as row, a.RequestTime as date,b.InstitutionName as polyclinic, b.InstitutionCodeName as polyCode, \n" +
                "\t c.TerminalName as kioskId,(c.TerminalName +'-'+CAST(a.PaymentMasterID as varchar(50)))as spkRefNo,a.PatientMRN as patientMRN,a.PatientName as patientName,\n" +
                "\t FORMAT (a.RequestTime, 'hh:mm:ss:tt') as timeOfNRICScan,d.Description as paymentMode,a.NetTerminalId as terminalId,a.NetTransactionRefNo as transactionRefNo,FORMAT (a.PaymentEndTime, 'hh:mm:ss:tt') as transactionTime,a.AmountPaid as transactionAmount,\n" +
                "\t e.Last4Digits as cardInfo,a.ReceiptPrintOutEndTime as timeOfReceptPrint,a.ReceiptPrintOutEndTime-a.RequestTime as duration,(case  when k.newBill is null then 0 else k.newBill end) as newBillsPaids,(case  when k2.countBill is null then 0 else k2.countBill end) as outStandingBillsPaid,\n" +
                "\t (case  when k.newBill is null then 0 else k.newBill end)-(case  when k2.countBill is null then 0 else k2.countBill end) as totalBuildsPaids\n" +
                "\t from SPKPaymentMaster a\n" +
                "\t left join QsoftInstitution b  on a.PolyCode=b.InstitutionCodeName\n" +
                "\t left join \n" +
                "\t QsoftTerminal c on a.TerminalID=c.TerminalId\n" +
                "\t left join \n" +
                "\t (select a.*,b.Description from SPKPaymentInfo a,SPKPaymentMode b,SPKCardInfo c where a.PaymentInfoID=c.PaymentInfoID and c.PaymentModeID=b.PaymentModeID) d on d.PaymentInfoID=a.PaymentInfoID\n" +
                "\t left join SPKPaymentInfo f on a.PaymentInfoID=f.PaymentInfoID left join SPKCardInfo e on e.PaymentInfoID=d.PaymentInfoID\n" +
                "\t left join \n" +
                "\t (select count(b.BillID) as newBill,b.PaymentMasterID from EPOSBillsDetails b where b.BillTypeID=1 group by b.PaymentMasterID) k\n" +
                "\t on k.PaymentMasterID=a.PaymentMasterID\n" +
                "\t left join\n" +
                "\t (select count(b.BillID) as countBill,b.PaymentMasterID from EPOSBillsDetails b where b.BillTypeID=2 group by b.PaymentMasterID) k2\n" +
                "\t on k2.PaymentMasterID=a.PaymentMasterID where 1=1 "+condition;

        Query query = entityManager.createNativeQuery("select count(*) FROM ("+sql+") as count");
        Number singleResult = ((Number)query.getSingleResult());
        BigDecimal count = new BigDecimal(singleResult.toString());
        Integer rowCount = 0;
        rowCount = Integer.parseInt(count.toString());

        if(rowCount>0){
            String sqlGetList = "select * from ("+sql+") temp where temp.row > "+offset+" and temp.row < "+max;
            query = entityManager.createNativeQuery(sqlGetList, PatientTransactionReportView.class);
        }
        List<PatientTransactionReportView> list = query.getResultList();

        if (list != null) {
            page.setItems(list);
            page.setRowCount(rowCount);

        }
        return page;
    }
}
