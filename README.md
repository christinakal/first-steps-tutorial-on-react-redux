# first-steps-tutorial on react-redux.js

If like me, you felt a bit overwhelmed by all the possibilities offered in the [basic tutorial](https://react-redux.js.org/introduction/basic-tutorial) of React-redux.js, this article is for you.<br />
I going to code a simple add-to-a-list app. Type a new element in an input and add it to the list that is rendered below. Very simple.<br />
This post assumes you know the basics of Javascript and React. And of course, React, Redux and React-redux modules need to be installed for such a project to work.

## How does it work ?

### The concept

The main idea is to have a single state for the whole app.

* The state is in the Redux **store**.
* To add to the state one must go through two steps (a safety measure).
  * Step one: describe the **action** in an object, the action creator.
  * Step two: given the action, the **reducer** will update the state. It’s just a function that takes state and action as arguments, and returns the next state of the app.

* React-redux is here to help pass the state to the component.

### Vocabulary list

#### Redux

Refer to the [Three Principles](https://redux.js.org/introduction/three-principles).

* [**store**](https://redux.js.org/introduction/three-principles#single-source-of-truth) : where the state is stored as a object tree.
* [**action**](https://redux.js.org/introduction/three-principles#state-is-read-only) : an object describing the change to the state.
* [**reducer**](https://redux.js.org/introduction/three-principles#changes-are-made-with-pure-functions) : a function that returns the new state.

#### React-redux

* [**Provider**](https://react-redux.js.org/api/provider) : takes the store as props and makes it available to the nested components.
* [**connect**](https://react-redux.js.org/api/connect) : a function that connects a React component to the Redux store.

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

2. The `reducer`, as stated before is a simple function that takes the state and the action as arguments. In this example, there is only one action, add to the list. Here our action object has two keys. See next point for further details.

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

3. The `action` is the object with the description of the action (type) and the element of change (content).

```javascript
const addTodo = content => ({
  type: "ADD_TODO",
  content
});
```

4. Now for the presentational components, let's first have a look at `ToAdd`, and how to add content to the state.

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

We have an input for the user to type in, this value is saved in a state belonging to the ToAdd component. On submit, the value is passed to the action creator. To dispatch the action, we use the connect function. As React-redux recommends, I am using the “object shorthand” form. Note: the null argument is to not subscribe to the store. Indeed we are not rendering just yet.

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

We just need to define a special function called mapStateToProps that access the current Redux store state tree. We pass it into the props to the component and well the rest is quite self-explanatory.

# 

*That was quite simple, wasn't it ?*

From here, it should be easier to understand the use of [selectors](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/), multiple reducers and the [combineReducers](https://redux.js.org/api/combinereducers) function and more.

I hope this article was helpful to some.<br />
Happy coding !