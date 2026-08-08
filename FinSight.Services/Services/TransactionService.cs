using FinSight.Models.Models;
using FinSight.Data.Data;
using Microsoft.EntityFrameworkCore;
using FinSight.Models.Contracts.Requests;

namespace FinSight.Services.Services;

public class TransactionService
{
    private readonly AppDbContext _context;

    public TransactionService(AppDbContext context)
    {
        _context = context;
    }


    public async Task<List<Transaction>> GetAllAsync(int userId)
    {
        return await _context.Transactions
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }


    public async Task<Transaction> CreateAsync(CreateTransactionRequest request, int userId)
    {
        var transaction = new Transaction
        {
            Description = request.Description,
            Amount = request.Amount,
            Category = request.Category,
            Type = request.Type,
            Date = request.Date.ToUniversalTime(),
            UserId = userId
        };


        _context.Transactions.Add(transaction);

        await _context.SaveChangesAsync();

        return transaction;
    }



    public async Task<Transaction?> GetByIdAsync(int id, int userId)
    {
        return await _context.Transactions
            .FirstOrDefaultAsync(
                t => t.Id == id && t.UserId == userId
            );
    }



    public async Task<Transaction?> UpdateAsync(
        int id,
        CreateTransactionRequest request,
        int userId)
    {
        var transaction = await _context.Transactions
            .FirstOrDefaultAsync(
                t => t.Id == id && t.UserId == userId
            );


        if (transaction == null)
            return null;


        transaction.Description = request.Description;
        transaction.Amount = request.Amount;
        transaction.Category = request.Category;
        transaction.Type = request.Type;
        transaction.Date = request.Date.ToUniversalTime();


        await _context.SaveChangesAsync();

        return transaction;
    }



    public async Task<bool> DeleteAsync(int id, int userId)
    {
        var transaction = await _context.Transactions
            .FirstOrDefaultAsync(
                t => t.Id == id && t.UserId == userId
            );


        if (transaction == null)
            return false;


        _context.Transactions.Remove(transaction);

        await _context.SaveChangesAsync();


        return true;
    }
}