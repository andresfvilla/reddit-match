import React from 'react';
import {Link} from 'react-router';

class ResponseBlock extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='responseBlock'>
        {
          (this.props.response.subreddits) ?
            this.props.response.subreddits.map(subreddit => 
            <div className='subreddit'>
              <a href={`https://www.reddit.com/r/` + subreddit}>{`/r/` + subreddit}</a>
            </div>)
          :
            null
        }
        Analyzed comments:
        <div className='comments'>
          {this.props.response.comments}
        </div>
        Personality profile:
        <div className='personalityProfile'>
          {JSON.stringify(this.props.response.personality_profile,null,2)}
        </div>
      </div>
    );
  }
}

export default ResponseBlock;
