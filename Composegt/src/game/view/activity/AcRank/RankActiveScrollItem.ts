/**
 * 冲榜
 * author dky
 * date 2018/2/27
 * @class RankActiveScrollItem
 */
class RankActiveScrollItem extends ScrollListItem
{
	// 亲密度文本
	private _intimacyTF:BaseTextField;
	// 魅力文本
	private _glamourTF:BaseTextField;
	private _wifeInfoVo:WifeInfoVo;
	// this.
	private _acCDTxt:BaseTextField;

	private _acVo:AcBaseVo;
	private _acName = null;
	public constructor() 
	{
		super();
	}

	public initItem(index:number,acVo:AcBaseVo):void
	{

		this._acVo = acVo;

		this.width = 636;
		this.height = 340 + this.getSpaceY();

		let bg:BaseBitmap = BaseBitmap.create("activity_rank_listbg");
		// bg.x = 15;
		// bg.width =606;
		// bg.height =315; 
		this.addChild(bg);


		let acBgStr = "rankactive_bg_" + acVo.atype;

		let acBg:BaseBitmap = BaseLoadBitmap.create(acBgStr);
		this.addChild(acBg);
		acBg.x = this.width/2-578/2;
		acBg.y = 43;

		// let nameBg:BaseBitmap = BaseBitmap.create("activity_charge_red");
		// nameBg.x = 15;
		// nameBg.y = 8; 
		// this.addChild(nameBg);
		//韩国开服特殊版本  权势冲榜
		let acNameStr = "rankactive_name_" + acVo.atype;
		if(this._acVo.code.toString() == "51")
		{
			acNameStr = "rankactive_name_1-1";
		} 
		else if(this._acVo.code.toString() == "52")
		{
			acNameStr = "rankactive_name_2-1";
		}

		let nameComplete=function(container:BaseDisplayObjectContainer):void
		{
			console.log("nameComplete",this._acName.width);
			this._acName.x = this.width/2 - this._acName.width/2;
			this._acName.y = bg.y + 14 - this._acName.height/2;
		}

		let acName:BaseBitmap = BaseLoadBitmap.create(acNameStr,null,{callback:nameComplete,callbackThisObj:this});
		this._acName = acName;
		this.addChild(acName);


		let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(acVo.aid,String(acVo.code)); 
        let rankDescTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN_NEW); 
		// rankDescTxt.width = 440;
        // rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 3; 
        rankDescTxt.text = LanguageManager.getlocal("acRankActiveDesc"+acVo.atype,[rankcfg.getMaxRangValue()]);
        rankDescTxt.x = 33;
        rankDescTxt.y = 223;
        this.addChild(rankDescTxt);
        

		let acTimeTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN_NEW);
        let stTxt = App.DateUtil.getFormatBySecond(acVo.st,7);
        let etTxt = App.DateUtil.getFormatBySecond(acVo.et - 86400,7);
        let timeStr = App.DateUtil.getOpenLocalTime(acVo.st,acVo.et,true);
        // acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        // acTimeTxt.width = activity_rank_rightBg2.width - 50;
        acTimeTxt.text = acVo.getAcLocalTime(true);
        //  LanguageManager.getlocal("acRank_actime",[timeStr]);
        // this.acVo.acLocalCountDown;
        acTimeTxt.x = 33;
        acTimeTxt.y = rankDescTxt.y + rankDescTxt.height + 3;
        this.addChild(acTimeTxt);

        let deltaT = acVo.et -86400 - GameData.serverTime;
        let acCDTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN_NEW);
        this._acCDTxt = acCDTxt;

        if (this._acCDTxt && deltaT > 0){
			let showType = 8;
			if(PlatformManager.checkIsViSp())
			{
				showType = 1;
			}
			this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[App.DateUtil.getFormatBySecond(deltaT,showType)]);
        }else{
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[LanguageManager.getlocal("acRank_acCDEnd")]);
		}
        acCDTxt.x = 33;
        acCDTxt.y = acTimeTxt.y + acTimeTxt.height + 3;;
        this.addChild(acCDTxt);
        


		let rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acRank_enter",this.rankListBtnHandler,this);
		rankListBtn.x = 475;
		rankListBtn.y = 250;
		this.addChild(rankListBtn);

		//产出跨服
		if (rankcfg.isCross == 1 || rankcfg.isCross ==2) 
		{
			let crossTip:BaseLoadBitmap = BaseLoadBitmap.create("atkracecross_tip");
			crossTip.setPosition(370,43);
			this.addChild(crossTip);
		}


		TickManager.addTick(this.tick,this);
	}


	private tick():void
	{
		let deltaT = this._acVo.et  - 86400 - GameData.serverTime;
		if (this._acCDTxt && deltaT > 0){
			let showType = 8;
			if(PlatformManager.checkIsViSp())
			{
				showType = 1;
			}
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[App.DateUtil.getFormatBySecond(deltaT,showType)]);
			// return true;
        }else{
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[LanguageManager.getlocal("acRank_acCDEnd")]);
		}
	}
	private rankListBtnHandler(event:egret.TouchEvent):void
	{
		ViewController.getInstance().openView("Ac"+App.StringUtil.firstCharToUper(this._acVo.aid)+"View",this._acVo.code);

	}

	public refreshData(id:number)
	{	
		let wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
		this._intimacyTF.text = wifeInfo.intimacy.toString();
		this._glamourTF.text = wifeInfo.glamour.toString();
	}


	public getSpaceY():number
	{
		return 5;
	}

	public dispose():void
	{
		this._intimacyTF = null;
		this._glamourTF = null;
		this._wifeInfoVo = null;
		this._acVo = null;
		this._acCDTxt = null;
		this._acName = null;
		TickManager.removeTick(this.tick,this);
		super.dispose();
	}
}