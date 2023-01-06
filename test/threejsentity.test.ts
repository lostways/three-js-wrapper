import ThreeJSEntity from "../src/ThreeJSEntity";
import TestEntity from "./entities/TestEntity";
import WrappedThree from "../src/WrappedThree";
import { assert } from "chai";
import { Object3D } from "three";
import * as sinon from "sinon";

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

  it("should create an Object3D", () => {
    let entity = new TestEntity();
    assert.instanceOf(entity.object3d, Object3D);
    assert.equal(entity.object3d.name, "TestEntity");
  });

  it("should listen for update event", () => {
    const updateSpy = sinon.spy(TestEntity.prototype, "update");
    let entity = new TestEntity();
    entity.object3d.dispatchEvent({ type: "update", delta: 0.1 });
    assert.isTrue(updateSpy.calledOnce);
  });
});
