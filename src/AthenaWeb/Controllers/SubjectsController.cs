using System.Collections.Generic;
using AthenaWeb.Data;
using AthenaWeb.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AthenaWeb.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class SubjectsController : ControllerBase {
    private readonly ExamContext _context;
    public SubjectsController(ExamContext context) => (_context) = (context);

    [HttpGet]
    public ActionResult<IEnumerable<Subject>> GetAll() => Ok(_context.Subjects);

  }
}