# CSS modules

Visit [CSS Modules](https://github.com/css-modules/css-modules) for more information

## Usage

You can import the CSS modules from a JS module

```JS
import styles from './styles.css';

...

render() {
  return (
    <div className={styles.container}>
      <Link className={styles.hotelsButton} to="/hotels">
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
