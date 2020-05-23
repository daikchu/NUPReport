package com.freelauncer.common;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class SendMailTLS {
    public static boolean sendPassWord(String mailTo, String newPass, String account, String linkLogin) {

        final String username = SystemProperties.getProperty("email.username"); //"ospuchitest@gmail.com";
        final String password = SystemProperties.getProperty("email.password");//"tongcongty";

/*        int port = 587;
        String host = "smtp.gmail.com";

        try {
            Properties props = new Properties();
            // required for gmail
            props.put("mail.smtp.starttls.enable","true");
            props.put("mail.smtp.auth", "true");
            // or use getDefaultInstance instance if desired...
            Session session = Session.getInstance(props, null);
            Transport transport = session.getTransport("smtp");
            transport.connect(host, port, username, password);
            transport.
            transport.close();
            System.out.println("success");
        }
        catch(AuthenticationFailedException e) {
            System.out.println("AuthenticationFailedException - for authentication failures");
            e.printStackTrace();
        }
        catch(MessagingException e) {
            System.out.println("for other failures");
            e.printStackTrace();
        }*/


        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        try {
            /*Address[] addresses = new Address[];*/
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(mailTo));
            message.setSubject(SystemProperties.getProperty("title_mail_release_pass"), "utf-8");
            message.setContent("<h4 style='color:black'>Mật khẩu mới cho tài khoản " + account + " là : <a style='text-decoration:none;' href='#'>" + newPass + "</a></h4>" +
                    "<p>Để bảo vệ thông tin cá nhân hãy đăng nhập và đổi mật khẩu " + "<a style='color:blue;text-decoration:none;' href='" + linkLogin + "'>Tại đây</a>" + " </p><br>" +
                    "<div style='with:100%;text-align:center;'>" +
                    /*"<p style='text-align:center;font-weight:bold'>CÔNG TY CỔ PHẦN CÔNG NGHỆ PHẦN MỀM VÀ NỘI DUNG SỐ OSP</p>" +*/
                    "<p style='text-align:center;'>Liên hệ kỹ thuật:  0906 289 289</p>" +
                    /*"<p style='text-align:center;'>Tel: (024) 3568 2502; (024) 3568 2503; Fax: (024) 3568 2504</p>" +*/
                    "</div>", "text/html; charset=UTF-8");
            //message.setText(newPass);
            //    Transport transport = session.getTransport("smtp");
            /*            transport.sendMessage(message, );*/
            Transport.send(message);
            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean sendNotifyRegistAccount(String mailTo, String account) {

        final String username = SystemProperties.getProperty("email.username"); //"ospuchitest@gmail.com";
        final String password = SystemProperties.getProperty("email.password");//"tongcongty";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        try {
            /*Address[] addresses = new Address[];*/
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(mailTo));
            message.setSubject("Đăng ký tài khoản thành công!", "utf-8");
            message.setContent("<h4 style='color:black'>Đăng ký tài khoản thành công!</h4>" +
                    "<p>Bạn đã đăng ký thành công tài khoản có username là : " + account + ", xin cảm ơn! </p><br>" +
                    "<div style='with:100%;text-align:center;'>" +
                    /*"<p style='text-align:center;font-weight:bold'>CÔNG TY CỔ PHẦN CÔNG NGHỆ PHẦN MỀM VÀ NỘI DUNG SỐ OSP</p>" +*/
                    "<p style='text-align:center;'>Liên hệ kỹ thuật:  0906 289 289</p>" +
                    /*"<p style='text-align:center;'>Tel: (024) 3568 2502; (024) 3568 2503; Fax: (024) 3568 2504</p>" +*/
                    "</div>", "text/html; charset=UTF-8");
            //message.setText(newPass);
            //    Transport transport = session.getTransport("smtp");
            /*            transport.sendMessage(message, );*/
            Transport.send(message);
            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static boolean sendNotifyApprovedAccount(String mailTo, String account, String roleText) {

        final String username = SystemProperties.getProperty("email.username"); //"ospuchitest@gmail.com";
        final String password = SystemProperties.getProperty("email.password");//"tongcongty";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
        try {
            /*Address[] addresses = new Address[];*/
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(mailTo));
            message.setSubject("Kích hoạt tài khoản thành công!", "utf-8");
            message.setContent("<h4 style='color:black'>Tài khoản đã được kích hoạt!</h4>" +
                    "<p>Tài khoản " + account + " đã được ban quản trị phê duyệt thành công, vui lòng truy cập hệ thống để sử dụng, xin cảm ơn! </p><br>" +
                    "<div style='with:100%;text-align:center;'>" +
                    /*"<p style='text-align:center;font-weight:bold'>CÔNG TY CỔ PHẦN CÔNG NGHỆ PHẦN MỀM VÀ NỘI DUNG SỐ OSP</p>" +*/
                    "<p style='text-align:center;'>Liên hệ kỹ thuật:  0906 289 289</p>" +
                    /*"<p style='text-align:center;'>Tel: (024) 3568 2502; (024) 3568 2503; Fax: (024) 3568 2504</p>" +*/
                    "</div>", "text/html; charset=UTF-8");
            //message.setText(newPass);
            //    Transport transport = session.getTransport("smtp");
            /*            transport.sendMessage(message, );*/
            Transport.send(message);
            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }
}
