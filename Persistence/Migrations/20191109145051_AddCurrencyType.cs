using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddCurrencyType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AccountingModuleId",
                table: "AccountingEntries",
                newName: "CurrencyTypeId");

            migrationBuilder.AddColumn<long>(
                name: "AuxiliaryAccountId",
                table: "AccountingEntries",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_AccountingEntries_AuxiliaryAccountId",
                table: "AccountingEntries",
                column: "AuxiliaryAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountingEntries_CurrencyTypeId",
                table: "AccountingEntries",
                column: "CurrencyTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccountingEntries_AuxiliaryAccounts_AuxiliaryAccountId",
                table: "AccountingEntries",
                column: "AuxiliaryAccountId",
                principalTable: "AuxiliaryAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AccountingEntries_CurrencyTypes_CurrencyTypeId",
                table: "AccountingEntries",
                column: "CurrencyTypeId",
                principalTable: "CurrencyTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccountingEntries_AuxiliaryAccounts_AuxiliaryAccountId",
                table: "AccountingEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_AccountingEntries_CurrencyTypes_CurrencyTypeId",
                table: "AccountingEntries");

            migrationBuilder.DropIndex(
                name: "IX_AccountingEntries_AuxiliaryAccountId",
                table: "AccountingEntries");

            migrationBuilder.DropIndex(
                name: "IX_AccountingEntries_CurrencyTypeId",
                table: "AccountingEntries");

            migrationBuilder.DropColumn(
                name: "AuxiliaryAccountId",
                table: "AccountingEntries");

            migrationBuilder.RenameColumn(
                name: "CurrencyTypeId",
                table: "AccountingEntries",
                newName: "AccountingModuleId");
        }
    }
}
