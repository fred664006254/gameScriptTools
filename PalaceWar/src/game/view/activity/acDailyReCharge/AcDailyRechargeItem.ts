/**
 * author : qianjun
 * desc : 累计充值itemrender
 */
class AcDailyRechargeItem  extends ScrollListItem{
    private _data : any;
    private progressBar : ProgressBar = null;
    private _btn : BaseButton = null;
    private _collectFlag : BaseBitmap = null;
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.DailyRechargeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDailyRechargeVo{
        return <AcDailyRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_DAILYRECHARGE;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:Config.AcCfg.DailyRechargeItemCfg,code:string){
		let temW = 600;
        let temH = 256 + 5;
        let view = this;
        view._data = data;
        view._code = code;
        let uicode = view.getUiCode();
        let curday = this.vo.getNowDay();

        view.width = temW;
        view.height = temH;

        let bgres = `dailyrecharge${this.cfg.getReardType()}bg`;

		let bg:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode(bgres, uicode));
		view.addChild(bg);

        let Txt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDailyRechargeTip2`, code), [data.id.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.textAlign = egret.HorizontalAlign.CENTER;
        Txt1.width = 22;
        view.addChild(Txt1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt1, bg, [19,50]);

        let descbg:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode(`dailyrechargelistnamebg`, uicode));
        descbg.width = 356;
        view.addChild(descbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, bg, [57,20]);

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDailyRechargeTip3`, code), [data.needGem.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(descTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, descTxt, descbg, [15,1]);

		let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = 380;
		rewardBg.height = 115;
		rewardBg.x = bg.x +54;
		rewardBg.y = bg.y +70;
        this.addChild(rewardBg);
    
		let reward = ""
		let scroStartY = rewardBg.y + 10;
        let tmpX = rewardBg.x+8;
        let deltaS = 0.8;
        
        let contentList = GameData.getRewardItemIcons(data.getReward, true);
        for (let index = 1; index < contentList.length; index++) {
			let iconItem = contentList[index];
			iconItem.setScale(deltaS);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width*deltaS+4);
			
            if (tmpX > rewardBg.x+ rewardBg.width)
            {
                tmpX = rewardBg.x+8;
                scroStartY += iconItem.height*deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width*deltaS+4);
            }
			this.addChild(iconItem);
		}
        scroStartY += 100;
		rewardBg.height = scroStartY - rewardBg.y;
		rewardBg.width -= 5;

        let specialreward = GameData.formatRewardItem(data.getReward)[0];
        if(specialreward.type == 6 ||specialreward.type == 11){
            let rewardDB = GameData.getItemIcon(specialreward, true, false);
            rewardDB.x = bg.x + 507 - rewardDB.width/2 + 15;
            rewardDB.y = bg.y + 135 - rewardDB.height/2 - 35;
            let b = <BaseBitmap>rewardDB.getChildByName("iconBg");
            if(b){
                b.setRes(`ac_firstsightlove_special_itembg`);
                b.x = -10;
                b.y = -16;
            }
            let numLb = rewardDB.getChildByName("numLb");
            numLb.x = 80;
            numLb.y = 80;
            this.addChild(rewardDB);

            let numbg = <BaseBitmap>rewardDB.getChildByName("numbg");
            if (numbg){
                numbg.setRes(`dailyrechargenumbg`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, numbg, numLb,[0,-5]);
            }

            let anim = ComponentManager.getCustomMovieClip("acrechargeboxspview_rewardanim",10,70);
            anim.x = rewardDB.x + rewardDB.width/2 - 190/2;
            anim.y = rewardDB.y + rewardDB.height/2 - 190/2;
            anim.blendMode = egret.BlendMode.ADD; 
            this.addChild(anim);
            anim.playWithTime(-1);
    
        } 
        else if(specialreward.type == 10){
            //红颜
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width-6 + 16;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;

            let scaleNum = 0.29;
            let wifeBM =  BaseLoadBitmap.create("wife_full_"+ specialreward.id);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width/2 - wifeBM.width * scaleNum/2;
            wifeBM.y = mask.y + mask.height - wifeBM.height *scaleNum;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);

            //衣装预览
            let btnContainer = this.getSkinBtnContainer(specialreward, true);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);

        } 
        else if(specialreward.type == 16){
            //红颜皮肤
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width-4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;

            let scaleNum = 0.29;
            let wifeBM =  BaseLoadBitmap.create("wife_skin_"+ specialreward.id);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = 420;
            wifeBM.y = 8;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);

            //衣装预览
            let btnContainer = this.getSkinBtnContainer(specialreward);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);
        }
        else if(specialreward.type == 8){
            //门客
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width-4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;

            let scaleNum = 0.55;
            let wifeBM =  BaseLoadBitmap.create("servant_full_"+ specialreward.id);
            wifeBM.width = 405;
            wifeBM.height = 467;
            wifeBM.setScale(scaleNum);
            wifeBM.x = mask.x + mask.width/2 - wifeBM.width * scaleNum/2;
            wifeBM.y = mask.y + mask.height - wifeBM.height *scaleNum;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);

            //衣装预览
            let btnContainer = this.getSkinBtnContainer(specialreward, true);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);
        }
        else if(specialreward.type == 19){
            //门客皮肤
            let mask = BaseBitmap.create("public_9_viewmask");
            mask.width = 200;
            mask.height = 230;
            mask.x = this.width - mask.width-4;
            mask.y = 10;
            this.addChild(mask);
            mask.visible = false;

            let scaleNum = 0.55;
            let wifeBM =  BaseLoadBitmap.create("skin_full_"+ specialreward.id);
            wifeBM.width = 405;
            wifeBM.height = 467;
            wifeBM.setScale(scaleNum);
            wifeBM.x = 420;
            wifeBM.y = 8;
            // wifeBM.mask = mask;
            this.addChild(wifeBM);

            //衣装预览
            let btnContainer = this.getSkinBtnContainer(specialreward);
            this.addChild(btnContainer);
            btnContainer.setPosition(this.width - 190, bg.y + 87);
        }

		let bool = false;
		if(this.vo.getNowFlag()){
			bool = data.id > curday;
		}
		else{
			bool = data.id > (curday + 1);
        }
        let chargenum = 0;
        if(this.vo.getNowDay() >= data.id){
            chargenum = data.needGem;
        }
        else{
            chargenum = bool ? 0 : view.vo.getChargeNum();
        }
        
        let progressBar = ComponentManager.getProgressBar("progress17","progress17_bg",345);
        view.addChild(progressBar);
        progressBar.setPercentage(chargenum/data.needGem);
        progressBar.setText(`${chargenum}/${data.needGem}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressBar, rewardBg, [0, rewardBg.height+20]);
        this.progressBar = progressBar;

        let btnstyle = data.needGem > chargenum ? ButtonConst.BTN2_SMALL_RED : ButtonConst.BTN2_SMALL_YELLOW;
        let btnstr = data.needGem > chargenum ? `allianceBtnGo` : `taskCollect`;
        let buyBtn = ComponentManager.getButton(btnstyle,btnstr,()=>{
            if(view.vo.isEnd){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`atkracecrossCDTime3`, code)));
                return;
            }

            let curday = this.vo.getNowDay();
            let bool = false;
            if(this.vo.getNowFlag()){
                bool = data.id > curday;
            }
            else{
                bool = data.id > (curday + 1);
            }
            if(this.vo.getNowDay() >= data.id){
                chargenum = data.needGem;
            }
            else{
                chargenum = bool ? 0 : view.vo.getChargeNum();
            }    
            if(bool){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDailyRechargeTip4`, code)));
                return;
            }
            else{
                if(data.needGem <= chargenum){
                    //发消息
                    view.vo.lastpos = buyBtn.localToGlobal(buyBtn.width/2 + 50,20);
                    view.vo.lastidx = view._index;
                    NetManager.request(NetRequestConst.REQUEST_DAILYRECHARGE_GEREWARD,{
                        activeId:this.acTivityId,
                        rkey:data.id
                    })
               }
               else{
                   if(view.vo.isInActivity()){
                       view.goRechargeHandler();
                   }
                   else{
                       App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`atkracecrossCDTime3`, code)));
                   }
               }
            }
            
        },view);    
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, buyBtn, progressBar, [progressBar.width+30, 0]);
        view.addChild(buyBtn);
        view._btn = buyBtn;    

        let collectFlag = BaseBitmap.create("collectflag");
        collectFlag.anchorOffsetX = collectFlag.width / 2;
        collectFlag.anchorOffsetY = collectFlag.height / 2;
        collectFlag.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectFlag, buyBtn, [-30,-20]);
        view.addChild(collectFlag);
        view._collectFlag = collectFlag;
        if(view.vo.isGetRecharge(data.id)){
           collectFlag.visible = true;
           buyBtn.visible = false;
           progressBar.setPercentage(1);
           progressBar.setText(LanguageManager.getlocal(`bookRoomServant_studyComplete`));
        }
        else{
            collectFlag.visible = false;
            buyBtn.visible = true;
            //今日已标记
            let bool = false;
            if(this.vo.getNowFlag()){
                bool = data.id > curday;
            }
            else{
                bool = data.id > (curday + 1);
            }
            if(bool){
                buyBtn.setGray(true);
                buyBtn.setText(`acRechargeBoxSPPopupViewLock`, true);
            }
        }
    }

    public update(show : boolean = false):void{
        let view = this;
        let data = view._data;
        let progressBar = view.progressBar;
        let bool = false;
        let curday = view.vo.getNowDay();
		if(this.vo.getNowFlag()){
			bool = data.id > curday;
		}
		else{
			bool = data.id > (curday + 1);
        }
        let chargenum = 0;
        if(this.vo.getNowDay() >= data.id){
            chargenum = data.needGem;
        }
        else{
            chargenum = bool ? 0 : view.vo.getChargeNum();
        }
        
        
        progressBar.setPercentage(chargenum/data.needGem);
        progressBar.setText(`${chargenum}/${data.needGem}`);
    
        let btnstyle = data.needGem > chargenum ? ButtonConst.BTN2_SMALL_RED : ButtonConst.BTN2_SMALL_YELLOW;
        let btnstr = data.needGem > chargenum ? `allianceBtnGo` : `taskCollect`;
        view._btn.setText(btnstr);
        view._btn.setBtnBitMap(btnstyle);

        if(view.vo.isGetRecharge(data.id)){
            progressBar.setPercentage(1);
            progressBar.setText(LanguageManager.getlocal(`bookRoomServant_studyComplete`));
            view._collectFlag.visible = true;
            view._btn.visible = false;
            if(show){
                view._collectFlag.alpha = 0;
                view._collectFlag.setScale(1.3);
                egret.Tween.get(view._collectFlag).to({scaleX:0.7,scaleY:0.7,alpha:1},300).call(()=>{
                    egret.Tween.removeTweens(view._collectFlag);
                }, view);
            }
        }
        else{
            view._collectFlag.visible = false;
            view._btn.visible = true;
            //今日已标记
            if(bool){
                view._btn.setGray(true);
                view._btn.setText(`acRechargeBoxSPPopupViewLock`, true);
            }
            else{
                view._btn.setGray(false);
            }
        }
    }
    
     //衣装预览按钮
    private getSkinBtnContainer(rewardvo : RewardItemVo, isOther?:boolean):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(0, 0);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		container.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
        
        let skinTxtStr = (rewardvo.type == 19 || rewardvo.type == 16) ? "acwealthcarpview_servantskintxt" : "acgiftreturnview_common_skintxt";
        if (isOther){
            skinTxtStr = "acgiftreturnview_common_skintxt"
        }
		let skinTxt = BaseBitmap.create(skinTxtStr);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		container.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


		let skinTxteffect = BaseBitmap.create(skinTxtStr);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		container.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

		//透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
		touchPos.height = 40;
		touchPos.setPosition(25, 57);
        container.addChild(touchPos);

        let showType = rewardvo.type+"_"+rewardvo.id+"_1";
		touchPos.addTouchTap(() => {
            let topMsg = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDailyRechargeTip1`, this.getUiCode()), [this.cfg.recharge[1].needGem,String(Object.keys(this.cfg.recharge).length), rewardvo.name]);
            let data = {data:[
                {idType:showType, topMsg:topMsg, scale:rewardvo.type == 16 ? 0.6 : 0.8},
            ]};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
		}, this);
        return container;
    }
    
    protected goRechargeHandler(){
        if(this.vo.isInActivity()){
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
        }
    }

    public getSpaceX():number
    {
        return 0;
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this.progressBar = null;
        this._btn = null;
        this._data = null;
        this._collectFlag = null;
        super.dispose();
    }
}