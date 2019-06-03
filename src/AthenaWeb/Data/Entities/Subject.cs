using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthenaWeb.Data.Entities {
  public class Subject {
    public int? Id { get; set; }
    [Required]
    public string Title { get; set; }
    public string Teacher { get; set; }
    public string Color { get; set; }
  }
}