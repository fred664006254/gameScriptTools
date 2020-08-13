class AcTailorRewardPopupView  extends PopupView
{
    public constructor() {
		super();
	}

    protected initView():void
	{
        let aid = this.param.data.aid;
        let code = this.param.data.code;
        let tailorCfg = <Config.AcCfg.TailorCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid,code);
        let tailorPool = tailorCfg.tailorPool;
        let rewardTab = [];
        for (var key in tailorPool) {
            rewardTab.push(tailorPool[key][0]);
        }

        let bottomBg = BaseBitmap.create("public_9_bg39");
        bottomBg.width = 520;
        bottomBg.height = 522;
		bottomBg.name = "bottomBg"
		bottomBg.x = this.viewBg.x+ this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = this.viewBg.y + 20;
        this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0 ,bottomBg.width,bottomBg.height-10);
        let rewardNode =  new  BaseDisplayObjectContainer();

        let tmpX = 25;
        let scroStartY = 15;
        let rIcons = GameData.getRewardItemIcons(rewardTab.join("|"),true,true);
        for (var index = 0; index < rIcons.length; index++) {
            var element = rIcons[index];
            element.x = tmpX;
            element.y = scroStartY;
            tmpX +=  (element.width+15);
            //换行处理
            if (tmpX >= bottomBg.x + bottomBg.width)
            {
                tmpX = 25;
                scroStartY += element.height + 15;
                element.x = tmpX;
                element.y = scroStartY;
                // addH += element.height + 15;
                tmpX +=  (element.width+15);
            }
            rewardNode.addChild(element);
        }

		let scrollView = ComponentManager.getScrollView(rewardNode,rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = bottomBg.x;
        scrollView.y = bottomBg.y+5;
        this.addChildToContainer(scrollView);
    }

    protected getShowHeight():number
	{
		return 660;
	}
   
    public dispose()
    {
        super.dispose()
    }
}