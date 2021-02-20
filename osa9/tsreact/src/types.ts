
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface PartExtension extends CoursePartBase {
  description: string
}

interface CoursePartOne extends PartExtension {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends PartExtension {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface SuperCourses extends PartExtension {
  name: 'My super course'
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | SuperCourses;
