namespace consultorFinanceiro_webapi.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; } = new Guid();
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; }
        public string SurName { get; set; }
        public string PasswordHash { get; set; }
        public DateTimeOffset LastLogin {  get; set; }
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.UtcNow;
        public bool IsDeleted { get; set; } = false;

    }
}
