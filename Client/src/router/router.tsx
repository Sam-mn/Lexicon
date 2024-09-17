import { createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import { Dashboard, Login, CourseDetails, ModuleDetails, ActivityDetails } from "../pages";
import { Layout } from "../components";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path="/">
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="courses/:courseId" element={<CourseDetails />} />
      <Route path="modules/:moduleId" element={<ModuleDetails />} />
      <Route path="activities/:activityId" element={<ActivityDetails />} />
    </Route>
  )
);
