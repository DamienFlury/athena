using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthenaServer.Data.Entities {
  public class Subject {
    public int? Id { get; set; }
    [Required]
    public string Title { get; set; }
    public string Teacher { get; set; }
    public string Color { get; set; }
  }
}