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
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,acVo:AcBaseVo):void
	{

		this._acVo = acVo;

		this.width = GameConfig.stageWidth;
		this.height = 312 + this.getSpaceY();

		let bg:BaseBitmap = BaseBitmap.create("ranactivecellbg");
		bg.x = this.width/2 - bg.width/2;
		// Bg.y = 40;
		this.addChild(bg);



		let acBgStr = "rankactive_bg_" + acVo.atype;

		let acBg:BaseBitmap = BaseLoadBitmap.create(acBgStr);
		this.addChild(acBg);
		acBg.x = 35;
		acBg.y = 20;

		let nameBg:BaseBitmap = BaseBitmap.create("rankactivenamebg");
		nameBg.x = 30;
		nameBg.y = 8;
		this.addChild(nameBg);

		let acNameStr = "rankactive_name_" + acVo.atype;

		let acName:BaseBitmap = BaseLoadBitmap.create(acNameStr,null,{callback:function(){
			if (PlatformManager.checkIsTextHorizontal()){
				nameBg.width = acName.width + 10;
				nameBg.setPosition(30,130)
				if(PlatformManager.checkIsEnLang())
				{
					nameBg. y = 160; 
				}
				// acName.x = nameBg.x + 16;
				// acName.y = nameBg.y + 5;
				acName.setPosition(nameBg.x + nameBg.width / 2 - acName.width / 2,nameBg.y + nameBg.height / 2 - acName.height / 2)
			} 
			else
			 {
				acName.x = nameBg.x + 16;
				acName.y = nameBg.y + 20; 
		}
		},callbackThisObj:null});
		this.addChild(acName);


		let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(acVo.aid,String(acVo.code));

        // acRankActiveDesc1
        let rankDescTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        // rankDescTxt = rankDescTxt;
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 5;
        // rankDescTxt.width = 240;
        rankDescTxt.text = LanguageManager.getlocal("acRankActiveDesc"+acVo.atype,[rankcfg.getMaxRangValue()]);
        rankDescTxt.x = 40;
        rankDescTxt.y = 210;
        this.addChild(rankDescTxt);
        

		let acTimeTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        let stTxt = App.DateUtil.getFormatBySecond(acVo.st,7);
        let etTxt = App.DateUtil.getFormatBySecond(acVo.et - 86400,7);
        let timeStr = App.DateUtil.getOpenLocalTime(acVo.st,acVo.et,true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        // acTimeTxt.width = activity_rank_rightBg2.width - 50;
        acTimeTxt.text = acVo.getAcLocalTime(true);
        //  LanguageManager.getlocal("acRank_actime",[timeStr]);
        // this.acVo.acLocalCountDown;
        acTimeTxt.x = 40;
        acTimeTxt.y = rankDescTxt.y + rankDescTxt.height + 8;
        this.addChild(acTimeTxt);

        let deltaT = acVo.et -86400 - GameData.serverTime;
        let acCDTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
        this._acCDTxt = acCDTxt;
        if (this._acCDTxt && deltaT > 0){
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
        }else{
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[LanguageManager.getlocal("acRank_acCDEnd_new")]);
		}
        acCDTxt.x = 40;
        acCDTxt.y = acTimeTxt.y + acTimeTxt.height + 8;;
        this.addChild(acCDTxt);
        


		let rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acRank_enter",this.rankListBtnHandler,this);
		rankListBtn.x = 470;
		rankListBtn.y = 240;
		this.addChild(rankListBtn);

		//产出跨服
		if (rankcfg.isCross) 
		{	
			let mapName:string = `cross_${rankcfg.isCross}_tip`;
			let vo : AcRankActiveVo = <AcRankActiveVo>Api.acVoApi.getActivityVoByAidAndCode(acVo.aid,String(acVo.code));
            let aid = vo.getCrossActivityAid();
			if(aid !== ''){
				let acvo = Api.acVoApi.getActivityVoByAidAndCode(aid);
				mapName = `cross_${aid}_tip`;
				// mapName = `cross_${aid}_tip${acvo && acvo.zids && acvo.isCrossLeague() ? `_multicross`: ``}`;
				// if (acvo && acvo.zids && acvo.isCrossFengYun()){
				// 	mapName = `cross_${aid}_tip_fengyun`;
				// }
			}
            
			let crossTip:BaseLoadBitmap = BaseLoadBitmap.create(mapName);
			crossTip.setPosition(360,20);
			this.addChild(crossTip);
		}


		TickManager.addTick(this.tick,this);
	}


	private tick():void
	{
		let deltaT = this._acVo.et  - 86400 - GameData.serverTime;
		if (this._acCDTxt && deltaT > 0){
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
			// return true;
        }else{
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD",[LanguageManager.getlocal("acRank_acCDEnd_new")]);
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
		TickManager.removeTick(this.tick,this);
		super.dispose();
	}
}