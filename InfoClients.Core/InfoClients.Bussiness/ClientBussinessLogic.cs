using System;
using System.Collections.Generic;
using System.Linq;
using InfoClients.Bussiness.Contracts;
using InfoClients.Data;
using InfoClients.Data.Models;

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
        /// Save a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client save</returns>
        public ResultRequest<Client> Save(Client client)
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Update a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client update</returns>
        public ResultRequest<Client> Update(Client client)
        {
            throw new System.NotImplementedException();
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
                var client = context.Client.FirstOrDefault(c => c.Nit == nit);
                if (client == null)
                    return ResultRequest<bool>.SetErrorResult("Client dont exist");
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
