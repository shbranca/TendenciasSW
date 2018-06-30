using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class last : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "EvolutionAthletes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "EvolutionAthletes",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "EvolutionAthletes",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "EvolutionAthletes");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "EvolutionAthletes");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "EvolutionAthletes");
        }
    }
}
