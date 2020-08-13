
class NewActrackCrossVisitTab1Item extends ScrollListItem {


	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {

		//{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
		
		let bg = BaseBitmap.create("public_9_bg25");
		bg.width=516;
		bg.height=126;
		bg.x =60;
		bg.visible =false;
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
		if (data.type == "director"){
			nameStr = data.uinfo.name;
			uidStr = data.uinfo.uid;
		}
		else{
			nameStr = data.name;
			uidStr = data.uid;
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
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;//220;//rankImg.x+60
		atkraceyamenScoreTxt.y = rankImg.y+10;
		this.addChild(atkraceyamenScoreTxt);
	
		
		//描述    
		let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		//对战信息    atkracewardes
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);

		if (data.type == "director"){
			let vo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace", Api.atkracecrossVoApi.newcrossCode);
			let descStr = LanguageManager.getlocal("newatkrackcross_fameDefenInfo1");
			let resultStr = LanguageManager.getlocal("newatkrackcross_fameDefenResult1");
			warInforMationTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
			if (data.winuid != Api.playerVoApi.getPlayerID()){
				let fameCfg = vo.getFameCfgByLine(data.x);
				let fameName = LanguageManager.getlocal("newatkrackcross_fameTitleName"+(fameCfg.baseCfg.index+1));
				let fameStr = fameName;
				if (data.x > 1){
					let seatCount = fameCfg.seatCount + data.y;
					fameStr = LanguageManager.getlocal("newatkrackcross_famePtitleSeat", [fameName, seatCount]);
				}
				descStr = LanguageManager.getlocal("newatkrackcross_fameDefenInfo2", [fameStr]);
				resultStr = LanguageManager.getlocal("newatkrackcross_fameDefenResult2", [fameStr]);
				warInforMationTxt.textColor = 0xff0000;
			}
			describeTxt.text = descStr;
			warInforMationTxt.text = resultStr;
		}
		else{
			var servantName =Config.ServantCfg.getServantItemById(data.sid).name;
			describeTxt.text = LanguageManager.getlocal("atkracedefensedes",[servantName,data.num]);
			var str ="";
			if(data.retscore>=0)
			{
				str =LanguageManager.getlocal("atkracewardes",[data.retscore]);
				warInforMationTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
			}else
			{
				str =LanguageManager.getlocal("atkracewardes2",[data.retscore+""]);
				warInforMationTxt.textColor = 0xff0000;//TextFieldConst.COLOR_WARN_RED2;
			}
			warInforMationTxt.text =str;
		}
		describeTxt.x = nameTxt.x;
		describeTxt.y = nameTxt.y+30;
		describeTxt.width =400;
		this.addChild(describeTxt);

		if (data.type == "director"){
			let startTimeTxt=ComponentManager.getTextField(LanguageManager.getlocal("startBattleTimeDesc",[App.DateUtil.getFormatBySecond(data.fightst, 2)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			startTimeTxt.x =describeTxt.x;
			startTimeTxt.y = describeTxt.y+describeTxt.height+5;
			this.addChild(startTimeTxt);

			warInforMationTxt.x = startTimeTxt.x;
			warInforMationTxt.y = startTimeTxt.y+startTimeTxt.height + 5;
			line.y = warInforMationTxt.y + warInforMationTxt.height + 11;
			bg.height = line.y + 6;
		}
		else{
			let startTimeTxt:BaseTextField = null;
			let endTime:BaseTextField = null;
			warInforMationTxt.x = describeTxt.x;
			if (data.startts){
				startTimeTxt=ComponentManager.getTextField(LanguageManager.getlocal("startBattleTimeDesc",[App.DateUtil.getFormatBySecond(data.startts, 2)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
				startTimeTxt.x =describeTxt.x;
				startTimeTxt.y = describeTxt.y+describeTxt.height+5;
				this.addChild(startTimeTxt);
				warInforMationTxt.y = startTimeTxt.y+startTimeTxt.height+5;
			}
			if (data.st){
				endTime = ComponentManager.getTextField(LanguageManager.getlocal("endTimeDesc",[App.DateUtil.getFormatBySecond(data.st, 2)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
				endTime.x =describeTxt.x;
				endTime.y = describeTxt.y+describeTxt.height+5;
				if (startTimeTxt){
					endTime.x =startTimeTxt.x;
					endTime.y = startTimeTxt.y+startTimeTxt.height+5;
				}
				this.addChild(endTime);
				warInforMationTxt.y = endTime.y+endTime.height+5;
			}
			line.y = warInforMationTxt.y + warInforMationTxt.height + 11;
			bg.height = line.y + 6;
			// warInforMationTxt.x = describeTxt.x;
			// warInforMationTxt.y = describeTxt.y+42;
		}
		this.addChild(warInforMationTxt);

		//newatkraceScoreguard
		if (data.type != "director" && data.num == 1 && data.retscore == 2 || data.num>1 && data.retscore>=0)
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

		if (data.expired)
		{
			let expired:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("atkrace_timeout"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			expired.x =describeTxt.x;
			expired.y = warInforMationTxt.y+warInforMationTxt.height+5;
			this.addChild(expired);

			// line.y+=28;
			// bg.height+=28;
			line.y = expired.y + expired.height + 11;
			bg.height = line.y + 6;

		}
	}
    
	public getSpaceY(): number {
		return 0;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {

		super.dispose();
	}
}