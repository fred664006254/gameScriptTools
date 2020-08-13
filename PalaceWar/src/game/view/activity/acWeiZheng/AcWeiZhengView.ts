/*
    author : qianjun
    desc : 魏征活动
*/

class AcWeiZhengView extends AcCommonView{
    private _timeCountTxt : BaseTextField = null;
    private _timebg : BaseBitmap = null;
    private _taskbtn1 : BaseButton = null;
    private _taskbtn2 : BaseButton = null;
    private _taskbtn3 : BaseButton = null;
    private _light : BaseBitmap = null;
    private _nowday = 1;
    private _rechatgebtn : BaseButton = null;
    private _progressBar : ProgressBar = null;
    private _exchangeBtn : BaseButton = null;
    private _exchangeIcon : BaseLoadBitmap = null;
    private _tipGroup : BaseDisplayObjectContainer = null;
    private _exchangeTxt : BaseTextField = null;

    public constructor(){
        super();
    }

    // 标题背景名称
	protected getTitleBgName():string
	{
		return "weizhengtitle-" + this.getUiCode();
	}

    protected getTitleStr():string
	{
		return null;
	}

    protected getRuleInfo():string{
		return "acWeiZhengRule-" + this.getUiCode();
    } 

    private get cfg() : Config.AcCfg.WeiZhengCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWeiZhengVo{
        return <AcWeiZhengVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected initBg():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
    
        let bgName : string = this.getBgName();
		if(bgName){
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
        }
    }

