package com.freelauncer.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * Created by Admin on 6/1/2018.
 */
public class SendMailUtil {
    private static final Logger logger = LoggerFactory.getLogger(SendMailUtil.class);

    public static Boolean sendGmail(Session session, String from, String to, String subject, String body) throws MessagingException {
        Boolean result = false;
        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(to));
            message.addHeader("Content-type", "text/HTML; charset=UTF-8");
            message.addHeader("format", "flowed");
            message.addHeader("Content-Transfer-Encoding", "8bit");
            message.setContent(body, "text/html; charset=UTF-8");
            message.setSubject(subject, "UTF-8");
            Transport.send(message);
            return true;
        } catch (Exception e) {
            logger.error("Loi tai ham gui email: " + e.getMessage());
            e.printStackTrace();
            return false;
        }

    }

    public static Boolean sendGmail(Session session, String from, String[] to, String[] bcc, String subject, String body) throws MessagingException {
        try {


            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            InternetAddress[] toAddress = new InternetAddress[to.length];

            // To get the array of addresses
            for (int i = 0; i < to.length; i++) {
                toAddress[i] = new InternetAddress(to[i]);
            }

            for (int i = 0; i < toAddress.length; i++) {
                message.addRecipient(Message.RecipientType.TO, toAddress[i]);
            }


            InternetAddress[] bccAddress = new InternetAddress[bcc.length];

            // To get the array of bccaddresses
            for (int i = 0; i < bcc.length; i++) {
                bccAddress[i] = new InternetAddress(bcc[i]);
            }

            // Set bcc: header field of the header.
            for (int i = 0; i < bccAddress.length; i++) {
                message.addRecipient(Message.RecipientType.BCC, bccAddress[i]);
            }

            message.addHeader("Content-type", "text/HTML; charset=UTF-8");
            message.addHeader("format", "flowed");
            message.addHeader("Content-Transfer-Encoding", "8bit");
            message.setContent(body, "text/html; charset=UTF-8");
            message.setSubject(subject, "UTF-8");
            // message.setText(body, "UTF-8", "text/html");

            Transport.send(message);
            return true;
        } catch (Exception e) {
            logger.error("Loi tai ham gui email tin tuc: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
/*        Transport transport = session.getTransport("smtp");
        transport.connect(host, from, pass);
        transport.sendMessage(message, message.getAllRecipients());
        transport.close();*/
    }

    public static Session loginMail(String username, String pass) {

        Properties props = System.getProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        /*  Session session = Session.getDefaultInstance(props);*/
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, pass);
            }
        });
        return session;
    }



//    public static void main(String[] args) {
//        System.out.println("backup_%date:~7,2%-%date:~4,2%-%date:~10,4%.sql");
//    }
}
