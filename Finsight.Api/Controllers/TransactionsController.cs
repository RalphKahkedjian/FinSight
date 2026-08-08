using FinSight.Models.Contracts.Requests;
using FinSight.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinSight.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TransactionsController : ControllerBase
{

    private readonly TransactionService _transactionService;
        

    public TransactionsController(TransactionService transactionService)
    {
        _transactionService = transactionService;
    }



    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );


        var transactions = await _transactionService
            .GetAllAsync(userId);


        return Ok(transactions);
    }




    [HttpPost]
    public async Task<IActionResult> Create(CreateTransactionRequest request)
    {

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );


        var transaction = await _transactionService
            .CreateAsync(request, userId);


        return Ok(transaction);
    }





    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );


        var transaction = await _transactionService
            .GetByIdAsync(id, userId);



        if(transaction == null)
            return NotFound();



        return Ok(transaction);
    }





    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        CreateTransactionRequest request)
    {

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );


        var transaction = await _transactionService
            .UpdateAsync(id, request, userId);



        if(transaction == null)
            return NotFound();



        return Ok(transaction);
    }





    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );


        var deleted = await _transactionService
            .DeleteAsync(id, userId);



        if(!deleted)
            return NotFound();



        return NoContent();
    }
}