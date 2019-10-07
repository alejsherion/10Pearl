using InfoClients.Bussiness;
using InfoClients.Bussiness.Contracts;
using InfoClients.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InfoClients.ApiClient.Controllers
{
    [Route("SalesRepresetative")]
    public class SalesRepresentativeController: Controller
    {
        #region Members
        private readonly ISalesRepresentativeBussinessLogic _salesRepresentativeBussinessLogic; 
        #endregion

        #region Builder
        public SalesRepresentativeController(ISalesRepresentativeBussinessLogic salesRepresentativeBussinessLogic)
        {
            _salesRepresentativeBussinessLogic = salesRepresentativeBussinessLogic;
        } 
        #endregion

        #region Methods
        /// <summary>
        /// Get all sales representatives
        /// </summary>
        /// <returns>List of sales representatives</returns>
        [HttpGet]
        [Route("GetAll")]
        public ResultRequest<IEnumerable<SalesRepresentative>> GetAll() => _salesRepresentativeBussinessLogic.GetAll();
        #endregion
    }
}