    protected getUiCode():string{
        let code = ``;
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

    protected getBgName():string{
        let code = this.getUiCode();
		return `weizhengbg-${code}`;
    }

      protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            `acweizheng${code}`,`weizhengbg-${code}`,"acliangbiographyview_common_acbg",`progress3`,`progress3_bg`,`specialview_commoni_namebg`
        ]);
    }

    public initView() {
        let view = this;
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_EXCHANGE),this.rewardCallBack,this);
        
        //top背景图
        let topbg = BaseBitmap.create(`acliangbiographyview_common_acbg`);
        topbg.width = GameConfig.stageWidth;
        view.addChildAt(topbg,this.getChildIndex(this.container));
        
        let timeTxt = ComponentManager.getTextField(`${view.vo.getAcLocalTime(true)}`, 20);
        timeTxt.width = 600;
        timeTxt.lineSpacing = 5;
        view.addChild(timeTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acWeiZhengTip1-${code}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 600;
        tipTxt.lineSpacing = 5;
        view.addChild(tipTxt);

        topbg.height = timeTxt.textHeight + 5 + tipTxt.textHeight + 18;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height-7]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timeTxt, topbg, [20,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, timeTxt, [0,timeTxt.textHeight + 5]);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        view.addChild(timebg);
        timebg.y = (topbg.y+topbg.height - 14);
        view._timebg = timebg;

        let str = view.vo.isInActy() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
        view.addChild(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = timebg.x+(timebg.width-tip2Text.width)*0.5;

        //底部书桌
        let bottom = BaseBitmap.create(`weizhengdesk-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottom, view);
        //中部形象
        let skinbone = view.cfg.getSkinBone(view.getUiCode());
        let boneName = undefined;
        let wife = null;
		if (skinbone) {
			boneName = skinbone + "_ske";
        }
        let obj = {
			1 : 'servant',
        };
        let isDragon = (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon();
		if (isDragon){
            wife = App.DragonBonesUtil.getLoadDragonBones(skinbone);
            if(obj[view.getUiCode()] == `wife`){
                wife.width = 354;
                wife.height = 611;
                wife.setAnchorOffset(-138.5, -610);
                if(PlatformManager.checkIsTextHorizontal())
                {
                    wife.setAnchorOffset(-138.5, -650);
                }
                wife.setScale(0.9);
            }
            else{
                // wife.scaleX = 1.05;
                // wife.scaleY = 1.05;
                // wife.width = 431;
                // wife.height = 524;
                wife.y = bottom.y;
                wife.x = 320;
            }
		}
		else {
            wife = BaseLoadBitmap.create(`skin_full_${view.cfg.getSkinId(code)}`);
            wife.width = 405;
            wife.height = 467;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wife, bottom, [0,bottom.height - 20]);
        }
       
        view.addChild(wife);
        wife.addTouchTap(()=>{
            let item = GameData.formatRewardItem(view.cfg.claim[0].costShu)[0];
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONSKINVIEW, {
                skinId : view.cfg.getSkinId(view.getUiCode()),
                needTxt : `acWeiZhengTip9-${code}`,
                need : item.num
            });
        }, view);

        //气泡提示
        let bubbleTopGroup = new BaseDisplayObjectContainer();
        view.addChild(bubbleTopGroup);
        bubbleTopGroup.alpha = 0;

        let descBg = BaseBitmap.create('public_9_bg42');
        view.addChild(descBg);
        bubbleTopGroup.addChild(descBg);

        let arrowBM = BaseBitmap.create("public_9_bg13_tail");
        arrowBM.anchorOffsetX = arrowBM.width / 2;
        arrowBM.anchorOffsetY = arrowBM.height / 2;
        bubbleTopGroup.addChild(arrowBM);

        let descTxt =ComponentManager.getTextField(LanguageManager.getlocal(`acWeiZhengServantTip0-${code}`), 20, TextFieldConst.COLOR_BLACK);
        descTxt.lineSpacing = 5;
        bubbleTopGroup.addChild(descTxt);

        descBg.width = descTxt.textWidth + 40;
        descBg.height = descTxt.textHeight + 36;
        bubbleTopGroup.width = descBg.width;
        bubbleTopGroup.height = descBg.height + arrowBM.height;
        
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, bubbleTopGroup, [0,0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [arrowBM.anchorOffsetX + 15, arrowBM.anchorOffsetY + descBg.height - 13]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);

        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, bubbleTopGroup, view, [8, bottom.y - 500]);
        let count = 1;
        egret.Tween.get(bubbleTopGroup, {loop : true}).to({alpha : 1}, 700).wait(5000).to({alpha : 0}, 700).call(()=>{
            ++ count
            descTxt.text = LanguageManager.getlocal(`acWeiZhengServantTip${count % 5}-${code}`);
        }, view).wait(5000);
        
        //底部任务
        view.addChild(bottom);
        let nowday = view.vo.getNowDay();
        view._nowday = nowday;
        for(let i = 1; i <= 3; ++ i){
            let btn = ComponentManager.getButton(`weizhengdesktask${i}-${code}`, ``, ()=>{
                //打开弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEIZHENGTASKVIEW, {
                    aid : view.aid,
                    code : view.code,
                    day : i
                });
            }, view);
            view.addChild(btn);
            view[`_taskbtn${i}`] = btn;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, btn, bottom, [155 + (i - 1) * (btn.width + 20), 0]);
            btn.setGray(i < nowday);
            if(nowday == i && view.vo.isInActy()){
                let light = BaseBitmap.create("public_9_bg63")
                light.width = 125;
                light.height = 188;
                light.setPosition(btn.x - 17, btn.y - 15);
                view.addChild(light);
                egret.Tween.get(light,{loop:true}).to({alpha:0},500).to({alpha:1},500);
                view._light = light;
            }
        }

        //充值任务
        let rechargebtn = ComponentManager.getButton(`weizhengrecharge-${code}`, ``, ()=>{
            //打开充值弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACWEIZHENGRECHARGEVIEW, {
                aid : view.aid,
                code : view.code
            })
        }, view);
        view.addChild(rechargebtn);
        rechargebtn.setScale(0.5)
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rechargebtn, bottom);
        view._rechatgebtn = rechargebtn;
        if(view.vo.getpublicRedhot2()){
            App.CommonUtil.addIconToBDOC(rechargebtn);
            let reddot = <BaseBitmap>rechargebtn.getChildByName(`reddot`);
            if(reddot){
                reddot.setScale(2);
                reddot.x = 200;
                reddot.y = 0;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(rechargebtn);
        }

        let txt = BaseBitmap.create(`weizhengrechargetxt-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt, rechargebtn, [0, 10]);
        view.addChild(txt);

        //进度条
        let progress = ComponentManager.getProgressBar(`progress3`, `progress3_bg`, 455);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bottom, [30, -progress.height-50]);
        view._progressBar = progress;
        view.addChild(progress);

        let icon = BaseLoadBitmap.create(``);
        icon.width = icon.height = 100;
        view._exchangeIcon = icon;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, progress, [-icon.width / 2, 0]);
        view.addChild(icon);

        let sid = view.cfg.getSkinId(view.getUiCode())
        let scfg = Config.ServantskinCfg.getServantSkinItemById(sid);

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `exchange`, ()=>{
            if(view.vo.isEnd){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            let haveskin = !scfg.canExchangeItem();
            let item = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].costShu)[0];
            let num = Api.itemVoApi.getItemNumInfoVoById(item.id);
            if((!haveskin && item.num > num) || (haveskin && num == 0)) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acChristmasViewTip1"));
                return;
            }
            
            //兑换
            NetManager.request(NetRequestConst.REQUEST_WEIZHENG_EXCHANGE,{
                activeId : view.acTivityId, 
            });
        }, view);
        view.addChild(exchangeBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, exchangeBtn, progress, [progress.width+6, 0]);
        view._exchangeBtn = exchangeBtn;
        view.addChild(exchangeBtn);
        let haveskin = !scfg.canExchangeItem();//view.vo.haveSkin(code);
        let item = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].costShu)[0];
        let num = Api.itemVoApi.getItemNumInfoVoById(item.id);
        if((haveskin && num == 0) || (!haveskin && item.num > num)){
            exchangeBtn.setGray(true);
        }
        else{
            exchangeBtn.setGray(false);
        }

        let tipGroup = new BaseDisplayObjectContainer();
        view.addChild(tipGroup);
        view._tipGroup = tipGroup;

        let tipBg = BaseBitmap.create(`specialview_commoni_namebg`);
        let exchangeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acWeiZhengTip2-${code}`, []), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._exchangeTxt = exchangeTxt;
        tipBg.width = exchangeTxt.textWidth + 30;

        tipGroup.addChild(tipBg);
        tipGroup.addChild(exchangeTxt)

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, exchangeTxt, tipBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipGroup, progress, [0, progress.height]);

        view.freshView();
    }


    public tick():void{
        let view = this;
        let str = view.vo.isInActy() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._timebg.x = GameConfig.stageWidth - view._timebg.width - 12;
        view._timeCountTxt.x = view._timebg.x+(view._timebg.width-view._timeCountTxt.width)*0.5;
    }

    private freshView():void{
        let view = this;
        let code = view.getUiCode();
        let day = view.vo.getNowDay();
        if(day != view._nowday){
            if(!view.vo.isInActy()){
                egret.Tween.removeTweens(view._light);
                view._light.dispose();
                view._light = null;
            }
            for(let i = 1; i < 4; ++ i){
                if(day == i && view._light){
                    let btn = <BaseButton>view[`_taskbtn${i}`];
                    if(view._light){
                        view._light.x = btn.x - 17;
                        view._light.y = btn.y - 15;
                    }
                }
            }
        }
        view._nowday = day;
        for(let i = 1; i < 4; ++ i){
            let btn = <BaseButton>view[`_taskbtn${i}`];
            btn.setGray(i != day);
            if(view.vo.canDayRewardLq(i)){
                App.CommonUtil.addIconToBDOC(btn);
            }
            else{
                App.CommonUtil.removeIconFromBDOC(btn);
            }
        }
        //进度刷新
        let sid = view.cfg.getSkinId(view.getUiCode())
        let scfg = Config.ServantskinCfg.getServantSkinItemById(sid);
        let haveskin = !scfg.canExchangeItem()//view.vo.haveSkin(code);
        if(haveskin){
            let change = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].getReward)[0];
            view._exchangeIcon.setload(change.icon);
        }

        let item = GameData.formatRewardItem(view.cfg.claim[haveskin ? 1 : 0].costShu)[0];
        let num = Api.itemVoApi.getItemNumInfoVoById(item.id);
        view._progressBar.setPercentage(num / item.num, `${num} / ${item.num}`);
        view._exchangeTxt.text = LanguageManager.getlocal(`acWeiZhengTip2-${code}`, [num.toString()]);
        view._tipGroup.visible = haveskin;
        //红点
        if(view.vo.getpublicRedhot2()){
            App.CommonUtil.addIconToBDOC(view._rechatgebtn);
            let reddot = <BaseBitmap>view._rechatgebtn.getChildByName(`reddot`);
            if(reddot){
                reddot.setScale(2);
                reddot.x = 200;
                reddot.y = 0;
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rechatgebtn);
        }
        if((haveskin && num == 0) || (!haveskin && item.num > num)){
            view._exchangeBtn.setGray(true);
        }
        else{
            view._exchangeBtn.setGray(false);
        }
    }

    /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{
        let key = `${AcConst.AID_WEIZHENG}-${this.code}report-${Api.playerVoApi.getPlayerID()}-${this.vo.st}`;
        let storage = LocalStorageManager.get(key);
        if (!storage) {
            LocalStorageManager.set(key, `1`);
            return {title:{key:`acWeiZhengreporttitle-${this.getUiCode()}`},msg:{key:`acWeiZhengreportmsg-${this.getUiCode()}`}};
        }
        else{
            return null;
        }
       
    }

    private rewardCallBack(evt : egret.Event):void{
		let view = this;
		let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		let rewards = rData.rewards;
		let cfg = view.cfg.recharge[view.vo.lastidx];
        let str = rewards;
		let rewardList =  GameData.formatRewardItem(str);
		let pos = this.vo.lastpos;
		App.CommonUtil.playRewardFlyAction(rewardList, new egret.Point(view._exchangeBtn.x + 70, view._exchangeBtn.y));
	}

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetManager.getMessageName(NetRequestConst.REQUEST_WEIZHENG_EXCHANGE),this.rewardCallBack,this);
        view._timeCountTxt = null;
        view._timebg = null;
        view._taskbtn1 = null;
        view._taskbtn2 = null;
        view._taskbtn3 = null;
        if(view._light){
            egret.Tween.removeTweens(view._light);
            view._light.dispose();
            view._light = null;
        }
        view._light = null;
        view._nowday = 1;
        view._rechatgebtn = null;
        view._progressBar = null;
        view._exchangeBtn = null;
        view._exchangeIcon.dispose();
        view._exchangeIcon = null;
        view._tipGroup.dispose();
        view._tipGroup = null;
        view._exchangeTxt = null;
        super.dispose();
    }
}