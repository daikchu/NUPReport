package com.freelauncer.dao;

import java.util.List;

import com.freelauncer.model.admin.QsoftInstitution;
import com.freelauncer.model.admin.QsoftTerminal;

public interface QsoftInstitutionDAO {
List<QsoftInstitution> findAll();
List<QsoftTerminal> ltsQsoftTerminal();

}
