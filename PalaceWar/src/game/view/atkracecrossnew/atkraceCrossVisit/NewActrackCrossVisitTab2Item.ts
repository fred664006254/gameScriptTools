
class NewActrackCrossVisitTab2Item extends ScrollListItem {

	private uid:string ="";
	private zid:number =0;
	private data:any = null;

	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {	
		this.data = data;
		// 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
		this.uid=data.uid;
		this.zid =data.zid;
		
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

		let nameStr = "";
		let uidStr = "";
		let powerStr = ""
		if (data.type == "director"){
			nameStr = data.uinfo.name;
			uidStr = data.uinfo.uid;
			powerStr = data.uinfo.power;
		}
		else{
			nameStr = data.name;
			uidStr = data.uid;
			powerStr = data.power;
		}

		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		nameTxt.text =nameStr;
		nameTxt.x = rankImg.x+60
		nameTxt.y = rankImg.y+10;
		this.addChild(nameTxt);
		
		//衙门分数
		let atkraceyamenScoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		atkraceyamenScoreTxt.text =LanguageManager.getlocal("atkraceyamenid",[uidStr]);
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;// 220;
		atkraceyamenScoreTxt.y = rankImg.y+10;
		this.addChild(atkraceyamenScoreTxt);
		
		//势力    
		let str3= LanguageManager.getlocal("powerDes",[powerStr]);
		let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		powerTxt.text = str3;//+data.power;
		powerTxt.x = nameTxt.x;
		powerTxt.y = nameTxt.y+30;
		powerTxt.width =400;
		this.addChild(powerTxt);
		
		//对战信息    
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if (data.type == "director"){
			let vo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", Api.atkracecrossVoApi.newcrossCode);
			let fameCfg = vo.getFameCfgByLine(data.x);
			let fameName = LanguageManager.getlocal("newatkrackcross_fameTitleName"+(fameCfg.baseCfg.index+1));
			let fameStr = fameName;
			if (data.x > 1){
				let seatCount = fameCfg.seatCount + data.y;
				fameStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [fameName, seatCount]);
			}
			warInforMationTxt.text = LanguageManager.getlocal("newatkrackcross_fameDefenInfo2", [fameStr]);
			warInforMationTxt.textColor =TextFieldConst.COLOR_QUALITY_RED;
		}
		else{
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
		}
		
		warInforMationTxt.width = 400;
		warInforMationTxt.lineSpacing = 5;
		warInforMationTxt.x = powerTxt.x;
		warInforMationTxt.y = powerTxt.y+30;
		this.addChild(warInforMationTxt);

		bg.height = warInforMationTxt.y + warInforMationTxt.height + line.height + 16;
		line.y = bg.y + bg.height - 6;

		if (data.type != "director" && data.retscore>=0)
		{
			let scoregurde = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
			scoregurde.text = LanguageManager.getlocal("newatkraceScoreguard");
			scoregurde.x = warInforMationTxt.x;
			scoregurde.y = warInforMationTxt.y+warInforMationTxt.height+3;
			this.addChild(scoregurde);
			bg.height = scoregurde.y + scoregurde.height + line.height + 16;
			line.y = bg.y + bg.height - 6;
		}

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_ORANGE);
		if (data.type == "director"){
			timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.fightst, 4);
		}
		else{
			timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		}
		timerTxt.x =485;
		timerTxt.y =nameTxt.y;
		this.addChild(timerTxt);
		
		//复仇按钮
		if (data.type != "director"){
			let revengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceRevenge",this.revengeBtnHandler,this);
			revengeBtn.setScale(0.85);
			revengeBtn.x = timerTxt.x-30;
			revengeBtn.y = timerTxt.y+40;
			this.addChild(revengeBtn);
		}

		if (data.expired)
		{
			let expired:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			expired.x =nameTxt.x ;
			expired.y = warInforMationTxt.y+warInforMationTxt.height+5;
			this.addChild(expired);

			line.y+=12;
			bg.height+=12;

		}
	}
	private revengeBtnHandler(evt:egret.TouchEvent):void
	{
		var data:any =[];
		data.type=2;//复仇
		data.uid=this.uid;
		data.zid =this.zid;
		AtkraceCrossChallengeItem.data =data;
		Api.atkracecrossVoApi.revengeIdx = this._index + 1;
	
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO, {"fuid":this.data.uid});
			
	}

	private useCallback(data:any):void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		if (data.data.ret == true)
		{
			let atkraceinfo =data.data.data.data.atkraceinfo; 

			ViewController.getInstance().openView(ViewConst.POPUP.NEWATKRACECROSSCHALLENGEVIEW,{info:atkraceinfo});
		}
	}

    
	public getSpaceY(): number {
		return 10;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {

		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETINFO), this.useCallback, this);
		AtkraceCrossChallengeItem.data=null;
		this.data = null;
		super.dispose();
	}
}