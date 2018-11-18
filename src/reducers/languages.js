export default function languages(state = [], action) {
  switch (action.type) {
    case 'LANGUAGES_LOADED':
      return action.payload;
    default:
      return state;
  }
}
