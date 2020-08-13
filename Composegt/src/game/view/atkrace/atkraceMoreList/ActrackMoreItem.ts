
class ActrackMoreItem extends ScrollListItem {


	private uid:number =0;
	public constructor() {
		super();
	}

	protected initItem(index: number, data: ActrackMoreInfo) 
    {
		
		this.uid =data.info.uid; 
		this.height =130;

		let rankinglist_line:BaseBitmap = BaseBitmap.create("atkrace_xian_1"); 
		rankinglist_line.x =10;
		this.addChild(rankinglist_line); 
		rankinglist_line.y =130;   

		let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankTxt.text = String(index+1);
		rankTxt.x = 20;
		rankTxt.y = 15;
		rankTxt.width = 30;
		rankTxt.textAlign= TextFieldConst.ALIGH_CENTER;
		this.addChild(rankTxt);
			
		//名称  
		let msgLabel = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		msgLabel.text = this.formatMoreMsg(data);
		msgLabel.x = rankTxt.x+40;
		msgLabel.y = rankTxt.y;
		msgLabel.lineSpacing = 6;
		msgLabel.width = 400;
		this.addChild(msgLabel);

		// //击败｜｜全歼
		// let str = "";
		// if(data.info.type==1){
		// 	str =LanguageManager.getlocal("atkracebeat")
		// }
		// else
		// {
		// 	str =LanguageManager.getlocal("atkraceAnnihilation")
		// }
		
		// //描述    
		// let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		// var servantName =Config.ServantCfg.getServantItemById(data.info.sid).name;
		// describeTxt.text ="";
		// if(data.info.streak&&data.info.streak>=3)
		// {
		// 	describeTxt.text =LanguageManager.getlocal("actrackStraight",[servantName,str,data.info.uname2,""+data.info.fightnum,""+data.info.streak]);
		// }
		// else
		// {
		//   describeTxt.text =LanguageManager.getlocal("actrackDescription",[servantName,str,data.info.uname2,""+data.info.fightnum]);
		// }
 
		// describeTxt.x = nameTxt.x; 
		// describeTxt.y = nameTxt.y+43;
		// if(describeTxt.width>=400)
		// {
		// 	describeTxt.width=400;
		//     describeTxt.y = 50;
		// } 
		// describeTxt.lineSpacing = 7;
		// this.addChild(describeTxt);
		
		//时间  
		let timerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE);
		timerTxt.text =App.DateUtil.getFormatBySecond(data.info.st, 2);
		timerTxt.x = msgLabel.x;
		timerTxt.y = 105; //describeTxt.y+52;
		this.addChild(timerTxt);

		//挑战按钮
		let challengeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"atkraceChallenge",this.challengBtnHandler,this);
		challengeBtn.setScale(0.85);
		challengeBtn.x = GameConfig.stageWidth -challengeBtn.width-10;
		challengeBtn.y = 60;
		this.addChild(challengeBtn);
		if(Api.playerVoApi.getPlayerID()==data.info.uid)
		{
			challengeBtn.visible =false;
		}

	}
	//挑战
	private challengBtnHandler(evt:egret.TouchEvent):void {
		// var data:any =[];
		// data.type=1;//挑战
		// data.uid=this.uid;
		// AtkraceChallengeItem.data =data;
		// ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACESELECTVIEW, {
            fightType: AtkraceFightTypes.challenge,
			fightUid: this.uid
        })
	}

	private formatMoreMsg(data: ActrackMoreInfo) {
        let rsl = "";
        let act: string = LanguageManager.getlocal(data.info.type == 1 ? "atkrace_addtext10":"atkrace_addtext11");
        rsl = LanguageManager.getlocal("atkrace_addtext8", [
            data.info.name,
            act,
            data.info.uname2,
            data.info.fightnum+""
        ]);

        if (data.info.streak > 2) {
            rsl += LanguageManager.getlocal("atkrace_addtext9", [""+data.info.streak]);
        }
        return rsl;
    }
    
	public getSpaceY(): number {
		return 1;
	}
	public getSpaceX(): number {
		return 0;
	}
	public dispose(): void {

		this.uid =0;
		super.dispose();
	}
}

interface ActrackMoreInfo {
	id: number,
	info: ActrackMoreItemInfo
}

interface ActrackMoreItemInfo {
	/**杀敌数 */
	fightnum: number,
	/**进攻方 */
	name: string,
	sid: string,
	/**时间 */
	st: number,
	/**连续击杀 */
	streak: number,
	title: string,
	/**
	 * 类型
	 * 1.击败 。 2.全歼
	 */
	type: number,
	/**攻击者UID */
	uid: number,
	/**防守方 */
	uname2: string
}

