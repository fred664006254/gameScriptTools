/**
  * 元宵节猜灯谜题目面板
  * author qianjun
  * date 2019.7.24
  * @class ExamProblemPopupView
  */
 class AcLanaternProblemPopupView extends PopupView{
    /**考试问题数目 */
    public _totalProblemNum:number = 10;
    /**题目列表 */
    public _problems:any[] = [];
    /**当前题目序号 */
    public _problemNum:number = 1;
    /**正确题数 */
    public _rightNum:BaseTextField;
    /**积分 */
    public _scoreNum:BaseTextField;
    /**问题容器 */
    public _problemContainer:BaseDisplayObjectContainer;
    /**问题 */
    public _problemText:BaseTextField;
    /**题目 */
    public _problem:BaseTextField;
    /**答案 */
    public _answerContainer:BaseDisplayObjectContainer;
    public _answerItemsContainer:BaseDisplayObjectContainer[] = [];
    /**答案位置 */
    public _answerPos:number[] = [];
    /**选择的答案 下标 不是id*/
    public _selectedIndex:number = 0;
    /**正确答案 */
    public _rightAnswerId:number = 0;
    /**是否已经选择了答案 */
    public _isSelectedAnswer:boolean = false;

    public constructor(){
       super();
    }

    private get cfg() : Config.AcCfg.LanternCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcLanternVo{
        return <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
			case 2:
			case 3:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
	}
    public initView():void{

    }

    // protected isTouchMaskClose():boolean{
    //     return true;
    // }

    public resetBgSize():void{
        super.resetBgSize();

        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.width = view.width;
        view.container.height = view.height;

        let topGroup = new BaseDisplayObjectContainer();
        topGroup.width = 589;
        view.addChildToContainer(topGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, topGroup, view.container, [0], true);

        let img = BaseBitmap.create(`lanternjuanzhoueff1`);
        topGroup.addChild(img);

        let title = BaseBitmap.create(App.CommonUtil.getResByCode(`lanternpoptitle`, view.getUiCode()));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, title, img);
        topGroup.addChild(title);

        let sign_g = new BaseDisplayObjectContainer();
        sign_g.width = 462;
        sign_g.height = 520;
        view.addChildToContainer(sign_g);
        sign_g.alpha = 0;

        topGroup.y = view.height;
        egret.Tween.get(topGroup).wait(300).to({y : (view.height - topGroup.height) / 2}, 400).call(()=>{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, sign_g, topGroup, [0,95]);
            let eff = BaseLoadBitmap.create(`lanternjuanzhoueff8`);//ComponentManager.getCustomMovieClip(`lanternjuanzhoueff`, 8);
            eff.width = img.width;
            eff.height = img.height;
            topGroup.addChildAt(eff,0);
            // eff.setEndCallBack(()=>{
            //     // eff.setStopFrame(7);
            //     for(let i = 0; i < this._answerItemsContainer.length; ++ i){
            //         let unit = this._answerItemsContainer[i];
            //         if(unit){
            //             let tmpY = unit.y;
            //             unit.y = tmpY - 100;
            //             unit.alpha = 0;
            //             egret.Tween.get(unit).wait(200+100 * Number(i)).to({y : tmpY, alpha : 1}, 300).call(()=>{
            //                 egret.Tween.removeTweens(unit);
            //             }, view);
            //         }
            //     }
            //     egret.Tween.get(sign_g).to({alpha : 1}, 100).call(()=>{
            //         egret.Tween.removeTweens(sign_g);
            //     }, view);

            //     let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`aclanterntip10`, view.getUiCode())), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topGroup, [0,topGroup.height]);
            //     view.addChildToContainer(tipTxt);
            // }, view);
            for(let i = 0; i < this._answerItemsContainer.length; ++ i){
                let unit = this._answerItemsContainer[i];
                if(unit){
                    let tmpY = unit.y;
                    unit.y = tmpY - 100;
                    unit.alpha = 0;
                    egret.Tween.get(unit).wait(200+100 * Number(i)).to({y : tmpY, alpha : 1}, 300).call(()=>{
                        egret.Tween.removeTweens(unit);
                    }, view);
                }
            }
            egret.Tween.get(sign_g).to({alpha : 1}, 100).call(()=>{
                egret.Tween.removeTweens(sign_g);
            }, view);

            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`aclanterntip10`, view.getUiCode())), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topGroup, [0,topGroup.height]);
            view.addChildToContainer(tipTxt);

            // eff.playWithTime(1);
            img.dispose();
            img = null;
        }, view);


        // let juanzhou1 = BaseBitmap.create(App.CommonUtil.getResByCode(`lanternpopjzhou1`, view.getUiCode()));
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juanzhou1, topGroup, [0,0], true);
        // topGroup.addChild(juanzhou1);

       

        // let juanzhou2 = BaseBitmap.create(App.CommonUtil.getResByCode(`lanternpopjzhou2`, view.getUiCode()));
        // view.addChildToContainer(juanzhou2);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juanzhou2, topGroup, [0,40]); 

        // view.closeBtn.alpha = 0;
        // egret.Tween.get(topGroup).wait(500).to({y : sign_g.y - 40}, 1500).call(()=>{

        // },view);

        // egret.Tween.get(juanzhou2).wait(500).to({y : sign_g.y + sign_g.height - juanzhou2.height + 15}, 1500).call(()=>{
        //     egret.Tween.removeTweens(juanzhou2);
        // },view);
        
        // egret.Tween.get(sign_g.mask,{onChange : ()=>{
        //     if(sign_g.mask){
        //         sign_g.mask.y = (sign_g.height -  sign_g.mask.height) / 2;
        //     }
        // }, onChangeObj : view}).wait(550).to({height : 520}, 1500).call(()=>{
        //     //文字出现
        //     egret.Tween.removeTweens(sign_g.mask);
        //     sign_g.mask = null;
        // },view);

        let rid = App.MathUtil.getRandom(1,51);
        this._problems = [rid];
        this._totalProblemNum = this._problems.length;

        let problemStr = LanguageManager.getlocal(`acLanternQuestion${this._problems[0]}`);
        let problemText = ComponentManager.getTextField(problemStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        problemText.width = 360;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, problemText, sign_g, [45,70], true);
        sign_g.addChild(problemText);
        this._problemText = problemText;

        //答案
        let answerContainer = new BaseDisplayObjectContainer();
        answerContainer.width = 355;
        answerContainer.height = 271;
        answerContainer.mask = new egret.Rectangle(0,0,355,271);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, answerContainer, sign_g, [0,200],true);
        sign_g.addChild(answerContainer);
        this._answerContainer = answerContainer;

        let answerPos = Api.examVoApi.getAnswerRandPos();
        for (let i=0; i < answerPos.length; i++){
            this._answerItemsContainer[i] = this.createOneAnswer(i);
            this._answerItemsContainer[i].y += (this._answerItemsContainer[i].height + 16) * i + 6;
            answerContainer.addChild(this._answerItemsContainer[i]);
        }
        this.setAnswers(0);
    }



    public setAnswers(type:number){
        if (type == 0){
            this._answerPos = Api.examVoApi.getAnswerRandPos();
            for (let i = 0; i < this._answerPos.length; i++){
                this.refreshAnswers(i, 0);
            }
        }
        else if (type == 1){
            this.refreshAnswers(this._selectedIndex, 1);
        }
        else if (type == 2){
            this.refreshAnswers(this._selectedIndex, 2);
            let rightAnswer = 1; //默认第一个答案正确
            let index = 0;
            for (let i=0; i < this._answerPos.length; i++){
                if (this._answerPos[i] == rightAnswer){
                    index = i;
                    break;
                }
            }
            this.refreshAnswers(index, 1);
        }
        else if (type == 3){
            this.refreshAnswers(this._selectedIndex, 3);
        }   
    }

    /**刷新答案 type 0 默认 1 正确 2 错误  3 选中*/
    public refreshAnswers(index:number, type:number){
        if (index == -1){
            return;
        }
        let answerId = this._answerPos[index];
        let container:BaseDisplayObjectContainer = this._answerItemsContainer[index];
        let bg = <BaseBitmap>container.getChildByName("answerBg");
        let answerText = <BaseTextField>container.getChildByName("answerText");
        let rightFlag = <BaseBitmap>container.getChildByName("rightFlag");
        
        if (type == 0){
            bg.setRes(App.CommonUtil.getResByCode(`lanternpopselectbg1`, this.getUiCode()));
            let answerStr = LanguageManager.getlocal(`acLanternAnswer${this._problems[this._problemNum - 1]}-${answerId}`);
            answerText.text = answerStr;
            answerText.setPosition(bg.x + bg.width/2 - answerText.width/2, bg.y + bg.height/2 - answerText.height/2);
            rightFlag.visible = false;
        }
        else if (type == 1){
            bg.setRes(App.CommonUtil.getResByCode(`lanternpopselectbg3`, this.getUiCode()));
            rightFlag.setRes("examview_right");
            rightFlag.visible = true;                  
        }
        else if (type == 2){
            bg.setRes(App.CommonUtil.getResByCode(`lanternpopselectbg2`, this.getUiCode()));
            rightFlag.setRes("examview_error");
            rightFlag.visible = true;
        }
        else if (type == 3){
            bg.setRes(App.CommonUtil.getResByCode(`lanternpopselectbg3`, this.getUiCode()));
        }
    }

    /**创建一个答案 */
    public createOneAnswer(index:number):BaseDisplayObjectContainer{
        let answerContainer = new BaseDisplayObjectContainer();
        answerContainer.width = 355;
        answerContainer.height = 55;
        answerContainer.name = String(index);
        let bg:BaseBitmap = BaseBitmap.create(App.CommonUtil.getResByCode(`lanternpopselectbg1`, this.getUiCode()));
        bg.width = 355;
        bg.height = 55;
        bg.name = "answerBg";
        answerContainer.addChild(bg);

        let answerText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, answerText, bg);
        answerContainer.addChild(answerText);
        answerText.name = "answerText";

        let rightFlag = BaseBitmap.create("examview_right");
        rightFlag.setPosition(answerContainer.width - rightFlag.width, answerContainer.height/2 - rightFlag.height/2);
        rightFlag.name = "rightFlag";
        answerContainer.addChild(rightFlag);
        answerContainer.addTouchTap(this.answerClick, this, [index]);
        return answerContainer;
    }

    /**选择答案 */
    public answerClick(target:Object, index:number){
        if (this._isSelectedAnswer == true){
            return ;
        }
        this._isSelectedAnswer = true;
        this._selectedIndex = index;
        // this.setAnswers(3)
        if(this._answerPos[index] == 1){
            App.CommonUtil.showTip(LanguageManager.getlocal("aclanterntip11-1"));
            // let rewards = Api.examVoApi.cfg.getReward;
            // let rList = GameData.formatRewardItem(rewards);
            // App.CommonUtil.playRewardFlyAction(rList); 
            this.setAnswers(1);
        }
        else{
            App.CommonUtil.showTip(LanguageManager.getlocal("examinationErrorAnswer")); 
            this.setAnswers(2);
        }
        this.showNextAnswer();
    }

     /** 下一题 */
    public showNextAnswer():void{
        if (this._problemNum + 1 <= this._totalProblemNum){
            this._problemNum += 1;
            let tw = egret.Tween.get(this._problemText).wait(2000).call(()=>{
                this._answerContainer.alpha = 0;
                this.setAnswers(0);
            },this)
            .to({alpha:0},1000)
            .call(()=>{
                this._problemText.text = this.getNextProblemStr();
                this._isSelectedAnswer = false;
                egret.Tween.get(this._answerContainer).to({alpha:1}, 1000);
            }, this)
            .to({alpha:1}, 1000)
            .call(()=>{
                egret.Tween.removeTweens(tw);
            }, this)
        }
        else{
            //答题结束
            egret.Tween.get(this._problemText).wait(1000).call(()=>{
                this.showAnswerFinishView();
            },this)  
        }
    }

     /**获取下一题key */
     public getNextProblemStr():string{
        let problemStr = LanguageManager.getlocal(`acLanternQuestion${this._problems[this._problemNum - 1]}`);
        return problemStr;
    }

    public hide():void{
        this.param.data.callback.apply(this.param.data.callobj);
        super.hide();
    }

    /**答题结束统计 */
    public showAnswerFinishView(){
		this.hide();
        // let totalProblemNumStr = "examinationMeetTotalProblemNum";

        // let totalProblemNumText = ComponentManager.getTextField(LanguageManager.getlocal(totalProblemNumStr, [String(this._totalProblemNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // totalProblemNumText.setPosition(this._problemContainer.x + this._problemContainer.width/2 - totalProblemNumText.width/2, this._problemContainer.y + 50);
        // this.addChildToContainer(totalProblemNumText);

        // let rightData = Api.examVoApi.getRightAnswerData(this._problemType);
        // let rightNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationRightNum", [String(rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        // rightNumText.setPosition(this._problemContainer.x + this._problemContainer.width/2 - rightNumText.width - 30, totalProblemNumText.y + totalProblemNumText.height + 30);
        // this.addChildToContainer(rightNumText);
        // let errorNumText = ComponentManager.getTextField(LanguageManager.getlocal("examinationErrorNum", [String(this._totalProblemNum - rightData.rightNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        // errorNumText.setPosition(this._problemContainer.x + this._problemContainer.width/2 + 30, rightNumText.y);
        // this.addChildToContainer(errorNumText);

        // //确认按钮
        // let enterBtn = ComponentManager.getButton("btn_big_yellow", "examinationEnter", this.enterFinishBtnClick, this);
        // enterBtn.setPosition(this._problemContainer.x + this._problemContainer.width/2 - enterBtn.width/2, scoreNumText.y + scoreNumText.height + 30);
        // this.addChildToContainer(enterBtn);

        // this._problemContainer.visible = false;
        // this._answerContainer.visible = false;
    }


    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "examview_problem_bg",
            "examview_gray_bg",
            "examview_green_bg",
            "examview_red_bg",
            "examview_right",
            "examview_error",
            'lanternjuanzhoueff1'
		]);
    }
    
    protected getCloseBtnName():string{
		return null;
    }
    
	protected getBgName():string {
		return null;App.CommonUtil.getResByCode(`lanternpopbg`, this.getUiCode());
    }
    
	protected getTitleBgName():string {
		return null;//App.CommonUtil.getResByCode(`lanternpoptitle`, this.getUiCode());
    }
    
	protected getTitleStr():string {
		return null;
	}

    public dispose(){
        this._totalProblemNum = 10;
        this._problems = [];
        this._problemNum = 1;
        this._rightNum = null;
        this._scoreNum = null;
        this._problemContainer = null;
        this._problemText = null;
        this._problem = null;
        this._answerContainer = null;
        this._answerItemsContainer = [];
        this._answerPos = [];
        this._selectedIndex = 0;
        this._rightAnswerId = 0;
        this._isSelectedAnswer = false;
        // TimerManager.remove(this.examTick, this);
        super.dispose();
    }
}