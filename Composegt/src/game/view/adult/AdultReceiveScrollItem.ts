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
		view.height = 165 ;
	
		let bg:BaseBitmap = BaseBitmap.create("adult_listbg");
		// bg.width = 519;
		// bg.height = 161;
		view.setLayoutPosition(LayoutConst.rightverticalCenter, bg, view);
		view.addChild(bg);

		let iconStr = Api.wifeVoApi.getWifeIcon(data.wifeid);
		let icon = BaseLoadBitmap.create(iconStr);
		icon.setScale(0.75);
		icon.x = bg.x + 1;
		icon.y = bg.y + 8;
		view.addChild(icon);
		
		let adult_listbg01 = BaseBitmap.create("adult_listbg01");
		adult_listbg01.x = 200-40;
		adult_listbg01.y = 0;
		view.addChild(adult_listbg01);

		let nameTxt = ComponentManager.getTextField(data.name, 20, TextFieldConst.COLOR_BROWN);
		if(nameTxt.width + 30 >= adult_listbg01.width){
			adult_listbg01.width = nameTxt.width + 30
		}


		nameTxt.x = adult_listbg01.x + adult_listbg01.width/2 - nameTxt.width/2;
		nameTxt.y =  adult_listbg01.y + adult_listbg01.height/2 - nameTxt.height/2+10;
		view.addChild(nameTxt);

		let statusTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultAddEffect1',[LanguageManager.getlocal(`wifestatusTitle${data.level}`),Math.floor(Config.SadunCfg.receptionEffectList[data.level].addExtent * 100).toString()]), 20, 0xC6A28C);
		view.setLayoutPosition(LayoutConst.lefttop, statusTxt, bg, [200-40,90]);
		view.addChild(statusTxt);
		//-addExtent  加成幅度  子嗣拜访后属性 = 子嗣属性 + baseEffect + 子嗣属性 * addExtent   向下取整  例：子嗣拜访后武力 = 子嗣拜访前武力 + baseEffect + 子嗣拜访前武力 * （1 + addExtent）
		let childInfo = data.childInfo;
		let addEffect = 0;//Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] * 4 + childInfo.total * Config.SadunCfg.receptionEffectList[data.level].addExtent);
		for(let i in childInfo.attr){
			addEffect += (Math.floor(Config.SadunCfg.baseEffect[childInfo.aquality - 1] + childInfo.attr[i] * Config.SadunCfg.receptionEffectList[data.level].addExtent));
		}
		let effectTxt = ComponentManager.getTextField(LanguageManager.getlocal(`adultAddEffect2`, [addEffect.toString()]), 20, 0xC6A28C);
		view.setLayoutPosition(LayoutConst.lefttop, effectTxt, statusTxt, [0,statusTxt.textHeight + 10]);
		view.addChild(effectTxt);
		view._effectTxt = effectTxt;

		if(data.isinreceive){
			let adulthbian = BaseBitmap.create("adultxxzhong");
			adulthbian.x = bg.x + bg.width - 20 - adulthbian.width;
			adulthbian.y = bg.y + bg.height - 20 - adulthbian.height;
			view.addChild(adulthbian);
		}else{
			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'adultChooseReceive', view.chooseBtnClick, view);
			btn.x = bg.x + bg.width - 20 - btn.width;
			btn.y = bg.y + bg.height - 20 - btn.height;
			view.addChild(btn);
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