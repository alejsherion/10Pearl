using System;
using System.Collections.Generic;
using System.Text;

namespace InfoClients.Data
{
    public sealed class Singleton
    {
        private static Singleton _instance = new Singleton();

        private Singleton() { }

        public static Singleton Instance { get { return _instance; } }

        public string ConnectionString { get; set; }
    }
}
