const STATUS = {
  OK: {
    tag: '[OK]',
    code: 200
  },
  CREATED: {
    tag: '[CREATED]',
    code: 201
  },
  BAD_REQUEST: {
    tag: '[BAD REQUEST]',
    code: 400,
  },
  NOT_FOUND: {
    tag: '[NOT FOUND]',
    code: 404,
  },
  INTERNAL_ERROR: {
    tag: '[INTERNAL ERROR]',
    code: 500
  },
};

module.exports = {
  STATUS,
}