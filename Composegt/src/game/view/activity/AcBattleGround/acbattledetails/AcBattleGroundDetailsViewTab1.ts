//
class AcBattleGroundDetailsViewTab1 extends CommonViewTab
{

	private _ruleBg:BaseBitmap;
	private _bottomBg:BaseBitmap;
	private _scrollList:ScrollList;
	private _cdText : BaseTextField = null;
	private code:string;
	private aid:string;

    public constructor(param?) {
        super();
		this.param = param;
		this.initView();
	}
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	public initView():void
	{

		this.code = this.param.data.code;
		this.aid = this.param.data.aid;

		let ruleBg = BaseBitmap.create("skin_myskinInfobg");
		ruleBg.x = GameConfig.stageWidth/2 - ruleBg.width/2;
		ruleBg.y = 0;
		this.addChild(ruleBg);
		this._ruleBg = ruleBg;

        let timeCdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundDetailsViewTime`,[this.vo.acTimeAndHour]), 20, 0x2f160f);
		timeCdTxt.x = 70;
		timeCdTxt.y = ruleBg.y + 70;
        this.addChild(timeCdTxt);

		let serverText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewServerList",[this.vo.getPkzidsStr()]), 20, 0x2f160f);
		serverText.x = timeCdTxt.x;
		serverText.y = timeCdTxt.y + timeCdTxt.height + 5;
		serverText.width = 500;
        this.addChild(serverText);

		let detailText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleDetailsDes"), 20, 0x2f160f);
		detailText.x = timeCdTxt.x;
		detailText.y = serverText.y + serverText.height + 5;
		detailText.width = 500;
		detailText.lineSpacing = 5;
        this.addChild(detailText);

		let ruleTitle = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewRuleTitle"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleTitle.x = GameConfig.stageWidth/2 - ruleTitle.width/2;
		ruleTitle.y = ruleBg.y + 5;
		this.addChild(ruleTitle);
		
		let leftline1 = BaseBitmap.create("public_v_huawen01");
		leftline1.x = ruleTitle.x - 10 - leftline1.width;
		leftline1.y = ruleTitle.y + ruleTitle.height/2 - leftline1.height/2;
		this.addChild(leftline1);

		let rightline1 = BaseBitmap.create("public_v_huawen01");
		rightline1.scaleX = -1;
		rightline1.x = ruleTitle.x + 10 + ruleTitle.width + rightline1.width;
		rightline1.y = ruleTitle.y + ruleTitle.height/2 - rightline1.height/2;
		this.addChild(rightline1);

        // 膜拜背景
        let bottomBg = BaseBitmap.create("public_9_wordbg");
		// bottomBg.height = 120;
        bottomBg.x = GameConfig.stageWidth /2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 69 -83 + 60;
		this.addChild(bottomBg);
		this._bottomBg = bottomBg;
		let curDetail = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewCurDetail"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN2);
		curDetail.x = GameConfig.stageWidth/2- curDetail.width/2;
		curDetail.y = this._bottomBg.y +15;
		this.addChild(curDetail);



        //排行榜内部
        let innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.height = bottomBg.y - ruleBg.y - ruleBg.height;
        innerBg.width = 620;
        innerBg.x = GameConfig.stageWidth/2 - innerBg.width/2;
        innerBg.y = ruleBg.y + ruleBg.height;
        this.addChild(innerBg);


		let timeTitle = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewTimeTitle"),20,TextFieldConst.COLOR_BROWN);
		timeTitle.x = GameConfig.stageWidth/2 - timeTitle.width/2;
		timeTitle.y = innerBg.y + 10;
		this.addChild(timeTitle);

		let leftline2 = BaseBitmap.create("public_v_huawen02");
		leftline2.scaleX = -1;
		leftline2.x = ruleTitle.x - 15;
		leftline2.y = timeTitle.y + timeTitle.height/2 - leftline2.height/2;
		this.addChild(leftline2);

		let rightline2 = BaseBitmap.create("public_v_huawen02");
		rightline2.x = ruleTitle.x + 15 + ruleTitle.width;
		rightline2.y = leftline2.y;
		this.addChild(rightline2);

       	let titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = innerBg.width - 20;
        titleBg.x = GameConfig.stageWidth/2 - titleBg.width/2;
        titleBg.y = innerBg.y + 45;
		this.addChild(titleBg);

		let randIndex = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRotation"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		let outTime = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewOutTime"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		let outNum = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewOutNum"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);

		randIndex.x = 130 - randIndex.width/2;
		randIndex.y = titleBg.y + titleBg.height/2 - randIndex.height/2;
		this.addChild(randIndex);

		outTime.x = 320 - outTime.width/2;
		outTime.y = titleBg.y + titleBg.height/2 - outTime.height/2;
		this.addChild(outTime);
		
		outNum.x = 510 - outNum.width/2;
		outNum.y = titleBg.y + titleBg.height/2 - outNum.height/2;
		this.addChild(outNum);


     	let scroRect = new egret.Rectangle(0, 0, innerBg.width,innerBg.height-125);//innerBg.height -titleBg.height - 90);
		let curRound = this.vo.getCurRound();
		this._scrollList  = ComponentManager.getScrollList(AcBattleGroundDetailsTimeScrollItem,this.cfg.weedOut,scroRect,{aid:this.param.data.aid,code:this.param.data.code,curRound:curRound});
		this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
		this._scrollList.y = innerBg.y + 80;
		this.addChild(this._scrollList);




		let border = BaseBitmap.create("public_9v_bg03");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth -69 - 83+5;
		border.x = 0;
		border.y = -5;
		this.addChild(border);

		let tipTxt = ComponentManager.getTextField('', 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;   
		tipTxt.height = 50; 
        this._cdText = tipTxt; 
		this.addChild(tipTxt);  


		TickManager.addTick(this.tick,this);
    
    }
	public tick():void{
      
        this.freshText();
     
    }
	private freshText():void{
        let view = this;
        this.code =  this.param.data.code;
        let period = view.vo.getCurperiod();
        //提示板信息
        let cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());

        let str = this.getDefaultCn("acBattleRoundCDTxt"+period);//`acBattleRoundCDTxt${view._period}-${code}`;
	 
        let param = [];
        let myRank = view.vo.getMyRank();

        switch(period){
            case 1:
                param.push(cd);
                break;
            case 2:
                param.push(cd);
                let need = view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine;
				// this.need  = need;
                if(period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()){
                    //最后一轮
                    str = this.getDefaultCn("acBattleRoundCDTxt4");//`acBattleRoundCDTxt4-${code}`;
                }
                else{
                    param.push(need);
                }
                if(view.vo.getAttendQuality()){
                    //没被淘汰
                    if(view.vo.getJoinIn())
					{  
						param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRank"), [myRank.toString()]));
						if(this.vo.getWaiting() == 1)
						{
							param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundRank"), [LanguageManager.getlocal("acBattleWaiting")]));
						}
                    }
                    else{
                        param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt5")));
                    }
                }
                else{
                    param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
                }
                break;
			case 3:
			case 4:
					 str = this.getDefaultCn("acBattleRoundCDTxt3");
                    param.push(view.vo.getWinnerAlliance().name);
                    let tyle = 1;
                    if(view.vo.getWinnerAlliance().mid == Number(Api.playerVoApi.getPlayerAllianceId())){
                        tyle = 9;
                    }
                    else if(view.vo.getAttendQuality()){
                        tyle = 7;
                    }
                    else{
                        tyle = 8;
                    }
                    param.push(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundCDTxt"+tyle)));
				break;
        }

		if(view._cdText)
		{	 
			view._cdText.text = LanguageManager.getlocal(str,param);
			view._cdText.x = GameConfig.stageWidth/2  - view._cdText.width/2;
			view._cdText.y = this._bottomBg.y + 50//GameConfig.stageHeigth - view._cdText.height-110;  
		}  


	}
	private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
   protected getResourceList():string[]
	{
		return super.getResourceList().concat([

        ]);
	}

	public dispose():void
	{
		TickManager.removeTick(this.tick,this);
		this._ruleBg = null;
		this._bottomBg = null;
		this._scrollList = null;
		this._cdText = null;
		this.code = null;
		this.aid = null;
        super.dispose();
    }
}