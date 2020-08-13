class AcSingleDaySkinView extends CommonView{
    public constructor(){
        super();
    }
    private _aid:string = undefined;
    private _code:string = undefined;
    private _myScrollList:ScrollList;
    private _nodeContainer:BaseDisplayObjectContainer;
    private get cfg() : Config.AcCfg.SingleDayCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }

    private get vo() : AcSingleDayVo{
        return <AcSingleDayVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }

    protected getUiCode():string{
        let code = this.param.data.code;
        if (code == "3"){
            return "2";
        }
        return code;
    }


    public initView(){
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;

        this._nodeContainer = new  BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
		this.addChildToContainer(this._nodeContainer);

        let skinList = this.cfg.skinList;
        let keys = Object.keys(skinList);
        keys.sort((dataA:any,dataB:any)=>{
            return Number(dataA) - Number(dataB);
        });
        let values = [];
        for (var index = 0; index < keys.length; index++) {
            let tmpK = keys[index];
            values.push([skinList[tmpK],Number(tmpK)+1,this._aid , this._code]);
        }
        let bg = BaseBitmap.create("public_9_bg22");
		bg.width = GameConfig.stageWidth-20;
		bg.height = GameConfig.stageHeigth  - this.container.y - 90 ;
		this._nodeContainer.addChild(bg);

        let rectH2 = bg.height - 45 ;
		let rect2 = new egret.Rectangle(0, 0, GameConfig.stageWidth-10,rectH2);
		this._myScrollList  = ComponentManager.getScrollList(AcSingleDaySkinScrollItem,values,rect2);
        this._myScrollList.bounces = false;
		this._myScrollList.y =  bg.y + 20;
        this._myScrollList.x = 15;
		this._myScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		this._nodeContainer.addChild(this._myScrollList);

        this.initBottom();
        
    }

    //创建底部通用切换按钮，由 initBottom，bottomBtnHandler 两个接口一起完成
    protected initBottom()
    {
        let btNode = new AcSingleDayBottomNode({selectIdx:2,switchCallback:this.bottomBtnHandler,callbackOgj:this});
        btNode.y = -this.container.y;
        this.addChildToContainer(btNode);
    }

    protected bottomBtnHandler(index:number)
    {
        if(index == 1){
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD1VIEW,{
                code : this._code,
                aid : this._aid
            });
        }else if(index == 2){
             return;
        }else if(index == 3){
            ViewController.getInstance().openView(ViewConst.COMMON.ACSINGLEDAYBUILD3VIEW,{
                code : this._code,
                aid : this._aid
            })
        }
        this.hide();
    }

    // protected getViewTitleButtomY():number
	// {
	// 	let className:string=this.getClassName();
	// 	className = this.getClassName().substring(0,className.indexOf("Tab"));
	// 	let view:CommonView=<CommonView>ViewController.getInstance().getView(className);
	// 	return view["getTitleButtomY"]();
	// }

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
            "acsingleday_skinbg1_1",
            "acsingleday_skinbg1_2",
            "acsingleday_skinbg2_1","servant_detailBtn","servant_detailBtn_down",
            "acsingleday_skinbg2_2",
            "acsingleday_skinitemIconbg",
            "acsingleday_skinnamebg",
            "acsingleday_skinnameb2","tailor_get_light",
            "shopview_corner",
        ]);
    } 
     
    public dispose():void{   
        this._aid = null;
        this._code = null;
        this._myScrollList = null;
        this._nodeContainer = null;

        super.dispose();
    }
}