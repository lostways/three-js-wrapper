import TestEntity from "./entities/TestEntity.js";

before(() => {});

beforeEach(() => {});

afterEach(() => {
  sinon.restore();
});

describe("ThreeJSEntity", () => {
  it("should set params", () => {
    let entity = new TestEntity({ foo: "bar" });
    assert.equal(entity.params["foo"], "bar");
  });
  it("should listen for update event", () => {
    const updateSpy = sinon.spy(TestEntity.prototype, "update");
    let entity = new TestEntity();
    entity.object3d.dispatchEvent({ type: "update", delta: 0.1 });
    assert.isTrue(updateSpy.calledOnce);
  });
});
