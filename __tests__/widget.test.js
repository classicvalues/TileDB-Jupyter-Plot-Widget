import { createTestModel } from "../src/utils/createTestModel";

import { DagVisualizeModel } from "../src/widget";

describe("DagVisualizeModel", () => {
  it("Should initialize model", () => {
    const model = createTestModel(DagVisualizeModel);
      expect(model).toBeInstanceOf(DagVisualizeModel);
  });

  it('should be createable with a value', () => {
    const state = { value: 'Foo Bar!' }
    const model = createTestModel(DagVisualizeModel, state);
    expect(model.get('value')).toBe('Foo Bar!');
  });
});
