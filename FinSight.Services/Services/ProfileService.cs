using FinSight.Data.Data;
using FinSight.Models.Contracts.Responses;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace FinSight.Services.Services;

public class ProfileService
{

    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;


    public ProfileService(
        AppDbContext context,
        IHttpContextAccessor httpContextAccessor
    )
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }



    public async Task<ProfileResponse?> GetProfileAsync()
    {

        var userIdClaim = _httpContextAccessor
            .HttpContext?
            .User
            .FindFirst(ClaimTypes.NameIdentifier);



        if(userIdClaim == null)
            return null;



        var userId = int.Parse(userIdClaim.Value);



        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId);



        if(user == null)
            return null;



        return new ProfileResponse
        {
            Id = user.Id,

            FullName = user.FullName,

            Email = user.Email,

            CreatedAt = user.CreatedAt
        };

    }

}