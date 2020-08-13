/**
 * 赌坊
 * author qianjun
 */

class AcGambleView extends AcCommonView {
    public constructor(){
        super();
    }

    private _roundTitle1 : BaseBitmap = null;
    private _roundTitle2 : BaseBitmap = null;
    private _roundTitle3 : BaseBitmap = null;
    private _box1 : BaseBitmap = null;
    private _box2 : BaseBitmap = null;
    private _box3 : BaseBitmap = null;
    private _tipGroup : BaseDisplayObjectContainer = null;
    private _roundBottomGroup1 : BaseDisplayObjectContainer = null;
    private _roundBottomGroup2 : BaseDisplayObjectContainer = null;
    private _roundBottomGroup3 : BaseDisplayObjectContainer = null;
    private _gemNumBitMapTxt : BaseBitmapText | BaseTextField = null;
    private _tipTxt : BaseTextField = null;
    private _tipBg : BaseBitmap = null;
    private _rewardBtn : BaseButton = null;
    private _shai : BaseLoadDragonBones = null;
    private _stop = false;
    private _awradTxt1 : BaseTextField = null;
    private _awradTxt2 : BaseTextField = null;
    private _awradTxt3 : BaseTextField = null;
    private _smallBg : BaseButton = null;
    private _bigBg : BaseButton = null;
    private _acCDTxt:BaseTextField = null;

