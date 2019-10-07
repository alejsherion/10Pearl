using InfoClients.Bussiness.Contracts;
using InfoClients.Data;
using InfoClients.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InfoClients.Bussiness
{
    /// <summary>
    /// Bussiness logic of visits
    /// </summary>
    public class VisitBussinessLogic: BussinessLogic, IVisitBussinessLogic
    {
        #region Builder
        public VisitBussinessLogic(PearlContext context) : base(context) { }
        #endregion

        #region Methods
        /// <summary>
        /// List visits for client
        /// </summary>
        /// <param name="nit">id client</param>
        /// <returns>List of visits</returns>
        public ResultRequest<IEnumerable<Visit>> GetByClient(string nit)
        {
            try
            {
                return ResultRequest<IEnumerable<Visit>>.SetSuccessResult(context.Visit.Where(v => v.ClientNit == nit).ToList());
            }
            catch (Exception ex)
            {
                return ResultRequest<IEnumerable<Visit>>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// Save a visit for client
        /// </summary>
        /// <param name="visit"></param>
        /// <returns></returns>
        public ResultRequest<Visit> Save(Visit visit)
        {
            try
            {
                visit = visit ?? throw new ArgumentException($"{nameof(visit)} is empty");
                visit = context.Add(visit).Entity;
                context.SaveChanges();
                return ResultRequest<Visit>.SetSuccessResult(visit);
            }
            catch (Exception ex)
            {
                return ResultRequest<Visit>.SetErrorResult(ex.Message);
            }
        } 
        #endregion
    }
}
