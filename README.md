# redux-breakout
## An introduction to redux
Redux is a powerful tool for **controlling state within react apps**. We're going to build an app that helps you keep track of your family's happiness. They're starting to worry you.

### 1.
Broadly speaking, redux is a *state management tool*. So before we can dive into it, we need some states to manage. Let's make a new react component for our family members called `FamilyMember.js`:

   `public/components/FamilyMember.js`

Inside of `FamilyMember.js`, we're going to write some basic code to display in our `render`, including the `name` and `id` of our family member as `props`, and we're going to set their initial `mood` state:

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
Now over in our `App.js` `render()`, we're going to add a little code to get our family members displaying on the page. This will involve passing in their `name` and `id` as *props*, we'll need those later. Remember to also require in the `FamilyMember.js` file, we're also gonna need that.

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
Now it's time to run `npm start` from your terminal and open `index.html` in your web browser. And, all going well, boom, you've got family members rendering on your page. "What is this magic!?" you ask, "I'm not running a server or anything!" Because of the way we have configured our *webpack*, you don't need to serve your content on a local host. Webpack bundles everything for us and `index.html` just renders everything it needs from that bundle.

### 2.
So, setting their initial states to *'Neutral'* was all well and good, but we all know that *'Neutral'* is a little too good to be true. We need to be able to *change* that state somehow. We're gonna need a few different things here...

1. A `button` next to each family member, for changing their `mood`.
1. An `array` of `mood` states to cycle though, ie: *[Neutral, Depressed, Anguish, Utter Agony]*
1. When we click the buttons, we need something to **control our states**...

Something like, Redux!
First, let's get those buttons displaying. Howsabout we create a new react class for that. Something along the lines of:

`public/components/MoodButton.js`

Inside of `MoodButton.js`, we will write some basic `render()` code that displays an HTML `button`. Also, when it's clicked, it will perform a function that will be passed in later as a *prop*.

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

