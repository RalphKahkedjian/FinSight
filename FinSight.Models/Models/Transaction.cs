namespace FinSight.Models.Models;

public class Transaction
{
  public int Id {get; set; }
  public string Description {get; set;} = string.Empty;
  public decimal Amount {get; set;} 
  public string Category {get; set;} = string.Empty;
  public string Type {get; set;} = string.Empty;
  public DateTime Date {get; set;} = DateTime.UtcNow;
  public int UserId {get; set;}
  public User User {get; set;} = null!;
}