import React from 'react';
import {Link} from 'react-router';
import FooterStore from './FooterStore'
import FooterActions from './FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    FooterActions.getTopCharacters();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='devs'>
              <h3 className='lead'><strong></strong></h3>
              <span><a href="https://github.ibm.com/Andres-Villa">@andres.villa</a></span>
              <span><a href="https://github.ibm.com/gamay">@gamay</a></span>
              <span><a href="https://github.ibm.com/loganpatino10">@lopa</a></span>
              <h3 className='lead'><strong></strong></h3>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
