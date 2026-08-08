using FinSight.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace FinSight.Data.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users {get; set;}
    public DbSet<Transaction> Transactions { get; set; }
}