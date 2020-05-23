package com.freelauncer.web.controller;

import com.freelauncer.dao.QsoftInstitutionDAO;
import com.freelauncer.model.admin.QsoftInstitution;
import com.freelauncer.model.admin.QsoftTerminal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/params")
public class ParamsController {
    @Autowired
    QsoftInstitutionDAO qsoftInstitutionDAO;

    @GetMapping("/getListQsoftTerminalParam")
    public ResponseEntity<List<QsoftTerminal>> getListQsoftTerminal(HttpServletRequest request){
        try{
            List<QsoftTerminal> qsoftTerminalList = qsoftInstitutionDAO.ltsQsoftTerminal();
            return new ResponseEntity<>(qsoftTerminalList, HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<List<QsoftTerminal>>(new ArrayList<>(), HttpStatus.OK);
        }

    }

    @GetMapping("/getListPolyclinicsParam")
    public ResponseEntity<List<QsoftInstitution>> getListPolyclinicsParam(HttpServletRequest request){

        try{

            List<QsoftInstitution> polyclinics = qsoftInstitutionDAO.findAll();
            return new ResponseEntity<>(polyclinics, HttpStatus.OK);
        }catch (Exception e){
            return  new ResponseEntity<List<QsoftInstitution>>(new ArrayList<>(), HttpStatus.OK);
        }

    }

}
