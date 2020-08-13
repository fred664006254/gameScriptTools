/**
 * 问卷调查
 */
class AcQuestionnaireView extends AcCommonView
{    
    private _timeCountTxt : BaseTextField = null;
    private _topbg : BaseBitmap = null;
    private _curPage : number = 0;
    private _progress : ProgressBar = null;
    private _progressTxt : BaseTextField = null;
    private _maxPage : number = 0;
    private _list : ScrollList = null;

    public constructor() {
		super();
    }
    
    private get cfg() : Config.AcCfg.QuestionnaireCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcQuestionnaireVo{
        return <AcQuestionnaireVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string
	{
        let currCode = ``;
        switch(Number(this.code)){
            default:
                currCode = `1`;
                break;
        }
        return currCode;
	}

     /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}
	{
		return {title:{key:`acQuestionAnnonceTitle`},msg:{key:`acQuestionAnnonceText`}};
    }
    
	public initView():void{
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_QA_ANSWER),view.qaCallBack,view);
        view._curPage = 1;
        view._maxPage = Math.ceil(view.cfg.questionNum / 3);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_QA_FRESH,view.freshView,view); 
        //top背景图
        let topbg = BaseBitmap.create(`qatop-${view.getUiCode()}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0,view.titleBg.height]);
        
        let tip1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acMotherDayTopTip1-1`, [view.vo.acTimeAndHour]), 18);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topbg, [228,59]);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acqatip-${view.code}`), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 395;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tip1Text, [0,tip1Text.textHeight + 4]);

        //倒计时位置 
        let timebg  = BaseBitmap.create("public_9_bg61");
        timebg.y = (topbg.y+topbg.height - 14);
        view._topbg = timebg;
 
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        let tip2Text = ComponentManager.getTextField(LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]), 18);
       
        view._timeCountTxt = tip2Text;
        tip2Text.y  = timebg.y+6; 

        timebg.width = tip2Text.width+50;
        timebg.x = GameConfig.stageWidth - timebg.width - 12;
        tip2Text.x = view._topbg.x+(view._topbg.width-view._timeCountTxt.width)*0.5;

        //中部bg
        let midtop = BaseBitmap.create(`dragonboattarbg`);
        midtop.scaleX = 0.99;
        midtop.height = 90;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midtop, topbg, [0,topbg.height - 10]);

        let bottomBg = BaseBitmap.create(`arena_bottom`);
        bottomBg.height = 68;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
        view.addChild(bottomBg);

        let midBg = BaseBitmap.create(`public_9_bg22`);
        midBg.width = 650;
        midBg.height = bottomBg.y - midtop.y - midtop.height + 10;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, midBg, midtop, [0,midtop.height - 10]);
        view.addChild(midBg);

        let rect = new egret.Rectangle(0, 0, 585, midBg.height - 40);
        let list = ComponentManager.getScrollList(AcQuestionItem, view.cfg.questionList, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, midBg, [0,20]);
        view.addChild(list)
        view._list = list;
        list.setContentPosY(6);

        let nextBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acqacommit-${view.code}`, ()=>{
            //提交
            if(view.vo.isActyEnd()){
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : LanguageManager.getlocal(`acPunishEnd`),
                    title : `itemUseConstPopupViewTitle`,
                    touchMaskClose : true,
                    callback : ()=>{
                        view.hide();
                    },
                    handle : view
                });  
            }
            else{
                view.getAnswer();
            }
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nextBtn, bottomBg);
        view.addChild(nextBtn);

        // let prevBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acqapage1-${view.code}`, ()=>{
        //     //翻页
        // }, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, prevBtn, bottomBg, [85,0]);
        // view.addChild(prevBtn);
        // prevBtn.visible = false;

        view.addChild(midtop);
        view.addChild(topbg);
        view.addChild(tip1Text);
        view.addChild(timebg);
        view.addChild(tip2Text);
        view.addChild(tipTxt);

        let progress = ComponentManager.getProgressBar("progress3","progress3_bg",490);
        progress.setPercentage(0);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progress, midtop, [25,12]);
        view.addChild(progress);
        view._progress = progress;

        let progressTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acqaquestionjindu-${view.code}`, ['0',view.cfg.questionNum.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progressTxt, progress, [16,-progressTxt.textHeight]);
        view.addChild(progressTxt);
        view._progressTxt = progressTxt;

        let rewardbtn = ComponentManager.getButton(`qabox-${view.getUiCode()}`, ``, ()=>{
            //打开奖励弹窗
            ViewController.getInstance().openView(ViewConst.POPUP.ACQUESTIONNAIREREWARDVIEW, {
                aid: this.aid, 
                code: this.code, 
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rewardbtn, progress, [progress.width + 5,0]);
        view.addChild(rewardbtn);

        view.setChildIndex(view.closeBtn, 9999);
        view.tick();
    }   

    private freshView():void{
        let view = this;
    }

    public tick():void{
        let view = this;
        let str = view.vo.isInActivity() ? `acLuckyDrawTopTip2-1` : `acLaborDaytime-1`;
        view._timeCountTxt.text = LanguageManager.getlocal(str, [App.DateUtil.getFormatBySecond(view.vo.getCountDown())]);
        view._topbg.x = GameConfig.stageWidth - view._topbg.width - 12;
        view._timeCountTxt.x = view._topbg.x+(view._topbg.width-view._timeCountTxt.width)*0.5;

        let totalNum = 0;
        for(let i = 1; i <= view.cfg.questionNum; ++ i){
            let item = <AcQuestionItem>view._list.getItemByIndex(i - 1);
            if(item && item.getIsAnswer()){
                ++ totalNum;
            }
        }
        view._progressTxt.text = LanguageManager.getlocal(`acqaquestionjindu${totalNum == view.cfg.questionNum ? '2' : ''}-${view.code}`, [totalNum.toString(),view.cfg.questionNum.toString()]);
        view._progress.setPercentage(totalNum / view.cfg.questionNum);
    }

    protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `questionnaire${code}`,`arena_bottom`,`dragonboattarbg`,  
            `progress3`,`progress3_bg`,"shield_cn"
        ]);
    } 

    private getAnswer(save : boolean = false):void{
        let view = this;
        let all = true;
        let answer1 = '';
        let answer2 : any = {};
        for(let i = 1; i <= view.cfg.questionNum; ++ i){
            let cfg = view.cfg.getQuestiuonCfgById(i);
            let item = <AcQuestionItem>view._list.getItemByIndex(i - 1);
            if(item){
                let str = item.checkAnwser(save);
                if(save){
                    if(!str.answer){
                        str.answer = '';
                    }
                    view.vo.setQuestionAnswer(i, str.answer);
                }
                else{
                    if(str.answer){
                        if(cfg.type == 3){
                            answer2[i] = str.answer;
                        }
                        else{
                            answer1 += `${str.answer}|`;
                        }
                    }
                    else{
                        all = false;
                        item.showEffect();
                        view._list.setScrollTopByIndex(str.index);
                        break;
                    }
                }
            }
        }
        if(all && !save){
            answer1 = answer1.slice(0,-1);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                msg : LanguageManager.getlocal(`acQuestionTip1-${view.code}`),
                title : `itemUseConstPopupViewTitle`,
                touchMaskClose : true,
                needCancel : true,
                callback : ()=>{
                    //发送
                    NetManager.request(NetRequestConst.REQUEST_QA_ANSWER,{
                    	activeId : view.acTivityId,
                        answer1 : answer1,
                        answer2 : answer2
                    });
                },
                handle : view
            });
        }
    }

    public qaCallBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.data.ret == 0){
            egret.Tween.get(this).wait(500).call(()=>{
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : LanguageManager.getlocal(`acQuestionTip2-${view.code}`),
                    title : `itemUseConstPopupViewTitle`,
                    touchMaskClose : true,
                    callback : ()=>{
                        if(view){
                            view.hide();
                        }
                    },
                    handle : view
                });  
                egret.Tween.removeTweens(this);
            }, view);

        }
    }
    
	public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_QA_ANSWER),view.qaCallBack,view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_QA_FRESH,view.freshView,view); 
        //储存答案
        view.getAnswer(true);
        view._curPage = 1;
        view._maxPage = 0;
        view._topbg = null;
        view._timeCountTxt = null;
        view._progressTxt = null;
        view._progress = null;
        view._list = null;
        super.dispose();
    }
}