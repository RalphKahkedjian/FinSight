namespace FinSight.Models.Contracts.Responses;

public class ProfileResponse
{
  public int Id {get; set;}
  public string FullName {get; set;} = string.Empty;
  public string Email {get; set;} = string.Empty;
  public DateTime CreatedAt {get; set;}
}