
class AcBattileGroundVisitTab2Item extends ScrollListItem {

	private _mainTaskHandKey:string = null;
	private uid:string ="";
	private _code:string='';
	private _data : any = null;
	public constructor() {
		super();
	}

	private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
        return AcConst.AID_BATTLEGROUND;
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
		line.y =120;
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
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		nameTxt.text =data.name;
		nameTxt.x = rankImg.x+60
		nameTxt.y = rankImg.y+10;
		this.addChild(nameTxt);
		
		//衙门分数
		let atkraceyamenScoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		atkraceyamenScoreTxt.text =LanguageManager.getlocal("atkraceyamenscore",[data.point]);
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;// 220;
		atkraceyamenScoreTxt.y = rankImg.y+10;
		this.addChild(atkraceyamenScoreTxt);
		
		let str3= LanguageManager.getlocal("powerDes",[data.power]);
		//势力    
		let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		powerTxt.text = str3;
		powerTxt.x = nameTxt.x;
		powerTxt.y = nameTxt.y+30;
		powerTxt.width =400;
		this.addChild(powerTxt);
		
		//对战信息    
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);

		let newPoint:number = Number(data.point);
		if (data.retscore != null)
		{
			newPoint =  Number(data.retscore);
		}

		if(newPoint>=0)
		{
			var str =LanguageManager.getlocal("atkracewardes",[String(newPoint)]);
			warInforMationTxt.text=str;
			warInforMationTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
		}else
		{
		   var str =LanguageManager.getlocal("atkracewardes2",[String(newPoint)]);
			warInforMationTxt.text =str;
			warInforMationTxt.textColor =TextFieldConst.COLOR_QUALITY_RED;
		}
		warInforMationTxt.text = str;
		warInforMationTxt.x = powerTxt.x;
		warInforMationTxt.y = powerTxt.y+30;
		this.addChild(warInforMationTxt);

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_ORANGE);
		timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		timerTxt.x =nameTxt.x+300;
		timerTxt.y =nameTxt.y;
		this.addChild(timerTxt);
		
		//复仇按钮
		let revengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceRevenge",this.revengeBtnHandler,this);
		revengeBtn.setScale(0.85);
		revengeBtn.x = timerTxt.x;//-40;
		revengeBtn.y = timerTxt.y+40;
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
			App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip4-${this._code}`));
			return;
		}
		var data:any =[];
		data.battleground = true;
		data.code = this._code;
		data.type = 2;//复仇
		data.uid = this.uid;
		data.ownuid = this._data.ownuid;
		data.fkey = this._data.fkey;
		AtkraceChallengeItem.data = data;
		this.vo.setRevengeIdx(this._index + 1);
		ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
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