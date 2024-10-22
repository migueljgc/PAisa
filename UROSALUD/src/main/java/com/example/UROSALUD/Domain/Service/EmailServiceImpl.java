package com.example.UROSALUD.Domain.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;


@Service
public class EmailServiceImpl implements  IEmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmails(String[] toUser, String subject, String message) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom("");
            helper.setTo(toUser);
            helper.setSubject(subject);
            helper.setText(message, true);  // Aquí se especifica que el contenido es HTML
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Manejar la excepción apropiadamente según tu aplicación
        }
    }
    public void sendEmailWithPdf(String to, String subject, String body, byte[] pdfData, String archivoRuta) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);

            // Adjuntar el PDF
            helper.addAttachment("solicitud.pdf", new ByteArrayResource(pdfData));

            // Si hay un archivo adjunto en la solicitud, también lo adjuntamos
            if (archivoRuta != null) {
                FileSystemResource file = new FileSystemResource(new File(archivoRuta));
                helper.addAttachment(file.getFilename(), file);
            }


            // Enviar el correo
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar el correo: " + e.getMessage());
        }

    }
}
