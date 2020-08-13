//
class AcLocTombRewardViewTab3 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;

	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

	protected getListType():number
	{
		return 3;
	}

	protected initView():void
	{
		let view = this;
		view._nodeContainer = new BaseDisplayObjectContainer();
		let str = '';

		let rankList : Config.AcCfg.LocTombFoeItemCfg[] = view.vo.getArr('foe');
		rankList.sort((a,b)=>{
			if(a.type == b.type){
				return b.id - a.id;
			}
			else{
				return a.type - b.type;	
			}
		});
		let tmpX = 20;
		let scroStartY = 3;

		for(let index = 0; index < rankList.length; index++){
			let id = index;
			let rItem = rankList[index];
			let key =  rItem.id;

			let winBottomBg = BaseBitmap.create("public_9_bg23");
			winBottomBg.width = 628;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 6;
			this._nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create(`tombrewardrankbg-${view.code}`);
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);

			let line1 =  BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1);
			
			let rIcons1 = rItem.reward1Icons;
			let txt = ComponentManager.getTextField(rItem.getnpcName(view.code),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			txt.x =  GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			this._nodeContainer.addChild(txt);

			if(rItem.type == 1){
				let descbg = BaseBitmap.create('aobaidescnamebg');
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0,winbg.height + 10]);
				view._nodeContainer.addChild(descbg);

				let alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillBasicReward'),24,TextFieldConst.COLOR_LIGHT_YELLOW);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alltxt, descbg);
				view._nodeContainer.addChild(alltxt);
				
				let len = rIcons1.length;
				let startY = alltxt.y + alltxt.textHeight + 20;
				tmpX = 20;
				scroStartY = startY;

				let scoreBg = BaseBitmap.create('itembg_1');
				// npcBg.setScale(106/194);
				scoreBg.width = 106;
				scoreBg.height = 106;
				scoreBg.x = tmpX;
				scoreBg.y = scroStartY;
				view._nodeContainer.addChild(scoreBg);

				let scoreImg = BaseBitmap.create("wipescore2icon");
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg, scoreBg);
				view._nodeContainer.addChild(scoreImg);

				let temScale = 1/0.74;
				let effectClip = ComponentManager.getCustomMovieClip("itemeffect",10,100);
				effectClip.x = scoreImg.x + 50 - 198*temScale/2;
				effectClip.y = scoreImg.y + 52 - 197*temScale/2;
				view._nodeContainer.addChild(effectClip);
				effectClip.scaleX = effectClip.scaleY = temScale;
				effectClip.playWithTime(-1);

				let scoretxt = ComponentManager.getTextField(rItem.killScore.toString(),24,TextFieldConst.COLOR_QUALITY_WHITE);
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt, scoreBg);
				view._nodeContainer.addChild(scoretxt);

				let scoreBg2 = BaseBitmap.create('itembg_1');
				// npcBg.setScale(106/194);
				scoreBg2.width = 106;
				scoreBg2.height = 106;
				scoreBg2.x = scoreBg.x + scoreBg.width + 15;
				scoreBg2.y = scroStartY;
				view._nodeContainer.addChild(scoreBg2);

				let scoreImg2 = BaseBitmap.create("wipescore1icon");
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreImg2, scoreBg2);
				view._nodeContainer.addChild(scoreImg2);

				let effectClip2 = ComponentManager.getCustomMovieClip("itemeffect",10,100);
				effectClip2.x = scoreImg2.x + 50 - 198*temScale/2;
				effectClip2.y = scoreImg2.y + 52 - 197*temScale/2;
				view._nodeContainer.addChild(effectClip2);
				effectClip2.scaleX = effectClip2.scaleY = temScale;
				effectClip2.playWithTime(-1);

				let scoretxt2 = ComponentManager.getTextField(rItem.killScore.toString(),24,TextFieldConst.COLOR_QUALITY_WHITE);
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoretxt2, scoreBg2);
				view._nodeContainer.addChild(scoretxt2);	
			}

			let descbg2 = BaseBitmap.create('aobaidescnamebg');
			descbg2.y = scroStartY + (rItem.type == 1 ? 123 : 75);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, descbg2, winbg);
			view._nodeContainer.addChild(descbg2);
			
			let ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossKillPoolReward'),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordtxt, descbg2);
			view._nodeContainer.addChild(ordtxt);

			let rIcons2 = rItem.reward2Icons;
			let len2 = rIcons2.length;
			scroStartY = ordtxt.y + ordtxt.textHeight + 20;
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
			this._nodeContainer.height = winBottomBg.y + winBottomBg.height;
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
		this._nodeContainer = null;
		super.dispose();
	}

}