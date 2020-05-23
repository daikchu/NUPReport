package com.freelauncer.common;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collection;

public class ConstantAuthor {

    public class User{ //nguoi dung admin
    	public static final String view="ROLE_SYSTEM_USER_VIEW";
    	public static final String add="ROLE_SYSTEM_USER_ADD";
    	public static final String edit="ROLE_SYSTEM_USER_EDIT";
    	public static final String author="ROLE_SYSTEM_USER_AUTHORITY";
    	public static final String delete="ROLE_SYSTEM_USER_DELETE";
    }
    public class Group{ // nhom quyen
    	public static final String view="ROLE_SYSTEM_GROUP_VIEW";
    	public static final String add="ROLE_SYSTEM_GROUP_ADD";
    	public static final String edit="ROLE_SYSTEM_GROUP_EDIT";
    	public static final String delete="ROLE_SYSTEM_GROUP_DELETE";
    }
    public class Log{//log
    	public static final String view="ROLE_SYSTEM_LOG_VIEW";
	}


	public class Category{//Danh muc bai viet
    	public static final String view="ROLE_CONTENT_CATEGORY_VIEW";
    	public static final String add="ROLE_CONTENT_CATEGORY_ADD";
    	public static final String edit="ROLE_CONTENT_CATEGORY_EDIT";
    	public static final String delete="ROLE_CONTENT_CATEGORY_DELETE";
	}


	//DAICQ
	public class Prevent{//thong tin ngan chan
		public static final String view="ROLE_PREVENT_VIEW";
		public static final String add="ROLE_PREVENT_ADD";
		public static final String edit="ROLE_PREVENT_EDIT";
		public static final String delete="ROLE_PREVENT_DELETE";

	}



	public class PostForm{//Danh muc hinh thuc bai viet
		public static final String view="ROLE_POST_FORM_VIEW";
		public static final String add="ROLE_POST_FORM_ADD";
		public static final String edit="ROLE_POST_FORM_EDIT";
		public static final String delete="ROLE_POST_FORM_DELETE";

	}

	public class DetectedForm{//Danh muc hinh thuc phat hien
		public static final String view="ROLE_DETECTED_FORM_VIEW";
		public static final String add="ROLE_DETECTED_FORM_ADD";
		public static final String edit="ROLE_DETECTED_FORM_EDIT";
		public static final String delete="ROLE_DETECTED_FORM_DELETE";

	}

	public class Unit{//Quản lý đơn vị
		public static final String view="ROLE_UNIT_VIEW";
		public static final String add="ROLE_UNIT_ADD";
		public static final String edit="ROLE_UNIT_EDIT";
		public static final String delete="ROLE_UNIT_DELETE";

	}

	public class Rank{//Quản lý danh mục cấp bậc cộng tác viên
		public static final String view="ROLE_RANK_VIEW";
		public static final String add="ROLE_RANK_ADD";
		public static final String edit="ROLE_RANK_EDIT";
		public static final String delete="ROLE_RANK_DELETE";

	}

	public class Report{//Bao cao thong ke
		public static final String statistic_task="ROLE_STATISTIC_TASK_VIEW";
		public static final String statistic_detected="ROLE_STATISTIC_DETECTED_VIEW";
	}

	public class Social{//Quan ly tai khoan mang xa hoi
		public static final String social_report="ROLE_SOCIAL_REPORT";
		public static final String social_informational_topics="ROLE_SOCIAL_INFORMATIONAL_TOPICS";
	}

	public class CollaboratorsManager{ //Quan ly cong tac vien
		public static final String view="ROLE_COLLABORATORS_VIEW";
		public static final String add="ROLE_COLLABORATORS_ADD";
		public static final String edit="ROLE_COLLABORATORS_EDIT";
		public static final String delete="ROLE_COLLABORATORS_DELETE";
		public static final String personal="ROLE_COLLABORATORS_PERSONAL_COL";
		public static final String manageById="ROLE_COLLABORATORS_MANAGE_BY_ID";
	}

	public static boolean contain(String right){
    	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Collection<? extends GrantedAuthority> checkRight =  auth.getAuthorities();
		boolean authorized = checkRight.contains(new SimpleGrantedAuthority(right));
		if(!authorized){
			return false;
		}
    	return true;
    }
}
