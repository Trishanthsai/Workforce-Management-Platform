package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Async
    public void sendMail(String to, String subject, String body) {
        System.out.println("Initiating async email send to: " + to + " | Subject: " + subject);
        
        boolean sentReal = false;
        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(to);
                message.setSubject(subject);
                message.setText(body);
                mailSender.send(message);
                System.out.println("Email sent successfully via SMTP to " + to);
                sentReal = true;
            } catch (Exception e) {
                System.err.println("SMTP Mail delivery failed for " + to + ": " + e.getMessage());
            }
        } else {
            System.out.println("JavaMailSender bean is not configured/available.");
        }

        if (!sentReal) {
            System.out.println("====== MOCK EMAIL FORWARDED TO CONSOLE ======");
            System.out.println("To: " + to);
            System.out.println("Subject: " + subject);
            System.out.println("Body:\n" + body);
            System.out.println("============================================");
        }
    }
}
