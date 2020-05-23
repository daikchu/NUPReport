package com.freelauncer.dao.DailyCollectionByKiosks;

import com.freelauncer.common.PagingResult;
import com.freelauncer.model.admin.view.DailyCollectionByKioskReportView;
import com.freelauncer.model.admin.view.PatientTransactionReportView;
import com.freelauncer.model.admin.view.TransactionErrorReport;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.util.List;


@Repository
@Transactional(value = "transactionManager")
public class DailyCollectionByKioskDAOimpl implements DailyCollectionByKioskDAO{
    @PersistenceContext(unitName = "appAdmin")
    @Qualifier(value = "transactionManager")
    private EntityManager entityManager;

    @Override
    public PagingResult ltsDailyCollectionByKioskReport(PagingResult page, int numberPerPage, String startdate, String enddate, String TerminalID, String KioskID, String PolyCode) {
        int offset = 0;
        if (page.getPageNumber() > 0) {
            offset = (page.getPageNumber() - 1) * page.getNumberPerPage();
        }
        int max = numberPerPage*page.getPageNumber()+1;

        String condition = "";

        String sql = "select ROW_NUMBER() OVER (ORDER BY bangchinh.InstitutionCodeName) as row, bangchinh.*,\n" +
                "(case  when bangmau.NETSDebit is null then 0 else bangmau.NETSDebit end) as netsdebit \n" +
                ",(case  when bangmau2.NETSDebit is null then 0 else bangmau2.NETSDebit end) as netsCC\n" +
                ",(case  when bangmau3.NETSDebit is null then 0 else bangmau3.NETSDebit end) as netsCDA\n" +
                ",(case  when bangmau4.NETSDebit is null then 0 else bangmau4.NETSDebit end) as creditCard\n" +
                ",(case  when bangmau5.NETSDebit is null then 0 else bangmau5.NETSDebit end) as cash\n" +
                ",(case  when bangmau.NETSDebit is null then 0 else bangmau.NETSDebit end)  +\n" +
                "(case  when bangmau2.NETSDebit is null then 0 else bangmau2.NETSDebit end) +\n" +
                "(case  when bangmau3.NETSDebit is null then 0 else bangmau3.NETSDebit end) +\n" +
                "(case  when bangmau4.NETSDebit is null then 0 else bangmau4.NETSDebit end) +\n" +
                "(case  when bangmau5.NETSDebit is null then 0 else bangmau5.NETSDebit end) as totalCollection,\n" +
                "(case  when bangmau.count is null then 0 else bangmau.count end) as netsDebitCount,\n" +
                "(case  when bangmau2.count is null then 0 else bangmau2.count end) as netsCCCount,\n" +
                "(case  when bangmau3.count is null then 0 else bangmau3.count end) as countcda,\n" +
                "(case  when bangmau4.count is null then 0 else bangmau4.count end) as creditCardCount,\n" +
                "(case  when bangmau5.count is null then 0 else bangmau5.count end) as cashCount,\n" +
                "(case  when bangmau.count is null then 0 else bangmau.count end)+ (case  when bangmau2.count is null then 0 else bangmau2.count end)+ (case  when bangmau3.count is null then 0 else bangmau3.count end)+ (case  when bangmau4.count is null then 0 else bangmau4.count end)+ (case  when bangmau5.count is null then 0 else bangmau5.count end)as totalCount\n" +
                "\n" +
                "\n" +
                "from (select FORMAT (a.RequestTime, 'dd/MM/yyyy ') as RequestTime,a.NetTerminalId as netTerminalId,b.InstitutionCodeName,b.InstitutionName as polyclinic,c.TerminalName as kioskId from \n" +
                "[dbo].[SPKPaymentMaster] a\n" +
                "left join QsoftInstitution b\n" +
                "on a.PolyCode=b.InstitutionCodeName\n" +
                "\n" +
                "left join QsoftTerminal c\n" +
                "on a.TerminalID=c.TerminalId\n" +
                "group by\n" +
                "FORMAT (a.RequestTime, 'dd/MM/yyyy ') ,b.InstitutionName,c.TerminalName,b.InstitutionCodeName,a.NetTerminalId) bangchinh\n" +
                "left join \n" +
                "\n" +
                "(select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
                "\t\t\t  from \n" +
                "\t\t\t  [dbo].[SPKPaymentInfo] c inner join\n" +
                "\t\t\t  [dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
                "\t\t\t  where [PaymentModeID]=3 and c.[PaymentCategoryID]=2 \n" +
                "\t\t\t   group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID group by a.PolyCode) bang) bangmau on bangchinh.InstitutionCodeName=bangmau.PolyCode\n" +
                "left join \n" +
                "\n" +
                "(select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
                "\t\t\t  from \n" +
                "\t\t\t  [dbo].[SPKPaymentInfo] c inner join\n" +
                "\t\t\t  [dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
                "\t\t\t  where ([PaymentModeID]=4 OR [PaymentModeID]=12) and c.[PaymentCategoryID]=2\n" +
                "\t\t\t   group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID group by a.PolyCode) bang) bangmau2 on bangchinh.InstitutionCodeName=bangmau2.PolyCode\n" +
                "\n" +
                "\t\t\t   left join\n" +
                "\n" +
                "\t\t\t   (select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
                "\t\t\t  from \n" +
                "\t\t\t  [dbo].[SPKPaymentInfo] c inner join\n" +
                "\t\t\t  [dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
                "\t\t\t  where ([PaymentModeID]=13) and c.[PaymentCategoryID]=2\n" +
                "\t\t\t   group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID group by a.PolyCode) bang)bangmau3 on bangchinh.InstitutionCodeName=bangmau.PolyCode\n" +
                "\n" +
                " left join \n" +
                " (select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
                "\t\t\t  from \n" +
                "\t\t\t  [dbo].[SPKPaymentInfo] c inner join\n" +
                "\t\t\t  [dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
                "\t\t\t  where c.[PaymentCategoryID]=1\n" +
                "\t\t\t   group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID group by a.PolyCode) bang)bangmau4 on bangchinh.InstitutionCodeName=bangmau4.PolyCode\n" +
                "\n" +
                "left join \n" +
                "(select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
                "\t\t\t  from \n" +
                "\t\t\t  [dbo].[SPKPaymentInfo] c inner join\n" +
                "\t\t\t  [dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
                "\t\t\t  where c.[PaymentCategoryID]=3\n" +
                "\t\t\t   group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID group by a.PolyCode) bang)bangmau5 on bangchinh.InstitutionCodeName=bangmau5.PolyCode";


        Query query = entityManager.createNativeQuery("select count(*) FROM ("+sql+") as count");
        Number singleResult = ((Number)query.getSingleResult());
        BigDecimal count = new BigDecimal(singleResult.toString());
        Integer rowCount = 0;
        rowCount = Integer.parseInt(count.toString());

        if(rowCount>0){
            String sqlGetList = "select * from ("+sql+") temp where temp.row > "+offset+" and temp.row < "+max;
            query = entityManager.createNativeQuery(sqlGetList, DailyCollectionByKioskReportView.class);
        }
        List<DailyCollectionByKioskReportView> list = query.getResultList();

      /*  Query query = entityManager.createNativeQuery(sql, DailyCollectionByKioskReportView.class);
        int count=0;
        List<Object[]> list = query*//*.setFirstResult(offset).setMaxResults(page.getNumberPerPage())*//*.getResultList();*/

         if (list != null) {
            page.setItems(list);
            page.setRowCount(rowCount);

        }
        return page;
    }
}
