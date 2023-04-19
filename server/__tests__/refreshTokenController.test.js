const request = require("supertest");
const { app } = require("../app");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { connectDB, disconnectDB } = require("../config/db");

let userId;
let refreshToken;

beforeAll(async () => {
  connectDB();
  const testUser = new User({
    email: "testuser@example.com",
    password: "testpassword",
  });
  await testUser.save();
  userId = testUser._id.toString();
  refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
  testUser.refreshToken = refreshToken;
  await testUser.save();
});

afterAll(async () => {
  await User.deleteMany({});
  disconnectDB();
});

describe("handleRefreshToken", () => {
  it("should return 401 if the refresh token is not provided", async () => {
    const response = await request(app).get("/refresh");
    expect(response.status).toBe(401);
  });

  it("should return 403 if the user with the refresh token is not found", async () => {
    const invalidRefreshToken = "invalidrefreshtoken";
    const response = await request(app)
      .get("/refresh")
      .set("Cookie", `refresh_token=${invalidRefreshToken}`);

    expect(response.status).toBe(403);
  });

  it("should return 403 if the refresh token is invalid", async () => {
    const invalidRefreshToken = jwt.sign({ userId }, "wrongsecret");
    const response = await request(app)
      .get("/refresh")
      .set("Cookie", `refresh_token=${invalidRefreshToken}`);

    expect(response.status).toBe(403);
  });

  it('should return a new access token if the refresh token is valid', async () => {
    const response = await request(app)
      .get('/refresh')
      .set('Cookie', `refresh_token=${refreshToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');

    const accessToken = response.body.accessToken;
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    expect(decodedAccessToken).toHaveProperty('userId', userId);
  });
});
