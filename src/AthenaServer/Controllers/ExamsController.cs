using System.Collections.Generic;
using AthenaServer.Data;
using AthenaServer.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AthenaServer.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class ExamsController : ControllerBase {
    private readonly ExamContext _context;
    public ExamsController (ExamContext context) => (_context) = (context);

    [HttpGet]
    public IEnumerable<Exam> GetAll () => _context.Exams.Include (exam => exam.Subject);
  }
}