using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace WebAPI.Utils.Mail
{
    public class EmailSettings
    {
        //email do remetente 
        public string? Email { get; set; }
        //senha do remetente
        public string? Password { get; set; }
        //post do servidor SMTP(Simple Mail Transfer Protocol)
        public string? Host { get; set; }
        //nome exibido do remetente 
        public string? DisplayName { get; set; }
        //porta do servidor SMTP
        public int Port { get; set;}
    }
}
