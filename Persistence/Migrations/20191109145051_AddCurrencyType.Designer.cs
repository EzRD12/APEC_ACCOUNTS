﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence.Context;

namespace Persistence.Migrations
{
    [DbContext(typeof(AccountingContext))]
    [Migration("20191109145051_AddCurrencyType")]
    partial class AddCurrencyType
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Core.Models.AccountReceivables", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("AccountTypeId");

                    b.Property<bool>("AllowTransactions");

                    b.Property<long>("Balance");

                    b.Property<string>("BiggerAccount")
                        .HasColumnType("varchar(400)");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(400)");

                    b.Property<int>("Level");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("AccountTypeId");

                    b.ToTable("AccountReceivables");
                });

            modelBuilder.Entity("Core.Models.AccountType", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("Description");

                    b.Property<int>("Origin");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("AccountTypes");
                });

            modelBuilder.Entity("Core.Models.AccountingAccount", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("AllowMovement");

                    b.Property<long>("Balance");

                    b.Property<string>("BiggerAccount")
                        .HasColumnType("varchar(400)");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(400)");

                    b.Property<int>("LevelType");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("AccountingAccounts");
                });

            modelBuilder.Entity("Core.Models.AccountingEntry", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Account")
                        .HasColumnType("varchar(400)");

                    b.Property<long>("Amount");

                    b.Property<long>("AuxiliaryAccountId");

                    b.Property<DateTime>("Created");

                    b.Property<long>("CurrencyTypeId");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(400)");

                    b.Property<int>("MovementType");

                    b.Property<string>("Period")
                        .HasColumnType("varchar(400)");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("AuxiliaryAccountId");

                    b.HasIndex("CurrencyTypeId");

                    b.ToTable("AccountingEntries");
                });

            modelBuilder.Entity("Core.Models.AuxiliaryAccount", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(400)");

                    b.HasKey("Id");

                    b.ToTable("AuxiliaryAccounts");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Active = true,
                            Description = "Contabilidad"
                        },
                        new
                        {
                            Id = 2L,
                            Active = true,
                            Description = "Nomina"
                        },
                        new
                        {
                            Id = 3L,
                            Active = true,
                            Description = "Facturación"
                        },
                        new
                        {
                            Id = 4L,
                            Active = true,
                            Description = "Inventario"
                        },
                        new
                        {
                            Id = 5L,
                            Active = true,
                            Description = "Cuentas x Cobrar"
                        },
                        new
                        {
                            Id = 6L,
                            Active = true,
                            Description = "Cuentas x Pagar"
                        },
                        new
                        {
                            Id = 7L,
                            Active = true,
                            Description = "Compras"
                        },
                        new
                        {
                            Id = 8L,
                            Active = true,
                            Description = "Activos fijos"
                        },
                        new
                        {
                            Id = 9L,
                            Active = true,
                            Description = "Cheques"
                        });
                });

            modelBuilder.Entity("Core.Models.CurrencyType", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("varchar(400)");

                    b.Property<double>("LastExchangeRate");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("CurrencyTypes");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Description = "Peso",
                            LastExchangeRate = 1.0,
                            Status = 0
                        },
                        new
                        {
                            Id = 2L,
                            Description = "Dolar Americano",
                            LastExchangeRate = 45.869999999999997,
                            Status = 0
                        },
                        new
                        {
                            Id = 3L,
                            Description = "Euro",
                            LastExchangeRate = 57.890000000000001,
                            Status = 0
                        });
                });

            modelBuilder.Entity("Core.Models.DebitCreditEntry", b =>
                {
                    b.Property<long>("DebitEntryId");

                    b.Property<long>("CreditEntryId");

                    b.Property<long?>("AccountingEntryCreditId");

                    b.Property<long?>("AccountingEntryDebitId");

                    b.HasKey("DebitEntryId", "CreditEntryId");

                    b.HasIndex("AccountingEntryCreditId");

                    b.HasIndex("AccountingEntryDebitId");

                    b.ToTable("DebitCreditEntries");
                });

            modelBuilder.Entity("Core.Models.AccountReceivables", b =>
                {
                    b.HasOne("Core.Models.AccountType", "AccountType")
                        .WithMany()
                        .HasForeignKey("AccountTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Core.Models.AccountingEntry", b =>
                {
                    b.HasOne("Core.Models.AuxiliaryAccount", "AuxiliaryAccount")
                        .WithMany()
                        .HasForeignKey("AuxiliaryAccountId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Core.Models.CurrencyType", "CurrencyType")
                        .WithMany()
                        .HasForeignKey("CurrencyTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Core.Models.DebitCreditEntry", b =>
                {
                    b.HasOne("Core.Models.AccountingEntry", "AccountingEntryCredit")
                        .WithMany()
                        .HasForeignKey("AccountingEntryCreditId");

                    b.HasOne("Core.Models.AccountingEntry", "AccountingEntryDebit")
                        .WithMany()
                        .HasForeignKey("AccountingEntryDebitId");
                });
#pragma warning restore 612, 618
        }
    }
}
