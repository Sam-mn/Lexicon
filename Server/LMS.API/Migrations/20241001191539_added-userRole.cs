using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.API.Migrations
{
    /// <inheritdoc />
    public partial class addeduserRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserRole",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
