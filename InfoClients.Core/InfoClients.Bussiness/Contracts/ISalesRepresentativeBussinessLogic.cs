using InfoClients.Bussiness.Base;
using InfoClients.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoClients.Bussiness.Contracts
{
    /// <summary>
    /// Bussiness Logic of Sales representative
    /// </summary>
    public interface ISalesRepresentativeBussinessLogic: IBussinessLogic
    {
        /// <summary>
        /// Get all sales representatives
        /// </summary>
        /// <returns>List of sales representatives</returns>
        ResultRequest<IEnumerable<SalesRepresentative>> GetAll();
    }
}
