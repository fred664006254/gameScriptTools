class AcTreasureHuntGetRewardView  extends BaseView
{
    public constructor() {
		super();
    }
    
	private get cfg() : Config.AcCfg.TreasureHuntCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcTreasureHuntVo{
        return <AcTreasureHuntVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    protected initView():void
	{
        let aid = this.param.data.aid;
        let code = this.param.data.code;
        let tailorCfg = this.cfg;
        let reward = this.param.data.rewards; 
        let extra = this.param.data.extra; 

        let tailor_get_light =  BaseBitmap.create("tailor_get_light");
        tailor_get_light.anchorOffsetX =  tailor_get_light.width/2;
        tailor_get_light.anchorOffsetY =  tailor_get_light.height/2;
        tailor_get_light.x = GameConfig.stageWidth/2;
        tailor_get_light.y = 120 + tailor_get_light.height / 2;
        egret.Tween.get(tailor_get_light,{loop:true}).to({rotation:360},5000);
        this.addChild(tailor_get_light)

        let tailor_get_light2 =  BaseBitmap.create("tailor_get_light");
        tailor_get_light2.anchorOffsetX =  tailor_get_light2.width/2;
        tailor_get_light2.anchorOffsetY =  tailor_get_light2.height/2;
        tailor_get_light2.x = tailor_get_light.x;
        tailor_get_light2.y = tailor_get_light.y;
        egret.Tween.get(tailor_get_light2,{loop:true}).to({rotation:-360},5000);
        this.addChild(tailor_get_light2)

        let tailor_get_word = BaseBitmap.create("tailor_get_word");
        tailor_get_word.anchorOffsetX =  tailor_get_word.width/2;
        tailor_get_word.anchorOffsetY =  tailor_get_word.height/2;
        tailor_get_word.x = GameConfig.stageWidth/2;
        tailor_get_word.y = 300;
        tailor_get_word.setScale(0);
        egret.Tween.get(tailor_get_word,{loop:false}).wait(100).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
        this.addChild(tailor_get_word);

        //"6_1150_4|6_1710_1";
        let rewardTab = reward.split('|');
        let bottomBg = BaseBitmap.create("public_9_wordbg");
        let isWealth = extra && extra !== '';//是否出发了财神
        bottomBg.height = isWealth ? 220 : 170;
		bottomBg.name = "bottomBg"
		bottomBg.x = this.viewBg.x+ this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = tailor_get_word.y + 40;
        this.addChild(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0 ,bottomBg.width,bottomBg.height-10);
        let rewardNode =  new  BaseDisplayObjectContainer();

        let scroStartY = 30;
        let rIcons = GameData.getRewardItemIcons(reward,true,true);
        let waitT = 0;
        if(rIcons.length == 1){
            let element = rIcons[0];
            element.anchorOffsetX = element.width/2;
            element.anchorOffsetY = element.height/2;
            element.x = GameConfig.stageWidth/2;
            element.y = scroStartY + element.height/2;// + 40;
            element.setScale(0);
            waitT = 400;
            egret.Tween.get(element,{loop:false}).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
            rewardNode.addChild(element);
        }else{
            let tmpX = (GameConfig.stageWidth - rIcons.length * 108 - (rIcons.length - 1) * 12) / 2;
            for (var index = 0; index < rIcons.length; index++) {
                var element = rIcons[index];
                element.anchorOffsetX = element.width/2;
                element.anchorOffsetY = element.height/2;
                element.setScale(0);
                element.x = tmpX+ element.width/2;
                element.y = scroStartY + element.height/2;
                tmpX +=  (element.width + 12);
                if (tmpX >= GameConfig.stageWidth)
                {
                    tmpX = (GameConfig.stageWidth - 5 * 108 - 4 * 12) / 2;
                    scroStartY += element.height + 20;
                    element.x = tmpX + element.width/2;
                    element.y = scroStartY+element.height/2;
                    tmpX +=  (element.width+12);
                }
                egret.Tween.get(element,{loop:false}).wait(100*index).to({scaleX:1.2,scaleY:1.2},200).to({scaleX:1.0,scaleY:1.0},50);
                rewardNode.addChild(element);
            }
            waitT = 100*rIcons.length ;
        }
        
        if(extra && extra != ''){
            let itemvo = GameData.formatRewardItem(extra)[0];
            let goldNum = itemvo.num;
            let getTip = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasureWealthTip2-${this.code}`),20);
            let sliverIcon = BaseLoadBitmap.create(itemvo.icon);
            sliverIcon.width = sliverIcon.height = 108;
            let getNum= ComponentManager.getTextField(`x${goldNum}`,24);
    
            getTip.x = (GameConfig.stageWidth - getTip.width - getNum.width - 60)/2;
            getTip.y = bottomBg.y + 165;
            this.addChild(getTip);
    
            sliverIcon.setScale(0.5);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter,sliverIcon,getTip,[getTip.textWidth + 5,0]);
            this.addChild(sliverIcon);
    
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter,getNum,sliverIcon,[60,0]);
            this.addChild(getNum);

            this.doWaitAni(getTip,waitT);
            this.doWaitAni(getNum,waitT);
            this.doWaitAni(sliverIcon,waitT);
        }

		let scrollView = ComponentManager.getScrollView(rewardNode,rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.verticalScrollPolicy = "off";
        scrollView.x = bottomBg.x;
        scrollView.y = bottomBg.y + 5;
        this.addChild(scrollView);

        let okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
        okBtn.x = (GameConfig.stageWidth - okBtn.width) / 2;
        okBtn.y = bottomBg.y + bottomBg.height + 20;
        okBtn.alpha = 0;
        egret.Tween.get(okBtn,{loop:false}).wait(waitT).to({alpha:1},500);
        this.addChild(okBtn);

        this.doWaitAni(okBtn,waitT);
    }

    protected doWaitAni(tmpNode:egret.DisplayObject,waitT:number)
    {
        tmpNode.alpha = 0;
        egret.Tween.get(tmpNode,{loop:false}).wait(waitT).to({alpha:1},500);
    }

    protected getShowHeight():number
	{
        let re_data = this.param.data;
        //"6_1150_4|6_1710_1";
        let rewardTab = re_data.split('|');
        return rewardTab.length > 4 ? 528 : 300;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"tailor_get_light",
            "tailor_get_word",
            "tailor_get_bg",
		]);
    }
    
    protected isTouchMaskClose() : boolean{
        return true;
    }


	public hide(){
		if(this.param.data && this.param.data.confirmCallback){
			this.param.data.confirmCallback.apply(this.param.data.handler,[]);
        }
        super.hide();
    }
   
    public dispose()
    {
        super.dispose()
    }
}