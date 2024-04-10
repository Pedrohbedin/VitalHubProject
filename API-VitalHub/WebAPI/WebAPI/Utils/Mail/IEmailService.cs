namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //método assincrono para envio de email
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
