# first-steps-tutorial on react-redux.js

If like me, you felt a bit overwhelmed by all the possibilities offered in the [basic tutorial](https://react-redux.js.org/introduction/basic-tutorial) of react-redux.js, this article is for you. I will break it down and show the workings of react-redux.<br />
I going to code a simple add-to-a-list app. Type a new element in an input and add it to the list that is rendered below. Very simple.<br />
This post assumes you know the basics of react. And of course, react, redux and react-redux modules need to be installed.

## How does it work ?

### Redux

Refer to [Three Principles](https://redux.js.org/introduction/three-principles).

* **[store]**(https://redux.js.org/introduction/three-principles#single-source-of-truth) : where the state is stored as a  object tree.
* **[action]**(https://redux.js.org/introduction/three-principles#state-is-read-only) : an object describing the change to the state.
* **[reducer]**(https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions) : a function that returns the new state.

### React-redux

* **[Provider]**(https://react-redux.js.org/api/provider) : takes the store as props and make it available to the nested component.
* **[Connect]**(https://react-redux.js.org/api/connect) : a function that connects a React component to a Redux store.

## Flow of the data

1. Point of entry : The `App` component that holds the `Provider`. like so :

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

The store is created, with the reducer function as argument which will return the next state given the action. Here I have added a initial entry in the list ('Use Redux') to show that the state from the store was rendered.

2. It shouldn't come as a surprise the `reducer` (then it'll be ... that's right, as said above the action)

```javascript
function reducer(state = [], action) {
    switch (action.type) {
      case "ADD_TODO":
        return state.concat([action.content]);
      default:
        return state;
    }
  }
```

3. the `action`

```javascript
const addTodo = content => ({
  type: "ADD_TODO",
  content
});
```

4. now for the components first let's see how to add content in `ToAdd`

```javascript
class ToAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputStr: ""
    };
  }
  updateInput = input => {
    this.setState({ inputStr: input });
  };

  handleAddTodo = () => {
    this.props.addTodo(this.state.inputStr);
    this.setState({ inputStr: "" });
  };
  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.inputStr}
        />
        <button onClick={this.handleAddTodo}>add</button>
      </div>
    );
  }
}

export default connect(
    null ,
  { addTodo }
)(ToAdd);
```

To show the difference, here is the state of the component which is used to get the input value.
The action creator addTodo is called with the input value as arguments.
Connect() is called and injects the action creator addTodo without subscribing to the store.

5. Lastly the `Display` component. This time we will subscribe to the store to render any changes.

```javascript
const Display = (stuff) => {
    return(
        <div>
            <ol>
                {stuff.state.map((e,id)=>
                    (<li key={id}>{e}</li>)
                )}
            </ol>
            {console.log(stuff)}
        </div>
    );
};

const mapStateToProps = state => {
    return {state};
};

export default connect(mapStateToProps)(Display);
```

We just need to define a special function called mapStateToProps that access the current Redux store state tree. We pass it into the props to the component.

From here, it is easier to understand the need of selectors, multiple reducers and the combineReducers() function.