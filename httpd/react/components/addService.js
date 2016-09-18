var AddService = React.createClass({

	getInitialState: function(){

		var l12n = window.localization,
			data = l12n.getData('addService');

    	return data;
	},

  	componentDidMount: function() {
  		
  		var l12n = window.localization;

      l12n.registerComponent('addService', this);
  	},

  clickHandler: function(name){

      var me = this,
          config = window.config,
          data = me.getData();

      if(name && data.length){
        for(var d in data){
          if(name == data[d].title){
            config.updateService(data[d]);
            break;
          }
        }
      }
  },

	render: function(){

    var me = this;

    var services = me.getData().map(function(s){

      return (
          <div onClick={function(){me.clickHandler(s.title)}} key={s.title} className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div data-name={s.title} className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
              <img height="60%" src={s.img} />
              <h5>{s.title}</h5>
          </div></div>
      );
    });

		return (
      <div>
        <h2 id="content-add-services">{this.state.title}</h2>
        <div className="row">
          {services}
        </div>            
      </div>
		);
	},

  getData: function(){

    return [
      {
        img: "services/slack.svg",
        title: "Slack",
        url: "https://slack.com/"
      },
      {
        img: "services/messenger.svg",
        title: "Messenger",
        url: "https://www.messenger.com/"
      },
      {
        img: "services/whatsapp.svg",
        title: "WhatsApp",
        url: "https://www.whatsapp.com/"
      },
      {
        img: "services/telegram.svg",
        title: "Telegram",
        url: "https://web.telegram.org/#/login"
      },
      {
        img: "services/skype.svg",
        title: "Skype",
        url: "https://login.skype.com/login"
      },
      {
        img: "services/wechat.svg",
        title: "WeChat",
        url: "https://www.wechat.com/ru/"
      },
      {
        img: "services/hipchat.svg",
        title: "HipChat",
        url: "https://www.hipchat.com/"
      },
      {
        img: "services/chatwork.svg",
        title: "ChatWork",
        url: "http://www.chatwork.com/"
      },
      {
        img: "services/flowdock.svg",
        title: "Flowdock",
        url: "https://www.flowdock.com/"
      },
      {
        img: "services/hangouts.svg",
        title: "Hangouts",
        url: "https://hangouts.google.com/"
      },
      {
        img: "services/groupme.svg",
        title: "GroupMe",
        url: "https://groupme.com/"
      },
      {
        img: "services/rocketchat.svg",
        title: "Rocket Chat",
        url: "https://rocket.chat/"
      },
      {
        img: "services/mattermost.svg",
        title: "Mattermost",
        url: "https://www.mattermost.org/"
      },
      {
        img: "services/grape.svg",
        title: "Grape",
        url: "https://chatgrape.com/"
      },
      {
        img: "services/gitter.svg",
        title: "Gitter",
        url: "https://gitter.im/"
      },
      {
        img: "services/tweetdeck.svg",
        title: "TweetDeck",
        url: "https://tweetdeck.twitter.com/"
      },
      {
        img: "services/dingtalk.svg",
        title: "DingTalk",
        url: "http://www.dingtalk.com/index-b.html"
      },
      {
        img: "services/steamchat.svg",
        title: "Steam Chat",
        url: "https://steamcommunity.com/"
      },
      {
        img: "services/discord.svg",
        title: "Discord",
        url: "https://discordapp.com/"
      },
      {
        img: "services/mysms.svg",
        title: "MySMS",
        url: "https://www.mysms.com/"
      },
      {
        img: "services/googleinbox.svg",
        title: "Inbox by Gmail",
        url: "https://inbox.google.com/"
      },
      {
        img: "services/googlegmail.svg",
        title: "Gmail",
        url: "https://mail.google.com/"
      },
      {
        img: "services/outlookdotcom.svg",
        title: "Outlook.com",
        url: "https://login.live.com/"
      },
      {
        img: "services/vk.svg",
        title: "VK",
        url: "https://vk.com/"
      },
      {
        img: "services/wire.svg",
        title: "Wire",
        url: "https://wire.com/"
      },
      {
        img: "services/icq.svg",
        title: "ICQ",
        url: "https://icq.com/windows/ru"
      },
      {
        img: "services/irccloud.svg",
        title: "IRCCloud",
        url: "https://www.irccloud.com/"
      },
      {
        img: "services/ciscospark.svg",
        title: "Cisco Spark",
        url: "https://www.ciscospark.com/"
      },
      {
        img: "services/facebookpages.svg",
        title: "Facebook Page",
        url: "https://www.facebook.com/"
      },
      {
        img: "services/linkedin.svg",
        title: "LinkedId",
        url: "https://www.linkedin.com/"
      },
      {
        img: "services/hibox.svg",
        title: "Hibox",
        url: "http://www.hibox.tv/"
      },
      {
        img: "services/coupleme.svg",
        title: "Couple.me",
        url: "https://couple.me/"
      },
      {
        img: "services/yahoomessenger.svg",
        title: "Yahoo! Messenger",
        url: "https://messenger.yahoo.com/"
      },
      {
        img: "services/zendesk.svg",
        title: "Zendesk",
        url: "https://www.zendesk.com.ru/"
      }
    ];
  }
});

ReactDOM.render(
	<AddService />,
	document.getElementById('add-service-target')
);
