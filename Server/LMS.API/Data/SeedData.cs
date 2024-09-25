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
                .RuleFor(c => c.CourseName, f => GenerateCourseName(f));

            var fakeCourse = courseFaker.Generate();

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
    }
}
