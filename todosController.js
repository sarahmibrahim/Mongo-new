const createError = require('http-errors')

let todolist = []
let idno = 0

exports.index = function (req, res) {
  res.send(todolist)
}

exports.create = function (req, res, next) {
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }
  todolist.push({ id: idno, name: req.body.name })
  res.send({ result: true })
  idno++
}

exports.show = function (req, res, next) {
  const todoitem = todolist.find((todo) => todo.id == req.params.id)
  if (!todoitem) {
    return (next(createError(404, "no todo with that id")))
  }
  res.send(todoitem)
}

exports.delete = function (req, res, next) {
  const todoitem = todolist.find((todo) => todo.id == req.params.id)
  if (!todoitem) {
    return (next(createError(404, "no todo with that id")))
  }
  todolist = todolist.filter((todo) => todo.id != req.params.id)
  res.send({ result: true })
}

exports.update = function (req, res, next) {
  const todoitem = todolist.find((todo) => todo.id == req.params.id)
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }
  if (!todoitem) {
    return (next(createError(404, "no todo with that id")))
  }
  tdolist = todolist.map((todo) => {
    if (todo.id == req.params.id) {
      todo.name = req.body.name
    }
    return todo
  })
  res.send({ result: true })
}