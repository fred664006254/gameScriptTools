/*
author : qianjun
date : 2018.4.14
desc : 德川时代
*/
class AcDechuanshidaiView extends AcCommonView{
    private _timeCountTxt : BaseTextField = null;
    private _stop = false;
    private _detailbtn = null;
    private _useTxt : BaseTextField = null;
    public _wifeContainer:BaseDisplayObjectContainer = null;
    public _servantContainer:BaseDisplayObjectContainer = null;
    public _isShowWife:Boolean = false;
    public _skinTxt:BaseBitmap = null;
    public _skinTxtEffect:BaseBitmap = null;

    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.DechuanshidaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDechuanshidaiVo{
        return <AcDechuanshidaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected getRuleInfo():string{
        let code = this.getUiCode();
        if(Api.switchVoApi.checkServantRefuseBattle()){
            return `acDechuanshidairule-${code}_withOpenRefusal`;
        }
		return `acDechuanshidairule-${code}`;
    } 

    protected getProbablyInfo(): string {
		return `acDechuanshidaiProbablyinfo-${this.getUiCode()}`;
	}

    
    protected isHideTitleBgShadow():boolean{
		return true;
	}

    // 背景图名称
	protected getBgName():string{
        let code = this.getUiCode();
		return `dechuanbg-${code}`;
    }

    protected initBg():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let bgName : string = this.getBgName();
		if(bgName){
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    }


    protected getTitleBgName():string{
        return `dechuantitle-${this.getUiCode()}`
    }

    protected getTitleStr():string{
        return null;
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
    protected getReportTipData(): { title: { key: string, param?: string[] }, msg: { key: string, param?: string[] } } {
        return { title: { key: `acDechuanshidaireporttitle-${this.getUiCode()}` }, msg: { key: `acDechuanshidaireportmsg-${this.getUiCode()}` } };
    }
    
    protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `dechuancode1`,`acwealthcarpview_skineffect1`,`arena_bottom`,`wife_btnbg`, "acthrowstone_common_wife_txt","acthrowstone_common_servant_txt",
        ]);
    }

    protected getContainerY():number{
        return 92;
    }

    public initView(){
		let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height - 92;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND),view.attackCallback,view);
        //top背景图
        let topbg = BaseBitmap.create(`dechuantopbg-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, topbg, view.titleBg, [0]);
        view.addChildToContainer(topbg);

        let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true,String(0xffffff))}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        // 423 205
        timeTxt.width = 390;
        timeTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [10,20]);
        view.addChildToContainer(timeTxt);

        //倒计时位置 
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChildToContainer(tip2Text);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip2Text, timeTxt, [0,timeTxt.textHeight+7]);
        view._timeCountTxt = tip2Text;


        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acDechuanshidaidesc-${code}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 610;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tip2Text, [0,tip2Text.textHeight+7]);
        view.addChildToContainer(tipTxt);
        //活动详情
        let detailbtn = ComponentManager.getButton(`dechuandetailbtn-${code}`, ``, ()=>{
            if(view._stop){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIPOPUPVIEW,{
                aid : view.aid,
                code : view.code
            });
        }, view);
        view.addChildToContainer(detailbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, detailbtn, topbg, [15,topbg.height+10]);
        view._detailbtn = detailbtn;
        //奖池展示
        let rewardbtn = ComponentManager.getButton(`dechuanrewardbtn-${code}`, ``, ()=>{
            if(view._stop){
                return;
            }
            ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIREWARDPOOLVIEW,{
                aid : view.aid,
                code : view.code
            });
        }, view);
        view.addChildToContainer(rewardbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rewardbtn, topbg, [15,topbg.height+10]);

        let bottombg = BaseBitmap.create(`arena_bottom`);
        bottombg.height = 145;
        view.addChildToContainer(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view.container, [0,0], true);
        
        //人物形象
        let dikukang1 = BaseBitmap.create(`dechuandikuang-${code}`);
        view.addChildToContainer(dikukang1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, dikukang1, bottombg, [0, bottombg.height+30]);

        //红颜
        this._wifeContainer = this.createWifeOrServant(this.cfg.getSkin(code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._wifeContainer, dikukang1);
        this.addChildToContainer(this._wifeContainer);
        this._wifeContainer.visible = false;
        //门客
        this._servantContainer = this.createWifeOrServant(this.cfg.getServant(code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._servantContainer, dikukang1);
        this.addChildToContainer(this._servantContainer);

        let dikukang2 = BaseBitmap.create(`dechuandikuang2-${code}`);
        view.addChildToContainer(dikukang2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, dikukang2, dikukang1);
            
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, skinTxtEffect, dikukang1, [0, 50]);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acthrowstone_common_servant_txt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);
        this._skinTxt = skinTxt;

		let skinTxteffect = BaseBitmap.create("acthrowstone_common_servant_txt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxteffect, skinTxt);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        this._skinTxtEffect = skinTxteffect;
        //透明点击区域
		let touchPos = BaseBitmap.create("public_alphabg");
		touchPos.width = 160;
		touchPos.height = 80;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, touchPos, skinTxtEffect);
		view.addChildToContainer(touchPos);
		touchPos.addTouchTap(() => {
            if(view._stop){
                return;
            }
            if(view._isShowWife){
                ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIPOPUPVIEW4, {
                    aid : view.aid,
                    code : view.code
                });
            }
            else{
                ViewController.getInstance().openView(ViewConst.POPUP.ACDECHUANSHIDAIPOPUPVIEW3, {
                    aid : view.aid,
                    code : view.code
                });
            }
           
        }, ViewController);

        let pos = {
            1 : [14,135],
            2 : [460,135],
            3 : [59,394],
            4 : [414,394],
        }
        for(let i = 1; i < 5; ++ i){
      
            let lightbg = ComponentManager.getButton(`dechuanbtnlightbg-${code}`, ``, null, null,null,3);
            view.addChildToContainer(lightbg);
            lightbg.name = `lightbg${i}`;
            lightbg.setPosition(dikukang2.x + pos[i][0], dikukang2.y + pos[i][1]);

            let group = new BaseDisplayObjectContainer();
            view.addChildToContainer(group);
            group.width = lightbg.width;
            group.height = lightbg.height;
            group.name = `group${i}`;
            group.setPosition(dikukang2.x + pos[i][0], dikukang2.y + pos[i][1]);

            let img = BaseLoadBitmap.create(`dechuantype${i}-${code}`);
            img.width = 100;
            img.height = 100;
            view.addChildToContainer(img);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, img, lightbg);
            img.addTouchTap(()=>{
                ViewController.getInstance().openView(ViewConst.POPUP[`ACDECHUANSHIDAITASKVIEW${i}`],{
                    aid : view.aid,
                    code : view.code
                });
            }, view);

            let wife_btnbg = BaseBitmap.create(`wife_btnbg`);
            wife_btnbg.name = `wife_btnbg${i}`;
            view.addChildToContainer(wife_btnbg);
            wife_btnbg.width = 100;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wife_btnbg, lightbg, [0, lightbg.height]);

            let typeTxt = ComponentManager.getTextField(`X${view.vo.dayNumById(i)}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            typeTxt.name = `typeTxt${i}`;
            view.addChildToContainer(typeTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeTxt, wife_btnbg);

            lightbg.visible = view.vo.getCurDays() == i;
        }
        //回忆
        let destroyone = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acDechuanshidaicost1-${code}`, ()=>{
            //消耗一次
            if(view._stop){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(view.vo.getFreeNum() == 0 && Api.playerVoApi.getPlayerGem() < (view.cfg.cost)){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip1-${code}`));
            }
            else{
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DECHUAN_REMIND,{
                    activeId:view.acTivityId, 
                    isFree:view.vo.getFreeNum() > 0 ? 1 : 0,
                    isTenPlay:0        
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, destroyone, bottombg, [75,30]);
        view.addChildToContainer(destroyone);

        let useIcon = BaseLoadBitmap.create(`itemicon1`);
        useIcon.width = useIcon.height = 100;
        useIcon.setScale(0.4);
        view.addChildToContainer(useIcon);

        let useTxt = ComponentManager.getTextField(`X${view.cfg.cost}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(useTxt);
        view._useTxt = useTxt;

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, useIcon, destroyone, [25,-useIcon.height*useIcon.scaleY-3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, useTxt, useIcon, [useIcon.width*useIcon.scaleX,0]);

        let destroyall = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acDechuanshidaicost10-${code}`, ()=>{
            //消耗10次
            if(view._stop){
                return;
            }
            if(!view.vo.isInActivity()){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if(Api.playerVoApi.getPlayerGem() < (view.cfg.cost*10*view.cfg.discount)){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip1-${code}`));
            }
            else{
                //
                view._stop = true;
                NetManager.request(NetRequestConst.REQUEST_DECHUAN_REMIND,{
                    activeId:view.acTivityId, 
                    isFree:0,
                    isTenPlay:1      
                });
            }
        }, view, null, 0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, destroyall, bottombg, [75,30]);
        view.addChildToContainer(destroyall);

        let alluseIcon = BaseLoadBitmap.create(`itemicon1`);
        alluseIcon.width = alluseIcon.height = 100;
        alluseIcon.setScale(0.4);
        view.addChildToContainer(alluseIcon);

        let alluseTxt2 = ComponentManager.getTextField(`X${(view.cfg.cost*10*view.cfg.discount).toFixed(0)}`, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(alluseTxt2)

        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, alluseIcon, destroyall, [(destroyall.width - alluseIcon.width*alluseIcon.scaleX - alluseTxt2.width)/2,-alluseIcon.height*alluseIcon.scaleY-3]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alluseTxt2, alluseIcon, [alluseIcon.width*alluseIcon.scaleX,0]);

        view.freshView();
    }
    
    private freshView():void{
        let view = this;
        if(view.vo.getpublicRedhot1() || view.vo.getpublicRedhot4()){
            App.CommonUtil.addIconToBDOC(view._detailbtn);
        }
        if(!view.vo.getpublicRedhot1() && !view.vo.getpublicRedhot4()){
            App.CommonUtil.removeIconFromBDOC(view._detailbtn);
        }
        if(view.vo.getFreeNum()){
            view._useTxt.text = LanguageManager.getlocal(`sysFreeDesc`);
        }
        else{
            view._useTxt.text = `X ${view.cfg.cost}`
        }

        for(let i = 1; i < 5; ++ i){
            let lightbg = <BaseButton>view.container.getChildByName(`lightbg${i}`);
            let wife_btnbg = view.container.getChildByName(`wife_btnbg${i}`);

            let typeTxt = <BaseTextField>view.container.getChildByName(`typeTxt${i}`);
            typeTxt.text = `X${view.vo.dayNumById(i)}`;

            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, typeTxt, wife_btnbg);

            lightbg.visible = view.vo.getCurDays() == i;
            let group = <BaseDisplayObjectContainer>view.container.getChildByName(`group${i}`);
            if(view.vo.getDayTaskReward(i)){
                App.CommonUtil.addIconToBDOC(group);
            }
            else{
                App.CommonUtil.removeIconFromBDOC(group);
            }
        }
    }

    public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
    }

    public hide():void{
        if(this._stop){
            return;
        }
        super.hide();
    }

    private attackCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        view._stop = false;
        if(data){
            ViewController.getInstance().openView(ViewConst.POPUP.ACMOTHERDAYREWARDSHOWVIEW, {
                aid: view.aid,
                code: view.code,
                rewards: data.rewards,
                msg : LanguageManager.getlocal(`acDechuanshidaitip4-${this.getUiCode()}`),
            });
        }
        view.changeWifeStatus();
    }

    //创建门客或红颜
    public createWifeOrServant(skinId:string):BaseDisplayObjectContainer{
        let wifeCfg: Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(skinId);
        let servantCfg = Config.ServantCfg.getServantItemById(skinId);
        let isWife = false;
        if (wifeCfg){
            isWife = true;
        }
        let container = new BaseDisplayObjectContainer();
        container.width = 604;
        container.height = 550;
        if(isWife){
            let boneName = undefined;
            if (wifeCfg && wifeCfg.bone) {
                boneName = wifeCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                droWifeIcon.anchorOffsetY = droWifeIcon.height;
                droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
                droWifeIcon.x = 302;
                droWifeIcon.y = 470;
                droWifeIcon.mask = new egret.Rectangle(-354, -800, 914, 820);
                droWifeIcon.setScale(0.75);
                container.addChild(droWifeIcon);
            }
            else {
                let wifeImg = BaseLoadBitmap.create(wifeCfg.body);
                wifeImg.width = 640;
                wifeImg.height = 840;
                wifeImg.setScale(0.52);
                container.addChild(wifeImg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wifeImg, container, [0,0], true);
            }
        }
        else{
            let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(skinId);
            let dagonBonesName = `servant_full2_${skinId}`;

            let boneName = undefined;
            let servant = null;
            if (servantCfg && dagonBonesName) {
                boneName = dagonBonesName + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                servant = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                servant.mask = new egret.Rectangle(-354, -609, 914, 580);
                servant.x = 302;
                servant.y = 520;
            }
            else {
                servant = BaseLoadBitmap.create(servantCfg.fullIcon);
                servant.width = 405;
                servant.height = 467;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servant, container, [0,0], true);
            }
            container.addChild(servant);
        }
        return container;
    }

    //切换红颜
    public changeWifeStatus():void{
        this._isShowWife = !this._isShowWife;
        this._skinTxt.alpha = 0;
        this._skinTxtEffect.alpha = 0;
        let skinResStr = "acthrowstone_common_wife_txt";
        if (this._isShowWife){
            this._wifeContainer.visible = true;
            this._servantContainer.visible = false;
        }
        else{
            this._wifeContainer.visible = false;
            this._servantContainer.visible = true;
            skinResStr = "acthrowstone_common_servant_txt";
        }
        this._skinTxt.setRes(skinResStr);
        this._skinTxtEffect.setRes(skinResStr);
        this._skinTxt.alpha = 1;
        this._skinTxtEffect.alpha = 1;
    }

    public dispose():void{   
        let view = this;
        view._timeCountTxt = null;
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACDESTORYSAME_MAKELINE, view.makePointLine, view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_REMIND),view.attackCallback,view);
        view._stop = false;
        view._detailbtn = null;
        view._useTxt = null;
        view._wifeContainer = null;
        view._servantContainer = null;
        view._isShowWife = false;
        view._skinTxt = null;
        view._skinTxtEffect = null;
        super.dispose();
    }
}