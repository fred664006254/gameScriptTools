/**
 * 门客装备升级
 * author yanyuling
 * date 2017/11/18
 * @class ServantBookLevelupPopupView
 */

class ServantEquipLevelUpPopView extends PopupView{
    private _servantId : string = '';
    private _equipid : number = 1;
    private _list : ScrollList = null;
    // private _equipObj : {[key:string] : number}= {};
    private _nextLvTxt : BaseTextField = null;
    private _nextLvQulaityBg : BaseBitmap = null;
    private _progress : ProgressBar = null;
    private _infoGroup : BaseDisplayObjectContainer = null;
    private _isStackflow = false;
    private _canqualityup = false;
    // private _selected = null;

    private _curLvTxt : BaseTextField = null;
    private _curLvQulaityBg : BaseBitmap = null;
    private _btn : BaseButton = null;
    private _selectTipTxt:BaseTextField=null;
    private _leftGroup:BaseDisplayObjectContainer;
    private _rightGroup:BaseDisplayObjectContainer;
    private _arrow:BaseBitmap;
    private _isMaxLvAndMaxQulaity:boolean=false;

	public constructor() {
		super();
	}

	public initView():void{
        // public_tcdw_bg01
        let servantId = this.param.data.sid;
        let equipid = this.param.data.eid

        let view = this;
        view._equipid = equipid;
        App.MessageHelper.addEventListener(MessageConst.EQUIP_REVOLUTION_CHOOSE,view.chooseEquip,view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, view.equipLevelCallback, view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPQUALITYUP, view.equipQualityCallback, view);
        view._servantId = servantId;

        let bg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg.width = 526;
		bg.height = 398;
		bg.x = view.viewBg.x + view.viewBg.width/2 - bg.width/2;
		bg.y = 19;
        view.addChildToContainer(bg); 

        let group = new BaseDisplayObjectContainer();
        group.width = 382;
        group.height = 170;
        view.addChildToContainer(group);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, bg, [0,12]);
        //升级展示
        let curlv = Api.servantVoApi.getEquipAddLv(servantId, equipid);
        let quality = Api.servantVoApi.getEquipQuality(servantId, equipid);
        // let maxLv = Config.ServantequiplCfg.getEquipQualityMaxLv(quality);
        let isMaxQuality = Api.servantVoApi.checkEquipMaxQuality(servantId,equipid);
        let maxLvFull=(Api.servantVoApi.getNextQualityCostExp(servantId,equipid)<=0);
        view._canqualityup=maxLvFull&&(!isMaxQuality);//如值小于零，则显示进阶界面，否则显示升级界面
        view._isMaxLvAndMaxQulaity=maxLvFull&&isMaxQuality;
  
        let group1 = view.creatIcon(equipid, curlv, quality);
        this._leftGroup=group1;
        // group1.bindData={x:group1.x,y:group1.y};
        let group2 = view.creatIcon(equipid, view._canqualityup ? 0 : curlv + 1, view._canqualityup ? quality + 1 : quality, true);
        this._rightGroup=group2;
        group.addChild(group1);
        group.addChild(group2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, group2, group, [0,0], true);

