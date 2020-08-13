/*
author : qianjun
desc : 帮会争顶活动
*/
class AcBattleGroundMapView extends CommonView{
    private _bgGroup : BaseDisplayObjectContainer = null;
    private _period : number = 1;
    private _cdBg : BaseBitmap = null;
    private _cdText : BaseTextField = null;
    private _chatTxt :BaseTextField = null;
    private _bottomBg : BaseBitmap = null;
    private touchBoo:boolean =true;
	private moreBg:BaseBitmap =null;
	private describeTxt:BaseTextField =null;
	private moveContainer:BaseDisplayObjectContainer =null;
    private _moreArrow:BaseBitmap = null;
    private _isShowMore:boolean = false;
    private _touchBg:BaseBitmap =null;
    private _currMaskBmp:BaseBitmap =null;
    private isData:boolean =false;
    private listconditions:BaseTextField = null;
    private _scrollList: ScrollList;
    private _atkraceInfoVoList:Array<any>=[];
    private _nameTxt:BaseTextField =null;
    private _bottomLogTxt : BaseTextField = null;
    private _bgScrollView : ScrollView = null;
    private _countDownTime:number = 0;
    private _fightflag:boolean = null;
    private _randBtn:BaseButton =null;
    private _curFightType = 0;//1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽
    private _curAllianceMap = -1;//我的帮会所在地图
    private _curAllianceIdx = -1;//我的帮会索引
    private _stopTouch = false;
    private _leftArrow : BaseButton = null;
    private _rightArrow : BaseButton = null;
    private _needFresh = false;
    private _randClick = false;
    private _logBtn : BaseButton = null
    private _cheerBtn : BaseButton = null

    public constructor(){
        super();
    }

    private tmpX = 0;
   
    private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
    private get code() : string{
        return String(this.param.data.code);
    }

      protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

    private get aid() : string{
        return String(this.param.data.aid);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }
    
    protected getTitleStr():string{
        return `acBattleRoundViewTitle-${this.getUiCode()}`
    }

