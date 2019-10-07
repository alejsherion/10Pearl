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
    [Route("Client")]
    public class ClientController: Controller
    {
        #region Members
        private readonly IClientBussinessLogic _clientBussinessLogic;
        #endregion

        #region Builder
        public ClientController(IClientBussinessLogic clientBussinessLogic)
        {
            _clientBussinessLogic = clientBussinessLogic;
        }
        #endregion

        #region Methods
        /// <summary>
        /// get a client
        /// </summary>
        /// <param name="nit">identification of client</param>
        /// <returns>a client</returns>
        [HttpGet]
        [Route("Get")]
        public ResultRequest<Client> Get(string nit) => _clientBussinessLogic.Get(nit);

        /// <summary>
        /// List all clients
        /// </summary>
        /// <returns>a list of clients</returns>
        [HttpGet]
        [Route("GetAll")]
        public ResultRequest<IEnumerable<Client>> GetAll() => _clientBussinessLogic.GetAll();

        /// <summary>
        /// Save a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client save</returns>
        [HttpPost]
        public ResultRequest<Client> Save(Client client) => _clientBussinessLogic.Save(client);

        /// <summary>
        /// Update a client
        /// </summary>
        /// <param name="client">object client</param>
        /// <returns>client update</returns>
        [HttpPut]
        public ResultRequest<Client> Update(Client client) => _clientBussinessLogic.Update(client);

        /// <summary>
        /// Remove a client 
        /// </summary>
        /// <param name="nit">idetification of client</param>
        /// <returns>validate if remove it</returns>
        [HttpDelete]
        public ResultRequest<bool> Remove(string nit) => _clientBussinessLogic.Remove(nit);
        #endregion
    }
}
