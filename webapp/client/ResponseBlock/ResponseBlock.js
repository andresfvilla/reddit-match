import React from 'react';
import {Link} from 'react-router';

class ResponseBlock extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='responseBlock'>
        <div className='errorMessage'>
        {
          (!this.props.response.subreddits) ?
            this.props.response
          :
            null
        }
        </div>
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
          {
            (this.props.response.comments) ?
              this.props.response.comments
            :
              null
          }
        </div>
        Personality profile:
        <div className='personalityProfile'>
          {
            (this.props.response.personality_profile) ?
              JSON.stringify(this.props.response.personality_profile,null,2)
            :
              null
          }
        </div>
      </div>
    );
  }
}

export default ResponseBlock;
