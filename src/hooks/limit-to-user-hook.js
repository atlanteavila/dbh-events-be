// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { id: userId } = context?.params?.user;
    const { method, app } = context;

    if (method === 'create') {
      context.data.userId = userId;
    }
    
    return context;
  };
};
