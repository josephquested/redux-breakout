# redux-breakout
## An introduction to redux
Redux is a powerful tool for **controlling state within react apps**. We're going to build an app that helps you keep track of your family's happiness. They're starting to worry you.

### 1.
Broadly speaking, redux is a *state management tool*. So before we can dive into it, we need some states to manage. Let's make a new react component for our family members called FamilyMember.js:

   `public/components/FamilyMember.js`

Inside of FamilyMember.js, we're going to write some basic code to display in our `render`, including the `name` and `id` of our family member as `props`, and we're going to set their initial `mood` state:

```
// FamilyMember.js

import React from 'react'

export default React.createClass({
  getInitialState: function () {
    return {
      id: this.props.id,
      mood: 'Neutral'
    }
  },

  render () {
    return (
      <div className='family-member'>
        <h2>{this.props.name}</h2>
        <p>Mood: {this.state.mood}</p>
      </div>
    )
  }
})
```
Now over in our App.js render, we're going to add a little code to get our family members displaying on the page. This will involve passing in their name and id as *props*, we'll need those later. Remember to also require in the FamilyMember.js file, we're also gonna need that.

```
// App.js
...
import FamilyMember from './FamilyMember.js'

// you're adding this! ^

export default React.createClass({
  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'/>

        <FamilyMember id={0} name='Mom'/>
        <FamilyMember id={1} name='Dad'/>
        <FamilyMember id={2} name='Daughter'/>
        <FamilyMember id={3} name='Son'/>

        // and these! ^

      </div>
    )
  }
})
```
Now it's time to run `npm start` from your terminal and open `index.html` in your web browser. And, all going well, boom, you've got family members rendering on your page. "What is this magic!?" you ask, "I'm not running a server or anything!" Because of the way we have configured our webpack, you don't need to serve your content on a local host. Webpack bundles everything for us and `index.html` just renders everything it needs from that bundle.

### 2.
So, setting their initial states to neutral was all well and good, but we all know that's a little too good to be true. We need to be able to *change* that state somehow. We're gonna need a few different things here...

1. A button next to each family member, for changing their mood.
1. An array of mood states to cycle though, ie: [Neutral, Depressed, Anguish, Utter Agony]
1. When we click the buttons, we need something to **control our states**...

Something like, Redux!
First, let's get those buttons displaying. Howsabout we create a new react class for that. Something along the lines of:

`public/components/MoodButton.js`

Inside of MoodButton.js, we will write some basic render code that displays an HTML button. Also, when it's clicked, it will perform a function that will be passed in later as a prop.

```
// MoodButton.js

import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className='mood-button'>
        <button onClick={() => this.props.changeMood()}>Change Mood</button>
      </div>
    )
  }
})
```

What's happening in that `onClick`? We're getting an anonymous function to call our props function. That seems kind of unnecessary. I agree, but currently React automatically calls button `onClick` functions when they render for some reason. Wrapping them in an additional anonymous function seems to fix that issue. If you know why, let me know. It's annoying.

Currently that `onClick` is calling `this.props.changeMood()`. That might be a slight issue, given that `changeMood()` doesn't actually exist. So let's create it up in our parent element, `FamilyMember.js`.

