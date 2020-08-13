/**
 * 帝位升级
 */

class TitleUpgradeLevelUpView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _progressGroup:BaseDisplayObjectContainer;
    private _curRoleImg:BaseDisplayObjectContainer;
    private _curTitleId:string;
    private _progress:ProgressBar = null;
    private _leveltxtbg:BaseBitmap = null;
    private _leveltxt:BaseTextField = null;
    private _culvTxt:BaseTextField | BaseBitmapText = null;
    private _prevlvTxt:BaseTextField | BaseBitmapText = null;
    private _nextlvTxt:BaseTextField | BaseBitmapText = null;
    private _curLevel = 1;
    private _leftbtn : BaseDisplayObjectContainer = null;
    private _rightbtn : BaseDisplayObjectContainer = null;
    private _tiptxt : BaseTextField = null;
    private _bottombg : BaseBitmap = null;
    private _collectflag : BaseBitmap = null;
    private _nameBg : BaseBitmap = null;
    private _nameTxt : BaseTextField = null;
    private _titleImg : BaseDisplayObjectContainer = null;
    private _prevbg : BaseBitmap = null;
    private _nextbg : BaseBitmap = null;
    private _curlvbg : BaseBitmap = null;
    private _stopTouch = false;
    private _attr1Txt : BaseTextField = null;
    private _attr2Txt : BaseTextField = null;
    private _attr3Txt : BaseTextField = null;
    private _attr4Txt : BaseTextField = null;

    private _upgradeGroup : BaseDisplayObjectContainer = null;
    public constructor() {
        super();
	}

	public initView():void
	{
        this._stopTouch = false;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TITLEUPGRADE), this.upgradeCallback, this);
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        this._curTitleId = this.param.data.titleid;
        let info = Api.titleupgradeVoApi.getTitleInfo(this._curTitleId);
        let titleconfig = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        let arr = [];
        switch(titleconfig.titleType){
            case 1:
                arr = Config.TitleupgradeCfg.diList;
                break;
            case 2:
                arr = Config.TitleupgradeCfg.wangList;
                break;
            case 7:
                arr = Config.TitleupgradeCfg.huangList;
                break;
        }
        
        this._curLevel = Math.min(info.level + 1, arr.length);
        if(this._curLevel == 0){
            this._curLevel = 1;
        }
        let bgPath = "palace_bg";
        let imgH = 1096;
        if(Config.TitleCfg.isTheKingTitleId(this._curTitleId))
        {
            bgPath = "palace_bg4";
            imgH = 1136;
        }
        let palace_bg = BaseLoadBitmap.create(bgPath)
        palace_bg.width = 640;
        palace_bg.height = imgH; 
        
        palace_bg.y = GameConfig.stageHeigth - this.container.y - palace_bg.height;
        this._nodeContainer.addChild(palace_bg);

    
        let role = null;
        let tcfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && Api.playerVoApi.checkHasDragonBones(this._curTitleId)){
            role = App.CommonUtil.getPlayerDragonRole(this._curTitleId, Api.playerVoApi.getPlayePicId(), this._curLevel);
            role.x = 320;
            role.y = 175;
        }else{
            role = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), Api.playerVoApi.getPlayePicId(),0,false,null,null,this._curLevel);
            this._nodeContainer.addChild(role);
            role.x = GameConfig.stageWidth/2 - role.width/2;
            role.y = titleconfig.titleType == 7 ? 100 : 140;
        }

        let titleImg = App.CommonUtil.getTitlePic(this._curTitleId, this._curLevel);
        titleImg.width = 155;
        titleImg.height = 59;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, this, [0,role.y-titleImg.height - (Api.playerVoApi.checkHasDragonBones(this._curTitleId) ? 45 : 25)]);
        // this._nodeContainer.addChild(titleImg);
        this.addChild(titleImg);
        this._titleImg = titleImg;
         this._titleImg.y+=this.container.y;

        this._curRoleImg = role;

        let nameBg = BaseLoadBitmap.create("servant_attributemap");
        this.addChild(nameBg);
        this._nameBg = nameBg;

        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`palace_titleTip_${this._curTitleId}`), 20, TextFieldConst.COLOR_WARN_YELLOW);
        nameBg.width = nameTxt.width + 100;
        nameBg.height = 51;
        nameBg.anchorOffsetX = nameBg.width/2;
		nameBg.x = GameConfig.stageWidth/2;
        nameBg.y = 115;
        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, nameBg);
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;
        /**
         * 考虑层级问题
         */
        let bottombg = BaseBitmap.create(`arena_bottom`);
        bottombg.width = GameConfig.stageWidth;
        bottombg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, this);
        this.addChild(bottombg);
        this._bottombg = bottombg;

        let tipTxtStr = "titleupgradeleveltip1";
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(tipTxtStr), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bottombg, [0,10]);
        this.addChild(tipTxt);
        this._tiptxt = tipTxt;

        for(let i = 1; i < 5; ++ i){
            let txt = ComponentManager.getTextField(LanguageManager.getlocal(`titleupgradeattrtip${i}`, [``]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            txt.x = i % 2 == 1 ? 95 : 400;
            txt.y = tipTxt.y + tipTxt.textHeight + 8 + (i < 3 ? 0 : 28);
            this[`_attr${i}Txt`] = txt;
            this.addChild(txt);
        }
       
        let collectflag = BaseBitmap.create(`titleupgradeget`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, collectflag, bottombg);
        this.addChild(collectflag);
        collectflag.visible = false;
        this._collectflag = collectflag;

        let progressGroup = new BaseDisplayObjectContainer();
        progressGroup.width = GameConfig.stageWidth;
        progressGroup.height = 118;
        this.addChild(progressGroup);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressGroup, progressgroupbg, [0,5]);
        this._progressGroup = progressGroup;

        let progressgroupbg = BaseBitmap.create(`titleupgradebottombg2`);
        progressGroup.addChild(progressgroupbg);


        // let line1 = BaseBitmap.create(`titleupgradeline`);
        // progressGroup.addChild(line1);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, line1, progressgroupbg, [35,-27]);

        // let line2 = BaseBitmap.create(`titleupgradeline`);
        // progressGroup.addChild(line2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, line2, progressgroupbg, [35,-27]);

        let progress = ComponentManager.getProgressBar(`progress16`, `progress16_bg`, 490);
        progress.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, progress, progressgroupbg, [0, 15]);
        progressGroup.addChild(progress);
        this._progress = progress;

        let progressbg = BaseBitmap.create(`titleupgradeprogressbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, progressbg, progress);
        progressGroup.addChild(progressbg);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressGroup, bottombg, [0,-progressGroup.height]);

        let leveltxtbg = BaseBitmap.create(`specialview_commoni_namebg`);
        leveltxtbg.width = 370;
        this.addChild(leveltxtbg);
        this._leveltxtbg = leveltxtbg;

        let leveltxt = ComponentManager.getTextField(``,20,TextFieldConst.COLOR_WHITE);
        this.addChild(leveltxt);
        this._leveltxt = leveltxt;

        let curlvbg = BaseBitmap.create(`public_itemtipbg2`);
        curlvbg.width = 400;
        this.addChild(curlvbg);
        this._curlvbg = curlvbg;

        let culvTxt : any = ComponentManager.getBitmapText(``, `socre_fnt`);
        culvTxt.letterSpacing = -10;
        this.addChild(culvTxt);
        this._culvTxt = culvTxt;

        let prevbg = BaseBitmap.create(`public_9_bg72`);
        prevbg.width = 55;
        progressGroup.addChild(prevbg);
        this._prevbg = prevbg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, prevbg, progressGroup, [15,15], true);


        let prevlvTxt : any = ComponentManager.getTextField(LanguageManager.getlocal(``), 18, TextFieldConst.COLOR_WARN_YELLOW);
        progressGroup.addChild(prevlvTxt);
        this._prevlvTxt = prevlvTxt;

        let nextbg = BaseBitmap.create(`public_9_bg72`);
        nextbg.width = 55;
        progressGroup.addChild(nextbg);
        this._nextbg = nextbg;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, nextbg, progressGroup, [15,15], true);

        let nextlvTxt : any = ComponentManager.getTextField(LanguageManager.getlocal(``), 18, TextFieldConst.COLOR_WARN_YELLOW);
        progressGroup.addChild(nextlvTxt);
        this._nextlvTxt = nextlvTxt;

        let upgradeGroup = new BaseDisplayObjectContainer();
        upgradeGroup.width = 119;
        upgradeGroup.height = 137;
        this._upgradeGroup = upgradeGroup;
        this.addChild(upgradeGroup);

        let upgradeBtn = ComponentManager.getButton(`titleupgradebtn`,'',()=>{
            //升级
            if(this._stopTouch){
                return;
            }
            let titleconfig = Config.TitleCfg.getTitleCfgById(this._curTitleId);
            let isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
            let arr = [];
            switch(titleconfig.titleType){
                case 1:
                    arr = Config.TitleupgradeCfg.diList;
                    break;
                case 2:
                    arr = Config.TitleupgradeCfg.wangList;
                    break;
                case 7:
                    arr = Config.TitleupgradeCfg.huangList;
                    break;
            }

            let info = Api.titleupgradeVoApi.getTitleInfo(this._curTitleId);
            let curlv = info.level;
            if(curlv < arr.length){
                this._stopTouch = true;
                NetManager.request(NetRequestConst.REQUEST_TITLEUPGRADE,{
                    titleId : this._curTitleId
                });
            }
            //
        }, this);
        upgradeGroup.addChild(upgradeBtn);

        let txt = BaseBitmap.create(`titleupgradebtntxt`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt, upgradeBtn);

        let upgradeclip = ComponentManager.getCustomMovieClip(`titlelevelbtn`, 12);
        upgradeclip.playWithTime(-1);
        upgradeGroup.addChild(upgradeclip);
        upgradeclip.x = -30;
        upgradeclip.y = -110;

        upgradeGroup.addChild(txt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upgradeGroup, bottombg, [0,-upgradeGroup.height-280]);

        let roleinfo = {
            titleId : this._curTitleId,
            uid : Api.playerVoApi.getPlayerID(),
            pic : Api.playerVoApi.getPlayePicId(),
            name : Api.playerVoApi.getPlayerName(),
        }

        let leftgroup = new BaseDisplayObjectContainer();
        leftgroup.width = 37;
        leftgroup.height = 55;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, leftgroup, this, [37,0]);
        this.addChild(leftgroup);
        this._leftbtn = leftgroup;

        let leftbtn = ComponentManager.getButton(`titleupgradearrow`, ``, ()=>{
            let page = Math.max(1, this._curLevel - 1);
            if(page != this._curLevel){
                this._curLevel = page;
                this.freshView();
                this.removeChild(this._titleImg);
                this.addChild(this._titleImg);
            }
        }, this);
        leftbtn.anchorOffsetX = leftbtn.width / 2;
		leftbtn.anchorOffsetY = leftbtn.height / 2;
        leftbtn.scaleX = -1;
        egret.Tween.get(leftbtn, { loop: true }).to({ scaleX: -1.05, scaleY: 1.05 }, 400).to({ scaleX: -1, scaleY: 1 }, 400);
        leftgroup.addChild(leftbtn);

        // let leftbtn2 = BaseBitmap.create("titleupgradearrow");
		// leftbtn2.anchorOffsetX = leftbtn2.width / 2;
        // leftbtn2.anchorOffsetY = leftbtn2.height / 2;
        // leftbtn2.scaleX = -1;
		// leftbtn2.setPosition(leftbtn.x, leftbtn.y);
		// leftgroup.addChild(leftbtn2);
		// leftbtn2.blendMode = egret.BlendMode.ADD;
		// leftbtn2.alpha = 0;
        // egret.Tween.get(leftbtn2, { loop: true }).to({ alpha: 0.7, scaleX: -1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: -1, scaleY: 1 }, 400);
        
        let riightgroup = new BaseDisplayObjectContainer();
        riightgroup.width = 37;
        riightgroup.height = 55;
        riightgroup.x = GameConfig.stageWidth - 37;
        riightgroup.y = leftgroup.y;
        this.addChild(riightgroup);
        this._rightbtn = riightgroup;

        let rightbtn = ComponentManager.getButton(`titleupgradearrow`, ``, ()=>{
            let page = Math.min(arr.length, this._curLevel + 1);
            if(page != this._curLevel){
                this._curLevel = page;
                this.freshView();
                 this.removeChild(this._titleImg);
                this.addChild(this._titleImg);
            }
        }, this);
        rightbtn.anchorOffsetX = rightbtn.width / 2;
		rightbtn.anchorOffsetY = rightbtn.height / 2;
        egret.Tween.get(rightbtn, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        //特效
        riightgroup.addChild(rightbtn);

		// let rightbtn2 = BaseBitmap.create("titleupgradearrow");
		// rightbtn2.anchorOffsetX = rightbtn2.width / 2;
		// rightbtn2.anchorOffsetY = rightbtn2.height / 2;
		// rightbtn2.setPosition(rightbtn.x, rightbtn.y);
		// riightgroup.addChild(rightbtn2);
		// rightbtn2.blendMode = egret.BlendMode.ADD;
		// rightbtn2.alpha = 0;
        // egret.Tween.get(rightbtn2, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        this.freshView();

        this.removeChild(this._titleImg);
        this.addChild(this._titleImg);
    }

    private freshView() : void{
        let view = this;
        let api = Api.titleupgradeVoApi;
        let info = api.getTitleInfo(view._curTitleId);
        let curlv = info.level;

        let titleconfig = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        let isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
        let arr = [];
        switch(titleconfig.titleType){
            case 1:
                arr = Config.TitleupgradeCfg.diList;
                break;
            case 2:
                arr = Config.TitleupgradeCfg.wangList;
                break;
            case 7:
                arr = Config.TitleupgradeCfg.huangList;
                break;
        }

        //升级按钮显示
        if(curlv == arr.length){
            view._upgradeGroup.visible = false; 
        }
        else{
            view._upgradeGroup.visible = (curlv + 1 == view._curLevel && api.canTitleLevelUp(view._curTitleId)); 
        }
        
        view._culvTxt.text = LanguageManager.getlocal(`servant_lv`, [view._curLevel.toString()]);
        view._curlvbg.width = view._culvTxt.textWidth + 60;

        let leftred = false;
        for(let i = 2; i < view._curLevel; ++ i){
            if(Api.titleupgradeVoApi.canTitleLevelUp(view._curTitleId, i)){
                leftred = true;
                break;
            }
        }

        let rightred = false;
        for(let i = (view._curLevel + 1); i <= arr.length; ++ i){
            if(Api.titleupgradeVoApi.canTitleLevelUp(view._curTitleId, i)){
                rightred = true;
                break;
            }
        }
        
        if(curlv < view._curLevel){
            rightred = false;
        }

        if(leftred){
            App.CommonUtil.addIconToBDOC(view._leftbtn);
            let redpoint = view._leftbtn.getChildByName(`reddot`);
            if(redpoint){
                redpoint.x = -15;
                redpoint.y = -30;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._leftbtn);
        }
        
        if(rightred){
            App.CommonUtil.addIconToBDOC(view._rightbtn);
            let redpoint = view._rightbtn.getChildByName(`reddot`);
            if(redpoint){
                redpoint.x = -7;
                redpoint.y = -30;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rightbtn);
        }

        if(curlv == 0){
            view._nameBg.visible = view._nameTxt.visible = true;
            view._upgradeGroup.visible = view._progressGroup.visible = view._leveltxt.visible = view._leveltxtbg.visible = false;
        }
        else{
            view._nameBg.visible = view._nameTxt.visible = false;
            //特效变化
            //对应文本
            view._prevlvTxt.text = LanguageManager.getlocal(`servant_lv`, [curlv.toString()]);
            view._nextlvTxt.text = LanguageManager.getlocal(`servant_lv`, [(curlv + 1).toString()]);
            view._nextlvTxt.visible = view._nextbg.visible = curlv < arr.length;
            //进度
            let need = curlv == arr.length ? 1 : arr[curlv].timesNeed;
            view._progress.setPercentage(info.num / need);
            view._collectflag.visible = curlv >= view._curLevel;
            if(curlv >= view._curLevel){
                view._leveltxt.text = LanguageManager.getlocal(`titleupgradetip2`);
            }
            else{
                if(curlv == arr.length){
                    view._leveltxt.text = LanguageManager.getlocal(`acBattlePassMaxLevel-1`);
                    view._progress.setText(LanguageManager.getlocal(`acBattlePassMaxLevel-1`));
                }
                else{
                    view._leveltxt.text = LanguageManager.getlocal(`titleupgradetip1`, [String(curlv + 1), titleconfig.titleName, String(Math.max(0 ,need - info.num))]);
                    view._progress.setText((`${info.num}/${need}`));
                }
            }
            //进度
        }
        //特效变化
        if(view._titleImg){
            let posx = view._titleImg.x;
            let posy = view._titleImg.y;
            view._titleImg.dispose();
            view._titleImg = null;
            let titleImg = App.CommonUtil.getTitlePic(view._curTitleId, view._curLevel);
            titleImg.width = 155;
            titleImg.height = 59;
            titleImg.setPosition(posx, posy);
            // view._nodeContainer.addChild(titleImg);
             this.addChild(titleImg);
            view._titleImg = titleImg;
        }
        //身体特效
        view.refreshDBDragons();
        let tipTxtStr = `titleupgradeleveltip${view._curLevel}${titleconfig.titleType == 7 ? `_huang`:''}`;
        view._tiptxt.text = LanguageManager.getlocal(tipTxtStr);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._tiptxt, view._bottombg, [0,10]);

        let cfg = arr[view._curLevel - 1];
        let strarr = [`strength`,`intelligence`,`politics`,`charm`];
        for(let i = 1; i < 5; ++ i){
            let num = cfg[strarr[i - 1]];
            //--type:加成类型；1：固定值，2：百分比  注：加的属性是修身的！！！
            let str = cfg.type == 1 ? (num.toString()) : (`${(num * 100).toFixed(0)}%`)
            this[`_attr${i}Txt`].text = LanguageManager.getlocal(`titleupgradeattrtip${i}`, [str]);
        }

        view._leveltxtbg.width = Math.max(370, view._leveltxt.textWidth + 100);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._leveltxtbg, view._progressGroup, [0,-view._leveltxtbg.height-25]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._leveltxt, view._leveltxtbg);


        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._curlvbg, view._leveltxtbg, [0, -view._curlvbg.height-10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._culvTxt, view._curlvbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._prevlvTxt, view._prevbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._nextlvTxt, view._nextbg);

        view._leftbtn.visible = view._curLevel > 1;
        view._rightbtn.visible = view._curLevel < arr.length;
        
    }

    private refreshDBDragons(){
        let view = this;
        let tcfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);
        view._curRoleImg.dispose();
        view._curRoleImg = null;

        let resPath = "palace_db_" + this._curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(Api.playerVoApi.getPlayePicId())}` : ``);
        if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && Api.playerVoApi.checkHasDragonBones(this._curTitleId)){
            view._curRoleImg = App.CommonUtil.getPlayerDragonRole(this._curTitleId, Api.playerVoApi.getPlayePicId(), this._curLevel);
            view._curRoleImg.x = 320;
            view._curRoleImg.y = 175;
            
        }
        else{
            view._curRoleImg = Api.playerVoApi.getPlayerPortrait(Number(this._curTitleId), Api.playerVoApi.getPlayePicId(),0,false,null,null,this._curLevel);
            view._curRoleImg.x = GameConfig.stageWidth/2 - view._curRoleImg.width/2;
            view._curRoleImg.y = tcfg.titleType == 7 ? 100 : 140;
        }
        view._nodeContainer.addChild(view._curRoleImg);
	}

    protected collectBtnClickHandler()
    {
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY,{});
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            `titleupgradebtn`,`titleupgradebtntxt`,`servant_attributemap`,
            `arena_bottom`,`progress16_bg`,`progress16`,`specialview_commoni_namebg`,"palace_collectflag",
            `titleupgradeprogressbg`,`battlelvup`,`titleupgradeget`,`titleupgradearrow`,`titleupgradeline`,`titleupgradebottombg`,`titleupgradebottombg2`
        ]);
    }
    
    // protected receiveData(data: { ret: boolean, data: any }): void
    // {
    //     let rData = data.data;
    //     if(rData.ret == 0)
    //     {
    //         this._kingsList = rData.data.kinglist;
    //         this._kingsSign = rData.data.sign;
    //         this._kingsInfo = rData.data.info;
    //     }
    // }

    // protected tick()
    // {
    //     let titleId =  this.param.data.titleId;
    //     if(!this.isGotoKingsHouse && titleId && Config.TitleCfg.isTheKingTitleId(titleId) && Api.promoteVoApi.isKing())
    //     {
    //         this.isGotoKingsHouse = true;
    //         let msg = LanguageManager.getlocal("decree_tobeNewKingTip");
    //         ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
    //             title:"itemUseConstPopupViewTitle",
    //             msg:msg,
    //             callback:this.gotoHKingsHouse,
    //             handler:this,
    //             needCancel:false
    //         });
    //     }
    //     return true;
    // }

    // protected getRequestData():{requestType:string,requestData:any}
	// { 
    //    let titleId =  this.param.data.titleId;
    //    if(titleId && Config.TitleCfg.isTheKingTitleId(titleId))
    //    {
    //         return {requestType:NetRequestConst.REQUEST_POLICY_INDEX,requestData:{}};
    //    }
    //     // return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
    // }
    private upgradeCallback(evt : egret.Event):void{
        let view = this;
        if(evt && evt.data && evt.data.ret && evt.data.data.data){
            let upgradeclick = ComponentManager.getCustomMovieClip(`tilelevelbtnclick`, 12);
            upgradeclick.playWithTime(1);
            view._upgradeGroup.addChild(upgradeclick);
            upgradeclick.x = -105;
            upgradeclick.y = -105;
            upgradeclick.setEndCallBack(()=>{
                this.showUpgradeEffect();
                let titleconfig = Config.TitleCfg.getTitleCfgById(this._curTitleId);
                let isdi = titleconfig.isTitle == 1 && titleconfig.titleType == 1;
                let arr = [];
                switch(titleconfig.titleType){
                    case 1:
                        arr = Config.TitleupgradeCfg.diList;
                        break;
                    case 2:
                        arr = Config.TitleupgradeCfg.wangList;
                        break;
                    case 7:
                        arr = Config.TitleupgradeCfg.huangList;
                        break;
                }
            
                view._curLevel = Math.min(view._curLevel + 1, arr.length);
                view.freshView();
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_TITLEUPGRADE_MODEL, evt.data.data.data.titleId);
            }, view);
        }
    }

    protected showUpgradeEffect()
	{	
		SoundManager.playEffect(SoundConst.EFFECT_UPD); 

		let upgradeClip = ComponentManager.getCustomMovieClip("servant_upgrade_frame",5,100);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, upgradeClip, this._upgradeGroup, [-40, -40]);
		this.addChild(upgradeClip);
        upgradeClip.playWithTime(-1);

        let upBg = BaseBitmap.create("battlelvup");
        this.addChild(upBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, upBg, this._upgradeGroup, [0, 20]);
        egret.Tween.get(upBg).to({y:this._upgradeGroup.y - 30},700).call(
            function(upBg:BaseBitmap){
                BaseBitmap.release(upBg);
                upBg = null;
                this._stopTouch = false;
            },
            this,
            [upBg]
        )
         
		let tmpthis = this;
		egret.Tween.get(this,{loop:false}).wait(500).call(function(){
			//字体刷新加个延时
			tmpthis.removeChild(upgradeClip);
            upgradeClip = null;
		});
	}

    protected getTitleStr():string{
		return `titleupgradetitle`;
    }
    
    protected getRuleInfo():string{
		return "titleupgraderule";
	}
	public dispose():void
	{
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectBtnClickHandlerCallback,this);
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO),this.palaceInfoHandlerCallback,this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SERVANTBONE);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TITLEUPGRADE), this.upgradeCallback, this);
        this._nodeContainer = null;
        this._nameBg = null;
        this._curRoleImg = null;
        this._curTitleId = null;
        this._progress = null;
        this._leveltxtbg = null;
        this._leveltxt = null;
        this._culvTxt = null;
        this._curLevel = 0;
        this._rightbtn = null;
        this._leftbtn = null;
        this._tiptxt = null;
        this._collectflag = null;
        this._nextlvTxt = null;
        this._prevlvTxt = null;
        this._nameTxt = null;
        this._titleImg = null;
        this._prevbg = null;
        this._nextbg = null;
        this._curlvbg = null;
        this._bottombg = null;
        this._stopTouch = false;
        this._attr1Txt = null;
        this._attr2Txt = null;
        this._attr3Txt = null;
        this._attr4Txt = null;
		super.dispose();
	}
}