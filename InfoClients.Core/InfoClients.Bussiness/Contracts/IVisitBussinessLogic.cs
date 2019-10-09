using InfoClients.Bussiness.Base;
using InfoClients.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoClients.Bussiness.Contracts
{
    /// <summary>
    /// Bussiness logic of visits
    /// </summary>
    public interface IVisitBussinessLogic: IBussinessLogic
    {
        /// <summary>
        /// List visits for client
        /// </summary>
        /// <param name="nit">id client</param>
        /// <returns>List of visits</returns>
        ResultRequest<IEnumerable<Visit>> GetByClient(string nit);
        /// <summary>
        /// Save a visit for client
        /// </summary>
        /// <param name="visit"></param>
        /// <returns></returns>
        ResultRequest<Visit> Save(Visit visit);
        /// <summary>
        /// Lista todas las visitas para las graficas
        /// </summary>
        /// <returns></returns>
        ResultRequest<IEnumerable<Visit>> GetAll();
    }
}
