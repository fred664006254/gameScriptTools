
class ShopBuySpecialBoxItem extends ScrollListItem {

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : Config.SpecialBoxShopItemCfg) {
        let view = this;
        let ismax = index == 0;

        let boxcfg = Config.BoxCfg.getBoxCfgById(data.boxId);
    
        view.width = (ismax ? 612 : 206);
        view.height = 235 + 10;

        let id = data.id;

        let bg = BaseBitmap.create(ismax ? `shop_speical_box_item_bg` : `bird_item_bg_${id + 1}`);
        // bg.width = ismax ? 612 : 196;
        // bg.height = 235;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [0,0], true);
        if(ismax)
        {
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bg, view, [-16,3], true);
        }

        view.addChild(bg);
        if(!ismax){
            let txtbg = BaseBitmap.create("shop_name_bg");
            view.addChild(txtbg);
            txtbg.x = 0;
            txtbg.y = 0;
        }

        let nameTxt  = ComponentMgr.getTextField(data.name, TextFieldConst.SIZE_CONTENT_NORMAL);
        view.addChild(nameTxt);
        let strokeObj = {
            1 : ColorEnums.strokeOrange,
            2 : ColorEnums.strokeBlue,
            3 : ColorEnums.strokePurple,
            4 : ColorEnums.strokeRed,
        };

        let itemGroup = new BaseDisplayObjectContainer();
        view.addChild(itemGroup);

        let costicon = BaseBitmap.create(`ab_mainui_gem`);
        view.addChild(costicon);

        let costTxt = ComponentMgr.getTextField(`${data.costGem}`, TextFieldConst.SIZE_24);
        view.addChild(costTxt);

        let iconbg = BaseBitmap.create(`shopspecialboxiconbg`);
        iconbg.width = 120;
        iconbg.height = 120;
        
        if(ismax && App.CommonUtil.check_dragon()){
            let lb2 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_lb_2`);
            view.addChild(lb2);
            lb2.scaleX = 0.75;
            lb2.setPosition(280, view.height/2);
            // lb2.scaleY = 2;
            // lb2.setPosition(120,160);
            lb2.blendMode = egret.BlendMode.ADD;
        }

        let cfg = {
            1 : {
                lightscale : 0.35, img : `itembox1001g`,
            },
            2 : {
                lightscale : 0.45, img : `itembox1002g`,
            },
            3 : {
                lightscale : 0.55, img : `itembox1003g`,
            },
            4 : {
                img : `itembox1004g`,
            },
        }

        // itemGroup.addChild(iconbg);

        let dragonCfg = cfg[id];

        let icon = BaseLoadBitmap.create(boxcfg.icon, null, {
            callbackThisObj : view,
            callback : ()=>{
                if(ismax){
                    iconbg.visible = false;
                    nameTxt.size = TextFieldConst.SIZE_30;
                    costTxt.size = TextFieldConst.SIZE_36;
                    nameTxt.strokeColor = strokeObj[id];
                    nameTxt.stroke = 1.5;
                    icon.setScale(0.84);

                    itemGroup.width = 266;
                    itemGroup.height = 266;

                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, bg, [370+(240-nameTxt.textWidth)/2,46]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemGroup, bg, [65,20]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costicon, bg, [412,125]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width*costicon.scaleX + 15,2]);

                    if(App.CommonUtil.check_dragon()){
                        let lb3 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_lb_3`);
                        lb3.blendMode = egret.BlendMode.ADD;
                        itemGroup.addChild(lb3);
                        lb3.setPosition(itemGroup.width/2, itemGroup.height/2);
                    }
                }
                else{
                    nameTxt.strokeColor = ColorEnums.black;
                    nameTxt.stroke = 1.5;
                    icon.setScale(0.5);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg)
                    // costicon.setScale(0.7);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0,8]);

                    itemGroup.width = 120;
                    itemGroup.height = 120;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemGroup, nameTxt, [0,nameTxt.height+10]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, costicon, itemGroup, [(itemGroup.width-costicon.width*costicon.scaleX-costTxt.width-10)/2,itemGroup.height + 28]);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, costTxt, costicon, [costicon.width*costicon.scaleX+5,2]);

                    if(App.CommonUtil.check_dragon()){
                        let lb1 = App.DragonBonesUtil.getLoadDragonBones(`royalpass_lb_1`);
                        lb1.touchEnabled = false;
                        lb1.setScale(dragonCfg.lightscale);
                        lb1.blendMode = egret.BlendMode.ADD;
                        itemGroup.addChild(lb1);
                        lb1.setPosition(itemGroup.width/2, itemGroup.height/2);
                    }
                }

                let light = BaseLoadBitmap.create(dragonCfg.img);
                light.blendMode = egret.BlendMode.ADD;
                itemGroup.addChild(light);
                light.anchorOffsetX = light.width / 2;
                light.anchorOffsetY = light.height / 2;
                light.alpha = 0;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, light, icon, [0,10]);

                let timeparam = BattleStatus.timeparam;;
                if(id == 1){
                    egret.Tween.get(light).wait(timeparam*15).call(()=>{
                        egret.Tween.removeTweens(light);
                        egret.Tween.get(light, {loop : true}).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30);
                    })
                    //egret.Tween.get(light, {loop : true}).to({alpha : 1}, timeparam * 20).to({alpha : 0}, timeparam * 20).to({alpha : 1}, timeparam * 20).to({alpha : 0}, timeparam * 20).to({alpha : 1}, 180).to({alpha : 0}, timeparam * 20);
                }
                else if(id == 2){
                    egret.Tween.get(light, {loop : true}).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30);
                }
                else if(id == 3){
                    egret.Tween.get(light).wait(timeparam*15).call(()=>{
                        egret.Tween.removeTweens(light);
                        egret.Tween.get(light, {loop : true}).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30);
                    })
                    // egret.Tween.get(light, {loop : true}).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30).to({alpha : 0.7}, timeparam * 30).to({alpha : 0}, timeparam * 30);
                    // egret.Tween.get(light, {loop : true}).to({alpha : 1}, timeparam * 60).to({alpha : 0}, timeparam * 60);
                }
                else if(id == 4){
                    egret.Tween.get(light, {loop : true}).to({alpha : 0.7}, timeparam * 60).to({alpha : 0}, timeparam * 60);
                }
            }
        });
        itemGroup.addChild(icon);

        App.CommonUtil.addTouchScaleEffect(view, ()=>{
            ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                title : boxcfg.name,
                handler : view,
                needCancel : false,
                callback : ()=>{
                    if(Api.UserinfoVoApi.getGem() < data.costGem){
                        App.CommonUtil.gemNotEnough(1);
                        return;
                    }
                    //发消息去买
                    Api.ShopVoApi.setTouchType(ShopConst.SHOP_SPECIALBOX);
                    Api.ShopVoApi.setTouchId(data.id);
                    Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
                    NetManager.request(NetConst.SHOP_BUYBOX,{
                        shopId : String(data.id),
                        idDiscout : 0
                    });
                },
                needClose : 1,
                boxId : data.boxId,
                isbuy : true,
                costIcon : `ab_mainui_gem`,
                costNum : data.costGem,
            });
        }, view)
        
    }
    
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
		super.dispose();
	}
}