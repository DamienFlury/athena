using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthenaWeb.Data.Entities {
  public class Exam {
    public int? Id { get; set; }

    [Required]
    public string Title { get; set; }
    public double Weighting { get; set; }
    public DateTime Date { get; set; }
    public int SubjectId { get; set; }
    public Subject Subject { get; set; }
  }
}