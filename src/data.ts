import { lorem, random } from 'faker';

const { values } = Object;

type Id = string;

export class Model<TItem> {
  map = new Map<Id, TItem>();
  /** For TypeScript - Do not use in code */
  dummy: TItem;

  constructor(private generator: (id: Id) => TItem) {}

  private generate(id: Id) {
    const item = this.generator(id);
    this.map.set(id, item);

    return item;
  }

  generateId() {
    return random.uuid();
  }

  get(id: Id = this.generateId()) {
    return this.map.get(id) || this.generate(id);
  }
}
type ModelItem<T> = T extends Model<infer U> ? U : never;

export const CourseModel = new Model((courseId) => ({
  courseId,
  name: lorem.sentence(random.number({ min: 3, max: 5 })),
}));
export type Course = ModelItem<typeof CourseModel>;

export const ModuleModel = new Model((moduleId) => ({
  moduleId,
  name: lorem.sentence(random.number({ min: 1, max: 4 })),
  description: lorem.paragraph(1),
}));
export type Module = ModelItem<typeof ModuleModel>;

export enum ActivityType {
  Lesson,
  Test,
}

export const ActivityModel = new Model((activityId) => ({
  activityId,
  name: lorem.sentence(random.number({ min: 2, max: 5 })),
  type: random.arrayElement(values(ActivityType)) as ActivityType,
}));

export type Activity = ModelItem<typeof ActivityModel>;
