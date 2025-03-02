import WrappedThree from "WrappedThree";
import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { assert } from "chai";

before(() => {});

beforeEach(() => {});

afterEach(() => {});

describe("WrappedThree", () => {
  it("should have Object3D", () => {
    assert.exists(WrappedThree.Object3D);
    assert.equal(WrappedThree.Object3D, Object3D);
  });

  it("should have OrbitControls", () => {
    assert.exists(WrappedThree.OrbitControls);
    assert.equal(WrappedThree.OrbitControls, OrbitControls);
  });

  it("should have GLTFLoader", () => {
    assert.exists(WrappedThree.GLTFLoader);
    assert.equal(WrappedThree.GLTFLoader, GLTFLoader);
  });
});
