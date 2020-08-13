/**
 *  门客布阵item
 * author qianjun
 */
class ZhenqifangServantItem  extends ScrollListItem
{
    public constructor()
    {
        super();
    }

    private _info_g : BaseDisplayObjectContainer = null;
    private _cardbg : BaseLoadBitmap = null;
    private _servantImg : BaseLoadBitmap = null;
    private _delBtn : BaseButton = null; 
    private _data : any;
    private _curServantId : number;
    private _itemIndex : string = ``;
    private _empty_g : BaseDisplayObjectContainer = null;
    private _addIcon : BaseBitmap = null;
    private _selectIcon : BaseBitmap = null;
    private _notTxt : BaseTextField = null;
    private _needTxt : BaseTextField = null;
    private _sxbg : BaseBitmap = null;
    private _uid : number = 0;
    public _freind;
    public _times;

    protected initItem(index:number,data:any)
    {
        let view = this;
        view.cacheAsBitmap=true;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SERVANT,this.checkBuzhen,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SELECT,this.checkSelect,this);
        
        view._data = data;
        view._itemIndex = `${data.index}_${index}_${data.friend}`;
        view.width = data.onlyshow ? (97 + 3) : (85 + 8);
        view.height = data.onlyshow ? 97 : 85;

        //门客信息
        view._curServantId = Number(data.servantID);
        let servantInfoObj : ServantInfoVo = Api.servantVoApi.getServantObj(data.servantID);
        let servantQuality = '';
        let servantPic = '';
        let addIcon = BaseBitmap.create("childview_addicon");
        addIcon.setScale(data.onlyshow ? 0.97 : 0.85);
        view._addIcon = addIcon;
      

        if(data.empty){
            servantQuality = `servant_cardbg_0`;
            // servantPic = `childview_addicon`;
            addIcon.visible = true;
        }
        else{
            if(data.needfriend){
                let equip = ``;
                if(!data.equip || data.equip == ""){
                    equip = "servant_half_" + data.servantId;
                }
                else{
                    let skincfg = Config.ServantskinCfg.getServantSkinItemById(data.equip);
                    equip = skincfg.icon;
                }
                servantQuality = "servant_cardbg_" + data.clv;
                servantPic = equip;
            }
            else{
                servantQuality = servantInfoObj.qualityBoxImgPath;
                servantPic = servantInfoObj.halfImgPath;
            }

            addIcon.visible = false;
        }

        let cardbg = BaseLoadBitmap.create(servantQuality);
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.anchorOffsetX = cardbg.width / 2;
        cardbg.anchorOffsetY = cardbg.height / 2;
        cardbg.setScale(view.height/194);
        cardbg.x = cardbg.anchorOffsetX * cardbg.scaleX;
        cardbg.y = cardbg.anchorOffsetY * cardbg.scaleY;
        view.addChild(cardbg);
        view._cardbg = cardbg;
        cardbg.addTouchTap(view.servantTouch,view);
        
        

