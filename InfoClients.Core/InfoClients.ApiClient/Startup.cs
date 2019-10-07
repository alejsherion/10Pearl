using InfoClients.ApiClient.Options;
using InfoClients.Bussiness;
using InfoClients.Bussiness.Contracts;
using InfoClients.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InfoClients.ApiClient
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("Default_CorsPolicy", o =>
                {
                    o.AllowAnyHeader();
                    o.AllowAnyMethod();
                    o.AllowAnyOrigin();
                });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info
                {
                    Title = "InfoClients API",
                    Version = "v1",
                    Description = "Application for administration Information about clients and your visits"
                });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            var dbSetting = new DbSettings();
            Configuration.GetSection(nameof(DbSettings)).Bind(dbSetting);
            Singleton.Instance.ConnectionString = dbSetting.ConnectionString;

            #region Dependency Injection
            services.AddTransient<PearlContext>(s =>
                {
                    return new PearlContext(Singleton.Instance.ConnectionString);
                });

            #region Bussiness
            services.AddTransient<IClientBussinessLogic, ClientBussinessLogic>();
            services.AddTransient<IVisitBussinessLogic, VisitBussinessLogic>();
            services.AddTransient<ISalesRepresentativeBussinessLogic, SalesRepresentativeBussinessLogic>();
            #endregion 
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            var swaggerOptions = new SwaggerOptions();
            Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);

            app.UseSwagger(options => { options.RouteTemplate = swaggerOptions.JsonRoute; });
            app.UseSwaggerUI(options => { options.SwaggerEndpoint(swaggerOptions.UIEndpoint, swaggerOptions.Description); });

            app.UseHttpsRedirection();
            app.UseCors("Default_CorsPolicy");
            app.UseMvc();
        }
    }
}
