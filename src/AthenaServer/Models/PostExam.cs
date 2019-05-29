using System;
using System.ComponentModel.DataAnnotations;

namespace AthenaServer.Models {
  public class PostExam {
    [Required]
    public string Title { get; set; }
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public int SubjectId { get; set; }
  }
}