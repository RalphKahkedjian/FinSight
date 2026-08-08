using FinSight.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace FinSight.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{

    private readonly ProfileService _profileService;


    public ProfileController(ProfileService profileService)
    {
        _profileService = profileService;
    }



    [HttpGet]
    public async Task<IActionResult> Get()
    {

        var profile = await _profileService.GetProfileAsync();


        if(profile == null)
            return NotFound();



        return Ok(profile);

    }

}