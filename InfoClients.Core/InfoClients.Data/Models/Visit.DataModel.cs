using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace InfoClients.Data.Models
{
    public class Visit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string ClientNit { get; set; }
        [Required]
        public int SalesRepresentativeId { get; set; }
        [Required]
        public DateTime VisitDate { get; set; }
        [Required]
        public decimal Net { get; set; }
        [Required]
        public decimal VisitTotal { get; set; }
        [MaxLength(255)]
        public string Description { get; set; }

        public Client Client { get; set; }
        public SalesRepresentative SalesRepresentative { get; set; }
    }
}
