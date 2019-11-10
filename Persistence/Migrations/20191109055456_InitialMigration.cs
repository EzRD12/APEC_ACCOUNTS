using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Persistence.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountingAccounts",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(400)", nullable: true),
                    AllowMovement = table.Column<bool>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    LevelType = table.Column<int>(nullable: false),
                    Balance = table.Column<long>(nullable: false),
                    BiggerAccount = table.Column<string>(type: "varchar(400)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountingAccounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccountingEntries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(400)", nullable: true),
                    AccountingModuleId = table.Column<long>(nullable: false),
                    Account = table.Column<string>(type: "varchar(400)", nullable: true),
                    MovementType = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    Period = table.Column<string>(type: "varchar(400)", nullable: true),
                    Amount = table.Column<long>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountingEntries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccountTypes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<long>(nullable: false),
                    Origin = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuxiliaryAccounts",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(400)", nullable: true),
                    Active = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuxiliaryAccounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CurrencyTypes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(400)", nullable: true),
                    LastExchangeRate = table.Column<double>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrencyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DebitCreditEntries",
                columns: table => new
                {
                    DebitEntryId = table.Column<long>(nullable: false),
                    CreditEntryId = table.Column<long>(nullable: false),
                    AccountingEntryDebitId = table.Column<long>(nullable: true),
                    AccountingEntryCreditId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DebitCreditEntries", x => new { x.DebitEntryId, x.CreditEntryId });
                    table.ForeignKey(
                        name: "FK_DebitCreditEntries_AccountingEntries_AccountingEntryCreditId",
                        column: x => x.AccountingEntryCreditId,
                        principalTable: "AccountingEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DebitCreditEntries_AccountingEntries_AccountingEntryDebitId",
                        column: x => x.AccountingEntryDebitId,
                        principalTable: "AccountingEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AccountReceivables",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "varchar(400)", nullable: true),
                    AllowTransactions = table.Column<bool>(nullable: false),
                    AccountTypeId = table.Column<long>(nullable: false),
                    Level = table.Column<int>(nullable: false),
                    BiggerAccount = table.Column<string>(type: "varchar(400)", nullable: true),
                    Balance = table.Column<long>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountReceivables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountReceivables_AccountTypes_AccountTypeId",
                        column: x => x.AccountTypeId,
                        principalTable: "AccountTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AuxiliaryAccounts",
                columns: new[] { "Id", "Active", "Description" },
                values: new object[,]
                {
                    { 1L, true, "Contabilidad" },
                    { 2L, true, "Nomina" },
                    { 3L, true, "Facturación" },
                    { 4L, true, "Inventario" },
                    { 5L, true, "Cuentas x Cobrar" },
                    { 6L, true, "Cuentas x Pagar" },
                    { 7L, true, "Compras" },
                    { 8L, true, "Activos fijos" },
                    { 9L, true, "Cheques" }
                });

            migrationBuilder.InsertData(
                table: "CurrencyTypes",
                columns: new[] { "Id", "Description", "LastExchangeRate", "Status" },
                values: new object[,]
                {
                    { 1L, "Peso", 1.0, 0 },
                    { 2L, "Dolar Americano", 45.869999999999997, 0 },
                    { 3L, "Euro", 57.890000000000001, 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountReceivables_AccountTypeId",
                table: "AccountReceivables",
                column: "AccountTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DebitCreditEntries_AccountingEntryCreditId",
                table: "DebitCreditEntries",
                column: "AccountingEntryCreditId");

            migrationBuilder.CreateIndex(
                name: "IX_DebitCreditEntries_AccountingEntryDebitId",
                table: "DebitCreditEntries",
                column: "AccountingEntryDebitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountingAccounts");

            migrationBuilder.DropTable(
                name: "AccountReceivables");

            migrationBuilder.DropTable(
                name: "AuxiliaryAccounts");

            migrationBuilder.DropTable(
                name: "CurrencyTypes");

            migrationBuilder.DropTable(
                name: "DebitCreditEntries");

            migrationBuilder.DropTable(
                name: "AccountTypes");

            migrationBuilder.DropTable(
                name: "AccountingEntries");
        }
    }
}
