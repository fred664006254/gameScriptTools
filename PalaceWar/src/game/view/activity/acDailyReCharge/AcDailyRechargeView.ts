/*
author : qianjun
date : 2018.4.14
desc : 感恩回馈
*/
class AcDailyRechargeView extends AcCommonView{

    private _timecdbg : BaseBitmap = null;
    private _timeCountTxt : BaseTextField = null;
    private _list : ScrollList = null;

    public constructor(){
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
    
    protected getRuleInfo():string{
		return App.CommonUtil.getCnByCode(`AcDailyRechargeRuleInfo`, this.getUiCode());
    } 

    protected getTitleStr():string{
		return null;
    } 

    protected getContainerY():number{
        return this.titleBg.height;
    }

    protected isHideTitleBgShadow():boolean{
        return false;
    }

    protected getTitleBgName():string{
		return this.getResByCode(`dailyrechargetitle`);
    } 

    protected getBigFrame():string{
		return `commonview_bigframe`;
    }

    public initView(){
        let view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_DAILYRECHARGE_GEREWARD,view.rewardCallBack,view);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        let code = view.getUiCode();
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        
        let topbg = BaseBitmap.create(this.getResByCode(`dailychargetop`, code));
        view.addChildToContainer(topbg);

        let timebg = BaseBitmap.create(this.getResByCode(`dailyrechargetimebg`,code));
        view.addChildToContainer(timebg);
       
        let timeTxt = ComponentManager.getTextField(this.vo.getAcLocalTime(true), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChildToContainer(timeTxt);

        timebg.width = timeTxt.width + 70;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timebg, topbg, [200,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, timeTxt, timebg);

        //倒计时位置 
        let timecdbg  = BaseBitmap.create("public_9_bg61");
        view.addChildToContainer(timecdbg);
        timecdbg.width = 270;
        timecdbg.y = (topbg.y+topbg.height - 14);
        view._timecdbg = timecdbg;

        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown(),17)]), 18);
        view.addChildToContainer(tip2Text);
        view._timeCountTxt = tip2Text;
        tip2Text.y = timecdbg.y+6; 

        timecdbg.x = GameConfig.stageWidth - timecdbg.width - 12;
        tip2Text.x = timecdbg.x+(timecdbg.width-tip2Text.width)*0.5;

        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        // this._effect.setScale(2);
        let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(20,140);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        view.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

        let skinTxt = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(123, 220);
        view.addChildToContainer(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

        let skinTxteffect = BaseBitmap.create("acwealthcarpview_servantskintxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(123, 220);
        view.addChildToContainer(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        
        //透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(20, 60);
        view.addChildToContainer(touchPos);
        touchPos.addTouchTap(() => {
            let skinstr = this.cfg.show;
            let rewardvo = GameData.formatRewardItem(skinstr)[0];
            let topMsg = LanguageManager.getlocal(this.getCnByCode(`AcDailyRechargeTip1`, code), [this.cfg.recharge[1].needGem,String(Object.keys(this.cfg.recharge).length), rewardvo.name]);
            let data = {data:[
                {idType:skinstr, topMsg:topMsg, scale:rewardvo.type == 16 ? 0.6 : 0.8},
            ]};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
        }, ViewController);

        let list = ComponentManager.getScrollList(AcDailyRechargeItem, view.updateArr(), new egret.Rectangle(0,0,600,view.height-view.titleBg.height-topbg.height - 20), view.code);
        view._list = list;
        view.addChildToContainer(list);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, topbg, [0,topbg.height+20]);

        this.setBigFameY(250);
        this.setBigFameCorner(2);
        view.tick();
        view._list.setScrollTopByIndex(view.vo.getNowDay());
    }   

    private updateArr():any[]{
		let view = this;
		let vo = view.vo; 
		if(!vo)
		{
			return [];
		}
		let arr1=[];
		let arr = view.cfg.recharge;
        
        let curday = view.vo.getNowDay();
		for(let i in arr){
            let unit : Config.AcCfg.DailyRechargeItemCfg = arr[i];
            arr1.push(unit);
		}
		return arr1; 
    }
    
    private freshView():void{
        let view = this;
        for(let i = 0; i < 7; ++ i){
            if(i != view.vo.lastidx){
                let item = <AcDailyRechargeItem>view._list.getItemByIndex(i);
                item.update();
            } 
        }
    }


    public tick():void{
        let view = this;
        if(view._timeCountTxt){
            let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
            view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown(),17)]);

            if(this._timecdbg)
            {
                this._timeCountTxt.x = this._timecdbg.x+(this._timecdbg.width-this._timeCountTxt.width)*0.5;
            }
        }
    }
    
    private rewardCallBack(evt : egret.Event):void{
        if(evt.data.ret){
            let rewards = evt.data.data.data.rewards;
            let rewardsstr = GameData.formatRewardItem(rewards);
            let pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardsstr,pos);
            this.vo.lastpos = null;
            
            let item = <AcDailyRechargeItem>this._list.getItemByIndex(this.vo.lastidx);
            if(item){
                item.update(true);
            }
            this.vo.lastidx = -1;
            
            let replacerewards = evt.data.data.data.replacerewards;
			if(replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}
        }
    }

    protected getResourceList():string[]{
        let view = this;
        let arr = [];
        let code = this.getUiCode();
        return super.getResourceList().concat([
            `dailychargetop-${code}`,`acwealthcarpview_skineffect1`,`acwealthcarpview_servantskintxt`,`acgiftreturnview_common_skintxt`,
            `progress17`,`progress17_bg`,`collectflag`,`ac_firstsightlove_special_itembg`
        ]).concat(arr);
    }
    
    public dispose():void{   
        let view = this;
        view._timecdbg = null;
        view._timeCountTxt = null;
        view._list = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_DAILYRECHARGE_GEREWARD,view.rewardCallBack,view);
        super.dispose();
    }
}