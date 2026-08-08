using FinSight.Models.Models;

namespace FinSight.Models.Contracts.Responses;

public class DashboardResponse
{
  public decimal Balance {get; set;}
  public decimal TotalIncome {get; set;}
  public decimal TotalExpenses {get; set;}
  public int TransactionCount {get; set;}
  public List<Transaction> RecentTransactions {get; set;} = new();
}