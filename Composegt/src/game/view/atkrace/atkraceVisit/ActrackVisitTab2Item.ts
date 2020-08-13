
class ActrackVisitTab2Item extends ScrollListItem {

	private _mainTaskHandKey:string = null;
	private uid:string ="";
	public constructor() {
		super();
	}

	protected initItem(index: number, data: any) 
    {	
		this.width = 640;
		this.height = 120;
		// 0:{uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
		this.uid=data.uid;
		let bg = BaseBitmap.create("public_listbg");
		bg.width=516;
		bg.height=120;
		// bg.x =60;
		bg.x = GameConfig.stageWidth/2 - bg.width/2;
		this.addChild(bg);
		bg.visible = false;
		// let line = BaseBitmap.create("public_line1");
		// line.x =60;
		// line.y =120;
		// this.addChild(line);
		if(index > 0){
			let line = BaseBitmap.create("public_line4");
			line.width = 503;
			line.x = GameConfig.stageWidth/2- line.width/2;
			line.y = bg.y - line.height/2;
			this.addChild(line);
		}

		let rankImg = BaseBitmap.create("rankinglist_rankbg");
		rankImg.x = bg.x+10
		rankImg.y = 10;
		this.addChild(rankImg);
		rankImg.visible =false;

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		rankTxt.text = String(index+1);
		rankTxt.x = rankImg.x+(rankImg.width-rankTxt.width)/2;
		rankTxt.y = rankImg.y+10;
		this.addChild(rankTxt);

		//名称  
		let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		nameTxt.text =data.name;
		nameTxt.x = rankImg.x+45
		nameTxt.y = rankImg.y+10;
		this.addChild(nameTxt);
		
		//衙门分数
		let atkraceyamenScoreTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		atkraceyamenScoreTxt.text =LanguageManager.getlocal("atkraceyamenscore",[data.point]);
		atkraceyamenScoreTxt.x = nameTxt.x+nameTxt.width;// 220;
		atkraceyamenScoreTxt.y = rankImg.y+10;
		this.addChild(atkraceyamenScoreTxt);
		
		let str3= LanguageManager.getlocal("powerDes",[data.power]);
		//势力    
		let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		powerTxt.text = str3;
		powerTxt.x = nameTxt.x;
		powerTxt.y = nameTxt.y+30;
		powerTxt.width =400;
		this.addChild(powerTxt);
		
		//对战信息    
		let warInforMationTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		if(data.point>=0)
		{
			var str =LanguageManager.getlocal("atkracewardes",[data.point]);
			warInforMationTxt.text=str;
			warInforMationTxt.textColor =TextFieldConst.COLOR_WARN_GREEN_NEW;
		}else
		{
		   var str =LanguageManager.getlocal("atkracewardes2",[data.point]);
			warInforMationTxt.text =str;
			warInforMationTxt.textColor = TextFieldConst.COLOR_WARN_RED_NEW;//TextFieldConst.COLOR_QUALITY_RED;
		}
		warInforMationTxt.text = str;
		warInforMationTxt.x = powerTxt.x;
		warInforMationTxt.y = powerTxt.y+30;
		this.addChild(warInforMationTxt);

		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
		timerTxt.text =App.DateUtil.getFormatBySecond(GameData.serverTime-data.st, 4);
		timerTxt.x =bg.x + bg.width - timerTxt.width  - 10;
		timerTxt.y =nameTxt.y;
		this.addChild(timerTxt);
		
		//复仇按钮
		let revengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceRevenge",this.revengeBtnHandler,this);
		revengeBtn.setScale(0.85);
		revengeBtn.x = bg.x + bg.width - revengeBtn.width * revengeBtn.scaleX  - 10; //this.width - revengeBtn.width*0.85 - 30;
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
		// var data:any =[];
		// data.type=2;//复仇
		// data.uid=this.uid;
		// AtkraceChallengeItem.data =data;
		// ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACESELECTVIEW, {
			fightType: AtkraceFightTypes.revenge,
			fightUid: this.uid
		})
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