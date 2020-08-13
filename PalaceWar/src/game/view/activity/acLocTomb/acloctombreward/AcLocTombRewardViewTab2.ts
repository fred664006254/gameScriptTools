//
class AcLocTombRewardViewTab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _countDownText:BaseTextField = null;
	
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
		return 2;
	}

	protected initView():void
	{
		let view = this;
		view._nodeContainer = new BaseDisplayObjectContainer();
		let str = '';

		let rankList = view.vo.getArr('allianceRank');
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
			let rank = rItem.alnRank;
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
			txt.x =  GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			this._nodeContainer.addChild(txt);


			let descbg = BaseBitmap.create('aobaidescnamebg');
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, winbg, [0,winbg.height + 10]);
			view._nodeContainer.addChild(descbg);

			let alltxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_masterget1'),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, alltxt, descbg);
			view._nodeContainer.addChild(alltxt);
			
			let len = rIcons1.length;
			let startY = descbg.y + descbg.height + 15;
			tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			scroStartY = startY;
			for(let innerIdx = 0; innerIdx < len; innerIdx++) {
				let element = rIcons1[innerIdx];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
					scroStartY += element.height + 15;
					element.x = tmpX;
					element.y = scroStartY;
					tmpX +=  (element.width+15);
				}
				view._nodeContainer.addChild(element);
			}

			let orddescbg = BaseBitmap.create('aobaidescnamebg');
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, orddescbg, winbg, [0,winbg.height + 10]);
			view._nodeContainer.addChild(orddescbg);
			orddescbg.y = scroStartY + 106 + 15;

			let ordtxt = ComponentManager.getTextField(LanguageManager.getlocal('acRank_alliance_memberget'),24,TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordtxt, orddescbg);
			view._nodeContainer.addChild(ordtxt);

			let rIcons2 = rItem.reward2Icons;
			let len2 = rIcons2.length;
			scroStartY = orddescbg.y + orddescbg.height + 15;
			tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
			for(let innerIdx = 0; innerIdx < len2; innerIdx++) {
				let element = rIcons2[innerIdx];
				element.x = tmpX;
				element.y = scroStartY;
				tmpX +=  (element.width+15);
				if (tmpX >= GameConfig.stageWidth)
				{
					tmpX = (winBottomBg.width - len * 106 - (len - 1) * 15)/2;
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
		
		 // 膜拜背景
        let bottomBg = BaseBitmap.create("wifeview_bottombg");
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 150;
		view.addChild(bottomBg);

		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'acPunishRankTab2', view.rankCLick, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35,0]);
		view.addChild(rankBtn);
		let rankstr = '';
		let rankV = view.vo.getMyAllPrank();
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
		let txt3 = ComponentManager.getTextField("",20);
		txt3.text = LanguageManager.getlocal(`loctombrank2-${view.code}`, [color,rankstr]);
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
		ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBRANKIEW,{
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
		this._nodeContainer = null;
		this._countDownText = null;
		TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}