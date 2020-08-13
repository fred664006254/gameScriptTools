/**
 * 聊天黑名单
 * author dky qianjun
 * date 2018/3/14
 * @class ChatblockView
 */
class ChatblockView extends CommonView
{
   private _scrollList:ScrollList;
   private _dataList :any;
   private _pName:any
   private _countTF:BaseTextField;
	public constructor() 
	{
		super();
	}
	public initView():void
	{
		NetManager.chat.checkAndReConnect();
		let lisetBg = BaseBitmap.create("public_9_bg23");
		lisetBg.width = GameConfig.stageWidth;
		lisetBg.height = GameConfig.stageHeigth - 160;
		lisetBg.x = 0;
		lisetBg.y = -10;
		this.addChildToContainer(lisetBg);

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CANCEBLOCK,this.doCancel,this);


		// let chatList = Api.chatVoApi.getChatBlockVo().list;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 30,GameConfig.stageHeigth - 180);
		this._scrollList = ComponentManager.getScrollList(ChatblockScrollItem,this._dataList,rect);
		this._scrollList.setEmptyTip(LanguageManager.getlocal("chatblockNoBlock"));
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(15,2);

		let num = 0;
		if(Api.chatVoApi.getChatBlockVo().info)
		{
			num = Api.chatVoApi.getChatBlockVo().info.length;
			if(!num)
			{
				num = 0;
			}
		}
		let str = LanguageManager.getlocal("chatblockCount",[num + "/"+50])
		this._countTF = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._countTF.x = this.width/2 - this._countTF.width/2
		this._countTF.y = this.container.y + this.container.height + ((GameConfig.stageHeigth - this.container.y - this.container.height) - this._countTF.textHeight)/2;
		this.addChild(this._countTF);
	}

    protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_CHAT_LIST,requestData:{}};
	}
	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		
		if (data.data.cmd == NetRequestConst.REQUEST_CHAT_LIST) {
			// let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
			this._dataList = data.data.data.list;
			
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_CHAT_UNBLOCK) {
			// let rewardList =  GameData.formatRewardItem(data.data.data.rewards);
			this._dataList = data.data.data.list;
			this._scrollList.refreshData(this._dataList);
			App.CommonUtil.showTip(LanguageManager.getlocal("chatCancelBlockTip",[this._pName]));
			let num = 0;
			if(Api.chatVoApi.getChatBlockVo().info && Api.chatVoApi.getChatBlockVo().info.length)
			{
				num = Api.chatVoApi.getChatBlockVo().info.length;
			}
			let str = LanguageManager.getlocal("chatblockCount",[num + "/"+50])
			this._countTF.text = str;
		}

	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"servant_bottombg",
					"wifeview_bottombg","shield_cn"
					]);
	}


	// protected getTabbarTextArr():Array<string>
	// {
	// 	let tab = ["chatViewTab1Title"];
	// 	if(!Api.switchVoApi.checkOpenShenhe())
	// 	{
	// 		tab.push("chatViewTab2Title");
	// 	}
	// 	return tab
	// }
	// (有页签加锁时，需要重新该方法)检查该页签条件是否满足切换条件
	protected checkTabCondition(index:number):boolean
	{	
		if(index == 1 && Api.playerVoApi.getPlayerAllianceId() == 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoAlliance") );
			return false;
		}
		return true;
	}

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }

	private doCancel(event:egret.Event){
		let data  = event.data;
		this._pName = event.data.name;
		this.request(NetRequestConst.REQUEST_CHAT_UNBLOCK, { fuid:data.uid});
	}

	protected doQuickAlliance()
	{
		this.hide();
		App.CommonUtil.showTip(LanguageManager.getlocal("alliance_beKick"));
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MESSAGE_ALLIANCE_BEKICK,this.doQuickAlliance,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_DINNER_GUIDE,this.doCancel,this);
		this._scrollList = null;
		this._dataList = null;
		this._pName = null;
		super.dispose();
	}
}