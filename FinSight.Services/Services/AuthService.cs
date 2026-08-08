using FinSight.Data.Data;
using FinSight.Models.Contracts.Requests;
using FinSight.Models.Contracts.Responses;
using FinSight.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FinSight.Services.Services;

public class AuthService
{
  private readonly AppDbContext _context;
  private readonly PasswordHasher<User> _passwordHasher;
  private readonly JwtService _jwtService;

  public AuthService(
      AppDbContext context,
      JwtService jwtService
    )
  {
    _context = context;
    _passwordHasher = new PasswordHasher<User>();
    _jwtService = jwtService;
  }

  public async Task<ServiceResult<LoginResponse>> RegisterAsync(
    RegisterRequest request
  )
  {
    var existingUser = await _context.Users
      .FirstOrDefaultAsync( x => x.Email == request.Email);

    if (existingUser != null)
    {
      throw new Exception("Email already exists");
    }

    var user = new User
    {
      FullName = request.FullName,
      Email = request.Email,
      CreatedAt = DateTime.UtcNow
    };

    user.PasswordHash = _passwordHasher.HashPassword (
      user,
      request.Password
    );

    _context.Users.Add(user);

    await _context.SaveChangesAsync();

    var response = new LoginResponse
    {
    Token = _jwtService.GenerateToken(user),
    User = new UserResponse
    {
        Id = user.Id,
        FullName = user.FullName,
        Email = user.Email,
        CreatedAt = user.CreatedAt
      }
    };

    return ServiceResult<LoginResponse>.Ok(response);
  }

  public async Task<ServiceResult<LoginResponse>> LoginAsync (LoginRequest request)
  {
    var user = await _context.Users
        .FirstOrDefaultAsync( x => x.Email == request.Email);

    if (user == null)
    {
      return ServiceResult<LoginResponse>.Fail("Invalid email or password");
    }

    var result = _passwordHasher.VerifyHashedPassword(
      user,
      user.PasswordHash,
      request.Password
    );

    if (result == PasswordVerificationResult.Failed)
    {
      return ServiceResult<LoginResponse>.Fail("Invalid email or password");
    }

    var response = new LoginResponse
    {
      Token = _jwtService.GenerateToken(user),
      User = new UserResponse
      {
        Id = user.Id,
        FullName = user.FullName,
        Email = user.Email,
        CreatedAt = user.CreatedAt
      }
    };

    return ServiceResult<LoginResponse>.Ok(response);
  }
}