/**
 *帮会榜单
 * author dky
 * date 2017/11/29
 * @class AllianceApplyScrollItem
 */
class AllianceApplyScrollItem extends ScrollListItem
{

	private _applyData:any = null;
	// private _applyBtn:BaseButton;
	// private _cancelApplyBtn:BaseButton;
	private _itemIndex:number;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,rankData:any):void
	{
		this.width = 510;
		this.height = 150  + this.getSpaceY();
		
		// childInfo.total
		this._applyData = rankData;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_listbg");
		bg.width = this.width;
		bg.height = 145;
		// bg.x = 5;

		this.addChild(bg);

		let leftBg = BaseBitmap.create("public_left");
		leftBg.width = 129;
		leftBg.height = 126;
		leftBg.x = 5.5;
		leftBg.y = 5.5;
		this.addChild(leftBg);

		let nameBg = BaseBitmap.create("public_biaoti2");
		nameBg.width = 180;
		nameBg.x = leftBg.x + leftBg.width + 15;
		nameBg.y = 15;
		this.addChild(nameBg);


		let nameTF = ComponentManager.getTextField(rankData.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
		this.addChild(nameTF);

		// let lineImg = BaseBitmap.create("public_line1");
        // lineImg.x = this.width/2 - lineImg.width/2;
        // lineImg.y = 40;
        // this.addChild(lineImg);

		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);
		iconContainer.x = 20;
		iconContainer.y = 15;

		let posBg:BaseBitmap = BaseBitmap.create("public_chatheadbg");
		// posBg.x = 0;
		// posBg.y = 0;
        iconContainer.addChild(posBg)

        // this.addTouch(this.eventHandler,this,null);	

		let rect1:egret.Rectangle=egret.Rectangle.create();
		rect1.setTo(0,0,136,143);
		let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(rankData.pic),rect1);
		posBB.x = 0;
		posBB.y =posBg.y-7;
        posBB.setScale(2/3);
		iconContainer.addChild(posBB);


		App.CommonUtil.addTouchScaleEffect(iconContainer,this.clickItemHandler,this);

		let leadStr = LanguageManager.getlocal("alliance_shili",[rankData.power]);
		let leadTF = ComponentManager.getTextField(leadStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		leadTF.x = nameBg.x;
		leadTF.y = nameTF.y + nameTF.height + 24;
		this.addChild(leadTF);

		let attrStr = LanguageManager.getlocal("alliance_officer",[Api.playerVoApi.getPlayerOfficeByLevel(rankData.level)]);
		let attrTF = ComponentManager.getTextField(attrStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		attrTF.x = nameBg.x;
		attrTF.y = leadTF.y + leadTF.height + 10;
		this.addChild(attrTF);


		//拒绝
		let refuseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE,"allianceApplyRefuse",this.refuseBtnClick,this);
		refuseBtn.x = 360;
		refuseBtn.y = 13;
		this.addChild(refuseBtn);
		// refuseBtn.setColor(TextFieldConst.COLOR_BLACK);

		//choose
		let chooseBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"allianceApplyAgree",this.chooseBtnClick,this);
		chooseBtn.x = refuseBtn.x;
		chooseBtn.y = refuseBtn.y + refuseBtn.height + 10;
		this.addChild(chooseBtn);
		// chooseBtn.setColor(TextFieldConst.COLOR_BLACK);
		
	}
	 protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.COMMON.RANKUSERINFOVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }
	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}
	 private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._applyData.uid});
    }
	 private refuseBtnClick()
    {

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_REFUSEAPPLY,{"uid":this._applyData.uid});
    }

	  private chooseBtnClick()
    {	
		let allianceVo = Api.allianceVoApi.getAllianceVo();
		if(allianceVo.mn >= allianceVo.maxmn){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceApplyMaxMn"));
			return;
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCE_AGREEAPPLY,{"uid":this._applyData.uid});
    }


	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{

		this._applyData = null;
		// this._applyBtn = null;
		// this._cancelApplyBtn = null;
		this._itemIndex = null;
		super.dispose();
	}
}