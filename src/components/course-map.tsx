import { useLocalObservable } from 'mobx-react';
import React from 'react';
import { Course, Module } from '../data';
import { EduPage } from './edu-page';

export type CourseMapProps = {
  getCourses(): Promise<Course[]>;
  getModules(courseId: string): Promise<Module[]>;
};

export const CourseMap = (props: CourseMapProps) => {
  const { getCourses } = props;

  const store = useLocalObservable(() => ({
    courses: [] as Course[],
  }));

  return <EduPage header={'Header'}></EduPage>;
};
