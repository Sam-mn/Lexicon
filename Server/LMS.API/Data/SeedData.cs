﻿using Bogus;
using LMS.API.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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

                //IMPORTANT: For testing purposes, this will always delete any module DB you create via postman, make sure you dont add any you want to save
                try
                {
                    if (!await db.Courses.AnyAsync())
                    {
                        var courses = GenerateCourses(5);
                        await db.AddRangeAsync(courses);
                        await db.SaveChangesAsync();
                    }

                    if (!await db.Module.AnyAsync())
                    {
                        var existingCoursesList = await db.Courses.ToListAsync();
                        var generatedModules = GenerateModules(existingCoursesList).Take(5);
                        await db.AddRangeAsync(generatedModules);
                        await db.SaveChangesAsync();
                    }

                    if (!await db.ActivityType.AnyAsync())
                    {
                        var generatedActivityTypes = GenerateActivityTypes();
                        await db.AddRangeAsync(generatedActivityTypes);
                        await db.SaveChangesAsync();
                    }

                    if (!await db.Activity.AnyAsync())
                    {
                        var currentModulesList = await db.Module.ToListAsync();
                        var activityTypesList = await db.ActivityType.ToListAsync();
                        var generatedActivities = GenerateActivities(currentModulesList, activityTypesList);
                        await db.AddRangeAsync(generatedActivities);
                        await db.SaveChangesAsync();
                    }

                    var existingCourses = await db.Courses.ToListAsync();

                    var modules = GenerateModules(existingCourses).Take(5);
                    await db.AddRangeAsync(modules);
                    await db.SaveChangesAsync();

                    var existingModules = await db.Module.ToListAsync();
                    var activityTypes = await db.ActivityType.ToListAsync();

                    var activities = GenerateActivities(existingModules, activityTypes);
                    await db.AddRangeAsync(activities);
                    await db.SaveChangesAsync();


                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error while seeding DB: {ex.Message}");
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

                    .RuleFor(m => m.ModuleName, f => CultureInfo.CurrentCulture.TextInfo.ToTitleCase(string.Join(" ", f.Lorem.Words(3))))
                    .RuleFor(m => m.Description, f => f.Lorem.Sentence())
                    .RuleFor(m => m.StartDate, f => f.Date.Between(course.StartDate, course.StartDate.AddMonths(2)))
                    .RuleFor(m => m.EndDate, (f, m) => f.Date.Between(m.StartDate, m.StartDate.AddMonths(1)))
                    .RuleFor(m => m.CourseId, course.Id);

                var module = moduleFaker.Generate();
                modules.Add(module);
            }
            return modules;
        }


        private static IEnumerable<Activity> GenerateActivities(IEnumerable<Module> modules, List<ActivityType> activityTypes)
        {
            var activitiesList = new List<Activity>();

            foreach (var module in modules)
            {
                var activityFaker = new Faker<Activity>("sv")

                    .RuleFor(a => a.Name, f => f.Lorem.Word())
                    .RuleFor(a => a.StartTime, f => f.Date.Between(module.StartDate, module.EndDate))
                    .RuleFor(a => a.EndTime, (f, a) => f.Date.Between(a.StartTime, a.StartTime.AddDays(1)))
                    .RuleFor(a => a.ModuleId, module.Id)
                    .RuleFor(a => a.ActivityTypeId, f => f.PickRandom(activityTypes).Id);

                activitiesList.AddRange(activityFaker.Generate(3));
            }
            return activitiesList;
        }

        private static IEnumerable<ActivityType> GenerateActivityTypes()
        {
            var activityTypeFaker = new Faker<ActivityType>()
                .RuleFor(at => at.ActivityTypeName, f => f.PickRandom("Lecture", "Assignment", "Quiz", "Workshop"))
                .RuleFor(at => at.Type, f => f.Lorem.Word())
                .RuleFor(at => at.Description, f => f.Lorem.Sentence());

            return activityTypeFaker.Generate(4);
        }
    }
}
