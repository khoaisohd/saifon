# CSS modules

Check out [CSS Modules](https://github.com/css-modules/css-modules) for more information

## Usage

Import and use CSS modules from a JS module

```CSS
.hotelIcon {
  display: block;
  font-size: 50px;
  margin-left: 10px;
  margin-top: 10px;
  composes: icon-commerical-building from 'styles/wego-icons.css';
}
```

```JS
import styles from './styles.css';

...

render() {
  return (
    <div>
      <Link to="/hotels">
        <i className={styles.hotelIcon} />
        Hotels
      </Link>
    </div>
  );
}
```

## Clean, clear and readable CSS code

CSS modules solve the problem of naming collision, encapsulation and better management of style composition  
  

```JSX
<div>
  <div className={styles.toolbar}>
    <div>
      Where
      <i className={appStyles.cancelIcon} onClick={this.context.router.goBack} />
    </div>
  </div>
  <div className={styles.inputContainer}>
    <input autoFocus className={styles.input} placeholder="Choose location" onChange={this.handleInputChange.bind(this)} />
  </div>
  <div>
    {this.state.locations.map(location =>
      (<div className={styles.location} key={location.code} onClick={() => this.handleSelectLocation(location)}>
        <span className={styles.locationCode}>{location.code}</span>
        <strong className={styles.locationName}>{location.name}</strong>
      </div>)
    )}
  </div>
</div>
```
