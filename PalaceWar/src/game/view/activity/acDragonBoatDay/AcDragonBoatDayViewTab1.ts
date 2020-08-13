/*
author : qinajun
date : 2018.4.14
desc : 端午活动 划龙舟
*/
class AcDragonBoatDayViewTab1 extends AcCommonViewTab
{
	private _zziTxt : BaseTextField = null;
	private _curMeterTxt : BaseTextField = null;
	private _numbg : BaseBitmap = null;
	private _progressBar : ProgressBar = null;
	private _curRiceTxt : BaseTextField = null;
	private _nextRiceTxt : BaseTextField = null;
	private _prevAwardRiceTxt : BaseTextField = null;
	private _nextAwardRiceTxt : BaseTextField = null;
	private _curAwardRiceTxt : BaseTextField = null;
	private _scrollList:ScrollList = null; 
	private _dbnumricecurbg : BaseBitmap = null;
	private _dbnumricenextbg : BaseBitmap = null;
	private _awardbg : BaseBitmap = null;
	private _prevBtn : BaseButton = null;
	private _nextBtn : BaseButton = null;
	private _curJindu : number = 1;
	private _lqBtn : BaseButton = null;
	private _rankBtn : BaseButton = null;
	private _collectflag : BaseBitmap = null;
	private _redPot1 : BaseBitmap = null;
	private _redPot2 : BaseBitmap = null;
	private _boatclip : CustomMovieClip = null;
	private _dbboatbg : BaseBitmap = null;
	private _dbboatbg2 : BaseBitmap = null;
	private _boatGroup : BaseDisplayObjectContainer = null;
	private _lampClip : CustomMovieClip = null;
	private _activityTimerText: BaseTextField = null;
	private _activityDescText: BaseTextField = null;
	private _mibg : BaseBitmap = null;

	private _steps:BaseLoadBitmap = null;

	private _steps2:BaseLoadBitmap = null;

	private _teamClip:CustomMovieClip = null;

	private _ribbonaClip:CustomMovieClip = null;
	private _ribbonbClip:CustomMovieClip = null;

	private _terminusbg:BaseLoadBitmap = null;

	//解决_curRiceTxt,_nextRiceTxt显示错误的问题加的参数,范围0-9
	private _newIndex:number = 0;

	public constructor() 
	{
		super();
		this.initView();
	}
	
