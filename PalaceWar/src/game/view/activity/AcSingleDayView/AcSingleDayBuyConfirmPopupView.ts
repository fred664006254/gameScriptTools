/**
 * 确认取消弹板
 * author qianjun
 */
class AcSingleDayBuyConfirmPopupView extends PopupView
{
	private _cancelCallback:Function;
	private _confirmCallback:Function;
	private _handler:any;
	private _cancelBtn:BaseButton;
	private _desctext1 : BaseTextField = null;
	private _desctext2 : BaseTextField = null
	private _bg : BaseBitmap = null;
	private _bg2 : BaseBitmap = null;
	private _selectData : any = null;
	private _selectedBg : BaseBitmap = null;
	private _selectedIndex : number = 0;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
		let view = this;
		let data = this.param.data;
		view._selectedIndex = 0;
		if(data.cancelCallback)
		{
			this._cancelCallback = data.cancelCallback;
		}
		
		this._confirmCallback = data.confirmCallback;
		this._handler = data.handler;

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		// bg.height = 350;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		view.addChildToContainer(bg);
		view._bg = bg;


		let itemid = data.itemid.split('_')[1];
		let type = data.itemid.split('_')[0];
		let itemcfg = null;
		if(Number(type) == 16){
			itemcfg = Config.WifeskinCfg.getWifeCfgById(itemid);
		}
		else if(Number(type) == 11){
			itemcfg = Config.TitleCfg.getTitleCfgById(itemid);
		}
		else{
			itemcfg = Config.ItemCfg.getItemCfgById(itemid);
		}
		
		let descTxt1 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip1', [Math.ceil(data.price).toString(),itemcfg.name]), 22, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, bg, [0,10]);
		view.addChildToContainer(descTxt1);
		view._desctext1 = descTxt1;
		// let iconPic:string = data.icon;
		// let iconBg:string = data.iconBg;
		// let msg:string = data.msg;
		// let num = data.num;
		// let useNum = data.useNum || 0;

