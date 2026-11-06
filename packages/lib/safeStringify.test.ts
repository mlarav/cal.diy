import { describe, expect, it } from "vitest";
import { safeStringify } from "./safeStringify";

describe("safeStringify", () => {
  it("redacts Authorization headers at any depth and in any case", () => {
    const output = safeStringify({
      error: {
        config: { headers: { Authorization: "Bearer secret-token" } },
        response: { config: { headers: { authorization: "Bearer secret-token" } } },
      },
      credentialId: 1,
    });

    expect(output).not.toContain("secret-token");
    expect(output).toContain('"credentialId":1');
  });
});
