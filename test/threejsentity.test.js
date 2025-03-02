import ThreeJSEntity from "ThreeJSEntity";
import TestEntity from "./entities/TestEntity.js";
import WrappedThree from "WrappedThree";
import { assert } from "chai";
import * as sinon from "sinon";

before(() => {});

beforeEach(() => {});

afterEach(() => {
  sinon.restore();
});

describe("ThreeJSEntity", () => {
  it("should be an instance of ThreeJSEntity", () => {
    let entity = new TestEntity();
    assert.instanceOf(entity, ThreeJSEntity);
  });

  it("should set params", () => {
    let entity = new TestEntity({ foo: "bar" });
    assert.equal(entity.params["foo"], "bar");
  });

  it("should create an Object3D", () => {
    let entity = new TestEntity();
    assert.instanceOf(entity.object3d, WrappedThree.Object3D);
    assert.equal(entity.object3d.name, "TestEntity");
  });

  it("should listen for update event", () => {
    const updateSpy = sinon.spy(TestEntity.prototype, "update");
    let entity = new TestEntity();
    entity.object3d.dispatchEvent({ type: "update", delta: 0.1 });
    assert.isTrue(updateSpy.calledOnce);
  });
});
