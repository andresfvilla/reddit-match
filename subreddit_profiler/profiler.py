import praw
import json
import urllib
from watson_developer_cloud import PersonalityInsightsV3
from pymongo import MongoClient

def get_subreddit_list(number_of_subreddits=3):
  popular_subreddit_list = []
  for subreddit in reddit.subreddits.popular(limit=number_of_subreddits):
    popular_subreddit_list.append(subreddit)
  return popular_subreddit_list

def get_subreddit_comments(subreddit, number_of_comments=100):
  comment_list = []
  for comment in subreddit.comments(limit=number_of_comments):
    comment_list.append(comment.body)
  return comment_list

def get_profile(comment_list):
  return personality_insights.profile(' '.join(comment_list))

def save_profile(subreddit, profile):
  profiles = db.profiles
  profile_data = {
    'subreddit': subreddit.display_name,
    'profile': profile
  }
  profiles.insert_one(profile_data)

if __name__ == '__main__':

  reddit = praw.Reddit(
    client_id='',
    client_secret='',
    password='',
    user_agent='',
    username=''
  )
  personality_insights = PersonalityInsightsV3(
    version='',
    username='',
    password=''
  )
  client = MongoClient('')
  db = client['subreddit-personalities']

  subreddit_list = get_subreddit_list()
  for subreddit in subreddit_list:
    comment_list = get_subreddit_comments(subreddit)
    profile = get_profile(comment_list)
    save_profile(subreddit, profile)
