/**
 * 巾帼活动选择门客奖励
 * author qianjun
 */

class ChooseServantView  extends PopupView{   
    private _list : ScrollList = null;
    private _selectIdx : number = 0;
    public constructor() {
		super();
	}

    public initView():void{
        let view = this;
        let itemId = "1952";
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHOOSEREWARD_ITEM_CLICK,view.checkBuzhen,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHOOSE),view.seleCallBack,view);

        let str = `chooseservanttip_`+itemId;
        if (this.param && this.param.data && this.param.data.itemId){
            itemId = this.param.data.itemId;
            str = "chooseToolCommonTip";
            if (String(itemId) == "1953" || String(itemId) == "1954" || String(itemId) == "1955" || String(itemId) == "1956" || String(itemId) == "2288"){
                str = `chooseservanttip_`+itemId;
            }
        }
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(str), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.width = 500;
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = view.viewBg.width/2 - tipTxt.width/2;
        tipTxt.y = 10;
        
        view.addChildToContainer(tipTxt);

        let bg = BaseBitmap.create("public_9_bg4");
        bg.width = 540;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt, [0, tipTxt.textHeight + 10]);
        view.addChildToContainer(bg);
        
        let itemcfg = Config.ItemCfg.getItemCfgById(itemId);
        let arr = GameData.formatRewardItem(itemcfg.chooseRewards);
        let rect = egret.Rectangle.create();

        let len = Math.min(Math.ceil(arr.length / 3), 2);
        rect.setTo(0,0,534,(len * 245)+15);
        let list = ComponentManager.getScrollList(ChooseRewardItem, arr, rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, bg);
        
        bg.height = list.height + 10;
        view.addChildToContainer(list);
        view._list = list;
        if (arr.length == 2)
        {
            list.x = 132;
        }

        view._selectIdx = 0;
        let button = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `adultChoose`, ()=>{
            //选择门客
            let str = itemcfg.chooseRewards.split("|");
            let chooseid = str[view._selectIdx];
            let rewardvo = GameData.formatRewardItem(chooseid)[0];
            if(itemId == "1955" && (rewardvo.id == 2003 || rewardvo.id == 2004)){
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : LanguageManager.getlocal("chooseservanttip3", [itemcfg.name]),
                    title : `itemUseConstPopupViewTitle`,
                    touchMaskClose : true,
                    callback : ()=>{
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                            itemId : itemId,
                            chooseId : chooseid
                        });
                    },
                    handle : view,
                    needClose : 1,
                    needCancel : true
                });  
            }
            else{
                if (itemId == "1952" ){
                    if(Api.servantVoApi.getServantObj(rewardvo.id.toString())){
                        let servantData = Config.ServantCfg.getServantItemById(rewardvo.id);
                        let itemVo =  GameData.formatRewardItem(servantData.exchange)[0];
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                            msg : LanguageManager.getlocal("chooseservanttip2", [servantData.name, itemVo.name, String(itemVo.num)]),
                            title : `itemUseConstPopupViewTitle`,
                            touchMaskClose : true,
                            callback : ()=>{
                                NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                                    itemId : itemId,
                                    chooseId : chooseid
                                });
                            },
                            handle : view,
                            needClose : 1,
                            needCancel : true
                        });  
                    }
                    else{
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                            itemId : itemId,
                            chooseId : chooseid
                        });
                    }
                }
                else if (itemId == "1954"){
                    //佳人
                    let wifeData = Config.WifeCfg.getWifeCfgById(rewardvo.id);
                    let itemVo =  GameData.formatRewardItem(wifeData.exchange)[0];
                    if (Api.wifeVoApi.getWifeInfoVoById(rewardvo.id.toString())){
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                            msg :  LanguageManager.getlocal("chooseservanttip2", [wifeData.name, itemVo.name, String(itemVo.num)]),
                            title : `itemUseConstPopupViewTitle`,
                            touchMaskClose : true,
                            callback : ()=>{
                                NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                                    itemId : itemId,
                                    chooseId : chooseid
                                });
                            },
                            handle : view,
                            needClose : 1,
                            needCancel : true
                        });
                    }
                    else{
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                            itemId : itemId,
                            chooseId : chooseid
                        });
                    }
                }
                else if (itemId == "1956"){
                    if(Api.servantVoApi.getServantObj(rewardvo.id.toString()))
                    {
                        let servantData = Config.ServantCfg.getServantItemById(rewardvo.id);
                        let itemVo =  GameData.formatRewardItem(servantData.exchange)[0];
                        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                            msg : LanguageManager.getlocal("chooseservanttip2", [servantData.name, itemVo.name, String(itemVo.num)]),
                            title : `itemUseConstPopupViewTitle`,
                            touchMaskClose : true,
                            callback : ()=>{
                                NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                                    itemId : itemId,
                                    chooseId : chooseid
                                });
                            },
                            handle : view,
                            needClose : 1,
                            needCancel : true
                        });  
                    }
                    else
                    {
                        NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                            itemId : itemId,
                            chooseId : chooseid
                        });
                    }
                }
                else{
                    NetManager.request(NetRequestConst.REQUEST_ITEM_CHOOSE,{
                        itemId : itemId,
                        chooseId : chooseid
                    });
                }
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, button, bg, [0, bg.height + 20]);
        view.addChildToContainer(button);

        if (arr.length == 5){
            let item3 = list.getItemByIndex(3);
            item3.x = 88;

            let item4 = list.getItemByIndex(4);
            item4.x = 266;
        }
        else if (arr.length == 4){
            let item1 = list.getItemByIndex(0);
            item1.x = 68;
            let item2 = list.getItemByIndex(1);
            item2.x = 286;
            let item3 = list.getItemByIndex(2);
            item3.x = 68;
            item3.y = 246;
            let item4 = list.getItemByIndex(3);
            item4.x = 286;
        }
        
    }

    protected getTitleStr():string{
		return "adultChoose";
    }

    private checkBuzhen(event:egret.Event):void{
        let data = event.data;
        let view = this;
        let list : any = view._list; 
        view._selectIdx = data;
        for(let i in list._scrollListItemArr){
            let item  = <ChooseRewardItem>list._scrollListItemArr[i];
            item.update(data);
        }
    }

    protected getShowWidth():number{
        return 600;
    }
    
    protected getResourceList():string[]{
		return super.getResourceList().concat([
			"itemservantselect",`itemservantbg`,
		]);
    }

    private seleCallBack(evt : egret.Event):void{
        let view = this;
        if(evt && evt.data && evt.data.ret && evt.data.data.data){
            if(evt.data.data.data.replacerewards){
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD,{
                    replacerewards : evt.data.data.data.replacerewards,
                    callback : ()=>{
                        let rewards = evt.data.data.data.replacerewards;
                        let rewardList = GameData.formatRewardItem(rewards);
                        App.CommonUtil.playRewardFlyAction(rewardList);
                    }, 
                    handler : this
                });
            }
            view.hide();
        }
    }
    
    public dispose():void{	
        let view = this;
        view._list = null;
        view._selectIdx = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHOOSEREWARD_ITEM_CLICK,view.checkBuzhen,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ITEM_CHOOSE),view.seleCallBack,view);
        super.dispose();
    }
}