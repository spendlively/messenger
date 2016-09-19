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

  clickHandler: function(id){

      var me = this,
          config = window.config,
          data = me.getData();

      if(id && data.length){
        for(var d in data){
          if(id == data[d].id){
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
          <div onClick={function(){me.clickHandler(s.id)}} key={s.id} className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div data-name={s.title} className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
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
        id: "slack",
        url: "https://slack.com/"
      },
      {
        img: "services/messenger.svg",
        title: "Messenger",
        id: "messenger",
        url: "https://www.messenger.com/"
      },
      {
        img: "services/whatsapp.svg",
        title: "WhatsApp",
        id: "whatsApp",
        url: "https://www.whatsapp.com/"
      },
      {
        img: "services/telegram.svg",
        title: "Telegram",
        id: "telegram",
        url: "https://web.telegram.org/#/login"
      },
      {
        img: "services/skype.svg",
        title: "Skype",
        id: "skype",
        url: "https://login.skype.com/login"
      },
      {
        img: "services/wechat.svg",
        title: "WeChat",
        id: "wechat",
        url: "https://www.wechat.com/ru/"
      },
      {
        img: "services/hipchat.svg",
        title: "HipChat",
        id: "hipchat",
        url: "https://www.hipchat.com/"
      },
      {
        img: "services/chatwork.svg",
        title: "ChatWork",
        id: "chatwork",
        url: "http://www.chatwork.com/"
      },
      {
        img: "services/flowdock.svg",
        title: "Flowdock",
        id: "flowdock",
        url: "https://www.flowdock.com/"
      },
      {
        img: "services/hangouts.svg",
        title: "Hangouts",
        id: "hangouts",
        url: "https://hangouts.google.com/"
      },
      {
        img: "services/groupme.svg",
        title: "GroupMe",
        id: "groupme",
        url: "https://groupme.com/"
      },
      {
        img: "services/rocketchat.svg",
        title: "Rocket Chat",
        id: "rocketchat",
        url: "https://rocket.chat/"
      },
      {
        img: "services/mattermost.svg",
        title: "Mattermost",
        id: "mattermost",
        url: "https://www.mattermost.org/"
      },
      {
        img: "services/grape.svg",
        title: "Grape",
        id: "grape",
        url: "https://chatgrape.com/"
      },
      {
        img: "services/gitter.svg",
        title: "Gitter",
        id: "gitter",
        url: "https://gitter.im/"
      },
      {
        img: "services/tweetdeck.svg",
        title: "TweetDeck",
        id: "tweetdeck",
        url: "https://tweetdeck.twitter.com/"
      },
      {
        img: "services/dingtalk.svg",
        title: "DingTalk",
        id: "dingtalk",
        url: "http://www.dingtalk.com/index-b.html"
      },
      {
        img: "services/steamchat.svg",
        title: "Steam Chat",
        id: "steamchat",
        url: "https://steamcommunity.com/"
      },
      {
        img: "services/discord.svg",
        title: "Discord",
        id: "discord",
        url: "https://discordapp.com/"
      },
      {
        img: "services/mysms.svg",
        title: "MySMS",
        id: "mysms",
        url: "https://www.mysms.com/"
      },
      {
        img: "services/googleinbox.svg",
        title: "Inbox by Gmail",
        id: "inboxbygmail",
        url: "https://inbox.google.com/"
      },
      {
        img: "services/googlegmail.svg",
        title: "Gmail",
        id: "gmail",
        url: "https://mail.google.com/"
      },
      {
        img: "services/outlookdotcom.svg",
        title: "Outlook.com",
        id: "outlookcom",
        url: "https://login.live.com/"
      },
      {
        img: "services/vk.svg",
        title: "VK",
        id: "vk",
        url: "https://vk.com/"
      },
      {
        img: "services/wire.svg",
        title: "Wire",
        id: "wire",
        url: "https://wire.com/"
      },
      {
        img: "services/icq.svg",
        title: "ICQ",
        id: "icq",
        url: "https://icq.com/windows/ru"
      },
      {
        img: "services/irccloud.svg",
        title: "IRCCloud",
        id: "irccloud",
        url: "https://www.irccloud.com/"
      },
      {
        img: "services/ciscospark.svg",
        title: "Cisco Spark",
        id: "ciscospark",
        url: "https://www.ciscospark.com/"
      },
      {
        img: "services/facebookpages.svg",
        title: "Facebook Page",
        id: "facebookpage",
        url: "https://www.facebook.com/"
      },
      {
        img: "services/linkedin.svg",
        title: "LinkedIn",
        id: "linkedin",
        url: "https://www.linkedin.com/"
      },
      {
        img: "services/hibox.svg",
        title: "Hibox",
        id: "hibox",
        url: "http://www.hibox.tv/"
      },
      {
        img: "services/coupleme.svg",
        title: "Couple.me",
        id: "coupleme",
        url: "https://couple.me/"
      },
      {
        img: "services/yahoomessenger.svg",
        title: "Yahoo! Messenger",
        id: "yahoomessenger",
        url: "https://messenger.yahoo.com/"
      },
      {
        img: "services/zendesk.svg",
        title: "Zendesk",
        id: "zendesk",
        url: "https://www.zendesk.com.ru/"
      }
    ];
  }
});

ReactDOM.render(
	<AddService />,
	document.getElementById('add-service-target')
);
