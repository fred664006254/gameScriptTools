/**
 * 三国争霸派遣任务弹窗
 * author qianjun
 */
class AcThreeKingdomsTaskView extends PopupView{
    private _cdTxt : BaseTextField = null;
    private _tipTxt : BaseTextField = null;
    private _btn : BaseButton = null;
    private _sendbtn : BaseButton = null;
    private _fightcd = 0;
    private _showlist : ScrollList = null;
    private _selectlist : ScrollList = null;
    private _tmp : any;
    private _tasktype : BaseBitmap = null;
    private _rewardGroup : BaseDisplayObjectContainer = null;
    private _taskNeed : number;
    private _needTxt : BaseTextField = null;

    private _servantgroup : BaseDisplayObjectContainer = null;
    
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private get cityId():number{
        return this.param.data.cityId;
    }

    private get kingdomid():number{
        return this.param.data.kingdomid;
    }

	protected getResourceList():string[]{
		return super.getResourceList().concat([
           `threekingdomstaskview`,`mlservantempty-1`,`servant_namebg`,`acchristmasview_smalldescbg`,`mlservantmask-1`,
           `mlservantselected-1`,`awservantstate1`,
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SERVANCLOSE_REFRESH,view.freshlist,view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE,view.checkBuzhen,view);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.addNetMessage(NetRequestConst. REQUEST_THREEKINGDOMS_TASKSTART, view.sendBack, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_THREEKINGDOMS_HIDE, view.hide, view);
        let code = view.getUiCode();
        let vo = view.vo;
        let cfg = view.cfg;
        let isCentercity = view.kingdomid == 0;
        let info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        let status = info.status;
        //2武3知4政5魅1全属性
        let tasktype = view.cityId;
        let tasklevel = info.level;
        let taskcfg : Config.AcCfg.ThreeKingdomsTaskListCfg = view.cfg.taskList[tasklevel - 1];
        view._taskNeed = taskcfg.servantNeed;

        let taskTimeBg = BaseBitmap.create(`threekingdomsrectbg2`);
        taskTimeBg.width = 450;
        view.addChildToContainer(taskTimeBg);
        taskTimeBg.setPosition(view.viewBg.x + (view.viewBg.width - taskTimeBg.width) / 2, 10);

        let taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip`, code), [App.DateUtil.getFormatBySecond(taskcfg.needTime, 16)]), 22);
        view.addChildToContainer(taskTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt, taskTimeBg)

        let bg = BaseBitmap.create(`public_9_bg4`);
        bg.width = 530;
        bg.height = 470;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, taskTimeBg, [0,taskTimeBg.height+15]);
        //getServantInfoListWithSort

        let taskbg = BaseBitmap.create(`threekingdomstaskbg`);
        view.addChildToContainer(taskbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, taskbg, bg, [0,7]);

        //主城有特殊需求
        let ginfo = view.vo.getGeneralPlayerInfo();
        if(view.cityId == 1 && ginfo ){
            
            //大都督人物
            let curLv = ginfo.level;
            let posX = 20;
            let tinfo = App.CommonUtil.getTitleData(ginfo.title);
            if (tinfo.clothes != ""){	
                if (!Config.TitleCfg.getIsTitleOnly(tinfo.clothes)){
                    curLv = tinfo.clothes;
                }
            }
            
            let userContainer = Api.playerVoApi.getPlayerPortrait(curLv,ginfo.pic);
            userContainer.anchorOffsetX = userContainer.width / 2;
            userContainer.mask = egret.Rectangle.create().setTo(0,0,490,250);
            userContainer.x = 430;
            userContainer.y = taskbg.y + taskbg.height - 250;
            view.addChildToContainer(userContainer);

            //语言文本
            let descBg = BaseBitmap.create('public_9_bg42');
            view.addChildToContainer(descBg);
            descBg.width = 220;

            let arrowBM = BaseBitmap.create("public_9_bg13_tail");
            arrowBM.anchorOffsetX = arrowBM.width / 2;
            arrowBM.anchorOffsetY = arrowBM.height / 2;
            arrowBM.scaleX = -1;
            view.addChildToContainer(arrowBM);

            let descTxt =ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomstasktip17-${view.getUiCode()}`), 22, TextFieldConst.COLOR_BROWN);
            descTxt.width = 190;
            descTxt.lineSpacing = 5;
            view.addChildToContainer(descTxt);
            descBg.height = descTxt.textHeight + 36;
            descBg.setPosition(150,105);
            arrowBM.setPosition(322,197);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
        }

        //acThreeKingdomstaskname1
        let namebg = BaseBitmap.create(`threekingdomsrectbg3`);
        namebg.width = 420;
        namebg.height = 40;
        // view.addChildToContainer(namebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, taskbg, [0,3]);

        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstaskname${view.cityId}`, code)), 22, TextFieldConst.COLOR_LIGHT_YELLOW)
        view.addChildToContainer(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);

        let line = BaseBitmap.create(`public_line3`);
        line.width = 400;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, nameTxt);

        let taskType = BaseBitmap.create(`threekingdomstasktype${tasklevel}`);
        view.addChildToContainer(taskType);
        view._tasktype = taskType;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, taskType, taskbg, [15,125]);

        let rewardTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip3`, code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW)
        view.addChildToContainer(rewardTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardTxt, taskType, [taskType.width, 0]);
        
        //奖励物品
        let rewardGroup = new BaseDisplayObjectContainer();
        rewardGroup.x = taskbg.x + 18;
        rewardGroup.y = taskbg.y + 175
        view.addChildToContainer(rewardGroup);
        view._rewardGroup = rewardGroup;
        
        let rewardstr = `1047_1_${taskcfg.addHeroExp}|${taskcfg.getReward}`
        let rIcons = GameData.getRewardItemIcons(rewardstr, true);
        let len = rIcons.length;
        let tmpX = 0;
        for (let innerIdx = 0; innerIdx < len; innerIdx++) {
            var element = rIcons[innerIdx];
            element.x = tmpX;
            element.y = 0;
            element.setScale(0.8);
            tmpX +=  (element.width*element.scaleX+10);
            // if (tmpX >= GameConfig.stageWidth)
            // {
            //     tmpX = 20;
            //     scroStartY += element.height + 15;
            //     element.x = tmpX;
            //     element.y = scroStartY;
            //     tmpX +=  (element.width+ 15);
            // }
            element.cacheAsBitmap = true;
            rewardGroup.addChild(element);
        }

        let cutline = BaseBitmap.create(`public_cut_line`);
        view.addChildToContainer(cutline);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cutline, taskbg, [0,taskbg.height+7]);
        //门客列表展示
        let servantObj = [];
        //已派遣
		if(status == 2){
			servantObj = info.servantArr;
		}
		else{
			servantObj = [];//view.vo.getLastTeamInfo(army);
		}
		view.vo.selectServant = {};
		let tmp = [];
		for(let i = 0; i < this._taskNeed; ++ i){
			if(servantObj[i]){
                let obj = Api.servantVoApi.getServantObj(servantObj[i]);
				tmp.push({
                    data : obj,
                    bookvalue : obj.getTotalBookValue(view.cityId - 1),
                });
			}
			else{
				tmp.push({
					empty : true
				});
			}
        }
        tmp.sort((a,b)=>{
			return b.bookvalue - a.bookvalue;
		});
		let tmpRect =  new egret.Rectangle(0,0,490,95);
		let scrollList = ComponentManager.getScrollList(AcThreeKingdomsTaskServantItem, tmp, tmpRect, view.cityId);
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, cutline, [0, cutline.height + 15]);
		view.addChildToContainer(scrollList); 
		scrollList.bounces = false;
        scrollList.verticalScrollPolicy = 'off';  
        view._showlist = scrollList;

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip${status == 2 ? (tasklevel ==  view.cfg.taskList.length ? 19: 11) : 5}`, code)), 20, TextFieldConst.COLOR_BROWN)
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, scrollList, [0, scrollList.height + 15]);
        view._tipTxt = tipTxt;
        //奖励升级
        let fightBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, App.CommonUtil.getCnByCode(`acThreeKingdomstasktip2`, code), ()=>{
            if(1){
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSUPGRADEREWARDVIEW,{
                    cityId : view.cityId,
                    aid : view.aid,
                    code : view.code
                });
            }
            // App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparerfighttip1`, code)));
        }, view);
        view.addChildToContainer(fightBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, fightBtn, bg, [70,bg.height+15]);

        //选择门客
        let selectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode(`acThreeKingdomstasktip4`, code), ()=>{
            if(!view.vo.isInTaskTime()){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip18`, code)));
                return
            }
            if(Object.keys(view.vo.selectServant).length < this._taskNeed){
                if(servantgroup.y == (GameConfig.stageHeigth - servantgroup.height)){
                    return;
                }
                let obj = Api.servantVoApi.getServantInfoList();
                let info = view.vo.getCityTaskStaus(view.cityId);
                let tasklevel = info.level;
                let taskcfg : Config.AcCfg.ThreeKingdomsTaskListCfg = view.cfg.taskList[tasklevel - 1];
                let tmparr = [];
                for(let i in obj){
                    let unit : ServantInfoVo = obj[i];
                    let attend = view.vo.getServantAttend(Number(unit.servantId));
                    tmparr.push({
                        bookvalue : unit.getTotalBookValue(view.cityId - 1),
                        data : unit,
                        isAttend : attend,
                        need : view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1
                    });
                }
                tmparr.sort((a,b)=>{
                    if(a.isAttend && b.isAttend){
                        return b.bookvalue - a.bookvalue;
                    }
                    else if(a.isAttend){
                        return 1;
                    }
                    else if(b.isAttend){
                        return -1;
                    }
                    else{
                        return b.bookvalue - a.bookvalue;
                    }
                });

                servantlist.refreshData(tmparr,{code:view.code,cityid : view.cityId});
                view._tmp = Api.chatVoApi.object_clone(view.vo.selectServant);
                egret.Tween.get(view.closeBtn).to({y : view.closeBtn.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.closeBtn);
                }, view);

                egret.Tween.get(view.titleTF).to({y : view.titleTF.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.titleTF);
                }, view);

                egret.Tween.get(view.container).to({y : view.container.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.container);
                }, view);

                egret.Tween.get(view.viewBg).to({y : view.viewBg.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.viewBg);

                    let tmpy = GameConfig.stageHeigth - servantgroup.height;
                    servantgroup.y = GameConfig.stageHeigth;
                    servantgroup.alpha = 1;
                    egret.Tween.get(servantgroup).to({y : tmpy}, servantgroup.height / 1).call(()=>{
                        egret.Tween.removeTweens(servantgroup);
                    }, view);
                }, view);
            }
            else{
                //派遣门客
                let arr = [];
                for(let i in view.vo.selectServant){
                    arr.push(i.toString());
                }
                NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_TASKSTART, { 
                    activeId : view.vo.aidAndCode, 
                    cityId : view.cityId == 1 ? 5 : (view.cityId - 1),
                    sids : arr,
                });
                
            }
        }, view);
        view.addChildToContainer(selectBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, selectBtn, bg, [70,bg.height+15]);
        view._sendbtn = selectBtn;

        let timeCdTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BROWN);
        if(info.status == 2){
            selectBtn.visible = false;
            timeCdTxt.text = App.DateUtil.getFormatBySecond(info.et - GameData.serverTime);;
        }
        view.addChildToContainer(timeCdTxt);
        timeCdTxt.lineSpacing = 5;
        timeCdTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeCdTxt, selectBtn, [0,5]);
        view._cdTxt = timeCdTxt;
        
        let servantgroup = new BaseDisplayObjectContainer();
        servantgroup.width = GameConfig.stageWidth;
        servantgroup.height = 415;
        servantgroup.touchEnabled = true;
        view.addChild(servantgroup);
        view._servantgroup = servantgroup;

        let listbg = BaseBitmap.create(`threekingdomstaskservantbg`);
        listbg.height = 330;
        servantgroup.addChild(listbg);
        
        let needBg = BaseBitmap.create(`acchristmasview_smalldescbg`);
        needBg.width = 550;
        needBg.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needBg, servantgroup, [0,50], true);
        servantgroup.addChild(needBg);

        let needTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip6`, code), [LanguageManager.getlocal(`servantInfo_speciality${view.cityId == 1 ? 7 : (view.cityId - 1)}`), (view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1).toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, needTxt, needBg);
        servantgroup.addChild(needTxt);
        view._needTxt = needTxt;

        let bottomBg = BaseBitmap.create("arena_bottom");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, servantgroup, [0,0], true);
        servantgroup.addChild(bottomBg);

        let obj = Api.servantVoApi.getServantInfoList();
		let arr = [];
		for(let i in obj){
            let unit : ServantInfoVo = obj[i];
			let attend = view.vo.getServantAttend(Number(unit.servantId));
			arr.push({
				bookvalue : unit.getTotalBookValue(view.cityId - 1),
				data : unit,
                isAttend : attend,
                need : view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1
			});
		}
		arr.sort((a,b)=>{
			if(a.isAttend && b.isAttend){
				return b.bookvalue - a.bookvalue;
			}
			else if(a.isAttend){
				return 1;
			}
			else if(b.isAttend){
				return -1;
			}
			else{
                return b.bookvalue - a.bookvalue;
			}
        });
        
        //选择门客
		let tmpRect2 =  new egret.Rectangle(0,0,600,bottomBg.y - needBg.y - needBg.height - 15);
		let servantlist = ComponentManager.getScrollList(AcThreeKingdomsTaskSelectServantItem, arr, tmpRect2, {
            code : view.code,
            cityid : view.cityId
        });
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, servantlist, needBg, [10,needBg.height + 10]);
		servantgroup.addChild(servantlist); 
        servantlist.bounces = false;
        view._selectlist = servantlist;
		// view._servantList = servantlist;

        let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `confirmBtn`, ()=>{
            if(Object.keys(view.vo.selectServant).length == this._taskNeed){
                egret.Tween.get(servantgroup).to({y : GameConfig.stageHeigth}, servantgroup.height / 1).call(()=>{
                    egret.Tween.removeTweens(servantgroup);
                    egret.Tween.get(view.viewBg).to({y : view.viewBg.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.viewBg);
                    }, view);

                    egret.Tween.get(view.closeBtn).to({y : view.closeBtn.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.closeBtn);
                    }, view);
    
                    egret.Tween.get(view.titleTF).to({y : view.titleTF.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.titleTF);
                    }, view);
    
                    egret.Tween.get(view.container).to({y : view.container.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.container);
                    }, view);

                }, view);
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip5`, code)));
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bottomBg, [70,0]);
        servantgroup.addChild(btn);
        view._btn = btn;
        view._btn.setGray(Object.keys(view.vo.selectServant).length < this._taskNeed);

        let cancelbtn =  ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `cancelBtn`, ()=>{
            if(1){
                egret.Tween.get(servantgroup).to({y : GameConfig.stageHeigth}, servantgroup.height / 1).call(()=>{
                    egret.Tween.removeTweens(servantgroup);
                    egret.Tween.get(view.viewBg).to({y : view.viewBg.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.viewBg);
                    }, view);

                    egret.Tween.get(view.closeBtn).to({y : view.closeBtn.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.closeBtn);
                    }, view);
    
                    egret.Tween.get(view.titleTF).to({y : view.titleTF.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.titleTF);
                    }, view);
    
                    egret.Tween.get(view.container).to({y : view.container.y + 70}, 300).call(()=>{
                        egret.Tween.removeTweens(view.container);
                    }, view);

                    view.vo.selectServant = Api.chatVoApi.object_clone(view._tmp);

                    let tmp = [];
                    for(let i in view.vo.selectServant){
                        let sid = i;
                        let servantobj = Api.servantVoApi.getServantObj(sid);
                        if(servantObj){
                            tmp.push({
                                data : servantobj,
                                bookvalue : servantobj.getTotalBookValue(view.cityId - 1),
                            });
                        }
                    }
                    if(tmp.length < this._taskNeed){
                        let len = tmp.length;
                        for(let i = 0; i < (5 - len); ++ i){
                            tmp.push({
                                empty : true
                            });
                        }
                    }
                    tmp.sort((a,b)=>{
                        return b.bookvalue - a.bookvalue;
                    });
                    view._showlist.refreshData(tmp,view.cityId);
                    view.freshServant();
                }, view);
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cancelbtn, bottomBg, [70,0]);
        servantgroup.addChild(cancelbtn);

        servantgroup.alpha = 0;
        servantgroup.y = GameConfig.stageHeigth;

        view.tick();
    }

    public tick():void{
        let view = this;
        // -- view._fightcd; 
        let info = view.vo.getCityTaskStaus(view.cityId);
        let count = info.et - GameData.serverTime;
        if(info.status == 2){
            view._sendbtn.visible = false;
            if(count > 0){
                view._cdTxt.text = `${LanguageManager.getlocal(`allianceTaskSendBtnTxt3`)}\n${App.DateUtil.getFormatBySecond(count)}`;
            }
            else{
                view._cdTxt.text = LanguageManager.getlocal(`bookRoomServant_studyComplete`);
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
            }
        } 
        else if(info.status == 3 || info.status == 4){
            view._sendbtn.visible = false;
            view._cdTxt.text = LanguageManager.getlocal(`bookRoomServant_studyComplete`);
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THREEKINGDOMS_HIDE);
        }
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._fightNumTxt, view._tipTxt, [0,view._tipTxt.height+20]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, view._tipTxt, [0,view._tipTxt.height+20]);     

    }

    protected getShowHeight() : number{
        return 700;
    }

	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomstasktitle`, this.getUiCode());
    }

    private attackBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let data = evt.data.data.data;
            let info = view.vo.getCityTaskStaus(view.cityId);
            view._tasktype.setRes(`threekingdomstasktype${ info.level}`);

            view._rewardGroup.removeChildren();
            let taskcfg = view.cfg.taskList[info.level - 1];
            let rewardstr = `1047_1_${taskcfg.addHeroExp}|${taskcfg.getReward}`
            let rIcons = GameData.getRewardItemIcons(rewardstr, true);
            let len = rIcons.length;
            let tmpX = 0;
            for (let innerIdx = 0; innerIdx < len; innerIdx++) {
                var element = rIcons[innerIdx];
                element.x = tmpX;
                element.y = 0;
                element.setScale(0.8);
                tmpX +=  (element.width*element.scaleX+10);
                // if (tmpX >= GameConfig.stageWidth)
                // {
                //     tmpX = 20;
                //     scroStartY += element.height + 15;
                //     element.x = tmpX;
                //     element.y = scroStartY;
                //     tmpX +=  (element.width+ 15);
                // }
                element.cacheAsBitmap = true;
                view._rewardGroup.addChild(element);
            }

            view._needTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip6`, view.getUiCode()), [LanguageManager.getlocal(`servantInfo_speciality${view.cityId == 1 ? 7 : (view.cityId - 1)}`), (view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1).toString()]);
            view.freshlist();
        }
    }

    private sendBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let data = evt.data.data.data;
            App.CommonUtil.showTip(LanguageManager.getlocal(`countryWarSuccessServantTip`));
            view.hide();
        }
    }

    private checkBuzhen(event:egret.Event):void{
        let data = event.data;
        let view = this;
        let type = data.type;
        let info = view.vo.getCityTaskStaus(view.cityId);
        ////1可派遣 2已派遣 3可领取 4已完成
        let status = info.status;
        if(status != 1){
            return;
        }
		if(type == `add`){
			if(Object.keys(view.vo.selectServant).length == this._taskNeed){
				return;
			}
			view.vo.selectServant[data.servantId] = 1;
		}
		else if(type == `delete`){
            if(Object.keys(view.vo.selectServant).length == this._taskNeed && (view._servantgroup.y == GameConfig.stageHeigth && status == 1)){           
                view._tmp = Api.chatVoApi.object_clone(view.vo.selectServant);
                egret.Tween.get(view.closeBtn).to({y : view.closeBtn.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.closeBtn);
                }, view);

                egret.Tween.get(view.titleTF).to({y : view.titleTF.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.titleTF);
                }, view);

                egret.Tween.get(view.container).to({y : view.container.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.container);
                }, view);

                egret.Tween.get(view.viewBg).to({y : view.viewBg.y - 70}, 300).call(()=>{
                    egret.Tween.removeTweens(view.viewBg);

                    let tmpy = GameConfig.stageHeigth - view._servantgroup.height;
                    view._servantgroup.y = GameConfig.stageHeigth;
                    view._servantgroup.alpha = 1;
                    egret.Tween.get(view._servantgroup).to({y : tmpy}, view._servantgroup.height / 1).call(()=>{
                        egret.Tween.removeTweens(view._servantgroup);
                    }, view);
                }, view);
                return;
            }
			delete view.vo.selectServant[data.servantId];
        }
        view._btn.setGray(Object.keys(view.vo.selectServant).length < this._taskNeed);
        view._tipTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip${Object.keys(view.vo.selectServant).length < this._taskNeed ? `5` : `10`}`, view.getUiCode())); 
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tipTxt, view._showlist, [0, view._showlist.height + 15]);
        view.freshServant();
	}

	private freshServant():void{
		let view = this;
		let arr = [];
		let list : any = view._selectlist;

		for(let i in view.vo.selectServant){
			let obj = Api.servantVoApi.getServantObj(i);
			arr.push({
                data : obj,
                bookvalue : obj.getTotalBookValue(view.cityId - 1),
			});
		}
		arr.sort((a,b)=>{
			return b.bookvalue - a.bookvalue;
		});
		if(arr.length < this._taskNeed){
			for(let i = arr.length; i < this._taskNeed; ++ i){
				arr.push({
					empty : true
				});
			}
		}
		view._showlist.refreshData(arr, view.cityId);

		for(let i in list._scrollListItemArr){
			let unit = <AcThreeKingdomsTaskSelectServantItem>list._scrollListItemArr[i];
			if(view.vo.selectServant[unit._servantInfoVo.servantId]){
				unit.checkSelect(1);
			}
			else{
				unit.checkSelect(2);
			}
        } 
        view._tipTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomstasktip${Object.keys(view.vo.selectServant).length < this._taskNeed ? `5` : `10`}`, view.getUiCode())); 
        view._sendbtn.setText(App.CommonUtil.getCnByCode(Object.keys(view.vo.selectServant).length == this._taskNeed ? `acThreeKingdomstasktip12` : `acThreeKingdomstasktip4`, view.code), true);
		// view._totalNumTxt.text = LanguageManager.getlocal(`acConquerMainLandArmyScore-${view.uiCode}`, [LanguageManager.getlocal(`acmainlandarmy${view._army}-${view.uiCode}`), App.StringUtil.changeIntToText(num)]);
		// view.update();
    }

    private freshlist():void{
        let view = this;
        let obj = Api.servantVoApi.getServantInfoList();
        let info = view.vo.getCityTaskStaus(view.cityId);
        let tasklevel = info.level;
        let taskcfg : Config.AcCfg.ThreeKingdomsTaskListCfg = view.cfg.taskList[tasklevel - 1];
		let arr = [];
		for(let i in obj){
            let unit : ServantInfoVo = obj[i];
			let attend = view.vo.getServantAttend(Number(unit.servantId));
			arr.push({
				bookvalue : unit.getTotalBookValue(view.cityId - 1),
				data : unit,
                isAttend : attend,
                need : view.cityId == 1 ? taskcfg.needValue2 : taskcfg.needValue1
			});
		}
		arr.sort((a,b)=>{
			if(a.isAttend && b.isAttend){
				return b.bookvalue - a.bookvalue;
			}
			else if(a.isAttend){
				return 1;
			}
			else if(b.isAttend){
				return -1;
			}
			else{
                return b.bookvalue - a.bookvalue;
			}
        });
        view._selectlist.refreshData(arr,{
            code : view.code,
            cityid : view.cityId
        });
        let list : any = view._selectlist;

        for(let i in list._scrollListItemArr){
			let unit = <AcThreeKingdomsTaskSelectServantItem>list._scrollListItemArr[i];
			if(view.vo.selectServant[unit._servantInfoVo.servantId]){
				unit.checkSelect(1);
			}
			else{
				unit.checkSelect(2);
			}
        } 

        let tmp = [];
		for(let i = 0; i < this._taskNeed; ++ i){
            let unit = Object.keys(view.vo.selectServant)[i];
            let servantObj = Api.servantVoApi.getServantObj(unit);
			if(servantObj){
				tmp.push({
                    data : servantObj,
                    bookvalue : servantObj.getTotalBookValue(view.cityId - 1),
                });
			}
			else{
				tmp.push({
					empty : true
				});
			}
        }
        tmp.sort((a,b)=>{
			return b.bookvalue - a.bookvalue;
        });
        view._showlist.refreshData(tmp, view.cityId);
    }

	public dispose():void{
        let view = this;
        
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAINLAND_SERVANT_CHANGE,view.checkBuzhen,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SERVANCLOSE_REFRESH,view.freshlist,view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        App.MessageHelper.removeNetMessage(NetRequestConst. REQUEST_THREEKINGDOMS_TASKSTART, view.sendBack, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_THREEKINGDOMS_HIDE, view.hide, view);
        view._cdTxt = null;
        view._tipTxt = null;
        view._fightcd = 0;
        view._btn = null;
        view._selectlist = null;
        view._showlist = null;
        view._sendbtn = null;
        view._tasktype = null;
        view._rewardGroup.dispose();
        view._taskNeed = 0;
        view._servantgroup = null;
        view._needTxt = null;
		super.dispose();
	}
}