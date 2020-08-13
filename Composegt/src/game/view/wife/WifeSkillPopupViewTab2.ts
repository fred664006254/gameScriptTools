//
class WifeSkillPopupViewTab2 extends CommonViewTab
{
    private _wifeInfoVo: WifeInfoVo;
    // private _text1:BaseTextField;
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
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_ARSKILLUPD,this.doGive,this);
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(WifeSkillPopupView.wifeId);

		let detailBg = BaseBitmap.create("popupview_bg4");
		detailBg.x = GameConfig.stageWidth/2 - detailBg.width/2-5;
		detailBg.y = 50;
		this.addChild(detailBg);

        //子嗣个数
        let childValue = LanguageManager.getlocal("wifeSkillPopupChildrenNum",[String(this._wifeInfoVo.child)]);
        let childrenValueText = ComponentManager.getTextField(childValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        childrenValueText.x = 135
        childrenValueText.y = 80;
        this.addChild(childrenValueText);

        let artistryValue = LanguageManager.getlocal("wifeSkillPopupArtistry",[String(this._wifeInfoVo.artistry)]);
        let artistryText = ComponentManager.getTextField(artistryValue ,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        
        artistryText.x = 372;
        artistryText.y = 80;
        this.addChild(artistryText);


		let cfg = Config.WifeCfg.getWifeCfgById(WifeSkillPopupView.wifeId);
		let serCfg = Config.ServantCfg.getServantItemById(cfg.servantId)


		let list:Array<any> =this._wifeInfoVo.cfg.getArtistrySkillList(); 
		// let newList:Array<any> =[]; 
		// if(PlatformManager.checkIsWxCfg())
		// {
		// 	newList = list;
		// }
		// else 
		// {
		// 	for(var i:number=0; i<list.length; i++)
		// 	{
		// 		if(list[i].condition)
		// 		{
		// 			newList.push(list[i]);
		// 		}
		// 	} 
		// } 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,480 + 90);
		this._scrollList = ComponentManager.getScrollList(WifeSkillScrollItem2,list,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(GameConfig.stageWidth/2 - this._scrollList.width/2 - 5 ,artistryText.y + artistryText.height + 20);

	}
	private doGive(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		this.request(NetRequestConst.REQUEST_WIFE_UPGRADEEXTRASKILL, { wifeId: this.param.data.id.toString(),key:data.index});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_WIFE_UPGRADEEXTRASKILL) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <WifeSkillScrollItem2>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			// let id = this.param.data.id
			// this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			// let expStr = LanguageManager.getlocal("wifeExp") +  " " + this._wifeInfoVo.exp.toString();
			// this._text1.text = expStr;
			// this._text2.text = this._wifeInfoVo.glamour.toString();
			App.CommonUtil.showTip(LanguageManager.getlocal("wifeSkillUpdSuccess"));
			
		}

		
	}


	public dispose():void
	{

        this._wifeInfoVo = null;
        // this._text1 = null;
        this._scrollList = null;
        this._index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_ARSKILLUPD,this.doGive,this);
		super.dispose();
	}

}