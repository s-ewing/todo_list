const request = require("supertest");
const mongoose = require("mongoose");
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

describe("updateTask", () => {
  it("should respond with status 400 if title is missing", async () => {
    const task = await Task.findOne({ title: "test title" });
    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        description: "test description",
        status: "incomplete",
      });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Task title is required");
  });

  it("should respond with status 404 if taskId path parameter is invalid", async () => {
    const objectId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/tasks/${objectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "new title",
        description: "new description",
        status: "complete",
      });

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Task not found")
  });

  it("should call next with an error if task update fails", async () => {
    const task = await Task.findOne({ title: "test title" });
    const req = {
      body: {
        title: "new title",
        description: "new description",
        status: "complete",
      },
      params: { taskId: `${task._id}` },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const errorMessage = "Task update error";
    const mockError = new Error(errorMessage);

    //stub Task.findOneAndUpdate
    const mockFindOneAndUpdate = jest.spyOn(Task, "findOneAndUpdate");
    mockFindOneAndUpdate.mockImplementationOnce(() => {
      throw mockError;
    });

    await updateTask(req, res, next);

    expect(mockFindOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);

    //restore Task.create
    mockFindOneAndUpdate.mockRestore();
  });

  it("should respond with status 200 if task is successfully updated", async () => {
    const task = await Task.findOne({ title: "test title" });
    const updatedTask = {
      title: "new title",
      description: "new description",
      status: "complete",
    };
    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTask);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("new title");
    expect(res.body.description).toBe("new description");
    expect(res.body.status).toBe("complete");
  });
});

describe("deleteTask", () => {
  it("should respond with status 404 if taskId path parameter is invalid", async () => {
    const objectId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/tasks/${objectId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "new title",
        description: "new description",
        status: "complete",
      });

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Task not found")
  });

  it("should call next with an error if task deletion fails", async () => {
    const task = await Task.findOne({ title: "new title" });
    const req = {
      params: { taskId: `${task._id}` },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const errorMessage = "Task deletion error";
    const mockError = new Error(errorMessage);

    //stub Task.findOneAndDelete
    const mockFindOneAndDelete = jest.spyOn(Task, "findOneAndDelete");
    mockFindOneAndDelete.mockImplementationOnce(() => {
      throw mockError;
    });

    await deleteTask(req, res, next);

    expect(mockFindOneAndDelete).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);

    //restore Task.create
    mockFindOneAndDelete.mockRestore();
  });

  it("should respond with status 200 if task is successfully deleted", async () => {
    const task = await Task.findOne({ title: "new title" });
    const res = await request(app)
      .delete(`/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted");
  });
})
