const request = require("supertest");
const { app } = require("../app");
const User = require("../models/User");
const { connectDB, disconnectDB } = require("../config/db");

beforeAll(() => {
  connectDB();
});

afterAll(() => {
  disconnectDB();
});

describe("handleLogout", () => {
  const testUser = {
    email: "new_test_user@test.com",
    password: "password",
    refreshToken: "test_refresh_token",
  };

  beforeEach(async () => {
    await User.deleteMany({});
    await User.create(testUser);
  });

  it("should clear the refresh token cookie and return 204 if a refresh token is present", async () => {
    const res = await request(app)
      .get("/logout")
      .set("Cookie", `refresh_token=${testUser.refreshToken}`);

    expect(res.status).toBe(204);
    expect(res.headers["set-cookie"][0]).toContain("refresh_token=;");

    const foundUser = await User.findOne({ email: testUser.email });
    expect(foundUser.refreshToken).toBeNull();
  });

  it("should return 204 if no refresh token cookie is present", async () => {
    const response = await request(app).get("/logout");
    expect(response.status).toBe(204);
  });

  it("should clear the refresh token cookie and return 204 if the user with the refresh token is not found", async () => {
    // change the refresh token to an invalid value
    const invalidRefreshToken = "invalidrefreshtoken";
    const response = await request(app)
      .get("/logout")
      .set("Cookie", `refresh_token=${invalidRefreshToken}`);

    expect(response.status).toBe(204);
    expect(response.headers["set-cookie"][0]).toContain("refresh_token=;");

    const foundUser = await User.findOne({ email: testUser.email });
    expect(response.headers['set-cookie'][0]).toContain('refresh_token=;');
  });
});
