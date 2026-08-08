using System.Security.Claims;
using FinSight.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/ai")]
[Authorize]
public class AiController : ControllerBase
{
    private readonly AiService _aiService;
    private readonly TransactionService _transactionService;

    public AiController(
        AiService aiService,
        TransactionService transactionService)
    {
        _aiService = aiService;
        _transactionService = transactionService;
    }

    [HttpPost("chat")]
    public async Task<IActionResult> Chat(
        [FromBody] ChatRequest request)
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        var transactions =
            await _transactionService.GetAllAsync(userId);

        // TEMPORARY DEBUG
        Console.WriteLine($"AI USER ID: {userId}");
        Console.WriteLine(
            $"AI TRANSACTION COUNT: {transactions.Count}"
        );

        foreach (var t in transactions)
        {
            Console.WriteLine(
                $"ID: {t.Id} | UserId: {t.UserId} | " +
                $"{t.Description} | {t.Amount} | {t.Category}"
            );
        }

        var aiTransactions = transactions
            .Select(t => new
            {
                amount = t.Amount,
                category = t.Category,
                type = t.Type,
                date = t.Date,
                description = t.Description
            })
            .ToList();

        var answer = await _aiService.AskBenjy(
            request.Message,
            aiTransactions
        );

        return Ok(new
        {
            response = answer
        });
    }
}

public class ChatRequest
{
    public string Message { get; set; } = string.Empty;
}