/**
 * 三国争霸城市进攻准备弹窗
 * author qianjun
 */
class AcThreeKingdomsPrepareView extends PopupView{
    private _cdTxt : BaseTextField = null;
    private _fightNumTxt : BaseTextField = null;
    private _tipTxt : BaseTextField = null;
    private _costTxt : BaseTextField = null;
    private _line : BaseBitmap = null;

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
    
    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
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

    private get judianid():number{
        return this.param.data.judianid;
    }


	protected getResourceList():string[]{
		return super.getResourceList().concat([
           `titleupgradearrow`
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

    protected getRequestData():{requestType:string,requestData:any}{	
		return {requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO,requestData:{
            activeId : this.vo.aidAndCode,
        }};
    }

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false){
			return;
		}
		if(rData.cmd==NetRequestConst.REQUEST_THREEKINGDOMS_GETMAPINFO){
            this.vo.setMapInfo(rData.data);
		}
	}


	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.attackBack, view);
        let code = view.getUiCode();
        let vo = view.vo;
        let cfg = view.cfg;
        let isCentercity = view.kingdomid == 0;
        let info = view.vo.getJudianPlayerInfo(view.kingdomid, view.cityId, view.judianid);
        // obj = {
        //     uid : 1,
        //     pic : 1,
        //     ptitleid : 4000 + id,
        //     name : '玩家名',
        //     kingdomid : App.MathUtil.getRandom(1,4),
        //     army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
        // };

