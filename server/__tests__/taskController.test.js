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
  token = null;
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
    const req = {
      body: { title: "test title", description: "test description" },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const errorMessage = "Task creation error";
    const mockError = new Error(errorMessage);

    //stub Task.create
    const mockCreate = jest.spyOn(Task, "create");
    mockCreate.mockImplementationOnce(() => {
      throw mockError;
    });

    await createNewTask(req, res, next);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);

    //restore Task.create
    mockCreate.mockRestore();
  });
});

describe("getTaskByUserId", () => {
  it("should return all tasks belonging to the user", async () => { 
    //One task should be saved in db from the createNewTask test
    const res = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("test title");
  });

  it("should call next with an error if task retrieval fails", async () => {
    const req = {};
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const errorMessage = "Task retrieval error";
    const mockError = new Error(errorMessage);

    //stub Task.find
    const mockCreate = jest.spyOn(Task, "find");
    mockCreate.mockImplementationOnce(() => {
      throw mockError;
    });

    await getTasksByUserId(req, res, next);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);

    //restore Task.create
    mockCreate.mockRestore();
  });
});



