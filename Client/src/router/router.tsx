import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout, RequireAuth, BaseLayout } from "../components";
import {
  CourseDetailsPage,
  ModulesPage,
  ActivitiesPage,
  LoginPage,
  DashboardPage,
  CoursesPage,
  AddEditCourse,
  ActivitiesAddPage,
} from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="addCourse/:id?" element={<AddEditCourse />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/modules" element={<ModulesPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/courses/:courseId/addActivity" element={<ActivitiesAddPage />} />
      </Route>
    </Route>
  )
);

// Detta kommenteras ut tills vi har en user och kan logga in
// <Route element={<RequireAuth><Layout /></RequireAuth>}>
