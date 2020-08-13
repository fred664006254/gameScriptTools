//
class AcTombRewardViewTab1 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _countDownText:BaseTextField = null;
	
	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.TombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcTombVo{
        return <AcTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
	
	private getUicode():string{
		let baseview : any = ViewController.getInstance().getView('AcTombView');
		return baseview.getUiCode();
	}

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_AWARD),this.collectHandlerCallBack,this);
		let view = this;
		let code = view.getUicode();
		view._nodeContainer = new BaseDisplayObjectContainer();
		// this.addChild(this._nodeContainer);
		let str = '';

		let rankList = view.vo.getArr('indivdualRank');
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

			let winbg = BaseBitmap.create(`tombrewardrankbg-${code}`);
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			this._nodeContainer.addChild(winbg);

			let line1 = BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			this._nodeContainer.addChild(line1);
			
			let rewardStr = rItem.getReward;
			let rIcons = rItem.rewardIcons;
			let rank = rItem.idvRank;
			let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
			if (Number(key) < 4)
			{
				txt.text = LanguageManager.getlocal("acRank_rank6",[key]);
			}else
			{
				if(rank[0] < rank[1]){
					txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
				}
				else{
					txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
				}
			}
			txt.x = GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			this._nodeContainer.addChild(txt);
			
			let len = rIcons.length;
			let startY = winbg.y + winbg.height+ 10;
			tmpX = 20;
			scroStartY = startY;
			for (let innerIdx = 0; innerIdx < len; innerIdx++) {
				var element = rIcons[innerIdx];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = 20;
					scroStartY += element.height + 15;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+ 15);
				}
				element.cacheAsBitmap = true;
				this._nodeContainer.addChild(element);
			}
			scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y - 10;
			this._nodeContainer.height = winBottomBg.y + winBottomBg.height;
		}
		
		 // 膜拜背景
        let bottomBg = BaseBitmap.create("wifeview_bottombg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 150;
		view.addChild(bottomBg);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab1', view.rankCLick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
		view.addChild(rankBtn);
		
		let txt3 = ComponentManager.getTextField("",20);
		let rankstr = '';
		let rankV = view.vo.getMyPrank();
		if(rankV == 0){
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else{
			rankstr = rankV.toString();
		}
		let color = String(0x21eb39);
		if(!view.vo.getAttendQUality()){
			rankstr = LanguageManager.getlocal('crossImacyNoAccess');
			color = String(0xff3c3c);
		}
		txt3.text = LanguageManager.getlocal(`tombrank1-${code}`, [color,rankstr]);
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + 25;
		this.addChild(txt3);

		TickManager.addTick(this.tick,this);
		let vo = this.vo;
		this._countDownText = ComponentManager.getTextField("",20);
		this.tick();
		this._countDownText.x =  txt3.x;
		this._countDownText.y = txt3.y + 35;		
		this.addChild(this._countDownText);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-5);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = -3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);
	}

	public tick():void{	
		if (this._countDownText)
		{
			let countDownTime = this.vo.getCountDownTime();
			if(countDownTime > 0) {
				this._countDownText.text = LanguageManager.getlocal(`acFourPeople_acCD`, [App.DateUtil.getFormatBySecond(countDownTime)]);
			}
			else{
				this._countDownText.text = LanguageManager.getlocal("acPunishEnd");
			}
		}
	}

	private rankCLick():void{
		let view = this;
		if(view.vo.isEnd){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ACTOMBRANKIEW,{
			aid : view.param.data.aid,
			code : view.param.data.code,
		});
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
		this._countDownText = null;
		TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}