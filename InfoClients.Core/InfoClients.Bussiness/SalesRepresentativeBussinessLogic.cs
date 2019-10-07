using InfoClients.Bussiness.Contracts;
using InfoClients.Data;
using InfoClients.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InfoClients.Bussiness
{
    /// <summary>
    /// Bussiness Logic of Sales representative
    /// </summary>
    public class SalesRepresentativeBussinessLogic: BussinessLogic, ISalesRepresentativeBussinessLogic
    {
        #region Builder
        public SalesRepresentativeBussinessLogic(PearlContext context) : base(context) { }
        #endregion

        #region Methods
        /// <summary>
        /// Get all sales representatives
        /// </summary>
        /// <returns>List of sales representatives</returns>
        public ResultRequest<IEnumerable<SalesRepresentative>> GetAll()
        {
            try
            {
                return ResultRequest<IEnumerable<SalesRepresentative>>.SetSuccessResult(context.SalesRepresentative.ToList());
            }
            catch (Exception ex)
            {
                return ResultRequest<IEnumerable<SalesRepresentative>>.SetErrorResult(ex.Message);
            }
        } 
        #endregion
    }
}
