
class AcGroupWifeBattleVisitTab2Item extends ScrollListItem {

	private _mainTaskHandKey:string = null;
	private uid:string ="";
	private _code:string='';
	private _data : any = null;
	public constructor() {
		super();
	}

	private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}
	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return AcConst.AID_GROUPWIFEBATTLE;
	}

	protected initItem(index: number, data: any, itemparam?) 
    {	
		// 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
		this._data = data;
		this.uid=data.uid;
		this._code = itemparam;
		let bg = BaseBitmap.create("");
		bg.width=516;
		bg.height=126;
		bg.x =60;
		this.addChild(bg);

		let line = BaseBitmap.create("public_line1");
		line.x =60;
		line.y =110;
		this.addChild(line);
		

		let rankImg = BaseBitmap.create("rankinglist_rankbg");
		rankImg.x = bg.x+20
		rankImg.y = 10;
		this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x+(rankImg.width-rankTxt.width)/2;
		rankTxt.y = rankImg.y+10;
		this.addChild(rankTxt);

		//名称  
		let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleVisitTab1Tip1`,[data.aname,data.auid]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		nameTxt.x = rankImg.x+60
		nameTxt.y = rankImg.y+10;
		this.addChild(nameTxt);

		let startTimeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		startTimeTxt.text =LanguageManager.getlocal("acGroupWifeBattleVisitTab1Tip4",[App.DateUtil.getFormatBySecond(data.st, 2)]);
		startTimeTxt.x = nameTxt.x;
		startTimeTxt.y = nameTxt.y+nameTxt.height+8;
		this.addChild(startTimeTxt);		
		
		//对战信息    
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		var str ="";
		if(data.winflag)
		{
			str =LanguageManager.getlocal("acGroupWifeBattleVisitTab1Tip5",["-"+data.ddefScore]);
			warInforMationTxt.textColor = TextFieldConst.COLOR_WARN_RED;
			
		}else
		{
		    str =LanguageManager.getlocal("acGroupWifeBattleVisitTab1Tip5",["+"+data.ddefScore+""]);
			warInforMationTxt.textColor = TextFieldConst.COLOR_WARN_GREEN;
		}
		warInforMationTxt.text =str;
		warInforMationTxt.x = nameTxt.x;
		warInforMationTxt.y = startTimeTxt.y+startTimeTxt.height+8;
		this.addChild(warInforMationTxt);

		//时间  
		// let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_ORANGE);
		// timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		// timerTxt.x =nameTxt.x+300;
		// timerTxt.y =nameTxt.y;
		// this.addChild(timerTxt);
		
		//复仇按钮
		let revengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acGroupWifeBattleAvengerBtn",this.revengeBtnHandler,this);
		revengeBtn.setScale(0.85);
		revengeBtn.x = nameTxt.x+300;//-40;
		revengeBtn.y = nameTxt.y+30;
		this.addChild(revengeBtn);

		egret.callLater(()=>{
			this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
				revengeBtn,
				revengeBtn.width/2,
				revengeBtn.height/2, 
				[revengeBtn],
				603, 
				true, 
				function() {
					if (index === 0) {
						this.parent.setChildIndex(this, 100);
						return true;
					} else {
						return false;
					}
				}, 
				this
			);
		},this);
	}

	private revengeBtnHandler(evt:egret.TouchEvent):void
	{
		if(!this.vo.getAttendQuality()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
			return;
		}
		if(this.vo.isActyEnd()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
			return;
		}
		if(this.vo.getCurperiod() == 3){
			App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
			return;
		}
		if(!this.vo.getJoinIn()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${this._code}`));
			return;
		}
		let cfg = Config.ItemCfg.getItemCfgById(this.cfg.needItem.chanllge);
		let have = Api.itemVoApi.getItemNumInfoVoById(cfg.id);
		if(have > 0)
		{
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHALLENGE,{activeId:this.vo.aidAndCode,fuid:this._data.auid});
		}else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleItemNoEnoughTip`,[cfg.name]));
		}
	}
    
	public getSpaceY(): number {
		return 10;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {
		AtkraceChallengeItem.data=null;
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		super.dispose();
	}
}