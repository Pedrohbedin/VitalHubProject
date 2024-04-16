
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        //variavel que armazena as configs de email settings
        private readonly EmailSettings emailSettings;

        //construtor que recebe a dependency injections de EmailSettings
        public EmailService(IOptions<EmailSettings> options)
        {
            emailSettings = options.Value;
        }

        //metodo para envio de email
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                var email = new MimeMessage();
                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                //define o destinatario
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));

                //define p assunto do email
                email.Subject = mailRequest.Subject;

                //cria o corpo do email
                var builder = new BodyBuilder();

                //define o corpo do email como html
                builder.HtmlBody = mailRequest.Body;

                //define o corpo do email no objeto MimeMessage
                email.Body = builder.ToMessageBody();

                using (var smtp = new SmtpClient())
                {
                    //conecta-se ao servidor SMTP usando os dados de emailSettings
                    smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    //autentica-e no servdor smtp usando os dados de mailSettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //envia o email
                    await smtp.SendAsync(email);
                }
            }
            catch (Exception) 
            {
                throw;
            }
        }
    }
}
