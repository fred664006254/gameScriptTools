/**
 * 商店
 * author qianjun
 * @class ShopView
 */
class ShopScene extends BaseScene{
    private _list : ScrollList = null;
    private _timeToday : number = 0;

	public constructor() {
		super();
    }
    
    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_SHOP, MsgConst.MODEL_GAMEINFO, MsgConst.SCROLLTOINDEX,
		];
    }
    
    protected getNetConstEventArr():string[]{
		return [
           NetConst.SHOP_BUYGOLD, NetConst.PAY_PROCESSPAYMENT, NetConst.SHOP_BUYBOX, NetConst.SHOP_BUYDAILY, NetConst.SHOP_BUYEMOTION,NetPushConst.PUSH_PAY,
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case MsgConst.MODEL_SHOP:
                view.modelBack();
                break;
            case MsgConst.MODEL_GAMEINFO:
                view.gamemodelBack();
                break;
            case MsgConst.SCROLLTOINDEX:
                view.jump(evt);
                break;
		}
    }

    protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.SHOP_BUYGOLD:
                view.buyGoldBack(evt);
                break;
            case NetConst.PAY_PROCESSPAYMENT:
                view.buyGemBack(evt);
                break;
            case NetConst.SHOP_BUYBOX:
                view.buyBoxBack(evt);
                break;
            case NetConst.SHOP_BUYDAILY:
                view.buyDailyBack(evt);
                break;
            case NetConst.SHOP_BUYEMOTION:
                view.buySpecialBack(evt);
                break;
            case NetPushConst.PUSH_PAY:
                view.buyDiscountBack(evt);
                break;
		}
    }

	protected init():void{
        super.init();
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth - 157;
        // view.y = 72;
        let cfg = view.cfg;
        
        let arr = [
            {type : ShopConst.SHOP_DISCOUNTSHOP},
            {type : ShopConst.SHOP_DAILYSHOP},
            {type : ShopConst.SHOP_SPECIALVIP},
            {type : ShopConst.SHOP_SPECIALBOX},
            {type : ShopConst.SHOP_GEM},
            {type : ShopConst.SHOP_GOLD},
        ]
        //限定特价
        //每日精选
        //特权
        //皇家宝箱
        //钻石
        //金币
        let num = 2;
        if(Api.SwitchVoApi.checkWxShenhe()){
            arr = [
                {type : ShopConst.SHOP_DAILYSHOP},
                {type : ShopConst.SHOP_SPECIALBOX},
                {type : ShopConst.SHOP_GOLD},
            ]
            num = 3;
        }
        else{
            if(view.height - 25 > (552+709)){
                num = 20;
            }
        }

        let list = ComponentMgr.getScrollList(ShopTypeItem, arr, new egret.Rectangle(0,0,view.width,view.height - 25),null,num);
        view.addChild(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, view, [0,75], true);
        view._list = list;
        App.MsgHelper.addEvt(MsgConst.END_TOUCH_LIST, (evt)=>{
            list._onTouchEnd(<egret.TouchEvent>evt);
        }, this);

        view.checkJump();
        // let redJson = RES.getResByUrl(`/1.json`, (data)=>{
        //     if(data){
        //         let obj : any = {};

        //         for(let i in data){
        //             let key = i;
        //             if(RES.hasRes(key)){
        //                 obj[key] = data[i];
        //             }
        //         }
        //         console.log(JSON.stringify(obj));
        //     }
        // }, view);
    }

    private checkJump():void{
        if(Api.SwitchVoApi.checkWxShenhe()){
            return;
        }
        let view = this;
        let list = view._list;
        if(list){
            if(Api.ShopVoApi.getisbuyRoyal()){
                Api.ShopVoApi.setisbuyRoyal(false);
                list.setScrollTopByIndex(2, 300);
                let data = Config.RoyalpassCfg.getRechargeType();
                // if(Api.ShopVoApi.getPayInfoById(data)){
                //     ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                //         title : LangMger.getlocal("sysTip"),
                //         msg : LangMger.getlocal(`sysHaveBuy`),
                //         needCancel : false,
                //     });
                //     return;
                // }
                // Api.ShopVoApi.setTouchType(ShopConst.SHOP_SPECIALVIP)
                // Api.ShopVoApi.setTouchId(data);
                //PlatMgr.pay(data); 
            }
        }
        //是0 不用跳转
        if(list && this.param && typeof this.param.index != `undefined`){
            list.setScrollTopByIndex(this.param.index, 300);
        }
    }

    protected refreshAfterShow(bool:boolean=false):void{
        super.refreshAfterShow(bool);
        this.checkJump();
        this.tick();
    }
    
    private jump(param){
        if(!this.isShow() || !this._list || typeof param.data.index == `undefined` || Api.SwitchVoApi.checkWxShenhe()){
            return;
        }
        this._list.setScrollTopByIndex(param.data.index, 300);
    }

    
    private get cfg(){
        return Config.ShopCfg;
    }

    // protected getBgName():string{
    //     return `popupview_bg1`;
    // }
    
    private modelBack():void{
        let view = this;
        let touchType = Api.ShopVoApi.getTouchType();
        let discountitem = <ShopTypeItem>view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe()?-1:0);
        let dailyitem = <ShopTypeItem>view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe()?0:1);
        let vipitem = <ShopTypeItem>view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe()?-1:2);

        switch(touchType){
            case ShopConst.SHOP_DAILYSHOP:
                if(dailyitem){
                    dailyitem.freshDailyShop();
                }
                break;
            case ShopConst.SHOP_SPECIALVIP:
                if(vipitem){
                    vipitem.freshSpecialVip();
                }
                break;
            case ShopConst.SHOP_DISCOUNTSHOP:
                if(discountitem){
                    discountitem.freshDiscountShop();
                }
                break;
            default:
                if(discountitem && dailyitem){
                    dailyitem.freshDailyShopAll();
                    discountitem.freshDiscountShopAll();
                }

                break;
        }
           
        Api.ShopVoApi.setTouchType(``);
    }

    hide(isDispose?:boolean){
        App.MsgHelper.dispEvt(MsgConst.SHOWSTRESSLIGHT, {index:-1});
        super.hide(isDispose);
    }

    private gamemodelBack():void{
        let view = this;
        if(view._list){
            let vipitem = <ShopTypeItem>view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe()?-1:2);
            if(vipitem){
                vipitem.freshSpecialVip();
            }   
        }
    }
    
	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
            `btn_rule`,`shopinfoscene`
		]);
	}
	
	protected tick(){
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

    private buyGemBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //弹出
            let cfgid = Api.ShopVoApi.getTouchId();
            let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(String(cfgid));
            if(cfg && cfg.gemCost){
                //充值接口
                Api.ShopVoApi.setTouchId(0);
            }
            else{
                //弹出
                if(cfgid){
                    ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        title : LangMger.getlocal("sysTip"),
                        msg : LangMger.getlocal(`sysBuySucc`),
                        needCancel : false,
                    });
                }
            }
        }
    }

    private buyBoxBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //弹出
            let rewards = evt.data.data.data.rewards;
            let specialBoxId = Api.ShopVoApi.getTouchId();
            let specialBoxCfg = Config.ShopCfg.getSpecialBoxCfgById(Number(specialBoxId));

            ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
                rewards : rewards,
                title : LangMger.getlocal(`sysGetReward`),
                isBoxBuy : true,//连续购买模式
                specialBoxId : specialBoxId,
                handler : view,
                needCancel : true,
                callback : ()=>{
                    if(Api.UserinfoVoApi.getGem() < specialBoxCfg.costGem1){
                        App.CommonUtil.gemNotEnough(1);
                        // ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                        //     title : LangMger.getlocal("sysTip"),
                        //     msg : LangMger.getlocal(`sysgemNotEnough`),
                        //     needCancel : false,
                        // });
                    }
                    else{
                        NetManager.request(NetConst.SHOP_BUYBOX,{
                            shopId : String(specialBoxId),
                            idDiscout : 1
                        });
                    }
                },
                closecallback : ()=>{
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                },
            });
        }
    }

    private buyDailyBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //弹出
            let rewards = evt.data.data.data.rewards;
            let rewardsArr = GameData.formatRewardItem(rewards);
            if(Api.ShopVoApi.getIsBox()){
                ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
                    rewards : rewards,
                    title : LangMger.getlocal(`sysGetReward`),
                    isBoxBuy : false,//连续购买模式
                    specialBoxId : Api.ShopVoApi.getBoxId(),
                    handler : view,
                    needCancel : true,
                    closecallback : ()=>{
                        App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    },
                });
                Api.ShopVoApi.setIsBox(false,``);
            }
            else{
                if(rewardsArr.length > 1 || (rewardsArr[0].type == 100)){
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        handler : view,
                        callback : ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                        closecallback : ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                }
                else if(rewardsArr[0].type == 1 || rewardsArr[0].type == 2){
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                }   
            }
        }
    }

    private buySpecialBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //弹出
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title : LangMger.getlocal("sysTip"),
                msg : LangMger.getlocal(`sysBuySucc`),
                needCancel : false,
            });
            let vipitem = <ShopTypeItem>view._list.getItemByIndex(Api.SwitchVoApi.checkWxShenhe()?-1:2);
            if(vipitem){
                vipitem.freshSpecialVip();
            }
        }
    }

    private buyDiscountBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //弹出
            let rewards = evt.data.data.data.rewards;

            // Api.ShopVoApi.setIsBox(true, rewardData.boxId);
            if(Api.ShopVoApi.getIsBox()){
                ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
                    rewards : rewards,
                    title : LangMger.getlocal(`sysGetReward`),
                    isBoxBuy : false,//连续购买模式
                    specialBoxId : Api.ShopVoApi.getBoxId(),
                    handler : view,
                    needCancel : true,
                    closecallback : ()=>{
                        App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                    },
                });
                Api.ShopVoApi.setIsBox(false,``);
            }
            else{
                if(rewards && rewards != ``){
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        handler : view,
                        callback : ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                        closecallback : ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                }
            }
        }
    }

    protected getBgName():string{
		return "public_ab_scenebg"
	}

	public dispose():void{
        let view = this;
        view._list = null;
        view._timeToday = 0;
        super.dispose();
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SHOP_BUY_ITEM),this.useCallback,this);
	}
}