using InfoClients.Bussiness.Base;
using InfoClients.Data;
using Microsoft.EntityFrameworkCore;

namespace InfoClients.Bussiness
{
    public class BussinessLogic : IBussinessLogic
    {
        #region Context
        public PearlContext context;
        #endregion

        #region Builder
        public BussinessLogic(PearlContext _context) => context = _context;
        #endregion

        #region IDisposable
        public void Dispose()
        {
            if (context != null)
                context.Dispose();
        } 
        #endregion
    }

    /// <summary>
    /// Object result default
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ResultRequest<T>
    {
        #region Properties
        public bool IsSuccesful { get; private set; }
        public T Result { get; private set; }
        public string Messages { get; private set; } 
        #endregion

        #region Builder
        protected ResultRequest() { }
        #endregion

        #region Public Methods
        public static ResultRequest<T> SetSuccessResult(T Result) => new ResultRequest<T>() { IsSuccesful = true, Result = Result };
        public static ResultRequest<T> SetErrorResult(string Messages) => new ResultRequest<T>() { Messages = Messages }; 
        #endregion
    }
}
