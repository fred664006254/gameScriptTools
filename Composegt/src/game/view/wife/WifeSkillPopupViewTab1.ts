//
class WifeSkillPopupViewTab1 extends CommonViewTab
{
    private _wifeInfoVo: WifeInfoVo;
    private _text1:BaseTextField;
    private _scrollList: ScrollList;
    private _index:number = 0;
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}


	

	// protected getListType():number
	// {
	// 	return 1;
	// }

	protected initView():void
	{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(WifeSkillPopupView.wifeId);
		let cfg = Config.WifeCfg.getWifeCfgById(WifeSkillPopupView.wifeId);
		let serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)
		// public_listbg3
		
        let topBg = BaseBitmap.create("public_listbg3");
		topBg.width = 530;
		topBg.height = 130;
		topBg.x = GameConfig.stageWidth/2 - topBg.width/2 - 5;//51;//GameConfig.stageWidth/2 - topBg.width/2;
		topBg.y = 70;
		this.addChild(topBg);

		// let cor1 = BaseBitmap.create("public_tcdw_bg01");
		// cor1.skewX = 180;
		// cor1.x = topBg.x;
		// cor1.y = topBg.y + topBg.height;
		// this.addChild(cor1);

		// let cor2 = BaseBitmap.create("public_tcdw_bg02");
		// cor2.x = topBg.x + topBg.width-cor2.width;
		// cor2.y = topBg.y;
		// this.addChild(cor2);

		let serBg = serCfg.qualityBoxImgPath;
		if(Api.servantVoApi.getServantObj(cfg.servantId)){
			let serVo = Api.servantVoApi.getServantObj(cfg.servantId);
			serBg = serVo.qualityBoxImgPath;
		}

	    let temW:number = 108;
		let iconBgBt:BaseBitmap = BaseLoadBitmap.create(serBg);
		iconBgBt.x = topBg.x + 15;
		iconBgBt.y = topBg.y + 12;
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
		iconBgBt.scaleY = temW/192;
		
		let obj = Api.servantVoApi.getServantObj(cfg.servantId);
		let halfIcon = obj ? obj.halfImgPath : serCfg.halfIcon
		let iconBt:BaseBitmap = BaseLoadBitmap.create(halfIcon);
		iconBt.x = iconBgBt.x + 1.5;
		iconBt.y = iconBgBt.y + 2;
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
		iconBt.scaleY = (temW-10)/177;

		let nameStr = LanguageManager.getlocal("wifeSkillServant",[serCfg.name]);
		let nameTF = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		nameTF.x = iconBt.x + 130 ;
		nameTF.y = topBg.y + 25;
		this.addChild(nameTF);

		if(!Api.servantVoApi.getServantObj(cfg.servantId))
		{
			let getTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeServantGet"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
			getTF.x = nameTF.x + nameTF.width + 5;
			getTF.y = nameTF.y;
			this.addChild(getTF);

			let maskBt:BaseBitmap = BaseBitmap.create("wifeview_mask");
			maskBt.x = iconBgBt.x;
			maskBt.y = iconBgBt.y;
			this.addChild(maskBt);
		

		}
		
		let expStr = LanguageManager.getlocal("wifeExp") +  " " + App.StringUtil.changeIntToText(this._wifeInfoVo.exp);
		this._text1 = ComponentManager.getTextField(expStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		this._text1.x = nameTF.x;
		this._text1.y = nameTF.y + nameTF.height + 10;
		this.addChild(this._text1);

		let tipTF = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkilTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
		tipTF.x = nameTF.x;
		tipTF.y = this._text1.y + this._text1.height + 10;
		this.addChild(tipTF);

		let list =this._wifeInfoVo.cfg.wifeSkill; 
		let newList:Array<any> =[]; 
		if(PlatformManager.checkIsWxCfg())
		{
			newList = list;
		}
		else 
		{
			for(var i:number=0; i<list.length; i++)
			{
				if(list[i].condition)
				{
					newList.push(list[i]);
				}
			} 
		} 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,595);
		this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem,newList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 -5 ,topBg.y + topBg.height + 5);

	}
	private doGive(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_WIFE_UPGRADESKILL, { wifeId: this.param.data.id.toString(),key:data.index});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADESKILL) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <WifeSkillScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
			this._text1.text = expStr;
			// this._text2.text = this._wifeInfoVo.glamour.toString();
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
			
		}

		
	}


	public dispose():void
	{

        this._wifeInfoVo = null;
        this._text1 = null;
        this._scrollList = null;
        this._index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_SKILLUPD,this.doGive,this);
		super.dispose();
	}

}