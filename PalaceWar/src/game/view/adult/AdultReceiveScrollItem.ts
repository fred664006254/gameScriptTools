/**
 *红颜接待item
 * author dky
 * date 2017/10/31
 * @class AdultMarryRequestScrollItem
 */
class AdultReceiveScrollItem extends ScrollListItem
{
	private _data:any;
	private _effectTxt : BaseTextField = null;

	public constructor() 
	{
		super();
	}
	//{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}
	public initItem(index:number,data:any):void
	{
		let view = this;
		view._data = data;
		view.width = 520;
		view.height = 126 ;
	
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = 455;
		bg.height = 114;
		view.setLayoutPosition(LayoutConst.rightverticalCenter, bg, view);
		view.addChild(bg);

		let wifeGroup = view.getWifestatusIcon(data.wifeid);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, wifeGroup, view);
		view.addChild(wifeGroup);
		
		let nameTxt = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.lefttop, nameTxt, bg, [70,15]);
		view.addChild(nameTxt);

		let statusTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultAddEffect1',[LanguageManager.getlocal(`wifestatusTitle${data.level}`),Math.floor(Config.SadunCfg.receptionEffectList[data.level].addExtent * 100).toString()]), 20, TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.lefttop, statusTxt, nameTxt, [0,nameTxt.textHeight + 10]);
		view.addChild(statusTxt);
		//-addExtent  加成幅度  子嗣拜访后属性 = 子嗣属性 + baseEffect + 子嗣属性 * addExtent   向下取整  例：子嗣拜访后武力 = 子嗣拜访前武力 + baseEffect + 子嗣拜访前武力 * （1 + addExtent）
		let childInfo = data.childInfo;
		let addEffect = 0;//Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] * 4 + childInfo.total * Config.SadunCfg.receptionEffectList[data.level].addExtent);
		for(let i in childInfo.attr){
			addEffect += (Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] + childInfo.attr[i] * Config.SadunCfg.receptionEffectList[data.level].addExtent));
		}
		let effectTxt = ComponentManager.getTextField(LanguageManager.getlocal(`adultAddEffect2`, [addEffect.toString()]), 20, TextFieldConst.COLOR_BLACK);
		view.setLayoutPosition(LayoutConst.lefttop, effectTxt, statusTxt, [0,statusTxt.textHeight + 10]);
		view.addChild(effectTxt);
		view._effectTxt = effectTxt;

		if(data.isinreceive){
			let adulthbian = BaseBitmap.create("adultxxzhong");
			view.setLayoutPosition(LayoutConst.rightverticalCenter, adulthbian, bg, [20,0]);
			view.addChild(adulthbian);
		}else{
			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'adultChooseReceive', view.chooseBtnClick, view);
			view.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [20,0]);
			view.addChild(btn);
		}
		
		if (Api.wifebanishVoApi.getIsWifeBanishing(String(data.wifeid)) )
        {
            	let banishContainer = new BaseDisplayObjectContainer();
				banishContainer.setPosition(wifeGroup.x+15,wifeGroup.y+20);
				view.addChild(banishContainer);
				let banishingbg:BaseBitmap = BaseBitmap.create("public_9_bg60");
				banishingbg.y= 64;
				banishingbg.height = 24;
				banishingbg.width = 50;
				banishContainer.addChild(banishingbg);

				let banishingbg2:BaseBitmap = BaseBitmap.create("public_9_bg60");
				banishingbg2.y= 64;
				banishingbg2.height = 24;
				banishingbg2.width = 50;
				banishingbg2.scaleX = -1;
				banishingbg2.x = banishingbg.width+banishingbg2.width;
				banishContainer.addChild(banishingbg2);

				let banishingText:BaseBitmap = BaseBitmap.create("wife_banishing_text");
				banishingText.setPosition(banishingbg.width-banishingText.width/2,64);
				banishContainer.addChild(banishingText);

				let banishInfo:WifeBanishInfoVo = Api.wifebanishVoApi.getBanishInfoVoByWife(data.wifeid);
				if ( banishInfo  && banishInfo.et >= GameData.serverTime)
				{
					egret.Tween.get(banishContainer).wait((banishInfo.et - GameData.serverTime)*1000).call(function () {
						banishContainer.dispose();
					});
				} 
        }
	}

	private chooseClick():void{
		let view = this;
	}

	private getWifestatusIcon(wifeId:string):BaseDisplayObjectContainer
	{
		let iconContainer = new BaseDisplayObjectContainer();
		let iconBg:BaseBitmap = BaseBitmap.create("wifestatus_headbg");
		iconBg.name = "bg2";
		iconContainer.addChild(iconBg);
		let iconStr = Api.wifeVoApi.getWifeIcon(wifeId);
		let icon = BaseLoadBitmap.create(iconStr);
		icon.setPosition(0,5)
		icon.setScale(0.6);

		if(App.CommonUtil.check_dragon())
		{
			let iconMask = BaseBitmap.create("wifestatus_headmask");
			iconMask.setPosition(5,5)
			iconContainer.addChild(iconMask);
			iconContainer.cacheAsBitmap = true;
			icon.mask = iconMask;
		}
		iconContainer.addChild(icon);

		let adulthbian = BaseBitmap.create("adulthbian");
		adulthbian.setPosition(0,0);
		iconContainer.addChild(adulthbian);
		
		return iconContainer;
	}

	private chooseBtnClick()
    {
		NetManager.request(NetRequestConst.REQUEST_SADUN_AGREEVISIT, {
			fchildId : this._data.childInfo.id.toString(),
			fuid : Number(this._data.childInfo.uid),
			wifeId : this._data.wifeid.toString()
		});
		let addEffect = 0;//Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] * 4 + childInfo.total * Config.SadunCfg.receptionEffectList[data.level].addExtent);
		for(let i in this._data.childInfo.attr){
			addEffect += Math.floor(Config.SadunCfg.baseEffect[this._data.childInfo.aquality - 1] + this._data.childInfo.attr[i] * Config.SadunCfg.receptionEffectList[this._data.level].addExtent);
		}
		Api.adultVoApi.setReceiveWifeInfo({
			'wifename' : this._data.name,
			'attr' : addEffect,
			'childname' : this._data.childInfo.name
		});
	}

	public getSpaceY():number
	{
		return 10;
	}

	public dispose():void
	{
		this._data = null;
		this._effectTxt = null;
		super.dispose();
	}
}