//
class AcCrossServerWipeBossRewardViewTab3 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;

	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
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
		let scroStartY = 8;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem = rankList[index];
			let key =  rItem.id;

			let winBottomBg = BaseBitmap.create("rechargevie_db_01");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create("public_ts_bg01");
			winbg.width = 250;
			winbg.y = scroStartY + 13;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);

			// let line1 =  BaseBitmap.create("public_line3");
			// line1.width = 480;
			// line1.x = GameConfig.stageWidth/2 - line1.width/2;
			// line1.y = winbg.y + winbg.height/2 - line1.height/2;
			// this._nodeContainer.addChild(line1);
			
			let rIcons1 = rItem.reward1Icons;
			let rank = rItem.rank
			let txt = ComponentManager.getTextField(rItem.type == 1 ? rItem.npcName : `accrossserverwipeBossKillBox${key - 7}`,22,TextFieldConst.COLOR_BROWN);
			txt.x =  GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			this._nodeContainer.addChild(txt);

			let alltxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossKillBasicReward'),22,TextFieldConst.COLOR_BROWN);
			alltxt.x = GameConfig.stageWidth/2 - alltxt.width/2;
			alltxt.y = winbg.y + winbg.height + 15;
			view._nodeContainer.addChild(alltxt);

			let line11 = BaseBitmap.create("public_v_huawen02");
			line11.x = alltxt.x + alltxt.width + 15;
			line11.y = alltxt.y + alltxt.height/2 - line11.height/2;
			this._nodeContainer.addChild(line11);

			let line12 = BaseBitmap.create("public_v_huawen02");
			line12.scaleX = -1;
			line12.x = alltxt.x - 10;
			line12.y = alltxt.y + alltxt.height/2 - line12.height/2;
			this._nodeContainer.addChild(line12);

			
			let len = rIcons1.length;
			let startY = alltxt.y + alltxt.textHeight + 10;
			tmpX = 20;
			scroStartY = startY;

			let scoreBg = BaseBitmap.create('itembg_1');
			// npcBg.setScale(106/194);
			scoreBg.width = 106;
			scoreBg.height = 106;
			scoreBg.x = tmpX;
			scoreBg.y = scroStartY;
			view._nodeContainer.addChild(scoreBg);

			let scoreImg = BaseBitmap.create("accrossserverwipeboss_scoreicon2");
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg, scoreBg);
			view._nodeContainer.addChild(scoreImg);

			let temScale = 1/0.8;
			let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
			// effectClip.x = scoreImg.x + 50 - 198*temScale/2;
			// effectClip.y = scoreImg.y + 52 - 197*temScale/2;
			effectClip.x = scoreBg.x + scoreBg.width / 2 - 125 * temScale /2;
			effectClip.y = scoreBg.y + scoreBg.height / 2 - 125 * temScale /2;
			view._nodeContainer.addChild(effectClip);
			effectClip.scaleX = effectClip.scaleY = temScale;
			effectClip.playWithTime(-1);

			let scoretxt = ComponentManager.getTextField(rItem.killScore,22,TextFieldConst.COLOR_QUALITY_WHITE);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt, scoreBg);
			view._nodeContainer.addChild(scoretxt);

			let scoreBg2 = BaseBitmap.create('itembg_1');
			// npcBg.setScale(106/194);
			scoreBg2.width = 106;
			scoreBg2.height = 106;
			scoreBg2.x = scoreBg.x + scoreBg.width + 15;
			scoreBg2.y = scroStartY;
			view._nodeContainer.addChild(scoreBg2);

			let scoreImg2 = BaseBitmap.create("accrossserverwipeboss_scoreicon1");
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg2, scoreBg2);
			view._nodeContainer.addChild(scoreImg2);

			let effectClip2 = ComponentManager.getCustomMovieClip("itemeffect",10,100);
			effectClip2.scaleX = effectClip2.scaleY = temScale;
			effectClip2.playWithTime(-1);

			effectClip2.x = scoreBg2.x + scoreBg2.width / 2 - 125 * temScale /2;//scoreImg2.x + 50 - 198*temScale/2;
			effectClip2.y = scoreBg2.y + scoreBg2.height / 2 - 125 * temScale /2;//scoreImg2.y + 52 - 197*temScale/2;
			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, effectClip2, scoreBg2);
			view._nodeContainer.addChild(effectClip2);



			let scoretxt2 = ComponentManager.getTextField(rItem.killScore,22,TextFieldConst.COLOR_QUALITY_WHITE);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt2, scoreBg2);
			view._nodeContainer.addChild(scoretxt2);

			let ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossKillPoolReward'),22,TextFieldConst.COLOR_BROWN);
			ordtxt.x = GameConfig.stageWidth/2 - ordtxt.width/2;
			ordtxt.y = scroStartY + scoreBg.height + 13;
			view._nodeContainer.addChild(ordtxt);


			let line21 = BaseBitmap.create("public_v_huawen02");
			line21.x = ordtxt.x + ordtxt.width + 15;
			line21.y = ordtxt.y + ordtxt.height/2 - line21.height/2;
			this._nodeContainer.addChild(line21);

			let line22 = BaseBitmap.create("public_v_huawen02");
			line22.scaleX = -1;
			line22.x = ordtxt.x - 15;
			line22.y = ordtxt.y + ordtxt.height/2 - line22.height/2;
			this._nodeContainer.addChild(line22);


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
			winBottomBg.height = scroStartY - winBottomBg.y - 2;
		}

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 150 - 18);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = -3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);


		let bottomBgFrame = BaseBitmap.create("public_9v_bg03");
		bottomBgFrame.width = 640;
		bottomBgFrame.height = GameConfig.stageHeigth - 69 - 83;
		bottomBgFrame.x = 0;
		bottomBgFrame.y = 0;
		this.addChild(bottomBgFrame); 

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