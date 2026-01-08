// import { describe, it, expect, beforeEach } from "bun:test";
// import { getAllUsers, getUser, createUser, updateUser, deleteUser, resetUsers } from "../controllers/user_controller.js";

// // Helper to mock Express res
// const createRes = () => {
//   const res = {};
//   res.statusCode = 200;
//   res.body = null;

//   res.status = (code) => { res.statusCode = code; return res; };
//   res.json = (data) => { res.body = data; return res; };
//   return res;
// };

// // Helper to mock req
// const createReq = (params = {}, body = {}) => ({ params, body });

// describe("User Controller Unit Tests", () => {

//   beforeEach(() => {
//     resetUsers();
    
//   });

//   it("should create a user", () => {
//     const req = createReq({}, { name: "Naratt", email: "n@mail.com" });
//     const res = createRes();

//     createUser(req, res);

//     expect(res.statusCode).toBe(201);
//     expect(res.body.name).toBe("Naratt");
//     expect(res.body.id).toBe(1);
//   });

//   it("should get all users", () => {
//     const req = createReq({}, { name: "Naratt", email: "n@mail.com" });
//     const res1 = createRes();
//     createUser(req, res1);

//     const res2 = createRes();
//     getAllUsers({}, res2);

//     expect(res2.body.length).toBe(1);
//   });

//   it("should get user by id", () => {
//     const reqCreate = createReq({}, { name: "Naratt", email: "n@mail.com" });
//     const resCreate = createRes();
//     createUser(reqCreate, resCreate);

//     const req = createReq({ id: "1" });
//     const res = createRes();
//     getUser(req, res);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("Naratt");
//   });

//   it("should update user", () => {
//     const reqCreate = createReq({}, { name: "Old", email: "old@mail.com" });
//     const resCreate = createRes();
//     createUser(reqCreate, resCreate);

//     const req = createReq({ id: "1" }, { name: "New" });
//     const res = createRes();
//     updateUser(req, res);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("New");
//   });

//   it("should delete user", () => {
//     const reqCreate = createReq({}, { name: "ToDelete", email: "d@mail.com" });
//     const resCreate = createRes();
//     createUser(reqCreate, resCreate);

//     const req = createReq({ id: "1" });
//     const res = createRes();
//     deleteUser(req, res);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("User deleted");
//   });

//   it("should return 404 if user not found", () => {
//     const req = createReq({ id: "99" });
//     const res = createRes();
//     getUser(req, res);

//     expect(res.statusCode).toBe(404);
//     expect(res.body.message).toBe("User not found");
//   });

// });

// // import { test, expect } from "bun:test";
// // // import request from "supertest";
// // // import app from "../src/index.js";

// // // List all endpoints with method, path, sample data, expected status
// // const BASE_URL = process.env.API_BASE_URL;
// // const endpoints = [
// //   { method: "get", path: "${BASE_URL}/api/users", data: null, expected: 200 },
// //   { method: "post", path: "${BASE_URL}/api/users/${userId}", data: { name: "Alice" }, expected: 201 }
// // ];

// // // One test function to loop through all endpoints
// // test("All controllers endpoints test", async () => {
// //   for (const ep of endpoints) {
// //     let res;
// //     if (ep.method === "get") {
// //       res = await request(app).get(ep.path);
// //     } else if (ep.method === "post") {
// //       res = await request(app).post(ep.path).send(ep.data);
// //     }
// //     expect(res.status).toBe(ep.expected);
// //   }
// // });
