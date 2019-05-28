using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthenaServer.Data.Entities {
  public class Exam {
    public int? Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public int SubjectId { get; set; }
    public Subject Subject { get; set; }
  }
}