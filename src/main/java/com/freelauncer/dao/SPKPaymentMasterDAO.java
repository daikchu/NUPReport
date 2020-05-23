package com.freelauncer.dao;

import com.freelauncer.common.PagingResult;
import com.freelauncer.model.admin.QsoftInstitution;
import com.freelauncer.model.admin.SPKPaymentMaster;
import com.freelauncer.model.admin.view.SPKreportView;

import java.util.List;
import java.util.Optional;

public interface SPKPaymentMasterDAO {
List<SPKreportView> findAll(String code, String startdate, String endDate);
    public Optional<PagingResult> ltsTransactionErrorReport(PagingResult page, int numberPerPage, String startdate, String enddate,String TerminalID,String KioskID,String PolyCode);


}
