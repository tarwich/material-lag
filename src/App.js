// @ts-check
import React from 'react';
import { CourseMap } from './components/course-map';
import { ActivityModel, CourseModel, ModuleModel, StudentModel } from './data';
import './styles.css';

export default function App() {
  return (
    <CourseMap
      getModules={async (courseId) => {
        return ModuleModel.filter({ courseId });
      }}
      getCourses={async () => {
        return CourseModel.filter(() => true);
      }}
      getActivities={async (moduleId) => {
        return ActivityModel.filter({ moduleId });
      }}
      getStudents={async (courseId) => {
        return StudentModel.filter({ courseId });
      }}
    />
  );
}
