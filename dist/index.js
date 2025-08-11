"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DB_1 = require("./DB");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const JWT_PASSWORD = "ilovewebd";
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        yield DB_1.User.create({
            username,
            password
        });
        res.json({
            msg: "you succesfully signup"
        });
    }
    catch (e) {
        console.error("An error occured:", e);
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield DB_1.User.findOne({
            username,
            password
        });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id
            }, JWT_PASSWORD);
            res.status(201).json({
                token
            });
        }
        else {
            res.status(404).json({
                msg: "user dosent exist"
            });
        }
    }
    catch (e) {
        console.error("error name: ", e);
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type, title } = req.body;
    try {
        yield DB_1.Content.create({
            link,
            type,
            title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
        res.status(201).json({ msg: "contend added" });
    }
    catch (e) {
        console.error("error is : ", e);
        //@ts-ignore
        console.log(req.userId);
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield DB_1.Content.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        yield DB_1.Content.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });
        res.status(201).json({ msg: "content deleted successfully" });
    }
    catch (e) {
        console.error("error is this: ", e);
    }
}));
app.post("/api/v1/brainly/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    try {
        if (share) {
            const existinglink = yield DB_1.Link.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if (existinglink) {
                res.json({
                    hash: existinglink.hash
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield DB_1.Link.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });
            res.json({
                hash
            });
        }
        else {
            yield DB_1.Link.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            res.json({
                msg: "removed link"
            });
        }
    }
    catch (e) {
        console.error("error is : ", e);
    }
}));
app.get("/api/v1/brainly/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    try {
        const link = yield DB_1.Link.findOne({
            hash
        });
        if (!link) {
            res.status(411).json({
                msg: "sorry incorrect input"
            });
            return;
        }
        const content = yield DB_1.Content.find({
            userId: link.userId
        });
        const user = yield DB_1.User.findOne({
            _id: link.userId
        });
        if (!user) {
            res.status(411).json({
                msg: "user not found ideally not happens"
            });
            return;
        }
        res.json({
            username: user.username,
            content: content,
        });
    }
    catch (e) {
        console.error("error is : ", e);
    }
}));
app.listen(3000);
