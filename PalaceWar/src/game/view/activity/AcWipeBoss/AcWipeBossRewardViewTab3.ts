//
class AcWipeBossRewardViewTab3 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;

	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected getListType():number
	{
		return 3;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;
		view._nodeContainer = new BaseDisplayObjectContainer();
		// this.addChild(this._nodeContainer);
		let str = '';

		let rankList = view.vo.getArr('foe');
		rankList.reverse();
		let tmpX = 20;
		let scroStartY = 3;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key =  rItem.id;

			let winBottomBg = BaseBitmap.create("public_9_bg23");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create("atkracecross_rewatdbg3");
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);

			let line1 =  BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1);
			
			let rIcons1 = rItem.reward1Icons;
			let rank = rItem.rank
			let txt = ComponentManager.getTextField(rItem.type == 1 ? rItem.npcName : `acwipeBossKillBox${key - 7}`,24,TextFieldConst.COLOR_LIGHT_YELLOW);
			txt.x =  GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			this._nodeContainer.addChild(txt);

			let alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillBasicReward'),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			alltxt.x = 20;
			alltxt.y = winbg.y + winbg.height + 10;
			view._nodeContainer.addChild(alltxt);
			
			let len = rIcons1.length;
			let startY = alltxt.y + alltxt.textHeight + 10;
			tmpX = 20;
			scroStartY = startY;

			let scoreBg = BaseBitmap.create('itembg_7');
			// npcBg.setScale(106/194);
			scoreBg.width = 106;
			scoreBg.height = 106;
			scoreBg.x = tmpX;
			scoreBg.y = scroStartY;
			view._nodeContainer.addChild(scoreBg);

			let scoreImg = BaseBitmap.create("wipescore2icon");
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg, scoreBg);
			view._nodeContainer.addChild(scoreImg);

			let numbg2:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
			let scoretxt = ComponentManager.getTextField(rItem.killScore,16,TextFieldConst.COLOR_QUALITY_WHITE);

			numbg2.name = `numbg`;
			if(rItem.killScore > 99){
				numbg2.width = scoretxt.width + 18;
			}
		
			numbg2.setPosition(scoreBg.x + scoreBg.width-numbg2.width-4,scoreBg.y + scoreBg.height-numbg2.height-4);
			view._nodeContainer.addChild(numbg2);

			let temScale = 1/0.74;
			let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
			effectClip.x = scoreImg.x + 50 - 198*temScale/2;
			effectClip.y = scoreImg.y + 52 - 197*temScale/2;
			view._nodeContainer.addChild(effectClip);
			effectClip.scaleX = effectClip.scaleY = temScale;
			effectClip.playWithTime(-1);

			
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt, scoreBg);
			view._nodeContainer.addChild(scoretxt);
			scoretxt.setPosition(scoreImg.x + scoreImg.width-scoretxt.width-12, numbg2.y+numbg2.height/2-scoretxt.height/2 );

			let scoreBg2 = BaseBitmap.create('itembg_7');
			// npcBg.setScale(106/194);
			scoreBg2.width = 106;
			scoreBg2.height = 106;
			scoreBg2.x = scoreBg.x + scoreBg.width + 15;
			scoreBg2.y = scroStartY;
			view._nodeContainer.addChild(scoreBg2);

			let scoreImg2 = BaseBitmap.create("wipescore1icon");
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg2, scoreBg2);
			view._nodeContainer.addChild(scoreImg2);

			let numbg:BaseBitmap = BaseBitmap.create("public_9_itemnumbg");
			numbg.name = `numbg`;
			numbg.width = 55;
			numbg.setPosition(scoreBg2.x + scoreBg2.width-numbg.width-4,scoreBg2.y + scoreBg2.height-numbg.height-4);
			view._nodeContainer.addChild(numbg);


			let effectClip2 = ComponentManager.getCustomMovieClip("itemeffect",10,100);
			effectClip2.x = scoreImg2.x + 50 - 198*temScale/2;
			effectClip2.y = scoreImg2.y + 52 - 197*temScale/2;
			view._nodeContainer.addChild(effectClip2);
			effectClip2.scaleX = effectClip2.scaleY = temScale;
			effectClip2.playWithTime(-1);


			let scoretxt2 = ComponentManager.getTextField(rItem.killScore,16,TextFieldConst.COLOR_QUALITY_WHITE);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt2, scoreBg2);
			view._nodeContainer.addChild(scoretxt2);
			scoretxt2.setPosition(scoreImg2.x + scoreImg2.width-scoretxt2.width-12, numbg.y+numbg.height/2-scoretxt2.height/2 );

			let ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillPoolReward'),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			ordtxt.x = 20;
			ordtxt.y = scroStartY + scoreImg.height + 13;
			view._nodeContainer.addChild(ordtxt);

			let rIcons2 = rItem.reward2Icons;
			let len2 = rIcons2.length;
			scroStartY = ordtxt.y + ordtxt.textHeight + 10;
			tmpX = 20;
			for(let innerIdx = 0; innerIdx < len2; innerIdx++) {
				let element = rIcons2[innerIdx];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = 20;
					scroStartY += (element.height + 15);
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+15);
				}
				this._nodeContainer.addChild(element);
			}
			scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y - 10;
		}

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 150);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = -3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);
	}


	private getCountTimeStr(time:number):string
	{	
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public dispose():void
	{
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		this._nodeContainer = null;
		super.dispose();
	}

}