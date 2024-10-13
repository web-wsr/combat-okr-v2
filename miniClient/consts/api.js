export default {
    test: '/api',
    login: '/api/login',
    todo: '/api/todo',
    todoItem: (id) => `/api/todo/${id}`,
    okr: '/api/okr',
    okrItem: (id) => `/api/okr/${id}`,
    objectiveItem: (id) => `/api/objective/${id}`,
    keyresultItem: (id) => `/api/keyresult/${id}`,
    // todo_keyresult关联接口
    todoKeyresultItem: (id) => `/api/todo/${id}/keyresult`
}