        //1 对战敌军 2 对战npc 3 对友方部队 4 对自己部队 
        let type = 1;
        if(info){
            if(info.uid == Api.playerVoApi.getPlayerID()){
                type = 4;
            }
            else if(info.kingdomid == view.vo.getMyKingdoms()){
                type = 3;
            }
            else{
                type = 1;
            }

        }   
        else{
            type = 2;
        }
        //顶部描述
        let descbg = BaseBitmap.create(`public_9_bg95`);
        descbg.width = 220;
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparetopdesc${type}`, code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(descbg);
        view.addChildToContainer(descTxt);

        descbg.x = view.viewBg.x + (view.viewBg.width - descbg.width) / 2;
        descbg.y = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);

        //顶部信息
        let bg = BaseBitmap.create(`public_9_bg94`);
        bg.width = 515;
        bg.height = 115;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, descbg, [0,descbg.height+10]);
        let armynum = '';
        let zhankingdomn = view.kingdomid;
        //玩家头像
        if(type != 2){
            armynum = info.army;
            zhankingdomn = info.kingdomid;
            //头像框
			let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(info.pic),(info.ptitleid));
			view.addChildToContainer(headContainer);
			headContainer.addTouchTap(()=>{
				NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
					ruid:info.uid,
					rzid:Api.mergeServerVoApi.getTrueZid(info.uid)
				});
			},this);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, headContainer, bg, [15,0]);
            //玩家名
            let namebg = BaseBitmap.create(`public_titlebg`);
            namebg.width = 240;
            view.addChildToContainer(namebg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, namebg, headContainer, [headContainer.width+7,5]);

			let playernameTxt = ComponentManager.getTextField(`${info.name}（${Api.mergeServerVoApi.getAfterMergeSeverName(info.uid, true, info.zid)}）`, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChildToContainer(playernameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, playernameTxt, namebg, [20,0]);

            let armynumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip${type == 4 ? 54 : 29}`, code), [armynum.toString(), (info.army / info.max * 100).toFixed(0)]), 22, TextFieldConst.COLOR_BROWN);
            view.addChildToContainer(armynumTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, armynumTxt, namebg, [0,namebg.height+20]);
    
			// playernameTxt.textColor = Number(info.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_WARN_YELLOW2 : TextFieldConst.COLOR_BROWN;
			//称号
			// let titleId = info.titleid;
			// let width = 0;
			// if(titleId){
			// 	let titleinfo = App.CommonUtil.getTitleData(titleId);
			// 	if(titleinfo.title != ``){
			// 		let titleImg = App.CommonUtil.getTitlePic(titleinfo);
			// 		titleImg.width = 155;
			// 		titleImg.height = 59;
			// 		view.setLayoutPosition(LayoutConst.lefttop, titleImg, namebg, [0,namebg.height+7]);
            //         view.addChildToContainer(titleImg);
                    
            //         App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, armynumTxt, bg, [260,60]);
			// 	}
			// }
        }
        else{
            armynum = App.StringUtil.changeIntToText(view.cfg.powerNeed);
            let npcTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparenpc${zhankingdomn}`, code), [isCentercity ? LanguageManager.getlocal(`${view.vo.getTodayWeek() == 6 ? `acThreeKingdomscenterCityName_1-1` : `acThreeKingdomscenterCityName_2-1`}`) : ``]), 22, TextFieldConst.COLOR_BROWN);
            view.addChildToContainer(npcTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, npcTxt, bg, [30,50]);
        }
        let shuiyin = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsshuiyin${zhankingdomn}`, code));
        view.addChildToContainer(shuiyin);
        shuiyin.setScale(1.3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, shuiyin, bg, [5,5]);

        let vsimg = BaseBitmap.create(`threekingdomspreparevs${type == 2 ? (zhankingdomn == view.vo.getMyKingdoms() ? 3 : 2) : type}`);
        view.addChildToContainer(vsimg);
        vsimg.setScale(0.65);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsimg, bg, [0,bg.height-20]);
        //
        //顶部描述
        let descbg2 = BaseBitmap.create(`public_9_bg95`);
        descbg2.width = 220;
        let descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparebottomdesc${type}`, code)), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(descbg2);
        view.addChildToContainer(descTxt2);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg2, vsimg, [0,vsimg.height*vsimg.scaleY-20]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt2, descbg2);

        let attackbg = BaseBitmap.create(`public_9_bg94`);
        attackbg.width = 515;
        view.addChildToContainer(attackbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, attackbg, descbg2, [0,descbg2.height+10]);

        let listbg = BaseBitmap.create(`threekingdomspreparemask1`);
        listbg.width = 485;
        listbg.height = 105;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, attackbg, [0,10]);

        let listbg2 = BaseBitmap.create(`threekingdomspreparemask2`);
        listbg2.width = 120;
        listbg2.height = 105;
        view.addChildToContainer(listbg2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, listbg2, listbg);
        //攻击加成
        let total1 = 0;
        //血量加成
        let total2 = 0;
        let total1base = view.vo.getMyAtkNum();
        let total2base = view.vo.getMyArmyNum();
        for(let i = 1; i < 4; ++ i){
            let group = new BaseDisplayObjectContainer();
            group.width = 485;
            group.height = 35;
            view.addChildToContainer(group);
            group.setPosition(listbg.x, listbg.y+(i-1)*35);

            let icon = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsprepareadd${i+1}`,code));
            group.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, group, [10,0], true);

            let line = BaseBitmap.create(`public_line1`);
            line.width = 375;
            group.addChild(line);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line, group, [110,0], true);
            line.visible = i < 3;
            let strList = new Array<string>();
            //buff加成 1城防 2神将 3援军 4神器
            let add = view.vo.getAddBuff(i+1, isCentercity, view.kingdomid, view.cityId, view.vo.getMyKingdoms());
            if(add.length > 1){
                let tmpX = 140;
                for(let i = 0; i < add.length; ++ i){
                    let addstr = ``;
                    let addtype = add[i].addType;
                    let num = add[i].add;
                    if(num <= 1){
                        addstr = (num * 100).toFixed(2) + '%';
                        if(addtype == 1){
                            total1 += (total1base * num);
                        }
                        else if(addtype == 2){
                            total2 += (total2base * num);
                        }
                    }
                    else{
                        addstr = App.StringUtil.changeIntToText(num);
                        if(addtype == 1){
                            total1 += (num);
                        }
                        else if(addtype == 2){
                            total2 += (num);
                        }
                    }
                    // let addTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff${addtype}`, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]), 18, TextFieldConst.COLOR_BROWN);
                    // group.addChild(addTxt);
                    // addTxt.x = tmpX;
                    // addTxt.y = (group.height - addTxt.height) / 2;
                    // tmpX += (addTxt.textWidth + 50);
                    strList.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff${addtype}`, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]));
                    //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, addTxt, buffbg, [0,6]);
                }
                            
                let lampContainer = new LoopLamp(strList, LayoutConst.verticalCenter);
                lampContainer.mask = new egret.Rectangle(0,-10,350,40);
                lampContainer.x = 130;
                lampContainer.y = 6;
                group.addChild(lampContainer);
                // let addTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff2`, code), [String(TextFieldConst.COLOR_WARN_GREEN), add[1].toString()]), 18);
                // group.addChild(addTxt2);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, addTxt2, addTxt, [0,addTxt.textHeight+3]);
            }
            else if(add.length == 1){
                //只有属性加成
                let addstr = ``;
                let num = add[0].add;
                let addtype = add[0].addType;
                if(num <= 1){
                    addstr = (num * 100).toFixed(2) + '%';
                    if(addtype == 1){
                        total1 += (total1base * num);
                    }
                    else if(addtype == 2){
                        total2 += (total2base * num);
                    }
                }
                else{
                    addstr = App.StringUtil.changeIntToText(num);
                    if(addtype == 1){
                        total1 += (num);
                    }
                    else if(addtype == 2){
                        total2 += (num);
                    }
                }
                let addTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff${addtype}`, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]),18, TextFieldConst.COLOR_BROWN);
                group.addChild(addTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, addTxt, group, [140,0], true);
                //strList.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff${addtype}`, code), [String(TextFieldConst.COLOR_WARN_GREEN2), addstr]));
            }
            else{
                let addTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff0`, code)), 18, TextFieldConst.COLOR_BROWN);
                group.addChild(addTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, addTxt, group, [140,0], true);
            }
        }
        // //最终加成
        // let total1Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff1`, code), [String(TextFieldConst.COLOR_WARN_RED2), total1.toString()]), 22, TextFieldConst.COLOR_BROWN);
        // view.addChildToContainer(total1Txt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, total1Txt, attackbg, [30,165]);

        // let total2Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddbuff2`, code), [String(TextFieldConst.COLOR_WARN_RED2), total2.toString()]), 22, TextFieldConst.COLOR_BROWN);
        // view.addChildToContainer(total2Txt);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, total2Txt, total1Txt, [total1Txt.textWidth+40,0]);
        let txtbg = BaseBitmap.create(`threekingdomspreparetotalbg`);
        view.addChildToContainer(txtbg);

       
        let total3Txt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareaddtotal`, code), [App.StringUtil.changeIntToText(total2base+total2)]), 22,TextFieldConst.COLOR_WARN_YELLOW);
        view.addChildToContainer(total3Txt);

        txtbg.width = total3Txt.width + 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txtbg, listbg, [0,listbg.height+15]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, total3Txt, txtbg, [0,1]);

        let line = BaseBitmap.create(`public_cut_line`);
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, txtbg, [0,txtbg.height+10]);
        view._line = line;
        //消耗物资
        let isfree = view.vo.isFightFree(isCentercity ? 2 : 1);
        let costStr = ``;
        if(isfree){
            costStr = ``;//LanguageManager.getlocal(`sysFreeDesc`);
        }
        else{
            //普通消耗粮草 中心城消耗军资
            let havenum = isCentercity ? view.vo.getMyResource() : view.vo.getMyFood();
            let cost =isCentercity ? view.cfg.costFood1 : view.cfg.costFood2;
            costStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip41`, code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(view.vo.getCurWarPeriod() == 3 ? `acThreeKingdomsTip25` : `acThreeKingdomsTip24`, code)), String(havenum >= cost ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED),`${havenum}/${cost}`]);
        }

        let costTxt = ComponentManager.getTextField(costStr, 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(costTxt);
        view._costTxt = costTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, costTxt, line, [0,line.height+10]);

        
        let fightBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `dailybossRecoveryBattleNumDesc`, ()=>{
            //出战处理
            //时间已过期
            if(view.vo.isInWarTime() && ((isCentercity && view.vo.getCurWarPeriod() == 3) || (!isCentercity && view.vo.getCurWarPeriod() < 3 && view.vo.getCurWarPeriod() > 0))){
                //物资不满足
                let havenum = isCentercity ? view.vo.getMyResource() : view.vo.getMyFood();
                let cost = isCentercity ? view.cfg.costFood1 : view.cfg.costFood2;
                let canfight = false;
                let fightcd = view.vo.getFightCD(isCentercity); 
                if(fightcd <= 0){
                    if(isfree){
                        canfight = true;
                    }
                    else{
                        if(fightnum > 0){
                            canfight = true;
                        }
                        else{
                            //消耗物资
                            if(havenum >= cost){
                                canfight = true;
                            }
                            else{
                                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparerfighttip2`, code), [LanguageManager.getlocal(`acthreekingdomswaricon${isCentercity ? 2 : 1}`)]));
                            }
                        }
                    }
                }
                else{
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparerfighttip4`, code)));  
                }

                if(canfight){
                    //打开战斗
                    NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, { 
                        activeId : view.vo.aidAndCode, 
                        mainland : isCentercity ? 7 : ((view.kingdomid - 1) * 2 + (view.cityId - 3)),
                        building : view.judianid,
                        preuid : info ? info.uid : 0,
                    });
                }

            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparerfighttip1`, code)));
            }
            
        }, view);
        view.addChildToContainer(fightBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fightBtn, line, [0,line.height+40]);
        //出战次数和倒计时
        let fightcd = view.vo.getFightCD(isCentercity); 
        let fightnum = view.vo.getMyFightNum(isCentercity ? 2 : 1);        
      
        let fightNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomspreparefightnum`, code), [`<font color=${fightnum == 0 ? TextFieldConst.COLOR_WARN_RED2 : TextFieldConst.COLOR_WARN_GREEN2}>${fightnum}</font>/${view.cfg.getFightNum(isCentercity ? 2 : 1)}`]), 20, TextFieldConst.COLOR_BROWN);
        view.addChildToContainer(fightNumTxt);
        view._fightNumTxt = fightNumTxt;

        let cdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`studyatkCdTxt1`, []), 20, TextFieldConst.COLOR_BROWN);
        view._cdTxt = cdTxt;
        view.addChildToContainer(cdTxt);
        if(type == 4){
            fightBtn.setText(`acThreeKingdomsbattletip5`, true);
        }
        costTxt.visible = fightcd <= 0 && fightnum <= 0;
        fightNumTxt.visible = fightcd <= 0 && fightnum > 0;
        cdTxt.visible = fightcd > 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, fightNumTxt, line, [0,line.height+10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cdTxt, line, [0,line.height+10]);


        let str = '';
        let param = [];
        //是否已派遣
        let isSendArmy = view.vo.isSendArmy();
        let armyinfo = view.vo.myArmyInfo();
        if(type == 4){
            str = `acThreeKingdomsprepareremptytip4`;
        }
        else{
            if(isSendArmy){
                str =  `acThreeKingdomspreparerinfighttip`;
                param.push(armyinfo.kingdomid ? view.vo.getCityName(armyinfo.kingdomid, armyinfo.cityid, armyinfo.judianid) : LanguageManager.getlocal(`acthreekingdomcenter${view.vo.getTodayWeek() == 6 ? 1 : 2}-1`, [armyinfo.judianid]));
                param.push(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsprepareremptytip${type}`,code)));
            }
            else{
                str =  `acThreeKingdomsprepareremptytip${type}`;
            }
        }

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(str,code),param), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, fightBtn, [0,fightBtn.height+10]);
        view._tipTxt = tipTxt;

        attackbg.height = tipTxt.y + tipTxt.textHeight + 7 - attackbg.y + 3;
        
        view.tick();
    }

    public tick():void{
        let view = this;
        let isCentercity = view.kingdomid == 0;
        let cd =  view.vo.getFightCD(isCentercity);
        if(cd > 0){
            view._cdTxt.text = LanguageManager.getlocal(`studyatkCdTxt1`, [App.DateUtil.getFormatBySecond(cd)]);
        }
        else{
            view._cdTxt.text = ``;
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._fightNumTxt, view._line, [0,view._line.height+10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdTxt, view._line, [0,view._line.height+10]);
        let fightnum = view.vo.getMyFightNum(isCentercity ? 2 : 1);       
        view._costTxt.visible = fightnum <= 0 && cd <= 0;
        view._fightNumTxt.visible = cd <= 0 && fightnum > 0;
    }


	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomspreparetitle`, this.getUiCode());
    }

    private attackBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let data = evt.data.data.data;
            let showfight = false;
            let showpop = false;
            switch(Number(data.tkStat)){
                case 4://--4打败玩家成功占领
                case 8://--8占领失败
                    showfight = true;
                    break;
                case 7:// --7占领npc
                case 10://10战场易手
                case 11:// --11支援成功换防
                case 12://--12支援失败变为援军
                    showpop = true;   
                    break;
                    
            }
            if(showpop){
                if(Number(data.tkStat) == 10){
                    App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsbattletkStat${data.tkStat}`, view.getUiCode())));
                }
                else{
                    ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSWARRESULTVIEW,{
                        point:data.honorScore,
                        winflag:1,
                        f:this.hide,
                        o:this,
                        iscenter:this.kingdomid == 0,
                        tip : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsbattletkStat${data.tkStat}`, view.getUiCode()))
                    });
                }
            }
            if(showfight){
                /**
                 *   pklogs : [
                        [1,1,[[0,100],[0,50],[0,100]],{ uid : 100001,
                            name : '玩家1',
                            power : 10000,
                            attr : 100000,
                            quality : 2,
                            fullattr : 500,
                            plevel : 3,
                            skillRate : 1,
                            skillValue : 10,
                            title : 3000 + 5,
                            level : 8,
                            pic : 3,
                            ptitle : 4000 + 5,
                            kingdomid : 1,
                            army : 20000000,},
                                { uid : 100001,
                                name : '玩家2',
                                power : 10002,
                                attr : 100002,
                                quality : 3,
                                fullattr : 200,
                                plevel : 4,
                                skillRate : 1,
                                skillValue : 20,
                                title : 3000 + 6,
                                level : 9,
                                pic : 2,
                                ptitle : 4000 + 7,
                                kingdomid : 2,
                                army : 20000003,}],
                        [1,0,[[0,50],[0,50],[0,50],[1,300]],{sid:"1001", attr:200, fightattr : 200, quality:1, lv:1, s1lv:1, s2lv:1, fullattr:200, clv:1, equip:"", weaponDps:1},{sid:"1002", attr:300, quality:2, lv:2, s1lv:1, s2lv:1, fullattr:300, clv:2, equip:"10021", weaponDps:2, fightattr : 300}],
                        [0,1,[[0,50],[1,100],[0,50],[1,200]],{sid:"1003", attr:200, fightattr : 200, quality:1, lv:3, s1lv:1, s2lv:1, fullattr:200, clv:3, equip:"", weaponDps:1},{sid:"1002", attr:300, quality:2, lv:2, s1lv:1, s2lv:1, fullattr:300, clv:2, equip:"10021", weaponDps:3, fightattr : 200}],
                    ],
                    winuid : 100001,
                    sidlist1 : [{sid : 1001, clv : 1, lv : 1, equip : `10011`, fightattr : 200}, {sid : 1002, clv : 2, lv : 2, fightattr : 200}],
                    sidlist2 : [{sid : 1003, equip : `10031`, fightattr : 300, clv : 3, lv : 3}],
                */
                //打开战斗
                ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSBATTLEVIEW,{
                    aid : view.aid,
                    code : view.code,
                    cityId : view.cityId,
                    kingdomid : view.kingdomid,
                    judianid : view.judianid,
                    pklogs : data.attacklog.pklogs,
                    winuid : data.attacklog.winuid,
                    sidlist1 : data.attacklog.sidlist1,
                    sidlist2 : data.attacklog.sidlist2,
                    point : data.honorScore,
                    aBuff : data.attacklog.aBuff,
                    bBuff : data.attacklog.bBuff,
                });
                view.vo.listred = true;
            }
            view.hide();
        }
    }

	public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ATTACKCITY, view.attackBack, view);
        view._cdTxt = null;
        view._fightNumTxt = null;
        view._tipTxt = null;
        view._costTxt = null;
        view._line = null;
		super.dispose();
	}
}