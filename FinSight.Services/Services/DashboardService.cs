using FinSight.Data.Data;
using FinSight.Models.Contracts.Responses;
using Microsoft.EntityFrameworkCore;

namespace FinSight.Services.Services;

public class DashboardService
{
    private readonly AppDbContext _context;

    public DashboardService(AppDbContext context)
    {
        _context = context;
    }


    public async Task<DashboardResponse> GetDashboardAsync(int userId)
    {
        var transactions = await _context.Transactions
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.Date)
            .ToListAsync();


        return new DashboardResponse
        {
            Balance = transactions.Sum(t => t.Amount),

            TotalIncome = transactions
                .Where(t => t.Type == "Income")
                .Sum(t => t.Amount),

            TotalExpenses = transactions
                .Where(t => t.Type == "Expense")
                .Sum(t => Math.Abs(t.Amount)),

            TransactionCount = transactions.Count,

            RecentTransactions = transactions
                .Take(5)
                .ToList()
        };
    }
}