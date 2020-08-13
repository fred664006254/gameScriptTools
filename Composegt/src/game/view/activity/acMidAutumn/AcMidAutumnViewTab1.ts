/**
  * 中秋活动 Tab1
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab1
  */
class AcMidAutumnViewTab1 extends AcCommonViewTab {

	private _findNumTF:BaseTextField = null;

	private _progress:ProgressBar = null;

	private _boxInfoList:{"box":BaseBitmap;"boxLight":BaseBitmap}[] = [];

	private _oneNeedNumTF:BaseTextField = null;

	private _isSendMessage:boolean = false;
	private _activityID:string = null;

	private _maxBoxNum:number = 0;

	private _guanghuanBM:any = null;

	private _guanghuanContainer:BaseDisplayObjectContainer = null;

	private _bg:BaseLoadBitmap = null;

	private _type:string = null;

	private _speakStr:string = null;
	private _speakTF:BaseTextField = null;
	// private _speakTail:BaseBitmap = null;
	private _speakBg:BaseBitmap = null;
	private _servantBM:BaseLoadBitmap = null;
	private _messageLength:number = 0;

	private _item1:BaseBitmap = null;
	private _item2:BaseBitmap = null;
	private _item3:BaseBitmap = null;

	private _dragon1:BaseLoadDragonBones = null;

	private _gaizi1:BaseBitmap = null;
	private _gaizi2:BaseBitmap = null;
	private _gaizi3:BaseBitmap = null;

	private _timeText:BaseTextField = null;