    private getUIcode():string{
        let code = this.code;
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;;
        }
        return code;
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        let view = this;
		return {requestType:NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,requestData:{
			activeId : view.vo.aidAndCode,
		}};
    }
    
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        let view = this;
        if(data.data.data){
            if(data.data.data.waiting){
                view.vo.setWaiting(data.data.data.waiting);
            }
            else{
                view.vo.setWaiting(0);
                if(data.data.data && data.data.cmd == NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND){
                    if (data.data.data.battleground.fightflag == false) {
                        this._fightflag= false;
                    }
                    else {
                        this._fightflag= true;
                    }
                    if(data.data.data.battleground){
                        view.vo.setRaceInfo(data.data.data.battleground);
                    }
                    if(data.data.data.map){
                        view.vo.setMap(data.data.data.map);
                    }
                    if(data.data.data.myrankArr){
                        view.vo.setRank(data.data.data.myrankArr);
                    }
                    if(data.data.data.alive){
                        view.vo.setAlive(data.data.data.alive);
                    }
                    else{
                        view.vo.setAlive(0);
                    }
                    view.resetInfo();
                    if(view._needFresh){
                        view._needFresh = false;
                        let leftX = view._bgScrollView.scrollLeft;
                        let range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                        for(let i = 0; i < this.mapNum; ++ i){
                            let mapleft = i * this.mapWidth;
                            if(mapleft + this.mapWidth >= range[0] && mapleft < range[1]){
                                view.freshCity(i);
                            }
                        }
                    }
                }
            }
        }
		//view.api.setBossNumInfo(data.data.data);
	}

    protected getResourceList():string[]{
        let ret = super.getResourceList();
        let code = this.getUiCode();
        ret = ret.concat([
           `battlegroundbg-${code}`,`battleground1-${code}`,`battleground2-${code}`,`battleground3-${code}`,`battleground4-${code}`,`battlegroundmap-${code}`,
           `servant_mask`,`arena_bottom_bg`,`battlegrounddestroy`,`battlegroundsmoke`,`battlegrounddestroy`,
           `battlegroundsmapsmoke`,`battlegroundsmoke2_`,`battlegroundsmoke3_`,`battlegroundsmoke4_`,`arena_arrow`,"arena_more_down","arena_more","chatlaba","rankinglist_line","rankinglist_rankbg"
           ,`battlegroundfire${this.getUIcode()}_`
        ]);
		return ret;
	}
    
    // 背景图名称
	protected getBgName():string{
        return 'battlegroundbg-' + this.getUiCode();
    }

    protected getRuleInfo() : string{
        if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
			return "acBattleRoundRule-1_newRule_withOpenRefusal";
		}
        return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
    }
    
    protected getRuleInfoParam() : string[]{
        let tmp = [];
        if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
            tmp.push(this.cfg.lowestScore.toString());
        }
        tmp.push(this.cfg.disableTime.toString());
        return tmp;
    } 

    //获取此次活动需要创建的地图数目
    private get mapNum():number{
        let servernum = this.vo.getMapLenth();
        let mapNum = Math.ceil(servernum / 16);
        return mapNum;
    }

    //地图宽度
    private get mapWidth():number{
        return 1280;
    }
    
    protected initBg():void{
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;

        let bgName:string=this.getBgName();
        this.viewBg = BaseBitmap.create(bgName);//`battlegroundmask-${this.code}`
        
		if(bgName){   
            let bggroup = new BaseDisplayObjectContainer();
            bggroup.width = GameConfig.stageWidth * 2 * this.mapNum;
            bggroup.height = GameConfig.stageHeigth;
            this.addChild(bggroup);
            this._bgGroup = bggroup;
            bggroup.addChild(this.viewBg);
            for(let i = 0; i < this.mapNum; ++ i){
                if(i > 0){
                    continue;
                }
                let map = BaseBitmap.create(bgName);
                map.name = `map${i}`;
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, map, bggroup, [i * this.mapWidth,0], true);
                bggroup.addChild(map);
                this.viewBg.x = map.x + map.width;
                this.viewBg.y = map.y;
                for(let j in this.mapPos){
                    if(Number(j) > 8){
                        break;
                    }
                    let unit = this.mapPos[j];
                    let idx = i * 16 + Number(j);
                    let info = this.vo.getAllInfoById(idx);
                    if(!info){
                        continue;
                    }
    
                    let mask1 = BaseBitmap.create(`battleground${info.period}-${this.getUiCode()}`);
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.anchorOffsetY = mask1.height / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;
                    mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                    mask1.name = `alliancebuild${info.alliId}`;

                    // let cheerbg = BaseBitmap.create(`battlegroundcheericon-${this.getUIcode()}`);
                    // cheerbg.setScale(0.7);
                    // cheerbg.name = `alliancecheer${info.alliId}`;
                    // let cheertxt = ComponentManager.getBitmapText(info.cheerlv, `crit_fnt`);
                    // cheertxt.name = `alliancecheertxt${info.alliId}`;
                    // if(this.vo.isAlliOut(info.alliId)){
                    //     App.DisplayUtil.changeToGray(cheerbg);
                    //     App.DisplayUtil.changeToGray(cheertxt);
                    // }
                    if(Number(j) == 1){
                        let smoke = ComponentManager.getCustomMovieClip(`battlegroundsmapsmoke`,10,70);
                        smoke.width = 74;
                        smoke.height = 176;
                        smoke.anchorOffsetX = smoke.width / 2;
                        smoke.anchorOffsetY = smoke.height / 2;
                        smoke.x = 349;
                        smoke.y = map.y + 240;
                        smoke.setScale(2);
                        smoke.rotation = 17;
                        bggroup.addChild(smoke);
                        smoke.name = 'mapsmoke'; 
                        smoke.playWithTime(0);
                    }
                    mask1.addTouch((e : egret.Event)=>{
                        if(this._stopTouch){
                            return;
                        } 
                        if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())){
                           //跳转
                           this.moveToMyAlliance();
                        }
                        else{
                            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDALLIINFOVIEW,{
                                code : this.code,
                                aid : this.aid,
                                alliId : info.alliId
                            });
                        }
                        
                    },this,null,true);
                    bggroup.addChild(mask1);
                    //信息
                    let infobg = BaseBitmap.create(`battlegroundallibg-${this.getUiCode()}`);
                    infobg.name = `alliancebg${info.alliId}`;
                    let allinameTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    allinameTxt.name = `allianceTxt${info.alliId}`;
                    allinameTxt.lineSpacing = 5;
                    allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                    bggroup.addChild(infobg);
                    bggroup.addChild(allinameTxt);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cheerbg, mask1, [-20,85]);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheerbg, [0, 10]);
                    
                    // bggroup.addChild(cheerbg);
                    // bggroup.addChild(cheertxt);
                    // if(info.cheerlv > 0 && !this.vo.isAlliOut(info.alliId)){      
                    //     let fire = ComponentManager.getCustomMovieClip(`battlegroundfire${this.getUIcode()}_`, 9);
                    //     fire.name = `fire${info.alliId}`;
                    //     fire.width = 311;
                    //     fire.height = 416;
                    //     fire.anchorOffsetX = fire.width / 2;
                    //     fire.anchorOffsetY = fire.height / 2;
                    //     fire.setScale(0.5);
                    //     fire.playWithTime(-1);
                    //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, fire, cheerbg, [0,0]);
                    //     bggroup.addChild(fire);
                    // }
                }
            }
            
            let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
            let noticescrollView = ComponentManager.getScrollView(bggroup,rect);
            noticescrollView.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
            noticescrollView.verticalScrollPolicy = 'off';
            bggroup.y = 0;
            this.addChild(noticescrollView);

            noticescrollView.bindMoveCompleteCallback(()=>{
                this.freshMap();
            },this);
            this._bgScrollView = noticescrollView;
            this.freshMap();
        }
    }

    //背景地图随可视窗口的创建刷新和移出
    private freshMap():void{
        let view = this;
        view.tmpX = 0;
        let leftX = view._bgScrollView.scrollLeft;
        //左右箭头
        if(view._leftArrow){
            view._leftArrow.visible = leftX > 0;
            view._rightArrow.visible = leftX < ((view.mapNum - 1) * this.mapWidth + (this.mapWidth / 2));
        }
        
        for(let i = 0; i < this.mapNum; ++ i){
            let map = view._bgGroup.getChildByName(`map${i}`);
            if(!map){
                map = BaseBitmap.create(this.getBgName());
                let range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                let mapleft = i * this.mapWidth;
                if(mapleft + this.mapWidth >= range[0] && mapleft < range[1]){
                    map.name = `map${i}`;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, map, view._bgGroup, [i * this.mapWidth,0], true);
                    view._bgGroup.addChild(map);
                }
                else{
                    map = null;
                }
            }
            if(map){
                let mapleft = map.x;
                let range = [leftX, Math.min(view._bgGroup.width - GameConfig.stageWidth, leftX + GameConfig.stageWidth)];
                if(mapleft + this.mapWidth >= range[0] && mapleft < range[1]){
                    view.freshCity(i);
                }
                else{
                    if(map){
                        view._bgGroup.removeChild(map);
                    }
                    for(let j in view.mapPos){
                        view.removeCity(i * 16 + Number(j));
                    }
                }
            }
        }
        let mapsmoke = view._bgGroup.getChildByName(`mapsmoke`);
        if(mapsmoke){
            view._bgGroup.setChildIndex(mapsmoke, 99999);
        }
    }

    //每张地图上的城池状态变化
    private freshCity(mapId : number):void{
        let view = this;
        let leftX = view._bgScrollView.scrollLeft;
        let map = view._bgGroup.getChildByName(`map${mapId}`);
        if(map){
            let range = [leftX, leftX + GameConfig.stageWidth];
            for(let j in view.mapPos){
                let unit = view.mapPos[j];
                let idx = mapId * 16 + Number(j);
                let info = view.vo.getAllInfoById(idx);
                if(!info){
                    continue;
                }
                let mask1 : any = view._bgGroup.getChildByName(`alliancebuild${info.alliId}`);
                // let cheerbg : any = view._bgGroup.getChildByName(`alliancecheer${info.alliId}`);
                // let cheertxt : any = view._bgGroup.getChildByName(`alliancecheertxt${info.alliId}`);
                if(!mask1){
                    mask1 = BaseBitmap.create(`battleground${info.period}-${this.getUiCode()}`);
                    mask1.anchorOffsetX = mask1.width / 2;
                    mask1.x = map.x + unit.x + mask1.anchorOffsetX;
                    let scrollLeft = mask1.x - mask1.anchorOffsetX;
                    if(scrollLeft < range[1] && scrollLeft + mask1.width >= range[0]){
                        mask1.anchorOffsetY = mask1.height / 2;
                        mask1.y = map.y + unit.y + mask1.anchorOffsetY;
                        mask1.name = `alliancebuild${info.alliId}`;
                        mask1.addTouch((e : egret.Event)=>{
                            if(this._stopTouch){
                                return;
                            } 
                            if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())){
                                //跳转
                                this.moveToMyAlliance();
                            }
                            else{
                                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDALLIINFOVIEW,{
                                    code : this.code,
                                    aid : this.aid,
                                    alliId : info.alliId
                                });
                            }
                           
                        },this,null,true);
                        view._bgGroup.addChild(mask1);
                        //信息
                        let infobg = BaseBitmap.create(`battlegroundallibg-${this.getUiCode()}`);
                        infobg.name = `alliancebg${info.alliId}`;
                        let allinameTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                        allinameTxt.name = `allianceTxt${info.alliId}`;
                        allinameTxt.lineSpacing = 5;
                        allinameTxt.textAlign = egret.HorizontalAlign.CENTER;
                        view._bgGroup.addChild(infobg);
                        view._bgGroup.addChild(allinameTxt);

                        // if(!cheertxt){
                        //     cheerbg = BaseBitmap.create(`battlegroundcheericon-${this.getUIcode()}`);
                        //     cheerbg.setScale(0.7);
                        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cheerbg, mask1, [-20,85]);
                        //     cheerbg.name = `alliancecheer${info.alliId}`;
                            
                        //     cheertxt = ComponentManager.getBitmapText(info.cheerlv, `crit_fnt`);
                        //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheerbg, [0, 10]);
                        //     cheertxt.name = `alliancecheertxt${info.alliId}`;

                        //     if(view.vo.isAlliOut(info.alliId)){
                        //         App.DisplayUtil.changeToGray(cheerbg);
                        //         App.DisplayUtil.changeToGray(cheertxt);
                        //     }
        
                        //     view._bgGroup.addChild(cheerbg);
                        //     view._bgGroup.addChild(cheertxt);
                        //}

                        // let fire = view._bgGroup.getChildByName(`fire${info.alliId}`);
                        // if(info.cheerlv > 0 && !fire && !view.vo.isAlliOut(info.alliId)){
                        //     let fire = ComponentManager.getCustomMovieClip(`battlegroundfire${this.getUIcode()}_`, 9);
                        //     fire.name = `fire${info.alliId}`;
                        //     fire.width = 311;
                        //     fire.height = 416;
                        //     fire.anchorOffsetX = fire.width / 2;
                        //     fire.anchorOffsetY = fire.height / 2;
                        //     fire.setScale(0.5);
                        //     fire.playWithTime(-1);
                        //     App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, fire, cheerbg, [0,0]);
                        //     view._bgGroup.addChild(fire);
                        // }
                    }
                    else{
                        mask1 = null;
                    }
                }
                let scrollLeft = 0;
                if(mask1){
                    scrollLeft = mask1.x - mask1.anchorOffsetX;
                }
                // if(cheertxt){
                //     cheertxt.text = info.cheerlv;
                //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheerbg, [0, 10]);
                // }
    
                if(mask1 && scrollLeft < range[1] && scrollLeft + mask1.width >= range[0]){
                   view.changeCity(info.alliId);
                }
                else{
                    view.removeCity(info.alliId);
                }
            }
        }
    }

    private changeCity(alliId : number):void{
        let view = this;
        let info = this.vo.getAllInfoById(alliId);
        let mask1 : any = view._bgGroup.getChildByName(`alliancebuild${info.alliId}`);
        mask1.setRes(`battleground${info.period}-${view.getUiCode()}`);
        let smoke = view._bgGroup.getChildByName(`smoke${info.alliId}`);
        let destroy = view._bgGroup.getChildByName(`destroy${info.alliId}`);
        if(smoke){
            view._bgGroup.removeChild(smoke);
        }
        if(destroy){
            egret.Tween.removeTweens(destroy);
            view._bgGroup.removeChild(destroy);
        }
        if(info.period > 1){
            let clip = ComponentManager.getCustomMovieClip(`battlegroundsmoke${info.period}_`,10,70);
            clip.name = `smoke${info.alliId}`;
            let tmp = [];
            switch(info.period){
                case 2:
                    clip.width = 164;
                    clip.height = 94;
                    tmp = [-30,-8];
                    break;
                case 3:
                    clip.width = 190;
                    clip.height = 168;
                    tmp = [-2,-66];
                    break;
                case 4:
                    clip.width = 25;
                    clip.height = 33;
                    tmp = [-2,-64];
                    break;
            }
            clip.anchorOffsetX = clip.width / 2;
            clip.anchorOffsetY = clip.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, mask1, tmp);
            view._bgGroup.addChild(clip);
            clip.playWithTime(0);
        }
        if(info.period == 4){
            let destroy = BaseBitmap.create(`battlegrounddestroy`);
            destroy.name = `destroy${info.alliId}`;
            destroy.anchorOffsetX = destroy.width / 2;
            destroy.anchorOffsetY = destroy.height / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, destroy, mask1, [-15,-13]);
            view._bgGroup.addChild(destroy);
            destroy.alpha = 0.1;

            egret.Tween.get(destroy, {loop : true}).to({alpha : 0.7}, 1000).to({alpha : 0.1}, 1000);
        }
        view.freshAlliText(info.alliId);
    }

    private removeCity(alliId : number):void{
        let view = this;
        let mask1 : any = view._bgGroup.getChildByName(`alliancebuild${alliId}`);
        if(mask1){
            view._bgGroup.removeChild(mask1);
        }
        let smoke = view._bgGroup.getChildByName(`smoke${alliId}`);
        let destroy = view._bgGroup.getChildByName(`destroy${alliId}`);
        if(smoke){
            view._bgGroup.removeChild(smoke);
        }
        if(destroy){
            egret.Tween.removeTweens(destroy);
            view._bgGroup.removeChild(destroy);
        }
        let infobg = view._bgGroup.getChildByName(`alliancebg${alliId}`);
        let allinameTxt : any = view._bgGroup.getChildByName(`allianceTxt${alliId}`);
        if(infobg){
            view._bgGroup.removeChild(infobg);
        }
        if(allinameTxt){
            view._bgGroup.removeChild(allinameTxt);
        }
        // let cheerbg : any = view._bgGroup.getChildByName(`alliancecheer${alliId}`);
        // let cheertxt : any = view._bgGroup.getChildByName(`alliancecheertxt${alliId}`);
        // if(cheerbg){
        //     view._bgGroup.removeChild(cheerbg);
        // }
        // if(cheertxt){
        //     view._bgGroup.removeChild(cheertxt);
        // }
    }

    private freshAlliText(id:any){
        let view = this;
        let info = this.vo.getAllInfoById(id);
        let mask1 = view._bgGroup.getChildByName(`alliancebuild${info.alliId}`);
        //信息
        if(mask1){
            let infobg = view._bgGroup.getChildByName(`alliancebg${info.alliId}`);
            let allinameTxt : any = view._bgGroup.getChildByName(`allianceTxt${info.alliId}`);
            let str = '';
            if(view.vo.isAlliOut(id)){
                str = `${info.alliName}\n<font color=0xff3c3c>${LanguageManager.getlocal(`acBattleRoundOut-${view.getUiCode()}`)}</font>`
                // allinameTxt.textColor = 0xff3c3c;
            }
            else if(view.vo.isChampWin() && view.vo.getWinnerAlliance().mid == Number(info.mid)){
                str = `${info.alliName}\n<font color=0x21eb39>${LanguageManager.getlocal(`acBattleGroundTip10-${view.getUiCode()}`)}</font>`;
                let winImg = BaseBitmap.create(`battlegroundwin-${view.getUiCode()}`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, winImg, mask1);
                this._bgGroup.addChild(winImg);
            }
            else{
                str = `${info.alliName}\n<font color=0x21eb39>(${info.num}/${info.total})</font>`;
                if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())){
                    allinameTxt.textColor = TextFieldConst.COLOR_WARN_YELLOW;
                }
            }
            allinameTxt.text = str;

            infobg.width = allinameTxt.textWidth + 100;
            infobg.height = allinameTxt.textHeight + 20;
    
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, infobg, mask1, [0,-infobg.height+20]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, infobg);
        }
    }
    private mapPos = {
        1 : { x : 96, y : 249, width : 180, height : 116}, 
        2 : { x : 46, y : 466, width : 54, height : 54},
        3 : { x : 201, y : 553, width : 54, height : 54},
        4 : { x : 46, y : 753, width : 54, height : 54},
        5 : { x : 329, y : 383, width : 54, height : 54},
        6 : { x : 409, y : 239, width : 54, height : 54},
        7 : { x : 451, y : 520, width : 54, height : 54},
        8 : { x : 434, y : 746, width : 54, height : 54},
        9 : { x : 689, y : 383, width : 184, height : 124},
        10 : { x : 666, y : 613, width : 54, height : 54},
        11 : { x : 703, y : 803, width : 54, height : 54},
        12 : { x : 894, y : 267, width : 54, height : 54},
        13 : { x : 959, y : 429, width : 54, height : 54},
        14 : { x : 1005, y : 590, width : 54, height : 54},
        15 : { x : 872, y : 702, width : 54, height : 54},
        16 : { x : 1035, y : 782, width : 236, height : 132},
    }

    //
    public initView(){
        let view = this;
        view._period = view.vo.getCurperiod();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND,view.battleEnd,view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_BATTLEGROUND_MAPFRESH,view.afterCheer,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE), view.challengeCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), this.challengeCallback, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL), view.challengeCallback, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view)
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX),view.atkraceCallback,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE),view.handleCallback,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA),view.atkraceCallback,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = view.getUiCode();

        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:view.acTivityId});

        view.initTopTip();
        //底部
        let bottomBg = BaseBitmap.create(`battlegroundbottombg-${code}`);
        bottomBg.height = 86;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);
        view._bottomBg = bottomBg;
        //聊天
        let chatbg = null;
        if(1){
            //跨服聊天消息
            chatbg = BaseBitmap.create(`battlegroundbottomchatbg-${view.getUiCode()}`);
            chatbg.width = GameConfig.stageWidth;
            chatbg.x = 0;
            chatbg.y = bottomBg.y - 25;
            this.addChild(chatbg);
            chatbg.touchEnabled = true;
            chatbg.addTouchTap(this.chatBgClickHandler,this);

            let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
            chatIcon.anchorOffsetX = chatIcon.width/2;
            chatIcon.anchorOffsetY = chatIcon.height/2;
            chatIcon.x =  chatIcon.width/2+10;
            chatIcon.y = chatbg.y + chatbg.height/2;
            this.addChild(chatIcon);
            egret.Tween.get(chatIcon, {
                loop: true,//设置循环播放
            }).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
            
            let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
            if(!showStr)
            {
                showStr="";
            }
            else{
                let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
                showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
            }
            let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
			if (emoticonStr){
				showStr = emoticonStr;
			}
            this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
            this._chatTxt.width = 480;
            this._chatTxt.height = 20;
            this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.width + 5, 0]);
            this.addChild(this._chatTxt);
        }
        
        let detailbtn = ComponentManager.getButton(`battlegrounddetail-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            }  
           	if(this.vo.isStart==false)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {     //活动详情界面
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
                    aid : view.aid,
                    code : view.code
                 }); 
             }
           
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, detailbtn, chatbg, [0,chatbg.height]);
        view.addChild(detailbtn);

        let cheerbtn = ComponentManager.getButton(`battlegroundguess-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            }  
           	if(this.vo.isStart==false)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {     //活动详情界面
                ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDCHEERVIEW,{
                    aid : view.aid,
                    code : view.code
                 }); 
             }
           
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, cheerbtn, detailbtn, [0,detailbtn.height + 10]);
        view.addChild(cheerbtn);
        view._cheerBtn = cheerbtn;
        cheerbtn.visible = !view.vo.getAttendQuality();
        if(view.vo.getRedPot2()){
            App.CommonUtil.addIconToBDOC(cheerbtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(cheerbtn);
        }

        let logbtn = ComponentManager.getButton(`battlegroundlog-${view.getUiCode()}`,'', ()=>{
            if(view._stopTouch){
                return;
            } 
            //打开详情界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDVISITVIEW, {
                aid : view.aid,
                code : view.code
            })
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, logbtn, chatbg, [0,chatbg.height]);
        view.addChild(logbtn);
        view._logBtn = logbtn;

        let randBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,`acBattleRoundRandFight-${view.getUiCode()}`, ()=>{
            if(view._stopTouch){
                return;
            } 
            if(!view.vo.getAttendQuality()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${code}`));
                return;
            }
            if(view.vo.isActyEnd()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                return;
            }
            if(view.vo.getCurperiod() == 3){
                App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
                return;
            }
            if(!view.vo.getJoinIn()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip4-${view.getUiCode()}`));
                return;
            }
            if(Api.servantVoApi.getServantCountLevel60Plus() == 0){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip24-1`));
                return;
            }
            if(view._randClick){
                return;
            }
            view._randClick = true;
            //随机挑战
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX,{activeId:view.acTivityId});
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, randBtn, chatbg, [0,chatbg.height+15]);
        view.addChild(randBtn);
        view._randBtn = randBtn;
        randBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();

        view.initBottom();
        view.resetInfo();
        //左右翻页
        let leftArrow = ComponentManager.getButton(`battlegroundmaparrow-${view.getUiCode()}`, '', ()=>{
            if(view._stopTouch){
                return;
            } 
            let startX = Math.max(view._bgScrollView.scrollLeft - GameConfig.stageWidth / 2, 0);
            egret.Tween.get(view._bgScrollView).to({scrollLeft : startX},1000).call(()=>{
                view._stopTouch = false;
                view._leftArrow.visible = view._bgScrollView.scrollLeft > 0;
                egret.Tween.removeTweens(view._bgScrollView);
            },view);
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftArrow, view);
        view._leftArrow = leftArrow;
        leftArrow.visible = false;
        view.addChild(leftArrow);

        let rightArrow = ComponentManager.getButton(`battlegroundmaparrow-${view.getUiCode()}`, '', ()=>{
            if(view._stopTouch){
                return;
            } 
            let startX = Math.min(view._bgScrollView.scrollLeft + GameConfig.stageWidth, (view.mapNum - 1) * this.mapWidth + (this.mapWidth / 2));
            egret.Tween.get(view._bgScrollView).to({scrollLeft : startX},1000).call(()=>{
                egret.Tween.removeTweens(view._bgScrollView);
                view._stopTouch = false;
                view._rightArrow.visible = view._bgScrollView.scrollLeft < ((view.mapNum - 1) * this.mapWidth + (this.mapWidth / 2));
            },view);
        }, view);
        rightArrow.anchorOffsetX = rightArrow.width / 2;
        rightArrow.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rightArrow, view);
        view._rightArrow = rightArrow;
        view.addChild(rightArrow);

        //定位
        for(let i = 0; i < this.mapNum; ++ i){
            for(let j in this.mapPos){
                let unit = this.mapPos[j];
                let idx = i * 16 + Number(j);
                let info = this.vo.getAllInfoById(idx);
                if(info){
                    if(Number(info.mid) == Number(Api.playerVoApi.getPlayerAllianceId())){
                        this._curAllianceMap = i;
                        this._curAllianceIdx = Number(j);
                        break;
                    }
                }
            }
        }
        if(this._curAllianceMap > -1){
            let tmp = 0;
            if((this._curAllianceMap == 0 && this._curAllianceIdx < 9) || (this._curAllianceMap == this.mapNum - 1 &&  this._curAllianceIdx > 8)){
                tmp = this._curAllianceMap * this.mapWidth + (this._curAllianceMap == 0 ? 0 : (this.mapWidth / 2));
            }
            else{
                tmp = this._curAllianceMap * this.mapWidth + this.mapPos[this._curAllianceIdx].x - (320 - 100);
            }
            // view._stopTouch = true;
            view._bgScrollView.scrollLeft = tmp;
            // egret.Tween.get(view._bgScrollView).to({scrollLeft : tmp},1000).call(()=>{
            //     view._stopTouch = false;
            //     egret.Tween.removeTweens(view._bgScrollView);
            // },view);
        }
    }

    public useCallback(event : any): void 
	{
        if(event.data.ret)
        {
            if(event.data.data.data.atklist){
                this._atkraceInfoVoList = [];
                this._atkraceInfoVoList = this.vo.getBattleLog(event.data.data.data.atklist);//;	 
            }
            if(event.data.data.data.extralist){
                this.vo.setExtraList(event.data.data.data.extralist);//;	 
            }
                        
            if(this._atkraceInfoVoList.length>0)
            {
                this.isData =true;
            }
            else
            {
                this.isData =false;
            }
            this.refreshText(); 
            if(this._isShowMore){
                if(this._scrollList){
                    this._scrollList.refreshData(this._atkraceInfoVoList,this.code);
                }
                else{
                    this.showList();
                }
            }
            if(this.listconditions)
            {
                this.listconditions.visible =false;
            }
        }
        else
        {
            this.isData =false;
        }
        
    }

	private refreshText():void
	{	 
		if(this._atkraceInfoVoList.length>0&&this._atkraceInfoVoList[0])
		{
            let data:any =this._atkraceInfoVoList[0];
            let news = data;
            // if(news){
            //     let str = LanguageManager.getlocal(`acBattileGroundVisitLog-${this.code}`, [news.alliName,news.playerName,news.uid,news.servantName,news.enermyName,news.enermyNum]);
            //     // if(str.length > 20){
            //     //     str = str.substring(0,20) + `...`
            //     // }${LanguageManager.getlocal(`atkraceyamenid`,[bData.uid])}
            //     this._bottomLogTxt.text = str;
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._bottomLogTxt, this._bottomBg, [10,0]);
            // }
            //击败｜｜全歼
            let textStr = LanguageManager.getlocal(`acBattileGroundVisitLog-${this.getUiCode()}`, [news.alliName,news.playerName,news.uid]);
            if(news.info.weedout){
                textStr += `<font color=0xff3c3c>【${LanguageManager.getlocal(`battlestaut3`)}】</font>`;
            }
            let str = "";
			if(this.isData&&data.info.type==1){
				str = LanguageManager.getlocal("atkracebeat");
			}
			else
			{
				str =LanguageManager.getlocal("atkraceAnnihilation");
			} 
			
			let currName = Config.ServantCfg.getServantItemById(data.info.sid).name;
		 
			if(data.info.streak&&data.info.streak>=3)
			{	
				var desStr:string ="acBattleStraight"
				if(data.info.atype&&data.info.atype==2)
				{
					 desStr ="acBattleStraight_1";
				} 
				else if(data.info.atype&&data.info.atype==4)
				{
					 desStr ="acBattleStraight_4";//追杀  全歼了
				}
				textStr += LanguageManager.getlocal(desStr,[LanguageManager.getlocal(data.info.support == 1 ? `actracksupport` : `actrackservant`),currName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
			}
			else
			{	
				let desStr2:string ="acBattleDescription"
				if(data.info.atype&&data.info.atype==2)
				{
					 desStr2 ="acBattleDescription_1";
				} 
				else if(data.info.atype&&data.info.atype==4)
				{
					 desStr2 ="acBattleStraight_4_2";//追杀 
				}
				textStr += LanguageManager.getlocal(desStr2,[LanguageManager.getlocal(data.info.support == 1 ? `actracksupport` : `actrackservant`),currName,str,data.info.uname2,data.info.fightnum]);
            }
            this._bottomLogTxt.text = textStr;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._bottomLogTxt, this._bottomBg, [10,0]); 
			// if(this._nameTxt)
			// {
			// 	this._nameTxt.text = this._atkraceInfoVoList[0].info.name;
			// } 
		} 
	}

    //底部
	private initBottom():void
	{	
        let view = this;
        let bottom = view._bottomBg;
		let maskDown:BaseBitmap = BaseBitmap.create("servant_mask");
        maskDown.width = GameConfig.stageWidth; 
		 
        maskDown.y = GameConfig.stageHeigth - bottom.height - maskDown.height;
        this.addChild(maskDown);
		this.swapChildren(maskDown,this.container);
	
		let showMore:BaseButton = ComponentManager.getButton(`arena_more`,"",this.showMoreHandle,this);
		showMore.setPosition(GameConfig.stageWidth-showMore.width-18,GameConfig.stageHeigth - bottom.height/2  - showMore.height/2);
        this.addChild(showMore);


		this._moreArrow = BaseBitmap.create(`arena_arrow`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._moreArrow, showMore, [-this._moreArrow.width-5,0]);
        this.addChild(this._moreArrow);
        //文本
        let tipTxt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 3;
        tipTxt.width = 480;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, bottom);
        view._bottomLogTxt = tipTxt;
    }

    private showMoreHandle():void
	{
        if(this._stopTouch){
            return;
        } 
        if(this.touchBoo)
		{
            if(this.vo.isActyEnd()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                return;
            }
            this._isShowMore = !this._isShowMore;
            this._bottomLogTxt.visible = !this._isShowMore;
			if (this._isShowMore == true) {
				this._moreArrow.scaleY = -1;
                this._moreArrow.y += this._moreArrow.height;
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:this.acTivityId});
			}
			else {
				this._moreArrow.scaleY = 1;
				this._moreArrow.y -= this._moreArrow.height;
				this.closeList();
			}
		}
		
    }
    
    private showList():void
	{	
		
        this.moveContainer= new BaseDisplayObjectContainer();
        this.addChild(this.moveContainer);

        this.moreBg = BaseBitmap.create("arena_bottom_bg");//public_9_bg14
        this.moreBg.width = 640;
        this.moreBg.height =GameConfig.stageHeigth - 330;
        this.moveContainer.addChild(this.moreBg);
        let topbg = BaseBitmap.create("public_9_bg71");//"public_9_bg21");//arena_bottom_bg
        topbg.width = 620;
        topbg.height = 80;
        topbg.x = 10;
        topbg.y = 10;
        this.moveContainer.addChild(topbg);

        //上次挑战信息
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(``), 20);
        let lastchargelog = this.vo.getLastChargeLog();
        tipTxt.text = LanguageManager.getlocal(`acBattileGroundLastLog-1`, [lastchargelog ? lastchargelog.playerName : LanguageManager.getlocal(`nothing`)]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, topbg, [27,0]);
        this.moveContainer.addChild(tipTxt);
        if(lastchargelog){
            let tmp:any =[];
            tmp.uid=lastchargelog.uid;
            tmp.battleground = true;
            tmp.code = this.code;
        
            let killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `atkraceVisitTab3`, ()=>{
                //追杀
                if(this._stopTouch){
                    return;
                } 
                if(!this.vo.getAttendQuality()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
                    return;
                }
                if(this.vo.isActyEnd()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                    return;
                }
                if(this.vo.getCurperiod() == 3){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
                    return;
                }
                if(!this.vo.getJoinIn()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip4-${this.getUiCode()}`));
                    return;
                }
                tmp.type=3;//追杀
                AtkraceChallengeItem.data = tmp;
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, killBtn, topbg, [7,0]);
            this.moveContainer.addChild(killBtn);
    
            let challBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `atkraceChallengeViewTitle`, ()=>{
                if(this._stopTouch){
                    return;
                } 
                if(!this.vo.getAttendQuality()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
                    return;
                }
                //挑战
                if(this.vo.isActyEnd()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                    return;
                }
                if(this.vo.getCurperiod() == 3){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
                    return;
                }
                if(!this.vo.getJoinIn()){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip4-${this.getUiCode()}`));
                    return;
                }
                tmp.type=1;//挑战
                AtkraceChallengeItem.data = tmp;
                ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
            }, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, challBtn, topbg, [138,0]);
            this.moveContainer.addChild(challBtn);
        }

        this._currMaskBmp = BaseBitmap.create("public_9_viewmask");
        this._currMaskBmp.width=GameConfig.stageWidth;
        this._currMaskBmp.height=GameConfig.stageHeigth;
        this._currMaskBmp.touchEnabled = true;
        this.addChild(this._currMaskBmp);
        this.setChildIndex(this._currMaskBmp,this.getChildIndex(this._bottomBg));


        // 增加 点击区域
        this._touchBg = BaseBitmap.create("public_9_bg25");  
        this._touchBg.width = 640;
        this._touchBg.height =260;
        this._touchBg.x=0;
        this._touchBg.y=-240;
        this._touchBg.alpha =0;
        this._touchBg.addTouchTap(this.showMoreHandle,this);
        this.moveContainer.addChild(this._touchBg);

        if(this.isData)
        {
            let rect = egret.Rectangle.create();
            rect.setTo(0,5,GameConfig.stageWidth,this.moreBg.height - 110);
            this._scrollList = ComponentManager.getScrollList(AcBattleGroundLogItem, this._atkraceInfoVoList, rect, this.code);
            this.moveContainer.addChild(this._scrollList);
            this._scrollList.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this._scrollList, topbg, [0,topbg.height]);
        }
        else
        {
            let atkracedes3 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes3"), 20);
            atkracedes3.x =250;
            atkracedes3.y =300;
            this.moveContainer.addChild(atkracedes3);
        }	
        this.moveContainer.y =1150;
        this.touchBoo=false;
    

        //描述文字：击败门客20
        var num = this.cfg.getbeatNum();
        let listconditions = ComponentManager.getTextField(LanguageManager.getlocal("atkracelistconditions",[num+""]), 20);
        listconditions.x = 30
        listconditions.y = GameConfig.stageHeigth - 50;
        this.addChild(listconditions);
        this.listconditions = listconditions;

        if(this.listconditions)
        {
            this.listconditions.visible =false;
        }
        if(this.describeTxt)
        {
            this.describeTxt.visible =false;
            this._nameTxt.visible =false;
        }

        this.runText();
        
        egret.Tween.get(this.moveContainer).to({y:250},500).call(function()
        {
            egret.Tween.removeTweens(this.moveContainer);
            this.touchBoo =true;
            if(this.listconditions)
            {
                this.listconditions.visible =true;
            }
        },this);

    }

    /**跑马灯 */
	private runText() {
        let view = this;
        let strList = view.vo.getKillNoticeInfo(this.getUiCode());
        if(strList.length && view.vo.getCurperiod() == 2){
            let laba = BaseBitmap.create('chatlaba');
            laba.x = 10;
            laba.y = -laba.height;
            this.moveContainer.addChild(laba);

            let lampContainer = new LoopLamp(strList, LayoutConst.verticalCenter);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, lampContainer, laba, [laba.width,0]);
            lampContainer.mask = new egret.Rectangle(0,-4,GameConfig.stageWidth,26);
		    this.moveContainer.addChild(lampContainer);
        }
		// for (var i = 0; i < this._log.length; i++) {
		// 	let logItem = this._log[i];
		// 	let rewardVo = GameData.formatRewardItem(logItem[2])[0];
		// 	let str = LanguageManager.getlocal("acWealthComingViewRunTxt", [logItem[0], rewardVo.name, rewardVo.num]);
		// 	strList.push(str);
	}

	private closeList():void
	{
		this.touchBoo=false;
		if(this.listconditions)
		{
			this.listconditions.visible =false;
		}
	
		if(this.describeTxt)
		{
			this.describeTxt.visible =true;
			this._nameTxt.visible =true;
		}
		
		if(this.moveContainer)
		{	
			egret.Tween.get(this.moveContainer).to({y:1150},500).call(function(){
			this.touchBoo=true;
            egret.Tween.removeTweens(this.moveContainer);
            this.moveContainer.dispose();
            this.moveContainer = null;
            if(this._scrollList){
                this._scrollList = null;
            }
		},this);
		}

		if(this._currMaskBmp&&this._currMaskBmp.parent)
		{
			this._currMaskBmp.parent.removeChild(this._currMaskBmp);
			this._currMaskBmp.dispose();
			this._currMaskBmp =null;
		}
		if(this._touchBg&&this._touchBg.parent)
		{
			this._touchBg.parent.removeChild(this._touchBg);
			this._touchBg.dispose();
			this._touchBg =null;
        }
        if(this._bottomLogTxt){
            this._bottomLogTxt.visible = true;
        }
	}

    
    private visitHandle():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
	}


    private chatBgClickHandler():void{
        if(this._stopTouch){
            return;
        } 
		ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : this.vo.aidAndCode});
	}

    public tick():void{
        let view = this;
        view._randBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
        if(this._chatTxt){
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				let zonename = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,showStr.zoneid);
				showStr=LanguageManager.getlocal('acCrossServeDes', [zonename]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
            }
            let emoticonStr = Api.emoticonVoApi.chatStrChangeLocal(showStr);
			if (emoticonStr){
				showStr = emoticonStr;
			}
			this._chatTxt.text = showStr;
        }
        let curPeriod = view.vo.getCurperiod();
        // if(curPeriod == 4){
        //     App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundCDTxt5-${view.code}`));
        //     view.hide();
        //     return;
        // }
        if(curPeriod !== view._period){
            this._needFresh = true;
            this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,{activeId:view.acTivityId});
        }
        view.freshText();
        view._period = curPeriod;

        if (this._countDownTime > 0) {
			this._countDownTime--;
			if(this._countDownTime <= 0) {
                this._randBtn.setText(`acBattleRoundRandFight-${view.getUiCode()}`);
                this._curFightType = 1;
            }
            else{
                this._randBtn.setText(this.getCountTimeStr(), false);
            }
        }
        else{
            
        }

        if(view.vo.getRedPot2()){
            App.CommonUtil.addIconToBDOC(view._cheerBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._cheerBtn);
        }
    }
    
    private initTopTip():void{ 
        let view = this;
        let code = view.getUiCode();
        let tipBg = BaseBitmap.create(`battlegrounddescbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view.titleBg, [0,view.titleBg.height]);
        view.addChild(tipBg);
        view._cdBg = tipBg;
        tipBg.addTouchTap(()=>{
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
                aid : view.aid,
                code : view.code,
                type: "rank"
            });
        },view);

        let tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(tipTxt);
        view._cdText = tipTxt;

        view.freshText();
    }

    private freshText():void{
        let view = this;
        let code = view.getUiCode();
        let period = view.vo.getCurperiod();
        //提示板信息
        //提示板信息
        let cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        let str = `acBattleRoundCDTxt${view._period}-${code}`;
        let param = [];
        let myRank = view.vo.getMyRank();
        if(view.vo.isWaiting()){
            view._cdText.text = LanguageManager.getlocal(`acBattleGroundTip8-${view.getUiCode()}`);
        }
        else{
            switch(period){
                case 1:
                    param.push(cd);
                    break;
                case 2:
                    param.push(cd);
                    let need = view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine;
                    if(period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()){
                        //最后一轮
                        str = `acBattleRoundCDTxt4-${code}`;
                    }
                    else{
                        param.push(need);
                    }
                    if(view.vo.getAttendQuality()){
                        //没被淘汰
                        if(view.vo.getJoinIn()){
                            param.push(LanguageManager.getlocal(`acBattleRoundRank-${code}`, [String(myRank <= need ? 0x21eb39 : 0xff3c3c),myRank.toString()]));
                        }
                        else{
                            param.push(LanguageManager.getlocal(`acBattleRoundCDTxt5-${code}`));
                        }
                    }
                    else{
                        if(view.vo.getCurRound() == 1){
                            param.push(LanguageManager.getlocal(`acBattleRoundCDTxt11-${code}`));
                        }
                        else{
                            if(view.vo.getCheerALlianceOut()){
                                param.push(LanguageManager.getlocal(`acBattleRoundCDTxt13-${code}`));
                            }
                            else{
                                param.push(LanguageManager.getlocal(`acBattleRoundCDTxt12-${code}`));
                            }
                            // param.push(LanguageManager.getlocal(`acBattleRoundCDTxt11-${code}`));
                        }
                        // param.push(LanguageManager.getlocal(`acBattleRoundNoAttend-${code}`));
                    }
                    break;
                case 3:
                case 4:
                    str = `acBattleRoundCDTxt3-${code}`;
                    param.push(view.vo.getWinnerAlliance().name);
                    let tyle = 1;
                    if(view.vo.getWinnerAlliance().mid == Number(Api.playerVoApi.getPlayerAllianceId())){
                        tyle = 9;
                    }
                    else if(view.vo.getAttendQuality()){
                        tyle = 7;
                    }
                    else{
                        tyle = 8;
                    }
                    param.push(LanguageManager.getlocal(`acBattleRoundCDTxt${tyle}-${view.getUiCode()}`));
                    break;
            }
            if(this._needFresh){
                view._cdText.text = LanguageManager.getlocal(`acBattleGroundTip8-${view.getUiCode()}`);
            }
            else{
                view._cdText.text = LanguageManager.getlocal(str,param);
            }
        }
        view._cdBg.width = view._cdText.textWidth + 30;
        view._cdBg.height = view._cdText.textHeight + 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._cdBg, view.titleBg, [0,view.titleBg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._cdText, view._cdBg, [0,-5]);
    }

    private atkraceCallback(evt : egret.Event):void{

        if (evt.data.ret == false)
        {
            return;
        }

        let view = this;
        let data = evt.data.data.data;
        view._randClick = false;
        if(data){
            if(data.bgstats){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundBgStasTip${data.bgstats}-${view.getUiCode()}`));
            }
            else{
                if(data.waiting){
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip8-${view.getUiCode()}`));
                }
                else{
                    view.vo.setWaiting(0);
                    if(typeof data.fightflag !== 'undefined' && !data.fightflag) {
                        this._fightflag = false;
                        App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundServantNeed-${view.getUiCode()}`, [view.cfg.servantLv.toString()]));
                    }
                    else {
                        this._fightflag= true;
                        let myAtkInfo:AtkraceAtkInfoVo = view.vo.getMyFightInfo();
                        let isHaveServant = myAtkInfo.mesid && myAtkInfo.mesid.sid;
                        view.vo.setRaceInfo(data.battleground);
                        view.resetInfo();
                        //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽可恢复 5次数耗尽不可恢复
                        switch(this._curFightType){
                            case 1:
                            case 2:
                                if(data.newRound && data.newRound == 1){
                                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip1-${this.getUiCode()}`));
                                    view.resetInfo();
                                    return;
                                }
                                if(myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {//myAtkInfo.handle == 1
                                    ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDARRESTVIEW,{
                                        aid : this.aid,
                                        code : this.code
                                    });
                                }
                                else{
                                    myAtkInfo = view.vo.getMyFightInfo();
                                    let sid = myAtkInfo.mesid.sid;
                                    let myInfo:AtkraceServantVo = myAtkInfo.mesid;
                                    let nameStr = myAtkInfo.getFName();
                                    ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDAGREEPOPUPDIALOG,{
                                        type:1 , 
                                        name: nameStr,
                                        sid:sid,
                                        aid : this.aid,
                                        code : this.code,
                                        ishelp : myAtkInfo.support == 1,
                                        equip : myInfo.equip
                                    });
                                    //ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEAGREEPOPUPVIEW,{type:1 , name: nameStr ,sid:myAtkInfo.mesid.sid});
                                }
                                break;
                            case 3:
                                App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundContinueFightTip1-${view.getUiCode()}`));
                                break;
                            case 4:
                                this.clickDialog();
                                break;
                            case 5:
                                App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundContinueFightTip2-${view.getUiCode()}`));
                                break;
                        }
                    }
                }   
            }
        }
    }
    
    //重置信息
	private resetInfo():void
	{		
        // this.closeList();
        let view = this;
        if(!view._randBtn){
            return;
        }
		this._countDownTime = 0;
        //是否无法出战
        let textStr : string = '';
		if (this._fightflag == false) {
            textStr = LanguageManager.getlocal("atkraceNoServant");
		}
		else{
			//检查是否已有门客
			let myAtkInfo:AtkraceAtkInfoVo =this.vo.getMyFightInfo();
			if (myAtkInfo && myAtkInfo.mesid && myAtkInfo.mesid.sid) {
				//有门客
				let sid:string = myAtkInfo.mesid.sid;
				if (myAtkInfo.handle == 1 || myAtkInfo.atype != 1) {
                    textStr	= LanguageManager.getlocal(`acBattleGroundContinueFight-${view.getUiCode()}`);
                    this._curFightType = 2;
				}
				else{
                    textStr	= LanguageManager.getlocal(`acBattleRoundRandFight-${view.getUiCode()}`);
                    this._curFightType = 1;
					// textStr	= LanguageManager.getlocal("arenaServantSpeak1",[LanguageManager.getlocal("servant_name"+myAtkInfo.mesid.sid)]);
                }
                //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽
                
			}
			else {
				//出战次数
				let maxCount:number = view.cfg.dailyNum;
				let myInfo:AtkraceInfoVo =this.vo.getMyInfo();

				let myNum:number = myInfo.num;
				if (myNum >= maxCount) {
					//次数已满
					let lv60plus:number = Api.servantVoApi.getServantCountLevel60Plus();
					let extraCoefficient:number = view.cfg.getParameter1();
					let extraMax:number = Math.floor(lv60plus/extraCoefficient);
					if (myInfo.extranum >= extraMax) {
                        //没次数了
                        //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                        this._curFightType = 5;
                        textStr = LanguageManager.getlocal(`acBattleGroundTip2-${this.getUiCode()}`);
						// wordsBg.addTouchTap(this.clickDialog2,this);
					}
					else {
                        textStr = LanguageManager.getlocal(`acBattleGroundTip2-${this.getUiCode()}`);
                        //textStr = LanguageManager.getlocal("arenaAddNum",[myInfo.extranum.toString(),extraMax.toString()]);
                        //1可以随机挑战 2已经发生战斗没结束 继续战斗 3cd中 4次数耗尽 5次数耗尽不可恢复
                        this._curFightType = 4;
                        // wordsBg.addTouchTap(this.clickDialog,this);
                    }
				}
				else {
                    //倒计时
                    this._countDownTime = myInfo.lasttime + Config.AtkraceCfg.getIntervalTime() -  GameData.serverTime;
                    if(this._countDownTime <= 0){
                        this._curFightType = 1;
                        textStr = LanguageManager.getlocal(`acBattleRoundRandFight-${view.getUiCode()}`);
                    }
                    else{
                        this._curFightType = 3;
                        textStr = this.getCountTimeStr();
                    }
                }
            }
        }
        if(this._randBtn){
            this._randBtn.setText(textStr, false);
            this._randBtn.setGray(this._curFightType == 5);
        }
    }

    private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}
    
    private clickDialog2():void
	{
		App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
	}

	private clickDialog():void
	{
		let itemId:string = this.cfg.getFightAdd();
        let needNum:number = 1;
		let itemVo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(Number(itemId));
		let numItem:number = 0;
		if (itemVo) {
			numItem = itemVo.num;
		}
		
		let message = LanguageManager.getlocal("atkRace_buyChallenge",[LanguageManager.getlocal("itemName_"+itemId)]);
		let mesObj = {
			 confirmCallback: this.buyChallenge, 
			 handler: this, 
			 icon:  "itemicon"+itemId,
			 iconBg: Config.ItemCfg.getItemCfgById(itemId).iconBg, 
			 num: numItem, 
             useNum:needNum,
			 msg: message ,
			 id: itemId
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
    }
    
    private buyChallenge():void
	{
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA,{activeId:this.acTivityId});
    }
    
    private challengeCallback(evt : egret.Event):void{

        if (evt.data.ret == false)
        {
            return;
        }

        let view = this;
        let data = evt.data.data.data;
        if(data){
            if(data.bgstats){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundBgStasTip${data.bgstats}-${view.getUiCode()}`));
                ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
                ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW);
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:view.acTivityId});
            }
            else{
                if(data.waiting){
                    view.vo.setWaiting(data.waiting);
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleGroundTip8-${view.getUiCode()}`));
                }
                else{
                    view.vo.setWaiting(0);
                    view.vo.setRaceInfo(data.battleground);
                    view.resetInfo();
                    if(AtkraceChallengeItem.data&&AtkraceChallengeItem.data.type){
                        if(this._isShowMore)
                        {
                            this.moveContainer.y=1150;
                            this._currMaskBmp.visible =false; 
                            
                            this._isShowMore =false;
                            this.closeList();
                            this._moreArrow.scaleY = 1;
                            this._moreArrow.y = GameConfig.stageHeigth - 94/2  - this._moreArrow.height/2;// this._moreArrow.height;
                            
                        }
                        let myAtkInfo:AtkraceAtkInfoVo = view.vo.getMyFightInfo();
                        let isHaveServant = myAtkInfo.mesid && myAtkInfo.mesid.sid;
                        if(isHaveServant){
                            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDARRESTVIEW,{
                                aid : this.aid,
                                code : this.code
                            });
                        }
                        else{
                            NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX,{activeId:view.acTivityId});
                        }
                    }
                    // this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX,{activeId:view.acTivityId});
                    ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
                    ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW);
                    ViewController.getInstance().hideView(ViewConst.POPUP.ACBATTLEGROUNDALLIINFOVIEW);
                }
            }
        }
    }

    private battleEnd():void{
        let view = this;
        view.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,{activeId:view.acTivityId});
        view.resetInfo();
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST,{activeId:view.acTivityId});
    }

    private moveToMyAlliance()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEDETAILSVIEW,{
                aid : this.aid,
                code : this.code,
                type: "alliance"
            });
        //跳转至详情-我的帮会
    }

    private handleCallback(evt : egret.Event):void{

        if (evt.data.ret == false)
        {
            return;
        }

        let view = this;
        if(evt.data.data.data){
            if(evt.data.data.data.battleground){
                this.vo.setRaceInfo(evt.data.data.data.battleground);
                this.resetInfo();
            }
            ViewController.getInstance().openView(ViewConst.COMMON.ACBATTLEGROUNDARRESTVIEW, {
                aid : this.param.data.aid,
                code : this.param.data.code
            });
        }
    }

    private afterCheer():void{
        let view = this;
        view._needFresh = true;
        view.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND,{activeId:view.acTivityId});
    }
    
    public dispose():void{   
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_MAPFRESH,view.afterCheer,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_BATTLEGROUND_BATTLEEND,this.battleEnd,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDINDEX),view.atkraceCallback,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_KILL), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_LIST), view.useCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_REVENGE), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_CHALLENGE), view.challengeCallback, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_HANDLE),view.handleCallback,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_USEEXTRA),view.atkraceCallback,view);
        view._bgGroup = null;
        view._period = 1;
        view._cdBg.removeTouchTap();
        view._cdBg = null;
        view._cdText = null;
        view._chatTxt = null;
        view._bottomBg = null;
        view.touchBoo =true;
        view.moreBg =null;
        view.describeTxt =null;
        view.moveContainer =null;
        view._moreArrow= null;
        view._isShowMore = false;
        view._touchBg =null;
        view._currMaskBmp=null;
        view.isData=false;
        view.listconditions = null;
        view._scrollList = null;
        view._atkraceInfoVoList=[];
        view._nameTxt =null;
        view._bottomLogTxt = null;
        view._bgScrollView = null;
        view._stopTouch = false;
        view._leftArrow = null;
        view._rightArrow = null;
        view._needFresh = false;
        view._randClick = false;
        view._randBtn = null;
        view._cheerBtn = null;
        super.dispose();
    }
}