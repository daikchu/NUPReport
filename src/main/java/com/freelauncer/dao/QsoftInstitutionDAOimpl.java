package com.freelauncer.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.freelauncer.model.admin.QsoftTerminal;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.freelauncer.model.admin.QsoftInstitution;
@Repository
@Transactional(value = "transactionManager")
public class QsoftInstitutionDAOimpl implements QsoftInstitutionDAO{
	  @PersistenceContext(unitName = "appAdmin")
	    @Qualifier(value = "transactionManager")
	    private EntityManager entityManager;
	@Override
	public List<QsoftInstitution> findAll() {
		// TODO Auto-generated method stub
      String sql="SELECT a.* FROM dbo.QsoftInstitution a";
      List<QsoftInstitution> lts=new ArrayList<QsoftInstitution>();
      lts=entityManager.createNativeQuery(sql,QsoftInstitution.class).getResultList();
      return lts;
	}

	@Override
	public List<QsoftTerminal> ltsQsoftTerminal() {
		String sql="SELECT a.* FROM dbo.QsoftTerminal a";
		List<QsoftTerminal> lts=new ArrayList<QsoftTerminal>();
		lts=entityManager.createNativeQuery(sql,QsoftTerminal.class).getResultList();
		return lts;
	}


}
