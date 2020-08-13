class AtkracecrossActivityRewardViewTab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	private _collectBtn:BaseButton;
	private _collectFlag:BaseBitmap;

	public constructor() 
	{
		super();
		this.initView();
	}

	protected getListType():number
	{
		return 2;
	}
	protected initView():void
	{
		this._nodeContainer = new BaseDisplayObjectContainer();
		
		let acode:number =  Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace").code;
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode("crossServerAtkRace",acode);
		let zrankinfo = Api.atkracecrossVoApi.zonerankinfos;
		let rankList = zrankinfo.length == 2 ? cfg.getServerRankRewards() : cfg.getMulServerPRankRewards();
		//let rankList = cfg.getServerRankRewards();
		let rList = Object.keys(rankList);
		rList.sort( (a:string,b:string) => {
				return Number(a) - Number(b);
			}
		);

		let tmpX = 20;
        let scroStartY = 3;

		for (var index = 0; index < rList.length; index++) {
			
			let id = index;
			let key = rList[index];
            let rItem = rankList[key];

			let winBottomBg = BaseBitmap.create("public_9_bg23");
			winBottomBg.width = 628;
			winBottomBg.y =scroStartY;
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
			
			let rewardStr = rItem.reward;
			let rank = rItem.rank

			let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
			
            if (Number(key) < 4)
            {
                txt.text =LanguageManager.getlocal("acRank_rank"+key);
            }else
            {
                txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
            }
			txt.x =  GameConfig.stageWidth/2 - txt.width/2;
            txt.y = winbg.y + winbg.height/2 - txt.height/2;
            this._nodeContainer.addChild(txt);
                       
            let rIcons = GameData.getRewardItemIcons(rewardStr,true,true);
            let len = rIcons.length;
			let startY = winbg.y +winbg.height+ 5;
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
					tmpX +=  (element.width+8);
				}
				this._nodeContainer.addChild(element);
             }
			 scroStartY += 130;
			 winBottomBg.height = scroStartY -winBottomBg.y;
			 scroStartY += 10;
        }
		scroStartY += 10;

		let crossVo:AcCrossServerAtkRaceVo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");

		let bottomRes = crossVo.checkIsFengyun() ? "arena_bottom" : "wifeview_bottombg";
		 // 膜拜背景
        let bottomBg = BaseBitmap.create(bottomRes);
        // bottomBg.width = 628
        // bottomBg.height = 120;
        // bottomBg.x = 6;
        bottomBg.y = GameConfig.stageHeigth -bottomBg.height-150;
		this.addChild(bottomBg);

		
		let txt3 = ComponentManager.getTextField("",20);
		if(AtkracecrossActivityRewardView._merank )
		{
			txt3.text = LanguageManager.getlocal("acRank_myrank1",[String(AtkracecrossActivityRewardView._merank)]);
		}else{
			txt3.text = LanguageManager.getlocal("acRank_myrank1",[LanguageManager.getlocal("atkracedes4")]);
		}
		txt3.x =  bottomBg.x + 30;
		txt3.y = bottomBg.y + bottomBg.height/2 - txt3.height/2
		this.addChild(txt3);

		let txt4 = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTxt5"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt4.x =  bottomBg.x + bottomBg.width - txt4.width - 30;
		txt4.y = txt3.y;
		this.addChild(txt4);


		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg.y-10);
		let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
		scrollView.y = 3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChild(scrollView);

	}

	public dispose():void
	{
		this._nodeContainer = null;
		this._collectBtn = null;
		this._collectFlag = null;

		super.dispose();
	}

}