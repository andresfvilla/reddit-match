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
            <div>
              <p>Matching subreddits:</p>
              <div className='subreddits'>
                {
                  this.props.response.subreddits.map(subreddit => 
                  <div className='subreddit'>
                    <a href={`https://www.reddit.com/r/` + subreddit}>{`/r/` + subreddit}</a>
                  </div>)
                }
              </div>
            </div>
          :
            null
        }
        {
          (this.props.response.comments) ?
            <div>
              <p>Analyzed text:</p>
              <div className='comments'>
                {this.props.response.comments}              
              </div>
            </div>
          :
            null
        }       
        {
          (this.props.response.personality_profile) ?
            <div>
              <p>Redditor personality profile:</p>
              <div className='personalityProfile'>
                {JSON.stringify(this.props.response.personality_profile,null,2)}
              </div>
            </div>
          :
            null
        }
      </div>
    );
  }
}

export default ResponseBlock;
