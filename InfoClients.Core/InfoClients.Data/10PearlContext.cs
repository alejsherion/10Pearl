using InfoClients.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoClients.Data
{
    public class PearlContext : DbContext
    {
        #region Public Properties
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Visit> Visit { get; set; }
        public virtual DbSet<SalesRepresentative> SalesRepresentative { get; set; }
        #endregion

        private readonly string _connectionString;

        #region Builders
        /// <summary>
        /// Builder without parameters
        /// </summary>
        public PearlContext() : base() { }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="connectionString"></param>
        public PearlContext(string connectionString) : base()
        {
            this._connectionString = connectionString;
            this.Database.EnsureCreated();
        }
        /// <summary>
        /// Builder with parameters
        /// </summary>
        /// <param name="options"></param>
        public PearlContext(DbContextOptions optionsBuilder) : base(optionsBuilder) { }
        #endregion

        #region Overrides
        /// <summary>
        /// Ajust configuration if call builder parameterless
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                if (string.IsNullOrEmpty(_connectionString))
                    throw new ArgumentException("Database uncofigurated");
                else
                    optionsBuilder.UseSqlServer(_connectionString);
            }
        }
        #endregion
    }
}