	/**
	 * 记录一下奖励
	 */
	private _nowReward:string = null;
	public constructor() {
		super();
		this.initView();
	}
	public initView()
	{
		App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,this.lotteryHandle,this);
		App.MessageHelper.addNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA,this.receiveBoxHandle,this);

		this._activityID = this.aid + "-" + this.code;
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		this._maxBoxNum = cfg.getBoxList()[cfg.getBoxList().length - 1].needNum;
		let bg = null;
		if(ResourceManager.hasRes("acmidautumnview_bg"+this.code)){
 
			bg = BaseLoadBitmap.create("acmidautumnview_bg"+this.code);
			
		} else {
			bg = BaseLoadBitmap.create("acmidautumnview_bg1");
			if(this.code == "7"){
				bg = BaseLoadBitmap.create("acmidautumnview_bg6");
			}
		}
		
		


		if(this.code == "1" || this.code == "8"){
			bg.width = 624;
			bg.height = 970;
			bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,GameConfig.stageHeigth -this.getViewTitleButtomY() - bg.height + 20);//250);

		} else if(this.code == "3"){
			bg.width = 640;
			bg.height = 1136;
			bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,GameConfig.stageHeigth -this.getViewTitleButtomY() - bg.height + 20);//250);
		} else if(this.code == "4"){
			bg.width = 640;
			bg.height = 1136;
			bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,GameConfig.stageHeigth -this.getViewTitleButtomY() - bg.height );//250);
		} else if(this.code == "6"|| this.code == "7"||this.code == "9") {
			bg.width = 640;
			bg.height = 1136;
			bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,-69- 89);
		} else {
			bg.width = 624;
			bg.height = 970;
			bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,GameConfig.stageHeigth -this.getViewTitleButtomY() - bg.height + 20);//250);

		}

		// bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2,GameConfig.stageHeigth -this.getViewTitleButtomY() - bg.height + 20);//250);
		this.addChild(bg);

		//遮照
		let bgY = bg.y;
		let bglazyHeght = bg.y
		if(bgY >= 10)
		{
			bgY = 0;
			bglazyHeght = 0;
		}
		else
		{
			bgY = Math.abs(bg.y) + 10;
		}
		// let maskRect = new egret.Rectangle(0,bgY,bg.width,300+bg.height - Math.abs(bglazyHeght));
		// let maskRect = new egret.Rectangle(0,bgY,bg.width,bg.height - bgY);
		let maskbg = BaseBitmap.create("public_9_viewmask");
		maskbg.x = 0;
		maskbg.y = bg.y + bgY;
		maskbg.width = bg.width;
		maskbg.height = 300+bg.height - Math.abs(bglazyHeght);
		// console.log(maskRect);
		maskbg.name = "maskbg";
		this.addChild(maskbg);
		bg.mask = maskbg;
		// 光晕的动画
		this._guanghuanContainer = new BaseDisplayObjectContainer();

		// this._guanghuanBM.scaleY = 0.35;
		//草 相关的特效


		if(this.code == "1"  || this.code == "8"){
			this._guanghuanBM = BaseBitmap.create("acmidautumnview_guanghuan");
			this._guanghuanBM.anchorOffsetX = this._guanghuanBM.width / 2;
			this._guanghuanBM.anchorOffsetY = this._guanghuanBM.height / 2;
			// 草 1 
			let gress1effect = ComponentManager.getCustomMovieClip("gress1_",5,200);
			gress1effect.setScale(1.33);
			
			gress1effect.setPosition(bg.x + bg.width - gress1effect.width  - 95 - 100,bg.y + bg.height - gress1effect.height - 135 - 80-200);
			
			this._guanghuanContainer.setPosition(gress1effect.x + gress1effect.width / 2,gress1effect.y + gress1effect.height);
			egret.Tween.get(this._guanghuanBM,{loop:true}).to({rotation:360},2000);
			
			this._guanghuanContainer.addChild(this._guanghuanBM);
			this._guanghuanContainer.scaleY = 0.35
			this._guanghuanBM.blendMode = egret.BlendMode.ADD;
			this.addChild(this._guanghuanContainer);
			
			this.addChild(gress1effect);
			gress1effect.playWithTime(-1);
			gress1effect.addTouchTap(this.effectClick,this,["1"]);

			// 草 2 
			let gress2effect = ComponentManager.getCustomMovieClip("gress2_",5,200);
			gress2effect.setScale(1.33);
			gress2effect.setPosition(bg.x + 300 + 20,bg.y + bg.height - gress2effect.height - 130-200);
			this.addChild(gress2effect);
			gress2effect.playWithTime(-1);
			gress2effect.addTouchTap(this.effectClick,this,["2"]);

			// 草 3 
			let gress3effect = ComponentManager.getCustomMovieClip("gress3_",5,200);
			gress3effect.setScale(1.33);
			gress3effect.setPosition(bg.x + 450 + 30,bg.y + bg.height - gress2effect.height - 160-200);
			this.addChild(gress3effect);
			gress3effect.playWithTime(-1);
			gress3effect.addTouchTap(this.effectClick,this,["3"]);

			if(App.CommonUtil.check_dragon())
			{
				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full_218");
				droWifeIcon.setScale(0.7)
				droWifeIcon.skewY = 180;
				droWifeIcon.x = bg.x + 190;
				droWifeIcon.y = bg.y + bg.height + 5-160;
				this.addChild(droWifeIcon);
			}
			else
			{
				// wife 的 图片
				let scaleNum = 0.6;
				let wifeBM =  BaseLoadBitmap.create("wife_full_218");
				wifeBM.width = 640;
				wifeBM.height = 840;
				wifeBM.setScale(scaleNum);
				wifeBM.skewY = 180
				wifeBM.setPosition(bg.x + wifeBM.width * scaleNum - 30,bg.y + bg.height - wifeBM.height * scaleNum  + 5-160);
				this.addChild(wifeBM);
			}

			//说的话相关
			let talkBg = BaseBitmap.create("public_9v_bg11");
			talkBg.scaleX = -1
			talkBg.width = 360;
			let talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			talkTF.width = 320;
			talkBg.height = talkTF.height + 20;
			talkBg.setPosition(bg.x + 244+360,bg.y + bg.height - 660);
			talkTF.setPosition(280,talkBg.y + 20);
			this.addChild(talkBg);
			this.addChild(talkTF);

			let infoBtn = ComponentManager.getButton("acmidautumnview_infobtn","",this.infoBtnClick,this);
			infoBtn.setPosition(bg.width -110,bg.y + bg.height - infoBtn.height - 10-200);
			this.addChild(infoBtn);

			let newbottom = BaseBitmap.create("public_bottombg1");
			newbottom.width  = 640;
			newbottom.height = 190;
			newbottom.setPosition(0,GameConfig.stageHeigth-newbottom.height -130);
			this.addChild(newbottom);


			// 进度相关
			let buttombg = BaseBitmap.create("public_9_bg49");
			buttombg.width = 612;
			buttombg.height = 110;
			buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2,60);
			this.addChild(buttombg);
			buttombg.visible =false;//

			let numBg = BaseBitmap.create("common_numbg");
			numBg.setPosition(buttombg.x - 2,buttombg.y + buttombg.height / 2 - numBg.height / 2);
			this.addChild(numBg);

			let numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2,numBg.y + numBg.height - numTF.height - 5);
			this.addChild(numTF);

			this._findNumTF = ComponentManager.getTextField("999",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._findNumTF.width = 50;
			this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
			this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2,numBg.y + 12);
			this.addChild(this._findNumTF);
			
			
			this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",482);
			this._progress.setPosition(buttombg.x + 103,buttombg.y + buttombg.height - this._progress.height - 25)
			this.addChild(this._progress);				

		} 
		else if(this.code == "3")
		{

			this._guanghuanBM = ComponentManager.getCustomMovieClip("acmidautumn_select_",11,100);
			this._guanghuanContainer.width = 207;
			this._guanghuanContainer.height = 118;

			this._guanghuanBM.width = 207;
			this._guanghuanBM.height = 118;
			this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width/2;
			this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height/2;

			let desk = BaseBitmap.create("acmidautumnview_3_desk");
			desk.x = bg.x + bg.width - desk.width;
			desk.y = GameConfig.stageHeigth - desk.height -205;
			this.addChild(desk);
			
			// egret.Tween.get(this._guanghuanBM,{loop:true}).to({rotation:360},2000);
			this._guanghuanBM.playWithTime(0);


			this._guanghuanBM.blendMode = egret.BlendMode.ADD;
			this._guanghuanContainer.addChild(this._guanghuanBM);
			// this._guanghuanContainer.scaleY = 0.56
			
			this.addChild(this._guanghuanContainer);


			//1
			this._item1 = BaseBitmap.create("acmidautumnview_3_item1");
			this._item1.setScale(0.9);
			this._item1.setPosition(desk.x + 180,desk.y );
			this._item1.addTouchTap(this.effectClick,this,["1"]);
			this.addChild(this._item1);



			this._gaizi1 = BaseBitmap.create("acmidautumnview_3_gaizi");
			this._gaizi1.anchorOffsetX = this._gaizi1.width;
			this._gaizi1.anchorOffsetY = 60;
			this._gaizi1.setScale(0.9);
			
			this._gaizi1.x = this._item1.x + this._item1.width * this._item1.scaleX/2 + this._gaizi1.width * this._gaizi1.scaleX/2;
			this._gaizi1.y = this._item1.y + this._item1.height * this._item1.scaleY/2 - this._gaizi1.height * this._gaizi1.scaleY/2 - 8 +60;
			
			this.addChild(this._gaizi1);

			let flower1 = BaseBitmap.create("acmidautumnview_3_flower");
			flower1.setScale(0.9);
			flower1.x = this._item1.x + this._item1.width * this._item1.scaleX/2 - flower1.width * flower1.scaleX/2;
			flower1.y = this._item1.y + this._item1.height * this._item1.scaleY/2 - flower1.height * flower1.scaleY/2 +10;
			this.addChild(flower1);

			//2
			this._item2 = BaseBitmap.create("acmidautumnview_3_item2");
			this._item2.setPosition(desk.x + 80,desk.y + 55);
			this._item2.addTouchTap(this.effectClick,this,["2"]);
			this.addChild(this._item2);

			this._gaizi2 = BaseBitmap.create("acmidautumnview_3_gaizi");
			this._gaizi2.anchorOffsetX = this._gaizi2.width;
			this._gaizi2.anchorOffsetY = 60;
			// gaizi2.anchorOffsetY = gaizi2.height;
			this._gaizi2.x = this._item2.x + this._item2.width/2 + this._gaizi2.width/2;
			this._gaizi2.y = this._item2.y + this._item2.height/2 - this._gaizi2.height/2 - 8 + 60;
			this.addChild(this._gaizi2);

			let flower2 = BaseBitmap.create("acmidautumnview_3_flower");
			flower2.x = this._item2.x + this._item2.width * this._item2.scaleX/2 - flower2.width * flower2.scaleX/2;
			flower2.y = this._item2.y + this._item2.height * this._item2.scaleY/2 - flower2.height * flower2.scaleY/2 +10;
			this.addChild(flower2);

			//3
			this._item3 = BaseBitmap.create("acmidautumnview_3_item3");
			this._item3.setPosition(desk.x + 280,desk.y + 70);
			this._item3.addTouchTap(this.effectClick,this,["3"]);
			this.addChild(this._item3);

			this._gaizi3 = BaseBitmap.create("acmidautumnview_3_gaizi");
			this._gaizi3.anchorOffsetX = this._gaizi3.width;
			this._gaizi3.anchorOffsetY = 60;
			// gaizi3.anchorOffsetY = gaizi3.height ;
			this._gaizi3.x = this._item3.x + this._item3.width/2 + this._gaizi3.width/2;
			this._gaizi3.y = this._item3.y + this._item3.height/2  - this._gaizi3.height/2 - 8 + 60;
			this.addChild(this._gaizi3);

			let flower3 = BaseBitmap.create("acmidautumnview_3_flower");
			flower3.x = this._item3.x + this._item3.width * this._item3.scaleX/2 - flower3.width * flower3.scaleX/2;
			flower3.y = this._item3.y + this._item3.height * this._item3.scaleY/2 - flower3.height * flower3.scaleY/2 +10;
			this.addChild(flower3);





			// wife 的 图片
			let scaleNum = 0.6;
			let wifeBM =  BaseLoadBitmap.create("wife_full_101");
			wifeBM.width = 640;
			wifeBM.height = 840;
			wifeBM.setScale(scaleNum);
			// wifeBM.skewY = 180
			wifeBM.setPosition(bg.x-100,bg.y + bg.height - wifeBM.height * scaleNum  -180);
			this.addChild(wifeBM);

			//说的话相关
			let talkBg = BaseBitmap.create("public_9v_bg11");
			talkBg.scaleX = -1
			talkBg.width = 360;
			let talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk3"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			talkTF.width = 320;
			talkBg.height = talkTF.height + 50;
			talkBg.setPosition(bg.x + 244+310,bg.y + bg.height - 690);
			talkTF.setPosition(280-60,talkBg.y + 20);
			this.addChild(talkBg);
			this.addChild(talkTF);




			// 进度相关
			let buttombg = BaseBitmap.create("public_9_bg49");
			buttombg.width = 612;
			buttombg.height = 110;
			buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2,20);
			this.addChild(buttombg);
			buttombg.visible =false;//

			let numBg = BaseBitmap.create("common_numbg");
			numBg.setPosition(buttombg.x - 2,buttombg.y + buttombg.height / 2 - numBg.height / 2);
			this.addChild(numBg);

			let numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2,numBg.y + numBg.height - numTF.height - 5);
			this.addChild(numTF);

			this._findNumTF = ComponentManager.getTextField("999",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._findNumTF.width = 50;
			this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
			this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2,numBg.y + 12);
			this.addChild(this._findNumTF);
			
			
			this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",482);
			this._progress.setPosition(buttombg.x + 103,buttombg.y + buttombg.height - this._progress.height - 25)
			this.addChild(this._progress);

		} 
		else if(this.code == "4")
		{


			this._guanghuanBM = ComponentManager.getCustomMovieClip("acmidautumn_select_",11,100);
			this._guanghuanContainer.width = 207;
			this._guanghuanContainer.height = 118;

			this._guanghuanBM.width = 207;
			this._guanghuanBM.height = 118;
			this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width/2;
			this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height/2;

	
			
			// egret.Tween.get(this._guanghuanBM,{loop:true}).to({rotation:360},2000);
			this._guanghuanBM.playWithTime(0);


			this._guanghuanBM.blendMode = egret.BlendMode.ADD;
			this._guanghuanContainer.addChild(this._guanghuanBM);
			// this._guanghuanContainer.scaleY = 0.56
			
			this.addChild(this._guanghuanContainer);


			//1
			this._item1 = BaseBitmap.create("acmidautumnview_4_item");
			this._item1.setScale(0.9);
			this._item1.setPosition(bg.x + 430+15,bg.y + 600 +95);
			this._item1.addTouchTap(this.effectClick,this,["1"]);
			this.addChild(this._item1);

			//2
			this._item2 = BaseBitmap.create("acmidautumnview_4_item");
			this._item2.setPosition(bg.x + 325,bg.y + 870 -60);
			this._item2.addTouchTap(this.effectClick,this,["2"]);
			this.addChild(this._item2);

			//3
			this._item3 = BaseBitmap.create("acmidautumnview_4_item");
			this._item3.setPosition(bg.x + 480,bg.y + 870 -60);
			this._item3.addTouchTap(this.effectClick,this,["3"]);
			this.addChild(this._item3);


			// wife 的 图片
			let scaleNum = 1;
			let wifeBM =  BaseLoadBitmap.create("acmidautumnview_4_wife");
			wifeBM.width = 320;
			wifeBM.height = 528;
			wifeBM.setScale(scaleNum);
			// wifeBM.skewY = 180
			wifeBM.setPosition(bg.x, bg.y + bg.height - wifeBM.height-160);
			this.addChild(wifeBM);

			//说的话相关
			let talkBg = BaseBitmap.create("public_9v_bg11");
			talkBg.scaleX = -1
			talkBg.width = 360;
			let talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk4"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			talkTF.width = 320;
			talkBg.height = talkTF.height + 50;
			talkBg.setPosition(bg.x + 244+310,bg.y + bg.height - 690);
			talkTF.setPosition(280-50,talkBg.y + 20);
			this.addChild(talkBg);
			this.addChild(talkTF);




			// 进度相关
			let buttombg = BaseBitmap.create("public_9_bg49");
			buttombg.width = 612;
			buttombg.height = 110;
			buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2,25);
			this.addChild(buttombg);
			buttombg.visible =false;//

			let numBg = BaseBitmap.create("common_numbg");
			numBg.setPosition(buttombg.x - 2,buttombg.y + buttombg.height / 2 - numBg.height / 2);
			this.addChild(numBg);

			let numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2,numBg.y + numBg.height - numTF.height - 5);
			this.addChild(numTF);

			this._findNumTF = ComponentManager.getTextField("999",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._findNumTF.width = 50;
			this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
			this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2,numBg.y + 12);
			this.addChild(this._findNumTF);
			
			
			this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",482);
			this._progress.setPosition(buttombg.x + 103,buttombg.y + buttombg.height - this._progress.height - 25)
			this.addChild(this._progress);

		
		} else if(this.code == "6"|| this.code == "7"||this.code == "9"){




			if(App.CommonUtil.check_dragon() && ResourceManager.hasRes("wife_full_225_ske"))
			{
				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full_225");
				droWifeIcon.setScale(0.9)
				// droWifeIcon.setScale(0.7)
				// droWifeIcon.skewY = 180;
				droWifeIcon.x = bg.x + 230+20;
				// droWifeIcon.y = bg.y + bg.height + 5-240 +40;
				droWifeIcon.y = GameConfig.stageHeigth - 340;

				// GameConfig.stageHeigth - 190 -130 - desk.height+90;

				this.addChild(droWifeIcon);
			}
			else
			{
				// wife 的 图片
				let scaleNum = 0.65;
				let wifeBM =  BaseLoadBitmap.create("wife_full_225");
				wifeBM.width = 640;
				wifeBM.height = 840;
				wifeBM.setScale(scaleNum);
				// wifeBM.skewY = 180
				wifeBM.setPosition(bg.x +30,bg.y + bg.height - wifeBM.height * scaleNum  + 5-280 + 60);
				this.addChild(wifeBM);
			}

			//说的话相关
			let talkBg = BaseBitmap.create("public_9v_bg11");
			talkBg.scaleX = -1
			talkBg.width = 260;
			let talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk6"),20,TextFieldConst.COLOR_BLACK);
			talkTF.width = 230;
			talkBg.height = talkBg.height > talkTF.height + 60 ? talkBg.height : talkTF.height + 60;
			talkBg.setPosition(bg.x +320 +talkBg.width,GameConfig.stageHeigth - 820);
			talkTF.setPosition(talkBg.x - talkBg.width + 15,talkBg.y + 20);
			this.addChild(talkBg);
			this.addChild(talkTF);

			let infoBtn = ComponentManager.getButton("acmidautumnview_infobtn","",this.infoBtnClick,this);
			infoBtn.setPosition(20,100);
			this.addChild(infoBtn);

			let newbottom = BaseBitmap.create("public_bottombg1");
			newbottom.width  = 640;
			newbottom.height = 190;
			newbottom.setPosition(0,GameConfig.stageHeigth-newbottom.height -130);
			this.addChild(newbottom);
			newbottom.visible = false;


			// 进度相关
			let buttombg = BaseBitmap.create("public_9_bg49");
			buttombg.width = 612;
			buttombg.height = 0;
			buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2,60);
			this.addChild(buttombg);
			buttombg.visible =false;//

			let numBg = BaseBitmap.create("common_numbg");
			numBg.setPosition(buttombg.x - 2,buttombg.y + buttombg.height / 2 - numBg.height / 2);
			this.addChild(numBg);

			let numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2,numBg.y + numBg.height - numTF.height - 5);
			this.addChild(numTF);

			this._findNumTF = ComponentManager.getTextField("999",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._findNumTF.width = 50;
			this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
			this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2,numBg.y + 12);
			this.addChild(this._findNumTF);
			
			
			this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",482);
			this._progress.setPosition(buttombg.x + 103,buttombg.y + buttombg.height - this._progress.height +25)
			this.addChild(this._progress);				

			let desk = BaseBitmap.create("acmidautumnview_6_desk");
			desk.x = 0;
			desk.y = GameConfig.stageHeigth - 190 -130 - desk.height+110;
			// desk.y = GameConfig.stageHeigth- 190 -130 - desk.height+90;
			this.addChild(desk);

			// this._item1 = BaseBitmap.create("acmidautumnview_6_item1");
			// this._item2 = BaseBitmap.create("acmidautumnview_6_item2");
			// this._item3 = BaseBitmap.create("acmidautumnview_6_item3");
			
			// this._item1.x = desk.x+ 160;
			// this._item1.y = desk.y + 135;
			// this.addChild(this._item1);


			this._dragon1 = App.DragonBonesUtil.getLoadDragonBones("fanshu");
			this._dragon1.x = desk.x+ 160 + 136;
			this._dragon1.y = desk.y + 135 + 48;
			this._dragon1.stop();
			
			this.addChild(this._dragon1);

			this._item2 = BaseBitmap.create("acmidautumnview_6_item2");
			this._item2.x = desk.x+ 160;
			this._item2.y = desk.y + 135;
			this.addChild(this._item2);

		
		} else {

			this._guanghuanBM = BaseBitmap.create("acmidautumnview_guanghuan");
			this._guanghuanBM.anchorOffsetX = this._guanghuanBM.width / 2;
			this._guanghuanBM.anchorOffsetY = this._guanghuanBM.height / 2;
			// 草 1 
			let gress1effect = ComponentManager.getCustomMovieClip("gress1_",5,200);
			gress1effect.setScale(1.33);
			
			gress1effect.setPosition(bg.x + bg.width - gress1effect.width  - 95 - 100,bg.y + bg.height - gress1effect.height - 135 - 80-200);
			
			this._guanghuanContainer.setPosition(gress1effect.x + gress1effect.width / 2,gress1effect.y + gress1effect.height);
			egret.Tween.get(this._guanghuanBM,{loop:true}).to({rotation:360},2000);
			
			this._guanghuanContainer.addChild(this._guanghuanBM);
			this._guanghuanContainer.scaleY = 0.35
			this._guanghuanBM.blendMode = egret.BlendMode.ADD;
			this.addChild(this._guanghuanContainer);
			
			this.addChild(gress1effect);
			gress1effect.playWithTime(-1);
			gress1effect.addTouchTap(this.effectClick,this,["1"]);

			// 草 2 
			let gress2effect = ComponentManager.getCustomMovieClip("gress2_",5,200);
			gress2effect.setScale(1.33);
			gress2effect.setPosition(bg.x + 300 + 20,bg.y + bg.height - gress2effect.height - 130-200);
			this.addChild(gress2effect);
			gress2effect.playWithTime(-1);
			gress2effect.addTouchTap(this.effectClick,this,["2"]);

			// 草 3 
			let gress3effect = ComponentManager.getCustomMovieClip("gress3_",5,200);
			gress3effect.setScale(1.33);
			gress3effect.setPosition(bg.x + 450 + 30,bg.y + bg.height - gress2effect.height - 160-200);
			this.addChild(gress3effect);
			gress3effect.playWithTime(-1);
			gress3effect.addTouchTap(this.effectClick,this,["3"]);

			if(App.CommonUtil.check_dragon())
			{
				let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full_218");
				droWifeIcon.setScale(0.7)
				droWifeIcon.skewY = 180;
				droWifeIcon.x = bg.x + 190;
				droWifeIcon.y = bg.y + bg.height + 5-160;
				this.addChild(droWifeIcon);
			}
			else
			{
				// wife 的 图片
				let scaleNum = 0.6;
				let wifeBM =  BaseLoadBitmap.create("wife_full_218");
				wifeBM.width = 640;
				wifeBM.height = 840;
				wifeBM.setScale(scaleNum);
				wifeBM.skewY = 180
				wifeBM.setPosition(bg.x + wifeBM.width * scaleNum - 30,bg.y + bg.height - wifeBM.height * scaleNum  + 5-160);
				this.addChild(wifeBM);
			}

			//说的话相关
			let talkBg = BaseBitmap.create("public_9v_bg11");
			talkBg.scaleX = -1
			talkBg.width = 360;
			let talkTF = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnWifeTalk"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
			talkTF.width = 320;
			talkBg.height = talkTF.height + 20;
			talkBg.setPosition(bg.x + 244+360,bg.y + bg.height - 660);
			talkTF.setPosition(280,talkBg.y + 20);
			this.addChild(talkBg);
			this.addChild(talkTF);

			let infoBtn = ComponentManager.getButton("acmidautumnview_infobtn","",this.infoBtnClick,this);
			infoBtn.setPosition(bg.width -110,bg.y + bg.height - infoBtn.height - 10-200);
			this.addChild(infoBtn);

			let newbottom = BaseBitmap.create("public_bottombg1");
			newbottom.width  = 640;
			newbottom.height = 190;
			newbottom.setPosition(0,GameConfig.stageHeigth-newbottom.height -130);
			this.addChild(newbottom);


			// 进度相关
			let buttombg = BaseBitmap.create("public_9_bg49");
			buttombg.width = 612;
			buttombg.height = 110;
			buttombg.setPosition(bg.x + bg.width / 2 - buttombg.width / 2,60);
			this.addChild(buttombg);
			buttombg.visible =false;//

			let numBg = BaseBitmap.create("common_numbg");
			numBg.setPosition(buttombg.x - 2,buttombg.y + buttombg.height / 2 - numBg.height / 2);
			this.addChild(numBg);

			let numTF = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnNumTitle"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			numTF.setPosition(numBg.x + numBg.width / 2 - numTF.width / 2,numBg.y + numBg.height - numTF.height - 5);
			this.addChild(numTF);

			this._findNumTF = ComponentManager.getTextField("999",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._findNumTF.width = 50;
			this._findNumTF.textAlign = egret.HorizontalAlign.CENTER;
			this._findNumTF.setPosition(numBg.x + numBg.width / 2 - this._findNumTF.width / 2,numBg.y + 12);
			this.addChild(this._findNumTF);
			
			
			this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",482);
			this._progress.setPosition(buttombg.x + 103,buttombg.y + buttombg.height - this._progress.height - 25)
			this.addChild(this._progress);				

		
		}
		

		let newbottom = BaseBitmap.create("public_bottombg1");
		newbottom.width  = 640;
		newbottom.height = 190;
		
		this.addChild(newbottom);
		newbottom.setPosition(0,GameConfig.stageHeigth-newbottom.height -130);

		
		if(this.code != "1" && this.code != "5" && this.code != "8"){
			let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

			// let stTxt = App.DateUtil.getFormatBySecond(vo.st, 9);
			// let etTxt = App.DateUtil.getFormatBySecond(vo.et-86400, 9);
			// - 86400 * 1


			if(this.code == "6" || this.code == "7" || this.code == "9"){

				//活动时间   
				this._timeText = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime",["<font color=0x21eb39>"+vo.acTime+"</font>"]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
				this._timeText.x = newbottom.x + newbottom.width / 2 - this._timeText.width/2;
				this._timeText.y = newbottom.y - this._timeText.height - 5;

				newbottom.visible = false;
				newbottom.setPosition(0,GameConfig.stageHeigth-newbottom.height -110);
				this._timeText.y = newbottom.y - this._timeText.height-5;
			} else {
				//活动时间   
				this._timeText = ComponentManager.getTextField(LanguageManager.getlocal("acmidAutumnAcInfoTime",[vo.acTime]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);

				this._timeText.x = newbottom.x + newbottom.width / 2 - this._timeText.width/2;

				this._timeText.y = newbottom.y - this._timeText.height - 5;
			}
			
			this.addChild(this._timeText);
		}



		//一次相关
		let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.oneBtnClick,this)
		oneBtn.setPosition(85,newbottom.y + newbottom.height/2-oneBtn.height+25);
		this.addChild(oneBtn);
		if(this.code == "6"|| this.code == "7" || this.code == "9"){
			oneBtn.setPosition(85,newbottom.y + newbottom.height/2-oneBtn.height+15);
		}
		
		let oneBtnIcon = BaseLoadBitmap.create("itemicon1001");
		oneBtnIcon.width = 35;
		oneBtnIcon.height = 35;
		oneBtnIcon.setPosition(oneBtn.x + oneBtn.width / 2 - oneBtnIcon.width / 2 + 12,oneBtn.y + oneBtn.height / 2 - oneBtnIcon.height / 2);
		this.addChild(oneBtnIcon);

		let oneBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
		oneBtnIconTF.setPosition(oneBtnIcon.x - oneBtnIconTF.width,oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconTF.height / 2);
		this.addChild(oneBtnIconTF);

		let oneBtnIconNum = ComponentManager.getTextField("X1",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
		oneBtnIconNum.setPosition(oneBtnIcon.x + oneBtnIcon.width,oneBtnIcon.y + oneBtnIcon.height / 2 - oneBtnIconNum.height / 2);
		this.addChild(oneBtnIconNum);

		let oneGemBM = BaseBitmap.create("public_icon1")
		oneGemBM.width = 42;
		oneGemBM.height = 42;
		oneGemBM.setPosition(oneBtn.x + oneBtn.width / 2 - oneGemBM.width,oneBtn.y - oneGemBM.height);
		this.addChild(oneGemBM);

		this._oneNeedNumTF = ComponentManager.getTextField(String(cfg.cost),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._oneNeedNumTF.setPosition(oneGemBM.x + oneGemBM.width,oneGemBM.y + oneGemBM.height / 2 - this._oneNeedNumTF.height / 2);
		this.addChild(this._oneNeedNumTF);

		let oneBtnKey = "acMidAutumnFindOne";
		if(this.code != "1" && this.code != "5" && this.code != "8")
		{
			oneBtnKey = oneBtnKey + this.code;	
		}
		let findOneTF =  ComponentManager.getTextField(LanguageManager.getlocal(oneBtnKey),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		findOneTF.setPosition(oneBtn.x + oneBtn.width / 2 - findOneTF.width / 2,oneBtn.y + oneBtn.height + 2);
		this.addChild(findOneTF);

		//十次相关
		let tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.tenBtnClick,this);
		tenBtn.setPosition(GameConfig.stageWidth - tenBtn.width - 90,oneBtn.y);
		this.addChild(tenBtn);
		
		let tenBtnIcon = BaseLoadBitmap.create("itemicon1001");
		tenBtnIcon.width = 35;
		tenBtnIcon.height = 35;
		tenBtnIcon.setPosition(tenBtn.x + tenBtn.width / 2 - tenBtnIcon.width / 2 + 12,tenBtn.y + tenBtn.height / 2 - tenBtnIcon.height / 2);
		this.addChild(tenBtnIcon);

		let tenBtnIconTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemBuy"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
		tenBtnIconTF.setPosition(tenBtnIcon.x - tenBtnIconTF.width,tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconTF.height / 2);
		this.addChild(tenBtnIconTF);

		let tenBtnIconNum = ComponentManager.getTextField("X10",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
		tenBtnIconNum.setPosition(tenBtnIcon.x + tenBtnIcon.width,tenBtnIcon.y + tenBtnIcon.height / 2 - tenBtnIconNum.height / 2);
		this.addChild(tenBtnIconNum);

		let tenGemBM = BaseBitmap.create("public_icon1");
		tenGemBM.width = 42;
		tenGemBM.height = 42;
		tenGemBM.setPosition(tenBtn.x + tenBtn.width / 2 - tenGemBM.width,tenBtn.y - tenGemBM.height);
		this.addChild(tenGemBM);

		let tenNeedGemTF = ComponentManager.getTextField(String(cfg.cost * 10 * cfg.discount),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		tenNeedGemTF.setPosition(tenGemBM.x + tenGemBM.width,tenGemBM.y + tenGemBM.height / 2 - tenNeedGemTF.height / 2);
		this.addChild(tenNeedGemTF);
		let tenBtnKey = "acMidAutumnFindTen";
		if(this.code != "1" && this.code != "5" && this.code != "8")
		{
			tenBtnKey = tenBtnKey + this.code;	
		}
		let findTenTF =  ComponentManager.getTextField(LanguageManager.getlocal(tenBtnKey),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		findTenTF.setPosition(tenBtn.x + tenBtn.width / 2 - findTenTF.width / 2,tenBtn.y + tenBtn.height + 2);
		this.addChild(findTenTF);
		let tipKey = "acmidAutumnTip";
		if(this.code != "1" && this.code != "5" && this.code != "8") {
			tipKey = tipKey + this.code;
		}
		let tipbg = null;
		if(this.code == "4"){
			// public_tipbg
			tipbg = BaseBitmap.create("public_tipbg");

			this.addChild(tipbg);
		}
		
		let  tipTF = ComponentManager.getTextField(LanguageManager.getlocal(tipKey),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
		tipTF.setPosition(bg.x + bg.width/ 2 - tipTF.width / 2,18);
		this.addChild(tipTF);
		if(this.code == "6"|| this.code == "7"|| this.code == "9"){
			tipTF.visible = false;
		}

		if(this.code == "4")
		{
			tipbg.scaleX = (tipTF.width+40)/tipbg.width ;  //0.5;
			tipbg.scaleY = 0.5;
			tipbg.x = bg.x + bg.width/ 2 - tipbg.width * tipbg.scaleX/ 2;
			tipbg.y = 5;
		}

		this._bg = bg;
		this.effectClick(null,"2");
		this.initBox();
		this.refreshView();


		let bottomBg = BaseBitmap.create("public_9v_bg03");
		bottomBg.width = 640;
		bottomBg.height = GameConfig.stageHeigth - 205+54;
		bottomBg.x = 0;
		bottomBg.y = 0;
		this.addChild(bottomBg);  
		if(this.code == "6"|| this.code == "7"|| this.code == "9"){
			bottomBg.visible = false;
		}
	}
	/**
	 * 抽奖的返回数据
	 */
	private lotteryHandle(event:egret.Event)
	{
		let ret = event.data.ret
		let data = event.data.data.data;
		if(ret)
		{
			if(this.code == "1" || this.code == "5" || this.code == "8")
			{
				let lottery = ComponentManager.getCustomMovieClip("lottery_",10,150);
				lottery.blendMode = egret.BlendMode.ADD;
				if(this._type == "1")
				{
					lottery.setScale(0.6);
					lottery.x = this._bg.x + 380;
					lottery.y = this._bg.y  + this._bg.height - 270-200;
				
				}
				else if(this._type == "2")
				{
					lottery.setScale(0.8);
					lottery.x = this._bg.x + 280;
					lottery.y = this._bg.y  + this._bg.height - 195 -200;
				}
				else if(this._type == "3")
				{
					lottery.setScale(0.7);
					lottery.x = this._bg.x + 440;
					lottery.y = this._bg.y  + this._bg.height - 210-200;
				}
			
				this.addChild(lottery);
				lottery.playWithTime(1);
				lottery.setEndCallBack(()=>{		
					let rewards = data.otherrewards;
					let otherReward = data.noterewards;
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
					this.refreshView();
					this._isSendMessage = false;
					this.removeChild(lottery);
					lottery.dispose();
					lottery = null;		
				},this); 
			} 
			else if(this.code == "3")
			{
				let lottery = ComponentManager.getCustomMovieClip("acmidautumn_open_",16,100);
				lottery.blendMode = egret.BlendMode.ADD;
				let offX = -80;
				let offY = -68;
				if(this._type == "1")
				{
					this._gaizi1.rotation = 30;
					// lottery.setScale(0.6);
					lottery.x = this._item1.x + this._item1.width * this._item1.scaleX/2 + offX;
					lottery.y = this._item1.y + this._item1.height * this._item1.scaleY/2 +8 +offY;
				}
				else if(this._type == "2")
				{
					this._gaizi2.rotation = 30;
					// lottery.setScale(0.8);
					lottery.x = this._item2.x + this._item2.width * this._item2.scaleX/2+ offX;
					lottery.y = this._item2.y + this._item2.height * this._item2.scaleY/2 +8+offY;
				}
				else if(this._type == "3")
				{
					this._gaizi3.rotation = 30;
					// lottery.setScale(0.7);
					lottery.x = this._item3.x + this._item3.width * this._item3.scaleX/2+ offX;
					lottery.y = this._item3.y + this._item3.height * this._item3.scaleY/2 +8+offY;
				}
			
				this.addChild(lottery);
				lottery.playWithTime(1);
				lottery.setEndCallBack(()=>{		
					let rewards = data.otherrewards;
					let otherReward = data.noterewards;
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
					this.refreshView();
					this._isSendMessage = false;
					this.removeChild(lottery);
					lottery.dispose();
					lottery = null;		
				},this); 
			}
			else if(this.code == "4")
			{
				let lottery = ComponentManager.getCustomMovieClip("lottery_",10,150);

				lottery.blendMode = egret.BlendMode.ADD;
				let offX = -167;
				let offY = -190;
				if(this._type == "1")
				{
					// this._gaizi1.rotation = 30;
					// lottery.setScale(0.6);
					lottery.x = this._item1.x + this._item1.width * this._item1.scaleX/2 + offX;
					lottery.y = this._item1.y + this._item1.height * this._item1.scaleY/2 +8 +offY;
				}
				else if(this._type == "2")
				{
					// this._gaizi2.rotation = 30;
					// lottery.setScale(0.8);
					lottery.x = this._item2.x + this._item2.width * this._item2.scaleX/2+ offX;
					lottery.y = this._item2.y + this._item2.height * this._item2.scaleY/2 +8+offY;
				}
				else if(this._type == "3")
				{
					// this._gaizi3.rotation = 30;
					// lottery.setScale(0.7);
					lottery.x = this._item3.x + this._item3.width * this._item3.scaleX/2+ offX;
					lottery.y = this._item3.y + this._item3.height * this._item3.scaleY/2 +8+offY;
				}
			
				this.addChild(lottery);
				lottery.playWithTime(1);
				lottery.setEndCallBack(()=>{		
					let rewards = data.otherrewards;
					let otherReward = data.noterewards;
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
					this.refreshView();
					this._isSendMessage = false;
					this.removeChild(lottery);
					lottery.dispose();
					lottery = null;		
				},this); 
			} 
			else if(this.code == "6"|| this.code == "7"|| this.code == "9"){
				//添加动画
				if(this._item2.visible){
					egret.Tween.get(this._item2)
						.wait(200)
						.set({visible:false});
				}
				this._dragon1.playDragonMovie("idle",1);
				
				egret.Tween.get(this)
					.wait(1500)
					.call(()=>{
						let rewards = data.otherrewards;
						let otherReward = data.noterewards;
						ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"otherRewards":otherReward,"isPlayAni":true});
						this.refreshView();
						this._isSendMessage = false;
					});
					


			}

		}
	}
	/**
	 * 宝箱的返回数据
	 */
	private receiveBoxHandle(event:egret.Event)
	{
		let ret = event.data.ret
		let data = event.data.data.data;
		if(ret)
		{
			let rewards = data.rewards;
			
			if(rewards != this._nowReward)
			{
				let rewardItemvo:RewardItemVo = GameData.formatRewardItem(this._nowReward)[0];
				let servantReward = Config.ServantCfg.getServantItemById(rewardItemvo.id);
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{"name":servantReward.name,"touch":servantReward.exchange,"message":"changeOtherRewardTip","callback":()=>{
					ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
				},"handler":this});
			}
			else
			{
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rewards,"isPlayAni":true});
			}
			this.refreshView();
		}
		
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		if(this._gaizi1 && this._gaizi2 && this._gaizi3){
			this._gaizi1.rotation = 0;
			this._gaizi2.rotation = 0;
			this._gaizi3.rotation = 0;
		}


		this.refreshTF();
		this.refreshBox();
		this.refreshProgress();
	}
	private refreshProgress()
	{
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let percent = vo.lotteryNum() / this._maxBoxNum;
		this._progress.setPercentage(percent);
	}
	private refreshTF()
	{
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(vo.isFree)
		{
			this._oneNeedNumTF.text = LanguageManager.getlocal("sysFreeDesc");
		}
		else
		{
			this._oneNeedNumTF.text = String(cfg.cost);
		}

		this._findNumTF.text = String(vo.lotteryNum());

		
		
	}
	/**
	 * 刷新宝箱
	 */
	private refreshBox()
	{
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let boxCfg = cfg.getBoxList();
		for(let i = 0 ; i < this._boxInfoList.length;i++)
		{
			let needNum = boxCfg[i].needNum;
			let voNum = vo.lotteryNum();
			let isRevice = vo.boxStatus(boxCfg[i].id);
			if(needNum <= voNum)
			{
				if(isRevice)
				{
					this._boxInfoList[i].box.setRes("dailytask_box1_3");
					this._boxInfoList[i].boxLight.setVisible(false);
					egret.Tween.removeTweens(this._boxInfoList[i].box);
					egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
				}
				else
				{
					this._boxInfoList[i].box.setRes("dailytask_box1_2");
					this._boxInfoList[i].boxLight.setVisible(true);
					egret.Tween.get(this._boxInfoList[i].boxLight,{loop:true}).to({rotation:this._boxInfoList[i].boxLight.rotation+360},10000);
					egret.Tween.get(this._boxInfoList[i].box,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
				}
			}
			else
			{
				this._boxInfoList[i].box.setRes("dailytask_box1_1");
				this._boxInfoList[i].boxLight.setVisible(false);
				egret.Tween.removeTweens(this._boxInfoList[i].box);
				egret.Tween.removeTweens(this._boxInfoList[i].boxLight);
			}
		}
	}
	/**
	 * 初始化宝箱
	 */
	private initBox()
	{
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let boxCfg = cfg.getBoxList();
		let maxNum = boxCfg[boxCfg.length - 1].needNum;
		for(let i = 0;i < boxCfg.length;i++)
		{
			let offestX = 0;
			if(i == 1)
			{
				offestX = 7; 
			}
			else if(i == boxCfg.length - 1)
			{
				offestX = -3; 
			}

			let boxbg = BaseBitmap.create("common_boxbg");
			let posX = this._progress.x + (boxCfg[i].needNum / maxNum) * this._progress.width;
			boxbg.setPosition(posX - boxbg.width / 2 + offestX, this._progress.y - boxbg.height-15);
			this.addChild(boxbg);
			boxbg.visible =false;
			

			let boxLight =  BaseBitmap.create("acturantable_taskbox_light");
			boxLight.anchorOffsetX = boxLight.width / 2;
			boxLight.anchorOffsetY = boxLight.height / 2;
			boxLight.setPosition(boxbg.x + boxbg.width / 2,boxbg.y + boxbg.height / 2-20);
			this.addChild(boxLight);

			let box = BaseBitmap.create("dailytask_box1_1");
			box.anchorOffsetX = box.width / 2;
			box.anchorOffsetY = box.height / 2;
			box.setScale(0.75);
			box.setPosition(boxLight.x,boxLight.y);
			this.addChild(box);
			box.addTouchTap((even:egret.TouchEvent) =>{
				let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
				let voNum = vo.lotteryNum();
				let isRevice = vo.boxStatus(boxCfg[i].id);
				let needNum = boxCfg[i].needNum;
				if(needNum <= voNum)
				{
					if(!isRevice)
					{
						this._nowReward = boxCfg[i].getReward

						NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA,{"activeId":this._activityID,"lotteryId":boxCfg[i].id});
						return;
					}
				}
				ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNREWARDINFOPOPUPVIEW,{"code":this.code,"aid":this.aid,"itemCfg":boxCfg[i]})
			},this);

			let livenuseeBg =  BaseBitmap.create("dailytask_dt_03");
			livenuseeBg.x = posX - livenuseeBg.width/2;
			livenuseeBg.y = this._progress.y +  this._progress.height-25;
			this.addChild(livenuseeBg);

			let boxDesc = ComponentManager.getTextField(LanguageManager.getlocal("acMidAutumnBoxNum",[String(boxCfg[i].needNum)]),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
			// boxDesc.setPosition(posX - boxDesc.width / 2 + offestX,this._progress.y +  this._progress.height + 3);
			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,boxDesc,livenuseeBg); 

			this.addChild(boxDesc);

		

			if((this.code =="1" ||this.code == "5"|| this.code == "8") && i == boxCfg.length - 1)
			{
				this._speakStr = LanguageManager.getlocal("acmidAutumnSpeakTip");
				this._speakTF = ComponentManager.getTextField(this._speakStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
				// this._speakTail = BaseBitmap.create("public_9_bg25_tail");

				this._speakBg = BaseBitmap.create("public_9_qipao");
				this._speakBg.width = this._speakTF.width + 40;
				this._speakBg.height = 56;
				let posX = box.x;
				if (posX + this._speakBg.width + 5 > GameConfig.stageWidth)
				{
					posX = GameConfig.stageWidth - this._speakBg.width - 15;
				}

				this._speakBg.setPosition(posX,box.y - box.height / 2-40);
				this.addChild(this._speakBg);

				this._speakTF.setPosition(this._speakBg.x + this._speakBg.width / 2 - this._speakTF.width / 2,this._speakBg.y + this._speakBg.height / 2 - this._speakTF.height / 2-8);
				this.addChild(this._speakTF);

				// this._speakTail.skewY = 180
				// this._speakTail.setPosition(box.x,box.y - box.height / 2 - this._speakTail.height);
				// this.addChild(this._speakTail);

				this._servantBM = BaseLoadBitmap.create("servant_half_1052");
				let scale = 0.33;
				this._servantBM.height = 177;
				this._servantBM.width = 180;
				this._servantBM.setScale(scale);
				this._servantBM.setPosition(this._speakBg.x  - this._servantBM.width * scale / 2,this._speakBg.y + this._speakBg.height - this._servantBM.height * scale-10);
				this.addChild(this._servantBM);

				egret.Tween.get(this._speakBg,{loop:true}).call(()=>{
					this._speakTF.text = "";
					// this._speakTail.setVisible(true);
					this._servantBM.setVisible(true);
					this._speakTF.setVisible(true);
					this._speakBg.setVisible(true);
					this._messageLength = 0;
					egret.Tween.get(this._speakTF,{loop:true}).wait(150).call(()=>{
						this._speakTF.text = this._speakStr.substr(0,this._messageLength);
						this._messageLength ++;
					},this);
				},this).wait(this._speakStr.length * 150 + 2000).call(()=>{
					// this._speakTail.setVisible(false);
					this._servantBM.setVisible(false);
					this._speakTF.setVisible(false);
					this._speakBg.setVisible(false);
					this._messageLength = 0;
					egret.Tween.removeTweens(this._speakTF);
				},this).wait(10000);

			} else if((this.code == "6"|| this.code == "7"|| this.code == "9") && i == boxCfg.length - 1){
				this._speakStr = LanguageManager.getlocal("acmidAutumnSpeakTip6");
				this._speakTF = ComponentManager.getTextField(this._speakStr,TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
				this._speakBg = BaseBitmap.create("public_9_qipao");
				this._speakBg.width = this._speakTF.width + 40;
				this._speakBg.height = 56;
				let posX = box.x;
				if (posX + this._speakBg.width + 5 > GameConfig.stageWidth)
				{
					posX = GameConfig.stageWidth - this._speakBg.width - 15;
				}
				this._speakBg.setPosition(posX,box.y - box.height / 2-10);
				this.addChild(this._speakBg);
				this._speakTF.setPosition(this._speakBg.x + this._speakBg.width / 2 - this._speakTF.width / 2,this._speakBg.y + this._speakBg.height / 2 - this._speakTF.height / 2-8);
				this.addChild(this._speakTF);
				this._servantBM = BaseLoadBitmap.create("servant_half_1046");
				let scale = 0.33;
				this._servantBM.height = 177;
				this._servantBM.width = 180;
				this._servantBM.setScale(scale);
				this._servantBM.setPosition(this._speakBg.x  - this._servantBM.width * scale / 2,this._speakBg.y + this._speakBg.height - this._servantBM.height * scale-10);
				this.addChild(this._servantBM);

				egret.Tween.get(this._speakBg,{loop:true}).call(()=>{
					this._speakTF.text = "";
					// this._speakTail.setVisible(true);
					this._servantBM.setVisible(true);
					this._speakTF.setVisible(true);
					this._speakBg.setVisible(true);
					this._messageLength = 0;
					egret.Tween.get(this._speakTF,{loop:true}).wait(150).call(()=>{
						this._speakTF.text = this._speakStr.substr(0,this._messageLength);
						this._messageLength ++;
					},this);
				},this).wait(this._speakStr.length * 150 + 2000).call(()=>{
			
					this._servantBM.setVisible(false);
					this._speakTF.setVisible(false);
					this._speakBg.setVisible(false);
					this._messageLength = 0;
					egret.Tween.removeTweens(this._speakTF);
				},this).wait(10000);
			}
			
			let boxInfo = {"box":box,"boxLight":boxLight};
			this._boxInfoList.push(boxInfo);

		}

	}

	/**
	 * 查看信息
	 */
	private infoBtnClick()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACMIDAUTUMNACINFOPOPUPVIEW,{"code":this.code,"aid":this.aid});
	}
	/**
	 * 买一次
	 */
	private oneBtnClick()
	{
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		if(this._isSendMessage)
		{
			return;
		}
		let cost = cfg.cost;
		if(vo.isFree)
		{
			cost = 0;
		}
		if(Api.playerVoApi.getPlayerGem() < cost)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return ;
		}
		NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,{"activeId":this._activityID,"isTenPlay":0});
		this._isSendMessage = true;

	}
	/**
	 * 买十次
	 */
	private tenBtnClick()
	{
		let vo  = <AcMidAutumnVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		if(this._isSendMessage)
		{
			return;
		}
		let cost = cfg.cost * 10 * cfg.discount;
		if(Api.playerVoApi.getPlayerGem() < cost)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
			return ;
		}
		NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,{"activeId":this._activityID,"isTenPlay":1});
		this._isSendMessage = true;


	}
	/**
	 * 特效的监听时间
	 */
	private effectClick(event:egret.Event,type:string)
	{
		if(this.code == "1" || this.code == "5"|| this.code == "8")
		{
			this._type = type;
			if(type == "1")
			{
				this._guanghuanBM.setScale(0.6);
				this._guanghuanContainer.setPosition(this._bg.x + 480,this._bg.y + this._bg.height - 140);
			}
			else if(type == "2")
			{
				this._guanghuanBM.setScale(0.8);
				this._guanghuanContainer.setPosition(this._bg.x + 405,this._bg.y + this._bg.height - 30);
			}
			else if(type == "3")
			{
				this._guanghuanBM.setScale(0.7);
				this._guanghuanContainer.setPosition(this._bg.x + 550,this._bg.y + this._bg.height - 60);
			}
			this._guanghuanContainer.y =this._guanghuanContainer.y-200;
		} 
		else if(this.code == "3")
		{
			this._type = type;
			if(type == "1")
			{
				this._guanghuanBM.setScale(0.9);
				this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX/2;
				this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY/2;
				this._guanghuanContainer.x = this._item1.x + this._item1.width * this._item1.scaleX/2 - this._guanghuanContainer.width/2 - 5;
				this._guanghuanContainer.y = this._item1.y + this._item1.height * this._item1.scaleY/2 - this._guanghuanContainer.height/2 -4 ;

			} 
			else if(type == "2")
			{
				this._guanghuanBM.setScale(1);
				this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX/2;
				this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY/2;
				this._guanghuanContainer.x = this._item2.x + this._item2.width * this._item2.scaleX/2 - this._guanghuanContainer.width/2 - 5;
				this._guanghuanContainer.y = this._item2.y + this._item2.height * this._item2.scaleY/2 - this._guanghuanContainer.height/2-5 ;
			}
			else if(type == "3")
			{
				this._guanghuanBM.setScale(1);
				this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX/2;
				this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY/2;
				this._guanghuanContainer.x = this._item3.x + this._item3.width * this._item3.scaleX/2 - this._guanghuanContainer.width/2 - 5;
				this._guanghuanContainer.y = this._item3.y + this._item3.height * this._item3.scaleY/2 - this._guanghuanContainer.height/2-6 ;
			}
			// this._guanghuanContainer.y =this._guanghuanContainer.y-200;
		}
		else if(this.code == "4")
		{
			this._type = type;
			if(type == "1")
			{
				this._guanghuanBM.setScale(1);
				this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX/2;
				this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY/2;
				this._guanghuanContainer.x = this._item1.x + this._item1.width * this._item1.scaleX/2 - this._guanghuanContainer.width/2 - 12;
				this._guanghuanContainer.y = this._item1.y + this._item1.height * this._item1.scaleY/2 - this._guanghuanContainer.height/2 -2 ;

			} 
			else if(type == "2")
			{
				this._guanghuanBM.setScale(1.1);
				this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX/2;
				this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY/2;
				this._guanghuanContainer.x = this._item2.x + this._item2.width * this._item2.scaleX/2 - this._guanghuanContainer.width/2 - 14;
				this._guanghuanContainer.y = this._item2.y + this._item2.height * this._item2.scaleY/2 - this._guanghuanContainer.height/2-3 ;
			}
			else if(type == "3")
			{
				this._guanghuanBM.setScale(1.1);
				this._guanghuanBM.x = this._guanghuanContainer.width / 2 - this._guanghuanBM.width * this._guanghuanBM.scaleX/2;
				this._guanghuanBM.y = this._guanghuanContainer.height / 2 - this._guanghuanBM.height * this._guanghuanBM.scaleY/2;
				this._guanghuanContainer.x = this._item3.x + this._item3.width * this._item3.scaleX/2 - this._guanghuanContainer.width/2 - 14;
				this._guanghuanContainer.y = this._item3.y + this._item3.height * this._item3.scaleY/2 - this._guanghuanContainer.height/2-3 ;
			}
			// this._guanghuanContainer.y =this._guanghuanContainer.y-200;
		}

	}
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNLOTTERY,this.lotteryHandle,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMA,this.receiveBoxHandle,this);
		
		if(this._speakTF){
			egret.Tween.removeTweens(this._speakTF);
		}	
		if(this._speakBg){
			egret.Tween.removeTweens(this._speakBg);
		}
		if(this._item2){
			egret.Tween.removeTweens(this._item2)
		}
		
		
		this._findNumTF = null;
		this._progress = null;
		this._oneNeedNumTF = null;
		this._isSendMessage = false;
		this._boxInfoList = [];
		this._maxBoxNum = null;
		this._guanghuanBM = null;
		this._speakStr = null;
		this._speakTF = null;
		this._nowReward = null; 
		this._speakBg = null;
		this._servantBM = null;
		this._messageLength = 0;
		this._dragon1 = null;

		this._item1 = null;
		this._item2 = null;
		this._item3 = null;

		this._gaizi1 = null;
		this._gaizi2 = null;
		this._gaizi3 = null;

		super.dispose();
	}
	
}