
class ShopBuySpecialVipItem extends ScrollListItem {

    private _tipTxt : BaseTextField = null;
    private _tipBg : BaseBitmap = null;
    private _costGroup : BaseDisplayObjectContainer = null;
    private _data : any = null;
    private _stresslight:BaseBitmap = null;

	public constructor() {
		super();
    }

    protected getMsgConstEventArr():string[]{
		return [
			MsgConst.SHOWSTRESSLIGHT
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case MsgConst.SHOWSTRESSLIGHT:
                view.showStressLight(evt);
                break;
		}
    }
    
	protected initItem(index : number, data : any) {
        let view = this;
        view.initEventListener();
        view._data = data;
        let isemotion = index > 1;
        let isAssist = index == 0;   

        let cfg = null;
        if(!isemotion){
            cfg = Config.RechargeCfg.getRechargeItemCfgByKey(data);
        }
        
        // let data = Config.RechargeCfg.getRechargeItemCfgByKey(product);

        view.width = (isemotion ? 612 : 298) + 10;
        view.height = 235 + 20;

        let bg = BaseBitmap.create(isemotion ? `shopspecialbigbg` : `shop_speical_normal_bg`);
        if(index == 1)
        {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [5,0], true);
        }
        else
        {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0,0], true);
        }
       
        bg.width = view.width - 10;
        view.addChild(bg);

        let getGemTxt  = ComponentMgr.getTextField(LangMger.getlocal(isemotion ? `shopbuyspecialemotion` : `shopbuyspecial${cfg.id}`), TextFieldConst.SIZE_CONTENT_NORMAL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getGemTxt, bg, [0,8]);
        view.addChild(getGemTxt);
        getGemTxt.strokeColor = ColorEnums.black;
        getGemTxt.stroke = 1.5

        let itemGroup = new BaseDisplayObjectContainer();
        itemGroup.width = isemotion ? 490 : 222;
        itemGroup.height = 86;
        view.addChild(itemGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, itemGroup, bg, [75,getGemTxt.y+getGemTxt.height+(isemotion?25:5)]);

        let costGroup = new BaseDisplayObjectContainer();
        view.addChild(costGroup);
        view._costGroup = costGroup;
        
        if(isemotion){
            let emotioncfg = data;
            let costicon = BaseBitmap.create(`ab_mainui_gem`);
            costGroup.addChild(costicon);
            // costicon.setScale(0.7);

            // 添加表列表
            let buys = Config.ExpressionCfg.getBuyExpre();
            let startX = 100;
            for (let index = 0; index < buys.length; index++) {
                let url = buys[index];
                let db = App.DragonBonesUtil.getLoadDragonBones(url);
                view.addChild(db);
                db.y = 150;
                // 这里每个龙骨的宽都不一样
                switch (index) {
                    case 0:
                        db.x = startX;
                        break;
                    case 1:
                        db.x = startX + 90;
                        break;
                    case 2:
                        db.x = startX + 180;
                        break;
                    case 3:
                        db.x = startX + 320;
                        break;
                    case 4:
                        db.x = startX + 415;
                        break;
                    default:
                        break;
                }
            }
    
            let costTxt = ComponentMgr.getTextField(`${emotioncfg.costGem}`, TextFieldConst.SIZE_24);
            costGroup.addChild(costTxt);
            costTxt.strokeColor = ColorEnums.strokePurple;
            costTxt.stroke = 1.5
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width*costicon.scaleX+12,2]);
        }
        else{
            let icon = BaseBitmap.create(isAssist ? `shopassisticon` : `shopvipicon`);
            itemGroup.addChild(icon);

            let descbg = BaseBitmap.create(`shopspecialvipdescbg`);
            itemGroup.addChild(descbg);
            descbg.width = 222;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, icon, [0,icon.height+3]);

            if(!isAssist){
                let stresslight = BaseBitmap.create(`stresslight`);
                this.addChild(stresslight);
                stresslight.x = -10;
                stresslight.y = -20;
                stresslight.alpha = 0;
                stresslight.width = 335;
                let dtnum = 20;
                let ft = BattleStatus.timeparam;
                egret.Tween.get(stresslight,{loop:true})
                    .to({alpha:1}, dtnum*ft).to({alpha:0}, dtnum*ft);
                this._stresslight = stresslight;
                stresslight.visible = Api.ShopVoApi.getLightType() == ShopConst.SHOP_SPECIALVIP;
            }

            let maxTxt = ComponentMgr.getTextField(`<font color=0xff8100 size=20>MAX</font>`, TextFieldConst.SIZE_20);
            itemGroup.addChild(maxTxt);
            maxTxt.strokeColor = 0xffffff;
            maxTxt.stroke = 3;

            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, maxTxt, descbg, [30,0]);

            let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopbuyspecialtip${isAssist ? 1 : 2}`), TextFieldConst.SIZE_36);
            tipTxt.stroke = 1;
            if(isAssist){
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, maxTxt, [maxTxt.width+10,0]);
            }
            else{
                maxTxt.visible = false;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
            }
            
            itemGroup.addChild(tipTxt);
            tipTxt.verticalAlign = egret.VerticalAlign.MIDDLE;

            let costTxt = ComponentMgr.getTextField(`${cfg.cost} <font size=20>${PlatMgr.getMoneySign()}</font>`, TextFieldConst.SIZE_24);
            costGroup.addChild(costTxt);
            costTxt.strokeColor = ColorEnums.strokePurple;
            costTxt.stroke = 1.5
        }

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, costGroup, bg, [0,10]);

        let hadbuybg = BaseBitmap.create("shop_had_buy2");
        view.addChild(hadbuybg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, hadbuybg, bg, [-11,-13]);
        this._tipBg = hadbuybg;

        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopdailyshophavebuy`), TextFieldConst.SIZE_30);
        tipTxt.stroke = 2;
        tipTxt.strokeColor = ColorEnums.shoporedstroke;
        tipTxt.rotation = -30;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipTxt, hadbuybg, [20,4]);
        view.addChild(tipTxt);
        view._tipTxt = tipTxt;

        tipTxt.visible = isemotion ? Api.ShopVoApi.getEmotionHasBuyById(data.id) : Api.ShopVoApi.getPayInfoById(data);
        hadbuybg.visible = tipTxt.visible;
        // costGroup.visible = !tipTxt.visible;
        
        App.CommonUtil.addTouchScaleEffect(view, ()=>{
            if(isemotion ? Api.ShopVoApi.getEmotionHasBuyById(data.id) : Api.ShopVoApi.getPayInfoById(data)){
                // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
				// 	title : LangMger.getlocal("sysTip"),
				// 	msg : LangMger.getlocal(`sysHaveBuy`),
                //     needCancel : false,
                //     needClose : 1,
				// });
                return;
            }
            Api.ShopVoApi.setTouchType(ShopConst.SHOP_SPECIALVIP)
            if(isemotion){
                let emotioncfg = data;
                if(Api.UserinfoVoApi.getGem() < emotioncfg.costGem){
                    App.CommonUtil.gemNotEnough(1);
                    // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                    //     title : LangMger.getlocal("sysTip"),
                    //     msg : LangMger.getlocal(`sysgemNotEnough`),
                    //     needCancel : false,
                    //     needClose : 1
                    // });
                }
                else{
                    // ViewController.getInstance().openView(ViewConst.BUYRESCONFIRMPOPUPVIEW, {
                    //     title : LangMger.getlocal("sysTip"),
                    //     msg : LangMger.getlocal(`shopbuyconfirmtip`, [emotioncfg.costGem.toString(),LangMger.getlocal(`shopitemtypegold`)]),
                    //     handler : view,
                    //     needCancel : false,
                    //     callback : ()=>{
                    //         //发消息去买
                    //         NetManager.request(NetConst.SHOP_BUYEMOTION,{
                    //             shopId : String(emotioncfg.id)
                    //         });
                    //     },
                    //     needClose : 1,
                    //     // id : `2_1_1`,
                    //     costnum : emotioncfg.costGem,
                    //     costIcon : `ab_mainui_gem`
                    // });

                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
						title : LangMger.getlocal("shopbuyspecialemotion"),
						msg : LangMger.getlocal("shopbuyconfirmtip", [String(emotioncfg.costGem), LangMger.getlocal(`shopitemtypegold`)]),
						handler : this,
						needCancel : false,
						callback : ()=>{
							//发消息去买
							NetManager.request(NetConst.SHOP_BUYEMOTION, {shopId: String(emotioncfg.id)});
						},
						needClose: 1,
						confirmTxt: String(emotioncfg.costGem),
						iconURL: `ab_mainui_gem`
					});
                }
            }
            else{
                Api.ShopVoApi.setTouchId(data);
                PlatMgr.pay(data); 
            }
        },view);
    }
    
    public refreshView():void{
        let view = this;
        let isemotion = view._index > 1;
        view._tipTxt.visible = isemotion ? Api.ShopVoApi.getEmotionHasBuyById(view._data.id) : Api.ShopVoApi.getPayInfoById(view._data);
        view._tipBg.visible = view._tipTxt.visible;
    }

    private showStressLight(event:any){
        if(!this._stresslight)
            return;
        if(event.data.index == ShopConst.SHOP_SPECIALVIP){
            egret.Tween.removeTweens(this._stresslight);
            let stresslight = this._stresslight;
            this._stresslight.visible = true;
            this._stresslight.alpha = 1;
            let dtnum = 30;
            let ft = BattleStatus.timeparam;
            egret.Tween.get(stresslight,{loop:true}).wait(dtnum*ft)
            .to({alpha:0}, dtnum*4*ft).to({alpha:1}, dtnum*ft);
        }
    }
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
        if(view._stresslight){
            egret.Tween.removeTweens(view._stresslight);
            view._stresslight = null;
        }
        view._tipTxt = null;
        view._tipBg = null;
        view._costGroup.dispose();
        view._costGroup = null;
        view._data = null;
		super.dispose();
	}
}