        addIcon.x = data.onlyshow ? 19 : 16;
        addIcon.y = data.onlyshow ? 19 : 16;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addIcon, cardbg);
        
        view._servantImg = BaseLoadBitmap.create(servantPic);
        view._servantImg.width = 180;
        view._servantImg.height = 177;
        view._servantImg.anchorOffsetX = view._servantImg.width / 2;
        view._servantImg.anchorOffsetY = view._servantImg.height / 2;
        view._servantImg.setScale((view.height - 7)/180);
        view.addChild(view._servantImg);
        view._servantImg.x = cardbg.x;
        view._servantImg.y = cardbg.y;
        view._servantImg.addTouchTap(view.servantTouch,view);
        
        

        view._empty_g = new BaseDisplayObjectContainer();
        view._empty_g.width = view.width;
        view._empty_g.height = view.height;
        view.addChild(view._empty_g);

        view._info_g = new BaseDisplayObjectContainer();
        view._info_g.width = view.width;
        view._info_g.height = view.height;
        view.addChild(view._info_g);

        view.addChild(addIcon);

        let needcfg = data;
        if(needcfg.note){
            let sxbg = BaseBitmap.create(`battlepassfntbg-1`);
            sxbg.width = view.height;
            view.addChild(sxbg);
            view._sxbg = sxbg;
            sxbg.x = 0;
            sxbg.y = data.onlyshow ? 65 : 57;

            let needTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangnote${needcfg.note}`, [`${needcfg.requirement}`]), 18, TextFieldConst.COLOR_WARN_RED3);
            view.addChild(needTxt);
            view._needTxt = needTxt;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, needTxt, sxbg);

            let notTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangnotmanzu`), 18, TextFieldConst.COLOR_WARN_RED3);
            view.addChild(notTxt);
            view._notTxt = notTxt;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, notTxt, sxbg);

            if(data.empty){
                sxbg.visible = needTxt.visible = true;
                notTxt.visible = false;
            }
            else{
                sxbg.visible = needTxt.visible = notTxt.visible = false;
                let flag = false;
                if(data.needfriend){
                    flag = data.deduction > 0;
                }
                else{
                    flag = servantInfoObj[needcfg.note] < needcfg.requirement[index]
                }
                if(flag){
                    sxbg.visible = notTxt.visible = true;
                }
            }
        }

        let selectbg = BaseBitmap.create(`itembg_selected`);
        selectbg.setScale(0.9);
        view.addChild(selectbg);

        let delbtn = ComponentManager.getButton("discussclose",``,()=>{
            if(data.needfriend){
                if(!Api.zhenqifangVoApi.friendsendList[view._uid]){
                    Api.zhenqifangVoApi.friendsendList[view._uid] = {};
                }
                if(Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId]){
                    delete Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId];
                }
                if(Api.zhenqifangVoApi.friendobj[view._data.tabindex]){
                    delete Api.zhenqifangVoApi.friendobj[view._data.tabindex][view._index];
                }
            }
            else{
                if(Api.zhenqifangVoApi.sendList.indexOf(view._curServantId) > -1){
                    Api.zhenqifangVoApi.sendList.splice(Api.zhenqifangVoApi.sendList.indexOf(view._curServantId), 1);
                }
            }
           
            view.clearServant(true);
        },view);
        delbtn.setScale(data.onlyshow ? 0.97 : 0.85);
        delbtn.x = data.onlyshow ? 71 : 65;;
        delbtn.y = -6;
        view.addChild(delbtn);
        view._delBtn = delbtn;

        if(!data.empty){
            view._empty_g.visible = false;
            view._info_g.visible = true;
            view._delBtn.visible = true;
            view.fresh_servant({id:data.servantID, clv : data.clv, equip : data.equip}, false, true);
        }
        else{
            view._empty_g.visible = true;
            view._info_g.visible = false;
            view._delBtn.visible = false;
        }

        selectbg.visible = false;

        if(data.friend && data.needfriend){
            let friendicon = BaseBitmap.create(`zqffriendicon`);
            friendicon.x = 0;
            friendicon.y = -8;
            view.addChild(friendicon);
        }
        view._selectIcon = selectbg;
        let isinevent = data.insend;
        if(isinevent){
            view._delBtn.visible = false;
        }
    }

    public setSelect(bool : boolean):void{
        if(this._data.onlyshow){
            this._selectIcon.visible = bool;
        }
    }

    public getUid():number{
        let uid = 0;
        let view = this;
        if(view._data.friend && view._data.needfriend && view._uid){
            uid = view._uid;
        }
        return uid;
    }

    //能否领取全部奖励
    public checkIsNotAllReward():boolean{
        let view = this;
        let flag = view._notTxt && view._notTxt.visible;
        return flag;
    }

    public addServant(params):void{
        let view = this;
        view._servantImg.visible = true;
        view._servantImg.alpha = 1;
        let data = view._data;
        let servantId:number=Number(params.id);
        let uid = params.uid;
        view._uid = uid;
        view._curServantId = servantId;

        let servantInfoObj : ServantInfoVo = Api.servantVoApi.getServantObj(params.id);
        //品质 头像 名称
        let servantQuality = '';
        let servantPic = '';
        if(data.needfriend){
            let equip = ``;
            if(!params.equip || params.equip == ""){
                equip = "servant_half_" + servantId;
            }
            else{
                let skincfg = Config.ServantskinCfg.getServantSkinItemById(params.equip);
                equip = skincfg.icon;
            }
            servantQuality = "servant_cardbg_" + params.clv;
            servantPic = equip;
        }

        view._cardbg.setload(servantQuality);
        view._servantImg.setload(servantPic);
        view._info_g.visible = true;
        view._delBtn.visible = true;
        let isinevent = data.insend;
        if(isinevent){
            view._delBtn.visible = false;
        }
        view._servantImg.setPosition(view._cardbg.x,view._cardbg.y);
        view._addIcon.visible = false;
        if(view._sxbg){
            view._sxbg.visible = view._needTxt.visible = view._notTxt.visible = false;
        }
        let needcfg = data;
        if(needcfg.note){
            if(data.needfriend){
                if(data.insend){
                    if(data.deduction && data.deduction > 0){
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
                else{
                    if(params.value < needcfg.requirement){
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
            }
            view._needTxt.text = LanguageManager.getlocal(`zhenqifangnote${needcfg.note}`, [`${needcfg.requirement}`]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._needTxt, view._sxbg);
            view.setChildIndex(view._sxbg, 999);
            view.setChildIndex(view._notTxt, 999);
            view.setChildIndex(view._needTxt,999);
        }
        view._freind = params.freind;
        view._times = params.times;

    }

    public fresh_servant(params:{id:string, uid?:number, clv?:number, equip?:string, value?:number, freind?:any, times?:any}, bool : boolean = true, init : boolean = false):void{
        let view = this;
        if(params.uid > 0){
            // let baseview : any = ViewController.getInstance().getView(ViewConst.COMMON.ZHENQIFANGVIEW);
            // let commViewTab:ZhenqifangViewTab2=<ZhenqifangViewTab2>baseview.tabViewData[1];
            if(1){
                let data = Api.zhenqifangVoApi.friendobj;
                let count = 0;
                for(let i in data){
                    for(let j in data[i]){
                        let unit = data[i][j];
                        if(unit && unit.uid == params.uid){
                            ++ count;
                        }
                    }
                }
                //commViewTab.getServantNumByUid(params.uid);
                let total = Config.ZhenqifangCfg.friend.supportTimes;
                let cur = Api.zhenqifangVoApi.getFriendSupportTimes(params.uid);
                if(cur >= total || (cur + count + 1) > total){
                    App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip15", [total]));
                    return;
                }
            }
        }
        view._servantImg.visible = true;
        view._servantImg.alpha = 1;
        let data = view._data;
        let servantId:number=Number(params.id);
        let uid = params.uid;
        
        if(view._curServantId){
            if(data.needfriend){
                if(!Api.zhenqifangVoApi.friendsendList[view._uid]){
                    Api.zhenqifangVoApi.friendsendList[view._uid] = {};
                }
                if(Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId]){
                    delete Api.zhenqifangVoApi.friendsendList[view._uid][view._curServantId];
                }
            }
            else{
                if(Api.zhenqifangVoApi.sendList.indexOf(view._curServantId) > -1){
                    Api.zhenqifangVoApi.sendList.splice(Api.zhenqifangVoApi.sendList.indexOf(view._curServantId), 1);
                }
            }
        }
        view._uid = uid;
        view._curServantId = servantId;
        if(data.needfriend){
            if(!Api.zhenqifangVoApi.friendsendList[uid]){
                Api.zhenqifangVoApi.friendsendList[uid] = {};
            }
            if(!Api.zhenqifangVoApi.friendsendList[uid][servantId]){
                Api.zhenqifangVoApi.friendsendList[uid][servantId] = 1;
            }
            Api.zhenqifangVoApi.friendobj[view._data.tabindex][view._index] = params;
        }
        else{
            if(Api.zhenqifangVoApi.sendList.indexOf(Number(servantId)) == -1){
                Api.zhenqifangVoApi.sendList.push(Number(servantId));
            }
        }
        let servantInfoObj : ServantInfoVo = Api.servantVoApi.getServantObj(servantId.toString());
        //品质 头像 名称
        let servantQuality = '';
        let servantPic = '';
        if(data.needfriend){
            let equip = ``;
            if(!params.equip || params.equip == ""){
                equip = "servant_half_" + servantId;
            }
            else{
                let skincfg = Config.ServantskinCfg.getServantSkinItemById(params.equip);
                equip = skincfg.icon;
            }
            servantQuality = "servant_cardbg_" + params.clv;
            servantPic = equip;
        }
        else{
            servantQuality = servantInfoObj.qualityBoxImgPath;
            servantPic = servantInfoObj.halfImgPath;
        }

        view._cardbg.setload(servantQuality);
        view._servantImg.setload(servantPic);
        view._info_g.visible = true;
        view._delBtn.visible = true;
        let isinevent = data.insend;
        if(isinevent){
            view._delBtn.visible = false;
        }
        view._servantImg.setPosition(view._cardbg.x,view._cardbg.y);
        view._addIcon.visible = false;
        if(view._sxbg){
            view._sxbg.visible = view._needTxt.visible = view._notTxt.visible = false;
        }
        let needcfg = data;
        if(needcfg.note){
            if(data.needfriend){
                if(data.insend){
                    if(data.deduction && data.deduction > 0){
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
                else{
                    if(params.value < needcfg.requirement){
                        view._sxbg.visible = view._notTxt.visible = true;
                    }
                }
            }
            else{
                if(servantInfoObj[needcfg.note] < needcfg.requirement){
                    view._sxbg.visible = view._notTxt.visible = true;
                }
            }
            view._needTxt.text = LanguageManager.getlocal(`zhenqifangnote${needcfg.note}`, [`${needcfg.requirement}`]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._needTxt, view._sxbg);
            view.setChildIndex(view._sxbg, 999);
            view.setChildIndex(view._notTxt, 999);
            view.setChildIndex(view._needTxt,999);
        }
        view._freind = params.freind;
        view._times = params.times;
        if(bool){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT,{itemIndex : view._itemIndex,servantId :servantId, uid:view._uid});
        }
        if(!init){
            //播放动画
            //出现
            // 门客动画：
            // 时间：0-0.13 缩放：3.3-1
            // 时间：0-0.07 缩放：50%-100%
            // liang动画：0.13-0.33，透明度：100%-0   模式是oneone
            // 消失：
            // 门客动画：
            // 时间：0-0.27 透明度100%-0，缩放1-1.3
            let tmpx = view._cardbg.scaleX;
            view._cardbg.alpha = view._servantImg.alpha = 0.5;
            view._delBtn.alpha = 0;
            view._cardbg.setScale(tmpx * 3.3);

            egret.Tween.get(view._cardbg).to({scaleX : tmpx, scaleY : tmpx}, 130).call(()=>{
                egret.Tween.removeTweens(view._cardbg);
            }, view);
            egret.Tween.get(view._cardbg).to({alpha : 1}, 70);

            let tmpx2 = view._servantImg.scaleX;
            view._servantImg.setScale(tmpx2 * 3.3);
            egret.Tween.get(view._servantImg).to({scaleX : tmpx2, scaleY : tmpx2}, 130).call(()=>{
                egret.Tween.removeTweens(view._servantImg);
            }, view);
            egret.Tween.get(view._servantImg).to({alpha : 1}, 70);

            let liang = BaseBitmap.create(`zqfliang`);
            liang.setScale(view.height/65);
            view.addChild(liang);
            liang.x = 0;
            liang.y = 0;
            liang.alpha = 0;
            egret.Tween.get(liang).wait(130).set({alpha : 1}).to({alpha : 0}, 200).call(()=>{
                egret.Tween.removeTweens(liang);
                view.removeChild(liang);
                liang = null;
                view._delBtn.alpha = 1;
            }, view);
        }
    }

    public setDelBtn(data):void{
        let view = this;
        view._data = data;
        this._delBtn.visible = false;
    }

    //下阵
    public clearServant(tween : boolean = false):void{
        let view = this;
        view._freind = null;
        view._uid = 0;
        if(tween){
            let tmpx2 = view._servantImg.scaleX;
            egret.Tween.get(view._servantImg).to({scaleX : tmpx2 * 1.3, scaleY : tmpx2 * 1.3, alpha : 0}, 270).call(()=>{
                egret.Tween.removeTweens(view._servantImg);
                view._servantImg.setScale(tmpx2);
                view._addIcon.visible = true;
                view._servantImg.visible = false;
                if(view._sxbg){
                    view._sxbg.visible = view._needTxt.visible = true;
                    view._notTxt.visible = false;
                    view._notTxt.visible = false;
                }
                view._cardbg.setload(`servant_cardbg_0`);
                
                view._servantImg.setPosition(view._cardbg.x,view._cardbg.y);;
                view._info_g.visible = false;
                view._delBtn.visible = false;
                view._empty_g.visible = true;
                view._curServantId = null;
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT);
            }, view);
        }
        else{
            view._addIcon.visible = true;
            view._servantImg.visible = false;
            if(view._sxbg){
                view._sxbg.visible = view._needTxt.visible = true;
                view._notTxt.visible = false;
                view._notTxt.visible = false;
            }
            view._cardbg.setload(`servant_cardbg_0`);
            
            view._servantImg.setPosition(view._cardbg.x,view._cardbg.y);
            view._info_g.visible = false;
            view._delBtn.visible = false;
            view._empty_g.visible = true;
            view._curServantId = null;
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SERVANT);
        }
    }

    private servantTouch():void{
        let view = this;
        let data = view._data;
        if(data.onlyshow){
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ZQF_SELECT, view._index);
        }
        else{
            let isinevent = data.insend;
            if(isinevent){
                return;
            }
            if(data.needfriend){
                //needFriend
                ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGSELECTFRIENDVIEW, {
                    data : data,
                    callback : this.fresh_servant,
                    callobj : view,
                    index : view._index,
                    tabindex : data.index,
                });
            }
            else{
                let allServantInfo = {};
                let allKey:string[] = Api.servantVoApi.getServantInfoIdListByProperty(data.type);
                let showTab:any[] = [];
                let needcfg = data;
    
                for (let k in allKey){
                    let key:string = allKey[k];
                    let mainAtr = 0;
                    let attr = '';
                    let servantInfoObj = Api.servantVoApi.getServantObj(key);
                    
                    if(needcfg.note){
                        mainAtr = servantInfoObj[needcfg.note];
                        attr = `zhenqifangnote${needcfg.note}`;  
                        showTab.push({
                            'servantId':key,
                            'text':LanguageManager.getlocal(attr),
                            'inBuzhen':Api.zhenqifangVoApi.haveInBuzhen(key),
                            'value':mainAtr,
                            'need' : needcfg.requirement,
                            insend : Api.zhenqifangVoApi.sendList.indexOf(Number(key)) > -1,
                        });
                    }
                    else{
                        mainAtr = servantInfoObj[`total`];
                        attr = `zhenqifangnotetotal`;  
                        showTab.push({
                            'servantId':key,
                            'text':LanguageManager.getlocal(attr),
                            'inBuzhen':Api.zhenqifangVoApi.haveInBuzhen(key),
                            'value':mainAtr,
                            insend : Api.zhenqifangVoApi.sendList.indexOf(Number(key)) > -1,
                        });
                    }
                    
                }
                if(Api.rookieVoApi.getIsGuiding()){
                    //a
                    showTab.sort((a,b)=>{
                        return Number(a.servantId) - Number(b.servantId);
                    });
                }
                else{
                    showTab.sort((a,b)=>{
                        if(a.inBuzhen && b.inBuzhen){
                            return b.value - a.value;
                        }
                        else if(a.inBuzhen){
                            return 1;
                        }
                        else if(b.inBuzhen){
                            return -1;
                        }
                        else{
                            return b.value - a.value;
                        }
                    });
                }
    
                ViewController.getInstance().openView(ViewConst.POPUP.ZHENQIFANGSELECTSERVANTVIEW,{
                    needtext : needcfg.note ? `${LanguageManager.getlocal(`zhenqifangnote${needcfg.note}`)} >= ${needcfg.requirement}` : null,
                    "info":showTab,
                    callback:this.fresh_servant,
                    handler:this,
                });
            }
        }
    }

    public get curServantId(): any {
        return this._curServantId;
    }
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 0;
    }

    private checkBuzhen(event:egret.Event):void{
        let data = event.data;
        let view = this;
        if(!data){
            return;
        }
        let isinevent = view._data.insend;
        if(isinevent){
           return;
        }
        if(data.clear){
            if(view._data.friend == data.friend){
                view.clearServant();
            }
        }
        else{
            if(data.servantId){
                if(view._itemIndex == data.itemIndex){
                    if(Api.rookieVoApi.getIsGuiding()){
                        Api.rookieVoApi.checkNextStep();
                    }
                    return;
                }

                let arr1 = view._itemIndex.split(`_`);
                let arr2 = data.itemIndex.split(`_`);
                if(view._data.needfriend){
                    //(Number(arr1[0])!= Number(arr2[0]))
                    if(Number(arr1[0]) == Number(arr2[0])){
                        if(view._curServantId == data.servantId && data.uid == view._uid){
                            view.clearServant(true);
                        }
                    }
                }
                else if(!data.uid){
                    if(view._curServantId == data.servantId){
                        view.clearServant(true); 
                    }
                }
            }
        }
    }

    public getSpaceX(): number {
		return 0;
    }
    
    private checkSelect(evt : egret.Event):void{
        if(this._index == evt.data){
            this.setSelect(true);
        }
        else{
            this.setSelect(false);
        }
    }

    public checkEmpty():boolean{
        return this._addIcon.visible;
    }
    
    public dispose():void
    {
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SERVANT,this.checkBuzhen,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SELECT,this.checkSelect,this);
        view.cacheAsBitmap=false;
        view._servantImg.removeTouchTap();
        view._cardbg.removeTouchTap();
        view._info_g.dispose();
        view._info_g = null;
        BaseLoadBitmap.release(view._cardbg);
        view._cardbg = null;
        BaseLoadBitmap.release(view._servantImg);
        view._servantImg = null;
        view._delBtn = null; 
        view._data = null;
        view._empty_g = null;
        view._addIcon = null;
        view._sxbg = null;
        view._notTxt = null;
        view._needTxt = null;
        view._uid = 0;
        view._freind = null;
        view._selectIcon = null;
        super.dispose();
    }
}
