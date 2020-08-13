
class AcBattileGroundVisitTab1Item extends ScrollListItem {


	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {

		//{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
		// (1随机 2复仇 3挑战 4追杀 5出师令)  data.atype
		let bg = BaseBitmap.create("public_listbg");
		bg.width=520;
		bg.height=140;
		bg.x =0;
		// bg.visible =false;
		this.addChild(bg);

		
		

		// let rankImg = BaseBitmap.create("rankinglist_rankbg");
		// rankImg.x = bg.x+20
		// rankImg.y = 10;
		// this.addChild(rankImg);

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankTxt.text = String(index+1);
		rankTxt.x =  40 - rankTxt.width/2;
		rankTxt.y = 10;
		this.addChild(rankTxt);

		let line = BaseBitmap.create("public_line1");
		line.x =bg.width/2 - line.width/2;
		line.y = rankTxt.y + rankTxt.height + 10;
		this.addChild(line);

		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTxt.text =data.name;
		nameTxt.x = 60
		nameTxt.y = rankTxt.y;
		this.addChild(nameTxt);

		//衙门分数
		let atkraceyamenScoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		atkraceyamenScoreTxt.text =LanguageManager.getlocal("atkraceyamenscore",[data.point]);
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;//220;//rankImg.x+60
		atkraceyamenScoreTxt.y = nameTxt.y;
		this.addChild(atkraceyamenScoreTxt);
	
		var servantName =Config.ServantCfg.getServantItemById(data.sid).name;
		//描述    
		let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		
		if(data.fname){
			if(data.atype==4)
			{
				describeTxt.text = LanguageManager.getlocal("atkracedefensedesBattleground4",[servantName,data.fname,data.num]);
			}
			else
			{
				describeTxt.text = LanguageManager.getlocal("atkracedefensedesBattleground",[servantName,data.fname,data.num]);
			} 
		} else {
			if(data.atype==4)
			{
				describeTxt.text = LanguageManager.getlocal("atkracedefensedes4",[servantName,data.num]);
			}
			else
			{
				describeTxt.text = LanguageManager.getlocal("atkracedefensedes",[servantName,data.num]);
			} 
		}

		describeTxt.x = nameTxt.x;
		describeTxt.y = line.y+12;
		describeTxt.width =440;
		describeTxt.multiline = true;
		describeTxt.lineSpacing = 3;
		this.addChild(describeTxt);
		
		//对战信息    atkracewardes
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		var str ="";
		if(data.retscore>=0)
		{
			str =LanguageManager.getlocal("atkracewardes",[data.retscore]);
			warInforMationTxt.textColor =TextFieldConst.COLOR_WARN_GREEN;
		}else
		{
		    str =LanguageManager.getlocal("atkracewardes2",[data.retscore+""]);
			warInforMationTxt.textColor = TextFieldConst.COLOR_WARN_RED2;
		}
		warInforMationTxt.text =str;
		warInforMationTxt.x = describeTxt.x;
		warInforMationTxt.y = bg.y + bg.height - 35;
		this.addChild(warInforMationTxt);

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_ORANGE);
		timerTxt.text =  App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		// var str2:string  = App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		
	
		timerTxt.x =410;
		timerTxt.y =nameTxt.y;
		this.addChild(timerTxt);

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