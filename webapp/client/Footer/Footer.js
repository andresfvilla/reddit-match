import React from 'react';
import {Link} from 'react-router';
import FooterStore from './FooterStore'
import FooterActions from './FooterActions';

var Andres = '../img/andres.jpeg';
var Garrett = '../img/garrett.jpeg';
var Logan = '../img/logan.jpeg';
var Slack = '../img/slack.svg';
var GitHub = '../img/github.png'

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
              <div className='image'>
                <img className='devImage' src={Andres} />
                <div>Andres Villa</div>
                <a className='contactIconContainer' href="slack://user?team=T03EBGYRJ&id=W4ED6QUDB"><img className='contactIcon' src={Slack}/></a>
                <a className='contactIconContainer' href="https://github.ibm.com/Andres-Villa"><img className='contactIcon' src={GitHub}/></a>
              </div>
              <div className='image'>
                <img className='devImage' src={Garrett} />
                <div>Garrett May</div>
                <a className='contactIconContainer' href="slack://user?team=T03EBGYRJ&id=W48E9TFHN"><img className='contactIcon' src={Slack}/></a>
                <a className='contactIconContainer' href="https://github.ibm.com/gamay"><img className='contactIcon' src={GitHub}/></a>
              </div>
              <div className='image'>
                <img className='devImage' src={Logan} />
                <div>Logan Patiño</div>
                <a className='contactIconContainer' href="slack://user?team=T03EBGYRJ&id=W692BLT0D"><img className='contactIcon' src={Slack}/></a>
                <a className='contactIconContainer' href="https://github.ibm.com/loganpatino10"><img className='contactIcon' src={GitHub}/></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
