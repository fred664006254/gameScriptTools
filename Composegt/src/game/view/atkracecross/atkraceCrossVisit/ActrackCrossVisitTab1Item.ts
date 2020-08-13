
class ActrackCrossVisitTab1Item extends ScrollListItem {


	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {

		//{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
		this.width = 640;
		this.height = 120;
		let bg = BaseBitmap.create("public_listbg");
		bg.width=516;
		bg.height=120;
		// bg.x =60;
		bg.x = GameConfig.stageWidth/2 - bg.width/2;
		this.addChild(bg);
		bg.visible = false;
		
		if(index > 0){
			let line = BaseBitmap.create("public_line4");
			line.width = 503;
			line.x = GameConfig.stageWidth/2- line.width/2;
			line.y = bg.y - line.height/2;
			this.addChild(line);
		}
		// let line = BaseBitmap.create("public_line1");
		// line.x =60;
		// line.y =120;
		// this.addChild(line);
		

		
		let rankImg = BaseBitmap.create("rankinglist_rankbg");
		rankImg.x = bg.x+10
		rankImg.y = 10;
		this.addChild(rankImg);
		rankImg.visible =false;

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x+(rankImg.width-rankTxt.width)/2;
		rankTxt.y = rankImg.y+10;
		this.addChild(rankTxt);

		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTxt.text =data.name;
		nameTxt.x = rankImg.x+45
		nameTxt.y = rankImg.y+10;
		this.addChild(nameTxt);

		//衙门分数
		let atkraceyamenScoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		atkraceyamenScoreTxt.text =LanguageManager.getlocal("atkraceyamenscore",[data.point]);
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;//220;//rankImg.x+60
		atkraceyamenScoreTxt.y = rankImg.y+10;
		this.addChild(atkraceyamenScoreTxt);
	
		var servantName =Config.ServantCfg.getServantItemById(data.sid).name;
		//描述    
		let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		describeTxt.text = LanguageManager.getlocal("atkracedefensedes",[servantName,data.num]);
		describeTxt.x = nameTxt.x;
		describeTxt.y = nameTxt.y+30;
		describeTxt.width =400;
		this.addChild(describeTxt);
		
		//对战信息    atkracewardes
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
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
		warInforMationTxt.x = describeTxt.x;
		warInforMationTxt.y = describeTxt.y+42;
		this.addChild(warInforMationTxt);

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		timerTxt.x =bg.x + bg.width - timerTxt.width  - 10;
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