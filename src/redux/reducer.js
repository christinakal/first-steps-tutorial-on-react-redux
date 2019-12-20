export default function(state = [], action) {
    switch (action.type) {
      case "ADD_TODO":
        return state.concat([action.content]);
      default:
        return state;
    }
  }