What's happening in that `onClick`? We're getting an anonymous function to call our `props.changeMood()` function. That seems kind of unnecessary. I agree, but currently React automatically calls button `onClick` functions when they render for some reason. Wrapping them in an additional anonymous function seems to fix that issue. If you know why, let me know. It's annoying.

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
So there's a few things going on here. First off; *WHAT* is that weird `Ω` character and where can I get one?! It's an *omega symbol*, you philistine, it's an amazing npm package for quick, smart console.logs. It's globally installed on this project, but you can get it for your own personal use at [this delicious location](https://github.com/josephquested/lomega "Ω LOMEGA Ω"). It's called Lomega.

We also add a new function here, called `changeMood`. We make a little `moods` array, (add any moods you want in there), and then we `lomega` the array. We just want to check to see if our `button` is working, we'll build the real functionality later.

Finally we add the a `<MoodButton changeMood={this.changeMood}/>` tag into our `return()` function. This means that, for every family member we render, we'll also render their own personal mood button with a `changeMood` *prop*.

Now go to your browser, refresh, and try clicking the buttons. All going well, you should see the `moods` array and the family member id appearing in your developer console. If not, try running `npm start` again. It should have automatically re-bundled, but you know how these things are sometimes.

### 3.
I know what you're thinking... *where's the goddamn redux already!* Let's set that up now. We're going to need to make a **reducer**. You can think of a reducer as the *brain* of a redux app. It receives information (in the form of **actions**), processes them, and then sends back the new `state` for your application to use. So how does that work?

 Redux has something called a **store**, which is basically a history of previous states. When it receives a new **action**, it compares it to the most recent state in the **store**, and sends back a new, *amended state*. This is the clever part, because it's probably sending back an almost exact *copy* of the previous state, and it only needs to make small changes based on the instructions you gave it in your **action**. Note the word, "**copy**" there. It's very important to understand that states in your store are *immutable*, meaning you can't edit them directly. We make a copy and return it. It's a little more complicated than that, but you can read about that in your own time. Let's get back to the code...

 In your `src` folder, make a reducer template file like this: `/src/reducer.js`

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

 Next we're exporting a function that takes a `state` and an `action` argument. The state is going to be the current state of our app that we pass in, and the action is going to be whatever changes we want to make to that state. Then we run a little `switch case`. It's a little redundant in this app, because we're only ever going to be feeding it one case. It's a good thing to add to your template though, because if we wanted to add more cases later we're already set up to do so.

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

So, what's happening here? We're getting a function from redux called `createStore`. Then we're calling it and *passing our reducer in as an argument*. This basically tells redux, "Hey, you know how you like storing state information in a `store`? Why don't you make a little store for yourself, and here's my instructions for how that store should process states".

Next we pass in the `store`, and a function called `getState()` from the store into our `App` react component. This is very important, it lets us update the state of our app based on the most recent state in the store. Also we can pass `action` calls to `store` from inside our `components`. That's how we change our state.

Lastly, we tell our store that it's going to receive it's new instructions from our `render` function, in the form of those `actions` we talked about earlier. Maybe now would be a good time to make one of those actions. It feels like we want to do that over in `FamilyMember.js`, because that's where our `updateMood()` function is. **BUT**, we have a problem. `FamilyMember.js` doesn't know about our `store`, or our `moodStates` array. But it needs to if it wants to make `action` requests. Let's refactor things a little. We'll start by moving our `changeMood()` function up into our `App.js`, that way we don't need to worry about passing our store down into every single component that needs to use it.
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
This is good, we've set up the `changeMood()` function to take our family member `id` as an argument, and send through a **CHANGE MOOD** type action call to our store. We use `store.dispatch` to do this. `store.dispatch` is what you call when you want to send `actions` to the `reducer`. Now we need to update our `FamilyMember.js` file, because it's job just got a little easier.

```
// FamilyMember.js
...

export default React.createClass({
  getInitialState: function () {
    ...
  },

  // THE AREA FORMALLY KNOWN AS changeMood()
  // CUT the change mood function. We don't need it here anymore! ^

  render () {
    return (
      ...
        <MoodButton id={this.props.id} changeMood={this.props.changeMood}/>

        // remember!! changeMood is now a *prop* of this class, so make sure to update that here ^
        // and, very importantly, pass down the id of this family member as a prop too
      ...
    )
  }
})

```

Then we need to make a tiny tweak in `MoodButton.js`, just to let it know that now it needs to pass the family member `id` in to the `changeMood()` function.

```
// MoodButton.js
...
export default React.createClass({
  render () {
    ...
        <button onClick={() => this.props.changeMood(this.props.id)}>Change Mood</button>

        // see? we're passing the family member id in now too, don't worry, i'll explain soon ^
    ...
  }
})
```

The reason we had to do this is because when `FamilyMember.js` was handling our `changeMood()` function, it already had a reference to it's `id` in `this.state.id`. So we didn't need to pass that prop down into the button. **BUT**, now our `changeMood()` function exists up in `App.js`, so we need to make sure our family member id can make it up there successfully.

We're getting pretty close to a working app now, we can check to see that our `action` call is functioning properly by putting a `lomega` in our `reducer.js`, like so:

```
// reducer.js
..
export default (state, action) => {
  ...
    case 'UPDATE MOOD':
      Ω('family member id', action.id)
      return state
  ...
}
```

So, as long as nothing has gone terribly wrong, you should now be able to push your buttons and see the family member id displaying in your developer console. Once again, if it's not working, before freaking out, try running `npm start` again.

### 5.

Right now, regardless of what happens, our `reducer` just returns the state it was given. That isn't very useful, so let's move some of our functionality around. Now that we have a `reducer`, we're going to need to shuffle our logic over into it. The thinking behind this is that your `components` should know as little as possible about the rest of your app. So when we click on our `changeMood` button, we want all of the thinking to actually be done over in the reducer. If you still have that `moods` array in your clipboard, swell, otherwise, it's time to write a new moods array in our `reducer.js`, and some other logic:

```
// reducer.js

import clone from 'clone'

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

// adding in that moods array ^

const initialState = ['Neutral', 'Neutral', 'Neutral', 'Neutral']

// defining the initial moods for all our family members ^

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// a little helper function, we'll use to get a random mood ^

export default (state = initialState, action) => {
// we're setting the state default to be our initialState. ES6 rocks! ^

  switch (action.type) {
    case 'UPDATE MOOD':

      let newState = clone(state)
      newState[action.id] = moods[randomNumber(0, moods.length - 1)]
      Ω(`family member ${action.id} is now...`, newState[action.id], '')
      return newState

      // all this stuff is new! it's for assigning our new mood state ^

    default:
      return state
  }
}
```

Alright, so there's a little to digest here. First, we're adding back in our `moods` array.
that's pretty simple. Next we make an `initialState` variable, we'll use that as a starting point for when the `reducer` first starts up. We give our reducer that initial state on the line `export default (state = initialState, action)`, in ES6 we can set a default value for an argument with the `(argument = value)` syntax. That way if no state is passed into our function, it will default to our `initialState` variable.

The real meat of this change is in our `case 'UPDATE MOOD':` section. Here we clone our old state, then use our `action.id` as an *index* in our `newState` array. (`newState[action.id]`) So, in this example `newState[0]` is the index for our Mother's mood. And remember back in our `App.js` we structured our `store.dispatch` call like this: `({type: 'UPDATE MOOD', state: this.props.moodStates, id: familyMemberId})`. So there we're specifying that our `action` has the `type` of `UPDATE MOOD`. *(notice how our switch case works based on 'action.type'? that's no coincidence!)*. We also send through the current state of our app, (more on that later), and we pass in `id: familyMemberId`. That's the really relevant part here, because we're using that to access the desired family member in our `newState` array. (`newState[action.id]`).

Then we *set* the mood of that family member, based on a random mood from our `mood` array. `newState[action.id] = moods[randomNumber(0, moods.length - 1)]`. We use our `randomNumber()` helper function to pick a random index within our accepted range. It's important to note here, I have *nine* moods in my `mood` array. But you could put however many you want in, because it's searching for a random number between *0* and the *length of our array - 1* `randomNumber(0, moods.length - 1)`.

Then finally we `lomega` the family member `id` and their new `mood`. The syntax there might be a little confusing if you're not familiar with `lomega` and ES6 strings. Basically passing in that empty `''` string as the final argument just gives us really nicely spaced console.log output:

```
family member 1 is now...
Bad

family member 2 is now...
Dead

family member 3 is now...
Amazing
```
Then, finally. We return the newState. `return newState`. Feel free to refresh your browser (and maybe `npm start` again), then check out those developer console messages with our family member and their updated mood.

### 6.
We are so close now. There are just a couple more steps to go. Currently our `reducer` is successfully taking in, updating, and pushing back our `moodStates` array into the `App.js` react component. But, as you will notice, it isn't updating our HTML with the new moods. Let's change that now, first in `FamilyMember.js`:

```
// FamilyMember.js
  ...

  getInitialState: function () {
    ...
    }
  },

  // remember our get initial state function here? ^
  // DELETE IT ALL! we're not going to bother with states anymore, because
  // we're passing everything this component needs down as props now


  render () {
    return (
    ...
        <p>Mood: {this.props.mood}

        // one little tweak here ^
        // instead of generating our mood string based on this.state,
        // we're now going to get it directly with this.props.mood

    ...
  }
})

```

Now, this isn't going to work yet. Because currently `FamilyMember.js` doesn't actually *have* a `this.props.mood` prop. Let's change that up in `App.js`:

```
// App.js
...
  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'/>
        <FamilyMember id={0} name='Mom' changeMood={this.changeMood} mood={this.props.moodStates[0]}/>
        <FamilyMember id={1} name='Dad' changeMood={this.changeMood} mood={this.props.moodStates[1]}/>
        <FamilyMember id={2} name='Daughter' changeMood={this.changeMood} mood={this.props.moodStates[2]}/>
        <FamilyMember id={3} name='Son' changeMood={this.changeMood} mood={this.props.moodStates[3]}/>
      </div>
    )
  }
})

```
See what we're doing here? We give each `FamilyMember` component a `mood` prop, and set it by using their `id` as the *index* for our `this.props.moodStates` array. Remember, `moodStates` is actually the `newState` from our redux `store` that we passed in when we rendered the `App` component in `index.js`. It's a little complex, I know. But believe it or not (again, all going well), you should be able to refresh your browser now and it **will probably be a working app**! If so, congratulations! You have made your first redux app. However, that return statement in `App.js` looks a little clumsy, don't you think? Because now, every time we want to add a new family member, we need to add another huge `<FamilyMember id={4} name='Mistress' changeMood={this.changeMood} mood={this.props.moodStates[4]}/>` line. Maybe there's a better way of doing this...

### 7. (optional improvement)

 Try making the following changes in `App.js`:

```
...

export default React.createClass({
  changeMood: function (familyMemberId) {
    ...
  },

  generateFamily: function () {
    const familyMembers = ['Mom', 'Dad', 'Daughter', 'Son', 'Mistress']
    return familyMembers.map((name, index) => {
      return <FamilyMember
      id={index}
      name={name}
      key={index}
      changeMood={this.changeMood}
      mood={this.props.moodStates[index]}/>
    })
  },

  // woah! check out that new function ^

  render () {
    return (
      <div className='app'>
        <Header header='redux breakout'/>
        {this.generateFamily()}

        // now we're passing in the function, instead of the family members ^

      </div>
    )
  }
})

```
Do you see what's happening here? Now, instead of adding the `FamilyMember` components one by one, we're *mapping* through an *array of their names*. The map creates a smartly populated component for us, with all the props we need. Pretty clever.

There's one problem though, if you refresh your browser, you'll notice that our new `mistress` family member has indeed been added, but she doesn't have a `mood`! Why is that? Think about it for a second and see if you can work it out...

Okay, time's up. You failed. It's because over in `reducer.js`, we defined `const initialState = ['Neutral', 'Neutral', 'Neutral', 'Neutral']`. So we've only allowed for *four* family members. That's a problem. There's a sneaky little fix for this though, it's just one line over in `FamilyMember.js`:

```
// FamilyMember.js
...
export default React.createClass({
  render () {
    ...
        <p>Mood: {this.props.mood || 'Neutral'}</p>

        // this line here. We add in an 'OR Neutral' condition ^
    ...
  }
})

```
This is a really simple fix for our problem, but maybe a little iffy. It definitely works, but I imagine that redux purists would be uncomfortable with the fact that
we're using something *other than our redux state* to set the `mood` initially. But redux purists be damned, this is a simple little fix.

Since we're already pissing off those purists, we can get rid of our `initialState` variable over in `reducer.js`, and replace it with an empty array. Like so:

```
// reducer.js
...

// const initialState is no more!

export default (state = [], action) => {

  // we replace initialState with an empty array ^
  ...
}

```
Boom. Now you can add as many new family members as you like, they will all start with a *Neutral* mood, and they can all be updated with their own little mood button. And that, my friends, is that.

  **xoxo**   
  **- joseph quested**
