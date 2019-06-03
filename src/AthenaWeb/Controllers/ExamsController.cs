using System;
using System.Collections.Generic;
using System.Linq;
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


      if(!ModelState.IsValid) return BadRequest();
      _context.Exams.Add(exam);
      await _context.SaveChangesAsync();
      exam.Subject = await _context.Subjects.SingleOrDefaultAsync(subj => subj.Id == exam.SubjectId);
      if(exam.Subject is null) {
        return BadRequest();
      }
      return Ok(exam);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) {
      _context.Exams.Remove(await _context.Exams.FindAsync(id));
      await _context.SaveChangesAsync();
      return Ok();
    }
  }
}