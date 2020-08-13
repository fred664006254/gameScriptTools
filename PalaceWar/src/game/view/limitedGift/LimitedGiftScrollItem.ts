/**
 * anthor:jiangliuyang
 * date:2018.9.4
 */

class LimitedGiftScrollItem extends ScrollListItem {

	// 标题文本
	private titleText: BaseTextField = null;

	//标题背景
	private titleBg: BaseBitmap = null;

	//内容背景
	private descBg: BaseDisplayObjectContainer = null;

	//内容图片
	private descImg: BaseLoadBitmap = null;

	//内容购买按钮
	private descBtn: BaseButton = null;

	//内容时间文本
	private descTimeText: BaseTextField = null;

	//数据
	private _data: any = null;
	private _itemIndex: number = null;





	public constructor() {
		super();
	}
	protected initItem(index: number, data: any) {
		

		this._data = data;
		this._itemIndex = index;

		if (this._data.isOpen) {
			this.descBg = new BaseDisplayObjectContainer();
			this.descBg.width = 566;
			this.descBg.height = 438;
			this.descBg.x = 0;
			this.descBg.alpha = 0.8;
			this.addChild(this.descBg);

			let res = "limitedgiftview_bg"+data.img;
			if(Api.switchVoApi.checkIsInBlueWife() && RES.hasRes(`${res}_blueType`)){
				res = `${res}_blueType`;
			}
			this.descImg = BaseLoadBitmap.create(res);
			this.descImg.width = 566;
			this.descImg.height = 389;
			this.descImg.x = this.descBg.x + this.descBg.width/2 - this.descImg.width/2;
			this.descImg.y = 52;
			this.addChild(this.descImg);
			// this._data.num = 1;
			if (this._data.num && Number(this._data.num) > 0){
				let numBg = BaseLoadBitmap.create("limitedgiftview_numbg");
				numBg.width = 213;
				numBg.height = 75;
				numBg.setPosition(this.descImg.x + this.descImg.width - numBg.width + 10, this.descImg.y + 10);
				this.addChild(numBg);
				let numTxt = ComponentManager.getBitmapText(""+this._data.num, "limitedgiftnum_fnt", TextFieldConst.COLOR_LIGHT_YELLOW, TextFieldConst.FONTSIZE_TITLE_BIG);
				numTxt.setPosition(numBg.x + numBg.width/2 - numTxt.width/2 + 10, numBg.y + 3);
				this.addChild(numTxt);
				if(!Api.switchVoApi.checkOpenBMFont()){
					numTxt.y = numBg.y + 15;
				}
			}

			this.descBtn = ComponentManager.getButton(ButtonConst.BTN_RECHARGE,null,this.buyBtnHandler,this);
        	this.descBtn.setColor(TextFieldConst.COLOR_BROWN);
			this.descBtn.setBtnCdSecond(30);
			this.descBtn.setBtnCdCallback(8,this.btnCdCallback,this);
			let params:string[]=[];
            if(PlatformManager.checkisLocalPrice()&&this._data.rechargeId)
            {
				Api.rechargeVoApi.formatThHwMoneyInfo(params,this._data.rechargeId);
				params.push("");
            }
			else
			{
				params.push(this._data.cost);
			}
			this.descBtn.setText(LanguageManager.getlocal("limitedGiftBtnText",params),false);
			this.descBtn.x = 400 - this.descBtn.width/2;
			this.descBtn.y = 400 - this.descBtn.height/2;
			this.addChild(this.descBtn);

			let timeStr = App.DateUtil.getFormatBySecond(this._data.time - GameData.serverTime,1);
			this.descTimeText = ComponentManager.getTextField(LanguageManager.getlocal("limitedGiftTime"+this._data.color,[timeStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
			this.descTimeText.x = this.descBtn.x + this.descBtn.width/2 - this.descTimeText.width/2;
			this.descTimeText.y = this.descBtn.y - 5 - this.descTimeText.height;
			this.addChild(this.descTimeText);

			let scroStartY = 163;
			let tmpX = 265; //274
			let rewards = "1_1_" + this._data.gemCost + "|" + this._data.reward;
			let rewardArr = GameData.formatRewardItem(rewards);
			for (var index = 0; index < rewardArr.length;index ++){
				let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
				iconItem.setScale(0.72);

				if(index == 3){
					tmpX = 265 + iconItem.width * iconItem.scaleX / 2 + 7 / 2;
				}
				iconItem.x = tmpX;
				iconItem.y = scroStartY + Math.floor(index / 3) * (iconItem.height * iconItem.scaleY + 7);
				tmpX += (iconItem.width * iconItem.scaleX + 7);
	
				this.addChild(iconItem);
			}

			if (this._data.showTip){
				let tipBg = BaseBitmap.create("public_9_viewmask");
				tipBg.width = 260;
				// tipBg.height = 120;
				tipBg.alpha = 0.7;
				tipBg.x = this.descImg.x + 10;
				// tipBg.y = this.descImg.y + this.descImg.height - tipBg.height - 10;
				this.addChild(tipBg);
				let titleStr = LanguageManager.getlocal(this._data.title);
				let tipMsg = ComponentManager.getTextField(LanguageManager.getlocal("limitedGiftBuyTip", [titleStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
				tipMsg.width = tipBg.width - 20;
				tipMsg.textAlign = TextFieldConst.ALIGH_CENTER;
				tipMsg.lineSpacing = 5;
				tipBg.height = tipMsg.height + 20;
				tipBg.y = this.descImg.y + this.descImg.height - tipBg.height - 10;
				tipMsg.x = tipBg.x + tipBg.width/2 - tipMsg.width/2;
				tipMsg.y = tipBg.y + 10;
				this.addChild(tipMsg);
			}
		} 

		this.titleBg = BaseBitmap.create(this._data.isOpen?"public_gogao":"public_gogao2");
		this.titleBg.x = 566/2 - this.titleBg.width/2;
		this.titleBg.y = 3;
		this.addChild(this.titleBg);
		let titleStr = LanguageManager.getlocal(this._data.title);
		if (this._data.isShowTime) {
			let time = this._data.time - GameData.serverTime;
			if (time < 0){
				time = 0; 
			}
			let timeStr2 = App.DateUtil.getFormatBySecond(time,1);
			titleStr += "  " +LanguageManager.getlocal("limitedGiftTimeForTitle",[timeStr2]);
		}
		this.titleText = ComponentManager.getTextField(titleStr , TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		this.titleText.x = this.titleBg.x + this.titleBg.width / 2 - this.titleText.width / 2;
		this.titleText.y = this.titleBg.y + this.titleBg.height / 2 - this.titleText.height / 2;
		this.addChild(this.titleText);
		this.titleBg.addTouchTap(this.itemClickHandler,this);







		
		
		if (this._data.isOpen) {
			
	
			this.height = this.descBg.height + 5;
		} else {
			

			this.height = this.titleBg.height + 3;
		}
		this.width = 566;
		

		TickManager.addTick(this.tick,this);
		this.tick();
	}

    private buyBtnHandler(): void{

		let t = this._data.time - GameData.serverTime;
		if(t <= 0){
			//弹出提示不能购买
			App.CommonUtil.showTip(LanguageManager.getlocal("limitedGiftTimeOver"));
			
		} else {
			//点击购买按钮

			if (GameData.idcardSwitch==true && GameData.idcardNormal==1 && Api.gameinfoVoApi.getRealnameRewards()==null)
			{	
				ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
				return;
			}

			let redKey = Api.shopVoApi.getPayRedpoint();
			
			
			let rechargeId  = this._data.rechargeId;
			if(rechargeId == redKey){
				NetManager.request(NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT,{showtype:2});
			}
			PlatformManager.checkPay(rechargeId); 

		}

    }
	private btnCdCallback():void{
        // console.log("send------->1111");
         NetManager.request(NetRequestConst.REQUEST_SHOP_GETSHOPCFG,{});
    }
	private itemClickHandler(event: egret.TouchEvent):void
	{

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST,this._itemIndex);
	}

	protected tick()
	{
		if (this.descTimeText) {
			let t = this._data.time - GameData.serverTime;
			let timeStr = App.DateUtil.getFormatBySecond(t < 0 ? 0 : t,1);
			this.descTimeText.text = LanguageManager.getlocal("limitedGiftTime"+this._data.color,[timeStr]);

			if(t <= 0){
				TickManager.removeTick(this.tick,this);
				this.descBtn.setBtnCdSecond(0);
				// this.descBtn.setEnable(false);
			}
		}

		// 标题上的时间
		if (this.titleText) {
			let titleStr = LanguageManager.getlocal(this._data.title);
			if (this._data.isShowTime) {
				let time = this._data.time - GameData.serverTime;
				if (time < 0){
					time = 0; 
				}
				let timeStr2 = App.DateUtil.getFormatBySecond(time, 1);
				titleStr += "  " +LanguageManager.getlocal("limitedGiftTimeForTitle",[timeStr2]);
			}
			this.titleText.text = titleStr;
		}

		

	}
	public getSpaceY(): number {
		return 10;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {
		TickManager.removeTick(this.tick,this);
		this.titleBg.removeTouchTap();
			// 标题文本
		this.titleText = null;

		//标题背景
		this.titleBg = null;

		//内容背景
		this.descBg = null;

		//内容图片
		this.descImg = null;

		//内容购买按钮
		this.descBtn = null;

		//内容时间文本
		this.descTimeText = null;

		//数据
		this._data  = null;
		this._itemIndex  = null;
		super.dispose();
	}
}