```
// FamilyMember.js
...
import MoodButton from './MoodButton.js'

// don't forget to import the button! ^

export default React.createClass({
  ...
  },

  changeMood: function () {
    const moods = [
      'Dead',
      'Dying',
      'Awful',
      'Bad',
      'Neutral',
      'Good',
      'Great',
      'Amazing',
      'Perfect'
    ]
    Ω(moods, this.state.id)
  },

  // you're adding all of this crap ^

  render () {
    return (
      <div className='family-member'>
        <h2>{this.props.name}</h2>
        <p>Mood: {this.state.mood}
        </p>

        <MoodButton changeMood={this.changeMood}/>

        // and adding the button into your render ^

      </div>
    )
  }
})
```
So there's a few things going on here. First off; *WHAT* is that weird `Ω` character and where can I get one?! It's an omega symbol, you philistine, it's an amazing npm package for quick, smart console.logs. It's globally installed on this project, but you can get it for your own personal use at [this delicious location](https://github.com/josephquested/lomega "Ω LOMEGA Ω"). It's called Lomega.

We also add a new function here, called `changeMood`. We make a little `moods` array, (add whatever you want in there, it won't be on the test), and then we Lomega the array. We just want to check to see if our button is working, we'll build the real functionality later.

Finally we add the a `<MoodButton changeMood={this.changeMood}/>` tag into our return function. This means that, for every family member we render, we'll also render their own personal mood button with a `changeMood` *prop*.

Now go to your browser, refresh, and try clicking the buttons. All going well, you should see the `moods` array and the family member id appearing in your developer console. If not, running `npm start` again. It should have automatically re-bundled, but you know how these things are sometimes.

### 3.
I know what you're thinking... where's the goddamn redux already! Let's set that up now. We're going to need to make a **reducer**. You can think of a reducer as the *brain* of a redux app. It receives information (in the form of **actions**), processes them, and then sends back the new state for your application to use. So how does that work?

 Redux has something called a **store**, which is basically a history of previous states. When it receives a new **action**, it compares it to the most recent state in the **store**, and sends back a new, *amended state*. This is the clever part, because it's probably sending back an almost exact *copy* of the previous state, and it only needs to make small changes based on the instructions you gave it in your **action**. Note the word, "**copy**" there. It's very important to understand that states in your store are *immutable*, meaning you can't edit them directly. We make a copy and return it. It's a little more complicated than that, but you can read about that in your own time. Let's get back to the code...

 In your src folder, make a reducer template file like this: `/src/reducer.js`

 ```
// reducer.js

import clone from 'clone'

export default (state, action) => {
  switch (action.type) {

    case 'UPDATE MOOD':
      return state

    default:
      return state
  }
}
 ```
 So, this reducer doesn't actually do anything yet. But let's go through it and try to understand what's happening. First, we're importing `clone`. There are other ways of doing this, but clone is a useful module for duplicating objects. We're going to run our state through the clone just to *make sure* that we aren't mutating our original data at all. I think this step is more precautionary than strictly necessary.

 Next we're exporting a function that takes a state and an action argument. The state is going to be the current state of our app that we pass in, and the action is going to be whatever changes we want to make to that state. Then we run a little switch case. It's a little redundant in this app, because we're only ever going to be feeding it one case. It's a good thing to add to your template though, because if we wanted to add more cases later we're already set up to do so.

### 4.

 Now we need to set up our `index.js` to use our `reducer`. It won't be much good to our app if we haven't plugged it in anywhere.

 ```
// index.js
...
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)

// you're adding these redux variables! ^

const render = () => {
  ReactDOM.render(<App moodStates={store.getState()} store={store}/>,
  document.getElementById('app'))

  // look here! you're passing the store and store.getState() as props! ^
}

store.subscribe(render)

// and this 'score.subscribe' call ^

render()

 ```

So, what's happening here? We're getting a function from redux called `createStore`. Then we're calling it and passing our reducer in as an argument. This basically tells redux, "Hey, you know how you like storing state information in a `store`? Why don't you make a little store for yourself, and here's my instructions for how that store should function".

Next we pass in the `store`, and a function called `getState()` from the store into our `App` react component. This is very important, it lets us update the state of our app based on the most recent state in the store. Also we can pass `action` calls to `store` from inside our `components`. That's how we change our state.

Lastly, we tell our store that it's going to receive it's new instructions from our `render` function, in the form of those `actions` we talked about earlier. Maybe now would be a good time to make one of those actions. It feels like we want to do that over in `FamilyMember.js`, because that's where our `updateMood()` function is. **BUT**, we have a problem. `FamilyMember.js` doesn't know about our store, or our moodStates object. But it needs to so it can make `action` requests. Let's refactor things a little. We'll start by moving our `changeMood()` function up into our `App.js`, that way we don't need to worry about passing our store down into every single component that needs to use it.
In `App.js`, make the following changes:

```
// App.js
...

export default React.createClass({

  changeMood: function (familyMemberId) {
    this.props.store.dispatch({type: 'UPDATE MOOD', state: this.props.moodStates, id: familyMemberId})
  },

  // we're adding this changeMood function, which sends our action! ^

  render () {
    ...
        <FamilyMember id={0} name='Mom' changeMood={this.changeMood} />
        <FamilyMember id={1} name='Dad' changeMood={this.changeMood}/>
        <FamilyMember id={2} name='Daughter' changeMood={this.changeMood}/>
        <FamilyMember id={3} name='Son' changeMood={this.changeMood}/>

        // and we pass the changeMood function as a prop down to our family members ^

    ...
  }
})
```
This is good, we've set up the `changeMood()` function to take our family member id as an argument, and send through a *CHANGE MOOD* type action call to our store. We use `store.dispatch` to do this. `store.dispatch` is what you call when you want to send things to the `reducer`. Now we need to update our `FamilyMember.js` file, because it's job just got a little easier.

```
```

Right now, regardless of what happens, we're just returning the state we were given. That isn't very useful, so let's move some of our functionality around. Now that we have a reducer, we're going to need to shuffle our logic over into it. The thinking behind that is that your `components` should know as little as possible, as much of the time as possible. So when we click on our `changeMood` button, we want all of the thinking to actually be done over in the reducer.
