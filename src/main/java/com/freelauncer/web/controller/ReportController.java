package com.freelauncer.web.controller;
import com.freelauncer.common.PagingResult;
import com.freelauncer.common.SystemProperties;
import com.freelauncer.dao.DailyCollectionByKiosks.DailyCollectionByKioskDAO;
import com.freelauncer.dao.PatientTransactionReport.PatientTransactionReportDAO;
import com.freelauncer.dao.QsoftInstitutionDAO;
import com.freelauncer.dao.SPKPaymentMasterDAO;
import com.freelauncer.model.admin.QsoftInstitution;
import com.freelauncer.model.admin.QsoftTerminal;
import com.freelauncer.model.admin.SPKPaymentMaster;
import com.freelauncer.model.admin.view.SPKreportView;
import net.sf.jett.transform.ExcelTransformer;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/report")
public class ReportController {
    @Autowired
    QsoftInstitutionDAO qsoftInstitutionDAO;
    @Autowired
    SPKPaymentMasterDAO spkPaymentMasterDAO;
    @Autowired
    PatientTransactionReportDAO patientTransactionReportDAO;
    @Autowired
    DailyCollectionByKioskDAO dailyCollectionByKioskDAO;

    /*for DailyCollectionByPolyclinic Report*/
    @GetMapping("/DailyCollectionByPolyclinic")
    public String DailyCollectionByPolyclinic(Model model) {
        return "report.DailyCollectionByPolyclinic";
    }

