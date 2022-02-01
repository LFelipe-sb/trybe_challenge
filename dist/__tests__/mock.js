"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchContent = exports.searchTitle = exports.updatePost = exports.incorrectPostId = exports.createPostWithOutContent = exports.createPostWithOutTitle = exports.inputCreatePost = exports.incorrectUserId = exports.userNotExist = exports.passwordEmpty = exports.emailEmpty = exports.inputAuthenticate2 = exports.inputAuthenticate = exports.passwordRequired = exports.passwordLess6 = exports.emailRequired = exports.emailWithName = exports.emailInvalid = exports.displayLess8 = exports.inputCreateUser2 = exports.inputCreateUser = void 0;
exports.inputCreateUser = {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.inputCreateUser2 = {
    "displayName": "Luís Felipe Santos",
    "email": "luisfelipe.sb@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.displayLess8 = {
    "displayName": "Rubens",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.emailInvalid = {
    "displayName": "Rubens Silva",
    "email": "Rubinho",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.emailWithName = {
    "displayName": "Rubens Silva",
    "email": "Rubinho",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.emailRequired = {
    "displayName": "Rubens Silva",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.passwordLess6 = {
    "displayName": "Rubens Silva",
    "email": "rubinho2@gmail.com",
    "password": "12345",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.passwordRequired = {
    "displayName": "Rubens Silva",
    "email": "rubinho2@gmail.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
};
exports.inputAuthenticate = {
    "email": "brett@email.com",
    "password": "123456"
};
exports.inputAuthenticate2 = {
    "email": "luisfelipe.sb@email.com",
    "password": "123456",
};
exports.emailEmpty = {
    "email": "",
    "password": "123456"
};
exports.passwordEmpty = {
    "email": "lewishamilton@gmail.com.com",
    "password": ""
};
exports.userNotExist = {
    "email": "senna@gmail.com",
    "password": "123456"
};
exports.incorrectUserId = 10;
exports.inputCreatePost = {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
};
exports.createPostWithOutTitle = {
    "content": "The whole text for the blog post goes here in this key"
};
exports.createPostWithOutContent = {
    "title": "Latest updates, August 1st"
};
exports.incorrectPostId = 10;
exports.updatePost = {
    "title": "update do outro",
    "content": "content"
};
exports.searchTitle = 'update';
exports.searchContent = 'update';
