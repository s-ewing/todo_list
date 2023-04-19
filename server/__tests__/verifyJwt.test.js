const request = require("supertest");
const jwt = require("jsonwebtoken");
const { app } = require("../app");
const verifyJwt = require("../middleware/verifyJwt");

describe("verifyJwt", () => {
  it("should return 401 if authorization header is missing", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(401);
  });

  it("should return 403 if token is invalid", async () => {
    const response = await request(app)
      .get("/tasks")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(403);
    expect(response.body.message).toEqual("Invalid token");
  });

  it("should add userId to req object and call next if token is valid", () => {
    const mockUserId = "mockUserId";
    const mockToken = jwt.sign({ mockUserId }, process.env.ACCESS_TOKEN_SECRET);
    const mockNext = jest.fn();
    const mockReq = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    };
    const mockRes = {};
    const mockDecodedToken = {
      userId: mockUserId,
    };

    jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, mockDecodedToken);
    });

    verifyJwt(mockReq, mockRes, mockNext);

    expect(mockReq.userId).toEqual(mockUserId);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
