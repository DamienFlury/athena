using System;
using AthenaWeb.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AthenaWeb.Data {
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
    }
    public DbSet<Exam> Exams { get; set; }
    public DbSet<Subject> Subjects { get; set; }
  }
}