using Microsoft.EntityFrameworkCore.Migrations;

namespace AthenaWeb.Migrations
{
    public partial class AddWeighting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Weighting",
                table: "Exams",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Weighting",
                table: "Exams");
        }
    }
}
