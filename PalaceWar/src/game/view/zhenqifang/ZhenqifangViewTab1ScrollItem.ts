class ZhenqifangViewTab1ScrollItem extends ScrollListItem{
    private _data : any = null;
    private _cdTxt : BaseTextField = null;
    private _servantList : ScrollList = null;
    private _rewardsbg : BaseBitmap = null;
    private _rewardStrTxt: BaseTextField = null;
    private _changecostTxt: BaseTextField = null;
    private _needTxt: BaseTextField = null;
    private _sendbtn : BaseButton = null;
    private _changebtn : BaseButton = null;
    private _getbtn : BaseButton = null;
    private _listbg : BaseBitmap = null;
    private _collectflag : BaseBitmap = null;
    private _costGroup : BaseDisplayObjectContainer = null;
    private _sadunTxt : BaseTextField = null;

    public constructor() 
    {
        super();
    }

    protected initItem(index: number, data: any) {
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_SERVANT,this.checkBuzhen,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT,this.checkSelect,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND,this.checkSelect_friend,this);
        view.makeItem(index,data);
    }

    private makeItem(index: number, data: any):void{
        let view = this;
        view._data = data;
        view.width = 600;
        view.height = data.empty ? (180) : (360);

        let bg = BaseBitmap.create(data.empty ? `public_9_bg75` : `public_9_bg14`);
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);
        view._listbg = bg;

        if(data.empty){
            let lock = BaseBitmap.create(`zqflock`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lock, bg, [110,0]);
            view.addChild(lock); 

            let start = Api.zhenqifangVoApi.ZhenqifangTaskFreshTime;
            let endNum = start + Config.ZhenqifangCfg.individual.getFreeTask;
            let time = endNum - GameData.serverTime;
            let txt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangcdtip`, [App.DateUtil.getFormatBySecond(time)]), 18);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, bg, [0,20]);
            view.addChild(txt); 
            view._cdTxt = txt;

            //立即领取
            let rewardvo = GameData.formatRewardItem(Config.ZhenqifangCfg.individual.getTaskNeed)[0];
            let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `zhenqifangfabu`, ()=>{
                //
                
                let start = Api.zhenqifangVoApi.ZhenqifangTaskFreshTime;
                let endNum = start + Config.ZhenqifangCfg.individual.getFreeTask;
                let time = endNum - GameData.serverTime;
                let neednum = Math.ceil(time / single);
                let havenum = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
                if(neednum > havenum){
                    App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
                }
                else{
                    
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                        msg: LanguageManager.getlocal(`zhenqifangcdtip11`, [neednum.toString(), rewardvo.name]) ,
                        needCancel:true,
                        title:"confirmBtn",
                        callback:()=>{
                            Api.zhenqifangVoApi.freshlist = true;
                            NetManager.request(NetRequestConst.REQUEST_ZQF_GETITASK,{});
                        },
                        handler:view,
                        needClose : true,
                    });
                }
                
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, bg, [0,12]);
            view.addChild(btn); 

            let icon = BaseBitmap.create(`zqfitemicon2`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, btn, [12,-icon.height-5]);
            view.addChild(icon); 

            let single = Config.ZhenqifangCfg.individual.getTaskNum;
            let neednum = Math.ceil(time / single);
            let havenum = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
            let needTxt = ComponentManager.getTextField((`<font color=${neednum > havenum ? 0xff3c3c : 0xffffff}>${havenum}</font>/${neednum}`).toString(), 20);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, needTxt, icon, [icon.width,0]);
            view.addChild(needTxt); 
            view._needTxt = needTxt;
        }
        else{
            let titlebg = BaseBitmap.create(`zqfitemtitlebg`);
            view.addChild(titlebg);
            titlebg.x = 0;
            titlebg.y = 6;

            let sadunTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtip9`), 20, TextFieldConst.COLOR_BLACK);
            view.addChild(sadunTxt);
            sadunTxt.visible = false;
            view._sadunTxt = sadunTxt;
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, sadunTxt, bg, [20, 25]);

            let time = data.time;

            let leveltype = BaseBitmap.create(`zqf${App.StringUtil.firstCharToLower(data.type)}level`);
            view.addChild(leveltype);
            leveltype.visible = data.friend == 0;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leveltype, titlebg, [-2,0]);
            if(leveltype.visible && data.type != `D`){
                let clip = ComponentManager.getCustomMovieClip(`${App.StringUtil.firstCharToLower(data.type)}levelscan`, 10, 80);
                view.addChild(clip);
                clip.playWithTime(-1);
                clip.x = data.type == `S` ?  -10.5 : -8;
                clip.y = data.type == `S` ?  -8.5 : -4;
            }

            let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangtaskname_${data.friend}_${data.type}${data.taskId}`), 22);//LanguageManager.getlocal(`zhenqifangtask${data.type}${index + 1}name`)
            view.addChild(nameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, leveltype, [data.friend == 0 ? leveltype.width : 15, 0]);


            let issend = data.st > 0;
            let timeTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_BLACK);
            view.addChild(timeTxt);

            let listbg = BaseBitmap.create(`public_9_managebg`);
            listbg.width = 580;
            listbg.height = 196;
            view.addChild(listbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, bg, [0,60]);

            //切换
            let changeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, `zhenqifangchangeevent`, ()=>{
                //更换
                let total = data.friend ? Config.ZhenqifangCfg.friend.freeFresh[0] : Config.ZhenqifangCfg.individual.freeFresh[0]
                let num = Api.zhenqifangVoApi.curFreeNum - total;
                if(num < 0){
                    //免费
                    Api.zhenqifangVoApi.selIdx = this._index;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_FRESHTASK,{
                        idx : view._index + 1, 
                        taskType : data.friend ? 2 : 1,
                        cts : data.cts
                    });
                }
                else{
                    let costarr =  data.friend ? Config.ZhenqifangCfg.friend.gemBuyTask : Config.ZhenqifangCfg.individual.gemBuyTask; 
                    let costnum = costarr[Math.min(num, costarr.length - 1)];
                    ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                        msg: LanguageManager.getlocal(`zhenqifangcdtip9`, [costnum]) ,
                        needCancel:true,
                        title:"achuntingTipTitle",
                        callback:()=>{
                            if(Api.playerVoApi.getPlayerGem() < costnum){
                                App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
                                return;
                            }
                            Api.zhenqifangVoApi.selIdx = this._index;
                            NetManager.request(NetRequestConst.REQUEST_ZQF_FRESHTASK,{
                                idx : view._index + 1, 
                                taskType : data.friend ? 2 : 1,
                                cts : data.cts
                            });
                        },
                        handler:view,
                        needClose : true,
                    });
                }
                //
            }, view);
            view.addChild(changeBtn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, changeBtn, bg, [100,13]);
            view._changebtn = changeBtn;

            let costGroup = new BaseDisplayObjectContainer();
            costGroup.width = 120;
            costGroup.height = 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costGroup, changeBtn, [0,-costGroup.height]);
            view._costGroup = costGroup;
            view.addChild(costGroup);

            let rect:egret.Rectangle=egret.Rectangle.create();
            rect.setTo(0,0,40,40);
            let goldIcon:BaseLoadBitmap = BaseLoadBitmap.create("itemicon1",rect);
            goldIcon.x=10;
            costGroup.addChild(goldIcon);
    
            let total = data.friend ? Config.ZhenqifangCfg.friend.freeFresh[0] : Config.ZhenqifangCfg.individual.freeFresh[0]
            let num = Api.zhenqifangVoApi.curFreeNum - total;
            let cost = 0;
            if(num >= 0){
                let costarr =  data.friend ? Config.ZhenqifangCfg.friend.gemBuyTask : Config.ZhenqifangCfg.individual.gemBuyTask; 
                cost = costarr[Math.min(num, costarr.length - 1)];
            }
            let goldText:BaseTextField = ComponentManager.getTextField(cost==0?LanguageManager.getlocal(`achuntingFree`):cost.toString(),18,TextFieldConst.COLOR_BLACK);
            view._changecostTxt = goldText;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, goldText, goldIcon, [goldIcon.width+5,0]);
            costGroup.addChild(goldText);
            
            if(issend){
                costGroup.visible = false;
                changeBtn.setVisible(false);
                let num = data.st + time - GameData.serverTime;
                timeTxt.text = LanguageManager.getlocal(num <= 0 ? `zhenqifangcdtip10` : `zhenqifangcdtip2`, [App.DateUtil.getFormatBySecond(num)]);
                
                let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `taskCollect`, ()=>{
                    NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
                        idx : view._index + 1, 
                        taskType : view._data.friend ? 2 : 1,
                        cts : view._data.cts
                    });
                }, view);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, getBtn, bg, [0,13]);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, getBtn, listbg, [0,listbg.height+40]);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, bg, [100,13]);
                view._getbtn = getBtn;
                getBtn.visible = num <= 0;
                view.addChild(getBtn);
                // if(data.friend == 1){
                //     changeBtn.visible = false;
                //     costGroup.visible = false;
                    
                // }

                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeTxt, getBtn, [0,-timeTxt.height-8]);

                let collectfalg = BaseBitmap.create(`achievement_state1`);
                collectfalg.anchorOffsetX = collectfalg.width / 2;
                collectfalg.anchorOffsetY = collectfalg.height / 2;
                collectfalg.setScale(0.8);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectfalg, timeTxt, [0,timeTxt.height-10]);
                view.addChild(collectfalg);
                view._collectflag = collectfalg;
                collectfalg.visible = !getBtn.visible;
            }
            else{
                timeTxt.text = LanguageManager.getlocal(`zhenqifangcdtip3`, [App.DateUtil.getFormatBySecond(time, 16)]);
                let sendBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `allianceTaskSendBtnTxt`, ()=>{
                    //
                    if(sendBtn.getIsGray()){
                        App.CommonUtil.showTip(LanguageManager.getlocal("zhenqifangcdtip8"));
                        return;
                    }
                    let servantarr = [];
                    let list : any = view._servantList;
                    for(let i in list._scrollListItemArr){
                        let unit : ZhenqifangServantItem = list._scrollListItemArr[i];
                        if(unit.curServantId && Number(unit.curServantId) > 0){
                            servantarr.push({
                                sid : unit.curServantId,
                                uid : unit.getUid()
                            });
                        }
                    }
                    //派遣
                    Api.zhenqifangVoApi.selIdx = this._index;
                    NetManager.request(NetRequestConst.REQUEST_ZQF_SELECTSERVANT,{
                        idx : view._index + 1, 
                        taskType : data.friend ? 2 : 1,
                        slist : servantarr, 
                        cts : data.cts
                    });
                    
                }, view);
                view.addChild(sendBtn);
                sendBtn.setGray(true);
                view._sendbtn = sendBtn;
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, sendBtn, bg, [100,13]);

                if(data.friend == 1 || data.first){
                    changeBtn.visible = false;
                    costGroup.visible = false;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sendBtn, listbg, [0,listbg.height+40]);
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeTxt, sendBtn, [0,-timeTxt.height-8]);
            }
            view._cdTxt = timeTxt;

            
            //所需门客
            let bg1 = BaseBitmap.create(`rankactivenamebg`);
            bg1.rotation = -90;
            bg1.setScale(0.65);
            bg1.x = 4;
            bg1.y = 105;
            let needTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangneedservant`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(bg1);
            view.addChild(needTxt1);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, needTxt1, listbg, [0,15]);
            //英 泰 俄 葡
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
                bg1.visible = false;
                needTxt1.setColor(TextFieldConst.COLOR_BLACK);
			}
            
            let tmpRect2 = new egret.Rectangle(0,0,490,110);

            let servantarr= [];
            for(let i in data.svtInfo){
                let unit = data.svtInfo[i];
                servantarr.push({
                    empty : unit.sid ? false : true,
                    servantID : unit.sid ? unit.sid : 0,
                    type : data.type,
                    taskId : data.taskId,
                    note : unit.note ? unit.note : null,
                    requirement : unit.requirement ? unit.requirement : null,
                    insend : unit.sid ? true : false,
                    index : index,
                    friend : data.friend,
                    needfriend : unit.friend,
                    clv : unit.clv ? unit.clv : 0,
                    equip : unit.equip ? unit.equip : ``,
                    deduction : unit.deduction ? unit.deduction : 0,
                    taskdata : data,
                });
            }

            let servantlist = ComponentManager.getScrollList(data.friend ? ZhenqifangServantShowItem : ZhenqifangServantItem,servantarr,tmpRect2);
            servantlist.verticalScrollPolicy = `off`;
            servantlist.setContentPosY(10);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servantlist, listbg, [115,0]);
            view.addChild(servantlist);
            view._servantList = servantlist;

            let bg2= BaseBitmap.create(`rankactivenamebg`);
            bg2.rotation = -90;
            bg2.setScale(0.65);
            bg2.x = 4;
            bg2.y = 200;
            let needTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangreward`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChild(bg2);
            view.addChild(needTxt2);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, needTxt2, listbg, [0,110]);
            //英 泰 俄 葡
			if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
                bg2.visible = false;
                needTxt2.setColor(TextFieldConst.COLOR_BLACK);
			}

            let rewardsbg = BaseBitmap.create(`battlepassfntbg-1`);
            view.addChild(rewardsbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardsbg, needTxt2, [-5,needTxt2.textHeight + 12]);
            view._rewardsbg = rewardsbg;

            let rewardstrtxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_WARN_RED3);
            view.addChild(rewardstrtxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardstrtxt, rewardsbg);
            view._rewardStrTxt = rewardstrtxt;
            view.checkReward();

            let tmpRect = new egret.Rectangle(0,0,490,108);

            let str = `1024_1_${data.data.exp}|`;
            str += (data.getReward);

            let rewardstr : any[] = GameData.formatRewardItem(str);
            rewardstr.sort((a,b)=>{
                if(a.type == 1024){
                    return -1;
                }
                else if(b.type == 1024){
                    return 1;
                }
                else{
                    if(b._quality == a._quality){
                        return a.id - b.id;
                    }
                    else{
                         return b._quality - a._quality
                    }
                }
            });
            let rewardlist = ComponentManager.getScrollList(RewardItemScrollItem,rewardstr,tmpRect,85/108);
            rewardlist.verticalScrollPolicy = `off`;
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardlist, listbg, [110,100]);
            view.addChild(rewardlist);

        }
        TickManager.addTick(view.tick,view);
    }

    private checkSelect_friend(evt : egret.Event):void{
        let data = evt.data;
        if(this._data.friend && this._data.st <= 0){
            for(let i in data.data){
                let unit = data.data[i];
                let item = <ZhenqifangServantShowItem>this._servantList.getItemByIndex(Number(i));
                if(item && this._data.index == data.index){
                    if(!Api.zhenqifangVoApi.friendsendList[unit.uid]){
                        Api.zhenqifangVoApi.friendsendList[unit.uid] = {};
                    }
                    if(!Api.zhenqifangVoApi.friendsendList[unit.uid][unit.sid]){
                        Api.zhenqifangVoApi.friendsendList[unit.uid][unit.sid] = 1;
                    }
                    if(!Api.zhenqifangVoApi.friendobj[this._index]){
                        Api.zhenqifangVoApi.friendobj[this._index] = {};
                    }
                    if(!Api.zhenqifangVoApi.friendobj[this._index][i]){
                        Api.zhenqifangVoApi.friendobj[this._index][i] = unit;
                    }
                    
                    if(unit && (unit.id || unit.sid)){
                        item.addServant(unit);
                    }
                    else{
                        item.clearServant();
                    }
                }
            }
            this.checkReward();
        }
    }

    private checkSelect(evt : egret.Event):void{
        let data = evt.data;
        if(this._data.friend){
            for(let i in data.data){
                let unit = data.data[i];
                let item = <ZhenqifangServantShowItem>this._servantList.getItemByIndex(Number(i));
                if(item && this._index == data.index){
                    if(unit && (unit.id || unit.sid)){
                        item.addServant(unit);
                    }
                    else{
                        item.clearServant();
                    }
                }
            }
            this.checkReward();
        }
    }

    private checkReward():void{
        let view = this;
        let list : any = view._servantList;
        let count = 0;
        let servantnum = 0;
        //门客派遣
        let qiinjiaadd = 0;
        let total = 0;
        let issend = view._data.st > 0;
        if(issend){
            for(let i in view._data.svtInfo){
                let unit = view._data.svtInfo[i];
                if(unit.deduction){
                    count += unit.deduction;
                }
                if(unit.addRate){
                    qiinjiaadd += unit.addRate;
                }
            }
            total = qiinjiaadd - count;
        }
        else{
            for(let i in list._scrollListItemArr){
                let unit : ZhenqifangServantItem = list._scrollListItemArr[i];
                if(unit.checkIsNotAllReward()){
                    ++ count;
                }
                if(unit.curServantId && Number(unit.curServantId) > 0){
                    ++ servantnum;
                }
                if(unit.getUid() && unit._times >= Config.SadunCfg.needNum){
                    let info = Api.adultVoApi.getFreiendNums2(unit._freind);
                    qiinjiaadd += Config.ZhenqifangCfg.rltvByMarr[info.quality - 1];
                }
            }
            total = qiinjiaadd - (view._data.friend ? Config.ZhenqifangCfg.friend.deduction  : Config.ZhenqifangCfg.individual.deduction) * count;

            if(this._data.friend){
                let sadunList = [];
                if(Api.switchVoApi.checkopenSadun()){
                    let total = Config.ZhenqifangCfg.friend.supportTimes;
                    for (let index = 0; index < Api.friendVoApi.sadunList.length; index++) {
                        let tmpData = Api.friendVoApi.sadunList[index];
                        tmpData["num"] = total - Api.zhenqifangVoApi.getFriendSupportTimes(tmpData.uid);
                        if(tmpData["num"] > 0 && (typeof Api.zhenqifangVoApi.friendsendList[tmpData.uid] == `undefined` || Object.keys(Api.zhenqifangVoApi.friendsendList[tmpData.uid]).length == 0)){
                            sadunList.push(tmpData);
                        }
                    }
                    sadunList.sort((dataA:any,dataB:any)=>{
                        return dataB["friend"] -  dataA["friend"];
                    });
                }
    
                let selectuid = [];
                let servantlist : any = this._servantList;
                for(let i in servantlist._scrollListItemArr){
                    let item = <ZhenqifangServantShowItem>servantlist._scrollListItemArr[i];
                    if(item && item.getUid()){
                        selectuid.push(Number(item.getUid()));
                    }
                }
    
                let flag = false;
                if(selectuid.length){
                    for(let i = 0; i < sadunList.length; ++ i){
                        let uid = Number(sadunList[i]);
                        if(selectuid.indexOf(uid) == -1){
                            flag = true;
                            break;
                        }
                    }
                }
      
                this._sadunTxt.visible = flag;
            }
        }

        if(total !== 0){
            view._rewardsbg.visible = true;
            view._rewardStrTxt.text = `${total > 0 ? `+` : ``}${(total * 100).toFixed(0)}%`
            view._rewardStrTxt.textColor = total > 0 ? 0x21eb39 : TextFieldConst.COLOR_WARN_RED3
        }
        else{
            view._rewardsbg.visible = false;
            view._rewardStrTxt.text = ``;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._rewardStrTxt, view._rewardsbg);
        if(view._sendbtn){
            view._sendbtn.setGray(servantnum < list._scrollListItemArr.length);
        }

        if(servantnum == 0){
            view._sadunTxt.visible = false;
        }
    }

    private checkBuzhen() : void{
        let view = this;
        if(view._data.empty){

        }
        else{
            view.checkReward();
        }
    }

    private tick():void{
        let view = this;
        if(view._data.empty){
            let start = Api.zhenqifangVoApi.ZhenqifangTaskFreshTime;
            let endNum = start + Config.ZhenqifangCfg.individual.getFreeTask;
            let time = endNum - GameData.serverTime;

            if(time > 0){
                let rewardvo = GameData.formatRewardItem(Config.ZhenqifangCfg.individual.getTaskNeed)[0];
                let single = Config.ZhenqifangCfg.individual.getTaskNum;
                let neednum = Math.ceil(time / single);
                let havenum = Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
                let needTxt = ComponentManager.getTextField((`<font color=${neednum > havenum ? 0xff3c3c : 0xffffff}>${neednum}</font>/${havenum}`).toString(), 20);
                view._needTxt.text = (`<font color=${neednum > havenum ? 0xff3c3c : 0xffffff}>${havenum}</font>/${neednum}`).toString();
                view._cdTxt.text = LanguageManager.getlocal(`zhenqifangcdtip`, [App.DateUtil.getFormatBySecond(time)]);
            }
            else{
                //发消息同步
                Api.zhenqifangVoApi.freshlist = true;
                NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
            }
        }
        else{
            let total = view._data.friend ? Config.ZhenqifangCfg.friend.freeFresh[0] : Config.ZhenqifangCfg.individual.freeFresh[0]
            let num = Api.zhenqifangVoApi.curFreeNum - total;
            let cost = 0;
            if(num >= 0){
                let costarr = view._data.friend ? Config.ZhenqifangCfg.friend.gemBuyTask : Config.ZhenqifangCfg.individual.gemBuyTask; 
                cost = costarr[Math.min(num, costarr.length - 1)];
            }
            view._changecostTxt.text = (cost==0?LanguageManager.getlocal(`achuntingFree`):cost.toString());

            let issend = view._data.st > 0;
            if(issend){
                view._costGroup.visible = false;
                view._changebtn.setEnable(false);
                let num = view._data.st + view._data.time - GameData.serverTime;
                if(num > 0){
                    view._collectflag.visible = true;
                    if(view._getbtn){
                        view._getbtn.visible = false;
                    }
                    view._cdTxt.text = LanguageManager.getlocal(`zhenqifangcdtip2`, [App.DateUtil.getFormatBySecond(num)]);
                }
                else{
                    view._cdTxt.text = LanguageManager.getlocal(`zhenqifangcdtip10`);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, view._getbtn, [0,-view._cdTxt.height-8]);
                    view._collectflag.visible = false;
                    if(view._getbtn){
                        view._getbtn.visible = true;
                    }
                    //发消息同步
                    // Api.zhenqifangVoApi.freshlist = true;
                    // NetManager.request(NetRequestConst.REQUEST_ZQF_GETINFO, {});
                }
            }
            else{
                if(view._data.friend == 1 || view._data.first){
                    view._costGroup.visible = false;
                }
                else{
                    view._costGroup.visible = true;
                }
                view._changebtn.setEnable(true);
            }
            
        }
    }

    public refreshAfterSend(data : any):void{
        let view = this;
        view._data = data;
        if(view._sendbtn){
            view._sendbtn.visible = false;
        }
        
        if(view._changebtn){
            view._changebtn.setVisible(false);
        }

        let num = view._data.st + view._data.time - GameData.serverTime;
        if(num){
            view._cdTxt.text = LanguageManager.getlocal(`zhenqifangcdtip2`, [App.DateUtil.getFormatBySecond(num)]);
        }

        let getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `taskCollect`, ()=>{
            NetManager.request(NetRequestConst.REQUEST_ZQF_GETREWARD, {
                idx : view._index + 1, 
                taskType : view._data.friend ? 2 : 1,
                cts : view._data.cts
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, getBtn, view._listbg, [0,13]);
       
        view._cdTxt.alpha = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, getBtn, [0,-view._cdTxt.height-8]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, view._listbg, [100,13]);
        view._getbtn = getBtn;
        getBtn.visible = false;
        view.addChild(getBtn);

        let collectfalg = BaseBitmap.create(`achievement_state1`);
        collectfalg.anchorOffsetX = collectfalg.width / 2;
        collectfalg.anchorOffsetY = collectfalg.height / 2;
        collectfalg.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, collectfalg, view._cdTxt, [0,view._cdTxt.height - 10]);
        view.addChild(collectfalg);
        view._collectflag = collectfalg;
        collectfalg.setScale(1.3);
        collectfalg.alpha = 0;
        egret.Tween.get(collectfalg).to({scaleX:0.8,scaleY:0.8,alpha:1},300).call(()=>{
            view._cdTxt.alpha = 1;
        },view);
        if(view._costGroup){
            view._costGroup.visible = false;
        }

        if(!view._data.empty){
            let list : any = view._servantList;
            for(let i in list._scrollListItemArr){
                let tmp : ZhenqifangServantItem = list._scrollListItemArr[i];
                let unit = data.svtInfo[i];
                tmp.setDelBtn({
                    empty : unit.sid ? false : true,
                    servantID : unit.sid ? unit.sid : 0,
                    type : data.type,
                    taskId : data.taskId,
                    note : unit.note ? unit.note : null,
                    requirement : unit.requirement ? unit.requirement : null,
                    insend : unit.sid ? true : false,
                    index : view._index,
                    friend : data.friend,
                    needfriend : unit.friend,
                    clv : unit.clv ? unit.clv : 0,
                    equip : unit.equip ? unit.equip : ``,
                    deduction : unit.deduction ? unit.deduction : 0,
                });
            }
        }

        if(Api.rookieVoApi.getIsGuiding()){
            Api.rookieVoApi.checkNextStep();
        }

        view._sadunTxt.visible = false;
    }

    public refreshAfterFresh(data : any):void{
        let view = this;
        for(let i = 0; i < 5; ++ i){
            let item = <ZhenqifangServantItem>this._servantList.getItemByIndex(i);
            if(item ){
                let sid = item.curServantId;
                if(Api.zhenqifangVoApi.sendList.indexOf(sid) > -1){
                    Api.zhenqifangVoApi.sendList.splice(Api.zhenqifangVoApi.sendList.indexOf(sid), 1);
                }
            }
        }
       
        TickManager.removeTick(view.tick,view);
        view.removeChildren();
        view._cdTxt = null;
        view._rewardsbg = null;
        view._servantList = null;
        view._rewardStrTxt = null;
        if(view._changecostTxt){
            view._changecostTxt = null;
        }
        if(view._needTxt){
            view._needTxt = null;
        }
        if(view._sendbtn){
            view._sendbtn = null;
        }
        if(view._changebtn){
            view._changebtn = null;
        }
        if(view._listbg){
            view._listbg = null;
        }
        if(view._collectflag){
            view._collectflag = null;
        }
        if(view._getbtn){
            view._getbtn = null;
        }
        if(view._costGroup){
            view._costGroup = null;
        }
        view.makeItem(view._index,data);
    }

    public canSend():boolean{
        let issend = false;
        if(this._data.friend == 0){
            issend = this._sendbtn && !this._sendbtn.getIsGray() && this._data.st <= 0;
        }
        else{
            issend = this._sendbtn && !this._sendbtn.getIsGray() && this._data.st <= 0;
        }
        return issend
    }

    public isSend():boolean{
        let flag = false;
        let issend = this._data.st > 0;
        return issend;
    }

    public isInState():boolean{
        let flag = false;
        let issend = this._data.st > 0;
        if(this._data.friend == 0){
            flag = !this._data.empty && !issend && !this.canSend();
        }
        else{
            flag = !this._data.empty && !issend && !this.canSend();
        }
        return flag;
    }

    public getServantArr():any[]{
        let view = this;
        let servantarr = [];
        if(!view._data.empty){
            let list : any = view._servantList;
            for(let i in list._scrollListItemArr){
                let unit : ZhenqifangServantShowItem = list._scrollListItemArr[i];
                if(unit.curServantId && Number(unit.curServantId) > 0){
                    if ( unit.getUid())
                    {
                          servantarr.push({
                            sid : String(unit.curServantId),
                            uid : unit.getUid()
                        });
                    }
                    else
                    {
                          servantarr.push({
                            sid : String(unit.curServantId),
                        });
                    }
                  
                }
            }
        }
        
        return servantarr;
    }

    public setServantArr(canselectarr:any[], haveservantarr:any[]):void{
        let view = this;
        let list : any = view._servantList;
        if(list){
            let now = 0;
            for(let i in list._scrollListItemArr){
                let unit : any = list._scrollListItemArr[i];
                if(unit.curServantId && Number(unit.curServantId) > 0){
                   ++ now;
                }
            }
            for(let i in list._scrollListItemArr){
                let unit : any = list._scrollListItemArr[i];
                if(unit.curServantId && Number(unit.curServantId) > 0){
                }
                else{
                    let tmp = [];
                    if(canselectarr.length >= (5 - now)){
                        if(unit._data.note){
                            for(let i in canselectarr){
                                let info = Api.servantVoApi.getServantObj(canselectarr[i]);
                                if(info[unit._data.note] >= unit._data.requirement){
                                    tmp.push(canselectarr[i]);
                                }
                            }
                            if(tmp.length){
                                tmp.sort((a,b)=>{
                                    let infoa = Api.servantVoApi.getServantObj(a);
                                    let infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[unit._data.note] - infob[unit._data.note]
                                });
                            }
                            else{
                                canselectarr.sort((a,b)=>{
                                    let infoa = Api.servantVoApi.getServantObj(a);
                                    let infob = Api.servantVoApi.getServantObj(b);
                                    return infoa[unit._data.note] - infob[unit._data.note]
                                });
                            }
                            
                        }
                        else{
                            canselectarr.sort((a,b)=>{
                                let infoa = Api.servantVoApi.getServantObj(a);
                                let infob = Api.servantVoApi.getServantObj(b);
                                return infoa.total - infob.total;
                            });
                        }
                        
                        let sid = tmp.length ? tmp[0] : canselectarr[0];
                        let info = Api.servantVoApi.getServantObj(sid);
                        unit.fresh_servant({
                            id:sid, 
                            uid:0, 
                            clv:info.clv, 
                            equip:info.equip, 
                            value:unit._data.note ? info[unit._data.note] : info.total
                        });
                        canselectarr.splice(canselectarr.indexOf(sid), 1);
                        haveservantarr.push(sid);
                        ++ now;
                    }
                }
            }
        }
    }
    /**
	 * 不同格子X间距
	 */
	public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
    }
    
	public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT,this.checkSelect,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_SERVANT,this.checkBuzhen,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ZQF_ADDSERVANT_FRIEND,this.checkSelect_friend,this);
        TickManager.removeTick(view.tick,view);
        view._data = null;
        view._cdTxt = null;
        view._rewardsbg = null;
        view._servantList = null;
        view._rewardStrTxt = null;
        view._sadunTxt = null;
        if(view._changecostTxt){
            view._changecostTxt = null;
        }
        if(view._needTxt){
            view._needTxt = null;
        }
        if(view._sendbtn){
            view._sendbtn = null;
        }
        if(view._changebtn){
            view._changebtn = null;
        }
        if(view._listbg){
            view._listbg = null;
        }
        if(view._collectflag){
            view._collectflag = null;
        }
        if(view._getbtn){
            view._getbtn = null;
        }
        if(view._costGroup){
            view._costGroup = null;
        }
		super.dispose();
	}
}