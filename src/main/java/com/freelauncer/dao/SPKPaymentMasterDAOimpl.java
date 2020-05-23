package com.freelauncer.dao;

import com.freelauncer.common.PagingResult;
import com.freelauncer.common.Utils;
import com.freelauncer.model.admin.QsoftInstitution;
import com.freelauncer.model.admin.view.SPKreportView;
import com.freelauncer.model.admin.view.TransactionErrorReport;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Repository
@Transactional(value = "transactionManager")
public class SPKPaymentMasterDAOimpl implements SPKPaymentMasterDAO{
	  @PersistenceContext(unitName = "appAdmin")
	    @Qualifier(value = "transactionManager")
	    private EntityManager entityManager;

	  //Truy vấn cho bảng 1
	@Override
	public List<SPKreportView> findAll(String code, String startdate, String endDate) {
		String dkPolyCode="";
		String dkTime = "";
		if(!StringUtils.isBlank(code)){
			dkPolyCode=" where bangchinh.InstitutionCodeName = '"+code+"'";
		}
		if(!StringUtils.isBlank(startdate)){
			dkTime=dkTime+" AND a.ReceiveTime >= '"+ startdate+"'";
		}
		if(!StringUtils.isBlank(endDate)){
			dkTime=dkTime+" AND a.ReceiveTime <= '"+ endDate+"'";
		}
		// TODO Auto-generated method stub
      String sql="select bangchinh.InstitutionCodeName as codename,bangchinh.InstitutionName as Polyclinic,(case  when bangmau.NETSDebit is null then 0 else bangmau.NETSDebit end) as netdebit,\n" +
			  "(case  when bangmau2.NETSDebit is null then 0 else bangmau2.NETSDebit end) as netcc,(case  when bangmau3.NETSDebit is null then 0 else bangmau3.NETSDebit end) as netcda,(case  when bangmau4.NETSDebit is null then 0 else bangmau4.NETSDebit end) as creditcard,(case  when bangmau5.NETSDebit is null then 0 else bangmau.NETSDebit end) as cash, (case  when bangmau.NETSDebit is null then 0 else bangmau.NETSDebit end)\n" +
			  "+(case  when bangmau2.NETSDebit is null then 0 else bangmau2.NETSDebit end)+(case  when bangmau3.NETSDebit is null then 0 else bangmau3.NETSDebit end)+(case  when bangmau4.NETSDebit is null then 0 else bangmau4.NETSDebit end)+(case  when bangmau5.NETSDebit is null then 0 else bangmau5.NETSDebit end)\n" +
			  "\n" +
			  "as totalcollection,(case  when bangmau.count is null then 0 else bangmau.count end) as countdebit,\n" +
			  "(case  when bangmau2.count is null then 0 else bangmau2.count end) as countcc,\n" +
			  "(case  when bangmau3.count is null then 0 else bangmau3.count end) as countcda,\n" +
			  "(case  when bangmau4.count is null then 0 else bangmau4.count end) as countcrcard,\n" +
			  "(case  when bangmau5.count is null then 0 else bangmau5.count end) as countcash\n" +
			  ",(case  when bangmau.count is null then 0 else bangmau.count end)+ (case  when bangmau2.count is null then 0 else bangmau2.count end)+ (case  when bangmau3.count is null then 0 else bangmau3.count end)+ (case  when bangmau4.count is null then 0 else bangmau4.count end)+ (case  when bangmau5.count is null then 0 else bangmau5.count end)as totalcount from (select * from QsoftInstitution) bangchinh \n" +
			  "LEFT JOIN \n" +
			  "(select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
			  "from \n" +
			  "[dbo].[SPKPaymentInfo] c inner join \n" +
			  "[dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
			  "where [PaymentModeID]=3 and c.[PaymentCategoryID]=2 \n" +
			  " group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID "+dkTime+" group by a.PolyCode) bang)bangmau on bangmau.PolyCode=bangchinh.InstitutionCodeName \n" +
			  " LEFT JOIN (select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
			  "from \n" +
			  "[dbo].[SPKPaymentInfo] c inner join \n" +
			  "[dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
			  "where ([PaymentModeID]=4 OR [PaymentModeID]=12) and c.[PaymentCategoryID]=2\n" +
			  " group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID "+dkTime+" group by a.PolyCode) bang)bangmau2 on bangmau2.PolyCode=bangchinh.InstitutionCodeName\n" +
			  " LEFT JOIN (select bang.PolyCode,bang.[NETSDebit],bang.count as count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count   from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
			  "from \n" +
			  "[dbo].[SPKPaymentInfo] c inner join \n" +
			  "[dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
			  "where ([PaymentModeID]=13) and c.[PaymentCategoryID]=2\n" +
			  " group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID "+dkTime+" group by a.PolyCode) bang)bangmau3 on bangmau3.PolyCode=bangchinh.InstitutionCodeName\n" +
			  " LEFT JOIN (select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
			  "from \n" +
			  "[dbo].[SPKPaymentInfo] c inner join \n" +
			  "[dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
			  "where c.[PaymentCategoryID]=1\n" +
			  " group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID "+dkTime+" group by a.PolyCode) bang)bangmau4 on bangmau4.PolyCode=bangchinh.InstitutionCodeName\n" +
			  " LEFT JOIN (select bang.PolyCode,bang.[NETSDebit],bang.count from (select a.PolyCode,SUM(b.[NETSDebit]) as 'NETSDebit',count(b.[NETSDebit]) as count  from SPKPaymentMaster a,(select [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID],SUM(c.AmountPaid) as 'NETSDebit' \n" +
			  "from \n" +
			  "[dbo].[SPKPaymentInfo] c inner join \n" +
			  "[dbo].[SPKPaymentMode] d on c.[PaymentCategoryID]=d.[PaymentCategoryID] \n" +
			  "where c.[PaymentCategoryID]=13\n" +
			  " group by [PaymentInfoID],[PaymentModeID],c.[PaymentCategoryID]) as b where a.PaymentInfoID=b.PaymentInfoID group by a.PolyCode) bang)bangmau5 on bangmau5.PolyCode=bangchinh.InstitutionCodeName \n"+dkPolyCode;
      List<SPKreportView> lts=new ArrayList<SPKreportView>();
      lts=entityManager.createNativeQuery(sql,SPKreportView.class).getResultList();
      return lts;
	}

