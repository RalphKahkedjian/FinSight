public class AnalyticsResponse
{
    public decimal Balance { get; set; }

    public decimal TotalIncome { get; set; }

    public decimal TotalExpenses { get; set; }

    public int TransactionCount { get; set; }

    public decimal LargestExpense { get; set; }

    public decimal LargestIncome { get; set; }

    public decimal AverageExpense { get; set; }

    public decimal SavingsRate { get; set; }

    public List<CategoryExpenseResponse> CategoryBreakdown { get; set; } = [];

    public List<MonthlyAnalyticsResponse> MonthlyData { get; set; } = [];
}