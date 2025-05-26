module.exports = {
  OK: (data) => ({
    meta: { status: 200, message: 'OK' },
    data
  }),

  CREATED: (data) => ({
    meta: { status: 201, message: 'Created' },
    data
  }),

  BAD_REQUEST: (message) => ({
    meta: { status: 400, message: 'Bad Request' },
    data: { message }
  }),

  UNAUTHORIZED: (message) => ({
    meta: { status: 401, message: 'Unauthorized' },
    data: { message }
  }),

  FORBIDDEN: (message) => ({
    meta: { status: 403, message: 'Forbidden' },
    data: { message }
  }),

  NOT_FOUND: (message) => ({
    meta: { status: 404, message: 'Not Found' },
    data: { message }
  }),

  CONFLICT: (message) => ({
    meta: { status: 409, message: 'Conflict' },
    data: { message }
  }),

  INTERNAL_SERVER_ERROR: (message) => ({
    meta: { status: 500, message: 'Internal Server Error' },
    data: { message }
  }),
  SUCCESS: (data) => ({
  meta: { status: 200, message: 'Success' },
  data
}),

};
