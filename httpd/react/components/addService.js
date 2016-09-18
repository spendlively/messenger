var AddService = React.createClass({

	getInitialState: function(){

		var l12n = window.localization,
			data = l12n.getData('addService');

    	return data;
	},

  	componentDidMount: function() {
  		
  		var l12n = window.localization;

  		l12n.registerClass('addService', this);
  	},

	render: function(){

		return (
            <div>
              <h2 id="content-add-services">{this.state.title}</h2>
              <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/slack.svg" />
                      <h5>Slack</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/messenger.svg" />
                      <h5>Messenger</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/whatsapp.svg" />
                      <h5>WhatsApp</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/telegram.svg" />
                      <h5>Telegram</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/skype.svg" />
                      <h5>Skype</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/wechat.svg" />
                      <h5>WeChat</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/hipchat.svg" />
                      <h5>HipChat</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/chatwork.svg" />
                      <h5>ChatWork</h5>
                  </div></div>        
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/flowdock.svg" />
                      <h5>Flowdock</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/hangouts.svg" />
                      <h5>Hangouts</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/groupme.svg" />
                      <h5>GroupMe</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/rocketchat.svg" />
                      <h5>Rocket Chat</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/mattermost.svg" />
                      <h5>Mattermost</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block">
                      <img height="60%" src="services/grape.svg" />
                      <h5>Grape</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/gitter.svg" />
                      <h5>Gitter</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/tweetdeck.svg" />
                      <h5>TweetDeck</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/dingtalk.svg" />
                      <h5>DingTalk</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/steamchat.svg" />
                      <h5>Steam Chat</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/discord.svg" />
                      <h5>Discord</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/mysms.svg" />
                      <h5>MySMS</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/googleinbox.svg" />
                      <h5>Inbox by Gmail</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/googlegmail.svg" />
                      <h5>Gmail</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/outlookdotcom.svg" />
                      <h5>Outlook.com</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/vk.svg" />
                      <h5>VK</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/wire.svg" />
                      <h5>Wire</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/icq.svg" />
                      <h5>ICQ</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/irccloud.svg" />
                      <h5>IRCCloud</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/ciscospark.svg" />
                      <h5>Cisco Spark</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/facebookpages.svg" />
                      <h5>Facebook Page</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/linkedin.svg" />
                      <h5>LinkedId</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/hibox.svg" />
                      <h5>Hibox</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/coupleme.svg" />
                      <h5>Couple.me</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/yahoomessenger.svg" />
                      <h5>Yahoo! Messenger</h5>
                  </div></div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12"><div className="service_block ptr" data-toggle="modal" data-target="#modal-add-service">
                      <img height="60%" src="services/zendesk.svg" />
                      <h5>Zendesk</h5>
                  </div></div>
              </div>            
            </div>
		);
	}
});

ReactDOM.render(
	<AddService />,
	document.getElementById('add-service-target')
);
