using Bogus;
using LMS.API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Data
{
    public static class SeedData
    {
        public static async Task SeedDataAsync(this IApplicationBuilder builder)
        {
            using (var scope = builder.ApplicationServices.CreateScope())
            {
                var servicesProvider = scope.ServiceProvider;
                var db = servicesProvider.GetRequiredService<LmsContext>();

                await db.Database.MigrateAsync();

                if (await db.Courses.AnyAsync()) return;

                try
                {
                    var courses = GenerateCourses(5);
                    await db.AddRangeAsync(courses);
                    await db.SaveChangesAsync();

                    var modules = GenerateModules(courses);
                    await db.AddRangeAsync(modules);
                    await db.SaveChangesAsync();
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }

        private static IEnumerable<Course> GenerateCourses(int nrOfCourses)
        {
            var courseFaker = new Faker<Course>("sv")
                .RuleFor(c => c.CourseName, f => GenerateCourseName(f))
                .RuleFor(c => c.StartDate, f => f.Date.Future())
                .RuleFor(c => c.Description, f => f.Lorem.Paragraph());

            return courseFaker.Generate(nrOfCourses);
        }

        static string GenerateCourseName(Faker f)
        {
            string subject = string.Join(" ",f.Random.WordsArray(3));
            double[] creditOptions = { 3, 7.5, 15, 30 };
            double credits = f.PickRandom(creditOptions);
            string courseCode = $"{f.Random.String2(2, "ABCDEFGHIJKLMNOPQRSTUVXYZ")}{f.Random.Number(100, 9999)}";

            return $"{subject}, {credits} hp ({courseCode})";
        }

        private static IEnumerable<Module> GenerateModules(IEnumerable<Course> courses)
        {
            var modules = new List<Module>();

            foreach (var course in courses)
            {
                var moduleFaker = new Faker<Module>("sv")
                    .RuleFor(m => m.ModuleName, f => f.Lorem.Words(3))
                    .RuleFor(m => m.Description, f => f.Lorem.Paragraph())
                    .RuleFor(m => m.StartDate, f => f.Date.Between(course.StartDate, course.StartDate.AddMonths(2)))
                    .RuleFor(m => m.EndDate, (f, m) => f.Date.Between(m.StartDate, m.StartDate.AddMonths(1)))
                    .RuleFor(m => m.CourseId, course.Id);
            }
            return modules;
        }
    }
}
