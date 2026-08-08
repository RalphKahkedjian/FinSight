using System.Net.Http.Json;

namespace FinSight.Services.Services;

public class AiService
{
    private readonly HttpClient _httpClient;

    public AiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string?> AskBenjy(
        string message,
        object transactions)
    {
        var request = new
        {
            message = message,
            transactions = transactions
        };

        var response = await _httpClient.PostAsJsonAsync(
            "chat",
            request
        );

        response.EnsureSuccessStatusCode();

        var result = await response.Content
            .ReadFromJsonAsync<AiResponse>();

        return result?.Response;
    }
}

public class AiResponse
{
    public string Response { get; set; } = string.Empty;
}