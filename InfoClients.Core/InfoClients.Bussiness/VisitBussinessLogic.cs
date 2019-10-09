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
    /// Bussiness logic of visits
    /// </summary>
    public class VisitBussinessLogic: BussinessLogic, IVisitBussinessLogic
    {
        #region Builder
        public VisitBussinessLogic(PearlContext context) : base(context) { }
        #endregion

        #region Methods
        /// <summary>
        /// Lista todas las visitas para las graficas
        /// </summary>
        /// <returns></returns>
        public ResultRequest<IEnumerable<Visit>> GetAll()
        {
            try
            {
                return ResultRequest<IEnumerable<Visit>>.SetSuccessResult(context.Visit.ToList());
            }
            catch (Exception ex)
            {
                return ResultRequest<IEnumerable<Visit>>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// List visits for client
        /// </summary>
        /// <param name="nit">id client</param>
        /// <returns>List of visits</returns>
        public ResultRequest<IEnumerable<Visit>> GetByClient(string nit)
        {
            try
            {
                return ResultRequest<IEnumerable<Visit>>.SetSuccessResult(context.Visit.Where(v => v.ClientNit == nit).OrderByDescending(v => v.VisitDate).ToList());
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

                var client = context.Client.Where(c => c.Nit == visit.ClientNit).FirstOrDefault();
                if (client == null)
                    return ResultRequest<Visit>.SetErrorResult("Client dont exist");

                visit.VisitTotal = (visit.Net * client.VisitPercentage)/100;
                client.AvailableCredit -= visit.VisitTotal;
                if (client.AvailableCredit < 0)
                    return ResultRequest<Visit>.SetErrorResult($"Visit can't registered, client: {visit.Client.Nit} don't have enough credit available");

                context.Client.Update(client);
                visit = context.Add(visit).Entity;
                context.SaveChanges();
                visit.Client = null;
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
