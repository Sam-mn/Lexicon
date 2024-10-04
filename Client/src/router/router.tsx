import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Layout, RequireAuth, BaseLayout } from '../components';
import {
  ActivitiesPage,
  ArtifactsDetailPage,
  CourseDetailsPage,
  CoursesPage,
  DashboardPage,
  LoginPage,
  ModulesPage,
} from '../pages';
import { AssignmentsPage } from '../pages/AssignmentsPage';

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

        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/modules/:moduleId" element={<ModulesPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/assignment" element={<AssignmentsPage />} />
        <Route
          path="/activities/:activityId"
          element={<ArtifactsDetailPage />}
        />
      </Route>
    </Route>
  )
);
