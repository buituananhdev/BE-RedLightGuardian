export default (status, message, data, meta) => {
  const response = {
    'status': status == 1 ? 'success' : 'failure'
  };

  if (data) {
    response['data'] = data;
  }

  if (meta) {
    response['meta'] = meta;
  } else if (!data) {
    response['message'] = message;
  }

  return response;
};
