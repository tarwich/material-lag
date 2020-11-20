import { lorem, random, name } from 'faker';

const { values } = Object;

type Id = string;

export class Model<TItem> {
  map = {} as Record<Id, TItem>;

  constructor(private generator: (id: Id) => TItem) {}

  private generate(id: Id) {
    const item = this.generator(id);
    this.map[id] = item;

    return item;
  }

  find(predicate: ((item: TItem) => boolean) | Partial<TItem>) {
    if (typeof predicate === 'function') {
      return Object.values(this.map).find((item) => predicate(item));
    }

    return Object.values(this.map).find((item) => {
      return Object.entries(predicate).every((current) => {
        const [key, value] = current as [keyof TItem, any];
        return item[key] === value;
      });
    });
  }

  filter(predicate: ((item: TItem) => boolean) | Partial<TItem>) {
    if (typeof predicate === 'function') {
      return Object.values(this.map).filter((item) => predicate(item));
    }

    return Object.values(this.map).filter((item) => {
      return Object.entries(predicate).every((current) => {
        const [key, value] = current as [keyof TItem, any];
        return item[key] === value;
      });
    });
  }

  generateId() {
    return random.uuid();
  }

  get(id: Id = this.generateId()) {
    return this.map[id] || this.generate(id);
  }
}
type ModelItem<T> = T extends Model<infer U> ? U : never;

export const CourseModel = new Model((courseId) => ({
  courseId,
  name: lorem.sentence(random.number({ min: 3, max: 5 })).slice(0, -1),
}));
export type Course = ModelItem<typeof CourseModel>;

export const ModuleModel = new Model((moduleId) => ({
  moduleId,
  courseId: '',
  name: lorem.sentence(random.number({ min: 1, max: 4 })).slice(0, -1),
  description: lorem.paragraph(1),
}));
export type Module = ModelItem<typeof ModuleModel>;

export enum ActivityType {
  Lesson = 'Lesson',
  Test = 'Test',
}

export const ActivityModel = new Model((activityId) => ({
  activityId,
  moduleId: '',
  name: lorem.sentence(random.number({ min: 2, max: 5 })).slice(0, -1),
  type: random.arrayElement([
    'Lesson',
    'Lesson',
    'Lesson',
    'Lesson',
    'Lesson',
    'Lesson',
    'Lesson',
    'Test'
  ]) as ActivityType,
}));

export type Activity = ModelItem<typeof ActivityModel>;

export const StudentModel = new Model((studentId) => {
  const result = {
    studentId,
    courseId: '',
    firstName: name.firstName(),
    lastName: name.lastName(),
    initials: '',
    color: `hsl(${random.number({ min: 0, max: 36 }) * 10}, 40%, 60%)`,
  };

  result.initials = `${result.firstName[0]}${result.lastName[0]}`;

  return result;
});
export type Student = ModelItem<typeof StudentModel>;

[...new Array(3)].forEach(() => {
  const course = CourseModel.get();

  [...new Array(random.number({ min: 3, max: 5 }))].forEach(() => {
    const module = ModuleModel.get();
    module.courseId = course.courseId;

    [...new Array(random.number({ min: 3, max: 30 }))].forEach(() => {
      const activity = ActivityModel.get();
      activity.moduleId = module.moduleId;
    });
  });

  [...new Array(10)].forEach(() => {
    const student = StudentModel.get();
    student.courseId = course.courseId;
  });
});
