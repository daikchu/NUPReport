/**
 *
 */
package com.freelauncer.common;

import java.text.SimpleDateFormat;

/**
 * @author SONY
 *
 */
public class Constant {

    public static SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

    //Danh sách biểu thức bất quy tắc
    public static final String REGEX_NUMBER = "^[0-9]*$";
    public static final String REGEX_NUMBER_ALIAS = "^[0-9\\.]*$";
    public static final String REGEX_SEARCH_NUMBER = "^[0-9*]*$";
    public static final String REGEX_TEXT_NUMBER = "^[a-zA-Z0-9]+$";
    public static final String REGEX_DATE = "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$";
    public static final String REGEX_EMAIL = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    public static final String REGEX_PASSWORD = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,30}";
    public static final String REGEX_PHONE_NUMBER = /*"^[a-zA-Z0-9]+$)(?=\\S+$).{10,15}" */"\\d{10,15}";
    /*Bieu thuc chinh quy cho truong chi chua cac chữ cái, số, dấu gạch dưới và dấu gạch ngang.*/
    public static final String OK_SPECICAL = "[\\w-]*";
    //định nghĩa tiền tố cho mã người dùng sử dụng hệ thống.
    public static final String CODE_USER = "ND";//ND2019000001
    public static final String TOKEN_PREFIX = "BEARER";//ND2019000001
    public static final String CODE_TASK = "LT";//ND-2019000001
    public static final String CODE_DETECT_NEWS = "PH";//PH-2019000001
    public static final String CODE_UNIT = "DV";//DV-2019000001
    public static final String CODE_SUB_UNIT = "NH";//NH-2019000001
    public static final String CODE_CTV = "CTV";//CTV-2019000001

    public interface ERROR_CODE {
        String SUCCESS = "SUCCESS";
        String ERROR = "ERROR";
        String WARRNNING = "WARRNNING";
        String NOT_EXITS = "NOT_EXITS";
        String NOT_FOUND = "404";
    }

    public interface MESSAGE_CODE {
        String SUCCESS = MessagesProperty.getProperty("api.success");
        String FAIL = MessagesProperty.getProperty("api.fail");
        String SEARCH_SUCCESS = MessagesProperty.getProperty("api.success.search");
        String ERROR = MessagesProperty.getProperty("api.error");
    }

    //note trạng thái kiểm duyệt bài đăng: status_browse
    public static final int NOT_YET_SUMMT = 0;
    public static final int BROWSING = 1;
    public static final int APPROVED = 2;
    public static final int RETURNED = 3;

    //note trạng thái cho phép gửi thông báo hay k
    public static final int NOTIFY_NO = 0;//có
    public static final int NOTIFY_YES = 1;//không

    //note trạng thái gửi email
    public static final int SEND_MAIL_NOT = 0;//chưa gửi
    public static final int SEND_MAIL_SUCCESS = 1;//đã gửi thành công
    public static final int SEND_MAIL_FAIL = 2;//đã gửi thất bại


    /** Common String */
    public static final String DOT3 = "...";
    public static final String ENTER = "\n";
    public static final String SPACE = " ";
    public static final String COLON = ":";
    public static final String MASK = "\"";
    public static final String PLUS = "\\+";
    public static final String MINUS = "\\-";
    public static final String SEMI_COLON = ";";
    public static final String UNIT_SEPARATOR = "_";
    public static final String PERCENT = "%";
    public static final String VERTICAL_LINE = "|";
    public static final String SHARP = "#";
    public static final String BULLET = "-";


    public static final String SESSION_ACTION = "action";
    //phân trang
    public static final Integer ROW_PER_PAGE = 25;

    //SET TRẠNG THÁI ĐÃ XÓA TRUE/FALSE
    public static final int DA_XOA_TRUE = 1;
    public static final int DA_XOA_FALSE = 0;

    //config số điểm cộng cho 1 phát hiện báo tin được cấp trên chấp nhận
    public static final float DIEM_PHBT = 10;


    //SET TRẠNG THÁI CỦA LỆNH TIN
    public interface TASKS {
        int TASK_TIME_FOR_NEAR_DEADLINE = -2;
    }

    //SET TRẠNG THÁI LOGIN
    public interface LOGIN_STATUS {
        int ACCOUNT_DISABLE = 1;//tài khoản bị khóa
        int INVALID_CREDENTIALS = 2;//xác thực không thành công do tên đăng nhập hoặc mật khẩu sai
        int LOGIN_SUCCESS = 3;//đăng nhập thành công
        int LOGOUT_SUCCESS = 4;//đăng xuất thành công
    }

    //SET TRẠNG THÁI USER
    public interface USER_STATUS {
        int IS_COLLABORATOR_YES = 1;//người dùng là tài khoản cộng tác viên
        int IS_COLLABORATOR_NO = 0;//người dùng không là tài khoản cộng tác viên
        int IS_BLOCKED = 0;
        int IS_ACTIVE = 1;
        int IS_APPROVING = 2;
    }

    //SET TRẠNG THÁI PASSWORD
    public interface PASSWORD {
        int MIN_LENGTH_PASS = 6;
        int MAX_LENGTH_PASS = 30;
    }

    //Config loại object file
    public interface FILE_OBJECT_TYPE {
        String TASK = "TASK";
        String DETECT = "DETECT";
        String USER = "USER";
    }

    //config mã chức vụ
    public interface CODE_CHUC_VU {
        String QTV = "QTV";//dành cho người dùng là quản trị viên hệ thống
        String TT_TTBC = "TT/TTBC";//dành cho người dùng thuộc nhóm thường trực/nhóm TTBC
        String DON_VI = "DON_VI";//dành cho người dùng là trưởng/phó đơn vị
        String NHOM = "NHOM";//dành cho người dùng là trưởng/phó nhóm
        String CTV = "CTV";//dành cho người dùng là cộng tác viên
        String DANG_KY_MOI = "DANG_KY_MOI";//Dành cho tài khoản mới được đăng ký cần phê duyệt
    }

    //config value trạng thái xử lý phát hiện
    public interface CODE_STATUS_XLPH {
        String DA_GUI = "sent";
        String CHO_XU_LY = "pending";
        String DONG_Y = "approved";
        String TU_CHOI = "reject";
        int THANH_LENH_TIN_YES = 1;
        int THANH_LENH_TIN_NO = 0;
        int LUU_TAM_YES = 1;
        int LUU_TAM_NO = 0;
    }

    //config cấp xử lý phát hiện báo tin
    public interface CODE_XLPH_CAP_XU_LY {
        int CTV = 1;
        int NHOM = 2;
        int DON_VI = 3;
        int TT_TTBC = 4;
    }

    //config values báo cáo lệnh tin
    public interface CODE_TASK_BAO_CAO {
        int THUC_HIEN_CO = 1;
        int THUC_HIEN_KHONG = 0;
        int DANH_GIA_KET_QUA_HOAN_THANH = 1;
        int DANH_GIA_KET_QUA_KHONG_HOAN_THANH = 0;
        int DA_BAO_CAO = 1;
        int CHUA_BAO_CAO = 0;
    }

    //config trạng thái lệnh tin
    public interface CODE_TASK_TRANG_THAI {
        int DA_TAO = 1;
        int DA_GIAO = 2;
        int DANG_THUC_HIEN = 3;
        int GAN_DEN_HAN = 4;
        int QUA_HAN = 5;
        int HOAN_THANH = 6;
    }

    //config cấp quản lý lệnh tin
    public interface CODE_TASK_CAP_QUAN_LY {
        int QTV = 0;
        int CTV = 1;
        int NHOM = 2;
        int DON_VI = 3;
        int TT_TTBC = 4;
    }


    //config trạng thái thông báo
    public interface NOTIFY_STATUS {
        int CHƯA_XEM = 0;
        int DA_XEM = 1;
        int NHAN_THONG_BAO_YES = 1;
        int NHAN_THONG_BAO_NO = 0;
    }

    //config loại thông báo bắn về app
    public interface NOTIFY_TYPE_MESSAGE {
        String LENH_TIN = "TASK";
        String PHAT_HIEN_BAO_TIN = "DETECT";//
        String CAP_BAC_CTV = "RANK";//
        String THONG_BAO_YEU_CAU_XU_LY_PHBT_MOI = "DETECT_REQUEST";//bạn có 1 yêu cầu xử lý phát hiện báo tin mới
        String THONG_BAO_KQ_PHE_DUYET_PHBT = "DETECT_PROCESSED";//cấp 2 đã từ chối/đồng ý phát hiện báo tin có mã PH...
        String THONG_BAO_LENH_TIN_MOI_DUOC_GIAO = "TASK_ASSIGN";//bạn có 1 lệnh tin được giao
        String THONG_BAO_CAP_DUOI_BAO_CAO_KQ_XU_LY_LT = "TASK_REPORT";//thông báo báo cáo kết quả xử lý lệnh tin
        String THONG_BAO_THAY_DOI_NOI_DUNG_LENH_TIN = "TASK_CHANGE";//lệnh tin ABC đã được thay đổi
        String THONG_BAO_TRANG_THAI_DEN_HAN_LENH_TIN = "TASK_STATUS";//gần đến hạn kết thúc
        String THONG_BAO_THANG_HANG_CTV = "CHANGE_RANK";//thăng hạng cho cộng tác viên
    }

    //config tiêu đề thông báo trên app
    public interface NOTIFY_MESSAGE {
        String THONG_BAO_YEU_CAU_XU_LY_PHBT_MOI = "Bạn có yêu cầu xử lý phát hiện báo tin mới! Mã phát hiện: ";//bạn có 1 yêu cầu xử lý phát hiện báo tin mới
        String THONG_BAO_KQ_PHE_DUYET_PHBT_TU_CHOI = "Phát hiện báo tin bị từ chối! Mã phát hiện: ";//cấp 2 đã từ chối/đồng ý phát hiện báo tin có mã PH...
        String THONG_BAO_KQ_PHE_DUYET_PHBT_DONG_Y = "Phát hiện báo tin đã được châp nhận! Mã phát hiện: ";//cấp 2 đã từ chối/đồng ý phát hiện báo tin có mã PH...
        String THONG_BAO_LENH_TIN_MOI_DUOC_GIAO = "Bạn có lệnh tin mới! Mã lệnh tin: ";//bạn có 1 lệnh tin được giao
        String THONG_BAO_CAP_DUOI_BAO_CAO_KQ_XU_LY_LT_HAU_TO = " đã báo cáo kết quả xử lý lệnh tin, mã lệnh tin: ";//thông báo báo cáo kết quả xử lý lệnh tin
        String THONG_BAO_THAY_DOI_NOI_DUNG_LENH_TIN = "Thay đổi nội dung lệnh tin, mã lệnh tin: ";//lệnh tin ABC đã được thay đổi
        String THONG_BAO_TRANG_THAI_GAN_DEN_HAN_LENH_TIN = "Cảnh báo lệnh tin gần đến hạn kết thúc, mã lệnh tin: ";//gần đến hạn kết thúc
        String THONG_BAO_TRANG_THAI_HET_HAN_LENH_TIN = "Cảnh báo lệnh tin đã hết hạn kết thúc, mã lệnh tin: ";//gần đến hạn kết thúc
        String THONG_BAO_THANG_HANG_CTV = "Thăng hạng cộng tác viên mã ";
    }

    //config message api
    public interface MSG_API {
        String PHBT_LUU_TAM_THANH_CONG = "Lưu tạm phát hiện báo tin thành công!";
        String PHBT_LUU_TAM_THAT_BAI = "Lưu tạm phát hiện báo tin thất bại!";
        String PHBT_CAP_NHAT_LUU_TAM_SUCCESS = "Cập nhật lưu tạm thành công!";
        String PHBT_CAP_NHAT_LUU_TAM_FAIL = "Cập nhật lưu tạm thất bại!";
        String PHBT_GUI_THANH_CONG = "Gửi phát hiện báo tin thành công!";
        String PHBT_GUI_THAT_BAI = "Gửi phát hiện báo tin thất bại!";
    }

    public interface TYPE_CONFIG_VALUE {
        String PARAM_MXH_BAO_CHI_NGUON_BAO = "PARAM_MXH_BAO_CHI_NGUON_BAO";
        String PARAM_MXH_BAO_CHI_CHUYEN_MUC = "PARAM_MXH_BAO_CHI_CHUYEN_MUC";
        String PARAM_MXH_BAO_CHI_TIM_KIEM_THEO = "PARAM_MXH_BAO_CHI_TIM_KIEM_THEO";
        Long ID_VALUE_DON_VI_MAC_DINH_CTV_DANG_KY_TREN_MOBILE = 1L;
        Long ID_VALUE_NHOM_MAC_DINH_CTV_DANG_KY_TREN_MOBILE = 2L;
        Long ID_VALUE_CAP_BAC_MAC_DINH_CTV_DANG_KY_TREN_MOBILE = 1L;
    }



}
