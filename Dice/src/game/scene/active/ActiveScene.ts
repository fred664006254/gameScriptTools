/**
 * 活动
 * author qianjun
 * @class ActiveScene
 */
class ActiveScene extends BaseScene{
    private _list : ScrollList = null;

    public dispose():void{
        let view = this;
        view._list = null;
        App.MsgHelper.removeEvt(NetConst.FAIRARENA_START, this.fairaenaStart, this);
        super.dispose();
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
    }
    
	public constructor() {
		super();
    }

	protected init():void{
        super.init();
        let view = this;
        App.MsgHelper.addEvt(NetConst.FAIRARENA_START, this.fairaenaStart, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - 310;
        // view.y = 72;

        let title = BaseBitmap.create(`activetitle`);
        view.addChild(title);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, view, [0,87]);

        let titletxt = BaseBitmap.create("activetitle1");
        this.addChild(titletxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titletxt, title, [0,18]);
        
        let arr = [
            {active : `fairarena`},
            {lock : true,},
            {lock : true,},
            {lock : true,},
        ]

        let list = ComponentMgr.getScrollList(ActiveItem, arr, new egret.Rectangle(0,0,GameConfig.stageWidth,view.height - 5));
        App.MsgHelper.addEvt(MsgConst.END_TOUCH_LIST, (evt)=>{
            list && list._onTouchEnd(<egret.TouchEvent>evt);
        }, this);
        view.addChild(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0,title.height+15]);
        view._list = list;
    }

    protected refreshAfterShow(bool:boolean=false):void{
        super.refreshAfterShow(bool);
        Api.FairArenaVoApi.sceneName = "active"
    }

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
            `activescene`,`btn_rule`
		]);
	}
	
	protected tick(){
    }

    private fairaenaStart(evt:egret.Event){
        if(evt.data.ret){
            SceneController.getInstance().go("FairarenaScene",{});
        }
    }

    private buyGoldBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //弹出
            let cfgid = Api.ShopVoApi.getTouchId();
            let cfg = Config.ShopCfg.getBuyGoldCfgById(Number(cfgid));
            Api.ShopVoApi.setTouchId(0);
        }
    }
}