    private get cfg() : Config.AcCfg.DragonBoatDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDragonBoatDayVo{
        return <AcDragonBoatDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

	private getTypeCode():string{
        let code = this.code;
        if(this.code == '6'){
            code = '3';
        }
        return code;
    }

	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBJINDU), view.lqJinduAward, view);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, view.fresh_view, view);
		let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
		view.height = boatview.tabHeight;
		view.width = boatview.tabWidth;
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
		let vo = this.vo;
		  
		  
		var downBg  = null;
		if(this.getTypeCode()=="5")
		{
			downBg= BaseBitmap.create('dragobottombg');
			downBg.width = 630;
			downBg.height = 326; 
			this.addChild(downBg);
			view.setLayoutPosition(LayoutConst.horizontalCenterbottom, downBg, this, [0,18]); 

			var dragonfont= BaseBitmap.create('dragonfont');
			dragonfont.width = 528;
			dragonfont.height = 136; 
			this.addChild(dragonfont);
			dragonfont.x = 50;
			dragonfont.y = 50;  
		} 
		
		let awardbg = BaseBitmap.create('public_9_bg41');
		awardbg.width = 510;
		awardbg.height = 126;
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [0,this.getTypeCode() == '4' ? 120 : 100]);
		view.addChild(awardbg);
		view._awardbg = awardbg; 
		if(this.getTypeCode()=="2")
		{
			view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [10,78]);
		}
		if(this.getTypeCode()=="5")
		{
			view.setLayoutPosition(LayoutConst.horizontalCenterbottom, awardbg, view, [10,90]);
		}
		if (this.getTypeCode() == "7") {
			let _bottomBg = BaseLoadBitmap.create("dragonboatbuttombg-" + this.getTypeCode())
			_bottomBg.width = 612 ;
			_bottomBg.height = 282;
			_bottomBg.setPosition(awardbg.x + awardbg.width / 2 - _bottomBg.width / 2, awardbg.y-120 - 40 + 78);// 251 211
			view.addChild(_bottomBg);
		}
		if (this.getTypeCode() == "8") {
			let _bottomBg = BaseLoadBitmap.create("dragonboatbuttombg-" + this.getTypeCode())
			_bottomBg.width = 612 ;
			_bottomBg.height = 282;
			_bottomBg.setPosition(awardbg.x + awardbg.width / 2 - _bottomBg.width / 2, awardbg.y-120 - 40 + 78);// 251 211
			view.addChild(_bottomBg);
		}
	
 		let tmpRect =  new egret.Rectangle(0,0,486,124);
		let scrollList = ComponentManager.getScrollList(ItemScrollItem,null,tmpRect);
		scrollList.addTouchTap(this.clickItemHandler, this);
		view._scrollList = scrollList;     
		 
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, awardbg, [0,4]);
		view.addChild(scrollList); 

		let lqBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'DragonBoatDayLq', view.lqClick,view);
		view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, view, [0,40]);
		view.addChild(lqBtn);
		view._lqBtn = lqBtn;
		if(this.getTypeCode()=="5")
		{
			view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lqBtn, view, [0,30]);
		}

		let prevBtn = ComponentManager.getButton('btn_leftpage', '', view.prevClick, view);
		prevBtn.setScale(0.8);
		view.setLayoutPosition(LayoutConst.lefttop, prevBtn, awardbg, [0-prevBtn.width/2*prevBtn.scaleX-20,0-prevBtn.height*prevBtn.scaleY-5]);
		if(this.getTypeCode()==`2`||this.getTypeCode()==`5`)
		{
			view.setLayoutPosition(LayoutConst.lefttop, prevBtn, awardbg, [0-prevBtn.width/2*prevBtn.scaleX-30,0-prevBtn.height*prevBtn.scaleY-5+80]);
		}

		view.addChild(prevBtn);
		view._prevBtn = prevBtn;

		let public_dot1 = BaseBitmap.create("public_dot2");
		view.setLayoutPosition(LayoutConst.lefttop, public_dot1, prevBtn, [0-public_dot1.width/4, -public_dot1.height/4]);
		public_dot1.visible = false;
		view.addChild(public_dot1);
		view._redPot1 = public_dot1;

		let prevAwardRiceTxt = ComponentManager.getTextField(``, 18, 0xc2b88b);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, prevAwardRiceTxt, prevBtn, [0,0]);
		view.addChild(prevAwardRiceTxt);
		view._prevAwardRiceTxt = prevAwardRiceTxt;

		let nextBtn = ComponentManager.getButton('btn_leftpage', '', view.nextClick, view);
		nextBtn.anchorOffsetX = nextBtn.width / 2;
		nextBtn.setScale(0.8);
		view.setLayoutPosition(LayoutConst.righttop, nextBtn, awardbg, [0-prevBtn.width*0.8,0-prevBtn.height*nextBtn.scaleY-5]);
		nextBtn.scaleX = -0.8;
		view.addChild(nextBtn);
		view._nextBtn = nextBtn;
		if(view.getTypeCode()==`2`||view.getTypeCode()==`5`)
		{
			view.setLayoutPosition(LayoutConst.righttop, nextBtn, awardbg, [0-prevBtn.width*0.8+80,0-prevBtn.height*nextBtn.scaleY-5+80]);
		}

		let public_dot2 = BaseBitmap.create("public_dot2");
		view.setLayoutPosition(LayoutConst.lefttop, public_dot2, nextBtn, [public_dot2.width/4, -public_dot2.height/4]);
		public_dot2.visible = false;
		view.addChild(public_dot2);
		view._redPot2 = public_dot2;

		let nextWardriceTxt = ComponentManager.getTextField(``, 18, 0xc2b88b);
		view.setLayoutPosition(LayoutConst.rightverticalCenter, nextWardriceTxt, nextBtn, [0,0]);
		view.addChild(nextWardriceTxt);
		view._nextAwardRiceTxt = nextWardriceTxt;
		 

		let curAwardRiceTxt = ComponentManager.getTextField(``, 26, 0xfcf3b4);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, curAwardRiceTxt, awardbg, [0, -27]);
		view.addChild(curAwardRiceTxt);
		view._curAwardRiceTxt = curAwardRiceTxt;
		 

		let height = prevBtn.y - 10;//Math.min(prevBtn.y - 20, 383);
		let bg = BaseBitmap.create('dragonboatbg2');
		bg.width = 612;
		bg.height = height;
		if(this.getTypeCode()=="2")
		{
			bg.height = 102;
			scrollList.scaleX =0.9;
			scrollList.scaleY =0.9;
		}
		if(this.getTypeCode()=="5")
		{
			bg.visible =false;
		}

		view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
		view.addChild(bg);
 
		let boatGroup = new BaseDisplayObjectContainer();
		boatGroup.width = 612;
		boatGroup.height = height - 80;
		view.setLayoutPosition(LayoutConst.lefttop, boatGroup, bg);
		view.addChild(boatGroup);
		boatGroup.mask = new egret.Rectangle(0,0,610,boatGroup.height);
		if(this.getTypeCode()=="2")
		{
			boatGroup.mask = new egret.Rectangle(0,102,610,GameConfig.stageHeigth-300-120);//boatGroup.height+102);
			awardbg.width = 498;
			awardbg.height = 112;
		} 

		view._boatGroup = boatGroup;
		if(this.getTypeCode()=="5")
		{
			view._boatGroup .visible =false;
		}
		let dbboatbg:BaseBitmap  =null;
		if(this.getTypeCode() == '4'){

			boatGroup.height = Math.min(height - 60,310);
			boatGroup.mask = new egret.Rectangle(0,0,610,boatGroup.height);
			let cloud = BaseBitmap.create('dragonboatbg4-3');
			// dbboatbg.height = height - 80;
			view.setLayoutPosition(LayoutConst.lefttop, cloud, boatGroup, [0,0], true);
			boatGroup.addChild(cloud);
			// view._dbboatbg = dbboatbg;

			dbboatbg = BaseBitmap.create('dragonboatbg4-2');
			// dbboatbg.height = height - 80;
			view.setLayoutPosition(LayoutConst.lefttop, dbboatbg, boatGroup, [0,0], true);
			boatGroup.addChild(dbboatbg);
			view._dbboatbg = dbboatbg;

			let dbboatbg2 = BaseBitmap.create('dragonboatbg4-2');
			view.setLayoutPosition(LayoutConst.lefttop, dbboatbg2, dbboatbg, [dbboatbg.width,0]);
			boatGroup.addChild(dbboatbg2);
			view._dbboatbg2 = dbboatbg2;

			egret.Tween.get(dbboatbg,{loop : true}).
			to({x : - dbboatbg.width},57000). 
			to({x : dbboatbg.width - 5}, 1).
			to({x : 0},57000);

			egret.Tween.get(dbboatbg2,{loop : true}).
			to({x : - dbboatbg.width}, 114000).
			to({x : dbboatbg.width - 5}, 1);

			
			let steps = BaseBitmap.create('dragonboatbg4-1');
			// dbboatbg.height = height - 80;
			view.setLayoutPosition(LayoutConst.lefttop, steps, boatGroup, [0,30], true);
			boatGroup.addChild(steps);

			let steps2 = BaseBitmap.create('dragonboatbg4-1');
			view.setLayoutPosition(LayoutConst.lefttop, steps2, boatGroup, [572,-235.2]);
			boatGroup.addChild(steps2);

			egret.Tween.get(steps,{loop : true}).
			to({x : -572, y :295.2},13000). 
			to({x : 572, y : -235.2}, 1).
			to({x : 0, y : 30},13000);

			egret.Tween.get(steps2,{loop : true}).
			to({x : -572, y : 295.2}, 26000).
			to({x : 572, y : -235.2}, 1);
			view._dbboatbg2 = dbboatbg2;

			let boatclip = ComponentManager.getCustomMovieClip('dragonboatman',7,200);
			boatclip.width = 63;
			boatclip.height = 133;
			view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, dbboatbg, [-120,70]);
			boatGroup.addChild(boatclip); 
			boatclip.playWithTime(-1);
			view._boatclip = boatclip;

			let mask = BaseBitmap.create('dragonboatmask');
			// dbboatbg.height = height - 80;
			view.setLayoutPosition(LayoutConst.horizontalCenterbottom, mask, boatclip, [-15,-5]);
			boatGroup.addChild(mask);

			boatGroup.swapChildren(mask,boatclip);

			
		}
		else if(this.getTypeCode() == "7"){

			boatGroup.height = Math.min(height - 60,310);
			boatGroup.mask = new egret.Rectangle(0,0,610,boatGroup.height);
			
			let steps = BaseLoadBitmap.create("dragonboatbg"+this.getTypeCode()+"-1");
			steps.width= 1089;
			steps.height = 383;
			boatGroup.addChild(steps);

			let steps2 = BaseLoadBitmap.create("dragonboatbg"+this.getTypeCode()+"-1");
			steps2.width= 1089;
			steps2.height = 383;

			boatGroup.addChild(steps2);

			let t = 52000 / (steps.width * 2);

			egret.Tween.get(steps,{loop:true}).to({
				x: -1089,
			}, (steps.x + steps.width) * t).to({
				x:  steps2.x + steps2.width,
			}, 0).to({
				x: 0,
			}, steps2.x + steps2.width * t);

			egret.Tween.get(steps2,{loop:true}).to({
				x: steps.x + steps.width,
			}, 0).to({
				x: -1089,
			}, (steps.x + steps.width * 2) * t);

			this._steps = steps;
			this._steps2 = steps2;

			this._terminusbg = BaseLoadBitmap.create("dragonboatterminusbg-" +this.getTypeCode()  );
			this._terminusbg.width = 250;
			this._terminusbg.height = 382;
			this._terminusbg.setPosition(610 -this._terminusbg.width,0 );
			boatGroup.addChild(this._terminusbg);
			// let vo = <AcDragonBoatDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
			let needMeter = this.cfg.teamReward["9"].needMeter;
			if (needMeter) {
				let type: string = null;
				let posXa:number = 0;
				let posYa:number = 0;

				let posXb:number = 0;
				let posYb:number = 0;
				let scale:number = 0
				if (this.vo.getTotalRiceNum() < needMeter * 0.3) {
					type = "a";
					posXa = -58;
					posYa = -38;
					posXb = 157;
					posYb = -61;
					scale = 0.6;
				}
				else if (this.vo.getTotalRiceNum() < needMeter * 0.6) {
					type = "b";
					posXa = -150;
					posYa = -81;
					posXb = 137;
					posYb = -108;
					scale = 0.8;
				}
				else {
					type = "c";
					posXa = -171;
					posYa = -109;
					posXb = 187;
					posYb = -143;
					scale = 1;
				}
				
				this._teamClip = ComponentManager.getCustomMovieClip("acdragonboatvieweffect_team" + type, 4, 150);
				let teamBM = BaseBitmap.create("acdragonboatvieweffect_team" + type + "1");
				this._teamClip.setPosition(305 - teamBM.width / 2 - 30, 30);
				boatGroup.addChild(this._teamClip);
				this._teamClip.addTouchTap(() => { 
					this._ribbonaClip.playWithTime(1);
					this._ribbonbClip.playWithTime(1);
				}, this);
				if (this.vo.getTotalRiceNum() < needMeter) {
					this._teamClip.setVisible(true);
					this._teamClip.playWithTime(-1);
					this._terminusbg.setVisible(false);
				}
				else {
					this._teamClip.setVisible(false);
					let teamBM = BaseBitmap.create("acdragonboatvieweffect_team" + type + "1");
					teamBM.setPosition(this._teamClip.x, this._teamClip.y);
					boatGroup.addChild(teamBM);
					teamBM.addTouchTap(() => {
						this._ribbonaClip.playWithTime(1);
						this._ribbonbClip.playWithTime(1);
					}, this);
					egret.Tween.removeTweens(this._steps);
					egret.Tween.removeTweens(this._steps2);
					this._terminusbg.setVisible(true);

				}

				this._ribbonaClip = ComponentManager.getCustomMovieClip("acdragonboatvieweffect_ribbona", 12, 120);
				this._ribbonaClip.setScale(scale);
				this._ribbonaClip.setPosition(this._teamClip.x + posXa, this._teamClip.y + posYa);
				boatGroup.addChild(this._ribbonaClip);

				this._ribbonbClip = ComponentManager.getCustomMovieClip("acdragonboatvieweffect_ribbonb", 12, 120);
				this._ribbonbClip.setScale(scale);
				this._ribbonbClip.setPosition(this._teamClip.x + posXb, this._teamClip.y + posYb);
				boatGroup.addChild(this._ribbonbClip);

				
			}
	
			// egret.Tween.get(steps,{loop : true}).
			// to({x : -572, y :295.2},13000). 
			// to({x : 572, y : -235.2}, 1).
			// to({x : 0, y : 30},13000);

			// egret.Tween.get(steps2,{loop : true}).
			// to({x : -572, y : 295.2}, 26000).
			// to({x : 572, y : -235.2}, 1);
			// // view._dbboatbg2 = dbboatbg2;

			// let boatclip = ComponentManager.getCustomMovieClip('dragonboatman',7,200);
			// boatclip.width = 63;
			// boatclip.height = 133;
			// view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, dbboatbg, [-120,70]);
			// boatGroup.addChild(boatclip); 
			// boatclip.playWithTime(-1);
			// view._boatclip = boatclip;

			// let mask = BaseBitmap.create('dragonboatmask');
			// // dbboatbg.height = height - 80;
			// view.setLayoutPosition(LayoutConst.horizontalCenterbottom, mask, boatclip, [-15,-5]);
			// boatGroup.addChild(mask);

			// boatGroup.swapChildren(mask,boatclip);

			
		}
		else if(this.getTypeCode() == `8`){
			dbboatbg = BaseBitmap.create('dragonboatbg8-1');
			let top = Math.min(0,(height - 60) - dbboatbg.height);
			view.setLayoutPosition(LayoutConst.lefttop, dbboatbg, boatGroup, [0,top], true);
			boatGroup.addChild(dbboatbg);
			view._dbboatbg = dbboatbg;

			let dbboatbg2 = BaseBitmap.create('dragonboatbg8-1');
			view.setLayoutPosition(LayoutConst.lefttop, dbboatbg2, dbboatbg, [dbboatbg.width,0]);
			boatGroup.addChild(dbboatbg2);
			view._dbboatbg2 = dbboatbg2;

			egret.Tween.get(dbboatbg,{loop : true}).
			to({x : - dbboatbg.width},20000). 
			to({x : dbboatbg.width - 5}, 1).
			to({x : 0},20000);

			egret.Tween.get(dbboatbg2,{loop : true}).
			to({x : - dbboatbg.width}, 40000).
			to({x : dbboatbg.width - 5}, 1);

			let clip = ComponentManager.getCustomMovieClip(`acdragonboatviewlamp`, 12);
			clip.width = 615;
			clip.height = 150;
			clip.y = dbboatbg.y + dbboatbg.height - clip.height + 5;
			clip.x = -2;
			clip.playWithTime(-1);
			boatGroup.addChild(clip);

			this.makeLamp();
		}
		else if(this.getTypeCode()!='2'&&this.getTypeCode()!='5')
		{
			dbboatbg = BaseBitmap.create('dragonboatbg');
			dbboatbg.height = height - 80;
			view.setLayoutPosition(LayoutConst.lefttop, dbboatbg, boatGroup, [0,0], true);
			boatGroup.addChild(dbboatbg);
			view._dbboatbg = dbboatbg;

			let dbboatbg2 = BaseBitmap.create('dragonboatbg');
			dbboatbg2.height = height - 80;
			view.setLayoutPosition(LayoutConst.lefttop, dbboatbg2, dbboatbg, [dbboatbg.width,0]);
			boatGroup.addChild(dbboatbg2);
			view._dbboatbg2 = dbboatbg2;

			egret.Tween.get(dbboatbg,{loop : true}).
			to({x : - dbboatbg.width},20000). 
			to({x : dbboatbg.width - 5}, 1).
			to({x : 0},20000);

			egret.Tween.get(dbboatbg2,{loop : true}).
			to({x : - dbboatbg.width}, 40000).
			to({x : dbboatbg.width - 5}, 1);
			 
			let boatclip = ComponentManager.getCustomMovieClip( this.getTypeCode()=="3" ? "dragonboat3_" : "dragonboat",2,800);
			boatclip.width = 504;
			boatclip.height = 148;
			view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boatclip, view._boatGroup, [20,0], true);
			boatGroup.addChild(boatclip); 
			boatclip.playWithTime(-1);
			view._boatclip = boatclip;
		}
		let numbgstr:string ="public_numbg";
		if(this.getTypeCode()=="2")
		{
			dbboatbg = BaseLoadBitmap.create('dragonboatbgnew2');  
			view.setLayoutPosition(LayoutConst.leftbottom, dbboatbg, boatGroup, [0,621], true); 
			boatGroup.addChild(dbboatbg);
			view._dbboatbg = dbboatbg;  
			numbgstr = "public_9_resbg";
		}
		
			
		let rankBtnStr = 'dragonboatrank';
		if (this.getTypeCode() == "7") {
			rankBtnStr = 'dragonboatrankbtn-' + this.getTypeCode()
		}
		let rankBtn = ComponentManager.getButton(rankBtnStr, '', view.rankClick,view);
		view.setLayoutPosition(LayoutConst.lefttop, rankBtn, view, [22,10]); 
		view._rankBtn = rankBtn;    
		view.addChild(rankBtn); 

		let numbg = BaseBitmap.create(numbgstr);
		view.setLayoutPosition(LayoutConst.righttop, numbg, view, [22,10]);
		view.addChild(numbg);
		view._numbg = numbg;
		
		let zziTxt = ComponentManager.getTextField('',18, TextFieldConst.COLOR_QUALITY_WHITE);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zziTxt, numbg,[10,0]); 
		view.addChild(zziTxt);
		view._zziTxt = zziTxt;
		
		let zziImg = BaseBitmap.create('dragonboatitem'+this.getTypeCode()); 
		zziImg.setScale(0.5); 
		view.setLayoutPosition(LayoutConst.leftverticalCenter, zziImg, numbg, [0-0.5*zziImg.width/2+10,0]);
	
		if(this.getTypeCode()=="2")
		{
			zziImg.setScale(0.8);	
			zziImg.setPosition(3,93);
			view._numbg.setPosition(20,113); 
			
			zziTxt.width =90;
			zziTxt.textAlign =TextFieldConst.ALIGH_CENTER;
			view._zziTxt.size =24;
			view._zziTxt.setPosition(65,120)
		} 

		if(this.getTypeCode()=="5")
		{
			view._numbg.x =15;   	 
			view.setLayoutPosition(LayoutConst.lefttop, zziImg, downBg, [13,-70]); 
			view._numbg.y =zziImg.y-3+10; 
			
			zziTxt.width =90;
			zziTxt.textAlign =TextFieldConst.ALIGH_CENTER;
			view._zziTxt.size =24;
			view._zziTxt.setPosition(zziImg.x-15,zziImg.y)
		}  
		view.addChild(zziImg);

		let progress = ComponentManager.getProgressBar("dragonboatprogress","dragonboatprogress_bg",612);
		
		view.setLayoutPosition(LayoutConst.horizontalCentertop, progress, view._boatGroup, [0,view._boatGroup.height + (this.getTypeCode() == '4' ? 10 : 30)]);
		if(this.getTypeCode() == "7")
		{
			view.setLayoutPosition(LayoutConst.horizontalCentertop, progress, view._boatGroup, [0,view._boatGroup.height + 10]);
		}
		progress.setDragIcon('dragonboathead'+ (this.getTypeCode() == '4' ? '3' : this.getTypeCode()));
		progress.setPercentage(0);
		view.addChild(progress);
		view._progressBar = progress;
		if(this.getTypeCode()==`2`||this.getTypeCode()==`5`)
		{	
			progress.y = GameConfig.stageHeigth-470; 
		}

		let curMeterTxt = ComponentManager.getTextField('',18, 0xfcf3b4);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, curMeterTxt, progress);
		view.addChild(curMeterTxt);
		view._curMeterTxt = curMeterTxt;

		let dbnumriceprevbg = BaseBitmap.create('dragonboatnumbg');
		dbnumriceprevbg.height = 30;
		view.setLayoutPosition(LayoutConst.lefttop, dbnumriceprevbg, progress, [0,progress.height+5]);
		view.addChild(dbnumriceprevbg);
		view._dbnumricecurbg = dbnumriceprevbg;

		let prevriceTxt = ComponentManager.getTextField(``, 18, 0xfcf3b4);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, prevriceTxt, dbnumriceprevbg, [0,2]);
		view.addChild(prevriceTxt);
		view._curRiceTxt = prevriceTxt;
		
		let dbnumricenextbg = BaseBitmap.create('dragonboatnumbg');
		dbnumricenextbg.height = 30;
		view.setLayoutPosition(LayoutConst.righttop, dbnumricenextbg, bg, [0,progress.y+progress.height+5]);
		view.addChild(dbnumricenextbg);
		view._dbnumricenextbg = dbnumricenextbg;
		if(view.getTypeCode()==`2`||view.getTypeCode()==`5`)
		{
			dbnumricenextbg.width=99;
			dbnumriceprevbg.width=99;
			view.setLayoutPosition(LayoutConst.righttop, dbnumricenextbg, bg, [5,progress.y+progress.height+5]);
		}

		let nextriceTxt = ComponentManager.getTextField(``, 18, 0xfcf3b4);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextriceTxt, dbnumricenextbg,[0,2]);
		view.addChild(nextriceTxt);
		view._nextRiceTxt = nextriceTxt;

		let flag = BaseBitmap.create("collectflag");
		flag.setScale(0.6);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, lqBtn);
		view.addChild(flag);
		flag.visible = false;
		view._collectflag = flag;

		if(this.getTypeCode() =="2"||this.getTypeCode()=="5")
		{
			//活动时间    
			view._activityTimerText = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime`,[vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			view.addChild(view._activityTimerText); 
			view._activityTimerText.setPosition(bg.x+10,bg.y+11);
			
			
			//活动描述
			let dayDesc = '';
            if((this.code == '1' ||this.code == '3'||this.code == '6')&&Api.switchVoApi.checkServantRefuseBattle()){
				dayDesc = `DragonBoatDayDesc-${view.code}_withOpenRefusal`;
			}else{
                dayDesc = `DragonBoatDayDesc-${view.code}`;
            }
			view._activityDescText = ComponentManager.getTextField(LanguageManager.getlocal(dayDesc), TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
			view.addChild(view._activityDescText);
			view._activityDescText.width =bg.width-20;
			view._activityDescText.setPosition(bg.x+10,bg.y+35); 
			view.setLayoutPosition(LayoutConst.lefttop, rankBtn, view, [540,103]);  
			view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._awardbg, [0, -22]);
			if(this.getTypeCode()=="5")
			{
				view._activityTimerText.setPosition(24,-60);
				view._activityDescText.setPosition(bg.x+10,-30); 
				view.setLayoutPosition(LayoutConst.lefttop, rankBtn, downBg, [540,-90]);  
			}

			let downTitleLine: BaseBitmap = BaseBitmap.create("public_line3");
			this.addChild(downTitleLine);
			view._curAwardRiceTxt.size =22;
			downTitleLine.width = 440; 
		 	view.setLayoutPosition(LayoutConst.horizontalCentertop, downTitleLine, view._awardbg, [0, -30]);
			if(this.getTypeCode()=="5")
			{
				downTitleLine.visible =false;
				view._curAwardRiceTxt.x = view._curAwardRiceTxt.x-5;
				view._curAwardRiceTxt.y = view._curAwardRiceTxt.y-10;

				//view.setLayoutPosition(LayoutConst.horizontalCentertop, , view._awardbg, [0, -42]);
	 
			}
		} 
		view._curJindu = view.vo.getCurJindu();
		view._newIndex = Math.min(view.vo.getArr('teamReward').length,view._curJindu);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DRAGONINFO, {
			activeId : view.acTivityId
		}); 

		if (this.getTypeCode() == "7") {
			view.setLayoutPosition(LayoutConst.lefttop, prevBtn, awardbg, [0-prevBtn.width/2*prevBtn.scaleX-20, 0 - prevBtn.height * prevBtn.scaleY - 5 -5]);
			view.setLayoutPosition(LayoutConst.lefttop, public_dot1, prevBtn, [0-public_dot1.width/4, -public_dot1.height/4]);
			view.setLayoutPosition(LayoutConst.righttop, nextBtn, awardbg, [0 - prevBtn.width * 0.8 + 80, 0 - prevBtn.height * nextBtn.scaleY - 5 - 5]);
			view.setLayoutPosition(LayoutConst.lefttop, public_dot2, nextBtn, [public_dot2.width/4, -public_dot2.height/4]);
		}
	}

	private fresh_jindu(jindu):void{
		let view = this;
		view._zziTxt.text = view.vo.getZongzi().toString();
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._zziTxt, view._numbg);
		if(this.getTypeCode()=="2"||this.getTypeCode()=="5")
		{
			view._zziTxt.x = 65;
			view._zziTxt.width =90;
			view._zziTxt.textAlign =TextFieldConst.ALIGH_CENTER;
			
		}
		
		let totalMeter = view.vo.getTotalRiceNum();
		let str = totalMeter >= view.vo.getEndMeter() ? LanguageManager.getlocal(`DragonBoatDayEnd_`+this.code) : (LanguageManager.getlocal('DragonBoatDayTotalRiceNum_'+this.code, [view.vo.getTotalRiceNum().toString()]));
		view._curMeterTxt.text = str;//
		if(totalMeter >= view.vo.getEndMeter()){
			//
			//停止动画
			//view._boatclip.timeRate = 30;
			if(AcDraftVoteView.CODE=="1")
			{
				egret.Tween.removeTweens(view._dbboatbg);
				egret.Tween.removeTweens(view._dbboatbg2);
				view._boatclip.stop();
				view._boatclip.playWithTime(1);
			} 
			view.showLihua();
		}

		let cur_jindu = jindu;
		//当前进度米数
		let curData = view.vo.getteamRewardDataById(cur_jindu-1);
		let curRice = '';
		if(curData){
			curRice = curData.needMeter.toString();
		}
		else{
			curRice = '0';
		}
		view._curRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_'+this.code, [curRice]);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0,2]);
		
		//前一个进度米数
		let prevData = view.vo.getteamRewardDataById(view._newIndex-1);
		let prevRice = '';
		if(prevData){
			prevRice = prevData.needMeter.toString();
		}
		else{
			prevRice = '0';
		}
		view._curRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_'+this.code, [prevRice]);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._curRiceTxt, view._dbnumricecurbg, [0,2]);


		//下一个进度米数
		let nextData = view.vo.getteamRewardDataById(view._newIndex );
		let nextRice = nextData.needMeter.toString();
		view._nextRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_'+this.code, [nextRice]);
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nextRiceTxt, view._dbnumricenextbg,[0,2]);
		
		view.fresh_rewward(view._curJindu);
		//进度条
		let percent = 0;
		let totalRice = view.vo.getTotalRiceNum();
		let curMeter = 0;
		if(cur_jindu <= 1){
			curMeter = nextData.needMeter;
			nextData = view.vo.getteamRewardDataById(2);
			nextRice = nextData.needMeter.toString();
		}
		else{
			curMeter = curData.needMeter;
		}

		if(cur_jindu <= 1){
			percent = totalRice / curMeter;
		}
		else if(nextData){
			percent = (totalRice - curMeter) / (nextData.needMeter - curMeter);
		}
		else{
			if(totalRice >= view.vo.getEndMeter()){
				percent = 1;
			}
			else{
				let prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
				percent = (totalRice - curMeter) / (curMeter - prevData.needMeter);
			}
			
		}
		view._progressBar.setPercentage(percent);
		if(view._curJindu == view.vo.getCurJindu() && totalRice >= (nextData ? nextData.needMeter : curMeter)){
			view._progressBar.resetIconPosition(575);
		} 
		if (percent>=1 && view._curJindu == view.vo.getArr('teamReward').length)
		{
			view._progressBar._dragIcon.visible = true;
		}
		// view._progressBar.setIconVisible(view._curJindu == view.vo.getCurJindu());
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curMeterTxt, view, [0, view._progressBar.y + view._progressBar.height + 15 - view.y]);
	}

	private fresh_rewward(cur_jindu){
		let view = this;
		if(cur_jindu == 0){
			cur_jindu = 1;
		}

		//进度奖励
		let prevData = view.vo.getteamRewardDataById(cur_jindu - 1);
		let prevRice = '';
		if(prevData){
			view._prevAwardRiceTxt.visible = view._prevBtn.visible = true;
			prevRice = prevData.needMeter.toString();
		}
		else{
			prevRice = '';
			view._prevAwardRiceTxt.visible = view._prevBtn.visible = false;
		}
		view._prevAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_'+this.code,[prevRice]);
		view.setLayoutPosition(LayoutConst.leftverticalCenter, view._prevAwardRiceTxt, view._prevBtn, [view._prevBtn.width*0.8+10,0]);
		
		let curData = view.vo.getteamRewardDataById(cur_jindu);
		let nextData = view.vo.getteamRewardDataById(cur_jindu + 1);
		let curMeter = curData.needMeter;
		let nextMeter = 0;//n
		
		view._curAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNumAward_'+this.code,[curMeter.toString()]);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._awardbg, [0, -32]);
		if (this.getTypeCode() == "7") {
			view.setLayoutPosition(LayoutConst.horizontalCentertop, view._curAwardRiceTxt, view._awardbg, [0, -37]);
		}
	 
		if(nextData){
			view._nextAwardRiceTxt.visible = view._nextBtn.visible = true;
			nextMeter = nextData.needMeter;
		}
		else{
			view._nextAwardRiceTxt.visible = view._nextBtn.visible = false;
		}
		view._nextAwardRiceTxt.text = LanguageManager.getlocal('DragonBoatDayRiceNum_'+this.code,[nextMeter.toString()]);
		view.setLayoutPosition(LayoutConst.rightverticalCenter, view._nextAwardRiceTxt, view._nextBtn, [-20,0]);
		
		view._scrollList.refreshData(view.vo.gerCurRiceAward(view._curJindu),view.getTypeCode());
		view._scrollList.width = (view.vo.gerCurRiceAward(view._curJindu)).length > 3 ? 486 : 363;
		view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._scrollList, view._awardbg, [0, 3]);

		let curTotalMeter = view.vo.getTotalRiceNum();
		if(curTotalMeter >= curMeter){
			view._collectflag.visible = view.vo.isGetJinduAward(view._curJindu);
			view._lqBtn.setEnable(true);
			
		}
		else{
			view._collectflag.visible = false;
			view._lqBtn.setEnable(false);
		}
		view._lqBtn.visible = !view._collectflag.visible;
		//小红点
		if(prevData){
			view._redPot1.visible = view.vo.isCanLqAwardJindu(view._curJindu - 1);
		}
		else{
			view._redPot1.visible = false;
		}
		if(nextData){
			view._redPot2.visible = view.vo.isCanLqAwardJindu(view._curJindu + 1,true);
		}
		else{
			view._redPot2.visible = false;
		}
		
		if(this.getTypeCode()=="2"||this.getTypeCode()=="5")
		{
			 view._nextAwardRiceTxt.visible=false; 
			 view._prevAwardRiceTxt.visible =false;
		}
	}

	private prevClick():void{
		let view = this;
		view._curJindu = Math.max(0 , view._curJindu - 1);
		view._newIndex  = Math.max(0 , view._newIndex - 1);
		view.fresh_jindu(view._curJindu);
	}

	private lqJinduAward(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        view.fresh_rewward(view._curJindu);
        let rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = new egret.Point(view.width/2, GameConfig.stageHeigth - 200);
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
	}

	private nextClick():void{
		let view = this;
		if(view._curJindu == 0){
			view._curJindu = 1;
		}
		view._newIndex  = Math.min(view.vo.getArr('teamReward').length - 1 +1, view._newIndex + 1);
		view._curJindu = Math.min(view.vo.getArr('teamReward').length +1, view._curJindu + 1);
		view.fresh_jindu(view._curJindu);
	}

	private lqClick():void{
		let view = this;
		if(GameData.serverTime < view.vo.et){
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBJINDU, {
				activeId : view.acTivityId,
				rechargeId : view._curJindu
			});
		}
		else{
			App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
		}
	}

	private rankClick():void
	{
        // this._acVo.et = GameData.serverTime + 10;
		let view = this;
		if(view.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.DRAGONBOATRANKVIEW,{
			aid : view.aid,
			code : view.code
		});
    }

	public getdragonInfo(evt : egret.Event) : void{
		let view = this;
		
		let data = evt.data;
		// Api.acVoApi.formatData(data.data.data.activity, data.data.cmd == NetRequestConst.REQUEST_USER_LOGIIN);
		// view.vo.setRiceNumber(data.data.data.riceNumber);
		//view.fresh_jindu();
		// if(view.isShowLoad){
		// 	view.isShowLoad = false;
		// 	NetLoading.hide();
		// }
	}

	private isShowLoad = false;
	public refreshWhenSwitchBack():void{
		let view = this;
		// this.request(NetRequestConst.REQUEST_ACTIVITY_DRAGONINFO, {
		// 	activeId : view.acTivityId
		// });
	} 

	private update() :void{
		let view = this;
		if(!this.vo){
			return;
		}
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		let view = this;
		let index: number = Number(event.data);
		let arr = view.vo.gerCurRiceAward(view._curJindu);
		let item : ItemInfoVo = arr[index]; 
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item.id);
	}

	private showLihua():void{
		let view = this;
		//dblamp1

		if(this.getTypeCode()=="1")
		{
			let dblamp1 = ComponentManager.getCustomMovieClip("dblamp",2,800);
			dblamp1.width = 57;
			dblamp1.height = 181;
			view.setLayoutPosition(LayoutConst.lefttop, dblamp1, view._boatGroup, [15,view._rankBtn.y+view._rankBtn.height+15], true);
			view._boatGroup.addChild(dblamp1);
			

			let dblamp2 = ComponentManager.getCustomMovieClip("dblamp",2,800);
			dblamp2.width = 57;
			dblamp2.height = 181;
			view.setLayoutPosition(LayoutConst.righttop, dblamp2, view._boatGroup, [15,view._rankBtn.y+view._rankBtn.height+15], true);
			view._boatGroup.addChild(dblamp2);

			let dblamp3 = ComponentManager.getCustomMovieClip("dblamp",2,800);
			dblamp3.width = 57;
			dblamp3.height = 181;
			dblamp3.setScale(0.7);
			view.setLayoutPosition(LayoutConst.lefttop, dblamp3, dblamp1, [15+dblamp1.width,0-40]);
			view._boatGroup.addChild(dblamp3);

			let dblamp4 = ComponentManager.getCustomMovieClip("dblamp",2,800);
			dblamp4.width = 57;
			dblamp4.height = 181;
			dblamp4.setScale(0.7);
			view.setLayoutPosition(LayoutConst.righttop, dblamp4, dblamp2, [15+dblamp2.width,0-40]);
			view._boatGroup.addChild(dblamp4);

			dblamp1.playWithTime(-1);
			dblamp2.playWithTime(-1);
			dblamp3.playWithTime(-1);
			dblamp4.playWithTime(-1);
		} 
		let deviationNum  = 0;
		if(this.getTypeCode()=="2"||this.getTypeCode()=="5")
		{
			deviationNum=200;
		}
	
		let param = {
			1 : {color : 'hong', pos : [500,40+deviationNum], scale : 0.9, wait : 0},
			2 : {color : 'huang', pos : [80,10+deviationNum], scale : 1.85, wait : 200},
			3 : {color : 'huang', pos : [300,0+deviationNum], scale : 1.5, wait : 400},
			4 : {color : 'lan', pos : [200,-50+deviationNum], scale : 2, wait : 650},
			5 : {color : 'hong', pos : [40,60+deviationNum], scale : 1, wait : 900}
		}
		let ths=this;	
		for(let i in param){
			if(view._boatGroup && !view._boatGroup.getChildByName(`lihua${i}`)){
				let unit = param[i];
				let lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${unit.color}000`, 10, 115);
				lihuaclip.setScale(unit.scale);
				lihuaclip.name = `lihua${i}`;

				lihuaclip.x = unit.pos[0];
				lihuaclip.y = unit.pos[1];
  
 
				view._boatGroup.addChild(lihuaclip);
				egret.Tween.get(lihuaclip).wait(unit.wait).call(()=>{
 
					egret.Tween.removeTweens(lihuaclip);
					if(view._boatGroup){
						view._boatGroup.addChild(lihuaclip);
						lihuaclip.playWithTime(-1);
					}
				},view);
			}
		}
	}

	private fresh_view(){
		let view = this;
		view.fresh_jindu(view._curJindu);
		if(view.getTypeCode() == `8`){
			view.makeLamp();
		}
		
	}

	private makeLamp():void{
		let view = this;
		let jindu = view.vo.getCurPeriod();
		let len = Object.keys(view.cfg.teamReward).length;
		let lampnum = Math.min(6, Math.ceil(jindu / 3) * 2);
		let obj = {
			1:54,
			2:99,
			3:81,
			4:91,
			5:102,
			6:101
		};
		let total = 0;
		for(let i = 1; i <= lampnum; ++ i){
			total += obj[i];
		}
		let tmpx = (612 - total - (lampnum - 1) * 15) / 2;
		for(let i = 1; i <= lampnum; ++ i){
			let lamp = view._boatGroup.getChildByName(`lamp${i}`);
			let clip  = <CustomMovieClip>view._boatGroup.getChildByName(`clip${i}`);
			if(lamp){
				
			}
			else{
				lamp = BaseBitmap.create(`dragonboatlamp${i}`);
				lamp.name = `lamp${i}`;
				let startY = view._dbboatbg.y + (i & 1 ? 270 : 210);
				lamp.y = startY;
				view._boatGroup.addChild(lamp);
				let tmpY = startY + (i & 1 ? 5 : -5);
				egret.Tween.get(lamp, {loop : true}).to({y : tmpY}, 800).to({y : startY}, 800);

				clip = ComponentManager.getCustomMovieClip('acdragonboatviewlight',12);
				clip.blendMode = egret.BlendMode.ADD;
				clip.width = 160;
				clip.height = 210;
				clip.name = `clip${i}`;
				view._boatGroup.addChild(clip); 
				clip.playWithTime(-1);
			}
			lamp.x = tmpx;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, lamp, [0,-30]);
			tmpx += (lamp.width + 15);
		}
	}
	
	public dispose():void
	{	
		let view = this;
		if(this.getTypeCode()=="1")
		{
			egret.Tween.removeTweens(view._dbboatbg);
			egret.Tween.removeTweens(view._dbboatbg2);
			view._boatclip.stop();
			view._boatclip.dispose();
		}
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM, view.fresh_view, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBJINDU), view.lqJinduAward, view);
		view._zziTxt = null;
		view._curMeterTxt = null;
		view._numbg = null;
		view._progressBar = null;
		view._curRiceTxt = null;
		view._nextRiceTxt = null;
		view._prevAwardRiceTxt = null;
		view._nextAwardRiceTxt = null;
		view._curAwardRiceTxt = null;
		view._scrollList.removeTouchTap();
		view._scrollList = null; 
		view._dbnumricecurbg = null;
		view._dbnumricenextbg = null;
		view._awardbg = null;
		view._prevBtn = null;
		view._nextBtn = null;
		view._lqBtn = null;
		view._collectflag = null;
		view._redPot1 = null;
		view._redPot2 = null; 
		
		view._boatclip = null;
		view._dbboatbg = null;
		view._dbboatbg2 = null;
		view._boatGroup.dispose();
		view._boatGroup = null;
		view._activityDescText = view._activityTimerText = null;
		this._steps = null;
		this._steps2 = null;
		this._teamClip = null;
		this._ribbonaClip = null;
		this._ribbonbClip = null;
		this._terminusbg = null;
		this._newIndex = 0;
		view._curJindu = 1;
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);
		super.dispose();
	}
}