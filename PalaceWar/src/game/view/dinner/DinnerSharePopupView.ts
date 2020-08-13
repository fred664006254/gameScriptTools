

class DinnerSharePopupView extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _stype:number = 0;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{	
		if (this.param.data.stype==1)
		{
			return "dinner_share";
		}
		else
		{
			return "sharePopupViewTitle";
		}
	}

	protected initView():void
	{	
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		this._stype = this.param.data.stype;

		let btnArray:string[] = ["share_to_world"];
		if (Api.playerVoApi.getPlayerAllianceId() > 0) {
			btnArray.push("share_to_alliance");
		}

		for (let i:number = 0; i < btnArray.length; i++)
		{
			let item:BaseDisplayObjectContainer = this.getItem(btnArray[i],i);
			item.setPosition(this.viewBg.width/2-item.width/2, 40 + i * 82+18);
			this.addChildToContainer(item);
		}

	}

	private getItem(text:string,idx:number):BaseDisplayObjectContainer
	{
		let container = new BaseDisplayObjectContainer();
		let itemBg = BaseBitmap.create("public_9_bg28");
		itemBg.width = 500;
		container.addChild(itemBg);

		let extendTf  = ComponentManager.getTextField(LanguageManager.getlocal(text),TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		extendTf.x = container.width/2 - extendTf.width/2;
		extendTf.y = container.height/2 - extendTf.height/2;
		container.addChild(extendTf);

		itemBg.addTouch(this.eventHandler,this,[idx,itemBg]);	
		
		return container;
	}

	private doShareDinner(idx:number):void
	{	


		let data: any = {};
        data.type = "chat";
		if (idx == 0) {
			 data.channel = 1;
		}
		else {
			 data.channel = Api.playerVoApi.getPlayerAllianceId();
		}
        data.sender = Api.playerVoApi.getPlayerID();
        data.sendername = Api.playerVoApi.getPlayerName();;
        data.recivername = "";

		let kinget:number = 0;
		if (Api.promoteVoApi.isKing())
		{
			kinget = Api.promoteVoApi.getKingEndtime();
		}
        
        data.ts = GameData.serverTime;
        data.zoneid = ServerCfg.selectServer.zid;


		let message:string = "";
		let sinfo:any = {};
		let childId:string = "";
		if (this._stype == 1)
		{
			// if(GameData.serverTime - Api.dinnerVoApi.lastShareTime[idx] < 5)
			// {
			// 	App.CommonUtil.showTip(LanguageManager.getlocal("chatTimeTip"));
			// 	return;
			// }
			// Api.dinnerVoApi.lastShareTime[idx] = GameData.serverTime;

			let num = this.param.data.num;
			let typeStr:string = LanguageManager.getlocal("dinnerTitle"+[Api.dinnerVoApi.getDtype().toString()]);
			let totalNum:number = Config.DinnerCfg.getFeastItemCfg(Api.dinnerVoApi.getDtype()).contain;
			let seatStr:string =  LanguageManager.getlocal("dinner_seat_num",[String(num),String(totalNum)]);
			
			message = LanguageManager.getlocal("dinner_share_text",[typeStr]);
			sinfo = {dtype:Api.dinnerVoApi.getDtype(),info:[typeStr,seatStr],et:Api.dinnerVoApi.getEndTime()};
		}
		else if (this._stype == 2)
		{	
			
			message = LanguageManager.getlocal("chat_share_text2",[String(this.param.data.exp)]);

			let expStr:string = LanguageManager.getlocal("study_table_willGet2",[String(this.param.data.exp)]);
			let seatStr:string = LanguageManager.getlocal("dinner_seat_num",[String(this.param.data.num),"3"]);
			sinfo = {et:this.param.data.et,info:[LanguageManager.getlocal("studyatk"),seatStr,expStr]};
		}
		else if (this._stype == 3)
		{	

			message = LanguageManager.getlocal("chat_share_text3",[LanguageManager.getlocal("adult_quality" + this.param.data.aquality)]);

			let attStr:string = LanguageManager.getlocal("atkraceChallengeinfoAttr",[String(this.param.data.att)]);
			let aqualityStr:string = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this.param.data.aquality);
			// let picStr:string = Api.adultVoApi.getAdultHalfPic(this.param.data.id);
			childId = this.param.data.id;
			sinfo = {et:this.param.data.et,
				aid:this.param.data.aid,
				// cid:childId,
				sex:this.param.data.sex,
				visit:this.param.data.visit,
				aquality: this.param.data.aquality,
				total:this.param.data.att,
				info:[this.param.data.name,attStr,aqualityStr]
			};
		}

		data.content = 
		{
			"pic" : Api.playerVoApi.getPlayePicId(),
			"vip" :  Api.playerVoApi.getPlayerVipLevel(),
			"title" : Api.playerVoApi.getTitleInfo(),
			"headBg" : Api.playerVoApi.getPlayerPtitle(),
			"sign" : Api.chatVoApi.getChatSign(),
			"ket" : kinget,
			"stype": this._stype,
			"message": message,
			"sinfo": sinfo,
			hideVip : Api.otherInfoVoApi.getOpenHideVip(),
		};
		
		

		if (this._stype == 1)
		{
			this.request(NetRequestConst.REQUEST_CHAT_SENDCHATMSG,{msg:data});
		}
		else if (this._stype == 2)
		{	
			this.request(NetRequestConst.REQUEST_CHAT_SENDSTUDYATKMSG,{msg:data});
		}
		else if (this._stype == 3)
		{	
			this.request(NetRequestConst.REQUEST_CHAT_SENDADULTMSG,{msg:data,mtype:childId});
		}
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.ret == true) {

			// if (this._stype == 1)
			// {
			// 	NetManager.request(NetRequestConst.REQUEST_DINNER_SHAREDINNER,{});
			// }
			
			App.CommonUtil.showTip(LanguageManager.getlocal("share_success"));

			if (this._obj && this._callbackF) {
				this._callbackF.apply(this._obj);
			}
		}
		else 
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("dinner_share_fail"));
		}

		
		this.hide();
	}

	protected getRequestErrorTip():string
	{
		return LanguageManager.getlocal("dinner_share_fail");
	}

	protected eventHandler(event:egret.TouchEvent,idx,itemBg)
    {
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				itemBg.texture = ResourceManager.getRes("public_9_bg28_down");
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
                itemBg.texture = ResourceManager.getRes("public_9_bg28");
                break;
			case egret.TouchEvent.TOUCH_END:
				itemBg.texture = ResourceManager.getRes("public_9_bg28");
				this.doShareDinner(idx);
				break;
        }
    }

	public dispose():void
	{	 	
		this._callbackF = null;
		this._obj = null;
		this._stype = 0;

		super.dispose();
	}
}