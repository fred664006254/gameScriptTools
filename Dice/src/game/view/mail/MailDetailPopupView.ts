/**
 * 邮件详情弹板
 * author dmj
 * date 2017/11/1
 * @class MailDetailPopupView
 */
/*
 *@description: 邮件详情
 *@author: hwc 
 *@update date: 2020-04-10 14:50:19
 *@version 
 */
class MailDetailPopupView extends PopupView
{
	private _mailInfoVo:MailInfoVo;
	private infoWidth = 504;
	private mailID;

	private rewardBtn:BaseButton;
	private titleCon:BaseDisplayObjectContainer;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		// 内容区
		let contentCon:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		// contentCon.x = 25;
		// contentCon.y = 10;
		contentCon.height = 472;
		this.addChildToContainer(contentCon);
		let contentbg = BaseBitmap.create("mail_detail_view_bg");
		contentbg.width = this.infoWidth;
		contentbg.height = contentCon.height;
		contentCon.addChild(contentbg);

		let content = ComponentMgr.getTextField("", TextFieldConst.SIZE_20, ColorEnums.white);
		content.x = 20;
		content.y = 42;
		content.width = 460;
		content.bold = true
		contentCon.addChild(content);
		content.strokeColor = 0;
		content.stroke = 2;
		content.text = this._mailInfoVo.content;
		content.wordWrap = true;
		content.height = contentbg.height - content.y;
		content.lineSpacing = 10;
	
		// 奖励列表区
		if(this._mailInfoVo.rewards != ""){
			let rewardCon:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			rewardCon.y = contentCon.y + contentCon.height + 10;
			rewardCon.width = 504;
			this.addChildToContainer(rewardCon);

			let iconWidth = 108 * 0.8;
			let dx = 15;
			let arr = GameData.formatRewardItem(this._mailInfoVo.rewards);
			let rewardIconStartX = (this.infoWidth - arr.length * iconWidth - (arr.length - 1) * dx) / 2;
			for(let index = 0; index < arr.length; index++){
				let element = arr[index];
				let item = GameData.getItemIcon(element, element.num);
				rewardCon.addChild(item);
				item.scaleX = 0.8;
				item.scaleY = 0.8;
				item.x = rewardIconStartX + (iconWidth + dx)* index ;
				item.y = 5;
				let numTxt = <BaseTextField>item.getChildByName("numTxt");
				//numTxt.y -= 20;
				numTxt.size = 30;
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, rewardCon, contentbg, [0,0]);
			this.rewardBtn=ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,LangMger.getlocal("rewardbtntxt"),
					this.rewardBtnHandler, this, null, null, TextFieldConst.SIZE_28);
			this.addChild(this.rewardBtn);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.rewardBtn, this.viewBg, [0,25]);
			this.rewardBtn.setEnable(this._mailInfoVo.isread==0);
		} else {
			// contentbg.height = 472;
			if(this._mailInfoVo.isread == 0)
				this.request(NetConst.MAIL_GET_REWARD, {mailId: this.mailID});
		}
	}

	protected initTitle(){
		this.titleCon = new BaseDisplayObjectContainer();
		this.addChild(this.titleCon);
		let mailText = ComponentMgr.getTextField(this._mailInfoVo.title, TextFieldConst.SIZE_32, ColorEnums.white);
		mailText.width = 328;
		mailText.bold = true;
		mailText.textAlign = egret.HorizontalAlign.CENTER;
		this.titleCon.addChild(mailText);
		mailText.setPosition(this.viewBg.x + 131, this.viewBg.y + 27);
		mailText.stroke = 2;
		mailText.strokeColor = ColorEnums.black;

		let timeBg = BaseBitmap.create("mail_view_time_bg");
		timeBg.width = 328;
		timeBg.height = 46;
		this.titleCon.addChild(timeBg);
		timeBg.setPosition(this.viewBg.x + 131, this.viewBg.y + 85);
		
		
		let timeText = ComponentMgr.getTextField(this._mailInfoVo.timeStr, TextFieldConst.SIZE_20, 0xFFF3B2);
		this.titleCon.addChild(timeText);
		timeText.bold = true;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, timeText, timeBg, [12,0]);
		timeText.stroke = 2;
		timeText.strokeColor = ColorEnums.mail_strokeColor_1;

		let detaTime = Api.MymailVoApi.getDetaTimeByMailID(this.mailID);
		let detaTimeText = ComponentMgr.getTextField(App.DateUtil.getFormatBySecond(detaTime, 4), TextFieldConst.SIZE_20, 0xFFF3B2);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, detaTimeText, timeBg, [12,0]);
		detaTimeText.bold = true;
		this.titleCon.addChild(detaTimeText);
		detaTimeText.stroke = 2;
		detaTimeText.strokeColor = ColorEnums.mail_strokeColor_1;
	}

	protected initBg(){
		super.initBg();
		this.viewBg.setPosition(24, 121);
		this.viewBg.x = GameConfig.stageWidth / 2 - this.viewBg.width / 2;
		this.viewBg.y = GameConfig.stageHeigth / 2 - this.viewBg.height / 2;
	}

	protected resetBgSize(){
		this.container.x = this.viewBg.x + 45;
		this.container.y = this.viewBg.y + 107;
		
		this.setChildIndex(this.titleCon, this.getChildIndex(this.container));
		this.viewBg.x -=20;
		this.titleCon.x -=10;
		this.container.x -=10;
		this.closeBtn.x = this.viewBg.x +505;
		this.closeBtn.y = this.viewBg.y + 19;
	}

	private rewardBtnHandler(event){
		// this.rewardBtn.setEnable(false);
		// App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
		let x = GameConfig.stageWidth / 2;
		let y = GameConfig.stageHeigth / 2;
		Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(x, y));
		this.request(NetConst.MAIL_GET_REWARD, {mailId: this.mailID});
	}

	protected netEventCallBack(evt:egret.Event){
        let data = evt.data;
        if(data && data.ret){
            switch (data.data.cmd) {
				case NetConst.MAIL_GET_REWARD:
					if(this.rewardBtn){
						// App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE, {type:"mail"});
						ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
							title : LangMger.getlocal("reward_pupopview_title"),
							rewards : data.data.data.rewards,
							callback:()=>{
								App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
							}
						});
						this.rewardBtn.setEnable(false);
					}
					break;
				default:
					break;
			}
		}
    }

	protected getTitleStr():string{
		return "";
	}

	public show(data){
		this.mailID = data.data.mailID;
		super.show(data);
		this._mailInfoVo = Api.MymailVoApi.getMailByMailID(data.data.mailID);
	}

	public getTitleBgName():string{
		return null;
	}

	protected getBgName():string{
		return "mail_detail_view_bg2"
	}

	protected getShowHeight():number
	{
		return 890;
	}

	protected getCloseBtnName():string {
		return "mail_view_detail_close_btn";
	}

	// protected getBgExtraHeight():number
	// {
	// 	return 86;
	// }

	public dispose():void
	{
		this.rewardBtn = null;
		this._mailInfoVo = null;
		this.mailID = null;
		super.dispose();
	}

}