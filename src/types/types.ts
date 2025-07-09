export interface UserStory {
  description: string;
  acceptanceCriteria: string[];
}

export interface TestCase {
  id: string;
  description: string;
  scenario: string;
  gherkinSteps: string[];
  expectedResult: string;
}

export interface GherkinStep {
  type: "Given" | "When" | "Then" | "And";
  text: string;
}
