import React from 'react';
import { CourseMap } from './components/course-map';
import { CourseModel, ModuleModel } from './data';
import './styles.css';

export default function App() {
  return (
    <CourseMap
      getModules={async () => {
        ModuleModel.get();
      }}
      getCourses={async () => {
        return [
          //
          CourseModel.get(),
          CourseModel.get(),
          CourseModel.get(),
        ];
      }}
    />
  );
}
