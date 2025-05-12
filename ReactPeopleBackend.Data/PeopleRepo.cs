using Microsoft.EntityFrameworkCore;
using ReactWithBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Data
{
    public class PeopleRepo
    {
        private readonly string _connectionString;

        public PeopleRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetPeople()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void DeletePeople(List<Person> deleteList)
        {
            using var context = new PeopleDataContext(_connectionString);
            foreach (var p in deleteList)
            {
                context.People.Remove(p);
                context.SaveChanges();
            }
        }

        public void UpdatePerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