	//Truy vấn cho bảng 3: Transaction Error Report
	@Override
	public Optional<PagingResult> ltsTransactionErrorReport(PagingResult page, int numberPerPage, String startdate, String enddate, String TerminalID, String KioskID,String PolyCode) {
		int offset = 0;
		if (page.getPageNumber() > 0) {
			offset = (page.getPageNumber() - 1) * page.getNumberPerPage();
		}
		int max = numberPerPage*page.getPageNumber()+1;
		String condition = "";
		SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
		if (!StringUtils.isBlank(startdate)) {
			condition = condition + " AND a.RequestTime >= '" + startdate+"'";
		}
		if (!StringUtils.isBlank(enddate)) {
			condition = condition + " AND a.RequestTime <= '" + enddate+"'";
		}
		if(!StringUtils.isBlank(PolyCode)){
			condition=condition+" AND f.PolyCode = '"+PolyCode+"'";
		}
		if(!StringUtils.isBlank(TerminalID)){
			condition=condition+" AND f.NetTerminalId ='"+TerminalID+"'";
		}
		if(!StringUtils.isBlank(KioskID)){
			condition=condition+" AND f.kioskid = '"+KioskID+"'";
		}

		/*String sql="select a.RequestTime as datetime ,b.InstitutionCodeName as PolyCode,b.InstitutionName as polyclinic,c.TerminalName as kioskid,c.TerminalName +'-'+ FORMAT(a.PaymentMasterID,'') as spkrefno,a.PatientMRN ,a.PatientName,\n" +
				"d.Description as PaymentMode,a.NetTerminalId as TerminalID,a.NetTransactionRefNo,d.BillNumber +':'+ FORMAT(d.AmountPaid,'') as billnumberamount,a.EPOSResponseStatus as ErrorCode,e.Logic as ErrorReason\n" +
				"from SPKPaymentMaster a left join  \n" +
				"QsoftInstitution b on a.PolyCode=b.InstitutionCodeName left join \n" +
				"QsoftTerminal c on a.TerminalID=c.TerminalId left join \n" +
				"(select a.*,b.Description from SPKPaymentInfo a,SPKPaymentMode b,SPKCardInfo c where a.PaymentInfoID=c.PaymentInfoID and c.PaymentModeID=b.PaymentModeID) d on d.PaymentInfoID=a.PaymentInfoID left join\n" +
				"RetrieveErrorCodes e on e.Code=a.EPOSResponseStatus";*/
		/*sql += " limit "+offset +" limit "+page.getNumberPerPage();*/


		String sql = "select ROW_NUMBER() OVER (ORDER BY a.RequestTime) as row, a.RequestTime as datetime ,b.InstitutionCodeName as PolyCode,b.InstitutionName as polyclinic,c.TerminalName as kioskid,c.TerminalName +'-'+ FORMAT(a.PaymentMasterID,'') as spkrefno,a.PatientMRN ,a.PatientName,\n" +
				"\td.Description as PaymentMode,a.NetTerminalId as TerminalID,a.NetTransactionRefNo,d.BillNumber +':'+ FORMAT(d.AmountPaid,'') as billnumberamount,a.EPOSResponseStatus as ErrorCode,e.Logic as ErrorReason\n" +
				"\tfrom SPKPaymentMaster a left join  \n" +
				"\tQsoftInstitution b on a.PolyCode=b.InstitutionCodeName left join \n" +
				"\tQsoftTerminal c on a.TerminalID=c.TerminalId left join \n" +
				"\t(select a.*,b.Description from SPKPaymentInfo a,SPKPaymentMode b,SPKCardInfo c where a.PaymentInfoID=c.PaymentInfoID and c.PaymentModeID=b.PaymentModeID) d on d.PaymentInfoID=a.PaymentInfoID left join\n" +
				"\tRetrieveErrorCodes e on e.Code=a.EPOSResponseStatus where 1=1 "+condition;

		Query query = entityManager.createNativeQuery("select count(*) FROM ("+sql+") as count");
		Number singleResult = ((Number)query.getSingleResult());
		BigDecimal count = new BigDecimal(singleResult.toString());
		Integer rowCount = 0;
		rowCount = Integer.parseInt(count.toString());

		if(rowCount>0){
			String sqlGetList = "select * from ("+sql+") temp where temp.row > "+offset+" and temp.row < "+max;
			query = entityManager.createNativeQuery(sqlGetList, TransactionErrorReport.class);
		}
		List<TransactionErrorReport> list = query.getResultList();

		if (list != null) {
			page.setItems(list);
			page.setRowCount(rowCount);

		}
		return Optional.of(page);



	}


}
