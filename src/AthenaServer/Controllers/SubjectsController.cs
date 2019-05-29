using System.Collections.Generic;
using AthenaServer.Data;
using AthenaServer.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AthenaServer.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class SubjectsController : ControllerBase {
    private readonly ExamContext _context;
    public SubjectsController(ExamContext context) => (_context) = (context);

    [HttpGet]
    public ActionResult<IEnumerable<Subject>> GetAll() => Ok(_context.Subjects);

  }
}