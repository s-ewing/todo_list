const request = require("supertest");
const { app } = require("../app");
const { connectDB, disconnectDB } = require("../config/db");
const Task = require("../models/Task");
const {
  createNewTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const jwt = require("jsonwebtoken");

let token;

beforeAll(() => {
  connectDB();
  //Generate JWT for testing
  token = jwt.sign("test", process.env.ACCESS_TOKEN_SECRET);
});

afterAll(() => {
  disconnectDB();
});

describe("createNewTask", () => {
  it("should respond with status 400 if title is missing", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "", description: "test description" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Task title is required");
  });

  it("should create a new task and respond with status 201 if title is valid", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "test title", description: "test description" });
    const task = await Task.findOne({
      title: "test title",
      description: "test description",
    });
    expect(task).not.toBeNull();
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Task created");
  });

  it("should call next with an error if task creation fails", async () => {
    const req = {body: { title: "test title", description: "test description" }};
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const errorMessage = "Task creation error";
    const mockError = new Error(errorMessage);

    //stub createTask
    const mockCreate = jest.spyOn(Task, "create");
    mockCreate.mockImplementationOnce(() => {
      throw mockError;
    });

    await createNewTask(req, res, next);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);

    //restore User.create
    mockCreate.mockRestore();
  });
});
