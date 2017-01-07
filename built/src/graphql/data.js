"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const dbTodoList = {
    todos: [
        { id: "0", text: 'Todo 0', completed: false },
        { id: "1", text: 'Todo 1', completed: false }
    ]
};
exports.getTodos = () => {
    return dbTodoList;
};
exports.addTodo = ({ id, text }) => {
    dbTodoList.todos = [
        ...dbTodoList.todos, {
            id: id,
            text: text,
            completed: false
        }
    ];
    return id;
};
exports.toggleTodo = ({ id }) => {
    dbTodoList.todos = dbTodoList.todos.map(todo => {
        if (todo.id !== id) {
            return todo;
        }
        return __assign({}, todo, { completed: !todo.completed });
    });
};
//# sourceMappingURL=data.js.map