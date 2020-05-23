package com.freelauncer.common;

import org.apache.commons.lang3.StringUtils;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.math.BigInteger;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Utils {

    //Tranfer object to object
    public static Object objTransfer(Object objFrom, Object objTo, Class cls) throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        BeanInfo beanInfo = Introspector.getBeanInfo(cls);
        for (PropertyDescriptor propertyDesc : beanInfo
                .getPropertyDescriptors()) {
            Object value = propertyDesc.getReadMethod().invoke(objFrom);
            if (value == null) {
                propertyDesc.getWriteMethod().invoke(objFrom,
                        propertyDesc.getReadMethod().invoke(objTo));
            }
        }
        objTo = objFrom;
        return objTo;
    }
    public static String DateFormat(String strDate) {
        if (strDate.indexOf("/") != -1) {
            strDate = strDate.split("/")[2] + strDate.split("/")[1] + strDate.split("/")[0];
        }
        return strDate;
    }

    //Check Regular expression
    public static boolean checkRegex(String input, String exp) {
        boolean result = false;
        if (!input.isEmpty()) {
            try {
                Pattern pattern;
                pattern = Pattern.compile(exp);
                Matcher matcher;
                matcher = pattern.matcher(input);
                result = matcher.matches();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } else {
            result = true;
        }
        return result;
    }

    //Convert String to Date
    public static Date str2date(String input, String format) throws ParseException {
        Date result = null;
        if (!input.isEmpty()) {
            try {
                SimpleDateFormat formatter = new SimpleDateFormat(format);
                result = formatter.parse(input);
            } catch (ParseException ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    //Convert Date to String
    public static String date2str(Date input, String oFormat) {
        String result = "";
        if (input != null) {
            try {
                DateFormat df = new SimpleDateFormat(oFormat);
                result = df.format(input);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    //Convert String Date to other format string
    public static String strDate2OtherStr(String date, String sourceFormat, String targerFormat){
        Date dateSource = null;
        String result = "";
        try {
            dateSource = str2date(date, sourceFormat);
            result = date2str(dateSource, targerFormat);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return result;
    }

    //Add Date
    public static Date addDate(Date date, int type, int input) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(type, input);
        date = c.getTime();
        return date;
    }

    //Generate random code by DateTime
    public static String createRandomCode(String prefix) {
        String result = "";
        Date date = new Date();
        String time_code = date2str(date, "yyMM");
        String num_code = randomNumber(4);
        result = prefix + time_code + num_code;
        return result;
    }

    //Generate random number
    public static String randomNumber(int length) {
        String result = "";
        try {
            String pattern = "0123456789";
            for (int i = 0; i < length; i++) {
                Random rand = new Random();
                int pos = rand.nextInt((9 - 0) + 1) + 0;
                result += pattern.charAt(pos);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }

    // Generate random number
    public static String randomCode(int length) {
        String result = "";
        try {
            String pattern = "123456789qwertyupasdfghjkzxcvbnm";
            for (int i = 0; i < length; i++) {
                Random rand = new Random();
                int pos = rand.nextInt((31 - 0) + 1) + 0;
                result += pattern.charAt(pos);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }

    //Convert to UTF-8
    public static String toUtf8(String input) {
        String result = "";
        try {
            byte ptext[] = input.getBytes("ISO-8859-1");
            result = new String(ptext, "UTF-8");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }

    public static String md5(String input) throws NoSuchAlgorithmException {
        String result = "";
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(input.getBytes());
        byte byteData[] = md.digest();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
            sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
            String hex = Integer.toHexString(0xff & byteData[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        result = hexString.toString();
        return result;
    }

    public static String Encrypt(String key, String data) throws Exception {
        Cipher cipher = Cipher.getInstance("TripleDES");
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        md5.update(key.getBytes(), 0, key.length());
        String keymd5 = new BigInteger(1, md5.digest()).toString(16).substring(
                0, 24);
        SecretKeySpec keyspec = new SecretKeySpec(keymd5.getBytes(),
                "TripleDES");
        cipher.init(Cipher.ENCRYPT_MODE, keyspec);
        byte[] stringBytes = data.getBytes();
        byte[] raw = cipher.doFinal(stringBytes);
        BASE64Encoder encoder = new BASE64Encoder();
        String base64 = encoder.encode(raw);
        return base64;
    }

    public static String Decrypt(String key, String data) throws Exception {
        Cipher cipher = Cipher.getInstance("TripleDES");
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        md5.update(key.getBytes(), 0, key.length());
        String keymd5 = new BigInteger(1, md5.digest()).toString(16).substring(
                0, 24);
        SecretKeySpec keyspec = new SecretKeySpec(keymd5.getBytes(),
                "TripleDES");
        cipher.init(Cipher.DECRYPT_MODE, keyspec);
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] raw = decoder.decodeBuffer(data);
        byte[] stringBytes = cipher.doFinal(raw);
        String result = new String(stringBytes);
        return result;
    }

    public static String getIpClient(HttpServletRequest request) {
        String remoteAddr = "";
        if (request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }
        return remoteAddr;
    }

/*    public static String getIpClient(HttpServletRequest request){
        String remoteAddr = "";
        if (request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }
        return remoteAddr;
    }*/
    public static String trim(String str){
        if(StringUtils.isNotBlank(str)){
            str.trim();
        }
        return str;
    }

    public static void trimAllFieldOfObject(Object item) {
        if (item == null) {
            return;
        }
        Field[] fields = item.getClass().getDeclaredFields();
        if (fields == null) {
            return;
        }

        for (Field f : fields) {
            if (f.getType().isPrimitive()) {
                continue;
            }
            if (f.getType().equals(String.class)) {
                try {
                    f.setAccessible(true);
                    String value = (String) f.get(item);
                    f.set(item, StringUtils.trimToNull(value));
                } catch (IllegalAccessException e) {
                }

            }
        }
    }

    public static String getDomainName(String url) {
        URI uri;
        String domain = "";
        try {
            uri = new URI(url);
            domain = uri.getPort() > 0 ? uri.getHost() + ":" + uri.getPort() : uri.getHost();
            domain = domain.startsWith("www.") ? domain.substring(4) : domain;
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return domain;
    }

    public static String getRequestURL(HttpServletRequest request) {
        return request.getRequestURL().toString();
    }

    public static int getOffset(int pageNumber, int numberPerPage){
        int offset=0;
        if(pageNumber>0) offset=(pageNumber-1)*numberPerPage;
        return offset;
    }

    public static boolean validateEmail(String email){
        return email.matches(Constant.REGEX_EMAIL);
    }

    public static boolean validatePhoneNumber(String phone){
        return phone.matches(Constant.REGEX_PHONE_NUMBER);
    }

    public static boolean isValidFormatDate(String format, String value) {
        LocalDateTime ldt = null;
        DateTimeFormatter fomatter = DateTimeFormatter.ofPattern(format, Locale.ENGLISH);

        try {
            ldt = LocalDateTime.parse(value, fomatter);
            String result = ldt.format(fomatter);
            return result.equals(value);
        } catch (DateTimeParseException e) {
            try {
                LocalDate ld = LocalDate.parse(value, fomatter);
                String result = ld.format(fomatter);
                return result.equals(value);
            } catch (DateTimeParseException exp) {
                try {
                    LocalTime lt = LocalTime.parse(value, fomatter);
                    String result = lt.format(fomatter);
                    return result.equals(value);
                } catch (DateTimeParseException e2) {
                    // Debugging purposes
                    //e2.printStackTrace();
                }
            }
        }

        return false;
    }

    public static boolean isValidUsername(String username){
        return username.matches(Constant.OK_SPECICAL);
    }

    /*
     * Ham so sanh date1 co truoc date2 hay ko
     * Co : true
     * Khong : false
     * example: 2017/4/12 <= 2017/4/13 ? true: false
     * */
    public  static Boolean compareDate(String date1, String date2){
        try {
            if (date1 == null || date1.equals("")) return false;
            if (date2 == null || date2.equals("")) return false;

            String temp1= RelateDateTime.formatDate(date1, "dd/MM/yyyy", "yyyy/MM/dd");
            String temp2= RelateDateTime.formatDate(date2, "dd/MM/yyyy", "yyyy/MM/dd");

            String[] arr1 = temp1.split("/");
            String[] arr2 = temp2.split("/");

            int ngay1 = Integer.parseInt(arr1[2]);
            int thang1 = Integer.parseInt(arr1[1]);
            int nam1 = Integer.parseInt(arr1[0]);

            int ngay2 = Integer.parseInt(arr2[2]);
            int thang2 = Integer.parseInt(arr2[1]);
            int nam2 = Integer.parseInt(arr2[0]);

            if(nam1 < nam2) return true;
            if(nam1== nam2){
                if(thang1 < thang2) return true;
                if(thang1 == thang2) {
                    if(ngay1 <= ngay2) {
                        return true;
                    }
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /*
     * Ham so sanh date co truoc today hay ko
     * Co : true
     * Khong : false
     * example: 2017/4/12 <= today ? true: false
     * */
    public  static Boolean compareToday(String date){
        try {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date recent = new Date();
            String today = dateFormat.format(recent);

            return compareDate(date, today);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /*
     * Ham tao ma nguoi dung
     * format: tien to + year + number
     * example: ND2019000001, ND191210112001
     * */
/*    public  static String create(String date){

        try {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            Date recent = new Date();
            String today = dateFormat.format(recent);

            return compareDate(date, today);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }*/

}
