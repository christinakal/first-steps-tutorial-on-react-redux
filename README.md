# first-steps-tutorial on react-redux.js

If like me, you felt a bit overwhelmed by all the possibilities offered in the [basic tutorial](https://react-redux.js.org/introduction/basic-tutorial) of react-redux.js, this article is for you. I will break it down and show the workings of react-redux.<br />
I going to code a simple add-to-a-list app. Type a new element in an input and add it to the list that is rendered below. Very simple.<br />
This post assumes you know the basics of react. And of course, react, redux and react-redux modules need to be installed.

## How does it work ?

1. The `App` component that holds the `Provider` from React-redux which has the store from redux pass as props and contains the other components. like so :

```javascript
const store = createStore(reducer, ['Use Redux']);

function App() {
  return (
    <Provider store={store}>
      <ToAdd />
      <Display />
      {console.log(store.getState())}
    </Provider>
  );
```

2. 
