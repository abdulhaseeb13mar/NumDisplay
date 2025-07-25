/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
  namespace jest {
    interface Matchers<R = void>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}
