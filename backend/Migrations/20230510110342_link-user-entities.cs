using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class linkuserentities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AddedBy",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddedBy",
                table: "TrackPlaylists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddedBy",
                table: "Playlists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddedBy",
                table: "Artists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddedBy",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedBy",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "AddedBy",
                table: "TrackPlaylists");

            migrationBuilder.DropColumn(
                name: "AddedBy",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "AddedBy",
                table: "Artists");

            migrationBuilder.DropColumn(
                name: "AddedBy",
                table: "Albums");
        }
    }
}
