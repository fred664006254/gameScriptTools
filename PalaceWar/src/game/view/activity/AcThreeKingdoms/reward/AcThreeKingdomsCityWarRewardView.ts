class AcThreeKingdomsCityWarRewardView extends CommonView{
    public constructor(){
		super();
    }
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `tombrewardrankbg-1`,`arena_bottom`
		]);
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getTitleBgName():string{
		return App.CommonUtil.getResByCode(`threekingdomsrankviewtitle`, this.getUiCode());
    }

    protected getTitleStr() : string{
        return null;
    }

    protected getBgName():string{
        return `public_9_bg92`;
    }

    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
            requestData:{
                activeId : this.acTivityId,
                round : this.vo.getCurWeek()
            }
        };
    }
    
	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.ret){
            let rdata = data.data.data;
            this.vo.prankroundarr = rdata;
        }
    }

    
    public initView():void{
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let nodeContainer = new BaseDisplayObjectContainer();
		nodeContainer.width = view.width;
		let str = '';

		let rankList = view.cfg.cityRankReward;
		let tmpX = 20;
		let scroStartY = 3;

		for (let index = 0; index < rankList.length; index++) {
			let id = index;
			let rItem : Config.AcCfg.ThreeKingdomsCityRankRewardCfg = rankList[index];
			let key = index + 1;

			let winBottomBg = BaseBitmap.create("public_alphabg");
			winBottomBg.width = view.width;
			winBottomBg.y = scroStartY;
			winBottomBg.x = 0;
			nodeContainer.addChild(winBottomBg);

			let winbg = BaseBitmap.create(`tombrewardrankbg-1`);
			winbg.y = scroStartY;
			winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
			nodeContainer.addChild(winbg);

			let line1 = BaseBitmap.create("public_line3");
			line1.width = 480;
			line1.x = GameConfig.stageWidth/2 - line1.width/2;
			line1.y = winbg.y + winbg.height/2 - line1.height/2;
			nodeContainer.addChild(line1);
			
			let rewardStr =  `1046_1_${rItem.specialReward2}|${rItem.getReward}`;
			let rIcons = GameData.getRewardItemIcons(rewardStr, true);
			let rank = rItem.rank;
			let txt = ComponentManager.getTextField("",24,TextFieldConst.COLOR_LIGHT_YELLOW);
            if(rank[0] < rank[1]){
                txt.text = txt.text =LanguageManager.getlocal("acRank_rank4",[String(rank[0]),String(rank[1]) ] );
            }
            else{
                txt.text =LanguageManager.getlocal("acRank_rank6", [rank[0].toString()]);
            }
			txt.x = GameConfig.stageWidth/2 - txt.width/2;
			txt.y = winbg.y + winbg.height/2 - txt.height/2;
			nodeContainer.addChild(txt);
			
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
				nodeContainer.addChild(element);
			}
			scroStartY += 130;
			winBottomBg.height = scroStartY - winBottomBg.y - 10;
			nodeContainer.height = winBottomBg.y + winBottomBg.height + 10;
		}
		
		// 膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,0], true);
        view.addChild(bottomBg);
        //本轮个人攻城分数
        let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip9-${code}`, [App.StringUtil.changeIntToText(view.param.data.mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25,35]);
		view.addChild(myKingdomTxt);
		//本轮个人攻城分数排名
		let color = String(0x21eb39);
		let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip5-${code}`, [view.param.data.rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0,myKingdomTxt.textHeight+20]);
		view.addChild(txt3);

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - bottomBg.height - this.getContainerY()-10);
		let scrollView = ComponentManager.getScrollView(nodeContainer,rect);
		scrollView.y = -3;
		scrollView.horizontalScrollPolicy = "off";
		this.addChildToContainer(scrollView);
    }

    protected getContainerY():number{
        return 85;
    }

    public dispose():void{
        let view = this;
        super.dispose();
    }
}