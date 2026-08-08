namespace FinSight.Models.Contracts.Responses;

public class LoginResponse
{
  public string Token {get; set;} = string.Empty;
  public UserResponse User {get; set;} = new();
}