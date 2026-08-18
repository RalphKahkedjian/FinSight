using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Json;
using System.Security.Claims;
using FinSight.Data;
using FinSight.Data.Data;

namespace Finsight.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ForecastController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly AppDbContext _context;

    public ForecastController(
        IHttpClientFactory httpClientFactory,
        AppDbContext context)
    {
        _httpClient = httpClientFactory.CreateClient();
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetForecast()
    {
        try
        {
            // 1. Get logged-in user's ID from JWT
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            // 2. Get ONLY this user's transactions
            var transactions = await _context.Transactions
                .Where(t => t.UserId.ToString() == userId)
                .OrderBy(t => t.Date)
                .Select(t => new
                {
                    date = t.Date,
                    amount = t.Amount,
                    type = t.Type
                })
                .ToListAsync();

            // 3. Make sure we have enough data
            if (transactions.Count < 2)
            {
                return BadRequest(new
                {
                    message = "Not enough transactions to generate a forecast."
                });
            }

            // 4. Send user's transactions to Python
            var request = new
            {
                transactions = transactions,
                days = 30
            };

            var response = await _httpClient.PostAsJsonAsync(
                "http://127.0.0.1:8000/forecast",
                request
            );

            // 5. Check Python response
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();

                return StatusCode(
                    (int)response.StatusCode,
                    new
                    {
                        message = "AI Forecast service failed",
                        error
                    }
                );
            }

            // 6. Return Prophet result
            var data = await response.Content.ReadFromJsonAsync<object>();

            return Ok(data);
        }
        catch (Exception ex)
        {
            return StatusCode(
                500,
                new
                {
                    message = "Could not generate forecast",
                    error = ex.Message
                }
            );
        }
    }
}