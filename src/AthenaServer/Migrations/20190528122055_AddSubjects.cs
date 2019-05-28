using Microsoft.EntityFrameworkCore.Migrations;

namespace AthenaServer.Migrations
{
    public partial class AddSubjects : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Subjects",
                columns: new[] { "Id", "Color", "Teacher", "Title" },
                values: new object[,]
                {
                    { 1, "#ff3377", null, "Mathematics" },
                    { 2, "#44ff88", null, "French" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
