
class AcGroupWifeBattleVisitTab1Item extends ScrollListItem {
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {

		//{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
		// (1随机 2复仇 3挑战 4追杀 5出师令)  data.atype
		let bg = BaseBitmap.create("public_9_bg25");
		bg.width=516;
		bg.height=126;
		bg.x =60;
		bg.visible =false;
		this.addChild(bg);

		let line = BaseBitmap.create("public_line1");
		line.x =60;
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

		let descStr = data.challenge ? "acGroupWifeBattleVisitTab1Tip2" : "acGroupWifeBattleVisitTab1Tip3";
		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(descStr,[data.dname,data.totalwinnum+"",data.agetpoint+""]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		descTxt.width = 420;
		descTxt.lineSpacing = 2;
		descTxt.x = nameTxt.x;
		descTxt.y = nameTxt.y + nameTxt.height + 5;
		this.addChild(descTxt);		

		let startTimeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		startTimeTxt.text =LanguageManager.getlocal("acGroupWifeBattleVisitTab1Tip4",[App.DateUtil.getFormatBySecond(data.st, 2)]);
		startTimeTxt.x = nameTxt.x;
		startTimeTxt.y = descTxt.y+descTxt.height+5;
		this.addChild(startTimeTxt);
		
		//对战信息    atkracewardes
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
		warInforMationTxt.y = startTimeTxt.y+startTimeTxt.height+5;
		this.addChild(warInforMationTxt);

		//时间  
		// let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		// timerTxt.text =  App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);

		// timerTxt.x = 485;
		// timerTxt.y =nameTxt.y;
		// this.addChild(timerTxt);

		line.y=warInforMationTxt.y+warInforMationTxt.height+5;
		bg.height=line.y+line.height+10;

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