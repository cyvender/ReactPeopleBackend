using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleBackend.Data;
using ReactPeopleBackend.Web.Models;
using ReactWithBackend.Data;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            return repo.GetPeople();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("deletepeople")]
        public void DeletePeople(DeleteViewModel dvm)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePeople(dvm.DeleteList);
        }

        [HttpPost]
        [Route("updateperson")]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.UpdatePerson(person);
        }
    }
}