		let bg2:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg2.width = 515;
		bg2.height = 150;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, descTxt1, [0,descTxt1.textHeight + 10]);
		view.addChildToContainer(bg2);
		view._bg2 = bg2;

		let bg3:BaseBitmap = BaseBitmap.create("public_9_bg41");
		bg3.width = 515;
		bg3.height = 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg3, bg2);
		view.addChildToContainer(bg3);

		let descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip2'), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt2, bg3);
		view.addChildToContainer(descTxt2);

		let coupon = view.param.data.coupon;
		if(coupon.length){
			let reward = '';
			coupon.push({
				id : 0,
				num : 0,
				value : 0
			});
			coupon.sort((a,b)=>{
				return b.value - a.value;
			});
			for(let i in coupon){
				reward += (`1002_${coupon[i].id}_${coupon[i].num}_${coupon[i].value}|`);
			}
			reward = reward.substring(0, reward.length - 1);
			let Icons = GameData.getRewardItemIcons(reward);
			if(Icons.length){
				let width = 106;
				let scale = 80/106;

				let selectedBg = BaseBitmap.create("itembg_selected");
				selectedBg.setScale(scale);

				view._selectedIndex = 0;
				view._selectData = coupon[0];
				view._selectedBg = selectedBg;
				
				
				let distance = (bg2.width - 5 * width * scale - 4 * 15) / 2;
				for(let i = 1; i <= Icons.length; ++ i){
					let icon = Icons[i - 1];
					icon.name = `icon${i}`
					icon.setScale(scale);

					let mod = i % 5;
					icon.x = distance + bg2.x + ((mod == 0 ? i : mod) - 1) * (width * scale + 10);
					icon.y = bg3.y + bg3.height + 10 + (width * scale + 15) * (Math.ceil(i / 5) - 1);
					view.addChildToContainer(icon);
					icon.addTouchTap(view.clickCoupon, view, [i]);

					if(i == 1){
						selectedBg.x = icon.x - 1;
						selectedBg.y = icon.y - 1;
					}
				}
				bg2.height += (Icons.length > 5 ? (25 + width * scale): 0);
				view.addChildToContainer(selectedBg);
			}
		}
		else{
			view._selectData = null;
			let emptyTxt = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayGetTip2'), 22);
			emptyTxt.width = bg2.width - 50;
			emptyTxt.lineSpacing = 5;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, emptyTxt, bg2);
			view.addChildToContainer(emptyTxt);
		}
		
		bg.height = bg2.height + 110;

		let descTxt3 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip3',['']), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt3, bg2, [20,bg2.height + 10]);
		view.addChildToContainer(descTxt3);
		descTxt3.visible = coupon.length > 0;
		view._desctext2 = descTxt3;

		let descTxt4 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip4',[Api.playerVoApi.getPlayerGemStr()]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt4, bg2, [20, bg2.height + 10 + descTxt3.textHeight + 10]);
		view.addChildToContainer(descTxt4);


		this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_RED,"cancelBtn",this.clickCancelHandler,this);
		this._cancelBtn.x = this.viewBg.x + this.viewBg.width/4 - this._cancelBtn.width/2+ 20;
		this._cancelBtn.y = bg.y + bg.height + 15;
		// this._cancelBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(this._cancelBtn);
		view.freshText();
	}

	private clickCoupon(obj:any,index:any):void{
		let view = this;
		if(this._selectedIndex == index){
			// if(this._selectedBg){
			// 	if(this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg)){
			// 		this._curItemScrollItem.addChild(this._selectedBg);
			// 	}
			// }
			return;
		}

		let coupon = view.param.data.coupon;
		view._selectData = coupon[index - 1];
		view._selectedIndex = index;

		let icon = view.container.getChildByName(`icon${index}`);
		view._selectedBg.x = icon.x - 1;
		view._selectedBg.y = icon.y - 1;

		view.freshText();
	}

	private freshText():void{
		let view = this;
		if(!view._selectData){
			return;
		}
		let data = view.param.data;
		let itemid = data.itemid.split('_')[1];
		let type = data.itemid.split('_')[0];

		let itemcfg = null;
		if(Number(type) == 16){
			itemcfg = Config.WifeskinCfg.getWifeCfgById(itemid);
		}
		else if(Number(type) == 11){
			itemcfg = Config.TitleCfg.getTitleCfgById(itemid);
		}
		else{
			itemcfg = Config.ItemCfg.getItemCfgById(itemid);
		}

		if(view._selectData){
			view._desctext1.text = LanguageManager.getlocal('acSingleDayCouponUseTip1', [Math.ceil(data.price - view._selectData.value).toString(),itemcfg.name]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._desctext1, view._bg, [0,10]);

			view._desctext2.text = LanguageManager.getlocal('acSingleDayCouponUseTip3',[view._selectData.value]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._desctext2, view._bg2, [20,view._bg2.height + 10]);
		}
		else{
			view._desctext1.text = LanguageManager.getlocal('acSingleDayCouponUseTip1', [Math.ceil(data.price - view._selectData.value).toString(),itemcfg.name]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._desctext1, view._bg, [0,10]);

			view._desctext2.alpha = 0;

		}
	}

	protected resetBgSize():void
	{
		super.resetBgSize();
		let view : any = this;
		let descbg = BaseBitmap.create("public_searchdescbg");

		let descTxt5 = ComponentManager.getTextField(LanguageManager.getlocal('acSingleDayCouponUseTip5',['50']), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		descTxt5.lineSpacing = 5;

		descbg.width = descTxt5.textWidth + 20;
		descbg.height = descTxt5.textHeight + 15;

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descbg, view.viewBg, [0, -70]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt5, descbg);
		view.addChild(descbg);
		view.addChild(descTxt5);

		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._cancelBtn, view._bg, [45, view._bg.height + 10]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._confirmBtn, view._bg, [45,view._bg.height + 10]);
		//this.setConfirmBtnPosition(this.viewBg.x + this.viewBg.width/4*3 - this._cancelBtn.width/2 - 35,this._cancelBtn.y);
	}

	protected clickConfirmHandler(data:any):void
	{
		let view = this;
		// if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
		// {
		let cost = 0;
		let param = view.param.data;
		let sub = view._selectData ? view._selectData.value : 0;
		cost = Api.playerVoApi.getPlayerGem() - Math.ceil(param.price - sub);
		if(cost < 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return;
		}
		// 	else{
		// 		App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"))
		// 	}
			
		// 	this.hide();
		// 	return;
		// }
		// App.LogUtil.log("clickConfirmHandler");
		if(this._confirmCallback){
			this._confirmCallback.apply(this._handler,[view._selectData ? view._selectData.id : 0]);
		}
		
		this.hide();
	}

	protected getConfirmBtnStr():string
	{
		return "sysConfirm";
	}

	// protected getContainerY():number
	// {
	// 	return 0;
	// }

	private clickCancelHandler(param:any):void
	{
		if(this._cancelCallback)
		{
			this._cancelCallback.apply(this._handler,[]);
		}
		this.hide();
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"acsingleday_coupon_itemIcon", "itembg_selected"
		]);
	}

	protected getConfirmBtnName():string
	{
		return ButtonConst.BTN_NORMAL_YELLOW;
	}

	public dispose():void
	{
		this._cancelCallback = null;
		this._confirmCallback = null;
		this._handler = null;
		this._cancelBtn = null;
		this._bg = null;
		super.dispose();
	}
}