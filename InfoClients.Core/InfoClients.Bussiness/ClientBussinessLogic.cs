using InfoClients.Bussiness.Contracts;
using InfoClients.Data;
using InfoClients.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;

namespace InfoClients.Bussiness
{
    /// <summary>
    /// Bussiness logic of client
    /// </summary>
    public class ClientBussinessLogic : BussinessLogic, IClientBussinessLogic
    {

        public ClientBussinessLogic(PearlContext _context) : base(_context) { }

        /// <summary>
        /// get a client
        /// </summary>
        /// <param name="nit">identification of client</param>
        /// <returns>a client</returns>
        public ResultRequest<Client> Get(string nit)
        {
            try
            {
                return ResultRequest<Client>.SetSuccessResult(context.Client.FirstOrDefault(c => c.Nit == nit));
            }
            catch (Exception ex)
            {
                return ResultRequest<Client>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// List all clients
        /// </summary>
        /// <returns>a list of clients</returns>
        public ResultRequest<IEnumerable<Client>> GetAll()
        {
            try
            {
                return ResultRequest<IEnumerable<Client>>.SetSuccessResult(context.Client.ToList());
            }
            catch (Exception ex)
            {
                return ResultRequest<IEnumerable<Client>>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// Get clients chart information
        /// </summary>
        /// <returns></returns>
        public ResultRequest<IEnumerable<dynamic>> GetCliensCharts()
        {
            try
            {
                var clients = context.Client.ToList();
                List<Dictionary<string, string>> dictionary = new List<Dictionary<string, string>>();
                foreach (var client in clients)
                {
                    if (client == null)
                        return ResultRequest<IEnumerable<dynamic>>.SetErrorResult("Client don't exist!");

                    var visits = context.Visit.Where(v => v.ClientNit == client.Nit).ToList();

                    var result = new List<dynamic>();
                    var listVisits = visits.GroupBy(v => $"{v.VisitDate.Month}-{v.VisitDate.Year}")
                                           .Select(v => new { Date = v.Key, VisitTotal = v.Sum(x => x.VisitTotal) })
                                           .ToList();
                    
                    foreach (var lst in listVisits)
                        dictionary.Add(new Dictionary<string, string> { { "Date", lst.Date }, { client.Nit, lst.VisitTotal.ToString() } });
                }

                return ResultRequest<IEnumerable<dynamic>>.SetSuccessResult(dictionary);
            }
            catch (Exception ex)
            {
                return ResultRequest<IEnumerable<dynamic>>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// Get Client chart information
        /// </summary>
        /// <param name="nit">identification number of client</param>
        /// <returns>lista data for chart</returns>
        public ResultRequest<IEnumerable<dynamic>> GetClientChar(string nit)
        {
            try
            {
                var client = context.Client.FirstOrDefault(c => c.Nit == nit);
                if (client == null)
                    return ResultRequest<IEnumerable<dynamic>>.SetErrorResult("Client don't exist!");

                var visits = context.Visit.Where(v => v.ClientNit == nit).ToList();

                var result = new List<dynamic>();
                var listVisits = visits.GroupBy(v => $"{v.VisitDate.Month}-{v.VisitDate.Year}")
                                       .Select(v => new { Date = v.Key, VisitTotal = v.Sum(x => x.VisitTotal) })
                                       .ToList();

                List<Dictionary<string, string>> dictionary = new List<Dictionary<string, string>>();
                foreach (var lst in listVisits)
                    dictionary.Add(new Dictionary<string, string> { { "Date", lst.Date }, { client.Nit, lst.VisitTotal.ToString() } });

                return ResultRequest<IEnumerable<dynamic>>.SetSuccessResult(dictionary);
            }
            catch (Exception ex)
            {
                return ResultRequest<IEnumerable<dynamic>>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// Save a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client save</returns>
        public ResultRequest<Client> Save(Client client)
        {
            try
            {
                client.AvailableCredit = client.CreditLimit;

                client = context.Client.Add(client).Entity;
                context.SaveChanges();

                return ResultRequest<Client>.SetSuccessResult(client);
            }
            catch (Exception ex)
            {
                return ResultRequest<Client>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// Update a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client update</returns>
        public ResultRequest<Client> Update(Client client)
        {
            try
            {
                client.FullName = string.Empty;
                if (!string.IsNullOrEmpty(client.FirstName))
                    client.FullName += client.FirstName;
                if (!string.IsNullOrEmpty(client.SecondName))
                    client.FullName += (string.IsNullOrEmpty(client.FullName) ? "" : " ") + client.SecondName;
                if (!string.IsNullOrEmpty(client.FirstLastName))
                    client.FullName += (string.IsNullOrEmpty(client.FullName) ? "" : " ") + client.FirstLastName;
                if (!string.IsNullOrEmpty(client.SecondLastName))
                    client.FullName += (string.IsNullOrEmpty(client.FullName) ? "" : " ") + client.SecondLastName;

                // Get visits by calculating available credit
                var visits = context.Visit.Where(v => v.ClientNit == client.Nit).ToList();
                if (visits.Count == 0)
                    client.AvailableCredit = client.CreditLimit;
                else
                    client.AvailableCredit = client.CreditLimit - visits.Sum(v => v.Net);

                context.Client.Update(client);
                context.SaveChanges();

                return ResultRequest<Client>.SetSuccessResult(client);
            }
            catch (Exception ex)
            {
                return ResultRequest<Client>.SetErrorResult(ex.Message);
            }
        }

        /// <summary>
        /// Remove a client 
        /// </summary>
        /// <param name="nit">idetification of client</param>
        /// <returns>validate if remove it</returns>
        public ResultRequest<bool> Remove(string nit)
        {
            try
            {
                var client = context.Client.Include(c => c.Visits).FirstOrDefault(c => c.Nit == nit);
                if (client == null)
                    return ResultRequest<bool>.SetErrorResult("Client dont exist");

                if (client.Visits.Count > 0)
                    return ResultRequest<bool>.SetErrorResult("Client have visits, can't delete it");

                context.Remove(client);
                context.SaveChanges();
                return ResultRequest<bool>.SetSuccessResult(true);
            }
            catch (Exception ex)
            {
                return ResultRequest<bool>.SetErrorResult(ex.Message);
            }
        }
    }
}
