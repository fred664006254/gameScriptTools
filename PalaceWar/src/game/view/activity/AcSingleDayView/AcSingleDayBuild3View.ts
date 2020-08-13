/*
author : qianjun
desc : 奇珍异宝
*/
class AcSingleDayBuild3View extends CommonView{
    public constructor(){
        super();
    }
    private public_dot1:BaseBitmap = null;
    private public_dot2:BaseBitmap = null;
    private public_dot3:BaseBitmap = null;
    private _list : ScrollList = null;

    private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
	}
    
    // protected getBgName():string{
    //     return `pub9_bg_11`;
    // }

    protected getTitleStr():string{
        return `buildtxt3_${this.getUiCode()}`
    }

    protected getUiCode():string{
        let code = this.param.data.code;
        if (code == "3"){
            return "2";
        }
        return code;
    }

    public initView(){
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP), view.buyShopCallback, view);
        view.width = GameConfig.stageWidth;
        let bg1:BaseBitmap = BaseBitmap.create("public_9_bg22");
		// bg1.y = 5;
		bg1.width = GameConfig.stageWidth;
		bg1.height = GameConfig.stageHeigth - 111 - view.titleBg.y - view.titleBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg1, view.titleBg, [0,view.titleBg.height]);
        view.addChild(bg1);
        
        let rect:egret.Rectangle=egret.Rectangle.create();
        rect.setTo(0,0,630,bg1.height-35);
        
        let arr = view.vo.getArr('itemsList');
		let scrollList=ComponentManager.getScrollList(AcSingleDayBuild3Item, arr, rect, view.param.data.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg1, [0,10]);
        view.addChild(scrollList);
        view._list = scrollList;
        view.initBottom();
    }

    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    private initBottom(){
        let btNode = new AcSingleDayBottomNode({selectIdx:3,switchCallback:this.bottomBtnHandler,callbackOgj:this});
        btNode.y = -this.container.y;
        this.addChildToContainer(btNode);
    }

    private buyShopCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        let rewards = data.rewards;
        let idx = 0;
        for(let i in view.cfg.itemsList){
            let unit = view.cfg.itemsList[i];
            if(unit.itemID === rewards){
                idx = Number(i);
                break;
            }
        }
        let item : any = view._list.getItemByIndex(idx);
        item.refreshItem();
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = item.localToGlobal(106, 200);
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
    }

    private bottomBtnHandler(index:number)
    {
        if(index == 1){
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD1VIEW,{
                code : this.param.data.code,
                aid : this.param.data.aid
            });
        }else if(index == 2){
             ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYSKINVIEW,{
                code: this.param.data.code,
                aid: this.param.data.aid
            });
        }else if(index == 3){
            return;
        }

        this.hide();
    }


    protected getRuleInfo():string{
		return "acSingleDayRuleInfo-" + this.getUiCode();
    } 

    protected getRuleInfoParam():string[]{
        let vo = this.vo;
        let cfg = this.cfg;
        return [
            (cfg.startTime / 3600).toString(),
            ((cfg.startTime + cfg.luckyPacketCD) / 3600).toString(),
            String(cfg.luckyPacketPurchase / 3600),
            cfg.couponLimit.toString()
        ];
    } 

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            "shopview_line","acsingledayitembg","shopview_corner"
        ]);
    }

    private update(): void{
         //第一页 红点
        let vo = this.vo;
        if(!vo)
        {
            return;
        }	
         if(this.public_dot1)
         {
             this.public_dot1.visible = vo.getpublicRedhot1();
         }
         //第二页 红点
         if(this.public_dot2)
         {
              this.public_dot2.visible =  vo.getpublicRedhot2();
         }    
 
         //第三页 红点
         if(this.public_dot3)
         {
              this.public_dot3.visible =  vo.getpublicRedhot3();
         }    
    } 
     
    
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQYEST_ACTIVITY_SINGLEDAY_BUYSHOP), view.buyShopCallback, view);
        view.public_dot1 = null;
        view.public_dot2 = null;
        view.public_dot3 = null;
        super.dispose();
    }
}