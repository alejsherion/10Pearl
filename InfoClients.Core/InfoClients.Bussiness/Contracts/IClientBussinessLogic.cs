using InfoClients.Bussiness.Base;
using InfoClients.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoClients.Bussiness.Contracts
{
    /// <summary>
    /// Bussiness logic of client
    /// </summary>
    public interface IClientBussinessLogic: IBussinessLogic
    {
        /// <summary>
        /// get a client
        /// </summary>
        /// <param name="nit">identification of client</param>
        /// <returns>a client</returns>
        ResultRequest<Client> Get(string nit);
        /// <summary>
        /// List all clients
        /// </summary>
        /// <returns>a list of clients</returns>
        ResultRequest<IEnumerable<Client>> GetAll();
        /// <summary>
        /// Save a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client save</returns>
        ResultRequest<Client> Save(Client client);
        /// <summary>
        /// Update a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client update</returns>
        ResultRequest<Client> Update(Client client);
        /// <summary>
        /// Remove a client 
        /// </summary>
        /// <param name="nit">idetification of client</param>
        /// <returns>validate if remove it</returns>
        ResultRequest<bool> Remove(string nit);
    }
}
