# Sub page
The huge difference between Desktop and Mobile is the `screen`

## Questions

1. In `hotel-search-form`, when users open `check-in`, should we display it inside `modal`?
1. If we display inside modal, how to close it when user press `browser back button`?

## Solutions - Sub page
We create a sub page and a route for it, users can navigate between `hotel-search-form` and `check-in` page easily

```JS
{
  path: '/hotels/modal/check-in',
  name: 'hotel-search-form-check-in',
  getComponent(nextState, cb) {
    System.import('containers/HotelSearchForm/CheckInPicker')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
},
```