﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CRUDMVCREACT.Models;

public partial class CrudreactmvcContext : DbContext
{
    public CrudreactmvcContext()
    {
    }

    public CrudreactmvcContext(DbContextOptions<CrudreactmvcContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Contacto> Contactos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=LAPTOP-NHNT9S7U; DataBase=CRUDREACTMVC; Integrated Security=true; TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contacto>(entity =>
        {
            entity.HasKey(e => e.IdContacto).HasName("PK__Contacto__4B1329C70395621F");

            entity.ToTable("Contacto");

            entity.Property(e => e.IdContacto).HasColumnName("idContacto");
            entity.Property(e => e.Correo).HasMaxLength(100);
            entity.Property(e => e.Nombre).HasMaxLength(50);
            entity.Property(e => e.Telefono).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
