# ImmutableJS

We use ImmutableJs to represent our Redux state  

Check out the [official documentation](https://facebook.github.io/immutable-js/) for more information

## Make code base simple and reliable

1. Less defensive programming
1. Enable advanced memoization and change detection with simple logic

## Empower React-Redux

Immutable data structures can be deeply compared in no time. This allows us to
efficiently determine if our components need to rerender since we know if the
`props` changed or not!

## High volume data (few Mbs) - User pure JS instead of ImmutableJS
1. Why does your front end need a lot data?
1. Should we store this kind of data inside Redux state?  

Answer those questions first before removing ImmutableJS  
  
In [React Advanced Performance](https://facebook.github.io/react/docs/advanced-performance.html), they even mention 

```
Immutable-js to the rescue
```

If there's a performance problem with ImmutableJs, I think there might be something wrong with the way you're using it