using System.Collections.Generic;
using System.Threading.Tasks;
using AthenaWeb.Data;
using AthenaWeb.Data.Entities;
using AthenaWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AthenaWeb.Controllers {
  [Route ("api/[controller]")]
  [ApiController]
  public class ExamsController : ControllerBase {
    private readonly ExamContext _context;
    public ExamsController (ExamContext context) => (_context) = (context);

    [HttpGet]
    public IEnumerable<Exam> GetAll () => _context.Exams.Include (exam => exam.Subject);

    [HttpPost]
    public async Task<IActionResult> Add(Exam exam) {
      var dbExam = new Exam {
        Title = exam.Title,
        Date = exam.Date,
        SubjectId = exam.SubjectId,
      };

      if(!ModelState.IsValid) return BadRequest();
      _context.Exams.Add(dbExam);
      await _context.SaveChangesAsync();
      dbExam.Subject = await _context.Subjects.SingleOrDefaultAsync(subj => subj.Id == exam.SubjectId);
      if(dbExam.Subject is null) {
        return BadRequest();
      }
      return Ok(dbExam);
    }
  }
}