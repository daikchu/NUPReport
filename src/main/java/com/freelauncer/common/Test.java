package com.freelauncer.common;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
//import com.osp.web.dao.mytelLoanQuequeDAO;
import org.springframework.stereotype.Component;

import com.freelauncer.dao.QsoftInstitutionDAO;
import com.freelauncer.model.admin.QsoftInstitution;

//@Component
//public class Test {
//    @Autowired
//    QsoftInstitutionDAO mytelLoanQuequeDAO;
//    @Scheduled(fixedRate = 10000)/*1 giây */
//    public void getAll(){
//        List<QsoftInstitution> lts=new ArrayList<QsoftInstitution>();
//        lts=mytelLoanQuequeDAO.findAll();
//        System.out.println(lts.size());
//
//    }
//}
