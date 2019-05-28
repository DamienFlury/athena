using System;
using AthenaServer.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AthenaServer.Data {
  public class ExamContext : DbContext {
    public ExamContext (DbContextOptions<ExamContext> options) : base (options) { }

    protected override void OnModelCreating (ModelBuilder modelBuilder) {
      modelBuilder.Entity<Subject> ().HasData (new Subject[] {
        new Subject {
          Id = 1,
            Title = "Mathematics",
            Color = "#ff3377",
        },
        new Subject {
          Id = 2,
            Title = "French",
            Color = "#44ff88",
        }
      });
      modelBuilder.Entity<Exam> ().HasData (new Exam[] {
        new Exam {
          Id = 1,
            Title = "Analysis",
            Date = DateTime.Today,
            SubjectId = 1
        },
        new Exam {
          Id = 2,
          Title = "Grammaire",
          SubjectId = 2,
          Date = DateTime.Today.AddDays(2)
        },
        new Exam {
          Id = 3,
          Title = "Stochastik",
          Date = DateTime.Today.AddMonths(2),
          SubjectId = 1,
        }
      });
    }
    public DbSet<Exam> Exams { get; set; }
    public DbSet<Subject> Subjects { get; set; }
  }
}