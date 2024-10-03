import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout, RequireAuth, BaseLayout } from "../components";
import {
  ActivitiesAddPage,
  ActivitiesPage,
  AddEditCourse,
  ArtifactsDetailPage,
  CourseDetailsPage,
  CoursesPage,
  DashboardPage,
  DocumentAddPage,
  LoginPage, 
  ModulesPage,
  ModulesAddPage,     
  ParticipantsAddPage,
} from "../pages";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<BaseLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="addCourse/:id?" element={<AddEditCourse />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/modules/:moduleId" element={<ModulesPage />} />
        <Route
          path="/courses/:courseId/addModule"
          element={<ModulesAddPage />}
        />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route
          path="/courses/:moduleId/addActivity"
          element={<ActivitiesAddPage />}
        />
        <Route path="/addDocument/:id?" element={<DocumentAddPage />} />
        <Route path="/courses/:courseId/addParticipant" element={<ParticipantsAddPage />}
        />
        <Route path="/activities/:activityId" element={<ArtifactsDetailPage />} />
      </Route>
    </Route>
  )
);

// Detta kommenteras ut tills vi har en user och kan logga in
// <Route element={<RequireAuth><Layout /></RequireAuth>}>
