
class ChatVo extends BaseVo
{

	// 聊天vo列表
	public chatVoObj:any[] = [];
	//世界聊天
	public worldVoObj:any[] = [];
	//帮会聊天
	public allianceVoObj:any[] = [];
	/*
	* uid 作为唯一标识属性 {
		'10002147' : {
			chattext : {//消息记录
				1 : {message : '', sender : ''},
				2 : {},
			},
			info : 1002147的玩家相关信息
		}
	}
	*/

	private chatSign:any = {};
	private maxL=30;

	public constructor() {
		super();
		if(PlatformManager.checkIsRuLang())
		{
			this.maxL=50;
		}
	}

	public initData(data:any):void
	{
		if(data)
		{
			//判断屏蔽
			// if(LocalStorageManager.get("shield" + data.sender))
			if(Api.chatVoApi.getIsBlock(data.sender))
			{
				return;
			}
			//判断重复
			if(data.sign){
				if(this.chatSign[data.sign]){
					return;
				}
				else
				{
					this.chatSign[data.sign] = true;
				}
			}

			if(data.channel>=10000 && data.channel != Api.playerVoApi.getPlayerAllianceId())
			{
				return;
			}

			if(data.sender != Api.playerVoApi.getPlayerID()){
				//判断刷广告
				let num = 0
				for (var index = 0; index < this.chatVoObj.length; index++) {
					var element = this.chatVoObj[index];
					if(data.sender == element.sender)
					{
						if(data.content.message == element.content.message && !data.content.sinfo){
							num ++;
						}
						else{
							num = 0;
						}
						if(num > 2){
							return;
						}
					}
				}

			}
			
			

			this.chatVoObj.push(data);
			if(this.chatVoObj.length > this.maxL)
			{
				this.chatVoObj.shift();
			}
			if(data.channel < 10000){
				this.worldVoObj.push(data);
				if(this.worldVoObj.length > this.maxL)
				{
					this.worldVoObj.shift();
				}
			}else
			{	
				this.allianceVoObj.push(data);
				if(this.allianceVoObj.length > this.maxL)
				{
					this.allianceVoObj.shift();
				}

			}
			

			let titleStr = LanguageManager.getlocal("chatWorldTitle");
			if(data.channel > 10000){
				titleStr = LanguageManager.getlocal("chatallianceTitle");
			}
			let messageStr = data.content.message;
			if (Api.chatVoApi.isShieldEmoji())
			{
				messageStr = Api.chatVoApi.checkShieldEmoji(messageStr);
				if (messageStr == "")
				{
					messageStr = LanguageManager.getlocal("chatEmojiShield")
				}
			}
			let chatMesaage =titleStr + "<font color="+ TextFieldConst.COLOR_LIGHT_YELLOW +  ">" + data.sendername + "</font>"+ ":" + messageStr;

			Api.chatVoApi.setLastMessage(chatMesaage);
		}
	}

	public dispose():void
	{
		this.chatVoObj = null;
		this.worldVoObj = null;
		this.allianceVoObj = null;
		this.chatSign = {};
	}
}