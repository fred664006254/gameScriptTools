/**
 * 邮件列表弹板
 * author dmj
 * date 2017/10/31
 * @class MailPopupView
 */
class MailPopupView extends PopupView
{
	private _mailNumTF:BaseTextField;
	private _scrollList:ScrollList;
	private _mailInfoVoList:Array<MailInfoVo>;
	private _index:number;
	private _mailId:number;
	private _mailNumBg:BaseBitmap = null;
	private _readAllBtn:BaseButton = null;
	private _isReadAll:boolean = false;
	private _actTimeArr:number[] = [];

	public constructor() 
	{
		super();
	}
	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_MAIL_DETAIL,this.clickItemHandler,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH,this.refreshList,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAIL_GET_ALL_REWARDS, this.getMailRewardCallback, this);

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg93");
		bg.width = 530;
		bg.height = 612;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 10;
		this.addChildToContainer(bg);

		let mailNumBg:BaseBitmap = BaseBitmap.create("public_9_bg95");
		// titleBg.width = 300;
		// titleBg.x = this.viewBg.x + this.viewBg.width/2 - titleBg.width/2;
		mailNumBg.y = bg.y + bg.height + 20; //15
		this.addChildToContainer(mailNumBg);
		this._mailNumBg = mailNumBg;

		this._mailNumTF = ComponentManager.getTextField(LanguageManager.getlocal("curMailNum",[Api.mailVoApi.getUnreadNum().toString(), Api.mailVoApi.getTotalNum().toString()]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		mailNumBg.width = this._mailNumTF.width + 60;
		mailNumBg.x = this.viewBg.x + this.viewBg.width/2 - mailNumBg.width/2;
		mailNumBg.x = this.viewBg.x + 70;
		this._mailNumTF.x = this._mailNumBg.x + this._mailNumBg.width/2 - this._mailNumTF.width/2;
		this._mailNumTF.y = mailNumBg.y + mailNumBg.height/2 - this._mailNumTF.height/2 + 2;
		this.addChildToContainer(this._mailNumTF);

		let readAllBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "mailGetAll", this.readAllBtnClick, this);
		readAllBtn.setPosition(this.viewBg.x + this.viewBg.width - 70 - readAllBtn.width, bg.y + bg.height + 5);
		this.addChildToContainer(readAllBtn);
		this._readAllBtn = readAllBtn;
		let notReadMailArr = Api.mailVoApi.getAllNotReadMail();
		if (notReadMailArr.length > 0){
			readAllBtn.setGray(false);
		}
		else{
			readAllBtn.setGray(true);
		}

		this._mailInfoVoList = Api.mailVoApi.getMailInfoVoList();
		if(this._mailInfoVoList&&this._mailInfoVoList.length>=1)
		{		
			let rect = egret.Rectangle.create();
			rect.setTo(0,0,bg.width - 20,bg.height - 20);
			this._scrollList = ComponentManager.getScrollList(MailScrollItem,this._mailInfoVoList,rect);
			this.addChildToContainer(this._scrollList);
			this._scrollList.setPosition(bg.x + 10,bg.y + 10);
		}
		else
		{
			let noDataTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_WHITE);
			noDataTxt.text =LanguageManager.getlocal("mailNoDes");  
			this.addChildToContainer(noDataTxt);
			this.setLayoutPosition(LayoutConst.horizontalCenter, noDataTxt, bg);  
			noDataTxt.y = 300;
		}
	}

	protected resetBgSize():void{
		super.resetBgSize();
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`mailDelTip`, [Config.GameprojectCfg.deleteEmail.toString()]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [20,this.viewBg.height + 13]);
		this.addChild(tipTxt);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"mail_icon","mail_iconbg",
					"mail_rewardicon", "public_popupscrollitembg",
					]);
	}

	protected getRequestData()
	{
		if(Api.mailVoApi.hasInit())
		{
			return super.getRequestData();
		}
		else
		{
			return {requestType:NetRequestConst.REQUEST_MAIL_GETMYMAILLIST,requestData:{}};
		}
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		this._index = Number(event.data.index);
		this._mailId = Number(event.data.mailId);
		let mailInfoVo:MailInfoVo = Api.mailVoApi.getMailInfoVoById(this._mailId);
		// if(mailInfoVo && mailInfoVo.content && mailInfoVo.isread)
		// {
		// 	this.openMailDetail();
		// }
		// else
		// {	
			App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_DETAIL),this.useCallback,this);
			NetManager.request(NetRequestConst.REQUEST_MAIL_GET_DETAIL,{"mailId":this._mailId});
		// }
	}

	//全部领取
	private readAllBtnClick():void{
		let arr = Api.mailVoApi.getAllNotReadMail();
		if (arr.length <= 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("mailNotGetAllMsg"));
			return;
		}
		if (this._isReadAll){
			return;
		}
		this._isReadAll = true;
		let uid = Api.playerVoApi.getPlayerID();
		NetManager.request(NetRequestConst.REQUEST_MAIL_GET_ALL_REWARDS,{"uid": uid});	
	}

	private getMailRewardCallback(event:egret.Event){
		if (!event.data.ret){
			this._isReadAll = false;
			return;
		}
		this._isReadAll = false;
		let rData = event.data.data.data;
		if (rData.rewards){
			let rewardVo = GameData.formatRewardItem(rData.rewards);
			let actTimeArr = App.CommonUtil.playRewardFlyAction(rewardVo);
			App.LogUtil.log("getMailRewardCallback "+actTimeArr.length);
			this._actTimeArr = actTimeArr;
		}
		App.LogUtil.log("rData.replacerewards "+rData.replacerewards);
		if (rData.replacerewards) {
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
		}
		
		this.refreshMailList();

		if (rData.rewards)
		{
			Api.biographyVoApi.checkShowBiographyRewars(rData.rewards);
		}
		
	}

	private refreshMailList():void{
		this._scrollList.refreshData(this._mailInfoVoList);
		let newMailnumStr:string =  LanguageManager.getlocal("curMailNum",[Api.mailVoApi.getUnreadNum().toString(), Api.mailVoApi.getTotalNum().toString()]) 
		this._mailNumTF.text = newMailnumStr;
		this._mailNumBg.width = this._mailNumTF.width + 60;
		// this._mailNumBg.x = this.viewBg.x + this.viewBg.width/2 - this._mailNumBg.width/2;
		// this._mailNumTF.x = this.viewBg.x + this.viewBg.width/2 - this._mailNumTF.width/2;
		this._mailNumTF.x = this._mailNumBg.x + this._mailNumBg.width/2 - this._mailNumTF.width/2;
		this._mailNumTF.y = this._mailNumBg.y + this._mailNumBg.height/2 - this._mailNumTF.height/2 + 2;

		let notReadMailArr = Api.mailVoApi.getAllNotReadMail();
		if (notReadMailArr.length > 0){
			this._readAllBtn.setGray(false);
		}
		else{
			this._readAllBtn.setGray(true);
		}
	}

	//mask
	public showViewMask():void{
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = GameConfig.stageWidth;
        touchPos.height = GameConfig.stageHeigth;
        this.addChild(touchPos);
        touchPos.name = "yiyibusheTouchPos";
        touchPos.touchEnabled = true;
    }

    public hideViewMask():void{
        let touchPos = <BaseBitmap>this.getChildByName("yiyibusheTouchPos");
        if (touchPos){
            touchPos.touchEnabled = false;
            touchPos.dispose();
        }
    }

	private refreshList():void
	{
		let mailScrollItem = <MailScrollItem>this._scrollList.getItemByIndex(this._index);
		if(mailScrollItem)
		{
			mailScrollItem.updateMailState();
			let newMailnumStr:string =  LanguageManager.getlocal("curMailNum",[Api.mailVoApi.getUnreadNum().toString(), Api.mailVoApi.getTotalNum().toString()]) 
			this._mailNumTF.text = newMailnumStr;
			this._mailNumBg.width = this._mailNumTF.width + 60;
			// this._mailNumBg.x = this.viewBg.x + this.viewBg.width/2 - this._mailNumBg.width/2;
			// this._mailNumTF.x = this.viewBg.x + this.viewBg.width/2 - this._mailNumTF.width/2;
			this._mailNumTF.x = this._mailNumBg.x + this._mailNumBg.width/2 - this._mailNumTF.width/2;
			this._mailNumTF.y = this._mailNumBg.y + this._mailNumBg.height/2 - this._mailNumTF.height/2 + 2;
		}
		let notReadMailArr = Api.mailVoApi.getAllNotReadMail();
		if (notReadMailArr.length > 0){
			this._readAllBtn.setGray(false);
		}
		else{
			this._readAllBtn.setGray(true);
		}
	}

	private useCallback(event:egret.Event):void
	{	
		let rData = event.data;
        if(!rData.ret){
            return;
        }

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MAIL_GET_DETAIL),this.useCallback,this);
		let mailScrollItem = <MailScrollItem>this._scrollList.getItemByIndex(this._index);
		mailScrollItem.updateMailState();
		this.openMailDetail();
		
	}

	protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	protected getRuleInfo():string{
		return `mailpopupRuleInfo`;
	}

	protected getRuleInfoParam():string[]{
		return [Config.GameprojectCfg.deleteEmail.toString()];
	}

	// 打开邮件详情
	private openMailDetail():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.MAILDETAILPOPUPVIEW,{"mid":this._mailId,"index":this._index});
	}

	protected getBgExtraHeight():number
	{
		return 15;
	}


	public dispose():void
	{
		this._mailInfoVoList=null;
		this._scrollList=null;
		this._mailNumTF=null;
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_MAIL_REFRESH,this.refreshList,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_MAIL_DETAIL,this.clickItemHandler,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAIL_GET_ALL_REWARDS, this.getMailRewardCallback, this);
		this._readAllBtn = null;
		this._isReadAll = false;
		if (this._actTimeArr && this._actTimeArr.length > 0){
			for (let i=0; i < this._actTimeArr.length; i++){
				egret.clearTimeout(this._actTimeArr[i]);
			}
		}
		this._actTimeArr = [];

		super.dispose();
	}

}