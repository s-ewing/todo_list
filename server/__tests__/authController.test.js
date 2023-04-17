const request = require("supertest");
const { app } = require("../app");
const User = require("../models/User");
const { connectDB, disconnectDB } = require("../config/db");
const { createNewUser } = require("../controllers/authController");

beforeAll(() => {
  connectDB();
});

afterAll(() => {
  disconnectDB();
});

afterAll(() => {});

describe("createNewUser", () => {
  it("should respond with status 400 if email or password is missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@test.com" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email and password are required");
  });

  it("should respond with status 409 if email already exists", async () => {
    const user = { email: "test@test.com", password: "password" };
    await User.create(user);
    const res = await request(app).post("/auth/register").send(user);
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("An account with that email already exists");
  });

  it("should create a new user and respond with status 201 if email and password are valid", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "new_email@test.com", password: "password" });
    const user = await User.findOne({ email: "new_email@test.com" });
    expect(user).not.toBeNull();
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("New account created");
  });

  it("should call next with an error if user creation fails", async () => {
    const req = { body: {email: "new_email_2@test.com", password: "password" }};

    //stub res and next
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };
    const next = jest.fn();

    const errorMessage = "Error creating new user";
    const mockError = new Error(errorMessage);

    //stub User.create to throw an error
    const mockCreate = jest.spyOn(User, "create");
    mockCreate.mockImplementationOnce(() => {
      throw mockError;
    });

    await createNewUser(req, res, next);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);

    //restore User.create
    mockCreate.mockRestore();
  });
});
