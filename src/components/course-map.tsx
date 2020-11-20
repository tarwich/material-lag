import {
  Avatar,
  Box,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Ballot, MenuBook } from '@material-ui/icons';
import { observer, useLocalObservable } from 'mobx-react';
import React, { Fragment, useEffect } from 'react';
import { Activity, ActivityType, Course, Module, Student } from '../data';
import { useSnackErrors } from '../util/use-snack-errors';
import { EduPage } from './edu-page';
import { HBox } from './h-box';
import { VBox } from './v-box';

type LocalModule = Module & { activities?: Activity[] };

export type CourseMapProps = {
  getCourses(): Promise<Course[]>;
  getModules(courseId: string): Promise<Module[]>;
  getActivities(moduleId: string): Promise<Activity[]>;
  getStudents(courseId: string): Promise<Student[]>;
};

export const CourseMap = observer((props: CourseMapProps) => {
  const { getCourses, getModules, getActivities, getStudents } = props;
  const snackError = useSnackErrors();

  const store = useLocalObservable(() => ({
    courses: [] as Course[],
    selectedCourse: undefined as Course | undefined,
    modules: undefined as LocalModule[] | undefined,
    students: [] as Student[],
  }));

  useEffect(() => {
    (async () => {
      store.courses = await getCourses();
      setSelectedCourse(store.courses[0]);
    })().catch(snackError);
  }, [getCourses]);

  const setSelectedCourse = async (newValue: Course | string) => {
    try {
      const course =
        typeof newValue === 'string'
          ? store.courses.find((other) => other.courseId === newValue)
          : newValue;
      store.selectedCourse = course;

      store.modules = course?.courseId
        ? await getModules(course?.courseId)
        : [];

      for (const module of store.modules) {
        module.activities = await getActivities(module.moduleId);
      }

      store.students = course?.courseId
        ? await getStudents(course?.courseId)
        : [];
    } catch (error) {
      snackError(error);
    }
  };

  return (
    <EduPage
      header={
        <HBox grid gridTemplateColumns="1fr minmax(200px, auto)">
          Course Map
          <Select
            value={store.selectedCourse?.courseId || ''}
            label="Selected Course"
            onChange={(event) => setSelectedCourse(event.target.value as any)}
          >
            {store.courses.map((course) => (
              <MenuItem key={course.courseId} value={course.courseId}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </HBox>
      }
    >
      <VBox grid gridTemplateColumns="auto 1fr auto" alignItems="center">
        {store.modules?.map((module, iModule) => (
          <Fragment key={iModule}>
            <Box gridColumn="1 / -1">
              <Typography variant="h6">
                Module {iModule} : {module.name}
              </Typography>
            </Box>
            {module.activities?.map((activity) => {
              return (
                <Fragment key={activity.activityId}>
                  <ActivityRow activity={activity} students={store.students} />
                  {/* {activity.children.map((child) => (
                    <ActivityRow
                      key={child.idActivity}
                      activity={activityMap.get(child.idActivity)}
                      parent={activity}
                    />
                  ))} */}
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </VBox>
    </EduPage>
  );
});

const ActivityRow = (props: {
  activity: Activity;
  parent?: Activity;
  students?: Student[];
}) => {
  const { activity, students } = props;

  return (
    <Fragment>
      <div>
        <ActivityIcon activity={activity} />
      </div>
      {/* I did the ...width thing becuse the prop isn't recognized by TypeScript, so this circumvents TypeScript's warning */}
      <div>{activity.name}</div>
      <HBox flexWrap="wrap" maxWidth="100%">
        {students?.map((student) => (
          <StudentRecord
            key={student.studentId}
            student={student}
            activity={activity}
          />
        ))}
      </HBox>
    </Fragment>
  );
};

const StudentRecord = (props: { student: Student; activity: Activity }) => {
  const {
    student,
    activity: { type },
  } = props;

  return (
    <span>
      {/* {student.initials} */}

      {/* <Tooltip title={student.name}>
        <span>
          <Avatar style={{ background: student.color }}>
            {student.initials}
          </Avatar>
        </span>
      </Tooltip> */}

      {/* <span>
        <Avatar style={{ background: student.color }}>
          {student.initials}
        </Avatar>
      </span> */}

      <Box display="grid" gridTemplateRows="auto 5px" gridGap="16px">
        <Avatar style={{ background: student.color }}>
          <Tooltip title={`${student.firstName} ${student.lastName}`}>
            <span>{student.initials}</span>
          </Tooltip>
        </Avatar>
        <Box
          display="grid"
          gridTemplateColumns={
            type === ActivityType.Test ? '5fr 3fr 2fr' : '7fr 0fr 3fr'
          }
          gridAutoFlow="column"
        >
          <Box bgcolor="success.main" />
          <Box bgcolor="error.main" />
          <Box bgcolor="#AAA" />
        </Box>
      </Box>

      {/*
      <Box
        title={student.name}
        bgcolor={student.color}
        width="40px"
        height="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontFamily={theme.typography.fontFamily}
        fontSize={theme.typography.pxToRem(20)}
        color={theme.palette.background.default}
        borderRadius="50%"
      >
        {student.initials}
      </Box>
        */}
    </span>
  );
};

const IconTypes = {
  [ActivityType.Lesson]: <MenuBook />,
  [ActivityType.Test]: <Ballot />,
};

export const ActivityIcon = (props: { activity: Activity }) => {
  const { activity } = props;

  const Icon = IconTypes[activity.type] || <span>{activity.type}</span>;

  return (
    <Tooltip title={activity.type}>
      <div>
        <Icon.type {...Icon.props} />
      </div>
    </Tooltip>
  );
};