        let arrow = BaseBitmap.create(`public_greenarrow2`);
        this._arrow=arrow;
        group.addChild(arrow);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, arrow, group, [0,24], true);

        let progressbar = ComponentManager.getProgressBar(`progress_type3_yellow`,`progress_type3_bg`, 480);
        view.addChildToContainer(progressbar);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, group, [0,group.height+8]);
        let curvalue = Api.servantVoApi.getEquipCurExp(servantId, equipid);
        view._progress = progressbar;

        let needvalue = view._isMaxLvAndMaxQulaity ? 0 : Config.ServantequiplCfg.getNextNeedEquipExp(quality, curlv+1);
        // view._canqualityup = isMaxQuality ? false : (curvalue >= Config.ServantequiplCfg.getEquipQualityBreakExp(quality) && curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality));
        if(!view._isMaxLvAndMaxQulaity){
            progressbar.setPercentage(curvalue/needvalue);
            progressbar["toLv"]=curlv;
            progressbar.setText(`${Math.min(curvalue, needvalue)}/${needvalue}`);
        }
        else{
            progressbar.setPercentage(1);
            progressbar.setText(LanguageManager.getlocal(`promotion_topLevel`));
        }
        

        let infobg = BaseBitmap.create(`servantequip_infobg`);
        view.addChildToContainer(infobg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infobg, progressbar, [0,progressbar.height+12]);

        let infoGroup = new BaseDisplayObjectContainer();
        infoGroup.width = 485;
        view._infoGroup = infoGroup;
        //信息说明
        let rankList = Config.ServantequiplCfg.rankList;
        let count = 0;
        for(let i in rankList){
            let unit = rankList[i];
            if(unit.attType || Number(i) == 1){
                let descgroup = new BaseDisplayObjectContainer();
                descgroup.width = 485;
                descgroup.height = 35;
                infoGroup.addChild(descgroup);
                descgroup.setPosition(0,35*count);
                descgroup.name = `descgroup${i}`;
    
                let addStr = ``;
                let upNum = ``;
                if(Number(i) == 1){
                    addStr = LanguageManager.getlocal(`servantInfo_speciality${equipid}`);
                }
                else{
                    if(unit.attType == 1){
                        addStr = LanguageManager.getlocal(`servantInfo_speciality${equipid}`);
                        upNum = unit.value + ``;
                    }
                    else{
                        addStr = LanguageManager.getlocal(`servant_equipattType${unit.attType}`);
                        upNum = (unit.value > 1 ? unit.value : `${(unit.value * 100).toFixed(0)}%`) + ''
                    }
                }
                let isunlock = quality >= Number(i);

                let nameTxt = ComponentManager.getTextField(addStr, 20, isunlock?0x410D00:TextFieldConst.COLOR_QUALITY_GRAY);
                nameTxt.name="nameTxt"+i;
                descgroup.addChild(nameTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, descgroup, [62, 0], true);
    
    
                let str = '';
                if(Number(i) == 1){
                    let cur = Config.ServantequiplCfg.getEquipAddvalue(equipid, quality, curlv);
                    str = cur+'';
                }
                else{
                    str = upNum;
                }
                let upTxt = ComponentManager.getTextField(str,20,isunlock?0x410D00:TextFieldConst.COLOR_QUALITY_GRAY);
                upTxt.name = `upTxt${i}`;
                descgroup.addChild(upTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, upTxt, nameTxt, [120, 0]);
    
                let lock = BaseBitmap.create(`servantequip_lock`);
                lock.name = `lock${i}`;
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, lock, descgroup, [94-30, 0], true);
    
                let arrow = BaseBitmap.create(`servantequip_arrow`);
                descgroup.addChild(arrow);
                arrow.name = `arrow${i}`;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, arrow, lock);   

                if(Number(i) == 1){
                    lock.visible = false;
                    arrow.visible = false;
                    // if(isMaxQuality){
                    //     arrow.visible = false;
                    // }
                    // else{
                    //     arrow.visible = true;
                    // }
                }
                else{
                    descgroup.addChild(lock);
                    lock.visible = !isunlock;
                    if(view._canqualityup && quality+1 == Number(i)){
                        arrow.visible = true;
                        lock.visible = false;
                    }
                    else{
                        arrow.visible = false;
                    }
                }
                let line = BaseBitmap.create(`servantequip_infoline`);
                descgroup.addChild(line);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, descgroup, [0,0], true);
                ++ count;
            }
        }

        let alphabg = BaseBitmap.create(`public_alphabg`);
        alphabg.width = infoGroup.width;
        alphabg.height = infoGroup.height;
        infoGroup.addChild(alphabg);

        let scrollview = ComponentManager.getScrollView(infoGroup, new egret.Rectangle(0,0,485,140));
        view.addChildToContainer(scrollview);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollview, infobg);

        let bg2:BaseBitmap = BaseBitmap.create("public_9v_bg12");
		bg2.width = 526;
		bg2.height = 280;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg2, bg, [0,bg.height+11]);
        view.addChildToContainer(bg2); 

        
        let qualityList=Config.ServantequiplCfg.getEquipItemsQulaityListByEid(view._equipid)
        qualityList.sort((a,b)=>{
            return Number(a)-Number(b);
        });
        let qL=qualityList.length;
        for(let i = 0; i < qL; ++ i){
            let tquality=Number(qualityList[i]);
            let select = BaseBitmap.create(`servantequip_select`);
            let qualitySel = ComponentManager.getButton(`servantequip_selquality${tquality}`, ``, (select:BaseBitmap,tquality:number)=>{
                // todo guide
                if (Api.rookieVoApi.curGuideKey == "upequip") {
                    Api.rookieVoApi.checkNextStep();
                }
                if(view._canqualityup||view._isMaxLvAndMaxQulaity)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal("servantEquipMaxExpTip"));
                    return;
                }

                select.visible = !select.visible;

                let itemData=Config.ServantequiplCfg.getEquipItemData(equipid,tquality);
                let itemId=itemData.itemId;
                let ownNum=Api.itemVoApi.getItemNumInfoVoById(itemId);
                if(select.visible)
                {
                    let itemExp=itemData.getExp;
                    let nexQualityCostExp=Api.servantVoApi.getNextQualityCostExp(view._servantId,view._equipid);
                    let curAllExp=Api.servantVoApi.getCurTotalAddExp();
                    let diffExp=nexQualityCostExp-curAllExp;
                    if(diffExp>0)
                    {
                        let usedNum=Api.servantVoApi.getEquipItemSelectNum(String(itemId));
                        let needNum=Math.max(Math.ceil(diffExp/itemExp),0);
                        needNum=Math.min(ownNum-usedNum,needNum);
                        Api.servantVoApi.checkAddEquipExp(view._servantId,equipid,String(itemId),needNum);
                        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTALL_EQUIPITEM,itemId);
                    }
                    else
                    {
                        App.CommonUtil.showTip(LanguageManager.getlocal("servantEquipMaxExpTip"));
                        select.visible=false;
                    }
                }
                else
                {
                    Api.servantVoApi.checkAddEquipExp(view._servantId,equipid,String(itemId),-ownNum);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SELECTALL_EQUIPITEM,itemId);
                }

                view.freshList();
            }, view,[select,tquality]);
            qualitySel.setPosition(bg2.x+183+(48+22-10)*i-20,bg2.y+10);
            qualitySel.name="qualitySel"+tquality;
            view.addChildToContainer(qualitySel); 
            select.setPosition(qualitySel.width*0.5-select.width*0.5,qualitySel.height*0.5-select.height*0.5);
            select.name="select";
            qualitySel.addChild(select);
            select.visible=false;
        }

        let itemlistbg = BaseBitmap.create(`public_lvupcenter`);
        itemlistbg.width = 495;
		itemlistbg.height = 198;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemlistbg, bg2, [0,63]);
        view.addChildToContainer(itemlistbg); 
        //强化材料
        let arr = Config.ServantequiplCfg.getCostEquipItem(equipid);
        let listParam={sid:view._servantId,eid:view._equipid,equipParams:Api.servantVoApi.equipParams};
        let list = ComponentManager.getScrollList(ServantEquipCostItem, arr, new egret.Rectangle(0,0,495,183),listParam);
        view.addChildToContainer(list); 
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, itemlistbg, [15,10]);
        view._list = list;

        let btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"servantEquipStrenghthen",()=>{
            // todo guide
            if (Api.rookieVoApi.curGuideKey == "upequip") {
                Api.rookieVoApi.checkNextStep();
            }
            if(!view._canqualityup && !Object.keys(Api.servantVoApi.equipParams).length){
                App.CommonUtil.showTip(LanguageManager.getlocal("servantEquipLvNotSelectTip"));
                return;
            }
            let quality = Api.servantVoApi.getEquipQuality(servantId, equipid);
            if(view._canqualityup){
                let servantinfo = Api.servantVoApi.getServantObj(servantId);
                let needUpLv=Config.ServantequiplCfg.getUpLv(quality);
                if(servantinfo.clv<needUpLv)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`servantEquipQuliatyNotUp`,[LanguageManager.getlocal("servant_clvStr"+needUpLv)]));
                    return;
                }
            }
            let curlv = Api.servantVoApi.getEquipAddLv(servantId, equipid);
            
            let isMaxQuality = Api.servantVoApi.checkEquipMaxQuality(servantId,equipid);
            let maxLvFull=(Api.servantVoApi.getNextQualityCostExp(servantId,equipid)<=0);
            if(isMaxQuality&&maxLvFull){
                App.CommonUtil.showTip(LanguageManager.getlocal(`promotion_topLevel`));
                return;
            }
            if(view._canqualityup){
                NetManager.request(NetRequestConst.REQUEST_SERVANT_EQUIPQUALITYUP, {
                    servantId : String(view._servantId),
                    equipType : Number(view._equipid)
                });
            }
            else{
                if(view._isStackflow){
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                        title:"itemUseConstPopupViewTitle",
                        msg:LanguageManager.getlocal(`servant_equipTip1`),
                        callback:()=>{
                            NetManager.request(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, {
                                servantId : view._servantId,
                                equipArr : Api.servantVoApi.equipParams,
                            });
                        },
                        handler:view,
                        needCancel:true
                    });
                }
                else{
                    NetManager.request(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, {
                        servantId : view._servantId,
                        equipArr : Api.servantVoApi.equipParams,
                    });
                }
            }
        },this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg2, [0, bg2.height+8]);
        view.addChildToContainer(btn); 
        view._btn = btn;
        btn.visible=view._canqualityup;
        btn.setText(view._canqualityup ? `servantEquipBreak` : `servantEquipStrenghthen`, true);

        let selectTipTxt=ComponentManager.getTextField(LanguageManager.getlocal((view._isMaxLvAndMaxQulaity||view._canqualityup)?"servantEquipMaxExpTip":"servantEquipSelectTip"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW);
        selectTipTxt.width=400;
        selectTipTxt.textAlign=egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, selectTipTxt, bg2, [0, bg2.height+38]);
        view.addChildToContainer(selectTipTxt);
        view._selectTipTxt=selectTipTxt;
        selectTipTxt.visible=!btn.visible;

        this.setGroupVisible(view._canqualityup);
    }

    private freshList():void{
        let view = this;
        let equipid = view.param.data.eid
        let list = view._list;
        let arr = Config.ServantequiplCfg.getCostEquipItem(equipid);
        
        let listParam={sid:view._servantId,eid:view._equipid,equipParams:Api.servantVoApi.equipParams};
        list.refreshData(arr,listParam);
        view._btn.visible=view._canqualityup;
        view._selectTipTxt.visible=!view._btn.visible;
        if(!view._canqualityup)
        {
            view.calExp();
        }
    }
    
    private creatIcon(equipId : string, lv : number, quality : number, isleft?):BaseDisplayObjectContainer{
        let view = this;
        let group = new BaseDisplayObjectContainer();
        group.width = 113;
        group.height = 170;

        let cfg = Config.ServantCfg.getServantItemById(view._servantId);
        //分文武
        let itembg = BaseBitmap.create(`servant_equip_iconbg`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itembg, group);
        group.addChild(itembg); 
        
        let qulitybg= BaseBitmap.create(`servant_equip_iconqulaity${quality}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, qulitybg, itembg);
        group.addChild(qulitybg); 
        if(isleft){
            view._nextLvQulaityBg = qulitybg;
        }
        else{
            view._curLvQulaityBg = qulitybg;
        }

		let item = BaseBitmap.create(`servant_equip${cfg.getServantType()}_icon${equipId}`); 
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, item, itembg);
        group.addChild(item); 
        
        let lvbg = BaseBitmap.create(`servant_equip_numbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lvbg, itembg, [0,104]);
        group.addChild(lvbg); 

        let str = '';
        if(this._isMaxLvAndMaxQulaity)
        {
            str = `Max`;//LanguageManager.getlocal(`promotion_topLevel`) 
        }
        else{
            str = `+${lv}`;
        }

		let lvTxt = ComponentManager.getTextField(str, 22, 0xFEFEFE);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lvTxt, lvbg, [0,4]);
        group.addChild(lvTxt);
        if(isleft){
            view._nextLvTxt = lvTxt;
        }
        else{
            view._curLvTxt = lvTxt;
        }

        let itemNameTxt = ComponentManager.getTextField("",22,0x410D00);
        itemNameTxt.text = LanguageManager.getlocal(`servant_equip${cfg.getServantType()}_${equipId}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemNameTxt, lvbg, [0,lvbg.height+5]);
        group.addChild(itemNameTxt);

        return group;
    }

    protected getResourceList():string[]{
        return [`servantequip`,`progress_type3_bg`,`progress_type3_yellow`,];
    }

    private chooseEquip(evt : egret.Event):void
    {
        let view = this;
        if(view._canqualityup)
        {
            return;
        }
        let add:number=0;
        if(evt.data){
            let id = evt.data.id;
            // let num = evt.data.num;
            add = evt.data.add;
            let quality = Config.ItemCfg.getItemCfgById(id).quality;

            let selName="qualitySel"+quality;
            let button:BaseButton = <BaseButton>this.container.getChildByName(selName);
            let select:BaseBitmap;
            if(button)
            {
                select=<BaseBitmap>button.getChildByName("select");
            }
            if(add>0)
            {
                let num=Api.servantVoApi.getEquipItemSelectNum(id);
                let ownNum=Api.itemVoApi.getItemNumInfoVoById(id);
                if(num>=ownNum)
                {
                    select&&(select.visible=true);
                }
            }
            else if(add<0)
            {
                select&&(select.visible=false);
            }
        }
        view.calExp(add);

        // if (Api.rookieVoApi.curGuideKey == "upequip") {
		// 	Api.rookieVoApi.checkNextStep();
		// }
    }

    private calExp(addType?:number):void{
        let view = this;
        let totalexp=Api.servantVoApi.getCurTotalAddExp();
        this.setGroupVisible(view._canqualityup?true:totalexp>0);
        view._btn.visible=totalexp>0;
        view._selectTipTxt.visible=!view._btn.visible;
        view._selectTipTxt.setString(LanguageManager.getlocal((view._isMaxLvAndMaxQulaity||view._canqualityup)?"servantEquipMaxExpTip":"servantEquipSelectTip"));
        let curvalue = Api.servantVoApi.getEquipCurExp(view._servantId, view._equipid);
        let quality = Api.servantVoApi.getEquipQuality(view._servantId, view._equipid);
        let curlv = Api.servantVoApi.getEquipAddLv(view._servantId, view._equipid);
        // let isMaxQuality = Api.servantVoApi.checkEquipMaxQuality(view._servantId,view._equipid);
        // if(!isMaxQuality){
            let calaftterInfo = Config.ServantequiplCfg.calExpProgress(totalexp+curvalue, quality, curlv);
            // if(totalexp == 0){
            //     calaftterInfo.nextlv = calaftterInfo.isBroke ? 0 : curlv + 1;
            // }
            view.freshView(totalexp, calaftterInfo,addType);
        // }     
    }

    private setGroupVisible(visible:boolean):void
    {
        if(this._leftGroup)
        {
            // this._leftGroup.visible=visible;
            this._rightGroup.visible=visible;
            this._arrow.visible=visible;
            if(visible)
            {
                this._leftGroup.x=this._leftGroup.y=0;
            }
            else
            {
                this._leftGroup.x=this._arrow.x+(this._arrow.width-this._leftGroup.width)*0.5;
            }
        }
    }
    
    private freshView(totalexp : number, info : {toLv:number,leftExp:number,maxLvAndQuality:boolean},addType?:number):void{
        let view = this;
        let curlv = Api.servantVoApi.getEquipAddLv(view._servantId, view._equipid);
        let quality = Api.servantVoApi.getEquipQuality(view._servantId,view._equipid);

        let ismax = info.maxLvAndQuality; 
        
        // let cfg = Config.ServantCfg.getServantItemById(view._servantId);
        // let canQualityUp = info.nextquality > quality;
        
        let qulitybg = `servant_equip_iconqulaity${quality}`;
		view._nextLvQulaityBg.setRes(qulitybg)

        let str = '';
        if(ismax){
            str = `Max`;//LanguageManager.getlocal(`promotion_topLevel`) 
        }
        else{
            str = `+${info.toLv}`;
        }

        view._nextLvTxt.text = str;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._nextLvTxt, view._nextLvQulaityBg);


        // let t2 = Api.servantVoApi.getLvupNeedEquipExp(view._servantId, view._equipid, quality, info.toLv);
        let needvalue = ismax ? 0 : Config.ServantequiplCfg.getNextNeedEquipExp(quality, info.toLv+1);
        let lvMaxNeedExp=Api.servantVoApi.getNextQualityCostExp(view._servantId,view._equipid);
        view._isStackflow = totalexp>lvMaxNeedExp;
        if(!ismax){
            let num = info.leftExp;
            // if(num <  needvalue && !info.isBroke){
            //     needvalue = ismax ? 0 : Config.ServantequiplCfg.getNextNeedValue(quality, info.nextlv);
            // }
            // view._progress.setPercentage(num/needvalue);
            let ruduce=addType<0;
            let step=0;
            if(view._progress['toLv']!=info.toLv)
            {
                step=1;
            }
            view._progress.tweenTo(num/needvalue,100,step,null,null,ruduce,true);
            view._progress['toLv']=info.toLv;
            view._progress.setText(`${num}/${needvalue}`);
        }
        else{
            view._progress.setPercentage(1);
            view._progress.setText(LanguageManager.getlocal(`promotion_topLevel`));
        }

        let rankList = Config.ServantequiplCfg.rankList;
        let count = 0;
        for(let i in rankList){
            let unit = rankList[i];
            if(unit.attType || Number(i) == 1){
                let descgroup = <BaseDisplayObjectContainer>view._infoGroup.getChildByName(`descgroup${i}`);
                let addStr = ``;
                let upNum = ``;
                if(Number(i) == 1){
                    addStr = LanguageManager.getlocal(`servantInfo_speciality${view._equipid}`);
                    let arrow = descgroup.getChildByName(`arrow${i}`);
                    arrow.visible=info.toLv>curlv;
                }
                else{
                    if(unit.attType == 1){
                        addStr = LanguageManager.getlocal(`servantInfo_speciality${view._equipid}`);
                        upNum = unit.value + ``;
                    }
                    else{
                        addStr = LanguageManager.getlocal(`servant_equipattType${unit.attType}`);
                        upNum = (unit.value > 1 ? unit.value : `${(unit.value * 100).toFixed(0)}%`) + ''
                    }
                }

                let nameTxt = descgroup.getChildByName(`nameTxt${i}`);
                let isunlock = quality >= Number(i);
                let newstr = '';
                if(Number(i) == 1){
                    let cur = Config.ServantequiplCfg.getEquipAddvalue(view._equipid, quality, curlv);
                    let next = Config.ServantequiplCfg.getEquipAddvalue(view._equipid, quality, info.toLv);
                    newstr = ismax ? cur+'' : `${cur}${(isunlock&&(next - cur)>0) ? `<font color=0x359270>（+${next - cur}）</font>` : ``}`
                }
                else{
                    newstr = upNum;
                }
                
                if(info.toLv >= 0){
                    let upTxt = <BaseTextField>descgroup.getChildByName(`upTxt${i}`);
                    upTxt.text = newstr;
                }
                

                // let lock = descgroup.getChildByName(`lock${i}`);
                // let arrow = descgroup.getChildByName(`arrow${i}`);
                // if(Number(i) == 1){
                // }
                // else{
                //     lock.visible = !isunlock;
                //     // if(info.nextquality > quality && info.nextquality == Number(i)){
                //     //     arrow.visible = true;
                //     //     lock.visible = false;
                //     // }
                //     // else{
                //     //     arrow.visible = false;
                //     // }
                // }
            }
        }
    }

    private equipLevelCallback(evt : egret.Event){
        let view = this;
        if(evt.data.ret){
            Api.servantVoApi.clearEquipItemsNum();
            let qualityList=Config.ServantequiplCfg.getEquipItemsQulaityListByEid(view._equipid)
            qualityList.sort((a,b)=>{
                return Number(a)-Number(b);
            });
            let qL=qualityList.length;
            for(let i = 0; i < qL; ++ i)
            {
                let tquality = qualityList[i];
                let name="qualitySel"+tquality;
                let btn = <BaseButton>this.container.getChildByName(name);
                if(btn)
                {
                    let select = btn.getChildByName("select")
                    if(select)
                    {
                        select.visible=false;
                    }
                }

            }
            view.freshAfterLevelup();
        }
    }

    private equipQualityCallback(evt : egret.Event){
        let view = this;
        if(evt.data.ret){
            view.freshAfterLevelup(true);
        }
    }

    private freshAfterLevelup(qualityup?:boolean):void{
        let view = this;
        let curlv = Api.servantVoApi.getEquipAddLv(view._servantId, view._equipid);
        let maxLv=Api.servantVoApi.checkEquipMaxLv(view._servantId,view._equipid);
        let quality = Api.servantVoApi.getEquipQuality(view._servantId, view._equipid);
        let isMaxQualityAndLv = Api.servantVoApi.checkEquipMaxQualityAndLv(view._servantId,view._equipid);
        // let ismax = quality == 6;

        let curvalue = Api.servantVoApi.getEquipCurExp(view._servantId, view._equipid);
        let needvalue = isMaxQualityAndLv ? 0 : Api.servantVoApi.getLvupNeedEquipExp(view._servantId,view._equipid,quality);
        // view._canqualityup = isMaxQualityAndLv ? false : (curvalue >= Config.ServantequiplCfg.getEquipQualityBreakExp(quality) && curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality));
        view._canqualityup=isMaxQualityAndLv?false:Api.servantVoApi.getNextQualityCostExp(view._servantId,view._equipid)<=0;
        if(view._canqualityup)
        {
        }
        view._isMaxLvAndMaxQulaity=isMaxQualityAndLv;

        let str = '';
        if(isMaxQualityAndLv){
            str = `Max`;//LanguageManager.getlocal(`promotion_topLevel`) 
        }
        else{
            str = `+${curlv}`;
        }
        view._curLvTxt.text = str;
        view._curLvQulaityBg.setRes(`servant_equip_iconqulaity${quality}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._curLvTxt, view._curLvQulaityBg);

        view._nextLvTxt.text = isMaxQualityAndLv ? str : `+${curlv+1}`;
        // let isbroke = curlv == Config.ServantequiplCfg.getEquipQualityMaxLv(quality);
        if(view._canqualityup){
            view._nextLvTxt.text = `+0`
            view._nextLvQulaityBg.setRes(`servant_equip_iconqulaity${quality+1}`);
            // let curvalue = Api.servantVoApi.getEquipCurExp(view._servantId, view._equipid);
            needvalue = isMaxQualityAndLv ? 0 : needvalue;

            if(!isMaxQualityAndLv){
                view._progress.setPercentage(Math.min(needvalue, curvalue)/needvalue);
                view._progress.setText(`${Math.min(needvalue, curvalue)}/${needvalue}`);
            }
            else{
                view._progress.setPercentage(1);
                view._progress.setText(LanguageManager.getlocal(`promotion_topLevel`));
            }
        }
        view._btn.setText(view._canqualityup ? `servantEquipBreak` : `servantEquipStrenghthen`, true)
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, view._nextLvTxt, view._nextLvQulaityBg);

        let rankList = Config.ServantequiplCfg.rankList;
        for(let i in rankList){
            let unit = rankList[i];
            if(unit.attType || Number(i) == 1){
                let descgroup = <BaseDisplayObjectContainer>view._infoGroup.getChildByName(`descgroup${i}`);
                let lock = descgroup.getChildByName(`lock${i}`);
                let arrow = descgroup.getChildByName(`arrow${i}`);
                let upTxt = <BaseTextField>descgroup.getChildByName(`upTxt${i}`);
                let nameTxt = <BaseTextField>descgroup.getChildByName(`nameTxt${i}`);
                let isunlock = quality >= Number(i);
                if(Number(i) == 1){
                    let cur = Config.ServantequiplCfg.getEquipAddvalue(view._equipid, quality, curlv);
                    upTxt.text = cur+"";
                    arrow.visible=false;
                }
                else{
                    lock.visible = !isunlock;
                    if(qualityup)
                    {
                        let upLv=Config.ServantequiplCfg.getUpLv(quality-1);
                        let servantinfo = Api.servantVoApi.getServantObj(view._servantId);
                        if(servantinfo.clv>=upLv&&Number(i)==quality)
                        {
                            arrow.visible = false;
                            lock.visible = false;
                            upTxt.setColor(isunlock?0x410D00:TextFieldConst.COLOR_QUALITY_GRAY);
                            nameTxt.setColor(isunlock?0x410D00:TextFieldConst.COLOR_QUALITY_GRAY);
                        }
                    }
                    else
                    {
                        if(Number(i)==quality+1&&maxLv)
                        {
                            arrow.visible = true;
                            lock.visible = false;
                            nameTxt.setColor(isunlock?0x410D00:TextFieldConst.COLOR_QUALITY_GRAY);
                        }
                        else
                        {
                            arrow.visible = false;
                        }
                    }
                }
            }
        }

        if(!isMaxQualityAndLv){
            view._progress.setPercentage(curvalue/needvalue);
            view._progress.setText(`${curvalue}/${needvalue}`);
        }
        else{
            view._progress.setPercentage(1);
            view._progress.setText(LanguageManager.getlocal(`promotion_topLevel`));
        }
        view.freshList();

        Api.servantVoApi.equipParams = {};
    }

    public dispose()
    {
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.EQUIP_REVOLUTION_CHOOSE,view.chooseEquip,view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPLEVELUP, view.equipLevelCallback, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_EQUIPQUALITYUP, view.equipQualityCallback, view);
        view._servantId = '';
        view._equipid = 1;
        view._list = null;
        Api.servantVoApi.equipParams={};
        view._nextLvTxt = null;
        view._nextLvQulaityBg = null;
        view._progress = null;
        view._infoGroup = null;
        view._isStackflow = false;
        view._canqualityup = false;

        view._curLvTxt  = null;
        view._curLvQulaityBg = null;
        view._btn  = null;
        view._leftGroup=null;
        view._rightGroup=null;
        view._arrow=null;
        view._isMaxLvAndMaxQulaity=false;
        view._selectTipTxt=null;
        super.dispose();
    }
}