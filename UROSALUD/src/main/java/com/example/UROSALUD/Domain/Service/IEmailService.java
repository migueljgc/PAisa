package com.example.UROSALUD.Domain.Service;

public interface IEmailService {
    void sendEmails(String[] toUser, String subject, String message);
    void sendEmailWithPdf(String to, String subject, String body, byte[] pdfData, String archivoRuta);
}
