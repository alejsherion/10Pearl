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
    [Route("Visit")]
    public class VisitController: Controller
    {
        #region Members
        private readonly IVisitBussinessLogic _visitBussinessLogic; 
        #endregion

        #region Builder
        public VisitController(IVisitBussinessLogic visitBussinessLogic)
        {
            _visitBussinessLogic = visitBussinessLogic;
        } 
        #endregion

        #region Methods
        /// <summary>
        /// List visits for client
        /// </summary>
        /// <param name="nit">id client</param>
        /// <returns>List of visits</returns>
        [HttpGet]
        [Route("GetByClient")]
        public ResultRequest<IEnumerable<Visit>> GetByClient(string nit) => _visitBussinessLogic.GetByClient(nit);

        /// <summary>
        /// Save a visit for client
        /// </summary>
        /// <param name="visit"></param>
        /// <returns></returns>
        [HttpPost]
        public ResultRequest<Visit> Save([FromBody]Visit visit) => _visitBussinessLogic.Save(visit); 
        #endregion
    }
}
