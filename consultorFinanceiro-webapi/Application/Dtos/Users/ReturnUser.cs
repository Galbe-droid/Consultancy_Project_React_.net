namespace consultorFinanceiro_webapi.Application.Dtos.Users
{
    public class ReturnUser
    {
        public Guid Id { get; set; }
        public string Username { get; set; } 
        public string Email { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
    }
}