    private get cfg() : Config.AcCfg.GambleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcGambleVo{
        return <AcGambleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     /**
	 * 获取活动配置
	 */
    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected getResourceList():string[]{
		return super.getResourceList().concat([
            'arena_bottom','gamblebg','shaizi_ske','shaizi_tex_json','shaizi_tex_png','gambleeff1','gambleeff2','gambleeff3','gambleeff4','gamblefly','forpeople_top',"common_titlebg"
		]);
    }
    
	protected initView():void{
        let view = this;
        view._stop = false;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        // let curTime = view.vo.getCurTime();
        // let curRound = view.vo.getCurRound();

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GAMBLEGETWINREWARD),view.getGambleRewardCallback,view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GAMBLEREWARD),view.showResult,view);
        //活动时间
        let acTimeTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleTimeDesc-${view.code}`,[view.vo.acTimeAndHour, '0', '24']), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acTimeTxt, view.titleBg, [15, view.titleBg.height + 10]);
        view.addChild(acTimeTxt);

        let arena_bottom = BaseBitmap.create('arena_bottom');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, view);
        view.addChild(arena_bottom);

        let myGemImg = BaseBitmap.create(`gamblemygem1_${view.code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, myGemImg, arena_bottom, [20,0]);
        view.addChild(myGemImg);

        let myGem = view.vo.getThisRoundGem();
        let gemNumBitMap = ComponentManager.getBitmapText(String(myGem),"socre_fnt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemNumBitMap, myGemImg, [myGemImg.width + 10,0]);
        view._gemNumBitMapTxt = gemNumBitMap;
        view.addChild(gemNumBitMap);

        //奖励按钮
        let rewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'DragonBoatDayLq', ()=>{
            if(view._stop){
                return;
            }
            if(!view.vo.canGetReward()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`acGambleNoRewardTip-${view.code}`));
                return;
            }
            //领取奖励接口
            ViewController.getInstance().openView(ViewConst.POPUP.ACGAMBLEGETREWARDPOPUPVIEW, {
                aid : view.aid,
                code : view.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, arena_bottom, [20,0]);
        view.addChild(rewardBtn);
        view._rewardBtn = rewardBtn;

        //背景
        let bg = BaseBitmap.create('gamblebg');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bg, view, [0, 0]);
        view.addChild(bg);
        let tmp = GameConfig.stageHeigth - arena_bottom.height - 140;
        bg.mask = new egret.Rectangle(0, bg.height - GameConfig.stageHeigth + 125, bg.width, tmp);

        //记录
        let recordBtn = ComponentManager.getButton(`gamblelog1_${view.code}`, '', ()=>{
            if(view._stop){
                return;
            }
            //记录弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACGAMBLERECORDPOPUPVIEW, {
                aid : view.aid,
                code : view.code,
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, recordBtn, acTimeTxt, [0, acTimeTxt.textHeight + 25]);
        view.addChild(recordBtn);

        if(App.CommonUtil.check_dragon()){
            let dgbone = App.DragonBonesUtil.getLoadDragonBones('shaizi',-1);
            // dgbone.setAnchorOffset(-150,-380);
            // dgbone.resume();
    
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, dgbone, bg, [320,415]);
                // dgbone.playDragonMovie('',0)
            // dgbone.anchorOffsetY = -50;
            view.addChild(dgbone);
            view._shai = dgbone;
        }
        else{
            view._box1.alpha = view._box2.alpha = view._box3.alpha = 1;
        }


        let gemBg = BaseBitmap.create('gamblebottom_1');
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, gemBg, arena_bottom, [0,arena_bottom.height]);
        view.addChild(gemBg);
        //当前轮数
        for(let i = 1; i < 4; ++ i){
            //标题
            let titleImg = BaseBitmap.create(`gambleroundtitle${i}_${view.code}`);
            titleImg.anchorOffsetX = titleImg.width / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, view.titleBg, [(i - 2) * 135, view.titleBg.height+65]);
            view.addChild(titleImg);
            view[`_roundTitle${i}`] = titleImg;
            //筛子
            let rid = App.MathUtil.getRandom(1,7);
            let boximg = BaseBitmap.create(`gamblebox${rid}_${view.code}`);
            boximg.anchorOffsetX = boximg.width / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boximg, view, [(i - 2) * 170, -110]);
            view.addChild(boximg);
            boximg.alpha = 0;
            view[`_box${i}`] = boximg;
            //图片展示
            let bottomgroup = new BaseDisplayObjectContainer();
            bottomgroup.width = 128;
            bottomgroup.height = 127;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, bottomgroup, arena_bottom, [66 + 200 * (i - 1), arena_bottom.height - 20]);
            view.addChild(bottomgroup);
            view[`_roundBottomGroup${i}`] = bottomgroup;

            let roundBottom = BaseBitmap.create(`gambleround${i}_${view.code}`);
            roundBottom.anchorOffsetX = roundBottom.width / 2;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roundBottom, bottomgroup, [0,0], true);
            bottomgroup.addChild(roundBottom);

            let money = App.MathUtil.strip(view.cfg.gambPrize[i].stop.prize - 1) * myGem;
            let awradTxt = ComponentManager.getTextField(LanguageManager.getlocal(money == 0 ? `acGambleRoundTip2-${view.code}` : `acGambleRecord3-${view.code}`, [money.toString()]), 18, TextFieldConst.COLOR_QUALITY_ORANGE);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, awradTxt, roundBottom, [0,25]);
            bottomgroup.addChild(awradTxt);
            view[`_awradTxt${i}`] = awradTxt;
            //文本说明
            let color = '';
            switch(i){
                case 1:
                    color = String(0xffffff);
                    break;
                case 2:
                    color = String(TextFieldConst.COLOR_WARN_GREEN);
                    break;
                case 3:
                    color = String(TextFieldConst.COLOR_QUALITY_ORANGE);
                    break;
            }
            let rounddescTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRoundRoundDesc-${view.code}`, [i.toString(), color, (App.MathUtil.strip(view.cfg.gambPrize[i].stop.prize - 1)).toFixed(1), String(App.MathUtil.strip(view.cfg.gambPrize[i].wrong.prize * 100))]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, rounddescTxt, bg, [0, 200 + (3 - i) * (28)]);
            view.addChild(rounddescTxt);
        }
        view.swapChildren(view._box1, view._box3);
        //提示
        let tipgroup = new BaseDisplayObjectContainer();
        tipgroup.width = 250;
        tipgroup.height = 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, tipgroup, bg, [15, 420]);
        view.addChild(tipgroup);
        view._tipGroup = tipgroup;

        let tipTxtBg = BaseBitmap.create(`gamblefontbg`);
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRoundTip1-${view.code}`, ['1']), 20, TextFieldConst.COLOR_QUALITY_YELLOW);
        let alertImg = BaseBitmap.create(`gamblealert1_${view.code}`);
        // tipTxtBg.width = tipTxt.textWidth + alertImg.width + 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxtBg, tipgroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, alertImg, tipTxtBg, [80, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt, alertImg, [alertImg.width+10, 0]);
        tipgroup.addChild(tipTxtBg);
        tipgroup.addChild(alertImg);
        tipgroup.addChild(tipTxt);
        view._tipTxt = tipTxt;
        view._tipBg = tipTxtBg;
        
        let smallImg = ComponentManager.getButton(`gamblesmall1_${view.code}`, '', view.play, view, [2]);
        let bigImg = ComponentManager.getButton(`gamblebig1_${view.code}`, '', view.play, view, [1]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, smallImg, bg, [95,290]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, bigImg, bg, [95,290]);
        view.addChild(smallImg);
        view.addChild(bigImg);
        view._smallBg = smallImg;
        view._bigBg =bigImg;
        view.freshView();

         // 倒计时
        let countDownBg = BaseBitmap.create("public_searchdescbg");
        countDownBg.setPosition(GameConfig.stageWidth/2 - countDownBg.width/2, 120);
        view.addChild(countDownBg);

        let acCDTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        view.addChild(acCDTxt);
        this._acCDTxt = acCDTxt;
		let deltaT = this.vo.getAcResidueTime();
		if (deltaT > 0)
		{
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
		} 
		else 
		{
			this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
		}
		acCDTxt.setPosition(GameConfig.stageWidth/2 - acCDTxt.width/2, countDownBg.y+countDownBg.height/2 - acCDTxt.height/2);

        //view.showEff();
        //
            //ying di gai
    }

    private _type : number = 0;
    private play(type : number):void{
        let view = this;
        if(view._stop){
            return;
        }
        if(!view.vo.isInActy()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
            return;
        }
        if(view.vo.getIsEnd()){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acGambleRoundEndTip-${view.code}`));
            return;
        }
        if(view.vo.getCurRound() > 3){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acGambleRoundEndTip2-${view.code}`));
            return;
        }
        view._type = type;
        view._stop = true;
        if(view.vo.getCurRound() == 1){
            ViewController.getInstance().openView(ViewConst.POPUP.ACGAMBLEGEMPOPUPVIEW, {
                aid : view.aid,
                code : view.code,
                type : type,
                callback : ()=>{
                    view._stop = false
                },
                obj : view
            });
        }
        else{
            //押注消息 1大2小	
            view.vo._prevTime = view.vo.getCurTime();
            view.vo._prevRound = view.vo.getCurRound();
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_GAMBLEREWARD,{
                "activeId" : view.acTivityId, 
                "gemNum" : view.vo.getThisRoundGem(),
                "bet" : type
            });
            //App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ANNIVERS_REFRESH);
        }
    }

    //刷新轮数界面
    private freshView():void{
        let view = this;
        let curRound = view.vo.getCurRound();
        let curTime = view.vo.getCurTime();
        for(let i = 1; i < 4; ++ i){
            let titleImg : BaseBitmap = view[`_roundTitle${i}`];
            titleImg.setScale(i == curTime ? 1 : 0.7);

            let roundBottom = view[`_roundBottomGroup${i}`];
            if(curRound == i){
                App.DisplayUtil.changeToNormal(roundBottom);
            }
            else{
                App.DisplayUtil.changeToGray(roundBottom);
            }
            let money = App.MathUtil.strip(view.cfg.gambPrize[i].stop.prize - 1) * view.vo.getThisRoundGem();
            view[`_awradTxt${i}`].text = LanguageManager.getlocal(money == 0 ? `acGambleRoundTip2-${view.code}` : `acGambleRecord3-${view.code}`, [money.toString()]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view[`_awradTxt${i}`], roundBottom, [0,25], true);
        }
        let str = '';
        if(view.vo.getIsEnd()){
            str = `acGambleRoundEndTip-${view.code}`;
        }
        else if(view.vo.getCurRound() > 3){
            str = `acGambleRoundEndTip3`;
        }
        else{
            str = `acGambleRoundTip1-${view.code}`;
        }
        view._tipGroup.visible = true;
        view._tipTxt.text = LanguageManager.getlocal(str, [curRound.toString()]);
        view._gemNumBitMapTxt.text = view.vo.getThisRoundGem().toString();
        if(view.vo.isShowRedDot){
            App.CommonUtil.addIconToBDOC(view._rewardBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
       
        view._box1.alpha = view._box2.alpha = view._box3.alpha = 0;
    }

    protected getTitleStr():string{
        return `acGamble-${this.code}_Title`;
    }

    private getGambleRewardCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.data.ret < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal('limitedCollectErrorTips'));
        }
        else{
            let gemView = ViewController.getInstance().getView(ViewConst.POPUP.ACGAMBLEGETREWARDPOPUPVIEW);
            if(gemView){
                gemView.hide();
            }
            App.CommonUtil.showTip(LanguageManager.getlocal(`acGambleGetReward-${view.code}`));
            view.freshView();
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ANNIVERS_REFRESH);
        } 
    }

    private showResult(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(evt.data.data.ret < 0){
            view._stop = false;
            App.CommonUtil.showTip(LanguageManager.getlocal('limitedCollectErrorTips'));
            return;
        }
        // view._gemNumBitMapTxt.text = view.vo.getThisRoundGem().toString();
        let gemView = ViewController.getInstance().getView(ViewConst.POPUP.ACGAMBLEGEMPOPUPVIEW);
        if(gemView){
            gemView.hide();
        }
        view._tipGroup.visible = false;
        let result = data.randResult == 1 ? 'win' : 'fail';
        let curRound = view.vo.getCurRound();
        let curTime = view.vo.getCurTime();
        let prevtime = view.vo._prevTime;
        let prevround = view.vo._prevRound;
        let num_arr = data.randInfo.split('_');

        // let effClip1 = ComponentManager.getCustomMovieClip("hudie_",14,100);
        // effClip1.x = 400;
        // effClip1.y = this.height - 550;
        // this._effectLayer.addChild(hudieClip);
        // effClip1.play();
        let btn = view._type == 1 ? view._bigBg : view._smallBg;

        let eff1 = BaseBitmap.create('gambleeff1');
        eff1.blendMode = egret.BlendMode.ADD;
        eff1.anchorOffsetX = eff1.width / 2;
        eff1.anchorOffsetY = eff1.height / 2;
        eff1.alpha = 0;
        view.addChild(eff1);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff1, btn, [0,-10]);
        eff1.setScale(1.2);
        egret.Tween.get(eff1).to({scaleX : 0, scaleY : 0, rotain : 60}, 600).call(()=>{
            egret.Tween.removeTweens(eff1);
            view.removeChild(eff1);
        },view);
        egret.Tween.get(eff1).to({alpha : 1}, 100);

        let eff2 = BaseBitmap.create('gambleeff1');
        eff2.blendMode = egret.BlendMode.ADD;
        eff2.anchorOffsetX = eff2.width / 2;
        eff2.anchorOffsetY = eff2.height / 2;
        eff2.alpha = 0;
        eff2.rotation = 110;
        view.addChild(eff2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff2, btn, [0,-10]);
        egret.Tween.get(eff2).to({scaleX : 0, scaleY : 0, rotain : 80}, 500).call(()=>{
            egret.Tween.removeTweens(eff2);
            view.removeChild(eff2);
        },view);
        egret.Tween.get(eff2).to({alpha : 1}, 100);

        let eff3 = BaseBitmap.create('gambleeff1');
        eff3.blendMode = egret.BlendMode.ADD;
        eff3.anchorOffsetX = eff3.width / 2;
        eff3.anchorOffsetY = eff3.height / 2;
        eff3.alpha = 0;
        eff3.rotation = 333;
        eff1.setScale(0.8);
        view.addChild(eff3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff3, btn, [0,-10]);
        egret.Tween.get(eff3).to({scaleX : 0, scaleY : 0}, 500).call(()=>{
            egret.Tween.removeTweens(eff3);
            view.removeChild(eff3);
        },view);
        egret.Tween.get(eff3).to({alpha : 1}, 100);

        // let eff4 = BaseBitmap.create('gambleeff2');
        // eff4.anchorOffsetX = eff4.width / 2;
        // eff4.anchorOffsetY = eff4.height / 2;
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff4, btn);
        // eff4.setScale(view._smallBg.width / eff4.width);
        // view.addChild(eff4);
        // egret.Tween.get(eff4).to({alpha : 1}, 100).to({alpha : 0}, 500).call(()=>{
        //     egret.Tween.removeTweens(eff4);
        //     view.removeChild(eff4);
        // },view);

        let eff5 = BaseBitmap.create('gambleeff3');
        eff5.anchorOffsetX = eff5.width / 2;
        eff5.anchorOffsetY = eff5.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff5, btn);
        eff5.setScale(0.56);
        view.addChild(eff5);
        egret.Tween.get(eff5).to({scaleX : 1.14, scaleY : 1.14}, 100).to({scaleX : 1.8, scaleY : 1.8}, 400).call(()=>{
            egret.Tween.removeTweens(eff5);
            view.removeChild(eff5);
        },view);
        egret.Tween.get(eff5).to({alpha : 0}, 500);

        let effClip1 = ComponentManager.getCustomMovieClip("gamblefly",14,70);
        effClip1.width = 178;
        effClip1.height = 138;
        effClip1.anchorOffsetX = effClip1.width / 2;
        effClip1.x = btn.x + (view._type == 2 ? (effClip1.anchorOffsetX + 50) : 0);
        effClip1.y = btn.y - 99;
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, effClip1, btn);
        view.addChild(effClip1);
        effClip1.scaleX = view._type == 1 ? -1 : 1;
        egret.Tween.get(effClip1).wait(230).call(()=>{
            effClip1.playWithTime(1);
            effClip1.setEndCallBack(()=>{
                view.removeChild(effClip1);
                if(App.CommonUtil.check_dragon()){
                    if(view._shai){
                        for(let i = 1; i < 4; ++ i){
                            let tmpX = view[`_box${i}`].x;
                            let tmpY = view[`_box${i}`].y;
                            egret.Tween.get(view[`_box${i}`]).set({scaleX : 0.5, scaleY : 0.5, x : 320, y : view._shai.y - 50}).call(()=>{
                                view[`_box${i}`].setRes(`gamblebox${num_arr[i - 1]}_${view.code}`);
                            },view).wait(1800).call(()=>{
                                view[`_box${i}`].alpha = 1;
                            },view).wait(i * 300).to({x : tmpX, y : tmpY, scaleX : 1, scaleY : 1},500).wait(1200).call(()=>{
                                egret.Tween.removeTweens(view[`_box${i}`]);
                                if(i == 3){
                                    ViewController.getInstance().openView(ViewConst.POPUP.ACGAMBLERESULTVIEW, {
                                        aid : view.aid,
                                        code : view.code,
                                        type : result,
                                        time : prevtime,
                                        round : prevround,
                                        genNum : data.randResult == 1 ?  view.vo.getMyGem() : data.reward.split('_')[2],
                                        callback : ()=>{
                                            view._stop = false;
                                        },
                                        obj : view
                                    });
                                    view._shai.playDragonMovie('animation2',-1);
                                    //this._dragonBones.armature.animation.gotoAndStopByFrame('',1);//playDragonMovie('idle',-1);
                                    view.freshView();
                                }
                            },view);
                        }
                        view._shai.playDragonMovie('animation',1);
                        
                    }
                }
                else{
                    for(let i = 1; i < 4; ++ i){
                        let tmpX = view[`_box${i}`].x;
                        let tmpY = view[`_box${i}`].y;
                        egret.Tween.get(view[`_box${i}`]).set({scaleX : 0.5, scaleY : 0.5, x : 320, y : view._shai.y - 50}).call(()=>{
                            view[`_box${i}`].setRes(`gamblebox${num_arr[i - 1]}_${view.code}`);
                        },view).wait(1800).call(()=>{
                            view[`_box${i}`].alpha = 1;
                        },view).wait(i * 300).to({x : tmpX, y : tmpY, scaleX : 1, scaleY : 1},500).wait(1200).call(()=>{
                            egret.Tween.removeTweens(view[`_box${i}`]);
                            if(i == 3){
                                ViewController.getInstance().openView(ViewConst.POPUP.ACGAMBLERESULTVIEW, {
                                    aid : view.aid,
                                    code : view.code,
                                    type : result,
                                    time : prevtime,
                                    round : prevround,
                                    genNum : data.randResult == 1 ?  view.vo.getMyGem() : data.reward.split('_')[2],
                                    callback : ()=>{
                                        view._stop = false;
                                    },
                                    obj : view
                                });
                                //this._dragonBones.armature.animation.gotoAndStopByFrame('',1);//playDragonMovie('idle',-1);
                                view.freshView();
                            }
                        },view);
                    }
                }
            },view);
            egret.Tween.removeTweens(effClip1);
            let eff6 = BaseBitmap.create('gambleeff4');
            eff6.anchorOffsetX = eff6.width / 2;
            eff6.anchorOffsetY = eff6.height / 2;
            eff6.x = GameConfig.stageWidth / 2;
            eff6.y = view._shai.y - 40;
            eff6.alpha = 0;
            eff6.setScale(2);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, eff6, view._shai);
            view.addChild(eff6);
            egret.Tween.get(eff6).wait(560).to({alpha : 1}, 100).to({alpha : 0}, 600).call(()=>{
                egret.Tween.removeTweens(eff6);
                // view.removeChild(eff6);
            },view);
        },view);
    }

    protected getRuleInfo():string{
        return `acGambleRuleInfo-${this.code}`;
    }

    public hide():void{
        let view = this;
        if(view._stop){
            return;
        }
        super.hide();
    }

    public tick() {

        let deltaT = this.vo.getAcResidueTime();
		if (this._acCDTxt) 
        {   
            if (deltaT > 0)
            {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            } 
            else 
            {
                this._acCDTxt.text = LanguageManager.getlocal("acAlliance_acCD", [LanguageManager.getlocal("acAlliance_acCDEnd")]);
            }
        }
    }

    public dispose():void{
        let view = this;
        view._stop = false;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GAMBLEGETWINREWARD),view.getGambleRewardCallback,view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GAMBLEREWARD),view.showResult,view);
        for(let i = 1; i < 4; ++i){
            view[`_roundTitle${i}`] = null;
            view[`_box${i}`] = null;
            view[`_roundBottomGroup${i}`] = null;
            view[`_awradTxt${i}`] = null;
        }
        view._gemNumBitMapTxt = null;
        view._tipBg = null;
        view._rewardBtn = null;
        view._tipGroup = null;
        view._smallBg = null;
        view._bigBg = null;
        super.dispose();
    }

}