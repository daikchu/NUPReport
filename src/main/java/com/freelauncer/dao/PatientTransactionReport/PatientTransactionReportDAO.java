package com.freelauncer.dao.PatientTransactionReport;

import com.freelauncer.common.PagingResult;

import java.util.Optional;

public interface PatientTransactionReportDAO {
    public PagingResult ltsPatientTransactionReport(PagingResult page, int numberPerPage, String startdate, String enddate, String TerminalID, String KioskID, String PolyCode);
}
