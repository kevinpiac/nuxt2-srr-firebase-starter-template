export default {
  async getAll() {
    return Promise.resolve([
      {
        name: 'bubble',
        id: '1',
      },
      {
        name: 'another',
        id: '2',
      },
      {
        name: 'lucky',
        id: '3',
      },
    ]);
  },
};
