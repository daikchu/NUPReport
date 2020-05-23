package com.freelauncer.dao.DailyCollectionByKiosks;

import com.freelauncer.common.PagingResult;

public interface DailyCollectionByKioskDAO {
     PagingResult ltsDailyCollectionByKioskReport(PagingResult page, int numberPerPage, String startdate, String enddate, String TerminalID, String KioskID, String PolyCode);
}
