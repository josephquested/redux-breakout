Why use `babel-loader` and then use `createClass` instead of `class ... extends`?

It's not the best plan to open the index.html as a file. And it should be `public/index.html`, right? Don't make the user go searching for it. Be explicit. Always. What seems obvious to you won't be obvious to your users at all.

Why not include webpack-dev-server? It's a simple install, and it should just run, right?

```sh
npm i webpack-dev-server -D
```

Then change `package.json`:

```json
"start": "webpack-dev-server --content-base public/",
```

No tests?

In `FamilyMember.js`:

```js
getInitialState: function () {
  return {
    id: this.props.id,
    mood: 'Neutral'
  }
},
```

`id` is a prop. Why add it to the state? Will it change? State is for things that change state, not for immutable data, right?

In `App.js`:

```js
<FamilyMember id={0} name='Mom'/>
<FamilyMember id={1} name='Dad'/>
<FamilyMember id={2} name='Daughter'/>
<FamilyMember id={3} name='Son'/>
```

What is the point of the `id` prop? "We'll need it later" is not a good reason to have it. You're *anticipating* because *you* know what's coming, but your users don't. This is extra and unnecessary information. In general, don't do things until you need to do them. Add the `id` when (and only when) you have a use for it. Not only will it be clearer, but it doesn't teach your users bad habits. (First rule of coding: don't write any code until you have to.)

Similarly, your `index.js` file adds a `render` function for no reason. Again, you're anticipating. But your users have no context for this, so you're asking them to hold this information in their awareness with their questions unanswered until *you* "get around to" answering them. This adds psychic load to your users and gains nothing. Why?

"What is this magic!?" you ask . . .

It's *bad* magic. Opening the `index.html` as a file is not a "trick", it's a bad move. HTML pages are meant to be *served* from HTTP servers, and you should always run a server. In fact, a very good habit is to keep your development environment as close as possible to your production environment. Ideally, they'd be identical. Every difference is a potential source of problems when it's time to deploy, right? If I had a dollar for every programmer hour wasted trying to make code that ran fine in development mode run in production mode, I'd be Bill Gates.

It's not clear to me why either App or MoodButton are React Components. Neither uses lifecycle methods or maintains state. Why not just a pure function? For example:

```js
import React from 'react'

const MoodButton = ({ changeMood }) =>
  <div className='mood-button'>
    <button onClick={changeMood}>Change Mood</button>
  </div>

export default MoodButton
```

Pure functions should be your default mode and you should only upgrade to components when absolutely necessary.

NOTE: React **does not call the `onClick` handler when rendering**, but you might be calling it if you wrote your code like this:

```js
<button onClick={this.props.changeMood()}>Change Mood</button>
```

Whoopsie. Note those naughty (). Do I win some kind of prize?

Again, you are anticipating. This is confusing for students. You've added a nonexistent changeMood function, now you're off to create it. Why not approach it the other direction? First create a function to change the mood and show how it works. *Then* create a button to call it.

It's questionable whether we really need a component for this button, but hey, go for it.

Then there's this:

```js
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
```

This `lomega` library looks pretty cool. Nice work. But this is a redux tutorial, right? So why are you including an unfamiliar library that has nothing to do with redux? Is this about self-promotion or teaching? You have to pick one because they are mutually exclusive. If it's about teaching, then don't introduce unnecessary complexity. I have 20 years experience, but I have zero idea what `Ω(moods, this.state.id)` does in this function or why it's there. So now I have to track down that library on GitHub, and oh, look! Snarkiness in the documentation. This promotes the efficacy of your tutorial how? Teach or show off. You can't do both. And your tutorial only works for Mac users because . . . ?

Your users are not stupid. They are going to see immediately that you are creating obstructions for them in an attempt to amuse yourself. I'm just guessing that this will not create the favorable impression that you might be hoping for. Humor is good, but maybe not at the expense of your readers?

You introduce Redux too soon (or too late, depending on how you see it). You went to the trouble to create a component with state. Then you added a button and a function that did nothing. Now, without having connected it up in the passed-prop manner, you jump into Redux and creating a reducer and store, but then you're passing that through props and uh WTF? OK, I'm confused. Bet your readers are, too.

Wouldn't it be better to establish the entire props/state method first, explaining why you are maintaining state at the top level and passing the state and the callbacks down through the component tree *first*, and then show how Redux provides a better alternative?

Or you could skip doing it the "wrong" way first and just build it with Redux from the start. For example:

1. Create a reducer, explaining what it does and showing how you can maintain and update state in a pure fashion.
2. Modify your reducer to handle individual family members and moods.
3. Show how you can import Redux and use the `createStore` method to change your reducer function to a store that provides `getState`, `dispatch`, and `subscribe` methods.
4. Build a *single* component in React that gets the state and updates it on a click.
5. Refactor it to have a subcomponent that uses props and a click handler.
6. Refactor it further. Maybe move the store to the context, then add a Provider component to wrap it.

Don't write any code until it makes sense to write it.

That should be enough to get you started (if you haven't lost interest yet). You have the beginnings of a good tutorial here if you just exercise a bit of discipline and keep your (ostensible) goal of *teaching* foremost in mind. Murder all your darlings, right? (Google it, you Philistine . . . yes?)



