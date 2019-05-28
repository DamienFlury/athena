using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AthenaServer.Migrations
{
    public partial class AddMoreData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Exams",
                columns: new[] { "Id", "Date", "SubjectId", "Title" },
                values: new object[] { 3, new DateTime(2019, 7, 28, 0, 0, 0, 0, DateTimeKind.Local), 1, "Stochastik" });

            migrationBuilder.InsertData(
                table: "Subjects",
                columns: new[] { "Id", "Color", "Teacher", "Title" },
                values: new object[] { 2, "#44ff88", null, "French" });

            migrationBuilder.InsertData(
                table: "Exams",
                columns: new[] { "Id", "Date", "SubjectId", "Title" },
                values: new object[] { 2, new DateTime(2019, 5, 30, 0, 0, 0, 0, DateTimeKind.Local), 2, "Grammaire" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Exams",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Exams",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Subjects",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
