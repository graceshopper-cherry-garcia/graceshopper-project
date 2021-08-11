//action constant
const SET_COUNT = 'SET_COUNT';

//action creator

export const setCount = (count) => {
  return {
    type: SET_COUNT,
    count,
  };
};

//reducer

export default function (state = 0, action) {
  switch (action.type) {
    case SET_COUNT:
      return action.count;
    default:
      return state;
  }
}
