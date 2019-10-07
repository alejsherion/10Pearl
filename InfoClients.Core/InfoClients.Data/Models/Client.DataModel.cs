using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace InfoClients.Data.Models
{
    public class Client
    {
        [Key]
        [MaxLength(20)]
        public string Nit { get; set; }
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [MaxLength(100)]
        public string SecondName { get; set; }
        [Required]
        [MaxLength(100)]
        public string FirstLastName { get; set; }
        [MaxLength(100)]
        public string SecondLastName { get; set; }
        [Required]
        [MaxLength(400)]
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        [MaxLength(200)]
        public string Address { get; set; }
        [MaxLength(200)]
        public string Phone { get; set; }
        [Required]
        [MaxLength(100)]
        public string City { get; set; }
        [MaxLength(100)]
        public string State { get; set; }
        [MaxLength(100)]
        public string Country { get; set; }
        public decimal CreditLimit { get; set; }
        public decimal AvailableCredit { get; set; }
        public decimal VisitPercentage { get; set; }

        public ICollection<Visit> Visits { get; set; }
    }
}
