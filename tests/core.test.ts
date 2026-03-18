import { describe, it, expect } from "vitest";
import { Coassist } from "../src/core.js";
describe("Coassist", () => {
  it("init", () => { expect(new Coassist().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Coassist(); await c.detect(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Coassist(); await c.detect(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
