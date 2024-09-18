import { createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import { Layout, RequireAuth } from "../components";
import {HomePage, CourseDetailsPage, ModulesPage, ActivitiesPage, LoginPage, DashboardPage } from "../pages";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path="/">      
      <Route path="/" element={<HomePage />} />      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="courses/:courseId" element={<CourseDetailsPage />} />
      <Route path="modules/:moduleId" element={<ModulesPage />} />
      <Route path="activities/:activityId" element={<ActivitiesPage />} />
    </Route>
  )
);


// vi behöver ändra till detta sen för RequireAuth
// export const router = createBrowserRouter(
//  createRoutesFromElements(
//      <Route element={<Layout />} path="/">
//        <Route path="/" element={<HomePage />} />
//        <Route path="/login" element={<LoginPage />} />
//        <Route element={<RequireAuth>
//          <Route path="/dashboard" element={<DashboardPage />} />
//          <Route path="courses/:courseId" element={<CourseDetailsPage />} />
//          <Route path="modules/:moduleId" element={<ModulesPage />} />
//          <Route path="activities/:activityId" element={<ActivitiesPage />} />
//        </RequireAuth>} />
//      </Route>
//    )
//  );