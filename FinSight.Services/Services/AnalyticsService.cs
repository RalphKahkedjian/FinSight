using FinSight.Data.Data;
using FinSight.Models.Contracts.Responses;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace FinSight.Services.Services;

public class AnalyticsService
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AnalyticsService(
        AppDbContext context,
        IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<AnalyticsResponse?> GetAnalyticsAsync()
    {
        var userIdClaim = _httpContextAccessor
            .HttpContext?
            .User
            .FindFirst(ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
            return null;

        var userId = int.Parse(userIdClaim.Value);

        var transactions = await _context.Transactions
            .Where(t => t.UserId == userId)
            .ToListAsync();

        var income = transactions
            .Where(t => t.Type == "Income")
            .Sum(t => t.Amount);

        var expenses = transactions
            .Where(t => t.Type == "Expense")
            .Sum(t => Math.Abs(t.Amount));

        var balance = income - expenses;

        var categoryBreakdown = transactions
            .Where(t => t.Type == "Expense")
            .GroupBy(t => t.Category)
            .Select(g => new CategoryExpenseResponse
            {
                Category = g.Key,
                Amount = g.Sum(x => Math.Abs(x.Amount))
            })
            .OrderByDescending(x => x.Amount)
            .ToList();

        var monthlyData = transactions
            .GroupBy(t => new { t.Date.Year, t.Date.Month })
            .OrderBy(g => g.Key.Year)
            .ThenBy(g => g.Key.Month)
            .Select(g => new MonthlyAnalyticsResponse
            {
                Month = new DateTime(g.Key.Year, g.Key.Month, 1)
                    .ToString("MMM"),

                Income = g.Where(x => x.Type == "Income")
                          .Sum(x => x.Amount),

                Expenses = g.Where(x => x.Type == "Expense")
                            .Sum(x => Math.Abs(x.Amount))
            })
            .ToList();

        var response = new AnalyticsResponse
        {
            Balance = balance,

            TotalIncome = income,

            TotalExpenses = expenses,

            TransactionCount = transactions.Count,

            LargestExpense = transactions
                .Where(t => t.Type == "Expense")
                .Select(t => Math.Abs(t.Amount))
                .DefaultIfEmpty(0)
                .Max(),

            LargestIncome = transactions
                .Where(t => t.Type == "Income")
                .Select(t => t.Amount)
                .DefaultIfEmpty(0)
                .Max(),

            AverageExpense = transactions
                .Where(t => t.Type == "Expense")
                .Select(t => Math.Abs(t.Amount))
                .DefaultIfEmpty(0)
                .Average(),

            SavingsRate =
                income == 0
                ? 0
                : ((income - expenses) / income) * 100,

            CategoryBreakdown = categoryBreakdown,

            MonthlyData = monthlyData
        };

        return response;
    }
}