    @GetMapping("/getDataDailyCollectionByPolyclinic")
    public ResponseEntity<List<SPKreportView>> getDataDailyCollectionByPolyclinic(HttpServletRequest request,
                                                       @RequestParam(value = "polyclinic", required = false, defaultValue = "") String polyclinic,
                                                       @RequestParam(value = "dateFrom", required = false, defaultValue = "") String dateFrom,
                                                       @RequestParam(value = "dateTo", required = false, defaultValue = "") String dateTo){

        try{

            /*SimpleDateFormat sdfStart = new SimpleDateFormat("yyyy-MM-dd 00:00:00", Locale.US);
            SimpleDateFormat sdfEnd = new SimpleDateFormat("yyyy-MM-dd 23:59:59", Locale.US);*/
            List<SPKreportView> listResult = spkPaymentMasterDAO.findAll(polyclinic, dateFrom, dateTo);
            //   page = detectNewsService.page(page, query);
            return new ResponseEntity<>(listResult, HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<List<SPKreportView>>(new ArrayList<>(), HttpStatus.OK);
        }

    }

    @GetMapping("/export-DailyCollectionByPolyclinic")
    public void export(@RequestParam(value = "polyclinic", required = false, defaultValue = "") String polyclinic,
                       @RequestParam(value = "dateFrom", required = false, defaultValue = "") String dateFrom,
                       @RequestParam(value = "dateTo", required = false, defaultValue = "") String dateTo,
                       @RequestParam(value = "polyclinicName", required = false, defaultValue = "") String polyclinicName,
                       HttpServletRequest request, HttpServletResponse response) {

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US);
            List<SPKreportView> listResult = spkPaymentMasterDAO.findAll(polyclinic, dateFrom, dateTo);
            Map<String, Object> beans = new HashMap<String, Object>();
            Integer total = 0;
            total = listResult.size();

            beans.put("items", listResult);
            beans.put("total", total);
            beans.put("polyclinicName", polyclinicName);
            beans.put("dateFrom", dateFrom);
            beans.put("dateTo", dateTo);
           /* beans.put("day", Utils.date2str(new java.util.Date(), "dd"));
            beans.put("month", Utils.date2str(new java.util.Date(), "MM"));
            beans.put("year", Utils.date2str(new java.util.Date(), "yyyy"));*/

            String realPathOfFolder = request.getServletContext().getRealPath(SystemProperties.getProperty("template_path"));
            InputStream fileIn = new BufferedInputStream(new FileInputStream(realPathOfFolder + "daily-collection-by-polyclinic.xls"));

            ExcelTransformer transformer = new ExcelTransformer();
            Workbook workbook = transformer.transform(fileIn, beans);

            response.setContentType("application/vnd.ms-excel");
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
            String dateDownload = dateFormat.format(new Date());
            response.setHeader("Content-Disposition", "attachment; filename=" + dateDownload + "-daily-collection-by-polyclinic.xls");
            ServletOutputStream out = response.getOutputStream();
            workbook.write(out);
            out.flush();
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /*END for DailyCollectionByPolyclinic Report*/


    @GetMapping("/DailyCollectionByKiosks")
    public String DailyCollectionByKiosks(Model model) {
        return "report.DailyCollectionByKiosks";
    }

    @GetMapping("/getPageDailyCollectionByKiosksReport")
    public ResponseEntity<PagingResult> getPageDailyCollectionByKiosksReport(HttpServletRequest request, @RequestParam(value = "p", required = false, defaultValue = "1") int pageNumber,
                                                                            @RequestParam(value = "numPerPage", required = false, defaultValue = "25") int numPerPage,
                                                                            @RequestParam(value = "dataFrom", required = false, defaultValue = "") String dateFrom,
                                                                            @RequestParam(value = "dateTo", required = false, defaultValue = "") String dateTo,
                                                                            @RequestParam(value = "polyclinic", required = false, defaultValue = "") String polyclinic,
                                                                            @RequestParam(value = "kioskId", required = false, defaultValue = "") String kioskId,
                                                                            @RequestParam(value = "terminalId", required = false, defaultValue = "") String terminalId){

        try{
            PagingResult page=new PagingResult();
            page.setPageNumber(pageNumber);
            page.setNumberPerPage(numPerPage);
            String query="";
            SimpleDateFormat sdfStart = new SimpleDateFormat("yyyy-MM-dd 00:00:00", Locale.US);
            SimpleDateFormat sdfEnd = new SimpleDateFormat("yyyy-MM-dd 23:59:59", Locale.US);


            page =dailyCollectionByKioskDAO.ltsDailyCollectionByKioskReport(page, numPerPage, dateFrom, dateTo, terminalId, kioskId, polyclinic);
            //   page = detectNewsService.page(page, query);
            return new ResponseEntity<>(page, HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(new PagingResult(), HttpStatus.OK);
        }

    }

    /*Transaction Error Report*/
    @GetMapping("/TransactionErrorReport")
    public String TransactionErrorReport(Model model) {
        return "report.TransactionErrorReport";
    }

    @GetMapping("/getPageDataTransactionErrorReport")
    public ResponseEntity<PagingResult> getPageDataTransactionErrorReport(HttpServletRequest request, @RequestParam(value = "p", required = false, defaultValue = "1") int pageNumber,
                                             @RequestParam(value = "numPerPage", required = false, defaultValue = "25") int numPerPage,
                                             @RequestParam(value = "dateFrom", required = false, defaultValue = "") String dateFrom,
                                             @RequestParam(value = "dateTo", required = false, defaultValue = "") String dateTo,
                                             @RequestParam(value = "polyclinic", required = false, defaultValue = "") String polyclinic,
                                             @RequestParam(value = "kioskId", required = false, defaultValue = "") String kioskId,
                                             @RequestParam(value = "terminalId", required = false, defaultValue = "") String terminalId){

        try{
            PagingResult page=new PagingResult();
            page.setPageNumber(pageNumber);
            page.setNumberPerPage(numPerPage);
            String query="";

            page =spkPaymentMasterDAO.ltsTransactionErrorReport(page, numPerPage, dateFrom, dateTo, terminalId, kioskId, polyclinic).orElse(new PagingResult());
            //   page = detectNewsService.page(page, query);
            return new ResponseEntity<>(page, HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(new PagingResult(), HttpStatus.OK);
        }

    }
    /*END Transaction Error Report*/


    /*Patient Transaction Report*/
    @GetMapping("/PatientTransactionReport")
    public String PatientTransactionReport(Model model) {
        return "report.PatientTransactionReport";
    }

    @GetMapping("/getPageDataPatientTransactionReport")
    public ResponseEntity<PagingResult> getPageDataPatientTransactionReport(HttpServletRequest request, @RequestParam(value = "p", required = false, defaultValue = "1") int pageNumber,
                                             @RequestParam(value = "numPerPage", required = false, defaultValue = "25") int numPerPage,
                                             @RequestParam(value = "dateFrom", required = false, defaultValue = "") String dateFrom,
                                             @RequestParam(value = "dateTo", required = false, defaultValue = "") String dateTo,
                                             @RequestParam(value = "polyclinic", required = false, defaultValue = "") String polyclinic,
                                             @RequestParam(value = "kioskId", required = false, defaultValue = "") String kioskId,
                                             @RequestParam(value = "terminalId", required = false, defaultValue = "") String terminalId){

        try{
            PagingResult page=new PagingResult();
            page.setPageNumber(pageNumber);
            page.setNumberPerPage(numPerPage);
            String query="";

            page =patientTransactionReportDAO.ltsPatientTransactionReport(page, numPerPage, dateFrom, dateTo, terminalId, kioskId, polyclinic);
            //   page = detectNewsService.page(page, query);
            return new ResponseEntity<>(page, HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<>(new PagingResult(), HttpStatus.OK);
        }

    }
    /*END Patient Transaction Report*/


    @GetMapping("/SPKAuditTrail")
    public String SPKAuditTrail(Model model) {
        return "report.SPKAuditTrail";
    }

    @GetMapping("/SPKCash")
    public String SPKCash(Model model) {
        return "report.SPKCash";
    }

    @GetMapping("/CashEventSummary")
    public String CashEventSummary(Model model) {
        return "report.CashEventSummary";
    }

    @GetMapping("/CashCompartment")
    public String CashCompartment(Model model) {
        return "report.CashCompartment";
    }

}

