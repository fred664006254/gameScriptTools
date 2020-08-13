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
	private descBg: BaseBitmap = null;

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
			this.descBg = BaseBitmap.create("load_4");
			this.descBg.width = 545;
			this.descBg.height = 56 + 427 + 15;
			this.descBg.x = 0;
			this.descBg.alpha = 0.8;
			this.addChild(this.descBg);

			this.descImg = BaseLoadBitmap.create("limitedgiftview_bg"+data.img);
			this.descImg.width = 529;
			this.descImg.height = 427;
			this.descImg.x = this.descBg.x + this.descBg.width/2 - this.descImg.width/2;
			this.descImg.y = 56 +8;
			this.addChild(this.descImg);


			this.descBtn = ComponentManager.getButton("firstchargebutton01",null,this.buyBtnHandler,this);
        	this.descBtn.setColor(TextFieldConst.COLOR_BROWN);
			this.descBtn.setBtnCdSecond(60);
			this.descBtn.setBtnCdCallback(8,this.btnCdCallback,this);
			// this.descBtn.setText(LanguageManager.getlocal("limitedGiftBtnText",[this._data.cost]),false);
			this.descBtn.setText(LanguageManager.getlocal("anyMoney",[this._data.cost]),false);

			this.descBtn.x = 300;
			this.descBtn.y = 390;
			this.addChild(this.descBtn);

			let timeStr = App.DateUtil.getFormatBySecond(this._data.time - GameData.serverTime,1);
			this.descTimeText = ComponentManager.getTextField(LanguageManager.getlocal("limitedGiftTime"+this._data.color,[timeStr]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON);
			this.descTimeText.x = this.descBtn.x + this.descBtn.width/2 - this.descTimeText.width/2;
			this.descTimeText.y = this.descBtn.y + this.descBtn.height + 5;
			this.addChild(this.descTimeText);

			let scroStartY = 220;
			let tmpX = 274;
			let rewards = "1_1_" + this._data.gemCost + "|" + this._data.reward;
			let rewardArr = GameData.formatRewardItem(rewards);
			for (var index = 0; index < rewardArr.length;index ++){
				let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
				iconItem.setScale(0.7);

				if(index == 3){
					tmpX = 274;
				}
				iconItem.x = tmpX;
				iconItem.y = scroStartY + Math.floor(index / 3) * (iconItem.height * iconItem.scaleY + 7);
				tmpX += (iconItem.width * iconItem.scaleX + 7);
	
				this.addChild(iconItem);
			}
			TickManager.addTick(this.tick,this);
			this.tick();
		} 




		this.titleBg = BaseBitmap.create("public_gogao");
		this.titleBg.x = 545/2 - this.titleBg.width/2;
		this.titleBg.y = 7;
		this.addChild(this.titleBg);
		this.titleText = ComponentManager.getTextField(LanguageManager.getlocal(this._data.title), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.titleText.x = this.titleBg.x + this.titleBg.width / 2 - this.titleText.width / 2;
		this.titleText.y = this.titleBg.y + this.titleBg.height / 2 - this.titleText.height / 2;
		this.addChild(this.titleText);
		this.titleBg.addTouchTap(this.itemClickHandler,this);







		
		
		if (this._data.isOpen) {
			
	
			this.height = this.descBg.height + 5;
		} else {
			

			this.height = this.titleBg.height + 10;
		}
		this.width = 545;
		

	}

    private buyBtnHandler(): void{

		let t = this._data.time - GameData.serverTime;
		if(t <= 0){
			//弹出提示不能购买
			App.CommonUtil.showTip(LanguageManager.getlocal("limitedGiftTimeOver"));
			
		} else {
			//点击购买按钮
			let redKey = Api.shopVoApi.getPayRedpoint();
			
			
			let rechargeId  = this._data.rechargeId;
			if(rechargeId == redKey){
				NetManager.request(NetRequestConst.REQUEST_SHOP_SHOW1COSTSCENEGIFT,{showtype:2});
			}
			PlatformManager.pay(rechargeId); 

		}

    }
	private btnCdCallback():void{
         NetManager.request(NetRequestConst.REQUEST_SHOP_GETSHOPCFG,{});
    }
	private itemClickHandler(event: egret.TouchEvent):void
	{

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LIMITEDGIFT_REFRESHLIST,this._itemIndex);
	}

	protected tick()
	{

		let t = this._data.time - GameData.serverTime;
		let timeStr = App.DateUtil.getFormatBySecond(t < 0 ? 0 : t,1);
		this.descTimeText.text = LanguageManager.getlocal("limitedGiftTime"+this._data.color,[timeStr]);

		if(t <= 0){
			TickManager.removeTick(this.tick,this);
			this.descBtn.setBtnCdSecond(0);
			// this.descBtn.setEnable(false);
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